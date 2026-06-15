import { lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

const TodayPage = lazy(() => import('@/pages/TodayPage').then((m) => ({ default: m.TodayPage })))
const RecipesPage = lazy(() =>
  import('@/pages/RecipesPage').then((m) => ({ default: m.RecipesPage }))
)
const RecipeFormPage = lazy(() =>
  import('@/pages/RecipeFormPage').then((m) => ({ default: m.RecipeFormPage }))
)
const RecipeImportPage = lazy(() =>
  import('@/pages/RecipeImportPage').then((m) => ({ default: m.RecipeImportPage }))
)
const RecipeDetailPage = lazy(() =>
  import('@/pages/RecipeDetailPage').then((m) => ({ default: m.RecipeDetailPage }))
)
const PlanPage = lazy(() => import('@/pages/PlanPage').then((m) => ({ default: m.PlanPage })))
const ListPage = lazy(() => import('@/pages/ListPage').then((m) => ({ default: m.ListPage })))
const PantryPage = lazy(() => import('@/pages/PantryPage').then((m) => ({ default: m.PantryPage })))
const DigestPage = lazy(() => import('@/pages/DigestPage').then((m) => ({ default: m.DigestPage })))

/**
 * Routing note: HashRouter is used deliberately here. The app is
 * deployed as a static site on GitHub Pages and primarily used as
 * an installed PWA (opens at the base URL). HashRouter avoids the
 * GitHub Pages "404 on refresh" problem for sub-routes without
 * needing a SPA-fallback workaround. Revisit if deep-linking to
 * specific tabs from outside the app becomes a requirement.
 *
 * Pages are lazy-loaded so the initial bundle doesn't include
 * Firestore (and friends) until a page that needs it is visited.
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<TodayPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipes/new" element={<RecipeFormPage />} />
          <Route path="recipes/import" element={<RecipeImportPage />} />
          <Route path="recipes/:id" element={<RecipeDetailPage />} />
          <Route path="recipes/:id/edit" element={<RecipeFormPage />} />
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
