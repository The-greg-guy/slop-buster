# Design Slop Alternatives

What to use instead of the default AI patterns. Code examples included. No overlap with patterns.md. Patterns describes the problem. Alternatives describes the fix.

## Font Alternatives

### Instead of Inter, Roboto, Arial, Space Grotesk, Plus Jakarta Sans

| Category | Fonts | Feel |
|----------|-------|------|
| Geometric sans | Geist, Haas Grotesk, Untitled Sans, Söhne, Inktrap | Modern, technical |
| Humanist sans | Forma, Grotta, General Sans, ABC Diatype | Warm, approachable |
| Grotesque | Neue Haas Grotesk, ABC Diatype, Monument Grotesk | Editorial, sharp |
| Serif (display) | Tiempos, GT Sectra, Freight Text, Canela | Classic, trustworthy |
| Serif (body) | Georgia, Merriweather, Literata, Reading | Readable, warm |

### Pairing Guide

| Display Font | Body Font | Use When | Why |
|-------------|-----------|----------|-----|
| Geist Sans | Geist Mono or Söhne | Technical products | Geist signals engineering. Mono for code accents. |
| Tiempos Headline | Tiempos Text | Editorial, content-heavy | Display and text from the same family. Hierarchy through weight, not family swap. |
| Canela | Graphik | Premium, lifestyle | Canela is high-contrast serif. Graphik is neutral sans. The contrast reads as premium. |
| Untitled Sans | Untitled Serif | Balanced, modern | Same designer, same x-height. The pairing is invisible until you look for it. |
| Haas Grotesk | Tiempos | Corporate, professional | Neutral sans for UI. Warm serif for body. Classic publishing combination. |
| Inktrap | AnyObject | Creative, bold | Inktrap is loud. AnyObject is quiet. The contrast makes a statement. |
| Forma | Forma Text | Startups, SaaS | Display and text from the same family. Easy to scale. Hard to mess up. |

Pair a distinctive display font with a refined body font. Two fonts minimum. Three maximum. The contrast should be visible.

### Letter-Spacing Guide

| Element | Spacing | CSS | Rationale |
|---------|---------|-----|-----------|
| Large headings (48px or more) | -0.01 to -0.02em | `letter-spacing: -0.02em` | Pulls letters together. Confident, dense. |
| Sub-headings (24 to 40px) | -0.005 to -0.01em | `letter-spacing: -0.01em` | Slight tightening. Clean. |
| Body text (14 to 18px) | 0 (default) | `letter-spacing: normal` | Natural reading. Do not interfere. |
| Small labels (11 to 13px) | 0.04 to 0.06em | `letter-spacing: 0.05em` | Slightly open. Reads as a label. |
| Uppercase labels | 0.06 to 0.12em | `letter-spacing: 0.08em` | Open, reads as a category tag. |

### CSS Implementation

```css
:root {
  --font-display: 'Canela', 'Georgia', serif;
  --font-body: 'Graphik', 'system-ui', sans-serif;
  --font-mono: 'Geist Mono', 'Menlo', monospace;

  --tracking-tight: -0.02em;
  --tracking-normal: normal;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.08em;
}

h1, h2, h3 { font-family: var(--font-display); letter-spacing: var(--tracking-tight); }
body { font-family: var(--font-body); letter-spacing: var(--tracking-normal); }
.label { font-family: var(--font-body); letter-spacing: var(--tracking-wider); text-transform: uppercase; }
code { font-family: var(--font-mono); }
```

### Tailwind v3 Config

```js
module.exports = {
  theme: {
    fontFamily: {
      display: ['Canela', 'Georgia', 'serif'],
      body: ['Graphik', 'system-ui', 'sans-serif'],
      mono: ['Geist Mono', 'Menlo', 'monospace'],
    },
  },
}
```

### Tailwind v4 Config

Tailwind v4 uses CSS-first configuration. Define tokens in your main CSS file.

```css
@import "tailwindcss";

@theme {
  --font-display: 'Canela', 'Georgia', serif;
  --font-body: 'Graphik', 'system-ui', sans-serif;
  --font-mono: 'Geist Mono', 'Menlo', monospace;

  --tracking-tight: -0.02em;
  --tracking-normal: normal;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.08em;
}
```

Use the tokens in markup: `<h1 class="font-display tracking-tight">`, `<p class="font-body">`, `<span class="font-body tracking-wider uppercase">`.

## Color Alternatives

### Palette Options (Not Lavender-Purple)

| Palette | Background | Surface | Text | Accent | Feel |
|---------|-----------|---------|------|--------|------|
| Earth | #F5E6C4 | #FFF8F0 | #2D2926 | #8B6914 | Warm, grounded |
| Coral | #F7F3F0 | #FFFFFF | #2C2825 | #E8836B | Refined, warm |
| Ink | #F5F0EB | #FFFFFF | #1C1917 | #C4493C | Editorial, classic |
| Forest | #F0F5F1 | #FFFFFF | #1A1A2E | #4A7C5C | Natural, trustworthy |
| Sunset | #1A1A2E | #252540 | #F5F5F5 | #FF6B35 | Energetic, bold |
| Cool | #FFFFFF | #F5F5F5 | #0A0A0A | #0066FF | Confident, technical |
| Cream | #FFF8F0 | #FFE8D6 | #2D2926 | #E85D4A | Friendly, human |
| Midnight | #0F1419 | #1A2332 | #E7E9EA | #1D9BF0 | Dark, professional |

### Dark Theme Done Right

| Aspect | Slop Default | Intentional |
|--------|-------------|-------------|
| Background | #000000 pure black | Tinted dark (e.g. oklch(12% 0.01 250)) |
| Surface | Same as background | Slightly lighter tinted surface |
| Body text | #888888, fails WCAG | #D4D4D8 or tinted, passes WCAG AA (4.5:1) |
| Muted text | #666666 | #A1A1AA, passes for large text (3:1) |
| Accent | Neon purple glow | Muted accent, no glow |
| Border | Transparent or dark gray | Slightly visible tinted border |

### CSS Color Tokens

```css
:root {
  --color-bg: #F5F0EB;
  --color-surface: #FFFFFF;
  --color-text: #1C1917;
  --color-text-muted: #78716C;
  --color-accent: #C4493C;
  --color-accent-hover: #A63A2F;
  --color-border: #E7E5E4;

  --color-bg-dark: #1C1917;
  --color-surface-dark: #292524;
  --color-text-dark: #E7E5E4;
  --color-text-muted-dark: #A8A29E;
  --color-accent-dark: #E85D4A;
  --color-border-dark: #44403C;
}
```

### Tailwind v4 Color Config

```css
@theme {
  --color-bg: #F5F0EB;
  --color-surface: #FFFFFF;
  --color-text: #1C1917;
  --color-text-muted: #78716C;
  --color-accent: #C4493C;
  --color-accent-hover: #A63A2F;
  --color-border: #E7E5E4;
}
```

## Layout Alternatives

### Instead of the Default Template

| Alternative | Structure | Best For |
|-------------|-----------|----------|
| Narrative flow | Problem, insight, solution, proof, CTA | Products solving a specific pain |
| Single-feature depth | Hero with demo, deep dive on one feature, social proof, CTA | Technical tools |
| Asymmetric hero | Left text plus right visual, alternating features, CTA | Landing pages |
| Comparison layout | Before and after or competitor comparison, feature grid, CTA | Competitive products |
| Social proof first | Hero with testimonial, features, more proof, CTA | Trust-dependent products |

### Instead of Identical Feature Card Grids

| Alternative | Description | CSS Approach |
|-------------|-------------|--------------|
| Bento grid | Varying card sizes (some span 2 columns). | CSS Grid with `grid-column: span 2` on featured items. |
| Featured plus list | One large featured item plus smaller items. | Flexbox with `flex: 2` on featured, `flex: 1` on others. |
| Side-by-side | Icon and text on the same line, not stacked. | Flexbox row with `align-items: center`. |
| Alternating sections | Feature sections alternate left-right with different treatments. | Odd and even section styling. |
| No cards | Spacing and typography group content. | Remove card wrappers. Use section spacing. |

### Instead of Colored Left-Border Cards

| Alternative | CSS |
|-------------|-----|
| No border | Remove `border-left`. Use spacing. |
| Thin top accent (1px) | `border-top: 1px solid var(--color-accent)` |
| Background tint | `background: color-mix(in srgb, var(--color-accent) 5%, white)` |
| Left padding plus vertical rule | `border-left: 1px solid var(--color-border); padding-left: 1rem` |
| Indentation | `margin-left: 1.5rem` creates visual hierarchy without border |

### Instead of Numbered Step Sequences

| Alternative | Description |
|-------------|-------------|
| Timeline | Vertical or horizontal line with connected events. |
| Narrative | Prose explanation of the process. |
| Accordion | Collapsible steps with progressive disclosure. |
| Embedded demo | Show the actual process (terminal, video). |

### Instead of the "Trusted by" Logo Strip

| Alternative | When |
|-------------|------|
| Three named case studies with logos and links | You have real customers willing to be named. |
| One pull quote from a named customer | You have one strong testimonial. |
| A metric with a source | You have a verifiable number ("Used by 4 of the top 10 Fortune 500 banks, source: SEC filings"). |
| Nothing | You do not have real customer evidence yet. Cut the section. |

### Instead of the FAQ Accordion

| Alternative | When |
|-------------|------|
| Inline answers in the body | The questions are common and the answers are short. |
| A dedicated help page | You have more than 5 questions. |
| A "Questions?" CTA to contact support | The questions are unique per customer. |

## Motion Alternatives

### Easing Reference

| Context | Easing | CSS `cubic-bezier()` | When |
|---------|--------|---------------------|------|
| Entrances | ease-out-quart | `(0.25, 1, 0.5, 1)` | Elements appearing on screen |
| Exits | ease-in-quart | `(0.5, 0, 0.25, 0)` | Elements disappearing |
| General smooth | ease-out-expo | `(0.16, 1, 0.3, 1)` | Most transitions |
| Gentle | ease-out | `ease-out` | Hover states, simple transitions |

### Orchestrated Entrance Pattern

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-in:nth-child(1) { animation-delay: 0ms; }
.animate-in:nth-child(2) { animation-delay: 80ms; }
.animate-in:nth-child(3) { animation-delay: 160ms; }
.animate-in:nth-child(4) { animation-delay: 240ms; }
```

### Motion Rules

1. **Transform and opacity only.** Never animate width, height, padding, margin.
2. **One orchestrated moment.** Page load or section reveal. Not constant motion.
3. **50 to 100ms stagger** between elements. Not uniform delay.
4. **300 to 600ms duration** for entrances. Not 2-second sagas.
5. **Stillness is fine.** Most of the page should not be moving.

## Content Alternatives

### Headline Rewrite Table

| Slop | Intentional | Why |
|------|-------------|-----|
| "Build the Future" | "Ship code 3x faster with AI pair programming" | Specific claim, specific mechanism |
| "Transform Your Workflow" | "Replace 5 tabs with 1 command palette" | Concrete before and after |
| "Empower Your Team" | "See who's blocked before the standup starts" | Specific scenario, specific outcome |
| "Innovate at Scale" | "Deploy to 12 regions in one click" | Concrete action, concrete scale |
| "Seamless Integration" | "Works inside VS Code, JetBrains, and Vim" | Specific list, no vague promise |
| "Next-Gen Platform" | "Runs on WebAssembly in your browser" | Specific technology, specific location |
| "AI-Powered Solutions" | "Detects anomalies in your logs within 30 seconds" | Specific capability, specific speed |
| "The Future of Work" | "Edit the same doc with 10 people without merge conflicts" | Concrete scenario |
| "Revolutionary Platform" | "Replaces 3 SaaS tools at half the cost" | Concrete comparison |

### Image Alternatives

| Instead of | Use |
|-----------|-----|
| AI-generated 3D blobs | Geometric pattern tied to brand palette |
| Stock-style diverse team at laptop | Real product screenshot with actual data |
| Abstract gradient backgrounds | Subtle CSS pattern or noise texture |
| AI illustrations (too smooth, symmetric) | Consistent hand-drawn or geometric illustration style |
| Hero images of people looking at screens | The product itself, annotated and explained |
