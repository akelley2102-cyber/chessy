import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Chessy header and bottom nav', async () => {
    render(<App />)

    expect(screen.getByText('Chessy')).toBeInTheDocument()
    expect(screen.getByText('Your home, handled.')).toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(6)

    // Today page is lazy-loaded; wait for it to resolve.
    await screen.findByRole('heading', { name: 'Today' })
  })

  it('shows the Today empty state by default', async () => {
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Today' })).toBeInTheDocument()
    expect(await screen.findByText(/Nothing on today's agenda yet/i)).toBeInTheDocument()
  })
})
