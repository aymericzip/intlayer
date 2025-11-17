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

The `getPrefix` function determines the URL prefix for a given locale based on the routing mode configuration. It compares the locale with the default locale and returns an object containing three different prefix formats for flexible URL construction.

**Key Features:**

- Takes a locale as the first parameter (required)
- Optional `options` object with `defaultLocale` and `mode`
- Returns an object with `prefix`, and `localePrefix` properties
- Supports all routing modes: `prefix-no-default`, `prefix-all`, `no-prefix`, and `search-params`
- Lightweight utility for determining when to add locale prefixes

---

## Function Signature

```typescript
getPrefix(
  locale: Locales,               // Required
  options?: {                    // Optional
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // e.g., 'fr/' or ''
  localePrefix?: Locale; // e.g., 'fr' or undefined
}
```

---

## Parameters

- `locale: Locales`
  - **Description**: The locale to generate the prefix for. If the value is falsy (undefined, null, empty string), the function returns an empty string.
  - **Type**: `Locales`
  - **Required**: Yes

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
      - `prefix-no-default`: Returns empty strings when locale matches default locale
      - `prefix-all`: Returns prefix for all locales including default
      - `no-prefix`: Returns empty strings (no prefix in URLs)
      - `search-params`: Returns empty strings (locale in query parameters)

### Returns

- **Type**: `GetPrefixResult`
- **Description**: An object containing three different prefix formats:
  - `prefix`: The path prefix with trailing slash (e.g., `'fr/'`, `''`)
  - `localePrefix`: The locale identifier without slashes (e.g., `'fr'`, `undefined`)

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
// Returns: { prefix: 'en/', localePrefix: 'en' }

// Check prefix for French locale
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Returns: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Returns: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Returns: { prefix: '', localePrefix: undefined }
```

### Different Routing Modes

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Always returns prefix
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Returns: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: No prefix when locale matches default
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Returns: { prefix: '', localePrefix: undefined }

// prefix-no-default: Returns prefix when locale differs from default
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Returns: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Never returns prefix
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Returns: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Returns: { prefix: '', localePrefix: undefined }
```

### Practical Example

```typescript
import { getPrefix, Locales } from "intlayer";

// Build URLs with the appropriate prefix for a specific locale
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Using prefix for path construction
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Result: "/fr/about"

// Using localePrefix for locale identification
console.log(`Current locale: ${localePrefix}`);
// Output: "Current locale: fr"
```

---

## Related Functions

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md): Generates a localized URL for a specific locale
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md): Generates URLs for all configured locales

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // The path prefix with trailing slash (e.g., 'fr/' or '')
  localePrefix?: Locale; // The locale identifier without slashes (e.g., 'fr' or undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
