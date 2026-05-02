import type { Signal, Trade } from './types'

export function buildTradesFromSignals(signals: Signal[]): Trade[] {
  const sorted = [...signals].sort((a, b) => a.time - b.time)
  const trades: Trade[] = []

  let openBuy: { time: number; price: number } | null = null

  for (const s of sorted) {
    if (s.signal === 'buy') {
      if (!openBuy) {
        openBuy = { time: s.time, price: s.price }
      }
      continue
    }

    if (s.signal === 'sell') {
      if (!openBuy) continue
      const buy = openBuy
      const sell = { time: s.time, price: s.price }
      openBuy = null

      const returnPct = ((sell.price - buy.price) / buy.price) * 100
      trades.push({
        id: trades.length + 1,
        buyTime: buy.time,
        buyPrice: buy.price,
        sellTime: sell.time,
        sellPrice: sell.price,
        returnPct,
      })
    }
  }

  return trades
}

export function formatTime(tsSeconds: number): string {
  const d = new Date(tsSeconds * 1000)
  return d.toLocaleDateString()
}
