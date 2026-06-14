import { ChessyBubble, SectionLabel, RecipeCard, Button } from '@/components/ui'

export function PantryPage() {
  return (
    <div className="pt-2">
      <SectionLabel>Pantry &amp; Essentials</SectionLabel>
      <RecipeCard accent="pesto">
        <ChessyBubble>
          I'm not tracking any pantry items yet. Upload a grocery, Target, or
          Walmart receipt and I'll start learning what you usually keep on
          hand — and flag it when something's running low.
        </ChessyBubble>
        <div className="mt-3">
          <Button variant="primary" disabled>
            Upload a receipt
          </Button>
        </div>
      </RecipeCard>
    </div>
  )
}
