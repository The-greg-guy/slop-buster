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

| Display Font | Body Font | Use When |
|-------------|-----------|----------|
| Geist Sans | Geist Mono or Söhne | Technical products |
| Tiempos Headline | Tiempos Text | Editorial, content-heavy |
| Canela | Graphik | Premium, lifestyle |
| Untitled Sans | Untitled Serif | Balanced, modern |
| Haas Grotesk | Tiempos | Corporate, professional |
| Inktrap | AnyObject | Creative, bold |
| Forma | Forma Text | Startups, SaaS |

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

### Tailwind Config

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

### Bone Palette Escape Hatch (Post-2026)

The "Ink" and "Cream" rows above are deliberately warm-cream + warm-charcoal. They are NOT slop on their own — they become slop when paired with terracotta/sage/dust-rose accent, because that exact combination is the Opus 4.7/4.8 house style and the universal default for AI-generated "premium" sites as of 2026. To use a cream background without reading as default Opus:

| Move | Why it works |
|------|--------------|
| Pair cream with indigo accent (`#5266EB`) | Mercury DESIGN.md does exactly this. Indigo breaks the terracotta reflex. |
| Pair cream with orange accent (`#FF6719`) | Substack's brand. Warm but unmistakably not Opus default. |
| Pair cream with deep teal (`#0D7377`) | Cooler temperature than terracotta; reads as considered. |
| Pair cream with oxblood (`#7B1E1E`) | Editorial newspaper feel. Far from Opus house style. |
| Use cream + warm-charcoal + NO accent | Monochrome cream is harder to flag than cream + accent. |
| Tint the cream toward the brand hue | `oklch(96% 0.02 60)` is cream but the chroma pushes it away from default. |
| Pair cream with a non-Fraunces serif (Tiempos, Canela, Newsreader) | The Fraunces/Instrument Serif/Playfair hero is half the tell. |
| Don't use italic word-accents in hero copy | The other half of the tell. |

If you can't defend the choice in one sentence ("Mercury uses cream + indigo because it's a fintech that wants to feel warm but trustworthy, not editorial"), use a different palette.

### Hero Copy Alternatives (Not "Build / Ship / Scale")

| Instead of | Try |
|------------|-----|
| "Build the future of X" | State the specific outcome: "Your deploy pipeline runs in 12 seconds." |
| "Ship faster with X" | State the specific number: "Median PR review time: 4 minutes." |
| "Scale effortlessly" | State the specific capacity: "Handles 10k concurrent builds per region." |
| "Transform your workflow" | State the specific change: "Replaces your Jenkins + CircleCI + GitHub Actions setup." |
| "Unlock your potential" | Omit. The line is filler. |
| "Build *your* next *idea* with *confidence*" (italic word-accents) | Rewrite in roman: "Acme runs your CI on isolated runners. Free for the first 1,000 minutes." |
| "Not a feature. *A platform.*" (aphoristic) | State the platform's actual scope in one sentence. |

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

### Tailwind Color Config

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F0EB',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#0C0A09',
          accent: '#C4493C',
          'accent-hover': '#A63A2F',
        },
      },
    },
  },
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

### Image Alternatives

| Instead of | Use |
|-----------|-----|
| AI-generated 3D blobs | Geometric pattern tied to brand palette |
| Stock-style diverse team at laptop | Real product screenshot with actual data |
| Abstract gradient backgrounds | Subtle CSS pattern or noise texture |
| AI illustrations (too smooth, symmetric) | Consistent hand-drawn or geometric illustration style |
| Hero images of people looking at screens | The product itself, annotated and explained |
