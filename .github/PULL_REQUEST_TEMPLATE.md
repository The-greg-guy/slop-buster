## What this changes

## Which skill(s) does this affect?
- [ ] stop-slop-advanced
- [ ] stop-slop-pro
- [ ] stop-slop-ultimate
- [ ] Repo-level files (README, workflows, etc.)

## Why

## Text slop compliance checklist
- [ ] No em-dashes in new prose (use commas or periods)
- [ ] No adverbs in new prose
- [ ] No three-item lists in new prose (two items or one)
- [ ] No throat-clearing openers
- [ ] No binary contrasts
- [ ] No Wh- sentence starters in prose
- [ ] No passive voice in prose

## Detection checklist (if adding or modifying checks)
- [ ] Check handles both URL and file modes
- [ ] Check does not false-positive on clean pages
- [ ] Check weight is set (1, 2, or 3)
- [ ] Tested with `node cli.mjs detect-files <test-file>`
- [ ] If check belongs in both Pro and Ultimate, added to both `checks.mjs` files
