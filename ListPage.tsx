import type { ReactNode } from 'react'

interface RecipeCardProps {
  children: ReactNode
  /** Top accent rule color - defaults to tomato (the signature recipe-card stripe) */
  accent?: 'tomato' | 'enamel' | 'mustard' | 'pesto'
  className?: string
}

const accentClasses = {
  tomato: 'bg-tomato',
  enamel: 'bg-enamel',
  mustard: 'bg-mustard',
  pesto: 'bg-pesto',
}

/**
 * The signature Chessy component. Every module (recipes, pantry,
 * grocery list, daily digest) is built from this card: index-card
 * surface, faint ruled-paper lines, and a colored top rule like a
 * recipe box divider.
 */
export function RecipeCard({ children, accent = 'tomato', className = '' }: RecipeCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-card shadow-sm ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(var(--color-rule) 0px, var(--color-rule) 1px, transparent 1px, transparent 28px)',
        backgroundPosition: '0 24px',
      }}
    >
      <div className={`h-1 ${accentClasses[accent]}`} aria-hidden="true" />
      <div className="p-4">{children}</div>
    </div>
  )
}
