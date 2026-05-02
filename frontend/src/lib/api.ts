import axios from 'axios'
import type { CandlesResponse, SearchSymbolResponse, SentimentNewsResponse } from './types'

const client = axios.create({
  baseURL: '',
  timeout: 20000,
})

export async function searchSymbols(q: string): Promise<SearchSymbolResponse> {
  const resp = await client.get<SearchSymbolResponse>('/api/search_symbol', {
    params: { q },
  })
  return resp.data
}

export type GetCandlesParams =
  | {
      symbol: string
      interval: string
      strategy: 'ema'
      ema_short: number
      ema_long: number
    }
  | {
      symbol: string
      interval: string
      strategy: 'supertrend'
      st_period: number
      st_multiplier: number
    }

export async function getCandles(params: GetCandlesParams): Promise<CandlesResponse> {
  const resp = await client.get<CandlesResponse>('/api/candles', {
    params,
  })
  return resp.data
}

export interface AuthResponse {
  success: boolean
  message: string
  user: {
    email: string
    fullname: string
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const resp = await client.post<AuthResponse>('/api/auth/login', {
    email,
    password,
  })
  return resp.data
}

export async function registerUser(
  fullname: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const resp = await client.post<AuthResponse>('/api/auth/register', {
    fullname,
    email,
    password,
  })
  return resp.data
}

export async function logoutUser(): Promise<{ success: boolean; message: string }> {
  const resp = await client.post('/api/auth/logout', {})
  return resp.data
}

export async function getSentimentNews(q: string): Promise<SentimentNewsResponse> {
  const resp = await client.get<SentimentNewsResponse>('/api/sentiment_news', {
    params: { q },
  })
  return resp.data
}
