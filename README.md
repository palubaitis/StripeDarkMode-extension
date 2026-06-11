# Stripe Dark Mode

A clean, production-ready Chrome extension that gives the **Stripe Dashboard**
(`https://dashboard.stripe.com`) a traditional dark theme — soft near-black
surfaces with Stripe's signature blurple accents preserved, the same look you
get in the Stripe mobile app. Works across **every page** of the dashboard.

<p align="center"><img src="icons/icon128.png" width="96" alt="Stripe Dark Mode icon" /></p>

## Features

- 🌙 **Whole-dashboard dark theme** — every page, table, modal, and chart.
- 🎨 **Accent-preserving** — uses `hue-rotate` so purple stays purple and
  brand colors stay recognizable (not a flat black-and-white invert).
- 🖼️ **Smart media handling** — images, logos, avatars, and card-brand glyphs
  are re-inverted so they render naturally.
- 🎚️ **Intensity slider** — from soft/grey to deep contrast.
- ⌨️ **Keyboard shortcut** — `Alt+Shift+D` to toggle instantly.
- ⚡ **No flash of light** — applies at `document_start` from a local cache.
- 💾 **Settings sync** across your Chrome profile (`chrome.storage.sync`).
- ☕ **Buy Me a Coffee** button to support the project.

## How it works

Stripe's dashboard ships heavily obfuscated, frequently-changing class names,
so per-element CSS overrides would break on almost every Stripe deploy.
Instead the extension applies a tuned full-page filter to the document root:

```css
filter: invert(1) hue-rotate(180deg) brightness(...) contrast(...);
```

`invert(1)` flips light surfaces to dark and dark text to light, while
`hue-rotate(180deg)` rotates hues back to (approximately) their originals so
accents and charts keep their real colors. Media elements (`img`, `video`,
`canvas`, logos, …) get a second `invert(1) hue-rotate(180deg)` — a clean
involution that restores them to normal. The intensity slider drives the
`brightness`/`contrast` parameters via CSS custom properties.

This approach is resilient: it keeps working even when Stripe ships UI changes,
because it never depends on specific class names.

See [`src/darkmode.css`](src/darkmode.css) for the full, commented engine.

## Install (load unpacked)

1. Open `chrome://extensions` in Chrome (or any Chromium browser).
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this project folder.
4. Open <https://dashboard.stripe.com> — it's dark. 🎉

Use the toolbar icon for the toggle + intensity controls, or press
`Alt+Shift+D`.

## Project layout

```
manifest.json          Manifest V3 config
src/
  darkmode.css         Injected theming engine (the core)
  content.js           Applies/removes theme, anti-FOUC, live messaging
  background.js        Service worker: shortcut, badge, broadcast
popup/
  popup.html/.css/.js  Toolbar UI (toggle, intensity, donate)
icons/                 16 / 48 / 128 px PNG icons
store/                 Web Store assets + STORE_LISTING.md submission pack
package.sh             Builds the upload zip (dist/)
PRIVACY.md             Privacy policy (host publicly for submission)
CHANGELOG.md           Version history
LICENSE                MIT
```

## Configure the Buy Me a Coffee link

The donate button points at a placeholder. Edit the `href` in
[`popup/popup.html`](popup/popup.html):

```html
<a class="bmc" id="bmc" href="https://www.buymeacoffee.com/YOUR_USERNAME" ...>
```

Swap in your own Buy Me a Coffee / Ko-fi / PayPal / Stripe Payment Link URL.

## Publishing to the Chrome Web Store

This repo is submission-ready. Everything you need is prepared:

1. **Build the upload zip** (only runtime files, ~29 KB):
   ```sh
   ./package.sh        # -> dist/stripe-dark-mode-v1.0.0.zip
   ```
2. **Listing assets** are in [`store/`](store/):
   - `screenshot-1-dashboard.png`, `screenshot-2-hero.png` (1280×800)
   - `promo-small-440x280.png` (required tile), `promo-marquee-1400x560.png` (optional)
3. **Copy/paste pack** — all listing fields, the single-purpose statement,
   permission justifications, and the privacy/data-use answers are in
   [`store/STORE_LISTING.md`](store/STORE_LISTING.md).
4. **Privacy policy** — host [`PRIVACY.md`](PRIVACY.md) at a public URL and paste
   that URL into the dashboard's Privacy tab.
5. Upload the zip in the
   [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   (one-time $5 developer fee), fill in the fields, and submit.

Because the extension collects no data, makes no network requests, and uses
narrow permissions, review is typically quick.

## Privacy

This extension runs entirely locally. It does not collect, transmit, or store
any personal or dashboard data. Settings live in your own Chrome profile.
Permissions are scoped to `dashboard.stripe.com` and `connect.stripe.com` only.

## Disclaimer

Not affiliated with, endorsed by, or sponsored by Stripe, Inc. "Stripe" is a
trademark of Stripe, Inc. This is an independent, community-built theming tool.
