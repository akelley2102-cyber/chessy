import { z } from 'zod'
import type { RecipeInput } from '@/types/recipe'

/** A string field that tolerates a stray number, null, or missing value from the AI's reply. */
const looseOptionalString = z
  .union([z.string(), z.number()])
  .nullable()
  .optional()
  .transform((value) => {
    if (value === null || value === undefined) return undefined
    const text = String(value).trim()
    return text === '' ? undefined : text
  })

/** A positive whole number that tolerates a numeric string, null, or missing value. */
const looseOptionalCount = z
  .union([z.number(), z.string()])
  .nullable()
  .optional()
  .transform((value) => {
    if (value === null || value === undefined) return undefined
    const num = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(num) && num > 0 ? Math.round(num) : undefined
  })

const importedIngredientSchema = z.object({
  name: z.string(),
  amount: looseOptionalString,
  unit: looseOptionalString,
})

/**
 * Shape we ask the AI to reply with. Deliberately looser than
 * recipeInputSchema (no ingredient ids, no isPick, tolerant of
 * nulls/strings-for-numbers) since we can't fully control the AI's
 * output - fromImportedRecipe() + recipeInputSchema do the final
 * tightening before anything is saved.
 */
export const importedRecipeSchema = z.object({
  title: z.string(),
  description: looseOptionalString,
  ingredients: z.array(importedIngredientSchema).default([]),
  steps: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  totalTimeMinutes: looseOptionalCount,
  servings: looseOptionalCount,
  source: looseOptionalString,
})

export type ImportedRecipe = z.infer<typeof importedRecipeSchema>

/** Maps the AI's reply into a recipeInputSchema-shaped object, ready for validation + saving. */
export function fromImportedRecipe(parsed: ImportedRecipe): RecipeInput {
  return {
    title: parsed.title.trim(),
    description: parsed.description,
    ingredients: parsed.ingredients
      .map((ingredient) => ({
        id: crypto.randomUUID(),
        name: ingredient.name.trim(),
        amount: ingredient.amount,
        unit: ingredient.unit,
      }))
      .filter((ingredient) => ingredient.name !== ''),
    steps: parsed.steps.map((step) => step.trim()).filter((step) => step !== ''),
    tags: parsed.tags.map((tag) => tag.trim()).filter((tag) => tag !== ''),
    totalTimeMinutes: parsed.totalTimeMinutes,
    servings: parsed.servings,
    source: parsed.source,
    isPick: false,
  }
}

/** Builds the prompt the user copies into Claude to turn raw recipe text into structured JSON. */
export function buildImportPrompt(recipeText: string): string {
  return `Read the recipe below and reply with ONLY a JSON object (no markdown formatting, no code fences, no commentary before or after) using exactly this shape:

{
  "title": "string",
  "description": "one or two sentence note about the dish, or empty string",
  "ingredients": [
    { "amount": "string or empty", "unit": "string or empty", "name": "string" }
  ],
  "steps": ["string", "string"],
  "tags": ["2-4 short lowercase tags"],
  "totalTimeMinutes": number or null,
  "servings": number or null,
  "source": "a URL or attribution mentioned in the text, or empty string"
}

Recipe:
"""
${recipeText}
"""`
}
