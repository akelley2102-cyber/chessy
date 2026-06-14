import { ChessyBubble, SectionLabel, RecipeCard } from '@/components/ui'

export function ListPage() {
  return (
    <div className="pt-2">
      <SectionLabel>Grocery List</SectionLabel>
      <RecipeCard accent="enamel">
        <ChessyBubble>
          Nothing on the list right now. Plan a few meals or add pantry items, and I'll build the
          list for you — meals first, essentials after.
        </ChessyBubble>
      </RecipeCard>
    </div>
  )
}
