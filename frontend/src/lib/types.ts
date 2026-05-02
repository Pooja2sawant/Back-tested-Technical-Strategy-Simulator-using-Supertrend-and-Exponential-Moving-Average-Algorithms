export type Candle = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export type Signal = {
  time: number
  signal: 'buy' | 'sell'
  price: number
}

export type SupertrendPoint = {
  time: number
  value: number | null
  trend: 'up' | 'down'
}

export type CandlesResponse = {
  candles: Candle[]
  signals: Signal[]
  strategy?: 'ema' | 'supertrend'
  supertrend?: SupertrendPoint[]
  error?: string
}

export type YahooSearchQuote = {
  symbol?: string
  shortname?: string
  longname?: string
  exchange?: string
  quoteType?: string
}

export type SearchSymbolResponse = {
  quotes?: YahooSearchQuote[]
  error?: string
}

export type SentimentCounts = {
  positive: number
  neutral: number
  negative: number
}

export type SentimentNewsItem = {
  title: string
  url?: string | null
}

export type SentimentNewsResponse = {
  query: string
  total: number
  sentiment: SentimentCounts
  headlines: string[]
  items?: SentimentNewsItem[]
  error?: string
}

export type Trade = {
  id: number
  buyTime: number
  buyPrice: number
  sellTime: number
  sellPrice: number
  returnPct: number
}
