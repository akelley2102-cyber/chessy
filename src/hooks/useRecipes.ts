import { useEffect, useState } from 'react'
import { subscribeToRecipe, subscribeToRecipes } from '@/lib/recipes'
import type { Recipe } from '@/types/recipe'

interface UseRecipesResult {
  recipes: Recipe[]
  loading: boolean
  error: string | null
}

export function useRecipes(): UseRecipesResult {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToRecipes(
      (data) => {
        setRecipes(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [])

  return { recipes, loading, error }
}

interface UseRecipeResult {
  recipe: Recipe | null
  loading: boolean
  error: string | null
}

/**
 * Subscribes to a single recipe by id. `recipe` is `null` while loading
 * AND after loading if no such recipe exists - check `loading` to tell
 * the two apart.
 */
export function useRecipe(id: string | undefined): UseRecipeResult {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const unsubscribe = subscribeToRecipe(
      id,
      (data) => {
        setRecipe(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [id])

  if (!id) {
    return { recipe: null, loading: false, error: null }
  }

  return { recipe, loading, error }
}
