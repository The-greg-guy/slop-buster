---
name: text-slop
version: 1.7.1
description: Eliminate predictable AI writing patterns from prose. Loaded as a peer to design-slop within Stop Slop Advanced.
metadata:
  trigger: Writing prose, editing drafts, reviewing content for AI patterns
  author: Adapted from Hardik Pandya (https://hvpandya.com) under MIT
  parent_pack: stop-slop-advanced
---

# Text Slop

Eliminate predictable AI writing patterns from prose.

AI text slop and AI design slop are the same disease. Statistical-average output. Predictable phrases. Formulaic structures. Metronomic rhythm. The reader can tell. The fix is the same in both cases: cut the default, pick the specific.

## Persistence

Active every response until `stop slop` or `normal mode`. The pack persists across turns. This skill persists with it.

## Core rules

1. **Cut filler phrases.** Remove throat-clearing openers, emphasis crutches, and all adverbs. See [references/phrases.md](references/phrases.md).

2. **Break formulaic structures.** Avoid binary contrasts, negative listings, dramatic fragmentation, rhetorical setups, false agency. See [references/structures.md](references/structures.md).

3. **Use active voice.** Every sentence needs a human subject doing something. No passive constructions. No inanimate objects performing human actions. Complaints do not "become" fixes. Decisions do not "emerge." A person does something to make those things happen.

4. **Be specific.** No vague declaratives. Name the specific thing. No lazy extremes. "Every" and "always" and "never" doing vague work get cut.

5. **Put the reader in the room.** No narrator-from-a-distance voice. "You" beats "People." Specifics beat abstractions.

6. **Vary rhythm.** Mix sentence lengths. Two items beat three. End paragraphs differently. No em-dashes. Use commas or periods.

7. **Trust readers.** State facts. Skip softening, justification, hand-holding.

8. **Cut quotables.** If it sounds like a pull-quote, rewrite it.

9. **Add scar tissue.** Modern slop is polished but unspecific. Add real constraints, named workflows, failure modes, source context, and tradeoffs. Say what failed, what didn't work, what the limit is. Polish without scar tissue reads as AI-generated.

## Quick checks

Before delivering prose:

- Adverbs present? Cut them.
- Passive voice? Find the actor, make them the subject.
- Inanimate thing doing a human verb? Name the person.
- Sentence starts with a Wh- word? Restructure.
- Any "here's what/this/that" throat-clearing? Cut to the point.
- Any "not X, it's Y" contrast? State Y.
- Three consecutive sentences match length? Break one.
- Paragraph ends with a punchy one-liner? Vary it.
- Em-dash present? Replace with a comma or period.
- Vague declarative? Name the specific thing.
- Narrator-from-a-distance? Put the reader in the scene.
- Meta-joiner ("The rest of this essay...")? Delete. Let the essay move.
- Random italic or bold abstract words? Remove the formatting or make the claim concrete.
- Abstract noun cluster (`clarity`, `trust`, `velocity`, `alignment`, `signal`)? Replace with mechanism.
- Specific-looking metric without source/timeframe/method? Verify or remove.
- Paragraph has no scar tissue? Add a real constraint, example, failure, tool, workflow, or tradeoff.

## Scoring

Rate 1 to 10 on each dimension.

| Dimension | Question |
|-----------|----------|
| Directness | Statements or announcements? |
| Rhythm | Varied or metronomic? |
| Trust | Respects reader intelligence? |
| Authenticity | Sounds human? |
| Density | Anything cuttable? |

Maximum score: 50. Below 35: revise. Below 20: rewrite.

## Output protocol

Every audit response follows this shape. No prose preamble.

```
Score: X/50 · Tier: clean|mild|heavy|maximum
Triggered: (offense, location, fix) × N
Verdict: ship | revise | rewrite
```

Tier buckets: 0 to 2 offenses clean. 3 to 5 mild. 6 to 8 heavy. 9 or more maximum.

## Intensity integration

The pack-level `/slop lite|full|ultra` switch governs this skill.

- **lite.** Check five things: adverbs, passive voice, throat-clearing, em-dashes, vague declaratives. Report in one line.
- **full.** Run the full quick-checks list. Score. Propose fixes. Default.
- **ultra.** Everything in full. Plus: any paragraph with 2 or more offenses is flagged for rewrite, not patching. The skill says "rewrite this paragraph" and stops proposing line-level fixes within it.


## Loading order

References load on demand.

1. `references/phrases.md` when checking for banned phrases.
2. `references/structures.md` when checking for structural patterns.
3. `references/examples.md` when demonstrating before and after.

## License

MIT. Adapted from Hardik Pandya's stop-slop skill (https://hvpandya.com), originally released under MIT. The adaptation preserves the original rules and reference catalogs while adding carve-outs, an output protocol, and pack integration. See pack-level `LICENSE` for full text.
