import { PageShell } from '../components/PageShell'
import { useMemo, useState, type CSSProperties } from 'react'
import { getSentimentNews } from '../lib/api'
import type { SentimentNewsResponse } from '../lib/types'

export function SentimentPage() {
  const [query, setQuery] = useState('Reliance Industries')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SentimentNewsResponse | null>(null)

  async function run() {
    const q = query.trim()
    if (!q) {
      setError('Please enter a company name.')
      setData(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const resp = await getSentimentNews(q)
      if ((resp as { error?: string }).error) {
        setError((resp as { error?: string }).error ?? 'Failed to fetch sentiment.')
        setData(null)
      } else {
        setData(resp)
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch sentiment.'
      setError(message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const chart = useMemo(() => {
    const s = data?.sentiment
    const total = data?.total ?? 0
    const pos = s?.positive ?? 0
    const neu = s?.neutral ?? 0
    const neg = s?.negative ?? 0

    if (!total) {
      return {
        total: 0,
        pos,
        neu,
        neg,
        style: undefined as CSSProperties | undefined,
        pct: { pos: 0, neu: 0, neg: 0 },
      }
    }

    const posPct = (pos / total) * 100
    const neuPct = (neu / total) * 100
    const negPct = 100 - posPct - neuPct
    const s1 = posPct
    const s2 = posPct + neuPct
    const style: CSSProperties = {
      background: `conic-gradient(#22c55e 0% ${s1}%, #facc15 ${s1}% ${s2}%, #ef4444 ${s2}% 100%)`,
    }

    return {
      total,
      pos,
      neu,
      neg,
      style,
      pct: { pos: posPct, neu: neuPct, neg: negPct },
    }
  }, [data])

  return (
    <PageShell title="Sentiment" subtitle="News + sentiment from your backend APIs.">
      <div className="grid gap-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="text-xs font-medium text-slate-300">Company</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Reliance Industries"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400/40"
              />
              <div className="mt-2 text-xs text-slate-400">
                Fetches Google News RSS headlines and scores them with VADER.
              </div>
            </div>
            <div className="md:col-span-4 md:flex md:items-end">
              <button
                type="button"
                onClick={run}
                disabled={loading}
                className={[
                  'w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition',
                  'hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60',
                ].join(' ')}
              >
                {loading ? 'Analyzing…' : 'Run sentiment'}
              </button>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Summary</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Total Headlines</div>
                  <div className="mt-1 text-lg font-semibold text-white">{chart.total}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Positive</div>
                  <div className="mt-1 text-lg font-semibold text-emerald-300">{chart.pos}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Neutral</div>
                  <div className="mt-1 text-lg font-semibold text-amber-200">{chart.neu}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-slate-400">Negative</div>
                  <div className="mt-1 text-lg font-semibold text-rose-300">{chart.neg}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-5">
                <div className="h-40 w-40 shrink-0 rounded-full border border-white/10" style={chart.style} />
                <div className="grid gap-2 text-sm text-slate-200">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      Positive
                    </span>
                    <span className="font-mono text-slate-300">{chart.pct.pos.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      Neutral
                    </span>
                    <span className="font-mono text-slate-300">{chart.pct.neu.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      Negative
                    </span>
                    <span className="font-mono text-slate-300">{chart.pct.neg.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-white">Headlines</div>
                <div className="text-xs text-slate-400">{data?.query ? `Query: ${data.query}` : '—'}</div>
              </div>
              <div className="mt-4 grid gap-2">
                {data?.headlines?.length ? (
                  (data.items?.length ? data.items : data.headlines.slice(0, 20).map((title) => ({ title, url: null }))).slice(0, 20).map((it, idx) => (
                    <div
                      key={`${idx}-${it.title.slice(0, 16)}`}
                      className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200"
                    >
                      {it.url ? (
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block hover:text-indigo-200"
                        >
                          {it.title}
                        </a>
                      ) : (
                        it.title
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-10 text-center text-sm text-slate-400">
                    Run sentiment to fetch headlines.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
