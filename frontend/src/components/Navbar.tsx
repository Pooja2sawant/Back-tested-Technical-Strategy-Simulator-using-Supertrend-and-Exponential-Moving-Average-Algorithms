import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/backtesting', label: 'Backtesting' },
  { to: '/sentiment', label: 'Sentiment' },
  { to: '/learn', label: 'Learn' },
  { to: '/about', label: 'About' },
] as const

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/20" />
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-wide text-white">Backtest Pro</div>
            <div className="text-sm text-slate-300">Backtesting • Learning • Insights</div>
          </div>
        </div>

        <nav className="hidden flex-1 items-center justify-end gap-1 md:flex">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === '/'}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-1.5 text-base transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
