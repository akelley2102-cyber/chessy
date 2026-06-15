import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Sparkles } from 'lucide-react'
import {
  ChessyBubble,
  SectionLabel,
  RecipeCard,
  Button,
  Field,
  Input,
  Textarea,
  TagInput,
} from '@/components/ui'
import { useRecipe } from '@/hooks/useRecipes'
import { addRecipe, updateRecipe } from '@/lib/recipes'
import {
  recipeInputSchema,
  type Recipe,
  type RecipeIngredient,
  type RecipeInput,
} from '@/types/recipe'

interface StepRow {
  id: string
  text: string
}

interface FormState {
  title: string
  description: string
  ingredients: RecipeIngredient[]
  steps: StepRow[]
  tags: string[]
  totalTimeMinutes: string
  servings: string
  source: string
  isPick: boolean
}

function makeId(): string {
  return crypto.randomUUID()
}

function blankIngredient(): RecipeIngredient {
  return { id: makeId(), name: '', amount: '', unit: '' }
}

function blankStep(): StepRow {
  return { id: makeId(), text: '' }
}

function emptyForm(): FormState {
  return {
    title: '',
    description: '',
    ingredients: [blankIngredient()],
    steps: [blankStep()],
    tags: [],
    totalTimeMinutes: '',
    servings: '',
    source: '',
    isPick: false,
  }
}

function formFromRecipe(recipe: Recipe): FormState {
  return {
    title: recipe.title,
    description: recipe.description ?? '',
    ingredients: recipe.ingredients.length ? recipe.ingredients : [blankIngredient()],
    steps: recipe.steps.length
      ? recipe.steps.map((text) => ({ id: makeId(), text }))
      : [blankStep()],
    tags: recipe.tags,
    totalTimeMinutes: recipe.totalTimeMinutes?.toString() ?? '',
    servings: recipe.servings?.toString() ?? '',
    source: recipe.source ?? '',
    isPick: recipe.isPick,
  }
}

/** Builds the Firestore-ready payload from form state, dropping blank rows. */
function toRecipeInput(form: FormState): RecipeInput {
  return {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
    ingredients: form.ingredients
      .map((i) => ({
        id: i.id,
        name: i.name.trim(),
        amount: i.amount?.trim() || undefined,
        unit: i.unit?.trim() || undefined,
      }))
      .filter((i) => i.name !== ''),
    steps: form.steps.map((s) => s.text.trim()).filter((s) => s !== ''),
    tags: form.tags,
    totalTimeMinutes: form.totalTimeMinutes ? Number(form.totalTimeMinutes) : undefined,
    servings: form.servings ? Number(form.servings) : undefined,
    source: form.source.trim() || undefined,
    isPick: form.isPick,
  }
}

/**
 * Page wrapper: resolves the route param, handles the loading and
 * not-found states for edit mode, then hands off to <RecipeForm>.
 * Keying by id ensures the form re-initializes if the route changes.
 */
export function RecipeFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const { recipe, loading: recipeLoading } = useRecipe(id)

  if (isEditing && recipeLoading) {
    return (
      <div className="pt-2">
        <SectionLabel>Edit Recipe</SectionLabel>
        <RecipeCard accent="enamel">
          <ChessyBubble>Pulling that recipe up…</ChessyBubble>
        </RecipeCard>
      </div>
    )
  }

  if (isEditing && !recipeLoading && !recipe) {
    return (
      <div className="pt-2">
        <SectionLabel>Edit Recipe</SectionLabel>
        <RecipeCard accent="tomato">
          <ChessyBubble>
            I can&rsquo;t find that recipe anymore — it may have been deleted from another device.
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

  return <RecipeForm key={id ?? 'new'} recipeId={id} initialRecipe={recipe} />
}

interface RecipeFormProps {
  recipeId?: string
  initialRecipe: Recipe | null
}

function RecipeForm({ recipeId, initialRecipe }: RecipeFormProps) {
  const isEditing = Boolean(recipeId)
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>(() =>
    initialRecipe ? formFromRecipe(initialRecipe) : emptyForm()
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function updateIngredient(rowId: string, patch: Partial<RecipeIngredient>) {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.map((i) => (i.id === rowId ? { ...i, ...patch } : i)),
    }))
  }

  function addIngredient() {
    setForm((f) => ({ ...f, ingredients: [...f.ingredients, blankIngredient()] }))
  }

  function removeIngredient(rowId: string) {
    setForm((f) => ({
      ...f,
      ingredients:
        f.ingredients.length > 1 ? f.ingredients.filter((i) => i.id !== rowId) : f.ingredients,
    }))
  }

  function updateStep(rowId: string, text: string) {
    setForm((f) => ({
      ...f,
      steps: f.steps.map((s) => (s.id === rowId ? { ...s, text } : s)),
    }))
  }

  function addStep() {
    setForm((f) => ({ ...f, steps: [...f.steps, blankStep()] }))
  }

  function removeStep(rowId: string) {
    setForm((f) => ({
      ...f,
      steps: f.steps.length > 1 ? f.steps.filter((s) => s.id !== rowId) : f.steps,
    }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setFormError(null)

    const input = toRecipeInput(form)
    const result = recipeInputSchema.safeParse(input)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? 'form')
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSaving(true)
    try {
      if (isEditing && recipeId) {
        await updateRecipe(recipeId, result.data)
        navigate(`/recipes/${recipeId}`)
      } else {
        const newId = await addRecipe(result.data)
        navigate(`/recipes/${newId}`)
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong saving that.')
      setSaving(false)
    }
  }

  return (
    <div className="pt-2">
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="rounded p-1 text-enamel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-enamel"
        >
          <ArrowLeft size={20} />
        </button>
        <SectionLabel>{isEditing ? 'Edit Recipe' : 'New Recipe'}</SectionLabel>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <RecipeCard accent="tomato">
          <div className="space-y-4">
            <Field label="Title" htmlFor="title" error={errors.title}>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Sheet-Pan Chicken Fajitas"
                required
              />
            </Field>

            <Field label="Description" htmlFor="description" optional error={errors.description}>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Quick notes — what makes this one a keeper?"
                rows={2}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Total time (min)"
                htmlFor="totalTimeMinutes"
                optional
                error={errors.totalTimeMinutes}
              >
                <Input
                  id="totalTimeMinutes"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={form.totalTimeMinutes}
                  onChange={(e) => updateField('totalTimeMinutes', e.target.value)}
                  placeholder="35"
                />
              </Field>
              <Field label="Servings" htmlFor="servings" optional error={errors.servings}>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={form.servings}
                  onChange={(e) => updateField('servings', e.target.value)}
                  placeholder="4"
                />
              </Field>
            </div>

            <Field label="Tags" htmlFor="tags" optional error={errors.tags}>
              <TagInput
                id="tags"
                tags={form.tags}
                onChange={(tags) => updateField('tags', tags)}
                placeholder="kid-approved, freezer-friendly…"
              />
            </Field>

            <button
              type="button"
              onClick={() => updateField('isPick', !form.isPick)}
              className={[
                'flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-bold font-body transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-enamel',
                form.isPick
                  ? 'border-mustard bg-mustard text-ink'
                  : 'border-rule bg-card text-pencil',
              ].join(' ')}
              aria-pressed={form.isPick}
            >
              <Sparkles size={16} />
              Chessy&rsquo;s Pick
            </button>
          </div>
        </RecipeCard>

        <RecipeCard accent="enamel">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-ink">Ingredients</h3>
          </div>
          {errors.ingredients && (
            <p className="mb-2 text-xs font-body text-tomato" role="alert">
              {errors.ingredients}
            </p>
          )}
          <div className="space-y-2">
            {form.ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="flex gap-2">
                <Input
                  value={ingredient.amount ?? ''}
                  onChange={(e) => updateIngredient(ingredient.id, { amount: e.target.value })}
                  placeholder="2"
                  aria-label={`Ingredient ${index + 1} amount`}
                  className="w-16 font-mono"
                />
                <Input
                  value={ingredient.unit ?? ''}
                  onChange={(e) => updateIngredient(ingredient.id, { unit: e.target.value })}
                  placeholder="cup"
                  aria-label={`Ingredient ${index + 1} unit`}
                  className="w-20 font-mono"
                />
                <Input
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(ingredient.id, { name: e.target.value })}
                  placeholder="all-purpose flour"
                  aria-label={`Ingredient ${index + 1} name`}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  disabled={form.ingredients.length === 1}
                  aria-label={`Remove ingredient ${index + 1}`}
                  className="shrink-0 rounded p-2 text-tomato hover:bg-card disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <Button type="button" variant="ghost" onClick={addIngredient}>
              <Plus size={16} />
              Add ingredient
            </Button>
          </div>
        </RecipeCard>

        <RecipeCard accent="mustard">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-ink">Steps</h3>
          </div>
          {errors.steps && (
            <p className="mb-2 text-xs font-body text-tomato" role="alert">
              {errors.steps}
            </p>
          )}
          <div className="space-y-2">
            {form.steps.map((step, index) => (
              <div key={step.id} className="flex gap-2">
                <span className="flex h-9 w-7 shrink-0 items-center justify-center font-mono text-sm font-bold text-pencil">
                  {index + 1}.
                </span>
                <Textarea
                  value={step.text}
                  onChange={(e) => updateStep(step.id, e.target.value)}
                  placeholder="Preheat the oven to 425°F…"
                  rows={2}
                  aria-label={`Step ${index + 1}`}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  disabled={form.steps.length === 1}
                  aria-label={`Remove step ${index + 1}`}
                  className="shrink-0 rounded p-2 text-tomato hover:bg-card disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <Button type="button" variant="ghost" onClick={addStep}>
              <Plus size={16} />
              Add step
            </Button>
          </div>
        </RecipeCard>

        <RecipeCard accent="pesto">
          <Field label="Source" htmlFor="source" optional error={errors.source}>
            <Input
              id="source"
              value={form.source}
              onChange={(e) => updateField('source', e.target.value)}
              placeholder="Link, magazine, or who shared it with you"
            />
          </Field>
        </RecipeCard>

        {formError && (
          <RecipeCard accent="tomato">
            <ChessyBubble>That didn&rsquo;t save — {formError}. Mind trying again?</ChessyBubble>
          </RecipeCard>
        )}

        <div className="flex gap-2 pb-2">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Add to recipe box'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate(-1)} disabled={saving}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
