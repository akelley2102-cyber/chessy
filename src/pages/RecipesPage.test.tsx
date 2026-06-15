import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { RecipesPage } from './RecipesPage'
import type { Recipe } from '@/types/recipe'

const mockUseRecipes = vi.fn()

vi.mock('@/hooks/useRecipes', () => ({
  useRecipes: () => mockUseRecipes(),
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <RecipesPage />
    </MemoryRouter>
  )
}

const fajitas: Recipe = {
  id: '1',
  title: 'Sheet-Pan Chicken Fajitas',
  description: '',
  ingredients: [],
  steps: [],
  tags: ['kid-approved'],
  totalTimeMinutes: 35,
  servings: 4,
  source: '',
  isPick: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const soup: Recipe = {
  id: '2',
  title: 'Veggie Soup',
  description: '',
  ingredients: [],
  steps: [],
  tags: ['soup'],
  source: '',
  isPick: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('RecipesPage', () => {
  it('shows a loading message while fetching', () => {
    mockUseRecipes.mockReturnValue({ recipes: [], loading: true, error: null })
    renderPage()
    expect(screen.getByText(/pulling up your recipe box/i)).toBeInTheDocument()
  })

  it('shows the empty state when there are no recipes', () => {
    mockUseRecipes.mockReturnValue({ recipes: [], loading: false, error: null })
    renderPage()
    expect(screen.getByText(/your recipe box is empty/i)).toBeInTheDocument()
  })

  it('shows an error message if the subscription fails', () => {
    mockUseRecipes.mockReturnValue({ recipes: [], loading: false, error: 'permission-denied' })
    renderPage()
    expect(screen.getByText(/couldn.t load the recipe box/i)).toBeInTheDocument()
  })

  it('lists recipes, shows the pick badge, and supports searching', async () => {
    mockUseRecipes.mockReturnValue({ recipes: [fajitas, soup], loading: false, error: null })
    renderPage()

    expect(screen.getByText('Sheet-Pan Chicken Fajitas')).toBeInTheDocument()
    expect(screen.getByText('Veggie Soup')).toBeInTheDocument()
    expect(screen.getByText('Pick')).toBeInTheDocument()

    const search = screen.getByRole('searchbox', { name: /search recipes/i })
    await userEvent.type(search, 'soup')

    expect(screen.queryByText('Sheet-Pan Chicken Fajitas')).not.toBeInTheDocument()
    expect(screen.getByText('Veggie Soup')).toBeInTheDocument()
  })
})
