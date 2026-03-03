import { useState, useEffect } from 'react'
import api from '../services/api'

const statusColors = {
  pending:          'bg-yellow-100 text-yellow-700',
  confirmed:        'bg-blue-100 text-blue-700',
  shipped:          'bg-purple-100 text-purple-700',
  delivered:        'bg-green-100 text-green-700',
  cancelled:        'bg-red-100 text-red-700',
  return_requested: 'bg-orange-100 text-orange-700',
  returned:         'bg-gray-100 text-gray-600',
}

const statusLabels = {
  pending:          '⏳ Pendiente',
  confirmed:        '✅ Confirmado',
  shipped:          '🚚 Enviado',
  delivered:        '📦 Entregado',
  cancelled:        '❌ Cancelado',
  return_requested: '↩️ Devolución solicitada',
  returned:         '✔️ Devuelto',
}

const CANCELLABLE = ['pending', 'confirmed']

function CancelModal({ onConfirm, onClose }) {
  const [reason, setReason] = useState('')
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Cancelar pedido</h3>
        <p className="text-sm text-gray-500 mb-4">¿Quieres indicar el motivo? (opcional)</p>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Ej: Lo pedí por error, encontré mejor precio..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(reason)}
            className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 text-sm font-medium"
          >
            Confirmar cancelación
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl hover:bg-gray-200 text-sm font-medium"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

function ReturnModal({ onConfirm, onClose }) {
  const [reason, setReason] = useState('')
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Solicitar devolución</h3>
        <p className="text-sm text-gray-500 mb-4">Indica el motivo de la devolución</p>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Ej: Producto defectuoso, no era lo esperado..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          required
        />
        <div className="flex gap-3">
          <button
            onClick={() => reason.trim() && onConfirm(reason)}
            className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 text-sm font-medium disabled:opacity-50"
            disabled={!reason.trim()}
          >
            Solicitar devolución
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl hover:bg-gray-200 text-sm font-medium"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [returnTarget, setReturnTarget] = useState(null)
  const [processing, setProcessing] = useState(null)

  async function loadOrders() {
    try {
      const { data } = await api.get('/orders/my-orders')
      setOrders(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadOrders() }, [])

  async function handleCancel(orderId, reason) {
    setProcessing(orderId)
    try {
      await api.patch(`/orders/my-orders/${orderId}/cancel`, { reason })
      setCancelTarget(null)
      loadOrders()
    } catch (err) {
      alert(err.response?.data?.detail || 'Error al cancelar')
    } finally {
      setProcessing(null)
    }
  }

  async function handleReturn(orderId, reason) {
    setProcessing(orderId)
    try {
      await api.patch(`/orders/my-orders/${orderId}/return`, { reason })
      setReturnTarget(null)
      loadOrders()
    } catch (err) {
      alert(err.response?.data?.detail || 'Error al solicitar devolución')
    } finally {
      setProcessing(null)
    }
  }

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-36 animate-pulse" />)}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-3">📦</p>
          <p>Todavía no tienes pedidos</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">

              {/* Cabecera */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm font-bold text-gray-800">Pedido #{order.id}</span>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </div>

              {/* Productos */}
              <div className="space-y-1.5 mb-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>${(item.unit_price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Dirección */}
              <p className="text-xs text-gray-400 mb-3">📍 {order.shipping_address}</p>

              {/* Motivo cancelación o devolución */}
              {order.cancel_reason && (
                <p className="text-xs text-red-400 bg-red-50 px-3 py-2 rounded-lg mb-3">
                  Motivo de cancelación: {order.cancel_reason}
                </p>
              )}
              {order.return_reason && (
                <p className="text-xs text-orange-500 bg-orange-50 px-3 py-2 rounded-lg mb-3">
                  Motivo de devolución: {order.return_reason}
                </p>
              )}

              {/* Footer */}
              <div className="border-t pt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-gray-800">Total: ${order.total_amount}</p>
                <div className="flex gap-2">
                  {CANCELLABLE.includes(order.status) && (
                    <button
                      onClick={() => setCancelTarget(order.id)}
                      disabled={processing === order.id}
                      className="text-xs bg-red-50 hover:bg-red-100 text-red-500 px-3 py-2 rounded-lg font-medium disabled:opacity-50"
                    >
                      Cancelar pedido
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <button
                      onClick={() => setReturnTarget(order.id)}
                      disabled={processing === order.id}
                      className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-500 px-3 py-2 rounded-lg font-medium disabled:opacity-50"
                    >
                      Solicitar devolución
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cancelTarget && (
        <CancelModal
          onConfirm={(reason) => handleCancel(cancelTarget, reason)}
          onClose={() => setCancelTarget(null)}
        />
      )}
      {returnTarget && (
        <ReturnModal
          onConfirm={(reason) => handleReturn(returnTarget, reason)}
          onClose={() => setReturnTarget(null)}
        />
      )}
    </div>
  )
}