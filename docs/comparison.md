# Skill Comparison

Three skills for killing AI slop. Pick the one that matches how much fight you want.

## At a glance

| | Advanced | Pro | Ultimate |
|---|---|---|---|
| **What it is** | Reference skill for AI consumption | Working skill pack, two peer skills | Full fight, three peer skills |
| **Skills included** | 1 (single skill) | 2 (design-slop, text-slop) | 3 (design-slop, text-slop, ponytail) |
| **Pattern count** | ~25 | 35 | 50 |
| **Detection checks** | None | 20 weighted | 35 weighted |
| **Detection modes** | None | URL + static file | URL + static file |
| **Examples** | 8 design walkthroughs | 6 design + 6 text | 10 design + 8 text |
| **Voice** | Reference | Level 1 direct | Level 2 direct |
| **Tailwind** | v3 | v3 | v3 + v4 |
| **CSS-in-JS** | None | None | vanilla-extract, Panda CSS |
| **Figma sync** | None | None | W3C Design Tokens JSON |
| **Ponytail** | No | No | Yes (1.0.0 derivative) |
| **Carve-outs** | No | Yes | Yes, expanded |
| **Output protocol** | No | Yes | Yes |
| **Intensity switch** | No | Yes (`/slop lite|full|ultra`) | Yes |
| **Persistence** | No | Yes (until `stop slop`) | Yes |
| **File size (zipped)** | ~20KB | ~50KB | ~69KB |

## When to use which

### Advanced

A reference skill for AI consumption. Load it, let the AI read through the patterns, the AI applies the fixes on its own. No detection scripts. No ponytail. Not designed for human review.

Does not include text slop as a peer skill. Text slop is included as a reference file (`stop-slop.md`) but not integrated as a peer skill with its own SKILL.md.

### Pro

You want a working skill pack that catches slop in design and prose. Two peer skills load on demand. Detection scripts run against live URLs or static files. 35 patterns cover the most common AI tells. Level 1 direct voice states problems and fixes without added posture.

Good for: production websites, design audits, team quality standards, CI/CD integration.

### Ultimate

You want the full fight. Adds ponytail for code shape (YAGNI, stdlib first, no unrequested abstractions). 50 patterns catch everything Pro catches plus aurora backgrounds, trusted-by logo strips, scroll-jacking, custom cursors, sparkle badges, fake testimonials, 3-tier pricing with "Most Popular" badges, FAQ accordions before footers, amputated mobile features, and more. Level 2 direct voice adds posture: "If you reach for Inter without a reason, you have no point of view. Pick again."

Good for: AI-assisted development where you want the agent to refuse slop on every surface (code, design, prose) in one pack.

## Migration path

Advanced to Pro: Add the detection scripts. Add text slop as a peer skill. Restructure into pack format with SKILL.md as single entry point.

Pro to Ultimate: Add ponytail. Add 15 more patterns. Expand detection from 20 to 35 checks. Add Tailwind v4, vanilla-extract, Panda CSS, Figma sync. Sharpen voice to level 2.

## Detection coverage comparison

| Check | Advanced | Pro | Ultimate |
|-------|----------|-----|----------|
| Inter as default font | Manual | 3x weight | 3x weight |
| Single font family | Manual | 2x | 2x |
| Flat size hierarchy | Manual | 2x | 2x |
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
| **Total** | 0 | 20 | 35 |

## Text slop coverage comparison

| | Advanced | Pro | Ultimate |
|---|---|---|---|
| Throat-clearing openers | 15 listed | 15 listed | 18 listed |
| Emphasis crutches | 5 listed | 5 listed | 8 listed |
| Business jargon | 11 listed | 11 listed | 19 listed |
| AI marketing clichés | - | - | 12 listed |
| Adverbs | 15 listed | 15 listed | 23 listed |
| Meta-commentary | 11 listed | 11 listed | 15 listed |
| Binary contrasts | 11 listed | 11 listed | 12 listed |
| Listicle structures | - | - | 5 listed |
| Carve-outs | No | Yes | Yes, expanded |
| Output protocol | No | Yes | Yes |
| Intensity integration | No | Yes | Yes |

## Ponytail coverage (Ultimate only)

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
