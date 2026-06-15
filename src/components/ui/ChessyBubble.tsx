import { ChefHat } from 'lucide-react'
import type { ReactNode } from 'react'

interface ChessyBubbleProps {
  children: ReactNode
}

/**
 * Renders a message in Chessy's voice. Used for confirmations,
 * empty states, alerts, and the daily digest greeting.
 */
export function ChessyBubble({ children }: ChessyBubbleProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-enamel"
        aria-hidden="true"
      >
        <ChefHat size={18} className="text-white" />
      </div>
      <div className="max-w-md rounded-lg rounded-tl-none bg-card px-4 py-3 text-sm font-body text-ink">
        {children}
      </div>
    </div>
  )
}
