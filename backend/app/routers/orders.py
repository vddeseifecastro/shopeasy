from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.database import get_db
from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product
from app.models.user import User
from app.schemas.order import (
    OrderCreate, OrderResponse, OrderStatusUpdate,
    OrderCancelRequest, OrderReturnRequest
)
from app.core.dependencies import get_current_user, get_current_admin

router = APIRouter(prefix="/orders", tags=["Órdenes"])

CANCELLABLE_STATUSES = {OrderStatus.pending, OrderStatus.confirmed}


def serialize_order(order: Order) -> dict:
    return {
        "id": order.id,
        "user_id": order.user_id,
        "username": order.user.username if order.user else None,
        "status": order.status,
        "total_amount": order.total_amount,
        "shipping_address": order.shipping_address,
        "cancel_reason": order.cancel_reason,
        "return_reason": order.return_reason,
        "created_at": order.created_at,
        "items": [
            {
                "id": item.id,
                "product_id": item.product_id,
                "product_name": item.product.name if item.product else None,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
            }
            for item in order.items
        ]
    }


def load_order_full(db: Session, order_id: int):
    return db.query(Order).options(
        joinedload(Order.user),
        joinedload(Order.items).joinedload(OrderItem.product)
    ).filter(Order.id == order_id).first()


# ─── USUARIO ─────────────────────────────────────────────────────────

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not order_data.items:
        raise HTTPException(status_code=400, detail="La orden debe tener al menos un producto")

    total = 0.0
    order_items = []

    for item in order_data.items:
        product = db.query(Product).filter(
            Product.id == item.product_id,
            Product.is_active == True
        ).first()

        if not product:
            raise HTTPException(status_code=404, detail=f"Producto {item.product_id} no encontrado")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Stock insuficiente para '{product.name}'. Disponible: {product.stock}")

        total += product.price * item.quantity
        order_items.append({"product": product, "quantity": item.quantity, "unit_price": product.price})

    new_order = Order(
        user_id=current_user.id,
        total_amount=round(total, 2),
        shipping_address=order_data.shipping_address
    )
    db.add(new_order)
    db.flush()

    for item_data in order_items:
        db.add(OrderItem(
            order_id=new_order.id,
            product_id=item_data["product"].id,
            quantity=item_data["quantity"],
            unit_price=item_data["unit_price"]
        ))
        item_data["product"].stock -= item_data["quantity"]

    db.commit()
    return serialize_order(load_order_full(db, new_order.id))


@router.get("/my-orders", response_model=List[OrderResponse])
def get_my_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = db.query(Order).options(
        joinedload(Order.user),
        joinedload(Order.items).joinedload(OrderItem.product)
    ).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    return [serialize_order(o) for o in orders]


@router.get("/my-orders/{order_id}", response_model=OrderResponse)
def get_my_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = load_order_full(db, order_id)
    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return serialize_order(order)


@router.patch("/my-orders/{order_id}/cancel", response_model=OrderResponse)
def cancel_order(
    order_id: int,
    body: OrderCancelRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = load_order_full(db, order_id)

    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Orden no encontrada")

    if order.status not in CANCELLABLE_STATUSES:
        raise HTTPException(
            status_code=400,
            detail=f"No se puede cancelar una orden en estado '{order.status}'. Solo se pueden cancelar órdenes pendientes o confirmadas."
        )

    for item in order.items:
        if item.product:
            item.product.stock += item.quantity

    order.status = OrderStatus.cancelled
    order.cancel_reason = body.reason
    db.commit()
    return serialize_order(load_order_full(db, order_id))


@router.patch("/my-orders/{order_id}/return", response_model=OrderResponse)
def request_return(
    order_id: int,
    body: OrderReturnRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = load_order_full(db, order_id)

    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Orden no encontrada")

    if order.status != OrderStatus.delivered:
        raise HTTPException(status_code=400, detail="Solo se pueden devolver órdenes entregadas")

    order.status = OrderStatus.return_requested
    order.return_reason = body.reason
    db.commit()
    return serialize_order(load_order_full(db, order_id))


# ─── ADMIN ───────────────────────────────────────────────────────────

@router.get("", response_model=List[OrderResponse])
def get_all_orders(
    status_filter: Optional[str] = Query(default=None),
    search: Optional[str] = Query(default=None),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    query = db.query(Order).options(
        joinedload(Order.user),
        joinedload(Order.items).joinedload(OrderItem.product)
    )

    if status_filter:
        query = query.filter(Order.status == status_filter)

    if search:
        query = query.join(Order.user).filter(
            User.username.ilike(f"%{search}%")
        )

    orders = query.order_by(Order.created_at.desc()).all()
    return [serialize_order(o) for o in orders]


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    status_data: OrderStatusUpdate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    order = load_order_full(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")

    # Si el admin aprueba una devolución, devolver stock
    if status_data.status == OrderStatus.returned:
        for item in order.items:
            if item.product:
                item.product.stock += item.quantity

    order.status = status_data.status
    db.commit()
    return serialize_order(load_order_full(db, order_id))