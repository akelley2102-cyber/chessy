import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Sparkles, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { ChessyBubble, SectionLabel, RecipeCard, Button, Badge } from '@/components/ui'
import { useRecipe } from '@/hooks/useRecipes'
import { deleteRecipe } from '@/lib/recipes'

function formatAmount(amount?: string, unit?: string, name?: string): string {
  return [amount, unit, name].filter((part) => part && part.trim() !== '').join(' ')
}

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { recipe, loading } = useRecipe(id)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete() {
    if (!id) return
    setDeleting(true)
    setDeleteError(null)
    try {
      await deleteRecipe(id)
      navigate('/recipes')
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Something went wrong.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-2">
        <SectionLabel>Recipe</SectionLabel>
        <RecipeCard accent="enamel">
          <ChessyBubble>Pulling that recipe up…</ChessyBubble>
        </RecipeCard>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="pt-2">
        <SectionLabel>Recipe</SectionLabel>
        <RecipeCard accent="tomato">
          <ChessyBubble>
            I can&rsquo;t find that recipe — it may have been removed from another device.
          </ChessyBubble>
          <div className="mt-3">
            <Link to="/recipes">
              <Button variant="ghost">Back to Recipe Box</Button>
            </Link>
          </div>
        </RecipeCard>
      </div>
    )
  }

  const isUrl = recipe.source ? /^https?:\/\//i.test(recipe.source) : false

  return (
    <div className="pt-2">
      <div className="mb-3 flex items-center gap-2">
        <Link
          to="/recipes"
          aria-label="Back to Recipe Box"
          className="rounded p-1 text-enamel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-enamel"
        >
          <ArrowLeft size={20} />
        </Link>
        <SectionLabel>Recipe</SectionLabel>
      </div>

      <div className="space-y-4 pb-4">
        <RecipeCard accent={recipe.isPick ? 'mustard' : 'tomato'}>
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-display text-2xl font-extrabold text-ink">{recipe.title}</h1>
            {recipe.isPick && (
              <Badge icon={Sparkles} tone="pick">
                Pick
              </Badge>
            )}
          </div>

          {recipe.description && (
            <p className="mt-2 text-sm font-body text-ink">{recipe.description}</p>
          )}

          <div className="mt-2 flex flex-wrap gap-3 font-mono text-xs text-pencil">
            {recipe.totalTimeMinutes && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {recipe.totalTimeMinutes} min
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {recipe.servings} servings
              </span>
            )}
          </div>

          {recipe.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </RecipeCard>

        {recipe.ingredients.length > 0 && (
          <RecipeCard accent="enamel">
            <h2 className="mb-2 font-display text-base font-bold text-ink">Ingredients</h2>
            <ul className="space-y-1.5 font-mono text-sm text-ink">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{formatAmount(ingredient.amount, ingredient.unit, ingredient.name)}</span>
                </li>
              ))}
            </ul>
          </RecipeCard>
        )}

        {recipe.steps.length > 0 && (
          <RecipeCard accent="mustard">
            <h2 className="mb-2 font-display text-base font-bold text-ink">Steps</h2>
            <ol className="space-y-2">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm font-body text-ink">
                  <span className="shrink-0 font-mono font-bold text-pencil">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </RecipeCard>
        )}

        {recipe.source && (
          <RecipeCard accent="pesto">
            <h2 className="mb-1 font-display text-base font-bold text-ink">Source</h2>
            {isUrl ? (
              <a
                href={recipe.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-body text-enamel underline"
              >
                {recipe.source}
                <ExternalLink size={14} />
              </a>
            ) : (
              <p className="text-sm font-body text-ink">{recipe.source}</p>
            )}
          </RecipeCard>
        )}

        {deleteError && (
          <RecipeCard accent="tomato">
            <ChessyBubble>That didn&rsquo;t delete — {deleteError}.</ChessyBubble>
          </RecipeCard>
        )}

        {confirmingDelete ? (
          <RecipeCard accent="tomato">
            <ChessyBubble>
              Remove &ldquo;{recipe.title}&rdquo; from the recipe box for good?
            </ChessyBubble>
            <div className="mt-3 flex gap-2">
              <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Removing…' : 'Yes, remove it'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
            </div>
          </RecipeCard>
        ) : (
          <div className="flex gap-2">
            <Link to={`/recipes/${recipe.id}/edit`}>
              <Button variant="primary">
                <Pencil size={16} />
                Edit
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => setConfirmingDelete(true)}>
              <Trash2 size={16} />
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
