# Changelog

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
