import { describe, it, expect } from 'vitest'
import { buildImportPrompt, fromImportedRecipe, importedRecipeSchema } from './recipeImport'
import { recipeInputSchema } from '@/types/recipe'

describe('importedRecipeSchema + fromImportedRecipe', () => {
  it('accepts a well-formed AI reply and produces a valid RecipeInput', () => {
    const raw = {
      title: 'Sheet-Pan Chicken Fajitas',
      description: 'Fast weeknight dinner the kids actually eat.',
      ingredients: [
        { amount: '1.5', unit: 'lb', name: 'chicken thighs' },
        { amount: '', unit: '', name: 'bell peppers' },
      ],
      steps: ['Preheat oven to 425°F.', 'Toss everything on a sheet pan and roast 25 minutes.'],
      tags: ['kid-approved', 'sheet-pan'],
      totalTimeMinutes: 35,
      servings: 4,
      source: 'https://example.com/fajitas',
    }

    const imported = importedRecipeSchema.parse(raw)
    const candidate = fromImportedRecipe(imported)
    const result = recipeInputSchema.safeParse(candidate)

    expect(result.success).toBe(true)
    expect(candidate.title).toBe('Sheet-Pan Chicken Fajitas')
    expect(candidate.ingredients).toHaveLength(2)
    expect(candidate.ingredients[0]).toMatchObject({
      amount: '1.5',
      unit: 'lb',
      name: 'chicken thighs',
    })
    // Empty amount/unit collapse to undefined rather than ''.
    expect(candidate.ingredients[1].amount).toBeUndefined()
    expect(candidate.ingredients[1].unit).toBeUndefined()
    expect(candidate.isPick).toBe(false)
  })

  it('tolerates nulls, missing fields, and numeric strings', () => {
    const raw = {
      title: 'Veggie Soup',
      description: null,
      ingredients: [{ name: 'carrots', amount: 2, unit: null }],
      steps: ['Simmer until tender.'],
      // tags omitted entirely
      totalTimeMinutes: '45',
      servings: null,
      source: null,
    }

    const imported = importedRecipeSchema.parse(raw)
    const candidate = fromImportedRecipe(imported)

    expect(candidate.description).toBeUndefined()
    expect(candidate.tags).toEqual([])
    expect(candidate.totalTimeMinutes).toBe(45)
    expect(candidate.servings).toBeUndefined()
    expect(candidate.source).toBeUndefined()
    expect(candidate.ingredients[0]).toMatchObject({
      name: 'carrots',
      amount: '2',
      unit: undefined,
    })

    expect(recipeInputSchema.safeParse(candidate).success).toBe(true)
  })

  it('drops ingredients with a blank name', () => {
    const imported = importedRecipeSchema.parse({
      title: 'Test',
      ingredients: [
        { name: '   ', amount: '1', unit: 'cup' },
        { name: 'Flour', amount: '1', unit: 'cup' },
      ],
      steps: ['Mix.'],
    })

    const candidate = fromImportedRecipe(imported)
    expect(candidate.ingredients).toHaveLength(1)
    expect(candidate.ingredients[0].name).toBe('Flour')
  })
})

describe('buildImportPrompt', () => {
  it('embeds the recipe text and describes the expected JSON shape', () => {
    const prompt = buildImportPrompt('2 cups flour\n1 egg\nMix and bake.')

    expect(prompt).toContain('2 cups flour')
    expect(prompt).toContain('"ingredients"')
    expect(prompt).toContain('"steps"')
    expect(prompt).toContain('JSON object')
  })
})
