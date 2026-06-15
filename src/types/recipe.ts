import { z } from 'zod'

export const recipeIngredientSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Ingredient name is required'),
  amount: z.string().trim().optional(),
  unit: z.string().trim().optional(),
})

export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>

export const recipeInputSchema = z.object({
  title: z.string().trim().min(1, 'Give it a title').max(120, 'Keep it under 120 characters'),
  description: z.string().trim().max(500).optional(),
  ingredients: z.array(recipeIngredientSchema).min(1, 'Add at least one ingredient'),
  steps: z
    .array(z.string().trim().min(1, 'Steps can\u2019t be empty'))
    .min(1, 'Add at least one step'),
  tags: z.array(z.string().trim().min(1)),
  totalTimeMinutes: z.number().int().positive().optional(),
  servings: z.number().int().positive().optional(),
  source: z.string().trim().max(300).optional(),
  isPick: z.boolean(),
})

export type RecipeInput = z.infer<typeof recipeInputSchema>

export interface Recipe extends RecipeInput {
  id: string
  createdAt: Date
  updatedAt: Date
}

export const emptyRecipeInput: RecipeInput = {
  title: '',
  description: '',
  ingredients: [],
  steps: [],
  tags: [],
  totalTimeMinutes: undefined,
  servings: undefined,
  source: '',
  isPick: false,
}
