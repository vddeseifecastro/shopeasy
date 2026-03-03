from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models
from app.routers import auth, products, orders   # 👈 añade orders

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ShopEasy API",
    description="E-commerce backend con FastAPI + SQLite",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)               # 👈 añade esta línea

@app.get("/")
def root():
    return {"message": "ShopEasy API funcionando ✅"}