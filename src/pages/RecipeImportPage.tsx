import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink } from 'lucide-react'
import { ChessyBubble, SectionLabel, RecipeCard, Button, Field, Textarea } from '@/components/ui'
import { addRecipe } from '@/lib/recipes'
import { buildImportPrompt, fromImportedRecipe, importedRecipeSchema } from '@/lib/recipeImport'
import { recipeInputSchema } from '@/types/recipe'

export function RecipeImportPage() {
  const navigate = useNavigate()
  const [recipeText, setRecipeText] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleCopyPrompt() {
    setCopyError(false)
    try {
      await navigator.clipboard.writeText(buildImportPrompt(recipeText))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError(true)
    }
  }

  async function handleImport() {
    setError(null)

    let raw: unknown
    try {
      raw = JSON.parse(jsonInput)
    } catch {
      setError(
        'That doesn\u2019t look like valid JSON \u2014 make sure you copied the whole reply, including the { and } at the start and end.'
      )
      return
    }

    const imported = importedRecipeSchema.safeParse(raw)
    if (!imported.success) {
      setError(
        `That JSON is missing something I need: ${imported.error.issues[0]?.message ?? 'unknown error'}.`
      )
      return
    }

    const candidate = fromImportedRecipe(imported.data)
    const validated = recipeInputSchema.safeParse(candidate)
    if (!validated.success) {
      setError(
        `Almost there \u2014 ${validated.error.issues[0]?.message ?? 'something needs a closer look'}. You can fix it on the next screen.`
      )
      return
    }

    setSubmitting(true)
    try {
      const id = await addRecipe(validated.data)
      navigate(`/recipes/${id}/edit`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong saving that.')
      setSubmitting(false)
    }
  }

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
        <SectionLabel>Paste a Recipe</SectionLabel>
      </div>

      <div className="space-y-4 pb-4">
        <RecipeCard accent="enamel">
          <ChessyBubble>
            Found a recipe somewhere? Paste it in below, hand the prompt to Claude, and bring the
            answer back here \u2014 I&rsquo;ll file it for you to review.
          </ChessyBubble>
        </RecipeCard>

        <RecipeCard accent="tomato">
          <h3 className="mb-2 font-display text-base font-bold text-ink">
            1. Copy a prompt for Claude
          </h3>
          <Field label="Recipe text" htmlFor="recipeText" optional>
            <Textarea
              id="recipeText"
              value={recipeText}
              onChange={(e) => setRecipeText(e.target.value)}
              placeholder="Paste the ingredients and steps here, however messy \u2014 Claude will sort it out."
              rows={6}
            />
          </Field>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button type="button" onClick={handleCopyPrompt} disabled={!recipeText.trim()}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy prompt for Claude'}
            </Button>
            <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="ghost">
                <ExternalLink size={16} />
                Open Claude
              </Button>
            </a>
          </div>
          {copyError && (
            <p className="mt-2 text-xs font-body text-tomato" role="alert">
              Couldn&rsquo;t copy automatically \u2014 select the text above, copy the prompt shape
              from the instructions, and paste your recipe in manually.
            </p>
          )}
        </RecipeCard>

        <RecipeCard accent="mustard">
          <h3 className="mb-2 font-display text-base font-bold text-ink">
            2. Paste Claude&rsquo;s reply
          </h3>
          <Field label="JSON from Claude" htmlFor="jsonInput" optional>
            <Textarea
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{ "title": "...", "ingredients": [...], "steps": [...] }'
              rows={8}
              className="font-mono text-xs"
            />
          </Field>
          {error && (
            <p className="mt-2 text-xs font-body text-tomato" role="alert">
              {error}
            </p>
          )}
          <div className="mt-2">
            <Button type="button" onClick={handleImport} disabled={!jsonInput.trim() || submitting}>
              {submitting ? 'Adding\u2026' : 'Add to Recipe Box'}
            </Button>
          </div>
        </RecipeCard>
      </div>
    </div>
  )
}
