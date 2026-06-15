import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Chessy header and bottom nav', () => {
    render(<App />)

    expect(screen.getByText('Chessy')).toBeInTheDocument()
    expect(screen.getByText('Your home, handled.')).toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })

  it('shows the Today empty state by default', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Today' })).toBeInTheDocument()
    expect(screen.getByText(/Nothing on today's agenda yet/i)).toBeInTheDocument()
  })
})
