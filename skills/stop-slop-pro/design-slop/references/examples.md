# Before and After Examples

Six worked examples showing the design-slop skill in action.

## Example 1: The Default SaaS Hero

**Before:**
> Full-width purple-to-blue gradient background (#7C3AED to #2563EB). Centered H1 in Inter Bold 48px: "Build the Future of Your Business." Small pill badge above reading "Now in Beta" with purple background. Two buttons: "Get Started" (purple gradient, rounded-full) and "Learn More" (ghost, purple border). Below: three centered metrics, "10M+ Users, 99.9% Uptime, 200ms Response" in Inter Regular 14px gray (#888888).

**After:**
> Solid dark background (#1C1917, warm charcoal). Left-aligned H1 in Canela 56px: "Your deploy pipeline runs in 12 seconds." One button: "Try it free" in coral (#E85D4A) with white text. Right side: actual terminal screenshot showing a real deployment log with highlighted timing. No metrics row. No badge.

**Patterns eliminated:** Purple gradient, centered layout, vague headline, badge-above-H1, stat banner, dual CTA, Inter font.

**Patterns introduced:** Specific headline, asymmetric layout, single CTA, real evidence, distinctive typeface, intentional color palette.

## Example 2: Feature Card Grid

**Before:**
> Six identical cards in a 3 by 2 grid on a white background. Each card: 16px border-radius, 1px gray border, 24px uniform padding. Inside: a 48x48px rounded-square purple icon container at top (containing Lucide icons), an H3 heading in Inter Semibold 18px, two lines of description in Inter Regular 14px gray. Every card has identical shadow: `0 1px 3px rgba(0,0,0,0.1)`. Section heading above: "Features" in Inter Bold 32px centered.

**After:**
> Bento-style CSS grid. Two large cards spanning 2 columns each: one contains an annotated product screenshot with detailed feature explanation, the other contains a code example with syntax highlighting. Four smaller cards in a 2 by 2 below. Varying treatments: one dark background (#292524), one with subtle coral left border (1px, not the thick AI tell), two plain with text. No icon containers. Section heading above in Canela: "What it does" left-aligned.

**Patterns eliminated:** Identical card grid, icon tiles above headings, uniform padding, uniform shadows, Inter font, centered heading, purple accents.

**Patterns introduced:** Bento layout, size variation, content-driven hierarchy, mixed visual treatments, distinctive typeface.

## Example 3: Dark Mode with Colored Left Borders

**Before:**
> Dark background (#000000 pure black). Body text in #888888 gray (contrast ratio: ~2.5:1, fails WCAG AA). Navigation sidebar with emoji icons. Main content: four testimonial cards, each with a 3px purple (#7C3AED) left border and 12px border-radius. Inside each: a quote in Inter Italic 16px, a name in Inter Semibold 14px ("Sarah M., Marketing Director"), no company, no photo. Small purple glow on hover.

**After:**
> Dark background (#1C1917, warm charcoal). Body text in #D4D4D8 (contrast ratio: ~9.5:1, passes WCAG AAA). Navigation sidebar with Phosphor icons in a consistent 20px size. Main content: three testimonial blocks as plain text separated by thin horizontal dividers (#44403C). Each: a specific quote, a real name with a real company name and role ("Marta Chen, VP Engineering at Raycast"), linked to the company. One testimonial includes a small real headshot.

**Patterns eliminated:** Pure black background, low-contrast text, emoji icons, colored left borders, generic testimonials, neon glow hover, glassmorphism-adjacent styling.

**Patterns introduced:** Tinted dark background, high-contrast text, real icon library, divider-based separation, verifiable testimonials, real headshot.

## Example 4: Numbered Step Sequence

**Before:**
> Three steps in a horizontal row on a light background. Each card: 16px border-radius, white background, subtle shadow. Content: a large circle (48px) with number (1, 2, 3) in purple (#7C3AED) Inter Bold 24px, a heading in Inter Semibold 18px ("Connect Your Data," "Configure Rules," "Launch and Monitor"), two lines of description, and a small icon below. Cards connected by dotted gray lines between them.

**After:**
> A single narrative section with two columns. Left column: a short paragraph in Graphik Regular 16px explaining the setup process in prose: "Connect your database with one connection string. Define alert rules in YAML. Deploy in under two minutes." A code block below showing the actual three commands. Right column: an animated terminal (CSS-only, no bounce) showing a real deployment in progress, with output appearing line by line using staggered animation-delay.

**Patterns eliminated:** Numbered step sequence, identical card treatment, dotted connectors, purple number circles, disconnected description.

**Patterns introduced:** Narrative explanation, real code evidence, animated demonstration, asymmetric layout, purposeful motion.

## Example 5: The Full Slop Homepage Audit

**Input:** A typical AI-generated SaaS landing page.

**Audit findings (12 patterns triggered, Maximum slop):**

| # | Pattern | Location |
|---|---------|----------|
| 1 | Inter used everywhere | Global font-family |
| 2 | Lavender-purple accents | Buttons, borders, icons |
| 3 | Purple-to-blue gradient | Hero background |
| 4 | Centered everything | All text-align: center |
| 5 | Badge above hero H1 | "Launching v2.0" pill |
| 6 | Stat banner | "10M+, 99.9%, <200ms" |
| 7 | Identical feature cards x6 | Icon plus heading plus text grid |
| 8 | Colored left borders | On testimonial and pricing cards |
| 9 | Numbered step sequence | "How it works: 1-2-3" |
| 10 | Emoji sidebar icons | Nav |
| 11 | All-caps section labels | "FEATURES" "PRICING" "TESTIMONIALS" |
| 12 | Glassmorphism cards | Frosted glass on pricing section |

**Redesign:**

1. **Hero.** Solid warm-charcoal background. Left-aligned H1 in Tiempos: "Stop losing revenue to failed webhooks." Real product screenshot on right. One button. No badge. No stat banner.
2. **Features.** Two alternating sections (left-right). Each: annotated screenshot plus detailed explanation in Graphik. No cards. No icons in containers.
3. **How it works.** Embedded terminal showing real commands. Narrative text beside it. No numbered steps.
4. **Social proof.** Three specific testimonials from named people at real companies. Plain text with dividers. No cards, no borders.
5. **Pricing.** Three tiers with real differentiation. Solid backgrounds, no glassmorphism. Clear feature comparison.
6. **Footer.** Minimal. No emoji.

**Result:** 0 patterns triggered. Clean.

## Example 6: Glassmorphism Dashboard

**Before:**
> Dark background (#000000) with three blurred colored orbs floating behind content (purple, blue, cyan, each with `filter: blur(80px)` and `opacity: 0.3`). Sidebar with emoji icons. Main content area with frosted-glass cards: `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`. Every card has the same glassmorphism treatment. Monospace font for all text including headings and labels. Bounce easing on card entrance animations.

**After:**
> Light background (#F5F0EB warm cream). Sidebar with Phosphor icons in consistent 20px size, warm charcoal color (#292524). Cards are plain: solid white background (`#FFFFFF`), subtle 1px border (#E7E5E4), no blur, no transparency, no glow. Two distinct card styles: data display cards (with chart area and metrics) and action cards (with button). Headings in Canela, body text in Graphik. One accent color: muted coral (#E8836B). Entrance animations use ease-out-expo, 400ms, staggered 80ms.

**Patterns eliminated:** Glassmorphism, pure black, blurred orbs, emoji icons, monospace-as-default, bounce easing, neon glow, uniform card treatment, low contrast.

**Patterns introduced:** Intentional light theme, real icon library, typographic hierarchy, purposeful motion, solid surfaces, limited accent color.
