import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const PRODUCTS = [
  { name: "MacBook Pro", price: "$1,999", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop", tag: "Laptops" },
  { name: "Sony WH-1000XM5", price: "$349", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=200&fit=crop", tag: "Audio" },
  { name: "iPhone 15 Pro", price: "$1,199", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop", tag: "Móviles" },
  { name: "PS5 Slim", price: "$449", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&h=200&fit=crop", tag: "Consolas" },
]

function ProductShowcase({ mode }) {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % PRODUCTS.length)
        setTransitioning(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const product = PRODUCTS[current]

  return (
    <div className="relative h-full flex flex-col justify-between p-10">
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(238,242,255,0.9) 0%, rgba(255,255,255,0.5) 40%, rgba(224,231,255,0.8) 100%)' }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="font-black text-gray-800 text-lg tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}>ShopEasy</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-xs relative"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(12px) scale(0.97)' : 'translateY(0) scale(1)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 24px 60px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.08)' }}>
            <div className="relative overflow-hidden" style={{ height: '180px' }}>
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(255,255,255,0.9)', color: '#6366f1', backdropFilter: 'blur(8px)' }}>
                {product.tag}
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                ★
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Disponible ahora</p>
                </div>
                <p className="font-black text-indigo-600 text-lg">{product.price}</p>
              </div>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full"
                  style={{ width: '73%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', transition: 'width 0.8s ease' }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">73% vendido</p>
            </div>
          </div>

          <div className="absolute -top-3 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.12)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-gray-700">+2.4k compradores</span>
            </div>
          </div>

          <div className="absolute -bottom-3 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.12)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-semibold text-gray-700">Envío en 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 pb-2">
        {PRODUCTS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? '20px' : '6px',
              height: '6px',
              background: current === i ? '#6366f1' : 'rgba(99,102,241,0.25)',
            }} />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <p className="text-xs font-medium" style={{ color: 'rgba(99,102,241,0.6)' }}>
          {mode === 'login' ? '✦ Miles de productos esperándote' : '✦ Únete a más de 2,400 compradores'}
        </p>
      </div>
    </div>
  )
}

// ── Field fuera de AuthPage para evitar pérdida de foco ──
function Field({ id, label, type, value, onChange, placeholder, iconPath, rightEl, focused, setFocused }) {
  const isFocused = focused === id
  return (
    <div>
      <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase"
        style={{ color: isFocused ? '#6366f1' : '#94a3b8', transition: 'color 0.2s' }}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" style={{ color: isFocused ? '#6366f1' : '#cbd5e1' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <input
          type={type || 'text'}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-gray-50 outline-none"
          style={{
            border: isFocused ? '1.5px solid #6366f1' : '1.5px solid #e2e8f0',
            color: '#1e293b',
            boxShadow: isFocused ? '0 0 0 3px rgba(99,102,241,0.08)' : 'none',
            transition: 'all 0.2s',
          }}
        />
        {rightEl && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
    </div>
  )
}

// ── EyeBtn fuera también por la misma razón ──
function EyeBtn({ show, toggle }) {
  return (
    <button type="button" onClick={toggle} className="transition-colors duration-200"
      style={{ color: show ? '#6366f1' : '#cbd5e1' }}>
      {show
        ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
      }
    </button>
  )
}

function SubmitBtn({ loading, label, loadingLabel }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200"
      style={{
        background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
        boxShadow: loading ? 'none' : '0 4px 20px rgba(99,102,241,0.35)',
        transform: loading ? 'scale(0.98)' : 'scale(1)',
      }}>
      {loading
        ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>{loadingLabel}</>
        : <>{label}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
      }
    </button>
  )
}

export default function AuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState(initialMode)
  const [animating, setAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ email: '', username: '', password: '', confirm: '' })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  function switchMode(newMode) {
    if (animating || newMode === mode) return
    setAnimating(true)
    setError(''); setSuccess(''); setFocused(null)
    setTimeout(() => { setMode(newMode); setAnimating(false) }, 300)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { data } = await api.post('/auth/login', loginForm)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setSuccess('¡Bienvenido de nuevo!')
      setTimeout(() => navigate('/'), 700)
    } catch (err) {
      setError(err.response?.data?.detail || 'Email o contraseña incorrectos')
    } finally { setLoading(false) }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    if (registerForm.password !== registerForm.confirm) return setError('Las contraseñas no coinciden')
    if (registerForm.password.length < 6) return setError('Mínimo 6 caracteres')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', {
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password,
      })
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setSuccess('¡Cuenta creada!')
      setTimeout(() => navigate('/'), 700)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al crear la cuenta')
    } finally { setLoading(false) }
  }

  const isLogin = mode === 'login'

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f1f5f9 50%, #eef2ff 100%)' }}>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .auth-card { animation: slideUp 0.5s ease forwards; }
        .form-enter { animation: fadeSlideIn 0.3s ease forwards; }
      `}</style>

      <div className="auth-card w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex"
        style={{
          boxShadow: '0 32px 80px rgba(99,102,241,0.12), 0 4px 24px rgba(0,0,0,0.06)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>

        {/* Panel izquierdo */}
        <div className="hidden md:block w-5/12 relative overflow-hidden bg-indigo-50">
          <ProductShowcase mode={mode} />
        </div>

        {/* Panel derecho */}
        <div className="flex-1 flex flex-col justify-center px-10 py-10">

          {/* Logo móvil */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="font-black text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>ShopEasy</span>
          </div>

          {/* Título */}
          <div className="mb-7">
            <h1 className="text-2xl font-black text-gray-900 mb-1"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
              {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h1>
            <p className="text-sm text-gray-400">
              {isLogin
                ? 'Inicia sesión para continuar comprando'
                : 'Regístrate gratis y empieza a comprar hoy'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-7 bg-gray-50 border border-gray-100">
            {[
              { key: 'login', label: 'Iniciar sesión' },
              { key: 'register', label: 'Crear cuenta' },
            ].map(tab => (
              <button key={tab.key} onClick={() => switchMode(tab.key)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-250"
                style={{
                  background: mode === tab.key ? '#fff' : 'transparent',
                  color: mode === tab.key ? '#6366f1' : '#94a3b8',
                  boxShadow: mode === tab.key ? '0 1px 8px rgba(99,102,241,0.12)' : 'none',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2 bg-red-50 border border-red-100 text-red-500">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2 bg-green-50 border border-green-100 text-green-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          )}

          {/* Formularios */}
          <div key={mode} className="form-enter"
            style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.25s ease' }}>

            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <Field
                  id="li-email" label="Email" type="email"
                  value={loginForm.email}
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="tu@email.com"
                  iconPath="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  focused={focused} setFocused={setFocused}
                />
                <Field
                  id="li-pass" label="Contraseña"
                  type={showPass ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  iconPath="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  rightEl={<EyeBtn show={showPass} toggle={() => setShowPass(s => !s)} />}
                  focused={focused} setFocused={setFocused}
                />
                <SubmitBtn loading={loading} label="Iniciar sesión" loadingLabel="Entrando..." />
                <p className="text-center text-xs text-gray-400 pt-1">
                  ¿Sin cuenta?{' '}
                  <button type="button" onClick={() => switchMode('register')}
                    className="font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
                    Regístrate gratis
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <Field
                  id="rg-email" label="Email" type="email"
                  value={registerForm.email}
                  onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                  placeholder="tu@email.com"
                  iconPath="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  focused={focused} setFocused={setFocused}
                />
                <Field
                  id="rg-user" label="Nombre de usuario"
                  value={registerForm.username}
                  onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
                  placeholder="tunombre"
                  iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  focused={focused} setFocused={setFocused}
                />
                <Field
                  id="rg-pass" label="Contraseña"
                  type={showPass ? 'text' : 'password'}
                  value={registerForm.password}
                  onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  iconPath="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  rightEl={<EyeBtn show={showPass} toggle={() => setShowPass(s => !s)} />}
                  focused={focused} setFocused={setFocused}
                />
                <Field
                  id="rg-confirm" label="Confirmar contraseña"
                  type={showConfirm ? 'text' : 'password'}
                  value={registerForm.confirm}
                  onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                  placeholder="Repite tu contraseña"
                  iconPath="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  rightEl={<EyeBtn show={showConfirm} toggle={() => setShowConfirm(s => !s)} />}
                  focused={focused} setFocused={setFocused}
                />
                <SubmitBtn loading={loading} label="Crear cuenta gratis" loadingLabel="Creando cuenta..." />
                <p className="text-center text-xs text-gray-400 pt-1">
                  ¿Ya tienes cuenta?{' '}
                  <button type="button" onClick={() => switchMode('login')}
                    className="font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
                    Inicia sesión
                  </button>
                </p>
              </form>
            )}
          </div>

          <p className="text-xs text-center text-gray-300 mt-8">
            © 2026 ShopEasy · Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  )
}
