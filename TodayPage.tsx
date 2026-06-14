import { ChessyBubble, SectionLabel, RecipeCard } from '@/components/ui'

export function TodayPage() {
  return (
    <div className="pt-2">
      <SectionLabel>Today</SectionLabel>
      <RecipeCard accent="enamel">
        <ChessyBubble>
          Nothing on today's agenda yet. Once I'm connected to the girls' school email and your meal
          plan, this is where you'll see who needs a packed lunch, any events, and what's for dinner
          tonight.
        </ChessyBubble>
      </RecipeCard>
    </div>
  )
}
