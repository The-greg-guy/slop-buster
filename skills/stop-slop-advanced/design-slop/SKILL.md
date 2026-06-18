---
name: design-slop
version: 1.7.1
description: Identify and eliminate AI design slop. Fonts, colors, layout, motion, content. Loaded as a peer to text-slop within Stop Slop Advanced.
metadata:
  trigger: Building production websites, conducting design audits, generating UI with AI tools
  author: Stop Slop Advanced contributors
  parent_pack: stop-slop-advanced
  license: MIT
---

# Design Slop

Identify and eliminate AI design slop on surfaces. Fonts, colors, layout, motion, content.

Slop is what happens when an AI falls back on statistical averages. Inter as the default font. Lavender-purple as the default accent. Centered hero with a badge above the H1. Identical feature cards in a 3 by 2 grid. The output looks like every other AI-generated page. The fix is the same as in prose: cut the default, pick the specific.

## Persistence

Active every response until `stop slop` or `normal mode`. The pack persists. This skill persists with it.

## Core rules

1. **Pick deliberate typography.** No Inter, Roboto, Space Grotesk, Plus Jakarta Sans, Fraunces as defaults. Pair a display font with a body font. Create hierarchy through size contrast of 1.25x or more between steps. Vary letter-spacing by role. See [references/patterns.md](references/patterns.md).

2. **Choose colors with a point of view.** No lavender-purple. No blue-to-purple gradients. No gradient text. No neon glows. No pure black. No gray on color. Pick a palette that communicates something specific. Define it as tokens before generating. See [references/alternatives.md](references/alternatives.md).

3. **Break the centered-everything template.** Left-align body text. Use asymmetric layouts. Center only hero sections and CTAs.

4. **Kill the card soup.** No colored left or top borders. No cards inside cards. Not everything needs a bordered container. Spacing and alignment create visual grouping without card overhead. Flatten the hierarchy. See [references/patterns.md](references/patterns.md).

5. **Vary spacing with intention.** Tight groupings for related items. Generous separation between sections. Three distinct spacing values visible across the page. If every gap is 24px, the page has no rhythm. Define spacing as a scale.

6. **Use motion with purpose.** No bounce or elastic easing. No animation for decoration alone. One orchestrated entrance with staggered reveals beats scattered micro-interactions. Prioritize CSS-only solutions. Animate transform and opacity only.

7. **Design the content, not the container.** Specific headlines beat vague aspirations. One clear label beats label plus sublabel plus helper text all saying the same thing. Real photography beats AI-generated stock. Real metrics beat fabricated ones.

8. **Commit to one strong layout primitive.** Repeat it until it becomes the site's visual signature. Do not mix three card styles, two step sequences, four stat banners, and a sidebar with emojis. One primitive, executed well, outperforms seven different section templates.

9. **Establish a design system before generating.** Define tokens for color, typography, spacing, elevation, and motion before writing any component code. Feed the system to your AI tool as non-negotiable constraints. The system prevents slop. The AI implements within it. See `references/design-system.md` at the pack root.

10. **Run detection before shipping.** Automated slop scoring catches patterns your eye has become blind to. Run deterministic CSS and DOM checks against the pattern catalog. Score before every deploy. See [references/cli.mjs](references/cli.mjs).

## The ladder

Run the ladder top to bottom. Stop at the first broken rung. Fix it. Re-run.

1. **System.** Tokens defined before components.
2. **Type.** Two fonts. Size contrast. Letter-spacing variation.
3. **Color.** Distinctive palette. No purple defaults. No pure black.
4. **Layout.** Left-aligned body. One strong primitive. No card soup.
5. **Motion.** Ease-out. Transform and opacity only. One entrance.
6. **Content.** Specific headlines. Real metrics. Real photos.
7. **Detection.** Run the script. Score the page.

## Quick checks

Before shipping a page:

**Typography**
- [ ] Inter, Roboto, Space Grotesk, Plus Jakarta Sans, or Fraunces the only font? Replace it.
- [ ] Only one font family used? Pair a display font with a body font.
- [ ] Font sizes too close together? Ensure 1.25x ratio between steps.
- [ ] Monospace used for "technical" vibe? Pick a real typeface.
- [ ] Letter-spacing identical everywhere? Vary by role.
- [ ] Line height below 1.5x for body text? Increase to 1.5 or 1.7.

**Color**
- [ ] Any lavender-purple accents? Choose a distinctive palette.
- [ ] Any blue-to-purple gradients? Remove or make intentional.
- [ ] Gradient text on headings? Use solid colors.
- [ ] Dark mode with gray body text? Check WCAG AA contrast (4.5:1).
- [ ] Neon glows or colored box-shadows? Remove or make purposeful.
- [ ] Pure black (#000000) background? Tint toward brand hue.
- [ ] Gray text on colored backgrounds? Use darker shade or white.
- [ ] Every surface uses the same shadow? Vary depth by elevation level.

**Layout**
- [ ] Everything centered? Left-align body text.
- [ ] Badge above hero H1? Remove or restyle.
- [ ] Colored left or top border on any card? Remove.
- [ ] Identical feature cards in a grid? Vary sizes and formats.
- [ ] Cards nested inside cards? Flatten the hierarchy.
- [ ] Same spacing value everywhere? Introduce rhythm.
- [ ] Numbered step sequence (1, 2, 3)? Try a different structure.
- [ ] Stat banner with unverifiable metrics? Remove or verify.
- [ ] Sidebar or nav using emoji icons? Use a real icon library.
- [ ] All-caps headings for all sections? Reserve for short labels.
- [ ] Icon containers larger than their content? Reduce or remove.
- [ ] Line length above 80 characters? Add max-width 65 to 75ch.

**Motion**
- [ ] Bounce or elastic easing? Use ease-out instead.
- [ ] Glassmorphism without layering purpose? Use solid backgrounds.
- [ ] Animation for decoration only? Remove or repurpose.
- [ ] Animating width, height, padding, or margin? Use transform and opacity.

**Content**
- [ ] Vague headline ("Build the future")? State what the product does.
- [ ] Label plus sublabel plus helper text saying the same thing? Pick one.
- [ ] Fake testimonials? Remove until you have real ones.
- [ ] AI-generated stock imagery? Use real photos or nothing.
- [ ] Section label restates the heading? Make every word earn its place.

## Scoring

### Dimension score

Rate 1 to 10 on each dimension:

| Dimension | Weight | Question |
|-----------|--------|----------|
| Typography | 2x | Deliberate font choices with clear hierarchy? |
| Color | 2x | Distinctive palette, not AI default? |
| Layout | 1.5x | One strong primitive, varied spacing, asymmetric? |
| Motion | 1x | Purposeful, not decorative? Correct easing? |
| Content | 1.5x | Specific and honest, not vague filler? |
| System | 2x | Design tokens defined and consistently applied? |

Maximum weighted score: 100. Below 50: revise. Below 30: redesign.

### Pattern count score

Count how many patterns from [references/patterns.md](references/patterns.md) your page triggers:

| Count | Tier |
|-------|------|
| 0 to 2 | Clean |
| 3 to 5 | Mild slop |
| 6 to 8 | Heavy slop |
| 9 or more | Maximum slop. Full redesign needed. |

### Combined verdict

| Dimension score | Pattern count | Verdict |
|----------------|---------------|---------|
| 70 or more and 0 to 2 | Ship |
| 50 to 69 or 3 to 5 | Revise specific sections |
| Below 50 or 6 or more | Redesign before shipping |

## Output protocol

Every audit response follows this shape. No prose preamble.

```
Score: X/100 · Tier: clean|mild|heavy|maximum
Triggered: (pattern, location, fix) × N
Verdict: ship | revise | redesign
```

## Intensity integration

The pack-level `/slop lite|full|ultra` switch governs this skill.

- **lite.** Check five things: Inter as default font, lavender-purple accents, colored left borders, centered-everything, badge above hero. Report in one line.
- **full.** Run the full pattern catalog. Score every dimension. Propose fixes for each triggered pattern. Default.
- **ultra.** Everything in full. Plus: any section triggering 3 or more patterns is flagged for redesign, not patching. The skill says "redesign this section" and stops proposing fixes within it.


## Loading order

References load on demand.

1. `references/patterns.md` when checking surfaces.
2. `references/alternatives.md` when proposing fixes.
3. `references/cli.mjs` when scoring a live page.
4. `references/examples.md` when demonstrating before and after.
5. Pack-level `references/design-system.md` when establishing tokens.

## License

MIT. See pack-level `LICENSE`. The design-slop skill builds on research by Adrian Krebs (AI Design Checker) and Paul Bakaus (Impeccable), both released under permissive licenses.
