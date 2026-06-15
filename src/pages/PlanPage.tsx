import { ChessyBubble, SectionLabel, RecipeCard } from '@/components/ui'

export function PlanPage() {
  return (
    <div className="pt-2">
      <SectionLabel>This Week's Plan</SectionLabel>
      <RecipeCard accent="mustard">
        <ChessyBubble>
          No meals planned yet. Add a few recipes to your box, then ask me to put together a week —
          I'll factor in what's already in the pantry.
        </ChessyBubble>
      </RecipeCard>
    </div>
  )
}
