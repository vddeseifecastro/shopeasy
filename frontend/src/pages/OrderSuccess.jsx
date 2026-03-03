import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <p className="text-6xl mb-4">🎉</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Pedido confirmado!</h1>
      <p className="text-gray-400 mb-6">Tu pedido ha sido procesado correctamente.</p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700">
        Seguir comprando
      </Link>
    </div>
  )
}