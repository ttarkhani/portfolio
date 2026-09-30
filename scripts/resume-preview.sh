#!/bin/sh
# Regenerates the phone-sized resume image from tahatarkhaniresume.pdf.
# Run from the repo root after updating the PDF: sh scripts/resume-preview.sh
# Needs macOS (Quick Look renders the PDF) and Node (npx fetches sharp-cli; not a site dependency).
set -e
tmp=$(mktemp -d)
qlmanage -t -s 1300 -o "$tmp" tahatarkhaniresume.pdf >/dev/null 2>&1
npx -y sharp-cli -i "$tmp/tahatarkhaniresume.pdf.png" -o assets/img/resume-page.webp -f webp -q 70 >/dev/null
rm -rf "$tmp"
ls -l assets/img/resume-page.webp
