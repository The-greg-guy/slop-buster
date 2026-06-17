# Contributing to Slop Buster

Thanks for your interest in improving Slop Busters.

## How to contribute

### Reporting issues

Open an issue with:
- What you expected.
- What happened instead.
- The skill (advanced, pro, or ultimate) and the file or pattern involved.
- Steps to reproduce. For detection issues, include the URL or file.

### Suggesting patterns

If you see an AI slop pattern that is not in the catalog:

1. Check the relevant `patterns.md` to confirm it is missing:
   - `skills/stop-slop-advanced/references/patterns.md`
   - `skills/stop-slop-pro/skills/design-slop/references/patterns.md`
   - `skills/stop-slop-ultimate/skills/design-slop/references/patterns.md`
2. Open an issue with the pattern name, a description, a detection hint, and a fix.
3. If you can, add a check to the relevant `checks.mjs` and open a pull request. Pro and Ultimate only. Advanced has no detection scripts.

### Improving detection

The detection scripts live in:
- `skills/stop-slop-pro/skills/design-slop/references/`
- `skills/stop-slop-ultimate/skills/design-slop/references/`

There are two modes:
- `detection.mjs` uses Playwright to check live URLs.
- `detection-files.mjs` parses static HTML and CSS files.

Each check in `checks.mjs` handles both modes. When adding a check:

1. Add the check object to the `CHECKS` array in `checks.mjs`.
2. Implement `run(ctx)` for both URL and file modes.
3. Test with `node cli.mjs detect-files <test-file>`.
4. Verify the check does not false-positive on clean pages.
5. If the check belongs in both Pro and Ultimate, add it to both `checks.mjs` files.

### Text slop compliance

All prose in this repo must pass the text slop rules. Before submitting a pull request:

1. Check for em-dashes. Use commas or periods.
2. Check for adverbs. Cut them.
3. Check for three-item lists in prose. Use two items or one.
4. Check for throat-clearing openers. Cut to the point.
5. Check for binary contrasts. State the positive.
6. Check for Wh- sentence starters. Restructure.
7. Check for passive voice. Name the actor.

If you add prose that violates these rules, the maintainers will ask you to revise.

### Adding a new skill

If you want to add a fourth skill to the monorepo:

1. Create `skills/<your-skill-name>/` with at minimum a `SKILL.md`.
2. Add the skill to the comparison table in `README.md` and `docs/comparison.md`.
3. Add the skill to `scripts/build-releases.sh` so it gets a release zip.
4. Add the skill to the GitHub release workflow.
5. Update `CHANGELOG.md`.

### License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Development setup

```bash
git clone https://github.com/The-greg-guy/slop-buster.git
cd slop-buster

# For URL-based detection (optional, Pro and Ultimate only):
npm install playwright
npx playwright install chromium

# Test detection on a file:
node skills/stop-slop-ultimate/skills/design-slop/references/cli.mjs detect-files ./test-page.html

# List all checks:
node skills/stop-slop-ultimate/skills/design-slop/references/cli.mjs list

# Build release zips locally:
chmod +x scripts/build-releases.sh
./scripts/build-releases.sh v1.0.0-dev
ls releases/
```

## Release process

Releases are automated via GitHub Actions.

1. Update `CHANGELOG.md` with the new version and date.
2. Commit the changelog: `git commit -am "chore: bump to v1.0.1"`.
3. Tag the release: `git tag v1.0.1`.
4. Push: `git push origin main --tags`.
5. The release workflow builds four zips and creates a GitHub Release with them attached.
