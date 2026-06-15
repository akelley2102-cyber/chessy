import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { TodayPage } from '@/pages/TodayPage'
import { RecipesPage } from '@/pages/RecipesPage'
import { PlanPage } from '@/pages/PlanPage'
import { ListPage } from '@/pages/ListPage'
import { PantryPage } from '@/pages/PantryPage'
import { DigestPage } from '@/pages/DigestPage'

/**
 * Routing note: HashRouter is used deliberately here. The app is
 * deployed as a static site on GitHub Pages and primarily used as
 * an installed PWA (opens at the base URL). HashRouter avoids the
 * GitHub Pages "404 on refresh" problem for sub-routes without
 * needing a SPA-fallback workaround. Revisit if deep-linking to
 * specific tabs from outside the app becomes a requirement.
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<TodayPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="pantry" element={<PantryPage />} />
          <Route path="digest" element={<DigestPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
