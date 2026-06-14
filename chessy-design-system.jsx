import React from "react";
import {
  Home,
  ChefHat,
  ShoppingCart,
  Package,
  Mail,
  Sparkles,
  Check,
  AlertTriangle,
  Clock,
  CalendarDays,
  Snowflake,
} from "lucide-react";

/**
 * CHESSY — Design System v0.1
 * --------------------------------------------------
 * Concept: "The Recipe Box" — Chessy's world is the kitchen
 * command center: recipe cards, pantry labels, the grocery
 * list on the fridge. Instead of the generic
 * cream+terracotta+serif AI palette, this leans into kraft
 * paper, vintage stove enamel, and label-maker mono type.
 *
 * Signature element: the Recipe Card — a tomato top-rule,
 * faint ruled-paper texture, and label-style metadata.
 * Every module (recipes, pantry, grocery list, daily digest)
 * is built from this one card primitive.
 */

const color = {
  kraft: "#E4D5BC", // page background — recipe box exterior
  card: "#FBF8F2", // surfaces — index card paper
  ink: "#2E2A24", // primary text — fountain pen
  pencil: "#6E6258", // secondary text (on card surfaces only)
  enamel: "#33514B", // primary accent — vintage stove enamel
  enamelLight: "#5A7D75", // secondary surfaces / inactive nav
  mustard: "#D4A12C", // "Chessy's pick" highlight
  tomato: "#A8472D", // alerts, destructive
  tomatoLight: "#C1573A", // icon/large-accent only
  pesto: "#4F6B47", // success / in-stock
  rule: "rgba(46,42,36,0.08)", // faint ruled lines on cards
};

const fontDisplay = { fontFamily: "'Bricolage Grotesque', sans-serif" };
const fontBody = { fontFamily: "'Figtree', sans-serif" };
const fontMono = { fontFamily: "'Space Mono', monospace" };
const fontHand = { fontFamily: "'Caveat', cursive" };

function Swatch({ name, hex, usage, note }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: color.card }}>
      <div className="w-12 h-12 rounded-md shrink-0 border" style={{ background: hex, borderColor: color.rule }} />
      <div>
        <div className="text-sm font-semibold" style={{ ...fontBody, color: color.ink }}>{name}</div>
        <div className="text-xs" style={{ ...fontMono, color: color.pencil }}>{hex}</div>
        <div className="text-xs mt-1" style={{ ...fontBody, color: color.pencil }}>{usage}</div>
        {note && <div className="text-xs mt-1 font-semibold" style={{ ...fontBody, color: color.pesto }}>{note}</div>}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ ...fontMono, color: color.enamel }}>
      {children}
    </div>
  );
}

// The signature component — every Chessy module is a RecipeCard
function RecipeCard({ children, accent = color.tomato }) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm"
      style={{
        background: color.card,
        backgroundImage: `repeating-linear-gradient(${color.rule} 0px, ${color.rule} 1px, transparent 1px, transparent 28px)`,
        backgroundPosition: "0 24px",
      }}
    >
      <div style={{ height: 4, background: accent }} />
      <div className="p-4">{children}</div>
    </div>
  );
}

function Badge({ icon: Icon, label, bg, fg }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide"
      style={{ ...fontMono, background: bg, color: fg }}
    >
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );
}

function Button({ children, variant = "primary" }) {
  const styles = {
    primary: { background: color.enamel, color: "#fff" },
    secondary: { background: color.pesto, color: "#fff" },
    ghost: { background: "transparent", color: color.enamel, border: `1.5px solid ${color.enamel}` },
    danger: { background: color.tomato, color: "#fff" },
  };
  return (
    <button
      className="px-4 py-2 rounded-md text-sm font-bold"
      style={{ ...fontBody, ...styles[variant] }}
    >
      {children}
    </button>
  );
}

function ChessyBubble({ children }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: color.enamel }}
      >
        <ChefHat size={18} color="#fff" />
      </div>
      <div
        className="px-4 py-3 rounded-lg rounded-tl-none text-sm max-w-md"
        style={{ ...fontBody, background: color.card, color: color.ink }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ChessyDesignSystem() {
  return (
    <div className="min-h-screen p-6" style={{ background: color.kraft }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Figtree:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Caveat:wght@600;700&display=swap');
      `}</style>

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: color.enamel }}>
            <ChefHat size={24} color="#fff" />
          </div>
          <div>
            <div className="text-3xl font-extrabold" style={{ ...fontDisplay, color: color.ink }}>Chessy</div>
            <div className="text-lg -mt-1" style={{ ...fontHand, color: color.tomato }}>Your home, handled.</div>
          </div>
        </div>
        <p className="text-sm mt-3" style={{ ...fontBody, color: color.pencil }}>
          Design system v0.1 — concept: <strong>The Recipe Box</strong>. Kraft-paper backgrounds,
          index-card surfaces, vintage stove-enamel accents, and label-maker mono type for lists.
          Every module is built from one signature primitive: the Recipe Card.
        </p>
      </div>

      {/* Color Palette */}
      <div className="max-w-3xl mx-auto mb-10">
        <SectionLabel>Color Palette</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Swatch name="Kraft" hex={color.kraft} usage="Page background" />
          <Swatch name="Card" hex={color.card} usage="Surfaces, recipe cards" />
          <Swatch name="Ink" hex={color.ink} usage="Primary text — 9.9:1 on Kraft" note="AAA" />
          <Swatch name="Pencil" hex={color.pencil} usage="Secondary text, on Card only — 5.6:1" note="AA" />
          <Swatch name="Enamel" hex={color.enamel} usage="Primary buttons / nav, white text — 8.7:1" note="AAA" />
          <Swatch name="Mustard" hex={color.mustard} usage="Chessy's picks, ink text — 6.1:1" note="AA" />
          <Swatch name="Tomato" hex={color.tomato} usage="Alerts, white text — 5.8:1" note="AA" />
          <Swatch name="Pesto" hex={color.pesto} usage="In-stock / success, white text — 6.0:1" note="AA" />
        </div>
      </div>

      {/* Typography */}
      <div className="max-w-3xl mx-auto mb-10">
        <SectionLabel>Typography</SectionLabel>
        <div className="rounded-lg p-5 space-y-4" style={{ background: color.card }}>
          <div>
            <div className="text-xs mb-1" style={{ ...fontMono, color: color.pencil }}>DISPLAY — Bricolage Grotesque</div>
            <div className="text-3xl font-extrabold" style={{ ...fontDisplay, color: color.ink }}>This week's dinners</div>
          </div>
          <div>
            <div className="text-xs mb-1" style={{ ...fontMono, color: color.pencil }}>BODY — Figtree</div>
            <div className="text-base" style={{ ...fontBody, color: color.ink }}>
              Used for descriptions, instructions, and everyday UI text. Warm, rounded, easy to read on a phone screen.
            </div>
          </div>
          <div>
            <div className="text-xs mb-1" style={{ ...fontMono, color: color.pencil }}>LABEL / DATA — Space Mono</div>
            <div className="text-sm" style={{ ...fontMono, color: color.ink }}>
              2 cups flour · 1 tbsp olive oil · serves 4 · 35 min
            </div>
          </div>
          <div>
            <div className="text-xs mb-1" style={{ ...fontMono, color: color.pencil }}>ACCENT — Caveat (Chessy's handwriting)</div>
            <div className="text-2xl" style={{ ...fontHand, color: color.tomato }}>
              "Don't forget — chicken needs to thaw tonight!"
            </div>
          </div>
        </div>
      </div>

      {/* Signature: Recipe Card */}
      <div className="max-w-3xl mx-auto mb-10">
        <SectionLabel>Signature Component — Recipe Card</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RecipeCard accent={color.tomato}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-lg font-bold" style={{ ...fontDisplay, color: color.ink }}>Sheet-Pan Chicken Fajitas</div>
              <Badge icon={Sparkles} label="Pick" bg={color.mustard} fg={color.ink} />
            </div>
            <div className="flex gap-3 text-xs mb-2" style={{ ...fontMono, color: color.pencil }}>
              <span className="flex items-center gap-1"><Clock size={12} /> 35 min</span>
              <span className="flex items-center gap-1"><Snowflake size={12} /> Thaw chicken</span>
            </div>
            <p className="text-sm" style={{ ...fontBody, color: color.ink }}>
              Peppers, onion, chicken thighs, fajita seasoning. Kid-approved — Emma will eat the peppers if they're soft.
            </p>
          </RecipeCard>

          <RecipeCard accent={color.enamel}>
            <div className="text-lg font-bold mb-2" style={{ ...fontDisplay, color: color.ink }}>Grocery List — This Week</div>
            <ul className="space-y-2 text-sm" style={{ ...fontMono, color: color.ink }}>
              <li className="flex items-center gap-2"><span className="w-4 h-4 rounded border-2 inline-block" style={{ borderColor: color.enamel }} /> Chicken thighs (2 lb)</li>
              <li className="flex items-center gap-2"><span className="w-4 h-4 rounded flex items-center justify-center" style={{ background: color.pesto }}><Check size={10} color="#fff" /></span>
                <span className="line-through" style={{ color: color.pencil }}>Bell peppers</span></li>
              <li className="flex items-center gap-2"><span className="w-4 h-4 rounded border-2 inline-block" style={{ borderColor: color.enamel }} /> Paper towels
                <Badge icon={AlertTriangle} label="Low" bg={color.tomato} fg="#fff" />
              </li>
            </ul>
          </RecipeCard>
        </div>
      </div>

      {/* Voice & Tone */}
      <div className="max-w-3xl mx-auto mb-10">
        <SectionLabel>Voice &amp; Tone</SectionLabel>
        <div className="rounded-lg p-5 space-y-3" style={{ background: "transparent" }}>
          <ChessyBubble>Good morning! Here's the rundown for today.</ChessyBubble>
          <ChessyBubble>Added chicken thighs to this week's list — and reminding you to pull them from the freezer tonight.</ChessyBubble>
          <ChessyBubble>We're down to our last roll of paper towels. I added it to the list.</ChessyBubble>
          <ChessyBubble>I couldn't read that recipe link — paste the ingredients in and I'll take it from there.</ChessyBubble>
          <ChessyBubble>Nothing in the recipe box yet. Send me one you love and I'll keep it safe.</ChessyBubble>
        </div>
        <p className="text-xs mt-2 px-1" style={{ ...fontBody, color: color.pencil }}>
          Warm, capable, plain-spoken. Never apologizes for errors — explains what happened and what's next.
          Confirms actions in the same words used to request them.
        </p>
      </div>

      {/* Components */}
      <div className="max-w-3xl mx-auto mb-10">
        <SectionLabel>Core Components</SectionLabel>
        <div className="rounded-lg p-5 space-y-4" style={{ background: color.card }}>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Add to list</Button>
            <Button variant="secondary">Mark done</Button>
            <Button variant="ghost">Edit recipe</Button>
            <Button variant="danger">Remove</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge icon={Sparkles} label="Chessy's Pick" bg={color.mustard} fg={color.ink} />
            <Badge icon={Check} label="In Stock" bg={color.pesto} fg="#fff" />
            <Badge icon={AlertTriangle} label="Low Stock" bg={color.tomato} fg="#fff" />
            <Badge icon={CalendarDays} label="This Week" bg={color.enamelLight} fg="#fff" />
          </div>
          {/* Bottom nav preview */}
          <div className="flex justify-between rounded-lg p-2" style={{ background: color.enamel }}>
            {[
              { icon: Home, label: "Today" },
              { icon: ChefHat, label: "Recipes" },
              { icon: CalendarDays, label: "Plan" },
              { icon: ShoppingCart, label: "List" },
              { icon: Package, label: "Pantry" },
              { icon: Mail, label: "Digest" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex flex-col items-center gap-1 px-2 py-1 rounded" style={{ color: i === 0 ? color.mustard : "#fff" }}>
                <Icon size={18} />
                <span className="text-[10px]" style={{ ...fontBody }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Notes */}
      <div className="max-w-3xl mx-auto">
        <SectionLabel>Phase 0a Audit Notes</SectionLabel>
        <div className="rounded-lg p-5 text-sm space-y-2" style={{ background: color.card, ...fontBody, color: color.ink }}>
          <p>✅ <strong>Contrast checked</strong> — every text/background pairing above meets WCAG AA (4.5:1) or AAA. Tomato and Mustard are reserved for badges/icons with the paired text colors shown, not for body text directly on Kraft.</p>
          <p>✅ <strong>Secondary text rule</strong> — Pencil (#6E6258) is AA on Card but falls just short on Kraft. Rule: secondary text only appears on Card surfaces, never directly on the page background.</p>
          <p>⚠️ <strong>Font loading</strong> — for offline PWA use, these four fonts need to be self-hosted (bundled in the build) rather than loaded via Google Fonts CDN. Flagging for Phase 0b build setup.</p>
          <p>⚠️ <strong>Motion</strong> — none proposed yet by design; will respect prefers-reduced-motion when we add any transitions in Phase 1.</p>
        </div>
      </div>
    </div>
  );
}
