---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: Audit a Website's i18n and SEO"
description: Learn how to use the Intlayer CLI scan command to measure page size and audit the i18n/SEO health of any website.
keywords:
  - Scan
  - SEO
  - i18n
  - Audit
  - CLI
  - Intlayer
  - Page size
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Detect the routing strategy and the i18n stack (libraries, TMS); add hreflang reciprocity, og:locale and language switcher checks; follow robots.txt sitemaps, sitemap indexes and gzipped sitemaps"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Add `--ci` flag"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Add scan command"
author: aymericzip
---

# Scan Website

The `scan` command fetches a public URL, measures the total page size, and audits the page's i18n and SEO health. It produces a scored report (0–100) covering HTML attributes, canonical links, hreflang tags and their return links, robots.txt, sitemaps, localized internal links, and JavaScript bundle locale weight.

It also reports how the site encodes the locale in its URLs (routing strategy) and which framework, i18n library, translation management system (TMS) or translation proxy it uses. The same checks power the [online i18n SEO scanner](https://intlayer.org/i18n-seo-scanner) and the Intlayer Chrome extension.

No extra dependencies are required. When [puppeteer](https://pptr.dev/) is installed the scan can capture lazy-loaded JavaScript chunks for a more precise bundle analysis; otherwise it falls back to inspecting eagerly-loaded scripts declared in the HTML.

## Usage

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Example

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Sample output:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Options

### `<url>` (required)

The fully-qualified URL to scan (e.g. `https://example.com`).

### `--no-deep`

Disable the deeper render-based scan.

By default the command attempts to use [puppeteer](https://pptr.dev/) to render the page in a headless browser, capture lazy-loaded JavaScript chunks, and measure the true wire-transfer size. If puppeteer is not installed, the command automatically falls back to basic mode.

Pass `--no-deep` to force basic mode even when puppeteer is available.

> Example: `npx intlayer scan https://example.com --no-deep`

### `--json`

Output the full scan result as a JSON object instead of a formatted report. Useful for programmatic consumption or CI pipelines.

> Example: `npx intlayer scan https://example.com --json`

### Standard configuration options

- **`--base-dir`**: Base directory used to locate the `intlayer.config.*` file.
- **`-e, --env`**: Target environment (e.g. `development`, `production`).
- **`--env-file`**: Path to a custom `.env` file.
- **`--no-cache`**: Disable configuration cache.
- **`--ci`**: Run the command in every Intlayer project of the monorepo (or only the current one when run from a project directory). Per-project credentials can be injected via `INTLAYER_PROJECT_CREDENTIALS`, a JSON map of project path to `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Enable verbose logging (default in CLI mode).
- **`--prefix`**: Custom log prefix.

## Routing strategy

The locale pattern shared by the page's hreflang alternates reveals how the site routes its locales. Without alternates, the scanned URL alone is used (low confidence).

| Strategy            | Example                                |
| ------------------- | -------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`               |
| `prefix-no-default` | `/about` (default locale), `/fr/about` |
| `search-params`     | `/about?lang=fr`                       |
| `subdomain`         | `fr.example.com`                       |
| `domain`            | `example.fr`, `example.de`             |
| `no-prefix`         | One URL for every locale (cookie)      |

Link, canonical, robots.txt and sitemap checks read every URL through this strategy. For example, an unprefixed link is correct on the default locale of a `prefix-no-default` site, and a link without `?lang=` leaves the locale on a `search-params` site.

## Detected stack

Frameworks, i18n libraries (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), translation management systems (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) and translation proxies (Weglot, Localize, GTranslate…) are identified from the HTML, the loaded resources and the JavaScript bundles. Deep mode also reads window globals and cookies.

## What is checked

| Check                           | Description                                                                                 | Score weight |
| ------------------------------- | ------------------------------------------------------------------------------------------- | ------------ |
| `html lang`                     | `<html lang>` is present and a valid BCP 47 tag                                             | 9            |
| `html dir`                      | `dir="rtl"` is set for right-to-left languages (`ltr` is the default)                       | 3            |
| `locale signals consistent`     | `<html lang>`, the URL locale and the self hreflang entry agree                             | 5            |
| `og:locale`                     | `og:locale` is set and matches `<html lang>`                                                | 3            |
| `canonical`                     | A canonical link exists and does not point to another locale version                        | 10           |
| `hreflang`                      | hreflang tags exist, with valid codes, absolute URLs, no duplicates and a self reference    | 9            |
| `x-default hreflang`            | An `x-default` hreflang alternate exists                                                    | 7            |
| `hreflang alternates link back` | Alternates answer with a 200, are not redirected, link back and declare the language        | 8            |
| `localized links`               | Internal links point to the page locale                                                     | 8            |
| `all links keep the locale`     | No internal link switches or drops the locale                                               | 6            |
| `language switcher`             | Crawlable `<a href>` links to the other locale versions exist                               | 6            |
| `robots.txt present`            | `/robots.txt` returns a 200 response                                                        | 10           |
| `robots.txt localized URLs`     | Neither the site nor its localized URLs are blocked for Googlebot                           | 8            |
| `sitemap present`               | A sitemap is found (robots.txt `Sitemap:` directives, `/sitemap.xml`, `/sitemap_index.xml`) | 10           |
| `sitemap locale coverage`       | Every locale is listed, and entries with alternates list themselves                         | 9            |
| `sitemap alternates`            | The sitemap contains `hreflang` alternate links                                             | 8            |
| `sitemap x-default`             | The sitemap contains an `x-default` hreflang                                                | 7            |
| `unused bundle content`         | The main JS bundle does not ship translations of other locales                              | 8            |

A warning earns half of the weight. The final score is the weighted sum of the checks that ran, expressed as a percentage (0–100). Failing checks print the first issues found; use `--json` for the full details.

## Using the scan function programmatically

The `scan` function is also exported from `@intlayer/cli` so it can be called from your own scripts:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

For lower-level access, `scanWebsite` from `@intlayer/engine/scan` returns a structured `ScanResult` object:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
