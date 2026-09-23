---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath Function Documentation | intlayer
description: See how to use the getLocalizedPath function for intlayer package
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
    date: 2026-08-19
    changes: "Apply the locale prefix, and narrow the return type from the declared rewrite rules"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Documentation: `getLocalizedPath` Function in `intlayer`

## Description

The `getLocalizedPath` function localizes a canonical path (internal application path): it resolves the custom rewrite rules, then applies the locale prefix of your routing mode. It is particularly useful for generating SEO-friendly URLs that vary by language.

It is the relative counterpart of [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md) — for a relative input both return the same value. Unlike `getLocalizedUrl`, it never returns an absolute URL: the `domains` configuration is ignored, so a locale served from its own domain still yields a path. An absolute input is accepted, but its origin is dropped — only its path, query string and hash are kept.

**Key Features:**

- Supports dynamic route parameters using the `[param]` syntax.
- Resolves paths according to custom rewrite rules defined in your configuration.
- Applies the locale prefix of the configured routing mode (`prefix-no-default`, `prefix-all`, …).
- Automatically handles fallback to the canonical path if no rewrite rule is found for the specified locale.
- Narrows its return type: a literal path resolves to the localized string literal at compile time.

## Function Signature

```typescript
getLocalizedPath(
  canonicalPath: string,     // Required
  locale?: Locales,          // Optional
  options?: {                // Optional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
    rewrite?: RoutingConfig['rewrite'];
  }
): string
```

## Parameters

### Required Parameters

- `canonicalPath: string`
  - **Description**: The internal application path (e.g., `/about`, `/product/[id]`).
  - **Type**: `string`
  - **Required**: Yes

### Optional Parameters

- `locale?: Locales`
  - **Description**: The target locale for which the path should be localized.
  - **Type**: `Locales`
  - **Default**: The default locale of your project's configuration.

- `options?: object`
  - **Description**: Routing overrides. Every entry defaults to your project's configuration.
  - **Type**: `object`

  - `options.locales?: Locales[]` — supported locales. **Default**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — the default locale. **Default**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — how the locale appears in the path. **Default**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — custom rewrite rules. **Default**: `configuration.routing.rewrite`

## Returns

- **Type**: `string`
- **Description**: The localized path for the specified locale.

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

## Example Usage

### Basic Usage (With Configuration)

If you have configured custom rewrites in your `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/fr/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about" (default locale, no prefix)
```

### Usage with Dynamic Routes

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/fr/produit/123"
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

getLocalizedPath("/contact", Locales.FRENCH, { rewrite: manualRules });
// Output: "/fr/contactez-nous"
```

### Omitting the Locale

When no locale is given, the path is localized for the configured default locale:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

## Related Functions

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getCanonicalPath.md): Resolves a localized path back to its internal canonical path. Note that it undoes the rewrite rules only — strip the locale prefix with [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) first.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md): Same localization, but able to return an absolute URL (protocol, host, domain routing).
