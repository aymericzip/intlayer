---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix Function Documentation | intlayer
description: See how to use the getPrefix function for intlayer package
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Initial documentation
---

# Documentation: `getPrefix` Function in `intlayer`

## Description

The `getPrefix` function determines the URL prefix for a given locale based on the routing mode configuration. It compares the locale with the default locale and returns the appropriate prefix string (e.g., `'en/'`) or an empty string.

**Key Features:**

- Takes a locale as the first parameter (optional)
- Optional `options` object with `defaultLocale`, `mode`, and `addSlash`
- Returns a prefix string that can be used for URL construction
- Supports all routing modes: `prefix-no-default`, `prefix-all`, `no-prefix`, and `search-params`
- Lightweight utility for determining when to add locale prefixes

---

## Function Signature

```typescript
getPrefix(
  locale?: Locales,              // Optional
  options?: {                    // Optional
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
    addSlash?: boolean;
  }
): string
```

---

## Parameters

### Optional Parameters

- `locale?: Locales`
  - **Description**: The locale to check for prefix. If not provided, uses the configured default locale.
  - **Type**: `Locales`
  - **Required**: No (Optional)
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

- `options?: object`
  - **Description**: Configuration object for prefix determination.
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.defaultLocale?: Locales`
    - **Description**: The default locale for the application. If not provided, uses the configured default locale from your project configuration.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: The URL routing mode for locale handling. If not provided, uses the configured mode from your project configuration.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Returns empty string when locale matches default locale
      - `prefix-all`: Returns prefix with default locale
      - `no-prefix`: Returns empty string (no prefix in URLs)
      - `search-params`: Returns empty string (locale in query parameters)

  - `options.addSlash?: boolean`
    - **Description**: Whether to add a trailing slash to the prefix. If `true`, returns `'en/'`; if `false`, returns `'en'`.
    - **Type**: `boolean`
    - **Default**: `true`

### Returns

- **Type**: `string`
- **Description**: The prefix string for the default locale (e.g., `'en/'`, `'fr/'`) or an empty string.

---

## Example Usage

### Basic Usage

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Check prefix for English locale
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Returns: 'en/'

// Check prefix for French locale
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Returns: 'en/'
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" }); // Returns: "en/"
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" }); // Returns: "en/"
```

### Different Routing Modes

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Always returns prefix
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Returns: "en/"

// prefix-no-default: No prefix when locale matches default
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Returns: ""

// prefix-no-default: Returns prefix when locale differs from default
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Returns: "en/"

// no-prefix & search-params: Never returns prefix
getPrefix(Locales.ENGLISH, { mode: "no-prefix" }); // Returns: ""
getPrefix(Locales.ENGLISH, { mode: "search-params" }); // Returns: ""

// Without trailing slash
getPrefix(Locales.ENGLISH, { mode: "prefix-all", addSlash: false });
// Returns: "en" (without trailing slash)
```

### Practical Example

```typescript
import { getPrefix, Locales } from "intlayer";

// Build URLs with the appropriate prefix for a specific locale
const locale = Locales.FRENCH;
const prefix = getPrefix(locale, { defaultLocale: Locales.ENGLISH });
const url = `/${prefix}about`.replace(/\/+/g, "/");
// Result: "/en/about" if French is not default
```

---

## Related Functions

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md): Generates a localized URL for a specific locale
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md): Generates URLs for all configured locales

---

## TypeScript

```typescript
function getPrefix(
  locale?: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
    addSlash?: boolean;
  }
): string;
```
