import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import useCartStore from '../store/cartStore'

function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image_url || 'https://picsum.photos/400/300'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-800 font-semibold mt-1 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-800">${product.price}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              added
                ? 'bg-green-500 text-white'
                : product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {added ? '✓ Añadido' : product.stock === 0 ? 'Sin stock' : 'Añadir'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">{product.stock} disponibles</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    api.get('/products/categories')
      .then(r => setCategories(r.data.categories))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = { page, limit: 8 }
    if (search) params.search = search
    if (category) params.category = category

    api.get('/products', { params })
      .then(r => {
        setProducts(r.data.items)
        setTotalPages(r.data.pages)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [search, category, page])

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  function handleCategory(cat) {
    setCategory(cat === category ? '' : cat)
    setPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Bienvenido a ShopEasy 🛍️</h1>
        <p className="text-indigo-100">Los mejores productos de tecnología al mejor precio</p>
      </div>

      {/* Búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearch}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => handleCategory('')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            category === '' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              category === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-2">🔍</p>
          <p>No se encontraron productos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}