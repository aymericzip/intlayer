---
createdAt: 2025-08-23
updatedAt: 2025-11-16
title: getLocalizedUrl Function Documentation | intlayer
description: See how to use the getLocalizedUrl function for intlayer package
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Refactored to use options parameter with mode instead of prefixDefault
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description

The `getLocalizedUrl` function generates a localized URL by prefixing the given URL with the specified locale. It handles both absolute and relative URLs, ensuring that the correct locale prefix is applied based on the configuration.

**Key Features:**

- Only 2 parameters are required: `url` and `currentLocale`
- Optional `options` object with `locales`, `defaultLocale`, and `mode`
- Uses your project's internationalization configuration as defaults
- Can be used with minimal parameters for simple cases or fully customized for complex scenarios
- Supports multiple routing modes: `prefix-no-default`, `prefix-all`, `no-prefix`, and `search-params`

---

## Function Signature

```typescript
getLocalizedUrl(
  url: string,                   // Required
  currentLocale: Locales,        // Required
  options?: {                    // Optional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Parameters

### Required Parameters

- `url: string`
  - **Description**: The original URL string to be prefixed with a locale.
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: The current locale for which the URL is being localized.
  - **Type**: `Locales`
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

- **Type**: `string`
- **Description**: The localized URL for the specified locale.

---

## Example Usage

### Basic Usage (Only Required Parameters)

When you have configured your project with internationalization settings, you can use the function with just the required parameters:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Uses your project's configuration for locales, defaultLocale, and mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (assuming French is supported and mode is 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" or "/en/about" (depending on your mode setting)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Uses your project's configuration
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Uses your project's configuration
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about"
```

### Advanced Usage (With Optional Parameters)

You can override the default configuration by providing the optional `options` parameter:

### Relative URLs (All Options Specified)

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Explicitly providing all optional parameters
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/fr/about" for the French locale

getLocalizedUrl("/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Explicitly providing all optional parameters
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/fr/about" for the French locale
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Explicitly providing all optional parameters
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/fr/about" for the French locale
```

### Partial Configuration Override

You can also provide only some of the optional parameters. The function will use your project configuration for any parameters you don't specify:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Only override the locales, use project config for defaultLocale and mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Only override mode, use project config for locales and defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Force prefix for all locales including default
});

// Override multiple options
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Use query parameters: /about?locale=fr
});
```

### Absolute URLs

```typescript
getLocalizedUrl("https://example.com/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "https://example.com/fr/about" for the French

getLocalizedUrl("https://example.com/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "https://example.com/about" for the English (no prefix for default)

getLocalizedUrl("https://example.com/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: "https://example.com/en/about" for the English (prefix for all)

getLocalizedUrl("https://example.com/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: "https://example.com/about?locale=fr" (using query parameters)
```

### Unsupported Locale

```typescript
getLocalizedUrl("/about", Locales.ITALIAN, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/about" (no prefix applied for unsupported locale)
```

---

## Edge Cases

- **No Locale Segment:**
  - If the URL does not contain any locale segment, the function safely prefixes the appropriate locale based on the routing mode.

- **Default Locale:**
  - When `mode` is `'prefix-no-default'`, the function does not prefix the URL for the default locale.
  - When `mode` is `'prefix-all'`, the function prefixes all locales including the default.

- **Unsupported Locales:**
  - For locales not listed in `locales`, the function does not apply any prefix.

- **Routing Modes:**
  - `'prefix-no-default'`: Default locale has no prefix, others do (e.g., `/about`, `/fr/about`)
  - `'prefix-all'`: All locales have prefixes (e.g., `/en/about`, `/fr/about`)
  - `'no-prefix'`: No locale prefixes in URLs (locale handled elsewhere)
  - `'search-params'`: Locale specified via query parameter (e.g., `/about?locale=fr`)

---

## Usage in Applications

In a multilingual application, configuring the internationalization settings with `locales` and `defaultLocale` is critical for ensuring the correct language is displayed. Below is an example of how `getLocalizedUrl` can be used in an application setup:

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

Using this configuration, the `getLocalizedUrl` function can dynamically generate localized URLs based on the user's language preference:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

By integrating `getLocalizedUrl`, developers can maintain consistent URL structures across multiple languages, enhancing both user experience and SEO.
