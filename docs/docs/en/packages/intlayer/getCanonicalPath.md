---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath Function Documentation | intlayer
description: See how to use the getCanonicalPath function for intlayer package
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Documentation: `getCanonicalPath` Function in `intlayer`

## Description

The `getCanonicalPath` function resolves a localized URL path (e.g., `/a-propos`) back to its internal canonical application path (e.g., `/about`). This is essential for routers to match the correct internal route regardless of the URL language.

**Key Features:**

- Supports dynamic route parameters using the `[param]` syntax.
- Matches localized paths against custom rewrite rules defined in your configuration.
- Returns the original path if no matching rewrite rule is found.

---

## Function Signature

```typescript
getCanonicalPath(
  localizedPath: string,         // Required
  locale: Locales,               // Required
  rewriteRules?: RoutingConfig['rewrite'] // Optional
): string
```

---

## Parameters

### Required Parameters

- `localizedPath: string`
  - **Description**: The localized path as seen in the browser (e.g., `/a-propos`).
  - **Type**: `string`
  - **Required**: Yes

- `locale: Locales`
  - **Description**: The locale used for the path being resolved.
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
- **Description**: The internal canonical path.

---

## Example Usage

### Basic Usage (With Configuration)

If you have configured custom rewrites in your `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuration: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Output: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Usage with Dynamic Routes

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Output: "/product/123"
```

### Manual Rewrite Rules

You can also pass manual rewrite rules to the function:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## Related Functions

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedPath.md): Resolves a canonical path into its localized equivalent.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md): Generates a fully localized URL (including protocol, host, and locale prefix).
