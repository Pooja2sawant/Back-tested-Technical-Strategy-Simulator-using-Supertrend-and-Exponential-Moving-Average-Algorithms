import { PageShell } from '../components/PageShell'

export function AboutPage() {
  return (
    <PageShell title="About Backtest Pro" subtitle="Master trading through education and smart backtesting.">
      <div className="space-y-6">
        {/* Intro */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <p className="text-base leading-relaxed text-slate-200">
            A comprehensive trading simulator designed to help you master technical analysis and build winning strategies through data-driven backtesting.
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">Our Mission</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            To democratize access to professional trading tools and education, empowering retail traders with institutional-grade backtesting and analysis capabilities.
          </p>
        </div>

        {/* Why We Built This */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">Why We Built This</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            We noticed a gap between expensive trading platforms and basic chart tools. Our goal is to provide powerful, educational tools that help traders learn and grow without breaking the bank.
          </p>
        </div>

        {/* Safe Learning */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">Safe Learning Environment</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Practice strategies with historical data before risking real capital. Our backtesting engine helps you understand what works and what doesn't in different market conditions.
          </p>
        </div>

        {/* Community First */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">Community First</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Built by traders, for traders. We continuously improve based on community feedback and real-world trading needs.
          </p>
        </div>

        {/* Our Team */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">Our Team</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            We are a team of three Computer Science students with a strong interest in trading, data analysis, and software development. This project combines our academic knowledge with a practical approach to understanding how trading strategies perform in real market conditions.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Every feature is designed with real traders in mind, tested thoroughly, and refined based on feedback from our growing community. We're committed to continuous improvement and adding new tools that help you succeed in the markets.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="text-lg font-semibold text-red-300">⚠️ Important Disclaimer</h3>
          
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div>
              <h4 className="font-semibold text-red-300">Educational Purpose</h4>
              <p>Backtest Pro is designed exclusively for educational and research purposes. It is not a trading platform and does not execute real trades.</p>
            </div>

            <div>
              <h4 className="font-semibold text-red-300">Not Financial Advice</h4>
              <p>Nothing on this platform constitutes financial, investment, legal, or tax advice. All strategies, indicators, and analysis tools are provided for learning purposes only.</p>
            </div>

            <div>
              <h4 className="font-semibold text-red-300">Risk Warning</h4>
              <p>Trading in stocks, cryptocurrencies, and other financial instruments involves substantial risk of loss. Past performance in backtests does not guarantee future results. You can lose all of your invested capital.</p>
            </div>

            <div>
              <h4 className="font-semibold text-red-300">Consult Professionals</h4>
              <p>Before making any investment decisions, always consult with a qualified financial advisor who understands your specific situation, risk tolerance, and financial goals.</p>
            </div>

            <div>
              <h4 className="font-semibold text-red-300">Data Accuracy</h4>
              <p>While we strive for accuracy, market data may have delays or errors. Always verify information from official sources before making decisions.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">Contact us</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Connect with us at{' '}
            <a href="mailto:backtestp@gmail.com" className="text-indigo-300 hover:text-indigo-200">
              backtestp@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </PageShell>
  )
}
