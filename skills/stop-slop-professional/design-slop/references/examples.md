# Before and After Examples

Ten worked examples. The first six cover design slop alone. The next four show the pack working on its own output, including the ponytail plus stop-slop combination.

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

**Audit findings (15 patterns triggered, Maximum slop):**

| # | Pattern | Location |
|---|---------|----------|
| 1 | Inter used everywhere | Global font-family |
| 2 | Lavender-purple accents | Buttons, borders, icons |
| 3 | Purple-to-blue gradient | Hero background |
| 4 | Aurora mesh background | Blurred blobs behind hero |
| 5 | Centered everything | All text-align: center |
| 6 | Badge above hero H1 | "Launching v2.0" pill |
| 7 | Centered hero trio | Badge + H1 + subhead + 2 CTAs |
| 8 | Stat banner | "10M+, 99.9%, <200ms" |
| 9 | Identical feature cards x6 | Icon plus heading plus text grid |
| 10 | Colored left borders | On testimonial and pricing cards |
| 11 | Numbered step sequence | "How it works: 1-2-3" |
| 12 | Emoji sidebar icons | Nav |
| 13 | All-caps section labels | "FEATURES" "PRICING" "TESTIMONIALS" |
| 14 | Glassmorphism cards | Frosted glass on pricing section |
| 15 | "Trusted by" grayscale logo strip | 8 logos, none linked |
| 16 | 3-tier pricing with "Most Popular" badge | Middle tier highlighted |
| 17 | FAQ accordion before footer | 8 questions, accordion form |

**Redesign:**

1. **Hero.** Solid warm-charcoal background. Left-aligned H1 in Tiempos: "Stop losing revenue to failed webhooks." Real product screenshot on right. One button. No badge. No stat banner. No aurora blobs.
2. **Features.** Two alternating sections (left-right). Each: annotated screenshot plus detailed explanation in Graphik. No cards. No icons in containers.
3. **How it works.** Embedded terminal showing real commands. Narrative text beside it. No numbered steps.
4. **Social proof.** Three named case studies with linked logos. Plain text with dividers. No cards, no borders.
5. **Pricing.** Three tiers with real differentiation (feature limits, not "more of everything"). Solid backgrounds, no glassmorphism. No "Most Popular" badge. The differentiation is in the feature list.
6. **Footer.** Minimal. No emoji. Link to a real help page instead of an FAQ accordion.

**Result:** 0 patterns triggered. Clean.

## Example 6: Glassmorphism Dashboard

**Before:**
> Dark background (#000000) with three blurred colored orbs floating behind content (purple, blue, cyan, each with `filter: blur(80px)` and `opacity: 0.3`). Sidebar with emoji icons. Main content area with frosted-glass cards: `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`. Every card has the same glassmorphism treatment. Monospace font for all text including headings and labels. Bounce easing on card entrance animations.

**After:**
> Light background (#F5F0EB warm cream). Sidebar with Phosphor icons in consistent 20px size, warm charcoal color (#292524). Cards are plain: solid white background (`#FFFFFF`), subtle 1px border (#E7E5E4), no blur, no transparency, no glow. Two distinct card styles: data display cards (with chart area and metrics) and action cards (with button). Headings in Canela, body text in Graphik. One accent color: muted coral (#E8836B). Entrance animations use ease-out-expo, 400ms, staggered 80ms.

**Patterns eliminated:** Glassmorphism, pure black, aurora mesh background, emoji icons, monospace-as-default, bounce easing, neon glow, uniform card treatment, low contrast.

**Patterns introduced:** Intentional light theme, real icon library, typographic hierarchy, purposeful motion, solid surfaces, limited accent color.

## Example 7: AI First Draft of a SaaS Hero, then after Stop Slop Ultra

This example proves the skill works on its own output. The "before" is what an AI generates by default. The "after" is what the skill produces.

**AI first draft (before):**

> Hero section. Aurora mesh gradient background (purple, blue, pink blurred blobs). Centered layout. Small pill badge above H1: "✨ AI-Powered". H1 in Inter Bold 52px: "Revolutionize Your Workflow with AI". Subhead in Inter Regular 18px gray: "Harness the power of artificial intelligence to transform how your team works. Seamlessly integrate cutting-edge ML into your existing processes." Two buttons: "Get Started Free" (purple gradient, rounded-full) and "Watch Demo" (ghost, purple border). Below: stat banner "10,000+ Teams, 99.9% Uptime, 50ms Response". Below that: "Trusted by" grayscale logo strip with 8 logos.

**Stop Slop Ultra output (after):**

> Hero section. Solid warm-charcoal background (#1C1917). Left-aligned layout. No badge. H1 in Tiempos Headline 56px: "Your team's Slack messages, answered in 2 seconds instead of 2 hours." Subhead in Graphik Regular 18px, warm gray (#A8A29E): "Our AI reads your Slack history and drafts replies in your voice. Median draft-to-send time drops from 2 hours to 12 seconds." One button: "Try it free" in muted coral (#E85D4A). Right side: annotated screenshot showing a real Slack thread with the AI draft highlighted. No stat banner. No logo strip.

**Patterns eliminated from the draft:** Aurora mesh background, centered layout, sparkle emoji badge, vague headline ("Revolutionize Your Workflow with AI"), Inter font, binary structure (Get Started + Watch Demo), stat banner with unverifiable metrics, "Trusted by" grayscale logo strip, throat-clearing in subhead ("Harness the power of"), banned adverb in subhead.

**Patterns introduced:** Solid tinted background, asymmetric layout, specific headline with concrete number, distinctive typeface, single CTA, real product evidence, direct subhead with verifiable metric.

**What the skill did, step by step:**

1. Ran the ladder. System rung: no tokens defined. Defined tokens (Canela, Graphik, warm charcoal, coral accent).
2. Type rung: Inter flagged. Replaced with Tiempos (display) and Graphik (body).
3. Color rung: aurora mesh flagged. Replaced with solid tinted background. Purple gradient flagged. Replaced with coral accent.
4. Layout rung: centered-everything flagged. Switched to left-aligned hero. Badge above H1 flagged. Removed. Stat banner flagged. Removed (numbers unverifiable). Logo strip flagged. Removed (no linkable logos).
5. Motion rung: no motion issues in the static draft.
6. Content rung: vague headline flagged. Rewrote to state what the product does with a specific number. Throat-clearing in subhead flagged ("Harness the power of"). Removed. Banned adverb in subhead flagged. Removed.
7. Detection rung: ran the script. Score went from 12/100 (maximum slop) to 91/100 (clean).

## Example 8: AI First Draft of a Feature Section, then after Ponytail plus Stop Slop Combined

This example proves the pack works together. The "before" is what an AI generates by default. The "after" is what ponytail and stop-slop produce together.

**AI first draft (before):**

```tsx
// FeatureSection.tsx
import { FeatureCard } from './FeatureCard';
import { Feature, FeatureType } from './types';
import { featureConfig } from './config';

interface FeatureSectionProps {
  features?: Feature[];
  variant?: 'default' | 'compact' | 'expanded';
  showIcons?: boolean;
  layout?: 'grid' | 'list' | 'bento';
  columns?: number;
}

export function FeatureSection({
  features = featureConfig,
  variant = 'default',
  showIcons = true,
  layout = 'grid',
  columns = 3,
}: FeatureSectionProps) {
  const gridClass = layout === 'grid' ? `grid grid-cols-${columns}` : 'flex flex-col';

  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900" style={{ fontFamily: 'Inter' }}>
          Features
        </h2>
        <div className={gridClass}>
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              feature={feature}
              variant={variant}
              showIcon={showIcons}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

Plus: `FeatureCard.tsx` (47 lines), `types.ts` (23 lines), `config.ts` (34 lines). Total: 156 lines across 4 files. Renders a centered "Features" heading in Inter on a purple-to-blue gradient, with identical cards in a grid.

**Ponytail plus Stop Slop output (after):**

```tsx
// FeatureSection.tsx
const features = [
  { title: 'Drafts replies in your voice', body: 'Trained on your last 1,000 Slack messages. Median accuracy: 89%.' },
  { title: 'Reads context across channels', body: 'Pulls related threads from up to 5 channels to inform each draft.' },
  { title: 'Learns from edits', body: 'Every edit you make feeds the model. Accuracy improves 3% per week on average.' },
];

export function FeatureSection() {
  return (
    <section className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="container mx-auto">
        <h2 className="text-4xl mb-12" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          What it does
        </h2>
        <div className="flex flex-col gap-12">
          {features.map((f, i) => (
            <div key={i} className="grid grid-cols-12 gap-8 items-start">
              <h3 className="col-span-4 text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                {f.title}
              </h3>
              <p className="col-span-8 text-base" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Total: 28 lines, one file. No `FeatureCard`, no `types.ts`, no `config.ts`, no `variant` prop, no `showIcons` prop, no `layout` prop, no `columns` prop.

**What ponytail did:**

1. Killed the `Feature` interface. The data is a literal array.
2. Killed the `FeatureCard` component. One component renders the list.
3. Killed the `variant`, `showIcons`, `layout`, `columns` props. None were requested.
4. Killed the `featureConfig` import. The data lives in the file.
5. Killed the `FeatureType` type alias. Unused.
6. Shipped 28 lines instead of 156.

Skipped: FeatureCard extraction, Feature interface, config file, variant system. Add when there are 6 or more features with distinct presentation needs.

**What stop-slop did:**

1. Killed the purple-to-blue gradient background. Replaced with solid `--color-bg`.
2. Killed Inter. Replaced with `--font-display` (Tiempos) for headings, `--font-body` (Graphik) for body.
3. Killed the centered heading. Left-aligned.
4. Killed "Features" as the heading. "What it does" is more direct.
5. Killed the identical card grid. Replaced with a list of side-by-side title and body rows.
6. Killed the generic feature descriptions. Replaced with specific claims and verifiable metrics.

**The two skills acting together:**

Ponytail removed the abstraction. Stop-slop removed the slop. The result is one file, 28 lines, with intentional design and direct prose. Neither skill fought the other. Ponytail governed code shape. Stop-slop governed what the code renders and what it says.

## Example 9: E-commerce Page Teardown

**Before:**
> White background. Hero: centered, gradient overlay on product image. Product title in Inter Bold. "5 stars (2,847 reviews)" in gray, no link to reviews. "40% OFF" badge with fire emoji. Three feature cards below: Free Shipping, Secure Payment, Quality Guarantee. Product description: "Experience unparalleled quality with our premium product. Crafted with care using only the finest materials, this product is designed to exceed your expectations and elevate your everyday life."

**After:**
> Warm cream background (#FFF8F0). Hero: product image left-aligned with generous whitespace, product name in Freight Text Display. Real review excerpt from a named buyer, not a star count. No badge, the discount is in the price itself. Features as plain text with Tabler icons: shipping details (free over $50, 3-5 day delivery), payment methods (Visa, Mastercard, Amex, PayPal), return policy (30 days, free returns). Product description: "Hand-stitched in Portland. Full-grain leather, brass hardware, 10-year warranty. The patina develops over the first month of daily use."

**Patterns eliminated:** Gradient overlay, centered hero, fake star testimonials, fire emoji badge, vague description, generic features, redundant UX writing.

**Patterns introduced:** Specific product details, real materials, verifiable claims, distinctive typeface, warm palette, specific feature copy.

**Text slop fixes applied:** "Experience unparalleled quality" cut (vague declarative). "Crafted with care" cut (performative emphasis). "Exceed your expectations" cut (vague declarative). "Elevate your everyday life" cut (AI marketing cliché). Replaced with specific, verifiable claims.

## Example 10: Documentation Landing Page

**Before:**
> Dark mode (#000000). Monospace font (Space Mono) for everything, headings, body, labels. Purple accent on code blocks. Three-column card grid with colored left borders showing "Easy Integration," "Powerful API," "Real-time Events." Animated gradient background behind the hero. Stat banner: "50ms latency, 99.99% uptime, 10B+ events processed." Pricing cards with glassmorphism. All-caps section labels: "FEATURES" "API" "PRICING." Sparkle emoji on every AI-related label.

**After:**
> Light mode with warm tint (#F9F7F4). Headings in Untitled Sans, body in System UI, code in Geist Mono (only for actual code). Accent: deep teal (#0D7377). Hero shows an actual API request and response pair in a terminal widget. Features described inline with the code examples (no card grid). One real metric: "Median response time: 43ms (measured over 10M requests last week)" with a link to the methodology. Pricing as a simple table, no cards. Section headings in sentence case. No emoji.

**Patterns eliminated:** Pure black, monospace-as-default, purple accents, colored left borders, stat banner, glassmorphism, all-caps labels, animated gradient background, sparkle emoji, vague features.

**Patterns introduced:** Real evidence, specific metrics with methodology, minimal layout, intentional palette, proper font pairing, sentence case, no emoji.

## Example 11: The 2026 Bone-Palette Editorial Slop Hero

This is the post-Q1 2026 default that replaced the purple gradient. It looks "tasteful" in isolation but is now the universal Opus 4.7/4.8 house style — identical across vet clinic, fintech, and crypto landing pages.

**Before:**
> Background `#F4F1EA` (warm cream). Body text in `#37352F` warm charcoal. Hero H1 in Fraunces italic 88px, `letter-spacing: -0.04em`: "Build *your* next *idea* with *confidence*." Subhead in Inter 18px: "Acme Platform brings your team together with *powerful* tools designed to streamline workflows, boost productivity, and drive results." Single terracotta accent `#C96442` on the primary CTA "Start *free* trial". Two CTAs centered: primary terracotta + ghost "Talk to sales". A small pill chip "✦ *Introducing*" sits above the hero. Below: three feature cards with `rounded-2xl` icon tiles, terracotta icon background, headings "Real-time *collaboration* / Smart *automation* / Effortless *scaling*".

**After:**
> Background `#FFFFFF` (or, if warm cream is wanted, `#F4F1EA` paired with a non-terracotta accent like indigo `#5266EB`). Body text in `#1A1A1A`. Hero H1 in Tiempos Headline 72px, `letter-spacing: -0.01em`, all roman: "Your deploy pipeline runs in 12 seconds." Subhead in Inter 18px, no italic: "Acme runs your CI on isolated runners. Median build time 43ms. Free for the first 1,000 minutes." Single primary CTA "Run your first deploy" — verb specific to the product, no arrow icon. No secondary CTA. No pill chip. Feature section uses a single annotated product screenshot, no card grid.

**Patterns eliminated:** Bone/cream default palette (or: cream + non-terracotta accent), Fraunces/Instrument Serif hero display, italic word-accents, tracking-tight hero, aphoristic-cadence copy, generic verb-first headline, centered hero with dual CTAs, pill chip eyebrow, identical feature cards, italic-serif feature titles.

**Patterns introduced:** Specific headline, real metrics, real product screenshot, single CTA, deliberate typeface choice outside the overused set, intentional accent color.

**Model fingerprint:** Claude Opus 4.7 / 4.8 house style, confirmed verbatim in the Opus 4.8 prompt guide: "warm cream/off-white backgrounds (~#F4F1EA), serif display type (Georgia, Fraunces, Playfair), italic word-accents, and a terracotta/amber accent."

## Example 12: The "Bone + Dark Brown" Dark Mode

The bone palette leaking into dark mode with worse contrast. Common on Opus 4.7/4.8 generated dashboards.

**Before:**
> Background `#1A1714` (warm near-black). Body text in `#3D2E20` (warm brown) on dark elements — wait, that's nearly invisible. Actual rendering: body text in `#8A7E70` "warm muted" for readability, but contrast ratio is 3.2:1, failing WCAG AA. Section labels in `#A0917F` all-caps with `letter-spacing: 0.12em`. Accent `#C96442` terracotta on CTA buttons. Headings in Fraunces italic. Italic word-accents throughout. Looks "moody and editorial" but is functionally inaccessible.

**After:**
> Background `oklch(15% 0.01 250)` (cool-tinted near-black). Body text in `#FAFAFA` pure off-white (contrast 18:1, passes WCAG AAA). Section labels in `#A8A8A8` sentence case, no letter-spacing abuse. Accent `#5EB3FF` cool blue on CTA buttons. Headings in Geist Sans 600 weight, all roman. No italic anywhere in UI copy.

**Patterns eliminated:** "Bone + dark brown" dark mode, warm-charcoal text failing WCAG AA, all-caps section labels with wide tracking, italic word-accents, Fraunces-as-default hero display, terracotta accent.

**Patterns introduced:** Tinted near-black background, pure off-white body text (passes AAA), sentence case, deliberate sans-serif, intentional cool accent.

**Model fingerprint:** Claude Opus 4.7 / 4.8 dark-mode variant. The bone palette reflexively applied to dark mode without adjusting for accessibility.

## Example 13: v0 / Lovable / Bolt Default Teardown

The "Purple Problem" exemplar. Visible on most v0 / Lovable / Bolt output without explicit overrides.

**Before:**
> White background `#FFFFFF`. Body text in `#0F172A` slate-900. Hero H1 in Inter Bold 56px: "Build the Future of Your Business." Small pill badge above reading "🚀 Now in Beta" with `bg-indigo-500` background. Two buttons: "Get Started" (purple gradient `from-indigo-500 to-purple-600`, `rounded-full`) and "Learn More" (ghost, indigo border). Below: three centered metrics — "10M+ Users · 99.9% Uptime · 200ms Response" in Inter Regular 14px gray (`text-gray-500`). Then a 3-card feature grid: each card has `rounded-xl`, `shadow-sm`, `bg-gray-50`, a Lucide icon in a `rounded-2xl` indigo-tinted container, an H3 in Inter Semibold 18px ("Powerful API / Real-time Sync / Enterprise Security"), and a 2-line description.

**After:**
> Solid dark background (`#1C1917`, warm charcoal — but **not** the bone-palette dark mode). Left-aligned H1 in Canela 56px: "Your deploy pipeline runs in 12 seconds." One button: "Try it free" in coral (`#E85D4A`) with white text. Right side: actual terminal screenshot showing a real deployment log with highlighted timing. No metrics row. No badge.

**Patterns eliminated:** VibeCode Purple, Inter font, gradient text on hero, badge-above-H1, stat banner, dual CTA, identical feature card grid, icon tile above heading, shadcn/ui defaults, Mac mockup (implied), Tailwind-default indigo + slate + gray.

**Patterns introduced:** Specific headline, asymmetric layout, single CTA, real evidence, distinctive typeface, intentional color palette, dark mode done right.

**Model fingerprint:** v0 by Vercel (most convergent) or Lovable (Purple Problem exemplar). Override: provide a DESIGN.md with explicit color tokens, typography, radius, and elevation. Use Anthropic's anti-slop fragment. Replace Mac mockup with real screenshot. Replace aurora blob with solid background.
