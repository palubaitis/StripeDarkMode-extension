#!/usr/bin/env bash
# Build the Chrome Web Store upload zip.
#
# Uses a clean staging directory so the zip can ONLY ever contain the runtime
# files, with manifest.json guaranteed at the root and no macOS junk
# (__MACOSX, .DS_Store, AppleDouble ._ files). This avoids the Web Store's
# "manifest.json must be at the root directory" rejection.
set -euo pipefail

cd "$(dirname "$0")"

NAME="stripe-dark-mode"
VERSION="$(node -p "require('./manifest.json').version" 2>/dev/null \
  || grep -m1 '"version"' manifest.json | sed -E 's/.*"version" *: *"([^"]+)".*/\1/')"
OUT="dist/${NAME}-v${VERSION}.zip"

# Files/dirs that ship inside the extension package.
RUNTIME=(manifest.json src popup icons)

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

# Copy runtime files into the staging root.
for item in "${RUNTIME[@]}"; do
  cp -R "$item" "$STAGE/"
done

# Scrub any stray macOS metadata from the staging copy.
find "$STAGE" -name '.DS_Store' -delete
find "$STAGE" -name '._*' -delete
dot_clean "$STAGE" 2>/dev/null || true

mkdir -p dist
rm -f "$OUT"
ABS_OUT="$PWD/$OUT"

# Zip from INSIDE the staging dir so paths are relative to root (no parent
# folder prefix). -X strips extra attributes; recurse picks up subdirs.
( cd "$STAGE" && zip -r -X "$ABS_OUT" . -x '*.DS_Store' '._*' >/dev/null )

echo "✓ Built $OUT"
echo
echo "Contents (manifest.json must be first / unprefixed):"
unzip -Z1 "$OUT" | sed 's/^/    /'
echo
if unzip -Z1 "$OUT" | grep -qx 'manifest.json'; then
  echo "✓ manifest.json is at the zip root — ready to upload."
else
  echo "✗ WARNING: manifest.json is NOT at the root. Do not upload." >&2
  exit 1
fi
echo
echo "Upload THIS file in the Chrome Web Store Developer Dashboard:"
echo "    $ABS_OUT"
echo "Do not re-zip it in Finder."
