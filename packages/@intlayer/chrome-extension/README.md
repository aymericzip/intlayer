# @intlayer/chrome-extension

Chrome Web Store: <https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc>

Chrome extension (Manifest V3) that inspects the i18n implementation of the
currently visited website — Wappalyzer style — and can run a full Intlayer
i18n/SEO audit through the backend.

## What it shows

- **Detected technologies** — framework (Next.js, Nuxt, Astro, SvelteKit,
  Angular, Vue, Qwik, React, Gatsby, Remix, WordPress…) and i18n library
  (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Weglot, WPML, Polylang…), with
  version and the evidence that triggered each detection.
- **Locales** — locales discovered from `lang`, hreflang and `og:locale` tags,
  URL locale prefix, locale cookies / storage entries.
- **SEO i18n tags** — `html lang` / `dir`, canonical, hreflang, `x-default`,
  `og:locale`, localized internal-link ratio.
- **Full audit** — streams the backend audit (`GET /api/scan`, SSE, same as
  the [intlayer.org scanner](https://intlayer.org/i18n-seo-scanner)) and
  renders the live score and every check.

## How it works

- The popup injects a fully self-contained detector function into the page's
  MAIN world via `chrome.scripting.executeScript`, so page globals such as
  `__NEXT_DATA__` or `window.i18next` are visible. Only `activeTab` +
  `scripting` permissions are required — no broad host access.
- The full audit calls `https://back.intlayer.org/api/scan?url=…`
  (`host_permissions` covers CORS).

## Development

```sh
bun run build   # vite build → dist/
bun run dev     # vite build --watch
bun run zip     # dist/ → intlayer-chrome-extension.zip
```

## Load in Chrome

1. `bun run build`
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. **Load unpacked** → select `packages/@intlayer/chrome-extension/dist`

## Firefox (addons.mozilla.org)

The same `dist/` build runs on Firefox 140+ (desktop) and 142+ (Android).
The Firefox-only settings are in `browser_specific_settings` in
`public/manifest.json`: the add-on ID `i18n-scanner@intlayer.org` (never change
it once published) and the `browsingActivity` data collection declaration.
The declaration covers the page URL that the full audit sends to the backend.

Try it: `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…**
→ `dist/manifest.json`.

Publish:

```sh
bun run build
bun run lint:firefox   # Mozilla's web-ext lint, must report 0 errors
bun run zip            # → intlayer-chrome-extension.zip (add-on upload)
bun run zip:source     # → intlayer-extension-source.zip (source for review)
```

Mozilla requires source code for bundled code. Upload
`intlayer-extension-source.zip` and paste the contents of
[`SOURCE_CODE_REVIEW.md`](./SOURCE_CODE_REVIEW.md) into the reviewer notes.
`zip:source` archives the last commit (`HEAD`), so commit before running it.
