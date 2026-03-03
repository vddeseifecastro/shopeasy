import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const statusColors = {
  pending:          'bg-yellow-100 text-yellow-700',
  confirmed:        'bg-blue-100 text-blue-700',
  shipped:          'bg-purple-100 text-purple-700',
  delivered:        'bg-green-100 text-green-700',
  cancelled:        'bg-red-100 text-red-700',
  return_requested: 'bg-orange-100 text-orange-700',
  returned:         'bg-gray-100 text-gray-600',
}

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(product || {
    name: '', description: '', price: '', stock: '', category: '', image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (product) {
        await api.put(`/products/${product.id}`, form)
      } else {
        await api.post('/products', form)
      }
      onSave()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {product ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-600">Nombre</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Precio ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-600">Categoría</label>
              <input
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-600">URL de imagen</label>
              <input
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-600">Descripción</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium text-sm"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [tab, setTab] = useState('products')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchUser, setSearchUser] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (!user?.is_admin) {
    navigate('/')
    return null
  }

  async function loadProducts() {
    const { data } = await api.get('/products', { params: { limit: 100 } })
    setProducts(data.items)
  }

  async function loadOrders() {
    const params = {}
    if (statusFilter) params.status_filter = statusFilter
    if (searchUser) params.search = searchUser
    const { data } = await api.get('/orders', { params })
    setOrders(data)
  }

  useEffect(() => {
    Promise.all([loadProducts(), loadOrders()])
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading) loadOrders()
  }, [statusFilter, searchUser])

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este producto?')) return
    await api.delete(`/products/${id}`)
    loadProducts()
  }

  async function handleStatusChange(orderId, status) {
    await api.patch(`/orders/${orderId}/status`, { status })
    loadOrders()
  }

  function handleSave() {
    setShowForm(false)
    setEditProduct(null)
    loadProducts()
  }

  const totalIngresos = orders
    .filter(o => o.status !== 'cancelled' && o.status !== 'returned')
    .reduce((acc, o) => acc + o.total_amount, 0)

  const ordenesPendientes = orders.filter(o => o.status === 'pending').length
  const devolucionesPendientes = orders.filter(o => o.status === 'return_requested').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <p className="text-gray-400 text-sm">Gestiona productos y órdenes</p>
        </div>
        {tab === 'products' && (
          <button
            onClick={() => { setEditProduct(null); setShowForm(true) }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 text-sm font-medium"
          >
            + Nuevo producto
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-indigo-600">{products.length}</p>
          <p className="text-gray-500 text-sm">Productos</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-blue-500">{orders.length}</p>
          <p className="text-gray-500 text-sm">Órdenes totales</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-yellow-500">{ordenesPendientes}</p>
          <p className="text-gray-500 text-sm">Pendientes</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-green-500">${totalIngresos.toFixed(0)}</p>
          <p className="text-gray-500 text-sm">Ingresos reales</p>
        </div>
      </div>

      {/* Alerta devoluciones pendientes */}
      {devolucionesPendientes > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between">
          <p className="text-sm text-orange-700 font-medium">
            ⚠️ Tienes {devolucionesPendientes} solicitud{devolucionesPendientes > 1 ? 'es' : ''} de devolución pendiente{devolucionesPendientes > 1 ? 's' : ''}
          </p>
          <button
            onClick={() => { setTab('orders'); setStatusFilter('return_requested') }}
            className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600"
          >
            Ver ahora
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('products')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            tab === 'products' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Productos
        </button>
        <button
          onClick={() => setTab('orders')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            tab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Órdenes
          {(ordenesPendientes + devolucionesPendientes) > 0 && (
            <span className="ml-1 bg-yellow-400 text-white text-[10px] rounded-full px-1.5 py-0.5">
              {ordenesPendientes + devolucionesPendientes}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-16 animate-pulse" />
          ))}
        </div>
      ) : tab === 'products' ? (

        /* Tabla productos */
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-sm font-medium text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">${p.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${p.stock < 5 ? 'text-red-500' : 'text-gray-600'}`}>
                      {p.stock} {p.stock < 5 && '⚠️'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditProduct(p); setShowForm(true) }}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-lg"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1 rounded-lg"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      ) : (

        /* Tabla órdenes */
        <div>
          {/* Filtros */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Buscar por usuario..."
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmado</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
              <option value="return_requested">Devolución solicitada</option>
              <option value="returned">Devuelto</option>
            </select>
            {(statusFilter || searchUser) && (
              <button
                onClick={() => { setStatusFilter(''); setSearchUser('') }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-500 px-3 py-2 rounded-xl"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Usuario</th>
                  <th className="px-4 py-3 text-left">Productos</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Dirección</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400 text-sm">
                      No hay órdenes que coincidan
                    </td>
                  </tr>
                ) : orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">#{o.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{o.username}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-500 space-y-0.5">
                        {o.items.map(item => (
                          <div key={item.id}>{item.product_name} ×{item.quantity}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">${o.total_amount}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[140px] truncate">{o.shipping_address}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(o.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <select
                          value={o.status}
                          onChange={e => handleStatusChange(o.id, e.target.value)}
                          className={`text-xs border-0 rounded-lg px-2 py-1 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full ${statusColors[o.status]}`}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmado</option>
                          <option value="shipped">Enviado</option>
                          <option value="delivered">Entregado</option>
                          <option value="cancelled">Cancelado</option>
                          <option value="return_requested">Dev. solicitada</option>
                          <option value="returned">Devuelto</option>
                        </select>
                        {o.cancel_reason && (
                          <p className="text-[10px] text-red-400">Cancelación: {o.cancel_reason}</p>
                        )}
                        {o.return_reason && (
                          <p className="text-[10px] text-orange-400">Devolución: {o.return_reason}</p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editProduct}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditProduct(null) }}
        />
      )}
    </div>
  )
}