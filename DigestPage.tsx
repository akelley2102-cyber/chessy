import { ChessyBubble, SectionLabel, RecipeCard } from '@/components/ui'

export function DigestPage() {
  return (
    <div className="pt-2">
      <SectionLabel>Morning Digest</SectionLabel>
      <RecipeCard accent="tomato">
        <ChessyBubble>
          I'm not reading the school inbox yet. Once that's connected, this is where each morning's
          summary will land — lunches, events, and tonight's dinner plan.
        </ChessyBubble>
      </RecipeCard>
    </div>
  )
}
