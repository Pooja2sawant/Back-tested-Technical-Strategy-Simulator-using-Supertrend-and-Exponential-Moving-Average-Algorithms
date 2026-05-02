import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { loginUser, registerUser } from '../lib/api'

function Field(props: {
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="group relative block">
      <span className="pointer-events-none absolute left-3 top-2.5 text-xs text-slate-400 transition-all group-focus-within:top-1 group-focus-within:text-[11px] group-focus-within:text-slate-300">
        {props.label}
      </span>
      <input
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? ''}
        value={props.value}
        onChange={props.onChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 pb-2 pt-6 text-base text-white outline-none transition focus:border-indigo-400/40 focus:bg-white/7"
      />
    </label>
  )
}

export function HomeAuthPage() {
  const navigate = useNavigate()

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Register state
  const [regFullname, setRegFullname] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regError, setRegError] = useState('')
  const [regLoading, setRegLoading] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both email and password')
      return
    }
    
    setLoginError('')
    setLoginLoading(true)

    try {
      const result = await loginUser(loginEmail, loginPassword)
      if (result.success) {
        setLoginSuccess(true)
        localStorage.setItem('user', JSON.stringify(result.user))
        setTimeout(() => {
          navigate('/backtesting')
        }, 800)
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Login failed'
      if (errorMsg.includes('Invalid')) {
        setLoginError('Email not registered or incorrect password. Please register first.')
      } else {
        setLoginError(errorMsg)
      }
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!regFullname.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Please fill in all fields')
      return
    }
    
    if (regPassword.length < 4) {
      setRegError('Password must be at least 4 characters')
      return
    }
    
    setRegError('')
    setRegLoading(true)

    try {
      const result = await registerUser(regFullname, regEmail, regPassword)
      if (result.success) {
        setRegSuccess(true)
        setLoginEmail(regEmail)
        setLoginPassword('')
        setLoginSuccess(false)
        setLoginError('')
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Registration failed'
      setRegError(errorMsg)
    } finally {
      setRegLoading(false)
    }
  }

  return (
    <PageShell
      title="Backtested Technical Strategy Simulator using EMA & Supertrend"
      subtitle=""
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_20%_20%,black,transparent)]">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(99,102,241,0.2),rgba(236,72,153,0.15))]" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-sm font-medium text-slate-200"
            >
              Backtest Pro
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
              className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl"
            >
              Practice strategies.
              <br />
              Understand signals.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
              className="mt-4 max-w-xl text-sm text-slate-300 md:text-base"
            >
              Use candlesticks, overlays (EMA / Supertrend), and clear buy/sell markers to learn how
              indicator-based backtesting works without placing real trades.
            </motion.p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-slate-400">Beginner-friendly</div>
                <div className="mt-1 text-sm font-medium text-white">Tooltips + explanations</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-slate-400">Real endpoints only</div>
                <div className="mt-1 text-sm font-medium text-white">No fake data</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
          >
            <div className="mb-4 text-base font-semibold text-white">Login</div>
            <form onSubmit={handleLogin} className="grid gap-3">
              <Field
                label="Email"
                type="email"
                placeholder=" "
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Field
                label="Password"
                type="password"
                placeholder=" "
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {loginError && <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{loginError}</div>}
              {loginSuccess && (
                <div className="rounded-lg bg-green-500/10 px-3 py-2 text-xs text-green-300">Login successful!</div>
              )}
              <button
                type="submit"
                disabled={loginLoading}
                className="mt-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-base font-semibold text-white transition hover:bg-indigo-400 active:scale-[0.99] disabled:opacity-50"
              >
                {loginLoading ? 'Signing in...' : 'Sign in'}
              </button>
              <div className="text-xs text-slate-400">New user? Register on the right →</div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
          >
            <div className="mb-4 text-base font-semibold text-white">Register</div>
            <form onSubmit={handleRegister} className="grid gap-3">
              <Field
                label="Full name"
                placeholder=" "
                value={regFullname}
                onChange={(e) => setRegFullname(e.target.value)}
              />
              <Field
                label="Email"
                type="email"
                placeholder=" "
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <Field
                label="Password"
                type="password"
                placeholder=" "
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              {regError && <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{regError}</div>}
              {regSuccess && (
                <div className="rounded-lg bg-green-500/10 px-3 py-2 text-xs text-green-300">Account created! Please login.</div>
              )}
              <button
                type="submit"
                disabled={regLoading}
                className="mt-2 rounded-xl bg-fuchsia-500 px-4 py-2.5 text-base font-semibold text-white transition hover:bg-fuchsia-400 active:scale-[0.99] disabled:opacity-50"
              >
                {regLoading ? 'Creating account...' : 'Create account'}
              </button>
              <div className="text-xs text-slate-400">Register first, then login</div>
            </form>
          </motion.div>
        </div>
      </div>
    </PageShell>
  )
}
