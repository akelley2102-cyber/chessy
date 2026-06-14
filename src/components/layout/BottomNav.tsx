import type { ComponentType, ReactNode } from 'react'

export type BadgeTone = 'pick' | 'inStock' | 'lowStock' | 'thisWeek' | 'neutral'

interface BadgeProps {
  icon?: ComponentType<{ size?: number; className?: string }>
  children: ReactNode
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  pick: 'bg-mustard text-ink',
  inStock: 'bg-pesto text-white',
  lowStock: 'bg-tomato text-white',
  thisWeek: 'bg-enamel-light text-white',
  neutral: 'bg-card text-pencil border border-rule',
}

export function Badge({ icon: Icon, children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded px-2 py-1',
        'text-xs font-bold uppercase tracking-wide font-mono',
        toneClasses[tone],
      ].join(' ')}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  )
}
