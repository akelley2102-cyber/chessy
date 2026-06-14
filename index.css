/* Self-hosted fonts (no external requests — works offline as a PWA).
   Only latin + latin-ext subsets are imported (covers English plus
   accented characters like jalapeño, crème) to avoid shipping unused
   cyrillic/greek/vietnamese glyphs. */
@import '@fontsource/bricolage-grotesque/latin-500.css';
@import '@fontsource/bricolage-grotesque/latin-700.css';
@import '@fontsource/bricolage-grotesque/latin-800.css';
@import '@fontsource/bricolage-grotesque/latin-ext-500.css';
@import '@fontsource/bricolage-grotesque/latin-ext-700.css';
@import '@fontsource/bricolage-grotesque/latin-ext-800.css';
@import '@fontsource/figtree/latin-400.css';
@import '@fontsource/figtree/latin-500.css';
@import '@fontsource/figtree/latin-600.css';
@import '@fontsource/figtree/latin-700.css';
@import '@fontsource/figtree/latin-ext-400.css';
@import '@fontsource/figtree/latin-ext-500.css';
@import '@fontsource/figtree/latin-ext-600.css';
@import '@fontsource/figtree/latin-ext-700.css';
@import '@fontsource/space-mono/latin-400.css';
@import '@fontsource/space-mono/latin-700.css';
@import '@fontsource/caveat/latin-600.css';
@import '@fontsource/caveat/latin-700.css';
@import '@fontsource/caveat/latin-ext-600.css';
@import '@fontsource/caveat/latin-ext-700.css';

@import 'tailwindcss';

/**
 * Chessy design tokens — "The Recipe Box"
 * Source of truth: chessy-design-system.jsx (approved Phase 0a)
 * Every color/font below maps directly to a Tailwind utility,
 * e.g. --color-enamel -> bg-enamel, text-enamel, border-enamel
 */
@theme {
  --color-kraft: #e4d5bc; /* page background */
  --color-card: #fbf8f2; /* surfaces / recipe cards */
  --color-ink: #2e2a24; /* primary text (9.9:1 on kraft) */
  --color-pencil: #6e6258; /* secondary text — card surfaces only (5.6:1 on card) */
  --color-enamel: #33514b; /* primary accent / buttons / nav (white text 8.7:1) */
  --color-enamel-light: #5a7d75; /* secondary surfaces / inactive nav */
  --color-mustard: #d4a12c; /* "Chessy's pick" highlight (ink text 6.1:1) */
  --color-tomato: #a8472d; /* alerts / destructive (white text 5.8:1) */
  --color-tomato-light: #c1573a; /* icon / large-accent only */
  --color-pesto: #4f6b47; /* success / in-stock (white text 6.0:1) */
  --color-rule: #2e2a2414; /* faint ruled lines on recipe cards */

  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-body: 'Figtree', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --font-hand: 'Caveat', cursive;
}

@layer base {
  html {
    color-scheme: light;
  }

  body {
    @apply bg-kraft text-ink font-body antialiased;
  }

  /* Respect reduced-motion preferences app-wide */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
