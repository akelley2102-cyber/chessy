import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Sparkles, Clock, Users } from 'lucide-react'
import { ChessyBubble, SectionLabel, RecipeCard, Button, Badge, Input } from '@/components/ui'
import { useRecipes } from '@/hooks/useRecipes'

export function RecipesPage() {
  const { recipes, loading, error } = useRecipes()
  const [search, setSearch] = useState('')

  const query = search.trim().toLowerCase()
  const filtered = query
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    : recipes

  return (
    <div className="pt-2">
      <div className="mb-3 flex items-center justify-between gap-2">
        <SectionLabel>Recipe Box</SectionLabel>
        <Link to="/recipes/new">
          <Button variant="primary">
            <Plus size={16} />
            Add recipe
          </Button>
        </Link>
      </div>

      {loading && (
        <RecipeCard accent="enamel">
          <ChessyBubble>Pulling up your recipe box…</ChessyBubble>
        </RecipeCard>
      )}

      {!loading && error && (
        <RecipeCard accent="tomato">
          <ChessyBubble>
            I couldn&rsquo;t load the recipe box just now ({error}). Try refreshing in a moment.
          </ChessyBubble>
        </RecipeCard>
      )}

      {!loading && !error && recipes.length === 0 && (
        <RecipeCard accent="tomato">
          <ChessyBubble>
            Your recipe box is empty. Send me a recipe you love — paste the ingredients and steps,
            or a link — and I&rsquo;ll keep it filed here.
          </ChessyBubble>
        </RecipeCard>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <div className="relative mb-3">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-pencil"
            />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or tag"
              className="pl-9"
              aria-label="Search recipes"
            />
          </div>

          {filtered.length === 0 ? (
            <RecipeCard accent="enamel">
              <ChessyBubble>
                Nothing matches &ldquo;{search}&rdquo; in the recipe box yet.
              </ChessyBubble>
            </RecipeCard>
          ) : (
            <ul className="space-y-3">
              {filtered.map((recipe) => (
                <li key={recipe.id}>
                  <Link to={`/recipes/${recipe.id}`} className="block">
                    <RecipeCard accent={recipe.isPick ? 'mustard' : 'tomato'}>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-ink">{recipe.title}</h3>
                        {recipe.isPick && (
                          <Badge icon={Sparkles} tone="pick">
                            Pick
                          </Badge>
                        )}
                      </div>

                      {(recipe.totalTimeMinutes || recipe.servings) && (
                        <div className="mt-1 flex gap-3 font-mono text-xs text-pencil">
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
                      )}

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
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
