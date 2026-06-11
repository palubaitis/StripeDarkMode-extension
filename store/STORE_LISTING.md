# Chrome Web Store — Submission Pack

Everything you need to paste into the
[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
when you create the listing. Fields below are grouped by the tab they appear on.

> One-time setup: a Chrome Web Store developer account costs a **$5 USD**
> one-time registration fee and requires a verified contact email.

---

## ✅ Pre-submission checklist

- [x] Manifest V3, valid `manifest.json`
- [x] Icons: 16 / 48 / 128 px PNG (128 is the store icon)
- [x] Three 1280×800 screenshots, 24-bit PNG, no alpha (`store/screenshot-1.png`, `-2.png`, `-3.png`)
- [x] Small promo tile 440×280 (`store/promo-small-440x280.png`)
- [x] Marquee promo tile 1400×560 — optional (`store/promo-marquee-1400x560.png`)
- [x] Privacy policy LIVE at https://telegra.ph/Stripe-Dark-Mode---Privacy-Policy-06-11
- [x] Single purpose description (below)
- [x] Permission justifications (below)
- [x] Data-use disclosures (below)
- [x] Buy Me a Coffee URL set in `popup/popup.html` (`buymeacoffee.com/palubaitis`)
- [ ] Build the upload zip: run `./package.sh`

---

## Store listing tab

**Item name** (max 75 chars)
```
Stripe Dark Mode
```

**Summary** (max 132 chars, single line)
```
A clean, traditional dark theme for the entire Stripe Dashboard. Accent-preserving, with intensity control and a one-click toggle.
```

**Category**
```
Productivity   (alternative: Developer Tools)
```

**Language**
```
English
```

**Detailed description** (max 16,000 chars)
```
Give the Stripe Dashboard the dark mode it deserves.

Stripe Dark Mode applies a clean, traditional dark theme across the ENTIRE
dashboard — every page, table, modal, report and chart — the same easy-on-the-
eyes look you get in the Stripe mobile app. It preserves Stripe's signature
"blurple" accents and brand colors instead of washing everything out, so the UI
stays familiar and readable.

✦ FEATURES
• Whole-dashboard theme — works on every Stripe Dashboard page, not just the home screen.
• Accent-preserving — purple stays purple; success greens and error reds stay meaningful.
• Smart media handling — logos, avatars, screenshots and card-brand icons render naturally.
• Intensity slider — from a soft, low-contrast dark to a deep, high-contrast dark.
• One-click toggle — flip it from the toolbar or with the Alt+Shift+D shortcut.
• No flash of white — the theme applies the instant the page starts loading.
• Settings sync across your Chrome profile.
• Support the project with the built-in "Buy me a coffee" button.

✦ PRIVACY FIRST
Stripe Dark Mode collects NO data and makes NO network requests. It only injects
a stylesheet on Stripe Dashboard pages. Your settings stay in your own browser.
See the privacy policy for full details.

✦ HOW IT WORKS
Stripe's dashboard uses heavily obfuscated, frequently-changing class names, so
fragile per-element overrides would break on every Stripe update. Instead, the
extension applies a tuned color transform to the whole page and intelligently
restores images and media — a robust approach that keeps working through Stripe
UI changes.

Not affiliated with, endorsed by, or sponsored by Stripe, Inc. "Stripe" is a
trademark of Stripe, Inc.
```

**Screenshots** (1280×800, 24-bit PNG, no alpha — upload in this order)
1. `store/screenshot-1.png` — dark mode ON, popup open (home)
2. `store/screenshot-2.png` — dark mode ON (second view)
3. `store/screenshot-3.png` — toggle OFF / light mode (the "before")

**Promo tiles**
- Small (required): `store/promo-small-440x280.png`
- Marquee (optional): `store/promo-marquee-1400x560.png`

**Homepage / support URL**
```
https://buymeacoffee.com/palubaitis
```

---

## Privacy practices tab

**Single purpose** (required)
```
Stripe Dark Mode has one purpose: to apply a dark visual theme to the Stripe
Dashboard (dashboard.stripe.com and connect.stripe.com) so it is easier to read
in low-light conditions.
```

**Permission justifications**

- `storage`
  ```
  Used to save the user's preferences — the on/off toggle and the dark-theme
  intensity level — so they persist between sessions and sync across the user's
  Chrome profile. No browsing data is stored.
  ```
- `activeTab`
  ```
  Used to apply or toggle the dark theme on the active Stripe Dashboard tab in
  response to the user clicking the toolbar button or using the keyboard
  shortcut.
  ```
- Host permissions `https://dashboard.stripe.com/*`, `https://connect.stripe.com/*`
  ```
  The extension injects its dark-theme stylesheet only on the Stripe Dashboard.
  Host access to these two domains is required to style those pages. The
  extension does not read or transmit page content.
  ```
- Remote code: **No.** All code is bundled in the package; nothing is loaded
  from a remote server.

**Data usage disclosures** (check these in the form)
- Does your item collect or use personally identifiable information? **No**
- Health information? **No**
- Financial / payment information? **No**
- Authentication information? **No**
- Personal communications? **No**
- Location? **No**
- Web history? **No**
- User activity (clicks, mouse, keystrokes)? **No**
- Website content? **No**

**Certifications** (must check all three)
- [x] I do not sell or transfer user data to third parties, outside of approved use cases.
- [x] I do not use or transfer user data for purposes unrelated to my item's single purpose.
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes.

**Privacy policy URL** (required — already hosted & live, no account needed)
```
https://telegra.ph/Stripe-Dark-Mode---Privacy-Policy-06-11
```

---

## Distribution tab
- Visibility: **Public** (or Unlisted while testing)
- Regions: All regions
- Pricing: Free

## After submission
Review for a simple, narrow-permission extension like this is typically fast
(often well under a day, sometimes a few days). You'll get an email when it is
approved or if changes are requested.
