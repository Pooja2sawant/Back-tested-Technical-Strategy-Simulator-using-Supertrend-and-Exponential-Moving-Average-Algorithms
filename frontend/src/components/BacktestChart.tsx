import { useEffect, useMemo, useRef } from 'react'
import {
  createChart,
  type Time,
} from 'lightweight-charts'
import type { Candle, Signal, SupertrendPoint } from '../lib/types'
import { calculateEMA, calculateSupertrend } from '../lib/indicators'

type Props = {
  candles: Candle[]
  signals: Signal[]
  strategy: 'ema' | 'supertrend'
  emaShort: number
  emaLong: number
  stPeriod: number
  stMultiplier: number
  supertrend?: SupertrendPoint[]
}

export function BacktestChart(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<any>(null)
  const candleSeriesRef = useRef<any>(null)
  const emaShortRef = useRef<any>(null)
  const emaLongRef = useRef<any>(null)
  const stUpRef = useRef<any>(null)
  const stDownRef = useRef<any>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { color: 'transparent' },
        textColor: '#cbd5e1',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.06)' },
        horzLines: { color: 'rgba(255,255,255,0.06)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.10)',
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.10)',
      },
      crosshair: {
        vertLine: { color: 'rgba(148,163,184,0.35)' },
        horzLine: { color: 'rgba(148,163,184,0.35)' },
      },
    })

    const candleSeries = (chart as any).addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    })

    chartRef.current = chart
    candleSeriesRef.current = candleSeries

    const ro = new ResizeObserver(() => {
      chart.timeScale().fitContent()
    })
    ro.observe(el)

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current = null
      candleSeriesRef.current = null
      emaShortRef.current = null
      emaLongRef.current = null
      stUpRef.current = null
      stDownRef.current = null
    }
  }, [])

  const emaShort = useMemo(() => calculateEMA(props.candles, props.emaShort), [props.candles, props.emaShort])
  const emaLong = useMemo(() => calculateEMA(props.candles, props.emaLong), [props.candles, props.emaLong])
  const supertrendFallback = useMemo(() => {
    if (props.strategy !== 'supertrend') return []
    return calculateSupertrend(props.candles, props.stPeriod, props.stMultiplier)
  }, [props.candles, props.stMultiplier, props.stPeriod, props.strategy])

  useEffect(() => {
    const chart = chartRef.current
    const candleSeries = candleSeriesRef.current
    if (!chart || !candleSeries) return

    candleSeries.setData(
      props.candles.map((c) => ({
        time: c.time as Time,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }))
    )

    ;(candleSeries as any).setMarkers(
      props.signals.map((s) => ({
        time: s.time as Time,
        position: s.signal === 'buy' ? 'belowBar' : 'aboveBar',
        color: s.signal === 'buy' ? '#22c55e' : '#ef4444',
        shape: s.signal === 'buy' ? 'arrowUp' : 'arrowDown',
        text: s.signal === 'buy' ? 'BUY' : 'SELL',
      }))
    )

    if (emaShortRef.current) {
      chart.removeSeries(emaShortRef.current)
      emaShortRef.current = null
    }
    if (emaLongRef.current) {
      chart.removeSeries(emaLongRef.current)
      emaLongRef.current = null
    }
    if (stUpRef.current) {
      chart.removeSeries(stUpRef.current)
      stUpRef.current = null
    }
    if (stDownRef.current) {
      chart.removeSeries(stDownRef.current)
      stDownRef.current = null
    }

    if (props.strategy === 'ema') {
      const s1 = (chart as any).addLineSeries({ color: '#f97316', lineWidth: 2 })
      const s2 = (chart as any).addLineSeries({ color: '#38bdf8', lineWidth: 2 })
      s1.setData(emaShort.map((p) => ({ time: p.time as Time, value: p.value })))
      s2.setData(emaLong.map((p) => ({ time: p.time as Time, value: p.value })))
      emaShortRef.current = s1
      emaLongRef.current = s2
    } else {
      const up = (chart as any).addLineSeries({ color: '#22c55e', lineWidth: 2 })
      const down = (chart as any).addLineSeries({ color: '#ef4444', lineWidth: 2 })

      const st = (props.supertrend && props.supertrend.length ? props.supertrend : supertrendFallback) as Array<
        SupertrendPoint
      >
      const upData = st.map((p) => {
        if (p.value === null || p.trend !== 'up') return { time: p.time as Time }
        return { time: p.time as Time, value: p.value }
      })
      const downData = st.map((p) => {
        if (p.value === null || p.trend !== 'down') return { time: p.time as Time }
        return { time: p.time as Time, value: p.value }
      })

      up.setData(upData)
      down.setData(downData)
      stUpRef.current = up
      stDownRef.current = down
    }

    chart.timeScale().fitContent()
  }, [
    props.candles,
    props.signals,
    props.strategy,
    props.supertrend,
    emaShort,
    emaLong,
    supertrendFallback,
  ])

  return <div ref={containerRef} className="h-[520px] w-full" />
}
