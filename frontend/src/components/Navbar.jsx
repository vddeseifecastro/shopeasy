import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

export default function Navbar() {
  const navigate = useNavigate()
  const totalItems = useCartStore(s => s.getTotalItems())
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">ShopEasy</Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm">Tienda</Link>

          {user ? (
            <>
              {user.is_admin && (
                <Link to="/admin" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                  Admin
                </Link>
              )}

              <Link to="/my-orders" className="text-sm text-gray-600 hover:text-indigo-600">
                Mis pedidos
              </Link>

              <Link to="/cart" className="relative inline-block p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <span className="text-sm text-gray-500">Hola, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600">Iniciar sesión</Link>
              <Link to="/register" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}