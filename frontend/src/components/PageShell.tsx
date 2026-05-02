import type { ReactNode } from 'react'

export function PageShell(props: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{props.title}</h1>
        {props.subtitle ? (
          <p className="mt-1 max-w-3xl text-sm text-slate-300 md:text-base">{props.subtitle}</p>
        ) : null}
      </div>
      {props.children}
    </div>
  )
}
