# Changelog

## 1.7.1 — 2026-06-18

### Added

- **New skill: `stop-slop-lite`** — a stripped-down version of `stop-slop-basic` with the 35 most important patterns. No detection scripts. No peer skills. No ponytail. Use this when token budget is tight and you want the highest-signal subset of the catalog.
- **New patterns** (added to all skills): colored left/top border on blockquotes and code blocks (not just cards), useless sticky header with in-page anchor buttons only, tiny body text (below 12px) often paired with low-contrast muted color, footer meta-commentary (e.g. "This demo deliberately avoids the bone palette. Background #FFFFFF..."). The last one is self-referential — the demo site itself was shipping this exact pattern. Fixed in the same release.

### Removed

- **Carve-outs section removed** from all SKILL.md files. The carve-outs (defense-required exceptions for Inter as primary font, bone/cream background, italic hero word, dot/slash eyebrow label, stat banner, gradient encoding real data, numbered step sequence, glassmorphism, all-caps short label, passive voice, abstraction in code, three-item list in prose) were noise. The patterns are slop by default. If you need an exception, defend it in your own project's DESIGN.md. The skill shouldn't carry a built-in excuse list.

### Changed

- All skill versions bumped to 1.7.1.
- `stop-slop-lite` ships at 35 patterns, 0 detection checks, single skill (no peer skills, no ponytail). Same flat structure as `stop-slop-basic` — just a smaller pattern subset.

## 1.7.0 — 2026-06-18

### Renamed

- `stop-slop-advanced` → `stop-slop-basic` (was: brief, for quick AI review)
- `stop-slop-pro` → `stop-slop-advanced` (was: medium, with detection)
- `stop-slop-ultimate` → `stop-slop-professional` (was: detailed, with ponytail + model fingerprints)

The old `advanced`/`pro`/`ultimate` naming implied a quality ladder. The new `basic`/`advanced`/`professional` naming is clearer about what each level actually offers.

### Merged

Merged the best of two independent AI implementations of the slop-buster skill. The other AI's version had five post-2026 frontier-model patterns I didn't have; my version had the bone palette detection and model-specific fingerprints they didn't have. Combined the strongest of both.

#### Adopted from the other AI's version

- **Replaced `italic_word_accents` with `random_italic_hero_word`** — the other AI's check is strictly better. Requires 1-3 word italic span + 4+ word heading + abstract noun filter (trust, clarity, alignment, momentum, craft, signal, intelligence, velocity, resilience, future, commerce, workflows, confidence, idea, everything, power, seamless, effortless, elegant). My old check just flagged any `<em>` in a heading.
- **Added `decorative_unicode_formatting` check** — detects Mathematical Unicode letters (U+1D400–U+1D7FF) that render as 𝗯𝗼𝗹𝗱 or 𝘪𝘵𝘢𝘭𝘪𝘤, plus decorative arrows `→`, multiplication separators `×`, and repeated dot separators `·` in prose.
- **Added `editorial_eyebrow_separators` check** — detects `NEW · AI OPS · PRIVATE BETA` or `SYSTEM // DESIGN // OPS` above hero. Small all-caps text + dot/slash separators.
- **Added `premium_abstract_word_soup` check** — detects 4+ abstract prestige nouns (clarity, trust, momentum, alignment, signal, intelligence, infrastructure, orchestration, layer, fabric, protocol, velocity, resilience, seamless, adaptive, contextual) with no concrete product nouns (api, csv, invoice, ticket, repo, database, checkout, calendar, email, slack, github, figma, stripe, user, admin, file, workflow, dashboard, report).
- **Added `vague_bento_benefit_grid` check** — detects 4+ card-like siblings with vague benefit terms (Adaptive Intelligence, Seamless Integration, Actionable Insights, Real-time Orchestration, unlock, transform, optimize, accelerate, empower, drive outcomes, meaningful engagement).
- **Added "Add scar tissue" as text-slop rule 9** — real constraints, named workflows, failure modes, source context, tradeoffs. Modern slop is polished but unspecific.
- **Added new pattern categories**: premium-startup poster composition (cluster check: eyebrow + italic heading + 2 CTAs + mock dashboard + abstract nouns), specific-looking fake metrics (precise numbers with no source/timeframe), surface polish with no scar tissue (manual check: could this appear on 50 SaaS sites?), decorative bold/italic body emphasis (sister pattern to italic hero word), Unicode faux formatting.
- **Added better carve-outs**: "Italic hero word" defense ("The italic word changes meaning, voice, or contrast in a way layout alone cannot"), "Dot/slash eyebrow label" defense ("Every token is real metadata the user needs").
- **Added better Quick Checks items** in Basic: italic hero word, Unicode faux formatting, all-caps eyebrow separators, bento grid of vague benefits, abstract noun clusters.

#### Kept from my version (other AI had none of these)

- **`bone_cream_palette` check** — specific hex codes (#F4F1EA, #F4F3EE, #F6F5F2, #FAF8F2, #FAF7F2, #F0EBE3) with ±6 channel tolerance + warm-charcoal text (#191817-#37352F range) + terracotta/sage/dust-rose/amber accent. Detects the Opus 4.7/4.8 house style.
- **Model-Specific Fingerprints section** — 8-row table mapping fingerprints to models (Opus 4.5/4.6/4.7/4.8, GLM 4.5/4.6/4.7/5.x, DeepSeek V4, v0/Lovable/Bolt/Stitch/Claude Design) with per-model overrides.
- **Typography tells**: `serif_hero_display` (Fraunces/Instrument Serif/Playfair), `crushed_letter_spacing` (-0.03em on hero), `verb_first_hero_copy` (Build/Ship/Scale/Transform/Unlock), `centered_hero_dual_cta` (primary + "Talk to sales").
- **Color tells**: warm-charcoal text on cream failing WCAG AA, "bone + dark brown" dark mode, permanent dark mode with medium-grey body text (34% of Show HN pages per Krebs audit).
- **Layout tells**: Mac mockup as hero image, marquee logo carousel, animated count-up stats, inconsistent radii.
- **Content tells**: aphoristic-cadence headline ("Not X. *Y.*"), section eyebrows as italic-serif kicker labels, footer "Made with ♥ in [city]", pricing copy "/month billed annually" + "Save 20%", "Get Started"/"Try Free" CTAs with arrow icon.
- **Alternatives**: Bone Palette Escape Hatch (8-row table with concrete escape moves), DESIGN.md Template (Post-2026), Anthropic's Anti-Slop Fragment (Drop-In).
- **Examples**: 2026 Bone-Palette Editorial Slop Hero, "Bone + Dark Brown" Dark Mode, v0/Lovable/Bolt Default Teardown — all with model fingerprint callouts.

### Pattern counts

| Skill | v1.0.0 | v1.7.0 |
|-------|--------|--------|
| stop-slop-basic (was advanced) | ~25 | ~50 |
| stop-slop-advanced (was pro) | 35 | 65+ |
| stop-slop-professional (was ultimate) | 50 | 80+ |

### Detection check counts

| Skill | v1.0.0 | v1.7.0 |
|-------|--------|--------|
| stop-slop-basic | 0 | 0 (detection logic documented) |
| stop-slop-advanced | 20 | 28 |
| stop-slop-professional | 35 | 45 |

## 1.0.0 — 2026-06-17

### Added

- Initial release of the Slop Busters monorepo.
- Three skills combined into one repo:
  - **stop-slop-advanced** — The original reference skill. Single SKILL.md with 6 reference files. ~25 patterns. No detection scripts. Manual application.
  - **stop-slop-pro** — Two peer skills (design-slop, text-slop). 35 patterns. 20 weighted detection checks. Level 1 direct voice. Tailwind v3.
  - **stop-slop-ultimate** — Three peer skills (design-slop, text-slop, ponytail). 50 patterns. 35 weighted detection checks. Level 2 direct voice. Tailwind v3 and v4. Adds vanilla-extract, Panda CSS, Figma sync tokens. Ponytail 1.0.0 derivative of Dietrich Gebert's Ponytail 4.7.0.
- GitHub Releases workflow. Push a tag (`v1.0.0`) and the workflow builds four zips attached to the release: one per skill plus an all-in-one.
- CI workflow. Tests that detection modules load on Node 18 and 20.
- Slop self-check workflow. Runs detection on the repo's own files.
- Issue templates: bug report, pattern suggestion.
- Pull request template with text slop compliance checklist.
- `scripts/build-releases.sh` for local release zip building.
- `docs/comparison.md` with side-by-side feature comparison.

### Attribution

- Text slop adapted from [Hardik Pandya](https://hvpandya.com) under MIT.
- Ponytail adapted from [Dietrich Gebert](https://github.com/DietrichGebert/ponytail) under MIT-0.
- Design slop builds on research by [Adrian Krebs](https://github.com/AdrianKrebs/ai-design-checker) and [Paul Bakaus](https://impeccable.style).
