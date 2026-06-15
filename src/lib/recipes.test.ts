import { describe, it, expect } from 'vitest'
import { toFirestorePayload } from './recipes'
import type { RecipeInput } from '@/types/recipe'

describe('toFirestorePayload', () => {
  it('converts undefined optional fields to null, including nested in arrays', () => {
    const input: RecipeInput = {
      title: 'Soup',
      description: undefined,
      ingredients: [{ id: '1', name: 'Carrot', amount: undefined, unit: undefined }],
      steps: ['Chop carrots'],
      tags: [],
      totalTimeMinutes: undefined,
      servings: undefined,
      source: undefined,
      isPick: false,
    }

    const payload = toFirestorePayload(input)
    const ingredients = payload.ingredients as { amount: unknown; unit: unknown }[]

    expect(payload.description).toBeNull()
    expect(payload.totalTimeMinutes).toBeNull()
    expect(payload.servings).toBeNull()
    expect(payload.source).toBeNull()
    expect(ingredients[0].amount).toBeNull()
    expect(ingredients[0].unit).toBeNull()
  })

  it('passes through fully-populated input unchanged', () => {
    const input: RecipeInput = {
      title: 'Soup',
      description: 'Cozy weeknight dinner',
      ingredients: [{ id: '1', name: 'Carrot', amount: '2', unit: 'cup' }],
      steps: ['Chop carrots', 'Simmer 20 minutes'],
      tags: ['soup', 'kid-approved'],
      totalTimeMinutes: 30,
      servings: 4,
      source: 'Grandma',
      isPick: true,
    }

    expect(toFirestorePayload(input)).toEqual(input)
  })
})
