import { NavLink } from 'react-router-dom'
import { Home, ChefHat, CalendarDays, ShoppingCart, Package, Mail } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Today', icon: Home },
  { to: '/recipes', label: 'Recipes', icon: ChefHat },
  { to: '/plan', label: 'Plan', icon: CalendarDays },
  { to: '/list', label: 'List', icon: ShoppingCart },
  { to: '/pantry', label: 'Pantry', icon: Package },
  { to: '/digest', label: 'Digest', icon: Mail },
]

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-10 border-t border-rule bg-enamel pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-md justify-between px-1 py-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-1 rounded px-1 py-1.5 text-[10px] font-body',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard',
                  isActive ? 'text-mustard' : 'text-white/85 hover:text-white',
                ].join(' ')
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
