# Programmatic Design Slop Detection

Deterministic detection catches patterns your eye has become blind to. This guide covers CSS/DOM checks for each pattern, scoring methodology, and CI/CD integration.

Based on the methodology from Adrian Krebs' AI Design Checker and Paul Bakaus' Impeccable tool.

## Approach

The key insight from existing research: **do not use an LLM to judge slop.** Letting an LLM grade AI slop introduces the exact bias you are trying to measure. Use deterministic CSS and DOM checks instead.

1. Load the page in a real browser (Playwright, Puppeteer, or similar).
2. Walk the DOM and read computed styles.
3. Each pattern is a deterministic check against CSS properties and DOM structure.
4. Score = patterns flagged / patterns total.
5. Manual QA suggests 5–10% false positive rate, which is acceptable for bucketing.

## Detection Checks

### Typography Checks

#### Overused Font Detection

```javascript
// Check: Is Inter used as the primary font?
function detectInter(ctx) {
  const bodyFont = ctx.getComputedStyle(ctx.document.body).fontFamily;
  return bodyFont.includes('Inter');
}

// Check: Is only one font family used?
function detectSingleFont(ctx) {
  const fonts = new Set();
  ctx.document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label')
    .forEach(el => {
      const ff = ctx.getComputedStyle(el).fontFamily;
      fonts.add(ff.split(',')[0].trim().replace(/['"]/g, ''));
    });
  return fonts.size <= 1;
}

// Check: Are font sizes too close together (flat hierarchy)?
function detectFlatHierarchy(ctx) {
  const sizes = new Set();
  ctx.document.querySelectorAll('h1, h2, h3, h4, p')
    .forEach(el => {
      const size = parseFloat(ctx.getComputedStyle(el).fontSize);
      sizes.add(Math.round(size));
    });
  const sorted = [...sizes].sort((a, b) => a - b);
  if (sorted.length < 2) return false;
  const ratios = sorted.slice(1).map((s, i) => s / sorted[i]);
  return ratios.every(r => r < 1.2); // All ratios below 1.2 = flat
}
```

### Color Checks

#### Vibe Purple Detection

```javascript
// Check: Is lavender-purple used as an accent color?
function detectVibePurple(ctx) {
  const elements = ctx.document.querySelectorAll('[class]');
  for (const el of elements) {
    const style = ctx.getComputedStyle(el);
    const color = style.color || style.backgroundColor || style.borderColor;
    if (!color || color === 'rgba(0, 0, 0, 0)') continue;
    
    // Parse RGB to HSL
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) continue;
    
    const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    
    // Purple range: H 250-290, S > 50%, L 40-80%
    if (h >= 250 && h <= 290 && s > 50 && l > 40 && l < 80) {
      return true;
    }
  }
  return false;
}
```

#### Gradient Text Detection

```javascript
// Check: Is gradient text used?
function detectGradientText(ctx) {
  const elements = ctx.document.querySelectorAll('h1, h2, h3, h4, span, p');
  for (const el of elements) {
    const style = ctx.getComputedStyle(el);
    const bg = style.backgroundImage;
    const clip = style.webkitBackgroundClip || style.backgroundClip;
    if (bg && bg.includes('gradient') && clip === 'text') {
      return true;
    }
  }
  return false;
}
```

#### Low Contrast Detection

```javascript
// Check: Does body text meet WCAG AA (4.5:1)?
function detectLowContrast(ctx) {
  const textElements = ctx.document.querySelectorAll('p, span, li, td, label');
  let failures = 0;
  
  for (const el of textElements) {
    const style = ctx.getComputedStyle(el);
    const textColor = parseColor(style.color);
    const bgColor = getEffectiveBackground(el, ctx);
    const ratio = contrastRatio(textColor, bgColor);
    
    if (ratio < 4.5) failures++;
  }
  
  return failures > textElements.length * 0.3; // Flag if >30% fail
}
```

#### Pure Black Background

```javascript
// Check: Pure #000000 background?
function detectPureBlack(ctx) {
  const bg = ctx.getComputedStyle(ctx.document.body).backgroundColor;
  return bg === 'rgb(0, 0, 0)';
}
```

### Layout Checks

#### Centered Everything

```javascript
// Check: Is >80% of text center-aligned?
function detectCenteredEverything(ctx) {
  const elements = ctx.document.querySelectorAll('h1, h2, h3, p, div');
  let centered = 0;
  
  for (const el of elements) {
    if (ctx.getComputedStyle(el).textAlign === 'center') centered++;
  }
  
  return centered / elements.length > 0.8;
}
```

#### Badge Above Hero

```javascript
// Check: Small pill/badge element immediately before the H1?
function detectBadgeAboveH1(ctx) {
  const h1 = ctx.document.querySelector('h1');
  if (!h1) return false;
  
  const prev = h1.previousElementSibling;
  if (!prev) return false;
  
  const style = ctx.getComputedStyle(prev);
  const isSmall = parseFloat(style.fontSize) < 14;
  const hasRadius = parseFloat(style.borderRadius) > 10;
  const isInline = style.display === 'inline-block' || style.display === 'inline-flex';
  
  return isSmall && (hasRadius || isInline);
}
```

#### Colored Left Border on Cards

```javascript
// Check: Thick colored left border on elements with border-radius?
function detectColoredLeftBorder(ctx) {
  const elements = ctx.document.querySelectorAll('[class]');
  
  for (const el of elements) {
    const style = ctx.getComputedStyle(el);
    const borderLeft = style.borderLeft;
    const radius = parseFloat(style.borderRadius);
    
    // Thick colored left border + rounded corners = AI tell
    if (borderLeft && radius > 4) {
      const width = parseFloat(style.borderLeftWidth);
      const color = style.borderLeftColor;
      const isColored = color !== 'rgba(0, 0, 0, 0)' &&
                        color !== style.backgroundColor &&
                        !color.startsWith('rgb(0, 0, 0)');
      
      if (width > 2 && isColored) return true;
    }
  }
  return false;
}
```

#### Identical Feature Cards

```javascript
// Check: 3+ sibling elements with identical dimensions and structure?
function detectIdenticalCards(ctx) {
  const parents = ctx.document.querySelectorAll('section, div, main');
  
  for (const parent of parents) {
    const children = [...parent.children].filter(c => c.tagName !== 'STYLE' && c.tagName !== 'SCRIPT');
    if (children.length < 3) continue;
    
    const widths = children.map(c => ctx.getComputedStyle(c).width);
    const heights = children.map(c => ctx.getComputedStyle(c).height);
    const paddings = children.map(c => ctx.getComputedStyle(c).padding);
    
    const allSameWidth = new Set(widths).size === 1;
    const allSamePadding = new Set(paddings).size === 1;
    const sameStructure = children.every(c => c.children.length === children[0].children.length);
    
    if (allSameWidth && allSamePadding && sameStructure) return true;
  }
  return false;
}
```

#### Monotonous Spacing

```javascript
// Check: Fewer than 3 distinct spacing values across sections?
function detectMonotonousSpacing(ctx) {
  const sections = ctx.document.querySelectorAll('section, header, footer, main > div');
  const spacings = new Set();
  
  sections.forEach(s => {
    const style = ctx.getComputedStyle(s);
    spacings.add(style.paddingTop);
    spacings.add(style.paddingBottom);
    spacings.add(style.marginTop);
    spacings.add(style.marginBottom);
  });
  
  return spacings.size < 3;
}
```

### Motion Checks

#### Bounce/Elastic Easing

```javascript
// Check: Bounce or elastic easing in CSS?
function detectBounceEasing(ctx) {
  const elements = ctx.document.querySelectorAll('*');
  
  for (const el of elements) {
    const style = ctx.getComputedStyle(el);
    const tf = style.transitionTimingFunction || style.animationTimingFunction;
    
    if (tf && (tf.includes('bounce') || tf.includes('elastic') ||
               tf.includes('cubic-bezier(0.68, -0.55, 0.265, 1.55)'))) {
      return true;
    }
  }
  return false;
}
```

#### Glassmorphism

```javascript
// Check: backdrop-filter blur used on multiple elements?
function detectGlassmorphism(ctx) {
  let blurCount = 0;
  
  ctx.document.querySelectorAll('*').forEach(el => {
    const style = ctx.getComputedStyle(el);
    if (style.backdropFilter && style.backdropFilter.includes('blur')) {
      blurCount++;
    }
  });
  
  return blurCount >= 3; // Blur on 3+ elements = decorative glassmorphism
}
```

## Scoring Methodology

### Simple Pattern Count

```javascript
function scoreSlop(checks) {
  const flagged = checks.filter(c => c.triggered).length;
  const total = checks.length;
  const score = Math.round(100 * flagged / total);
  
  let tier;
  if (flagged >= 9) tier = 'Maximum slop';
  else if (flagged >= 6) tier = 'Heavy slop';
  else if (flagged >= 3) tier = 'Mild slop';
  else tier = 'Clean';
  
  return { score, flagged, total, tier, triggered: checks.filter(c => c.triggered) };
}
```

### Weighted Score

Weight patterns by how reliably they indicate AI generation:

| Weight | Patterns |
|--------|----------|
| 3× (High confidence) | Colored left borders, vibe purple, Inter as only font, identical feature cards |
| 2× (Medium confidence) | Badge above H1, glassmorphism, gradient text, numbered steps, bounce easing |
| 1× (Lower confidence) | Centered text, stat banners, all-caps labels, emoji icons, monotonous spacing |

```javascript
function weightedScore(checks) {
  let weightedFlagged = 0;
  let weightedTotal = 0;
  
  for (const check of checks) {
    const weight = check.weight || 1;
    weightedTotal += weight;
    if (check.triggered) weightedFlagged += weight;
  }
  
  return Math.round(100 * weightedFlagged / weightedTotal);
}
```

## CI/CD Integration

### Playwright Test

```javascript
// slop-detect.spec.js
import { test, expect } from '@playwright/test';

test('design slop score', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const result = await page.evaluate(() => {
    const checks = [
      { id: 'inter_font', weight: 3, triggered: /* detectInter */ false },
      { id: 'vibe_purple', weight: 3, triggered: /* detectVibePurple */ false },
      { id: 'colored_border', weight: 3, triggered: /* detectColoredLeftBorder */ false },
      { id: 'identical_cards', weight: 3, triggered: /* detectIdenticalCards */ false },
      { id: 'gradient_text', weight: 2, triggered: /* detectGradientText */ false },
      // ... add all checks
    ];
    
    return {
      flagged: checks.filter(c => c.triggered).length,
      total: checks.length,
      weighted: /* weightedScore */ 0,
      triggered: checks.filter(c => c.triggered).map(c => c.id),
    };
  });
  
  // Fail CI if heavy slop detected
  expect(result.flagged).toBeLessThan(6);
  
  // Log details
  console.log('Slop Score:', result.weighted + '/100');
  console.log('Triggered:', result.triggered.join(', ') || 'None');
});
```

### GitHub Actions

```yaml
# .github/workflows/slop-check.yml
name: Design Slop Check
on: [push, pull_request]

jobs:
  slop-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install
      - run: npm run build
      - run: npx playwright test slop-detect
```

### Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit or via husky
# Quick check on HTML/CSS files for obvious patterns

FILES=$(git diff --cached --name-only -- '*.html' '*.css' '*.tsx' '*.jsx')

for FILE in $FILES; do
  # Check for vibe purple hex codes
  if grep -qE '#[789][0-9a-f]3[0-9a-f][0-9a-f]{2}' "$FILE" 2>/dev/null; then
    echo "⚠️  Possible vibe purple in $FILE"
  fi
  
  # Check for Inter font
  if grep -qE "font-family.*Inter" "$FILE" 2>/dev/null; then
    echo "⚠️  Inter font in $FILE — consider a deliberate alternative"
  fi
  
  # Check for backdrop-filter blur
  if grep -qE "backdrop-filter.*blur" "$FILE" 2>/dev/null; then
    echo "⚠️  Glassmorphism in $FILE — is it solving a real layering problem?"
  fi
done
```

## Existing Tools

- **[Impeccable](https://impeccable.style)** — Open-source design skill + detector. 37 patterns. Runs via `npx impeccable detect` on files, no browser required for 25 deterministic checks. Browser extension for live detection.
- **[AI Design Checker](https://github.com/AdrianKrebs/ai-design-checker)** — Adrian Krebs' tool. Scores URLs against 15 patterns using Playwright. `node check.js https://example.com`.
- **[Lighthouse](https://developer.chrome.com/docs/lighthouse)** — Not slop-specific, but catches accessibility issues (contrast, heading hierarchy) that often accompany slop.

## Integration Strategy

1. **During development:** Use the Impeccable CLI or browser extension to check as you build.
2. **Before code review:** Run the Playwright test suite. Fail CI on heavy slop.
3. **Before launch:** Manual audit against the full pattern catalog in [references/patterns.md](references/patterns.md).
4. **Ongoing:** Periodic batch scans of production pages. Slop can creep in as new pages are added.
