# Slop Buster

Three skills for killing AI slop. One repo. Pick your weapon.

| Skill | Patterns | Checks | Skills included | Usage |
|-------|----------|--------|-----------------|-------|
| **stop-slop-advanced** | ~25 | None | Design + text (single skill) | For quick checks |
| **stop-slop-pro** | 35 | 20 | Design + text (peer skills) | Perfect for after development/routine checks |
| **stop-slop-ultimate** | 50 | 35 | Design + text + ponytail | Useful while developing, good when tokens dont matter |

## Download

### Option A: GitHub Releases (recommended)

Go to the [Releases page](https://github.com/The-greg-guy/slop-buster/releases) and download the zip for the skill you want:

- `stop-slop-advanced-v1.0.0.zip`
- `stop-slop-pro-v1.0.0.zip`
- `stop-slop-ultimate-v1.0.0.zip`
- `slop-buster-all-v1.0.0.zip` (all three skills, no repo files)

### Option B: Direct folder download

Clone the repo and copy the skill folder you want:

```bash
git clone https://github.com/The-greg-guy/slop-buster.git
cp -r slop-buster/skills/stop-slop-ultimate ~/.claude/skills/
```

## Which one should I use?

- **Advanced.** A reference skill for AI consumption. Load it, let the AI read through the patterns, the AI applies the fixes on its own. No detection scripts. No ponytail. Not designed for human review.
- **Pro.** A working skill pack with detection. Two peer skills (design slop, text slop). 35 patterns. 20 weighted checks. Level 1 direct voice.
- **Ultimate.** The full fight. Three peer skills (design slop, text slop, ponytail). 50 patterns. 35 weighted checks. Level 2 direct voice. Adds ponytail for code shape. Adds Tailwind v4, vanilla-extract, Panda CSS, Figma sync tokens.

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

Run detection (Pro and Ultimate only):

```bash
# URL mode (requires Playwright)
node skills/stop-slop-ultimate/skills/design-slop/references/cli.mjs detect https://example.com

# Static file mode (no browser needed)
node skills/stop-slop-ultimate/skills/design-slop/references/cli.mjs detect-files ./src
```

## What each skill catches

### Design slop (all three versions)

Fonts: Inter as default, single font family, flat size hierarchy, monospace as shorthand, all-caps body, tight line height.

Color: lavender-purple, blue-to-purple gradients, gradient text, neon glows, pure black, aurora mesh backgrounds.

Layout: centered everything, badge above hero H1, copy-paste section templates, hero metric layout, monotonous spacing, colored left borders, identical feature cards, cards inside cards, wrapping everything in cards, massive icon containers, centered hero trio, trusted-by logo strips, modal abuse.

Sequence: numbered step sequences, stat banner rows, emoji nav icons, all-caps section headings, 3-tier pricing with "Most Popular" badge, FAQ accordion before footer, amputated mobile features.

Motion: bounce easing, glassmorphism, scroll-jacking, custom cursors, sparkle emoji badges, rocket emoji, infinite scroll.

Content: vague headlines, redundant UX writing, fake star testimonials, generic feature descriptions, "Trusted by 10,000+" with no linkable logos.

### Text slop (mainly Pro and Ultimate, partly integrated into advanced)

Phrases: throat-clearing openers, emphasis crutches, business jargon, adverbs, meta-commentary, performative emphasis, vague declaratives. Ultimate adds AI marketing clichés ("harness the power of", "unlock the potential", "at the intersection of", "dawn of a new era").

Structures: binary contrasts, negative listing, dramatic fragmentation, rhetorical setups, false agency, narrator-from-a-distance, passive voice, Wh- starters, rhythm patterns, listicle framing, problem-solution-solution-solution, "imagine a world" openers.

### Ponytail (Ultimate only)

Code shape: YAGNI, stdlib first, no unrequested abstractions, deletion over addition, boring over clever, fewest files possible.

## Attribution

- **stop-slop-advanced** — Original by Stop Slop contributors, building on research by Adrian Krebs and Paul Bakaus.
- **stop-slop-pro** and **stop-slop-ultimate** — Text slop adapted from [Hardik Pandya](https://hvpandya.com) under MIT. Ponytail adapted from [Dietrich Gebert](https://github.com/DietrichGebert/ponytail) under MIT-0, shipping as version 1.0.0 of the pack derivative. Design slop builds on research by Adrian Krebs and Paul Bakaus.

## License

MIT. See [LICENSE](LICENSE).
