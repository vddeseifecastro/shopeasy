import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <p className="text-6xl mb-4">🛒</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
      <p className="text-gray-400 mb-6">Añade productos para continuar</p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700">
        Ver tienda
      </Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tu carrito</h1>

      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <img
              src={item.image_url || 'https://picsum.photos/80/80'}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-indigo-600 font-bold">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
              >
                +
              </button>
            </div>
            <p className="font-bold text-gray-800 w-20 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 text-xl ml-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-2xl font-bold text-gray-800">${getTotalPrice().toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 font-medium"
        >
          Proceder al pago
        </button>
        <Link to="/" className="block text-center text-sm text-gray-400 mt-3 hover:text-indigo-600">
          Seguir comprando
        </Link>
      </div>
    </div>
  )
}