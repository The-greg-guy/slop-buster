---
name: stop-slop-lite
version: 1.7.1
description: The 35 most important AI design slop patterns in a single reference skill. No detection scripts, no peer skills, no ponytail. Load it, let the AI read the patterns, the AI applies the fixes on its own. Use for quick AI review when token budget is tight.
metadata:
  trigger: Building production websites, conducting design audits, quick AI-assisted review
  author: Based on research by Adrian Krebs, Paul Bakaus (Impeccable), Anthropic, and the web design community
---

# Stop Slop (Lite)

The 35 most important AI-generated design slop patterns in a single reference skill. No detection scripts. No peer skills. No ponytail. Brief by design — load it, let the AI read through the patterns, the AI applies the fixes on its own. Use this when token budget is tight and you want the highest-signal subset of the catalog.

## Core Rules

1. **Pick deliberate typography.** No Inter, Roboto, Space Grotesk, Plus Jakarta Sans, or Fraunces as default. No Fraunces / Instrument Serif / Playfair as hero display. No italic word-accents in headings. No `letter-spacing: -0.04em` or tighter on oversized hero text. Pair a display font with a body font. Create hierarchy through size contrast (at least 1.25× ratio between steps). Vary letter-spacing by role. See [references/patterns.md](references/patterns.md).

2. **Choose colors with a point of view.** No lavender-purple. No blue-to-purple gradients. No default dark mode with gray text. No gradient text. No neon glows. No pure black. No gray on color. No bone/cream/ivory background (`#F4F1EA`, `#F4F3EE`, `#F6F5F2`, `#FAF8F2`) paired with warm-charcoal text (`#191817`–`#37352F`) and terracotta/sage accent — this is the Opus 4.7/4.8 house style and the 2026 replacement for VibeCode Purple. If you want cream, pick a different accent so the cream doesn't read as default Opus. Pick a palette that communicates something specific. Define it as tokens before generating. See [references/alternatives.md](references/alternatives.md).

3. **Break the centered-everything template.** Left-align body text. Use asymmetric layouts. Center only hero sections and CTAs. Not everything needs to be symmetrical to feel balanced.

4. **Kill the card soup.** No colored left or top borders on cards, blockquotes, or code blocks. No cards inside cards. Not everything needs a bordered container. Spacing and alignment create visual grouping without card overhead. Flatten the hierarchy. See [references/patterns.md](references/patterns.md).

5. **Vary spacing with intention.** Tight groupings for related items. Generous separation between sections. At least 3 distinct spacing values across the page. If every gap is 24px, the page has no rhythm. Define spacing as a scale.

6. **Use motion with purpose.** No bounce or elastic easing. No animation for decoration alone. One well-orchestrated entrance with staggered reveals creates more delight than scattered micro-interactions. Prioritize CSS-only solutions. Animate transform and opacity only.

7. **Design the content, not the container.** Specific headlines beat vague aspirations. One clear label beats label + sublabel + helper text all saying the same thing. Real photography beats AI-generated stock. Real metrics beat fabricated ones. The design should serve the message.

8. **Commit to one strong layout primitive.** Repeat it until it becomes the site's visual signature. Don't mix three card styles, two step sequences, four stat banners, and a sidebar with emojis. One primitive, well executed, outperforms seven different section templates.

9. **Establish a design system before generating.** Define tokens for color, typography, spacing, elevation, and motion before writing any component code. Feed the system to your AI tool as non-negotiable constraints. The system prevents slop; the AI implements within it. See [references/design-system.md](references/design-system.md).

10. **Don't ship meta-commentary.** No "Made with ♥ in [city]" footers. No "This demo deliberately avoids the bone palette" captions. No version strings in the footer. The footer is for real entity name, real license, real contact info. Cut anything that comments on the design itself.

## Quick Checks

Before shipping a page:

**Typography**
- [ ] Inter, Roboto, Space Grotesk, Plus Jakarta Sans, or Fraunces the only font? Replace it.
- [ ] Fraunces, Instrument Serif, or Playfair as hero display? Pick a less-loaded face.
- [ ] One random italic word in a hero headline? Remove unless it changes meaning.
- [ ] Unicode faux bold/italic or decorative arrows/dots? Replace with semantic text or cut.
- [ ] Hero `letter-spacing` below -0.03em? Loosen to -0.01 or -0.02em.
- [ ] Only one font family used? Pair a display font with a body font.
- [ ] Font sizes too close together? Ensure 1.25× ratio between steps.
- [ ] Line height below 1.5× for body text? Increase to 1.5–1.7.

**Color**
- [ ] Any lavender-purple accents? Choose a distinctive palette.
- [ ] Any blue-to-purple gradients? Remove or make intentional.
- [ ] Bone/cream/ivory background + warm-charcoal text + terracotta/sage accent? This is the Opus 4.7/4.8 house style. Pick a different accent or different background.
- [ ] "Bone + dark brown" dark mode? Replace with tinted near-black + pure off-white text.
- [ ] Gradient text on headings? Use solid colors.
- [ ] Dark mode with gray body text? Check WCAG AA contrast (4.5:1).
- [ ] Pure black (#000000) background? Tint toward brand hue.

**Layout**
- [ ] Everything centered? Left-align body text.
- [ ] Badge above hero H1? Remove or restyle.
- [ ] Colored left/top border on any card, blockquote, or code block? Remove.
- [ ] Identical feature cards in a grid? Vary sizes and formats.
- [ ] Cards nested inside cards? Flatten the hierarchy.
- [ ] Same spacing value everywhere? Introduce rhythm.
- [ ] Numbered step sequence (1-2-3)? Try a different structure.
- [ ] All-caps eyebrow with `·` or `//` separators? Keep only real metadata.
- [ ] Line length above 80 characters? Add max-width 65–75ch.

**Motion**
- [ ] Bounce or elastic easing? Use ease-out instead.
- [ ] Glassmorphism without layering purpose? Use solid backgrounds.

**Content**
- [ ] Vague headline ("Build the future")? State what the product does.
- [ ] Hero headline starts with a generic verb (Build/Ship/Scale/Transform/Unlock)? Replace with a specific claim.
- [ ] Bento grid full of vague benefits? Replace with jobs, examples, proof, or limits.
- [ ] Abstract nouns cluster (`trust`, `clarity`, `velocity`, `signal`)? Replace with operational detail.
- [ ] Specific-looking metrics with no source/timeframe/method? Verify or remove.
- [ ] Surface polish with no scar tissue? Add real constraints.
- [ ] Label + sublabel + helper text saying the same thing? Pick one.
- [ ] Footer "Made with ♥ in [city]" or version-string meta-commentary? Use real entity name. Cut the meta.

## Scoring

### Dimension Score

Rate 1–10 on each dimension:

| Dimension | Weight | Question |
|-----------|--------|----------|
| Typography | 2× | Deliberate font choices with clear hierarchy? |
| Color | 2× | Distinctive palette, not AI default? |
| Layout | 1.5× | One strong primitive, varied spacing, asymmetric? |
| Motion | 1× | Purposeful, not decorative? Correct easing? |
| Content | 1.5× | Specific and honest, not vague filler? |
| System | 2× | Design tokens defined and consistently applied? |

Maximum weighted score: 100. Below 50: revise. Below 30: redesign.

### Pattern Count Score

Count how many patterns from [references/patterns.md](references/patterns.md) your page triggers:

| Count | Tier |
|-------|------|
| 0–2 | Clean |
| 3–5 | Mild slop |
| 6–8 | Heavy slop |
| 9+ | Maximum slop — full redesign needed |

### Combined Verdict

| Dimension Score | Pattern Count | Verdict |
|----------------|---------------|---------|
| 70+ and 0–2 | Ship |
| 50–69 or 3–5 | Revise specific sections |
| Below 50 or 6+ | Redesign before shipping |

## Examples

See [references/examples.md](references/examples.md) for before/after design transformations and audit walkthroughs.

## Design System

See [references/design-system.md](references/design-system.md) for how to establish a design system that prevents slop at the source, including token structures, typography scales, spacing scales, color systems, and framework-specific guidance.

## Text Slop

AI design slop often comes paired with AI text slop. If you are fixing design patterns, also check the copy. See [references/stop-slop.md](references/stop-slop.md) for the full text slop elimination guide.

## License

MIT
