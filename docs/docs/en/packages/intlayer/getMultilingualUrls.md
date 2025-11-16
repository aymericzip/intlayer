---
createdAt: 2025-08-23
updatedAt: 2025-11-16
title: getMultilingualUrls Function Documentation | intlayer
description: See how to use the getMultilingualUrls function for intlayer package
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Refactored to use options parameter with mode instead of prefixDefault
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Documentation: `getMultilingualUrls` Function in `intlayer`

## Description

The `getMultilingualUrls` function generates a mapping of multilingual URLs by prefixing the given URL with each supported locale. It can handle both absolute and relative URLs, applying the appropriate locale prefix based on the provided configuration or defaults.

**Key Features:**

- Only 1 parameter is required: `url`
- Optional `options` object with `locales`, `defaultLocale`, and `mode`
- Uses your project's internationalization configuration as defaults
- Supports multiple routing modes: `prefix-no-default`, `prefix-all`, `no-prefix`, and `search-params`
- Returns a mapping object with all locales as keys and their corresponding URLs as values

---

## Function Signature

```typescript
getMultilingualUrls(
  url: string,                   // Required
  options?: {                    // Optional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Parameters

### Required Parameters

- `url: string`
  - **Description**: The original URL string to be prefixed with locales.
  - **Type**: `string`
  - **Required**: Yes

### Optional Parameters

- `options?: object`
  - **Description**: Configuration object for URL localization behavior.
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: Array of supported locales. If not provided, uses the configured locales from your project configuration.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: The default locale for the application. If not provided, uses the configured default locale from your project configuration.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: The URL routing mode for locale handling. If not provided, uses the configured mode from your project configuration.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: No prefix for default locale, prefix for all others
      - `prefix-all`: Prefix for all locales including default
      - `no-prefix`: No locale prefix in URL
      - `search-params`: Use query parameters for locale (e.g., `?locale=fr`)

### Returns

- **Type**: `StrictModeLocaleMap<string>`
- **Description**: An object mapping each locale to its corresponding multilingual URL.

---

## Example Usage

### Basic Usage (Uses Project Configuration)

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

// Uses your project's configuration for locales, defaultLocale, and mode
getMultilingualUrls("/dashboard");
// Output (assuming project config has en, fr with mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard");
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls("/dashboard");
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Relative URLs with Options

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs

```typescript
getMultilingualUrls("https://example.com/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

### Different Routing Modes

```typescript
// prefix-no-default: No prefix for default locale
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Prefix for all locales
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: No locale prefix in URLs
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale as query parameter
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Edge Cases

- **No Locale Segment:**
  - The function removes any existing locale segment from the URL before generating the multilingual mappings.

- **Default Locale:**
  - When `mode` is `'prefix-no-default'`, the function does not prefix the URL for the default locale.
  - When `mode` is `'prefix-all'`, the function prefixes all locales including the default.

- **Unsupported Locales:**
  - Only the locales provided in the `locales` array are considered for generating the URLs.

- **Routing Modes:**
  - `'prefix-no-default'`: Default locale has no prefix, others do (e.g., `/dashboard`, `/fr/dashboard`)
  - `'prefix-all'`: All locales have prefixes (e.g., `/en/dashboard`, `/fr/dashboard`)
  - `'no-prefix'`: No locale prefixes in URLs (all locales return same URL)
  - `'search-params'`: Locale specified via query parameter (e.g., `/dashboard?locale=fr`)

---

## Usage in Applications

In a multilingual application, configuring the internationalization settings with `locales` and `defaultLocale` is critical for ensuring the correct language is displayed. Below is an example of how `getMultilingualUrls` can be used in an application setup:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuration for supported locales and default locale
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

The above configuration ensures that the application recognizes `ENGLISH`, `FRENCH`, and `SPANISH` as supported languages and uses `ENGLISH` as the fallback language.

Using this configuration, the `getMultilingualUrls` function can dynamically generate multilingual URL mappings based on the application's supported locales:

```typescript
// Using project configuration (no options needed)
getMultilingualUrls("/dashboard");
// Output:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// With explicit options
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// Absolute URLs with prefix-all mode
getMultilingualUrls("https://example.com/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

By integrating `getMultilingualUrls`, developers can maintain consistent URL structures across multiple languages, enhancing both user experience and SEO.
