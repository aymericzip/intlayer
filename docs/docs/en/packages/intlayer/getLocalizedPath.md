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
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Documentation: `getLocalizedPath` Function in `intlayer`

## Description

The `getLocalizedPath` function resolves a canonical path (internal application path) into its localized equivalent based on the provided locale and rewrite rules. It is particularly useful for generating SEO-friendly URLs that vary by language.

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

- `locale: Locales`
  - **Description**: The target locale for which the path should be localized.
  - **Type**: `Locales`
  - **Required**: Yes

### Optional Parameters

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Description**: An object defining custom rewrite rules. If not provided, it defaults to the `routing.rewrite` property from your project's configuration.
  - **Type**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

---

## Returns

- **Type**: `string`
- **Description**: The localized path for the specified locale.

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

---

## Related Functions

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getCanonicalPath.md): Resolves a localized path back to its internal canonical path.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md): Generates a fully localized URL (including protocol, host, and locale prefix).
