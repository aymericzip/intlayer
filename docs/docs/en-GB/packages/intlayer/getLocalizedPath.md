---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath function documentation | intlayer
description: See how to use the getLocalizedPath function in the intlayer package
keywords:
  - getLocalizedPath
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Documentation: `getLocalizedPath` function in `intlayer`

## Description

The `getLocalizedPath` function resolves a canonical path (internal application path) into its localised equivalent based on the provided locale and rewrite rules. It is particularly useful for generating SEO-friendly URLs that vary by language.

It is the relative counterpart of [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocalizedUrl.md) — for a relative input both return the same value. Unlike `getLocalizedUrl`, it never returns an absolute URL: the `domains` configuration is ignored, so a locale served from its own domain still yields a path. An absolute input is accepted, but its origin is dropped — only its path, query string and hash are kept.

**Key Features:**

- Supports dynamic route parameters using the `[param]` syntax.
- Resolves paths according to custom rewrite rules defined in your configuration.
- Automatically handles fallback to the canonical path if no rewrite rule is found for the specified locale.

---

## Function Signature

```typescript
getLocalizedPath(
  canonicalPath: string,         // Required
  locale: Locales,               // Required
  rewriteRules?: RoutingConfig['rewrite'] // Optional
): string
```

---

## Parameters

### Required Parameters

- `canonicalPath: string`
  - **Description**: The internal application path (e.g., `/about`, `/product/[id]`).
  - **Type**: `string`
  - **Required**: Yes

### Optional Parameters

- `locale?: Locales`
  - **Description**: The target locale for which the path should be localised.
  - **Type**: `Locales`
  - **Default**: The default locale of your project's configuration.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Description**: An object defining custom rewrite rules. If not provided, it defaults to the `routing.rewrite` property from your project's configuration.
  - **Type**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — supported locales. **Default**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — the default locale. **Default**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — how the locale appears in the path. **Default**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — custom rewrite rules. **Default**: `configuration.routing.rewrite`

---

## Returns

- **Type**: `string`
- **Description**: The localised path for the specified locale.

The type is narrowed from the rewrite rules declared in your configuration, so the editor shows the resolved path rather than a bare `string`:

```typescript codeFormat="typescript"
// Configuration: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (no rewrite rule matches, only the prefix is applied)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

The same narrowing flows into [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md), which applies the rewrite rules before prefixing the locale.

Two cases stay widened to `string`, because they cannot be resolved at compile time:

- a path that is not a string literal (e.g. one built from a variable);
- a path matched by a rule using a multi-segment or optional parameter (`[...slug]`, `[[...slug]]`, `:param?`).

---

## Example Usage

### Basic Usage (With Configuration)

If you have configured custom rewrites in your `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Usage with Dynamic Routes

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/produit/123"
```

### Manual Rewrite Rules

You can also pass manual rewrite rules to the function:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

### Omitting the Locale

When no locale is given, the path is localised for the configured default locale:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

---

## Related Functions

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getCanonicalPath.md): Resolves a localised path back to its internal canonical path.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocalizedUrl.md): Generates a fully localised URL (including the protocol, host and locale prefix).
