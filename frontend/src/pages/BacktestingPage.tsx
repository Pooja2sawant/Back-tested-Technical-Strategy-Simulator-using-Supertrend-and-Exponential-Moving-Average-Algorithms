import { PageShell } from '../components/PageShell'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BacktestChart } from '../components/BacktestChart'
import { getCandles, searchSymbols } from '../lib/api'
import { buildTradesFromSignals, formatTime } from '../lib/backtest'
import type { CandlesResponse, YahooSearchQuote } from '../lib/types'

const INTERVALS = ['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '1wk', '1mo'] as const

function clampInt(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function clampFloat(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function formatPct(v: number) {
  return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`
}

export function BacktestingPage() {
  const [market, setMarket] = useState<'stocks' | 'crypto'>('stocks')
  const [companyName, setCompanyName] = useState('')
  const [quotes, setQuotes] = useState<YahooSearchQuote[]>([])
  const [symbol, setSymbol] = useState('AAPL')
  const [interval, setInterval] = useState<(typeof INTERVALS)[number]>('1d')
  const [strategy, setStrategy] = useState<'ema' | 'supertrend'>('ema')
  const [emaShort, setEmaShort] = useState(20)
  const [emaLong, setEmaLong] = useState(50)
  const [stPeriod, setStPeriod] = useState(7)
  const [stMultiplier, setStMultiplier] = useState(3)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<CandlesResponse | null>(null)

  const lastSearchIdRef = useRef(0)
  const [showQuotes, setShowQuotes] = useState(false)

  useEffect(() => {
    const q = companyName.trim()
    if (!q) {
      setQuotes([])
      setShowQuotes(false)
      return
    }

    const searchId = ++lastSearchIdRef.current
    const t = window.setTimeout(async () => {
      try {
        const resp = await searchSymbols(q)
        console.log('Raw search response:', resp)
        if (lastSearchIdRef.current !== searchId) return
        const raw = resp.quotes ?? []
        console.log('Raw quotes:', raw)

        // Initial pass: drop entries without a useful name or symbol and some known bad tickers
        const filteredRaw = raw.filter((item) => {
          const displayName = item.shortname || item.longname
          const s = item.symbol || ''
          if (!displayName) return false
          if (!s) return false
          if (/^0P/i.test(s) || /\.BO$/i.test(s)) return false
          return true
        })

        // Prefer exchange-qualified and relevant tickers for the selected market (heuristic scoring)
        function scoreQuote(item: YahooSearchQuote) {
          const s = (item.symbol || '').toUpperCase()
          const ex = (item.exchange || '').toUpperCase()
          let score = 0
          if (market === 'stocks') {
            if (s.includes('.NS')) score += 30
            if (ex.includes('NSE') || ex.includes('BSE')) score += 20
            if (item.quoteType === 'EQUITY') score += 5
          } else if (market === 'crypto') {
            if (item.quoteType === 'CRYPTO') score += 30
            if (ex.includes('CRYPTO') || s.endsWith('-USD')) score += 10
          }
          // small preference for shorter symbols (heuristic)
          score -= s.length * 0.1
          return score
        }

        const filtered = filteredRaw.sort((a, b) => scoreQuote(b) - scoreQuote(a))
        console.log('Filtered quotes (scored):', filtered)
        setQuotes(filtered)
        setShowQuotes(filtered.length > 0)
      } catch (error) {
        console.error('Search error:', error)
        if (lastSearchIdRef.current !== searchId) return
        setQuotes([])
        setShowQuotes(false)
      }
    }, 300)

    return () => window.clearTimeout(t)
  }, [companyName])

  const trades = useMemo(() => {
    if (!data?.signals) return []
    return buildTradesFromSignals(data.signals)
  }, [data])

  const stats = useMemo(() => {
    const total = trades.length
    const wins = trades.filter((t) => t.returnPct > 0).length
    const losses = trades.filter((t) => t.returnPct <= 0).length
    const winRate = total ? (wins / total) * 100 : 0
    const compounded = trades.reduce((acc, t) => acc * (1 + t.returnPct / 100), 1)
    const netReturnPct = (compounded - 1) * 100
    return { total, wins, losses, winRate, netReturnPct }
  }, [trades])

  async function runBacktest() {
    const s = symbol.trim()
    if (!s) {
      setError('Please select a valid symbol.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const payload =
        strategy === 'ema'
          ? await getCandles({
              symbol: s,
              interval,
              strategy: 'ema',
              ema_short: clampInt(emaShort, 1, 500),
              ema_long: clampInt(emaLong, 1, 500),
            })
          : await getCandles({
              symbol: s,
              interval,
              strategy: 'supertrend',
              st_period: clampInt(stPeriod, 1, 100),
              st_multiplier: clampFloat(stMultiplier, 0.1, 50),
            })

      if ((payload as { error?: string }).error) {
        setError((payload as { error?: string }).error ?? 'Unknown error')
        setData(null)
      } else {
        setData(payload)
      }
    } catch (e: unknown) {
      // Unwrap axios/flask errors so backend messages are visible to the user when possible
      let message = 'Failed to run backtest.'
      const anyErr = e as any
      if (anyErr?.response?.data?.error) {
        message = String(anyErr.response.data.error)
      } else if (anyErr?.message) {
        message = String(anyErr.message)
      }
      setError(message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell
      title="Backtesting"
      subtitle="Run EMA crossover or Supertrend backtests using your backend (/api/candles, /api/search_symbol)."
    >
      <div className="grid gap-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="text-xs font-medium text-slate-300">Company name</div>
              <div className="relative mt-2">
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onFocus={() => {
                    if (quotes.length > 0) setShowQuotes(true)
                  }}
                  onMouseDown={() => {
                    if (quotes.length > 0) setShowQuotes(true)
                  }}
                  placeholder="Type company name…"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-base text-white outline-none transition focus:border-indigo-400/40"
                />
                {showQuotes && quotes.length > 0 ? (
                  <div 
                    className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-64 overflow-auto rounded-xl border border-white/10 bg-slate-950/95 p-1 shadow-2xl shadow-black/40"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {quotes.slice(0, 12).map((q, idx) => {
                      const displayName = q.shortname || q.longname || q.symbol || ''
                      return (
                        <button
                          key={`${q.symbol ?? idx}`}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const chosenSymbol = String(q.symbol ?? '').trim()
                            console.log('Clicked! Setting symbol to:', chosenSymbol, 'from quote:', q)
                            setSymbol(chosenSymbol)
                            setCompanyName(displayName)
                            setShowQuotes(false)
                            setQuotes([])
                          }}
                          className="w-full rounded-lg px-3 py-2 text-left text-base text-slate-200 transition hover:bg-white/5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="truncate">{displayName}</span>
                            <span className="shrink-0 font-mono text-xs text-slate-400">{q.symbol}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
              <div className="mt-2 text-xs text-slate-400">Start typing to see suggestions, then select to auto-fill the symbol.</div>
            </div>

            <div className="md:col-span-2">
              <div className="text-xs font-medium text-slate-300">Symbol</div>
              <input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Auto-filled (editable)"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-base font-mono text-white outline-none transition focus:border-indigo-400/40"
              />

            </div>

            <div className="md:col-span-2">
              <div className="text-xs font-medium text-slate-300">Timeframe</div>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value as (typeof INTERVALS)[number])}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-base text-white outline-none"
              >
                {INTERVALS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-medium text-slate-300">Strategy</div>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value as 'ema' | 'supertrend')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-base text-white outline-none"
              >
                <option value="ema">EMA crossover</option>
                <option value="supertrend">Supertrend</option>
              </select>
            </div>

            {strategy === 'ema' ? (
              <>
                <div className="md:col-span-3">
                  <div className="text-xs font-medium text-slate-300">EMA short</div>
                  <input
                    type="number"
                    value={emaShort}
                    onChange={(e) => setEmaShort(parseInt(e.target.value || '0', 10))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>
                <div className="md:col-span-3">
                  <div className="text-xs font-medium text-slate-300">EMA long</div>
                  <input
                    type="number"
                    value={emaLong}
                    onChange={(e) => setEmaLong(parseInt(e.target.value || '0', 10))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-3">
                  <div className="text-xs font-medium text-slate-300">Supertrend period</div>
                  <input
                    type="number"
                    value={stPeriod}
                    onChange={(e) => setStPeriod(parseInt(e.target.value || '0', 10))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>
                <div className="md:col-span-3">
                  <div className="text-xs font-medium text-slate-300">Multiplier</div>
                  <input
                    type="number"
                    step="0.1"
                    value={stMultiplier}
                    onChange={(e) => setStMultiplier(parseFloat(e.target.value || '0'))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </>
            )}

            <div className="md:col-span-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Calls:
                  <span className="ml-2 font-mono text-slate-300">/api/search_symbol</span>
                  <span className="ml-2 font-mono text-slate-300">/api/candles</span>
                </div>
                <button
                  type="button"
                  onClick={runBacktest}
                  disabled={loading}
                  className={[
                    'rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition',
                    'hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60',
                  ].join(' ')}
                >
                  {loading ? 'Running…' : 'Run backtest'}
                </button>
              </div>

              {error ? (
                <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="text-sm font-semibold text-white">Chart</div>
                <div className="text-xs text-slate-400">
                  {data?.candles?.length ? `${data.candles.length} candles` : '—'}
                </div>
              </div>
              <div className="p-3">
                {data?.candles?.length ? (
                  <BacktestChart
                    candles={data.candles}
                    signals={data.signals}
                    strategy={data.strategy ?? strategy}
                    emaShort={emaShort}
                    emaLong={emaLong}
                    stPeriod={stPeriod}
                    stMultiplier={stMultiplier}
                    supertrend={data.supertrend}
                  />
                ) : (
                  <div className="flex h-[520px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/10 text-sm text-slate-400">
                    Run a backtest to render candles.
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Beginner Help</div>
              <div className="mt-3 grid gap-3 text-sm text-slate-200">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-medium text-slate-300">Candles</div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-1 w-0.5 bg-emerald-400"></div>
                        <div className="h-6 w-2 rounded-sm bg-emerald-500"></div>
                        <div className="h-1 w-0.5 bg-emerald-400"></div>
                      </div>
                      <span className="text-xs text-slate-300">Green = represents buyers dominated</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-1 w-0.5 bg-rose-400"></div>
                        <div className="h-6 w-2 rounded-sm bg-rose-500 border border-rose-600"></div>
                        <div className="h-1 w-0.5 bg-rose-400"></div>
                      </div>
                      <span className="text-xs text-slate-300">Red = represents sellers dominated</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-medium text-slate-300">EMA</div>
                  <div className="mt-1 text-xs text-slate-300">Crossovers can suggest trend shifts, but they lag price.</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-medium text-slate-300">Supertrend</div>
                  <div className="mt-1 text-xs text-slate-300">Green = uptrend (buy). Red = downtrend (exit / sell).</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Summary</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Total trades</div>
                  <div className="mt-1 text-lg font-semibold text-white">{stats.total}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Win rate</div>
                  <div className="mt-1 text-lg font-semibold text-white">{stats.winRate.toFixed(1)}%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Wins</div>
                  <div className="mt-1 text-lg font-semibold text-white">{stats.wins}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Losses</div>
                  <div className="mt-1 text-lg font-semibold text-white">{stats.losses}</div>
                </div>
                <div className="col-span-2 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Net return (compounded)</div>
                  <div
                    className={[
                      'mt-1 text-lg font-semibold',
                      stats.netReturnPct >= 0 ? 'text-emerald-300' : 'text-rose-300',
                    ].join(' ')}
                  >
                    {formatPct(stats.netReturnPct)}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Trades</div>
              <div className="mt-1 text-xs text-slate-400">Built from backend signals (buy/sell). No mock trades.</div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-[860px] w-full text-left text-sm">
                <thead className="bg-black/30 text-xs text-slate-300">
                  <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Buy Date</th>
                    <th className="px-3 py-2">Buy Price</th>
                    <th className="px-3 py-2">Sell Date</th>
                    <th className="px-3 py-2">Sell Price</th>
                    <th className="px-3 py-2">Returns %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {trades.length ? (
                    trades.map((t) => (
                      <tr key={t.id} className="bg-white/[0.02]">
                        <td className="px-3 py-2 text-slate-300">{t.id}</td>
                        <td className="px-3 py-2 text-slate-200">{formatTime(t.buyTime)}</td>
                        <td className="px-3 py-2 font-mono text-slate-200">{t.buyPrice.toFixed(2)}</td>
                        <td className="px-3 py-2 text-slate-200">{formatTime(t.sellTime)}</td>
                        <td className="px-3 py-2 font-mono text-slate-200">{t.sellPrice.toFixed(2)}</td>
                        <td
                          className={[
                            'px-3 py-2 font-semibold',
                            t.returnPct >= 0 ? 'text-emerald-300' : 'text-rose-300',
                          ].join(' ')}
                        >
                          {formatPct(t.returnPct)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-3 py-10 text-center text-slate-400">
                        No completed trades yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
