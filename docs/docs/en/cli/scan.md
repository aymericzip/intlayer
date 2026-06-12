---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scan Website
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "Add scan command"
author: aymericzip
---

# Scan Website

The `scan` command fetches a public URL, measures the total page size, and audits the page's i18n and SEO health. It produces a scored report (0–100) covering HTML attributes, canonical links, hreflang tags, robots.txt, sitemap.xml, localized internal links, and JavaScript bundle locale weight.

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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

- **`--base-dir`** — Base directory used to locate the `intlayer.config.*` file.
- **`-e, --env`** — Target environment (e.g. `development`, `production`).
- **`--env-file`** — Path to a custom `.env` file.
- **`--no-cache`** — Disable configuration cache.
- **`--verbose`** — Enable verbose logging (default in CLI mode).
- **`--prefix`** — Custom log prefix.

## What is checked

| Check                     | Description                                              | Score weight |
| ------------------------- | -------------------------------------------------------- | ------------ |
| `html lang`               | `<html lang="…">` attribute is present                   | 9            |
| `html dir`                | `<html dir="…">` attribute is present                    | 3            |
| `canonical`               | `<link rel="canonical">` is present                      | 10           |
| `hreflang`                | `<link rel="alternate" hreflang="…">` tags are present   | 9            |
| `x-default hreflang`      | An `x-default` hreflang alternate exists                 | 7            |
| `localized links`         | At least one internal link includes a locale segment     | 5            |
| `all links localized`     | Every internal link includes a locale segment            | 5            |
| `current locale`          | Page locale can be detected                              | 3            |
| `robots.txt present`      | `/robots.txt` returns a 200 response                     | 10           |
| `robots.txt locale paths` | No locale path is blocked in robots.txt                  | 10           |
| `sitemap.xml present`     | `/sitemap.xml` returns a 200 response                    | 10           |
| `sitemap locale coverage` | Every detected locale appears in the sitemap             | 10           |
| `sitemap alternates`      | The sitemap contains `hreflang` alternate links          | 5            |
| `sitemap x-default`       | The sitemap contains an `x-default` hreflang             | 5            |
| `unused bundle content`   | The JS bundle does not ship excessive unused locale data | 9            |

The final score is the weighted sum of all passing checks expressed as a percentage (0–100).

## Using the scan function programmatically

The `scan` function is also exported from `@intlayer/cli` so it can be called from your own scripts:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

For lower-level access, `scanWebsite` from `@intlayer/chokidar/scan` returns a structured `ScanResult` object:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
