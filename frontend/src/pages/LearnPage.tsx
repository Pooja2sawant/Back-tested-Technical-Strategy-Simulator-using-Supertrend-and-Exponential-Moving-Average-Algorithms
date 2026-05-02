import { PageShell } from '../components/PageShell'

export function LearnPage() {
  return (
    <PageShell title="Learn" subtitle="Beginner-friendly learning blocks.">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-semibold text-white">Market Phases</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-indigo-200">Trending market</div>
              <div>Price moves strongly up or down. EMA crossover + Supertrend usually work better here.</div>
            </div>
            <div>
              <div className="font-semibold text-amber-200">Sideways market</div>
              <div>Price moves in a range (no clear direction). Many signals become false and choppy.</div>
            </div>
            <div>
              <div className="font-semibold text-fuchsia-200">Volatile market</div>
              <div>Fast, big swings up and down. Risk is higher, so position size and stop-loss matter more.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 1: Foundation of Financial Markets</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">1. What is a Financial Market?</div>
              <div>
                A financial market is a platform where buyers and sellers trade financial assets such as stocks, bonds,
                commodities, and currencies. It enables capital flow between investors and businesses and supports price
                discovery and economic growth.
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">2. Different Types of Markets</div>
              <ul className="mt-2 space-y-1">
                <li>• Equity Market: Trading of company shares</li>
                <li>• Debt Market: Trading of bonds and fixed income securities</li>
                <li>• Derivative Market: Futures and options trading</li>
                <li>• Forex Market: Currency exchange</li>
                <li>• Commodity Market: Trading raw materials like gold or oil</li>
                <li>• Crypto Market: Digital asset trading</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-100">3. Market Horizons & Sessions</div>
              <ul className="mt-2 space-y-1">
                <li>• Short-term: minutes to days</li>
                <li>• Medium-term: weeks to months</li>
                <li>• Long-term: years</li>
              </ul>
              <div className="mt-2">Sessions (trading hours) can affect volatility and liquidity:</div>
              <ul className="mt-2 space-y-1">
                <li>• Pre-market</li>
                <li>• Regular market hours</li>
                <li>• After-hours session</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-100">4. What are Stocks?</div>
              <div>
                Stocks represent ownership in a company. When you buy a stock, you own a small portion of that company
                and may benefit from price appreciation and dividends.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 2: Instruments You Can Trade</div>
          <ul className="mt-3 space-y-1 text-base leading-relaxed text-slate-300">
            <li>• Stocks: shares representing ownership in a company</li>
            <li>• Indexes: group of stocks representing market performance (e.g., NIFTY 50)</li>
            <li>• Bonds & Fixed Income: debt instruments paying fixed interest</li>
            <li>• Commodities: physical goods like gold, oil, wheat</li>
            <li>• Forex: currency pairs like USD/INR</li>
            <li>• Cryptocurrencies: digital assets like Bitcoin</li>
            <li>• ETFs: exchange-traded funds tracking an index</li>
            <li>• Mutual Funds: professionally managed investment pools</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 3: Core Trading Concepts</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">1. What is Liquidity?</div>
              <div>
                Liquidity refers to how easily an asset can be bought or sold without affecting its price. Higher
                liquidity generally means tighter spreads and faster execution.
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">2. What is Margin and Leverage?</div>
              <div>Margin is borrowed money used to trade larger positions. Leverage amplifies buying power using margin.</div>
              <div className="mt-2">Example: With 1:10 leverage, ₹10,000 can control ₹1,00,000 worth of assets.</div>
              <div className="mt-2">Higher leverage increases both profit potential and risk.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">3. Volatility and Its Impact</div>
              <div>
                Volatility measures how much price fluctuates over time. High volatility means larger swings; low
                volatility means more stable movement. Volatility affects risk, stop-loss placement, and strategy choice.
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">4. Slippage and Execution Speed</div>
              <div>
                Slippage occurs when an order executes at a different price than expected due to rapid market movement.
                Faster execution can reduce slippage.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 4: Trading Styles and Approaches</div>
          <ul className="mt-3 space-y-1 text-base leading-relaxed text-slate-300">
            <li>• Day Trading: opening and closing trades within the same day</li>
            <li>• Intraday Trading: similar to day trading; no overnight positions</li>
            <li>• Scalping: very short-term trades capturing small moves</li>
            <li>• Swing Trading: holding positions for days to weeks</li>
            <li>• Position Trading: long-term holding for months or years</li>
            <li>• Algorithmic Trading: automated trading using coded strategies</li>
            <li>• Choosing the right style depends on risk tolerance, time availability, and personality</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 5: Backtesting</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">1. What is Backtesting?</div>
              <div>
                Backtesting is testing a strategy on past market data to see how it would have performed.
                It helps you understand profitability, risk, and how the rules behave before using real money.
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">2. Why is Backtesting Needed?</div>
              <ul className="mt-2 space-y-1">
                <li>• Measure profitability</li>
                <li>• Identify risk</li>
                <li>• Optimize parameters</li>
                <li>• Avoid emotional decision-making</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 6: Strategies</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">What is a Trading Strategy?</div>
              <div>A trading strategy is a clear set of rules that tells you when to enter and exit a trade.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">1. EMA (Exponential Moving Average)</div>
              <div>
                This strategy computes short-term and long-term exponential moving averages on historical price data. A buy
                signal is generated when the short-term EMA crosses above the long-term EMA, indicating a potential upward
                trend. Conversely, a sell signal is generated when the short-term EMA crosses below the long-term EMA.
              </div>
              <div className="mt-2 font-semibold text-slate-100">Formula</div>
              <div className="mt-1 font-mono text-sm text-slate-200">EMA(t) = α · P(t) + (1 − α) · EMA(t−1)</div>
              <div className="mt-1 font-mono text-sm text-slate-200">α = 2 / (N + 1)</div>
              <ul className="mt-2 space-y-1">
                <li>• P(t) is the closing price at time t</li>
                <li>• N is the look-back period</li>
              </ul>
              <div className="mt-2 font-semibold text-slate-100">EMA Crossover Rule</div>
              <ul className="mt-2 space-y-1">
                <li>• Generate a buy signal when EMA(short) &gt; EMA(long)</li>
                <li>• Generate a sell signal when EMA(short) &lt; EMA(long)</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-100">2. Supertrend</div>
              <div>
                The Supertrend indicator is a volatility-based strategy derived using the Average True Range (ATR). It
                dynamically adjusts support and resistance levels based on market volatility. Trade signals are generated when
                the asset price crosses the Supertrend line, signaling potential trend reversals.
              </div>
              <div className="mt-2 font-semibold text-slate-100">Formula</div>
              <div className="mt-1 font-mono text-sm text-slate-200">TR(t) = max(H(t) − L(t), |H(t) − C(t−1)|, |L(t) − C(t−1)|)</div>
              <div className="mt-1 text-sm text-slate-300">Where H, L, and C are the high, low, and closing prices.</div>
              <div className="mt-2 font-mono text-sm text-slate-200">ATR(t) = (1 / N) · Σ TR(i)</div>
              <div className="mt-2 font-mono text-sm text-slate-200">Upper Band = (H(t) + L(t)) / 2 + Multiplier · ATR(t)</div>
              <div className="mt-1 font-mono text-sm text-slate-200">Lower Band = (H(t) + L(t)) / 2 − Multiplier · ATR(t)</div>
              <ul className="mt-2 space-y-1">
                <li>• If price crosses above the Supertrend line: Buy</li>
                <li>• If price crosses below the Supertrend line: Sell</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 7: Technical vs Fundamental Analysis</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">Technical Analysis</div>
              <div>Studies price charts and indicators using historical data to estimate future movement.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Fundamental Analysis</div>
              <div>Evaluates company financials, earnings, and economic factors to estimate intrinsic value.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Charting Essentials</div>
              <ul className="mt-2 space-y-1">
                <li>• Candlesticks: open, high, low, close in a visual format</li>
                <li>• Chart types: line, bar, candlestick, Heikin Ashi</li>
                <li>• Support and resistance: key demand/supply levels</li>
                <li>• Trendlines and channels: direction and boundaries</li>
                <li>• Chart patterns: reversals/continuations (e.g., head & shoulders, triangles)</li>
                <li>• Multi-timeframe analysis: confirm trend and timing using multiple timeframes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 8: Risk and Money Management</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">Reward to Risk Ratio</div>
              <div>Compares potential profit to potential loss (example: risk ₹1 to gain ₹2 → 1:2).</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Stop Loss & Take Profit</div>
              <div>Stop loss limits losses. Take profit secures gains automatically.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Golden Rule</div>
              <div>Capital preservation matters more than high returns. Consistency matters more than big wins.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Risk Per Trade (1–2% Rule)</div>
              <div>Never risk more than 1–2% of total capital on a single trade.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-bold text-white">Segment 9: Trading Psychology</div>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-300">
            <div>
              <div className="font-semibold text-slate-100">Common Psychological Biases</div>
              <ul className="mt-2 space-y-1">
                <li>• Fear of missing out (FOMO)</li>
                <li>• Loss aversion</li>
                <li>• Overconfidence</li>
                <li>• Confirmation bias</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Discipline and Patience</div>
              <div>Successful trading requires following rules consistently without emotional interference.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Emotional Detachment</div>
              <div>Avoid revenge trading and impulsive decisions. Stick to your strategy.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Build a Routine</div>
              <div>Plan → Execute → Review → Improve.</div>
            </div>
            <div>
              <div className="font-semibold text-slate-100">Journaling Your Trades</div>
              <div>Maintaining a journal helps analyze mistakes and improve over time.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-base font-semibold text-white">Segment 10: Trading Strategies for Beginners</div>
          <ul className="mt-3 space-y-1 text-base leading-relaxed text-slate-300">
            <li>• Trend following basics: trade in the direction of the major trend</li>
            <li>• Breakout trading: enter when price breaks a key level</li>
            <li>• Range trading: buy support, sell resistance</li>
            <li>• Momentum trading: trade strong price movements</li>
            <li>• Support-resistance bounce: enter at strong zones</li>
            <li>• Paper trading & demo accounts: practice without real money</li>
            <li>• Combining indicators: use multiple confirmations before entry</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
          <div className="text-base font-bold text-amber-200">Important Takeaway</div>
          <div className="mt-3 space-y-2 text-base leading-relaxed text-slate-200">
            <p>
              Trading is not a shortcut to wealth or a game of excitement. It is a discipline built on patience,
              responsibility, and self-awareness.
            </p>
            <p>
              Success in markets does not come from predicting perfectly, but from managing risk intelligently and
              responding consistently.
            </p>
            <p>Survival comes before success. Protecting your capital is more important than chasing profits.</p>
            <p>
              Markets will test your patience, emotions, and confidence. Losses, doubt, and frustration are part of the
              process—not signs of failure.
            </p>
            <p>
              Risk management matters more than strategy. Discipline matters more than intelligence. Consistency beats
              intensity.
            </p>
            <p>The goal is not to avoid losses, but to control them.</p>
            <p>Respect uncertainty. Trade small. Think long-term.</p>
            <p>Master yourself before trying to master the market.</p>
            <p>
              Focus on learning, refining your behavior, and protecting your capital. Success follows discipline—not the
              other way around.
            </p>
            <p>Your journey as a trader begins with preparation, honesty, and steady improvement.</p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
