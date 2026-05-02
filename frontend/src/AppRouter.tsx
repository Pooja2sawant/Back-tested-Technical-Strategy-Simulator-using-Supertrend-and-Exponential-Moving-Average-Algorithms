import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RouteTransition } from './components/RouteTransition'
import { AboutPage } from './pages/AboutPage'
import { BacktestingPage } from './pages/BacktestingPage'
import { HomeAuthPage } from './pages/HomeAuthPage'
import { LearnPage } from './pages/LearnPage'
import { SentimentPage } from './pages/SentimentPage'

export function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RouteTransition>
              <HomeAuthPage />
            </RouteTransition>
          }
        />
        <Route
          path="/backtesting"
          element={
            <RouteTransition>
              <BacktestingPage />
            </RouteTransition>
          }
        />
        <Route
          path="/sentiment"
          element={
            <RouteTransition>
              <SentimentPage />
            </RouteTransition>
          }
        />
        <Route
          path="/learn"
          element={
            <RouteTransition>
              <LearnPage />
            </RouteTransition>
          }
        />
        <Route
          path="/about"
          element={
            <RouteTransition>
              <AboutPage />
            </RouteTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}
