import { Suspense } from 'react'
import { ChefHat } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { ChessyBubble } from '@/components/ui'
import { BottomNav } from './BottomNav'

function PageFallback() {
  return (
    <div className="pt-2">
      <ChessyBubble>One moment…</ChessyBubble>
    </div>
  )
}

export function AppShell() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-kraft">
      <header className="flex items-center gap-3 px-4 pt-5 pb-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-enamel"
          aria-hidden="true"
        >
          <ChefHat size={20} className="text-white" />
        </div>
        <div>
          <p className="font-display text-xl font-extrabold leading-none text-ink">Chessy</p>
          <p className="font-hand text-sm font-semibold leading-none text-tomato">
            Your home, handled.
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 pb-24">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <BottomNav />
    </div>
  )
}
