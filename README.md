# Slop Buster

Four skills for killing AI slop. One repo. Pick your weapon.

| Skill | Patterns | Checks | Skills included | Usage |
|-------|----------|--------|-----------------|-------|
| **stop-slop-lite** | 35 | None | Design + text (single skill) | Stripped-down basic. Use when token budget is tight. |
| **stop-slop-basic** | ~50 | None (detection logic documented) | Design + text (single skill) | For quick AI review |
| **stop-slop-advanced** | 65+ | 31 | Design + text (peer skills) | Perfect for after development / routine checks |
| **stop-slop-professional** | 80+ | 48 | Design + text + ponytail | Useful while developing, good when tokens don't matter |

## What's new in v1.7.1 (June 2026)

- **New skill: `stop-slop-lite`** — 35 most important patterns, no detection scripts, single skill. Stripped-down basic for tight token budgets.
- **Carve-outs section removed** from all SKILL.md files. The patterns are slop by default. If you need an exception, defend it in your project's DESIGN.md.
- **New patterns** (self-referential — the demo site itself was caught shipping these): colored left border on blockquotes/code blocks (not just cards), useless sticky header with only in-page anchor buttons, tiny body text below 12px, footer meta-commentary (version strings, "deliberately avoids" captions). All fixed in the demo.
- **3 new detection checks** added to Advanced and Professional: `useless_sticky_header`, `footer_meta_commentary`, `colored_border_on_blockquotes_codeblocks`.

## What's new in v1.7.0 (June 2026)

**Renamed skill levels.** The old `advanced`/`pro`/`ultimate` naming is now `basic`/`advanced`/`professional` — clearer about what each level actually offers.

**Merged with another AI's version.** Took the best of both implementations:

- Adopted the more precise `random_italic_hero_word` check (replaces the looser `italic_word_accents` — now requires 1-3 word italic span + 4+ word heading + abstract noun filter)
- Added 4 new post-2026 checks from the other AI: `decorative_unicode_formatting` (Mathematical Unicode U+1D400–U+1D7FF, `→`/`×`/`·` separators), `editorial_eyebrow_separators` (`NEW · AI OPS · PRIVATE BETA`), `premium_abstract_word_soup` (4+ abstract nouns with no concrete product nouns), `vague_bento_benefit_grid` (4+ cards with vague benefit terms)
- Added "Add scar tissue" as text-slop rule 9: real constraints, named workflows, failure modes, source context, tradeoffs
- Added new pattern categories: premium-startup poster composition, specific-looking fake metrics, surface polish with no scar tissue, decorative bold/italic body emphasis, Unicode faux formatting
- Added better carve-outs: "Italic hero word" defense ("changes meaning, voice, or contrast in a way layout alone cannot"), "Dot/slash eyebrow label" defense ("Every token is real metadata the user needs")
- Kept my bone palette detection (other AI had none) — `bone_cream_palette` check with specific hex codes (#F4F1EA, #F4F3EE, #F6F5F2, #FAF8F2, #FAF7F2, #F0EBE3) with ±6 channel tolerance + warm-charcoal text + terracotta/sage/dust-rose/amber accent
- Kept my Model-Specific Fingerprints section (other AI had none) — 8-row table mapping fingerprints to Opus 4.5/4.6/4.7/4.8, GLM 4.x/5.x, DeepSeek V4, v0/Lovable/Bolt/Stitch/Claude Design

**Post-Q1 2026 anchor patterns** (named verbatim in Anthropic's Opus 4.8 prompt guide):

1. **"Bone color" generation** — warm cream/off-white background (`#F4F1EA` family) + warm-charcoal text + terracotta/sage/dust-rose/amber accent. The 2026 default for AI-generated "premium" sites. Identical across vet clinic, fintech, and crypto.
2. **"Random words in italics"** — `<em>` tags inside hero/subhead/feature copy, especially paired with Fraunces / Instrument Serif / Playfair. Verbal fry in typographic form.

Plus 25+ additional post-2026 tells across Editorial Typography, Prestige Layout, Semantic Hollowing, and Bone Palette categories.

## Download

### Option A: GitHub Releases (recommended)

Go to the [Releases page](https://github.com/The-greg-guy/slop-buster/releases) and download the zip for the skill you want:

- `stop-slop-lite-v1.7.1.zip`
- `stop-slop-basic-v1.7.1.zip`
- `stop-slop-advanced-v1.7.1.zip`
- `stop-slop-professional-v1.7.1.zip`
- `slop-buster-all-v1.7.1.zip` (all four skills, no repo files)

### Option B: Direct folder download

Clone the repo and copy the skill folder you want:

```bash
git clone https://github.com/The-greg-guy/slop-buster.git
cp -r slop-buster/skills/stop-slop-professional ~/.claude/skills/
```

## Which one should I use?

- **Lite.** 35 most important patterns. No detection scripts. No peer skills. No ponytail. Use when token budget is tight and you want the highest-signal subset.
- **Basic.** A reference skill for AI consumption. ~50 patterns. Load it, let the AI read through the patterns, the AI applies the fixes on its own. No detection scripts. No ponytail. Not designed for human review.
- **Advanced.** A working skill pack with detection. Two peer skills (design slop, text slop). 65+ patterns. 31 weighted checks. Level 1 direct voice.
- **Professional.** The full fight. Three peer skills (design slop, text slop, ponytail). 80+ patterns. 48 weighted checks. Level 2 direct voice. Adds ponytail for code shape. Adds Tailwind v4, vanilla-extract, Panda CSS, Figma sync tokens. Adds Model-Specific Fingerprints section mapping patterns to Opus 4.5/4.6/4.7/4.8, GLM 4.x/5.x, DeepSeek V4, v0/Lovable/Bolt/Claude Design.

  For a more detailed comparison, please visit [the comparison page.](/docs/comparison.md)

## Install

Copy the skill folder into your skills directory:

**Claude Code:** `~/.claude/skills/` or `.claude/skills/` in your project.

**Claude Projects:** Upload `SKILL.md` and reference files to project knowledge.

**Custom instructions:** Copy core rules from `SKILL.md`.

**API calls:** Include `SKILL.md` in your system prompt. Reference files load on demand.

## Usage

Tell your agent: "Stop slop on this page." The pack activates and persists until you say `stop slop` or `normal mode`.

Switch intensity with `/slop lite`, `/slop full`, or `/slop ultra`. Default is full.

Run detection (Advanced and Professional only):

```bash
# URL mode (requires Playwright)
node skills/stop-slop-professional/skills/design-slop/references/cli.mjs detect https://example.com

# Static file mode (no browser needed)
node skills/stop-slop-professional/skills/design-slop/references/cli.mjs detect-files ./src
```

## What each skill catches

### Design slop (all three versions)

Fonts: Inter as default, single font family, flat size hierarchy, monospace as shorthand, all-caps body, tight line height, Fraunces/Instrument Serif/Playfair as hero display, italic word-accents in headings, tracking-tight oversized hero, section eyebrows as italic-serif kicker labels.

Color: lavender-purple, blue-to-purple gradients, gradient text, neon glows, pure black, aurora mesh backgrounds, bone/cream palette (Opus 4.7/4.8 house style), "bone + dark brown" dark mode, warm-charcoal text on cream failing WCAG AA, permanent dark mode with medium-grey body text, Tailwind-default indigo + slate + gray.

Layout: centered everything, badge above hero H1, copy-paste section templates, hero metric layout, monotonous spacing, colored left borders, identical feature cards, cards inside cards, wrapping everything in cards, massive icon containers, centered hero trio, trusted-by logo strips, modal abuse, Mac mockup as hero image, marquee logo carousel, animated count-up stats, centered hero with dual CTAs, generic abstract geometric / aurora blobs, inconsistent radii, all-caps eyebrow with dots or slashes, premium-startup poster composition, bento grid of vague benefits.

Sequence: numbered step sequences, stat banner rows, emoji nav icons, all-caps section headings, 3-tier pricing with "Most Popular" badge, FAQ accordion before footer, amputated mobile features.

Motion: bounce easing, glassmorphism, scroll-jacking, custom cursors, sparkle emoji badges, rocket emoji, infinite scroll.

Content: vague headlines, redundant UX writing, fake star testimonials, generic feature descriptions, "Trusted by 10,000+" with no linkable logos, generic verb-first hero copy ("Build/Ship/Scale/Transform/Unlock"), aphoristic-cadence headline ("Not X. *Y.*"), footer "Made with ♥ in [city]", pricing copy "/month billed annually" + "Save 20%", "Get Started"/"Try Free" CTAs with arrow icon, premium abstract word soup, specific-looking fake metrics, surface polish with no scar tissue, Unicode faux formatting, decorative bold/italic body emphasis.

### Text slop (mainly Advanced and Professional, partly integrated into basic)

Phrases: throat-clearing openers, emphasis crutches, business jargon, adverbs, meta-commentary, performative emphasis, vague declaratives. Professional adds AI marketing clichés ("harness the power of", "unlock the potential", "at the intersection of", "dawn of a new era").

Structures: binary contrasts, negative listing, dramatic fragmentation, rhetorical setups, false agency, narrator-from-a-distance, passive voice, Wh- starters, rhythm patterns, listicle framing, problem-solution-solution-solution, "imagine a world" openers.

Rule 9 (new in v1.7.0): Add scar tissue. Real constraints, named workflows, failure modes, source context, tradeoffs.

### Ponytail (Professional only)

Code shape: YAGNI, stdlib first, no unrequested abstractions, deletion over addition, boring over clever, fewest files possible.

## Attribution

- **stop-slop-basic** — Original by Stop Slop contributors, building on research by Adrian Krebs and Paul Bakaus.
- **stop-slop-advanced** and **stop-slop-professional** — Text slop adapted from [Hardik Pandya](https://hvpandya.com) under MIT. Ponytail adapted from [Dietrich Gebert](https://github.com/DietrichGebert/ponytail) under MIT-0, shipping as version 1.7.0 of the pack derivative. Design slop builds on research by Adrian Krebs and Paul Bakaus.

## License

MIT. See [LICENSE](LICENSE).
