#!/bin/bash
# build-releases.sh
# Build zip files for GitHub Releases.
# Usage: ./build-releases.sh [version]
# If version is not provided, uses the git tag or "dev".

set -e

VERSION=${1:-$(git describe --tags --always 2>/dev/null || echo "dev")}
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RELEASES_DIR="$ROOT_DIR/releases"

echo "Building release zips for version: $VERSION"
echo "Root dir: $ROOT_DIR"
echo "Releases dir: $RELEASES_DIR"
echo ""

mkdir -p "$RELEASES_DIR"
cd "$ROOT_DIR"

# Build individual skill zips.
# Each zip contains the skill folder at the root, so it extracts cleanly.
for skill in skills/*/; do
  if [ -d "$skill" ]; then
    name=$(basename "$skill")
    zip_path="$RELEASES_DIR/${name}-${VERSION}.zip"
    echo "Building ${name}-${VERSION}.zip..."
    rm -f "$zip_path"
    # Zip from the skills/ directory so the skill folder is at the zip root.
    cd "$ROOT_DIR/skills"
    zip -r "$zip_path" "$name" -x "*/node_modules/*" "*/.git/*" "*/.DS_Store" > /dev/null
    cd "$ROOT_DIR"
    echo "  -> $(ls -lh "$zip_path" | awk '{print $5}')"
  fi
done

# Build all-in-one zip.
# Contains the three skills plus README, LICENSE, CHANGELOG, docs.
# Does NOT contain .github/, .gitignore, package.json, scripts/, CONTRIBUTING.md.
# Those are repo-management files. Get them via git clone.
all_zip="$RELEASES_DIR/slop-buster-all-${VERSION}.zip"
echo ""
echo "Building slop-buster-all-${VERSION}.zip..."
rm -f "$all_zip"
zip -r "$all_zip" \
  skills/ \
  README.md \
  LICENSE \
  CHANGELOG.md \
  docs/ \
  -x "*/node_modules/*" "*/.git/*" "*/.DS_Store" > /dev/null
echo "  -> $(ls -lh "$all_zip" | awk '{print $5}')"

echo ""
echo "=== Release zips built ==="
ls -lh "$RELEASES_DIR"/*.zip

echo ""
echo "Done."
echo "To create a GitHub release with these zips:"
echo "  gh release create $VERSION releases/*.zip --generate-notes --repo The-greg-guy/slop-buster"
