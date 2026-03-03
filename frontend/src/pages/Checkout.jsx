import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import api from '../services/api'

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleOrder() {
    if (!address.trim()) return setError('La dirección es obligatoria')
    setError('')
    setLoading(true)
    try {
      await api.post('/orders', {
        items: items.map(i => ({ product_id: i.id, quantity: i.quantity })),
        shipping_address: address
      })
      clearCart()
      navigate('/order-success')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al procesar el pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Finalizar pedido</h1>

      {/* Resumen */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">Resumen del pedido</h2>
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm text-gray-600 py-1">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Dirección */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">Dirección de envío</h2>
        {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-3 rounded-lg">{error}</p>}
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Calle, número, ciudad, código postal..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={handleOrder}
        disabled={loading || items.length === 0}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 font-medium"
      >
        {loading ? 'Procesando...' : `Confirmar pedido — $${getTotalPrice().toFixed(2)}`}
      </button>
    </div>
  )
}