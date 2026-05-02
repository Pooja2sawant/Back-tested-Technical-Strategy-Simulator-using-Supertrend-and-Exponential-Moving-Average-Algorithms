import type { Candle } from './types'

export type SeriesPoint = { time: number; value: number }

export function calculateEMA(candles: Candle[], length: number): SeriesPoint[] {
  if (candles.length === 0) return []
  const k = 2 / (length + 1)

  const out: SeriesPoint[] = []
  let ema = candles[0].close

  for (const c of candles) {
    ema = c.close * k + ema * (1 - k)
    out.push({ time: c.time, value: ema })
  }

  return out
}

export type SupertrendComputedPoint = {
  time: number
  value: number | null
  trend: 'up' | 'down'
}

export function calculateSupertrend(
  candles: Candle[],
  period: number,
  multiplier: number
): SupertrendComputedPoint[] {
  if (candles.length === 0) return []
  const p = Math.max(1, Math.floor(period))
  const m = multiplier

  const tr: number[] = []
  for (let i = 0; i < candles.length; i++) {
    const c = candles[i]
    const prevClose = i > 0 ? candles[i - 1].close : c.close
    const a = Math.abs(c.high - c.low)
    const b = Math.abs(c.high - prevClose)
    const d = Math.abs(c.low - prevClose)
    tr.push(Math.max(a, b, d))
  }

  const alpha = 1 / p
  const atr: number[] = []
  let atrPrev = tr[0]
  for (let i = 0; i < tr.length; i++) {
    atrPrev = atrPrev + alpha * (tr[i] - atrPrev)
    atr.push(atrPrev)
  }

  const basicUb: number[] = []
  const basicLb: number[] = []
  for (let i = 0; i < candles.length; i++) {
    const hl2 = (candles[i].high + candles[i].low) / 2
    basicUb.push(hl2 + m * atr[i])
    basicLb.push(hl2 - m * atr[i])
  }

  const finalUb: number[] = [...basicUb]
  const finalLb: number[] = [...basicLb]

  for (let i = 1; i < candles.length; i++) {
    const prevClose = candles[i - 1].close
    if (basicUb[i] < finalUb[i - 1] || prevClose > finalUb[i - 1]) {
      finalUb[i] = basicUb[i]
    } else {
      finalUb[i] = finalUb[i - 1]
    }

    if (basicLb[i] > finalLb[i - 1] || prevClose < finalLb[i - 1]) {
      finalLb[i] = basicLb[i]
    } else {
      finalLb[i] = finalLb[i - 1]
    }
  }

  const inUptrend: boolean[] = new Array(candles.length).fill(false)
  for (let i = 1; i < candles.length; i++) {
    const close = candles[i].close
    if (close > finalUb[i - 1]) {
      inUptrend[i] = true
    } else if (close < finalLb[i - 1]) {
      inUptrend[i] = false
    } else {
      inUptrend[i] = inUptrend[i - 1]
      if (inUptrend[i] && finalLb[i] < finalLb[i - 1]) {
        finalLb[i] = finalLb[i - 1]
      }
      if (!inUptrend[i] && finalUb[i] > finalUb[i - 1]) {
        finalUb[i] = finalUb[i - 1]
      }
    }
  }

  const out: SupertrendComputedPoint[] = []
  for (let i = 0; i < candles.length; i++) {
    const trend = inUptrend[i] ? 'up' : 'down'
    const value = inUptrend[i] ? finalLb[i] : finalUb[i]
    out.push({ time: candles[i].time, value, trend })
  }
  return out
}
