import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import useCartStore from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore(s => s.addItem)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-3xl h-96 animate-pulse" />
    </div>
  )

  if (!product) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-indigo-600 hover:underline text-sm mb-6 block">
        ← Volver
      </button>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-72 md:h-full object-cover"
        />
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-1 mb-3">{product.name}</h1>
            <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-gray-800 mb-2">${product.price}</p>
            <p className="text-sm text-gray-400 mb-4">{product.stock} unidades disponibles</p>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                added
                  ? 'bg-green-500 text-white'
                  : product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {added ? '✓ Añadido al carrito' : product.stock === 0 ? 'Sin stock' : 'Añadir al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}