# Skill Comparison

Four skills for killing AI slop. Pick the one that matches how much fight you want.

## At a glance

| | Lite | Basic | Advanced | Professional |
|---|---|---|---|---|
| **What it is** | Stripped-down basic | Reference skill for AI consumption | Working skill pack, two peer skills | Full fight, three peer skills |
| **Skills included** | 1 (single skill) | 1 (single skill) | 2 (design-slop, text-slop) | 3 (design-slop, text-slop, ponytail) |
| **Pattern count** | 35 | ~50 | 65+ | 80+ |
| **Detection checks** | None | None (detection logic documented) | 31 weighted | 48 weighted |
| **Detection modes** | None | None | URL + static file | URL + static file |
| **Examples** | 9 design walkthroughs | 9 design walkthroughs | 8 design + 6 text | 13 design + 8 text |
| **Voice** | Reference | Reference | Level 1 direct | Level 2 direct |
| **Tailwind** | v3 | v3 | v3 | v3 + v4 |
| **CSS-in-JS** | None | None | None | vanilla-extract, Panda CSS |
| **Figma sync** | None | None | None | W3C Design Tokens JSON |
| **Ponytail** | No | No | No | Yes (1.7.1 derivative) |
| **Output protocol** | No | No | Yes | Yes |
| **Intensity switch** | No | No | Yes (`/slop lite|full|ultra`) | Yes |
| **Persistence** | No | No | Yes (until `stop slop`) | Yes |
| **Model-Specific Fingerprints** | No | No | No | Yes (8-row table: Opus 4.5/4.6/4.7/4.8, GLM 4.x/5.x, DeepSeek V4, v0/Lovable/Bolt/Claude Design) |
| **Bone palette detection** | Documented | Documented | Yes (deterministic check) | Yes (deterministic check) |
| **Scar tissue rule (text-slop)** | Yes | Yes | Yes | Yes |
| **File size (zipped)** | ~15KB | ~25KB | ~60KB | ~85KB |

## When to use which

### Lite

35 most important patterns. No detection scripts. No peer skills. No ponytail. Stripped-down basic for tight token budgets. Use when you want the highest-signal subset of the catalog and don't need detection or model fingerprints.

### Basic

A reference skill for AI consumption. Load it, let the AI read through the patterns, the AI applies the fixes on its own. No detection scripts. No ponytail. Not designed for human review.

Does not include text slop as a peer skill. Text slop is included as a reference file (`stop-slop.md`) but not integrated as a peer skill with its own SKILL.md.

### Advanced

You want a working skill pack that catches slop in design and prose. Two peer skills load on demand. Detection scripts run against live URLs or static files. 65+ patterns cover the most common AI tells, including the post-Q1 2026 frontier-model patterns. Level 1 direct voice states problems and fixes without added posture.

Good for: production websites, design audits, team quality standards, CI/CD integration.

### Professional

You want the full fight. Adds ponytail for code shape (YAGNI, stdlib first, no unrequested abstractions). 80+ patterns catch everything Advanced catches plus aurora backgrounds, trusted-by logo strips, scroll-jacking, custom cursors, sparkle badges, fake testimonials, 3-tier pricing with "Most Popular" badges, FAQ accordions before footers, amputated mobile features, the full model-specific fingerprints section, and more. Level 2 direct voice adds posture: "If you reach for Inter without a reason, you have no point of view. Pick again."

Good for: AI-assisted development where you want the agent to refuse slop on every surface (code, design, prose) in one pack.

## Migration path

Basic to Advanced: Add the detection scripts. Add text slop as a peer skill. Restructure into pack format with SKILL.md as single entry point.

Advanced to Professional: Add ponytail. Add 15+ more patterns. Expand detection from 28 to 45 checks. Add Tailwind v4, vanilla-extract, Panda CSS, Figma sync. Sharpen voice to level 2. Add Model-Specific Fingerprints section mapping patterns to Opus 4.5/4.6/4.7/4.8, GLM 4.x/5.x, DeepSeek V4, v0/Lovable/Bolt/Claude Design.

## Post-2026 additions (Opus 4.7/4.8 house-style tells)

All three skills now include patterns for the post-Q1 2026 AI design slop that replaced VibeCode Purple. Anchored on the two patterns named verbatim in Anthropic's Opus 4.8 prompt guide:

1. **"Bone color" generation** — warm cream/off-white background (`#F4F1EA` family) + warm-charcoal text (`#191817`–`#37352F`) + terracotta/sage/dust-rose/amber accent. The 2026 replacement for the indigo→purple→pink gradient slop of 2023–2024. Identical across vet clinic, fintech, and crypto.

2. **"Random words in italics"** — `<em>` tags inside hero/subhead/feature copy, especially paired with Fraunces / Instrument Serif / Playfair. Verbal fry in typographic form. Anthropic's impeccable.style flags this as "Italic serif display headline" with 28-34% slop rate on editorial/food briefs.

Plus 25+ additional post-2026 tells across four categories:
- **Editorial Typography**: random italic hero word, decorative bold/italic body emphasis, Unicode faux formatting, Fraunces/Instrument Serif/Playfair hero display, tracking-tight oversized hero, section eyebrows as italic-serif kicker labels
- **Prestige Layout**: all-caps eyebrow with dots or slashes, premium-startup poster composition, bento grid of vague benefits, Mac mockup as hero image, centered hero with dual CTAs, marquee logo carousel, animated count-up stats, generic abstract geometric / aurora blobs, inconsistent radii
- **Semantic Hollowing**: premium abstract word soup, specific-looking fake metrics, surface polish with no scar tissue, generic verb-first hero copy, aphoristic-cadence headline, footer "Made with ♥ in [city]", pricing copy "/month billed annually" + "Save 20%", "Get Started"/"Try Free" CTAs with arrow icon
- **Bone Palette**: bone/cream/off-white background as default, warm-charcoal text on cream failing WCAG AA, "bone + dark brown" dark mode, permanent dark mode with medium-grey body text

Advanced adds 4 deterministic detection checks (bone_cream_palette, random_italic_hero_word, centered_hero_dual_cta, verb_first_hero_copy) plus 4 new from the merged version (decorative_unicode_formatting, editorial_eyebrow_separators, premium_abstract_word_soup, vague_bento_benefit_grid). Professional adds 4 more (crushed_letter_spacing, serif_hero_display) plus the Model-Specific Fingerprints section.

## Detection coverage comparison

| Check | Lite | Basic | Advanced | Professional |
|-------|------|-------|----------|--------------|
| Inter as default font | Manual | Manual | 3x weight | 3x weight |
| Single font family | Manual | Manual | 2x | 2x |
| Flat size hierarchy | Manual | Manual | 2x | 2x |
| Lavender-purple accents | Manual | 3x | 3x |
| Blue-to-purple gradient | Manual | 2x | 2x |
| Gradient text | Manual | 2x | 2x |
| Neon glow shadow | Manual | 2x | 2x |
| Pure black background | Manual | 1x | 1x |
| Centered everything | Manual | 1x | 1x |
| Badge above H1 | Manual | 2x | 2x |
| Colored left border cards | Manual | 3x | 3x |
| Identical feature cards | Manual | 3x | 3x |
| Monotonous spacing | Manual | 1x | 1x |
| Numbered step sequence | Manual | 1x | 1x |
| Emoji nav icons | Manual | 1x | 1x |
| Bounce easing | Manual | 2x | 2x |
| Glassmorphism everywhere | Manual | 2x | 2x |
| Aurora mesh background | - | - | 2x |
| Centered hero trio | - | - | 2x |
| Trusted by logo strip | - | - | 2x |
| Modal abuse | - | - | 1x |
| Pricing "Most Popular" badge | - | - | 2x |
| FAQ accordion before footer | - | - | 1x |
| Amputated mobile features | - | - | 2x |
| Scroll-jacking | - | - | 2x |
| Custom cursor | - | - | 2x |
| AI sparkle badge | - | - | 2x |
| Rocket emoji in hero | - | - | 1x |
| Trusted by unverifiable | - | - | 1x |
| Fake star testimonials | - | - | 2x |
| Vague headline | - | - | 2x |
| Redundant UX writing | - | - | 1x |
| Bone/cream palette (Opus 4.7/4.8) | - | 3x | 3x |
| Random italic hero word (Opus 4.8) | - | 2x | 2x |
| Decorative Unicode formatting | - | 1x | 1x |
| Editorial eyebrow separators | - | 2x | 2x |
| Premium abstract word soup | - | 2x | 2x |
| Vague bento benefit grid | - | 2x | 2x |
| Crushed letter-spacing on hero | - | - | 1x |
| Fraunces/Instrument Serif/Playfair hero | - | - | 2x |
| Centered hero with dual CTAs | - | 1x | 1x |
| Verb-first hero copy | - | 1x | 1x |
| Useless sticky header (in-page anchors only) | - | 2x | 2x |
| Footer meta-commentary (version strings, "deliberately avoids") | - | 1x | 1x |
| Colored border on blockquotes/code blocks | - | 1x | 1x |
| **Total** | 0 | 0 | 31 | 48 |

## Text slop coverage comparison

| | Basic | Advanced | Professional |
|---|---|---|---|
| Throat-clearing openers | 15 listed | 15 listed | 18 listed |
| Emphasis crutches | 5 listed | 5 listed | 8 listed |
| Business jargon | 11 listed | 11 listed | 19 listed |
| AI marketing clichés | - | - | 12 listed |
| Adverbs | 15 listed | 15 listed | 23 listed |
| Meta-commentary | 11 listed | 11 listed | 15 listed |
| Binary contrasts | 11 listed | 11 listed | 12 listed |
| Listicle structures | - | - | 5 listed |
| Add scar tissue (rule 9) | Yes | Yes | Yes |
| Carve-outs | No | Yes | Yes, expanded |
| Output protocol | No | Yes | Yes |
| Intensity integration | No | Yes | Yes |

## Ponytail coverage (Professional only)

| Feature | Included |
|---------|----------|
| Ladder (YAGNI, stdlib, native, existing dep, one line, minimum) | Yes |
| Rules (no abstraction, no boilerplate, deletion over addition) | Yes |
| Intensity (lite, full, ultra) | Yes |
| Carve-outs | Yes |
| When NOT to be lazy | Yes |
| Worked example with stop-slop | Yes |
| Cross-reference to stop-slop | Yes |
| Pack integration | Yes |
