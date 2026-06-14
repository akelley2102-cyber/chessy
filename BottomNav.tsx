import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-enamel">
      {children}
    </h2>
  )
}
