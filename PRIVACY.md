# Privacy Policy — Stripe Dark Mode

_Last updated: 11 June 2026_

Stripe Dark Mode is a browser extension that applies a dark visual theme to the
Stripe Dashboard. Your privacy matters, and the extension is built to need as
little access as possible.

## The short version

**Stripe Dark Mode does not collect, store, transmit, sell, or share any
personal data. It makes no network requests. Everything runs locally in your
browser.**

## What the extension accesses

- **Page styling on Stripe domains only.** The extension injects a stylesheet
  and a small script into pages on `dashboard.stripe.com` and
  `connect.stripe.com` to apply the dark theme. It does **not** read, record,
  or transmit the contents of those pages.
- **Your settings.** Your on/off preference and intensity level are stored
  using Chrome's `storage.sync` API so they persist and follow your Chrome
  profile. These values (a boolean and a number) never leave Google's sync
  infrastructure for your own account and are never sent to us or any third
  party.

## What the extension does NOT do

- It does **not** collect personal information, financial data, or any Stripe
  account/transaction data.
- It does **not** use analytics, tracking, cookies, or fingerprinting.
- It does **not** make any network/HTTP requests of its own.
- It does **not** contain remote or externally-hosted code; all code is bundled
  in the extension package and reviewed by the Chrome Web Store.

## Permissions, explained

| Permission | Why it is requested |
|---|---|
| `storage` | To save your on/off toggle and intensity setting. |
| `activeTab` | To apply or toggle the theme on the Stripe tab you are using. |
| Host access to `dashboard.stripe.com` / `connect.stripe.com` | To inject the dark-theme CSS only on the Stripe Dashboard. |

## The "Buy Me a Coffee" link

The popup contains an optional donation link. Clicking it opens
buymeacoffee.com in a new tab. At that point you are on a third-party website
governed by its own privacy policy. The extension itself shares no data with
that service.

## Changes to this policy

If this policy changes, the updated version will be published in the project
repository with a new "Last updated" date.

## Contact

Questions about privacy? Open an issue on the project repository or contact the
developer at the email listed on the Chrome Web Store listing.
