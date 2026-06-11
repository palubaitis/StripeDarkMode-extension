# Changelog

All notable changes to Stripe Dark Mode are documented here.

## [1.0.0] — 2026-06-11
### Added
- Full dark theme for the entire Stripe Dashboard (`dashboard.stripe.com`,
  `connect.stripe.com`), applied at `document_start` to avoid a flash of white.
- Accent-preserving color transform (saturation-tuned `invert` + `hue-rotate`)
  that keeps Stripe's blurple, success greens, and error reds intact.
- Smart re-inversion of images, logos, avatars, and card-brand glyphs.
- Toolbar popup with on/off toggle and an intensity slider.
- `Alt+Shift+D` keyboard shortcut and toolbar badge.
- Settings persistence and sync via `chrome.storage.sync`.
- "Buy me a coffee" support button.
- Chrome Web Store submission pack: listing copy, privacy policy, permission
  justifications, screenshots, and promo tiles.
