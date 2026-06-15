import { ChessyBubble, SectionLabel, RecipeCard, Button } from '@/components/ui'

export function RecipesPage() {
  return (
    <div className="pt-2">
      <SectionLabel>Recipe Box</SectionLabel>
      <RecipeCard accent="tomato">
        <ChessyBubble>
          Your recipe box is empty. Send me a recipe you love — paste the ingredients and steps, or
          a link — and I'll keep it filed here.
        </ChessyBubble>
        <div className="mt-3">
          <Button variant="primary" disabled>
            Add a recipe
          </Button>
        </div>
      </RecipeCard>
    </div>
  )
}
