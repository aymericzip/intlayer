---
createdAt: 2026-04-03
updatedAt: 2026-04-03
title: Custom Domains
description: Configure domain-based locale routing in Intlayer to serve different locales from dedicated hostnames.
keywords:
  - Custom Domains
  - Domain Routing
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.7.0
    date: 2026-04-03
    changes: "Add domain-based locale routing via routing.domains configuration."
---

# Custom Domains

Intlayer supports domain-based locale routing, allowing you to serve specific locales from dedicated hostnames. For example, Chinese visitors can be directed to `intlayer.zh` instead of `intlayer.org/zh`.

## How It Works

The `domains` map in `routing` associates each locale with a hostname. Intlayer uses this map in two places:

1. **URL generation** (`getLocalizedUrl`): when the target locale lives on a _different_ domain than the current page, an absolute URL is returned (e.g. `https://intlayer.zh/about`). When both domains match, a relative URL is returned (e.g. `/fr/about`).
2. **Server proxy** (Next.js & Vite): incoming requests are redirected or rewritten based on the domain they arrive on.

### Exclusive vs. shared domains

The key distinction is **exclusivity**:

- **Exclusive domain** — only one locale maps to that hostname (e.g. `zh → intlayer.zh`). The domain itself identifies the locale, so no locale prefix is added to the path. `https://intlayer.zh/about` serves Chinese content.
- **Shared domain** — multiple locales map to the same hostname (e.g. `en` and `fr` both map to `intlayer.org`). Normal prefix-based routing applies. `intlayer.org/fr/about` serves French content.

## Configuration

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Shared domain — en and fr use prefix routing on intlayer.org
      en: "intlayer.org",
      // Exclusive domain — zh has its own hostname, no /zh/ prefix needed
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Locales that are not listed in `domains` continue to use the standard prefix routing without any domain override.

## URL Generation

`getLocalizedUrl` automatically produces the correct URL type based on the calling context.

### Same-domain locale (relative URL)

```ts
// Current page: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (default locale, no prefix)
```

### Cross-domain locale (absolute URL)

```ts
// Current page: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (exclusive domain, no /zh/ prefix)
```

### Serving from the locale's own domain

```ts
// Current page: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (already on the correct domain — relative URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (cross-domain link back to intlayer.org)
```

### Current domain auto-detection

`currentDomain` is optional. When omitted, `getLocalizedUrl` resolves it in this order:

1. The hostname of an absolute input URL (e.g. `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` in browser environments.
3. If neither is available (SSR without explicit option), a relative URL is returned for same-domain locales and no absolute URL is produced — this is the safe fallback.

```ts
// Browser — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (auto-detected from window)

// From an absolute URL — domain detected automatically
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` with domains

`getMultilingualUrls` calls `getLocalizedUrl` for every locale, so it produces a mix of relative and absolute URLs depending on the caller's domain:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

These absolute URLs are ready to use in `<link rel="alternate" hreflang="...">` tags for SEO.

## Proxy Behaviour

### Next.js

The `intlayerProxy` middleware handles domain routing automatically. Add it to your `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirect** — request arrives on the wrong domain for a given locale prefix:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Rewrite** — request arrives on the locale's exclusive domain without a prefix:

```
GET intlayer.zh/about
→ rewrite to /zh/about  (internal Next.js routing only, URL stays clean)
```

### Vite

The `intlayerProxy` Vite plugin applies the same logic during development:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Note**: in local development you are typically on `localhost`, so cross-domain redirects will point to the live domains rather than another local port. Use a hosts-file override (e.g. `127.0.0.1 intlayer.zh`) or a reverse proxy if you need to test multi-domain routing locally.

## Locale Switcher

The `useLocale` hook from `next-intlayer` handles domain-aware navigation automatically. When a user switches to a locale on a different domain the hook performs a full-page navigation (`window.location.href`) instead of a client-side router push, because the Next.js router cannot cross origins.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {localeEl.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

No extra configuration is required — `useLocale` detects `window.location.hostname` internally and decides between `router.replace` (same domain) and `window.location.href` (cross-domain).

## SEO: `hreflang` Alternate Links

Domain-based routing is commonly used together with `hreflang` to tell search engines which URL to index for each language. Use `getMultilingualUrls` to generate the full set of alternate URLs:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // e.g. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

This produces:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Core Utilities

| Utility                                           | Description                                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Returns relative or absolute URL depending on whether the target locale is on the current domain. |
| `getMultilingualUrls(url, { currentDomain })`     | Returns a locale-keyed map of localized URLs, mixing relative and absolute as needed.             |
| `getPrefix(locale, { domains })`                  | Returns an empty prefix for exclusive-domain locales, normal prefix otherwise.                    |
