import { Navbar } from './components/Navbar'
import { AppRouter } from './AppRouter'

function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AppRouter />
      </main>
    </>
  )
}

function App() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.12),transparent_40%)]" />
        <div className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="flex min-h-dvh flex-col">
        <AppLayout />
      </div>
    </div>
  )
}

export default App
