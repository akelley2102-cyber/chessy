# Chessy

Chessy is the Kelley family's AI house manager: a recipe box, weekly meal
planner, grocery list, pantry tracker, and daily school-morning briefing —
built and maintained like a small SaaS product.

## Status

🚧 **Phase 0 — Foundations.** Project scaffold, design system, and CI/CD are
in place. Feature modules (Recipe Box, Meal Plan, Grocery List, Pantry,
Morning Digest) are placeholders pending Phase 1+.

## Tech stack

- **React 19 + TypeScript** — components and types
- **Vite** — build tooling, deployed via GitHub Actions to GitHub Pages
- **Tailwind CSS v4** — design tokens defined in `src/index.css` (`@theme`)
- **React Router (Hash routing)** — client-side navigation, avoids the
  GitHub Pages "404 on refresh" issue for a static SPA
- **Vitest + React Testing Library** — unit/component tests
- **Firebase (Firestore)** — data layer, wired in Phase 1 (separate Firebase
  project from the family-finance app)
- **Fontsource** — self-hosted fonts (Bricolage Grotesque, Figtree, Space
  Mono, Caveat) so the PWA works offline

## Design system — "The Recipe Box"

Visual identity lives in `src/index.css` (`@theme` block) and the
`src/components/ui` primitives. Concept: kraft-paper backgrounds, index-card
surfaces, vintage stove-enamel green as the primary accent, mustard for
"Chessy's picks," and label-maker mono type for lists and ingredients. Every
feature module is built from the `RecipeCard` primitive.

A standalone visual reference (`chessy-design-system.jsx`) documents the
full palette, type scale, voice & tone guidelines, and a contrast audit.

## Project structure

```
src/
  components/
    ui/        # Button, Badge, RecipeCard, ChessyBubble, SectionLabel
    layout/     # AppShell, BottomNav
  pages/        # Today, Recipes, Plan, List, Pantry, Digest
  lib/          # Data layer (Firebase, AI calls) — Phase 1+
  types/        # Shared TypeScript types — Phase 1+
  test/         # Vitest setup
```

## Scripts

```bash
npm run dev          # local dev server
npm run build        # type-check + production build
npm run preview      # preview the production build
npm run lint         # ESLint
npm run typecheck    # tsc, no emit
npm run test         # run tests once
npm run test:watch   # watch mode
npm run test:coverage
npm run format       # Prettier write
npm run format:check
```

## Deployment

`.github/workflows/deploy.yml` lints, type-checks, tests, builds, and
deploys `dist/` to GitHub Pages on every push to `main`. The Vite `base`
path is set to `/chessy/` in `vite.config.ts` — update this if the repo is
named differently.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the Firebase project config
(project: `chessy-69a60`). `.env.local` is gitignored and never committed.

## Data layer

`src/lib/firebase.ts` initializes the Firebase app and exports `db` (a
Firestore instance) from env vars. Nothing imports it yet — Phase 1 will add
the Recipe Box repository on top of it, plus Firestore security rules.

## Roadmap

1. ~~Foundations — repo, design system, tooling, CI/CD~~
2. Recipe Box — store and AI-parse recipes
3. Meal Planning — weekly planner + AI suggestions
4. Grocery List — generated from meal plan, editable
5. Pantry & Receipts — receipt scanning, inventory, low-stock alerts
6. Morning Digest — school email summary (separate track: Cloud Functions +
   Gmail OAuth, built in Claude Code)
