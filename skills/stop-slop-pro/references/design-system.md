# Design System for Slop Prevention

A design system prevents slop at the source. Define tokens, scales, and constraints before generating. The AI implements within boundaries rather than inventing its own. System before components.

## Why This Works

AI tools converge toward statistical averages. Without constraints, they produce the most common patterns from training data. A design system replaces the AI internal defaults with your explicit defaults. The AI can no longer fall back on Inter plus purple gradient plus centered hero because your tokens say otherwise.

## Token Structure

### Color Tokens

Define colors as CSS custom properties or Tailwind config. Every color has a purpose. No color exists without a name.

```css
:root {
  --color-bg: #F5F0EB;
  --color-surface: #FFFFFF;
  --color-surface-raised: #FFFFFF;

  --color-text: #1C1917;
  --color-text-secondary: #57534E;
  --color-text-muted: #A8A29E;

  --color-accent: #C4493C;
  --color-accent-hover: #A63A2F;
  --color-accent-subtle: rgba(196, 73, 60, 0.08);

  --color-border: #E7E5E4;
  --color-border-strong: #D6D3D1;

  --color-success: #3D8B5E;
  --color-warning: #B8860B;
  --color-error: #C4493C;
}
```

Rules:
- No purple in the palette unless it is a deliberate brand choice.
- No pure black (#000000) or pure white (#FFFFFF) on backgrounds. Tint everything.
- Define both light and dark theme tokens.
- Every token has a semantic name, not a color name (`--color-accent`, not `--color-red`).

### Typography Scale

Use a modular scale. Define a base size and a ratio.

```css
:root {
  --text-xs: 0.64rem;    /* ~10px, labels, caps */
  --text-sm: 0.8rem;     /* ~13px, small body, captions */
  --text-base: 1rem;     /* 16px, body text */
  --text-lg: 1.25rem;    /* 20px, large body, lead */
  --text-xl: 1.563rem;   /* ~25px, subheading */
  --text-2xl: 1.953rem;  /* ~31px, heading 3 */
  --text-3xl: 2.441rem;  /* ~39px, heading 2 */
  --text-4xl: 3.052rem;  /* ~49px, heading 1 */
  --text-5xl: 3.815rem;  /* ~61px, display */
}
```

Rules:
- Minimum 1.25x ratio between steps (1.333 or 1.5 also work).
- Body text: 16px minimum. 14px acceptable for secondary labels.
- Line height: 1.5 to 1.7 for body. 1.1 to 1.3 for large headings.
- Maximum width: 65 to 75ch for text containers.

### Font Stack

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
```

Rules:
- Two fonts minimum (display plus body). Three maximum (plus mono for code).
- No Inter, Roboto, Space Grotesk, Plus Jakarta Sans, or Fraunces unless deliberate and defensible.
- Letter-spacing varies by role: tight on headlines, normal on body, wide on labels.

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 5rem;     /* 80px */
  --space-16: 8rem;     /* 128px */
}
```

Rules:
- Tight spacing (4 to 12px) for related items within a group.
- Medium spacing (16 to 32px) for elements within a section.
- Generous spacing (48 to 128px) between sections.
- Three distinct spacing values visible on the page.
- Same spacing everywhere equals monotonous equals slop.

### Elevation Scale

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.10);
}
```

Rules:
- Every shadow serves a purpose. Higher elevation means higher importance.
- No glowing colored shadows.
- Shadows get darker and larger as elevation increases, not more colorful.
- Not everything needs a shadow. Flat is fine for most content.

### Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

Rules:
- Buttons, cards, inputs can each have different radii.
- Thick colored borders on rounded elements clash. Do not combine them.
- Sharp corners (0) are a valid choice. They make a statement.

### Motion Tokens

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  --ease-out: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Rules:
- No bounce. No elastic.
- Animate transform and opacity only.
- One orchestrated moment per page, not constant motion.

## Tailwind Configuration

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#FFFFFF', dark: '#292524' },
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
        },
      },
      fontFamily: {
        display: ['Canela', 'Georgia', 'serif'],
        body: ['Graphik', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs: ['0.64rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        sm: ['0.8rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.5' }],
        xl: ['1.563rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '2xl': ['1.953rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '3xl': ['2.441rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '4xl': ['3.052rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['3.815rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 2px 8px rgba(0, 0, 0, 0.06)',
        lg: '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
}
```

## shadcn/ui Customization

shadcn/ui is designed to be copy-pasted by AI agents, which means its defaults leak through on every generated site. To use shadcn without creating slop:

1. **Customize color tokens.** Never ship with the default gray palette. Tint toward your brand.
2. **Change border-radius values.** The default `0.5rem` (8px) everywhere is a tell. Vary by component.
3. **Modify shadow depths.** The default shadow is fine but identical everywhere. Vary by elevation.
4. **Pick non-default variants.** Do not use the first variant the AI generates. Choose deliberately.
5. **Override typography.** shadcn defaults to the system font stack. Apply your font tokens.

```css
:root {
  --background: 30 20% 96%;
  --foreground: 30 10% 10%;
  --primary: 4 60% 46%;
  --primary-foreground: 30 20% 96%;
  --muted: 30 10% 92%;
  --muted-foreground: 30 5% 45%;
  --border: 30 10% 88%;
  --radius: 0.375rem;
}
```

## Pre-Generation Checklist

Before generating any UI with AI:

1. **Colors defined?** Background, surface, text, accent, border. No purple unless intentional.
2. **Fonts selected?** Display plus body plus mono. No Inter or Roboto as default.
3. **Type scale defined?** Base size, ratio, line heights, letter spacing per role.
4. **Spacing scale defined?** Five values from tight to generous.
5. **One layout primitive chosen?** The repeating pattern (alternating sections, bento grid, narrative flow).
6. **Motion rules set?** Easing, duration, what gets animated, what stays still.
7. **Real content available?** Specific headlines, real metrics, actual product screenshots.

If any of these are missing, the AI fills the gap with defaults. That is how slop starts.

## Post-Generation Audit

After AI generates the UI:

1. **Check every pattern** in `skills/design-slop/references/patterns.md`.
2. **Verify tokens applied.** Are your tokens used, or did the AI invent new values?
3. **Check contrast.** Body text against its background. Run a quick WCAG check.
4. **Count spacing values.** Three or more distinct values visible? If everything is `p-6`, slop.
5. **Check card nesting.** Cards inside cards? Flatten them.
6. **Verify motion easing.** Bounce or elastic? Replace with ease-out.
7. **Read the copy aloud.** If any sentence could appear on 100 other websites, rewrite it.
