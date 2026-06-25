---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl Function Documentation | intlayer
description: See how to use the getLocalizedUrl function for intlayer package
keywords:
  - getLocalizedUrl
  - translation
  - Intlayer
  - intlayer
  - Internationalisation
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
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description

The `getLocalizedUrl` function generates a localised URL by prefixing the given URL with the specified locale. It handles both absolute and relative URLs, ensuring that the correct locale prefix is applied based on the configuration.

**Key Features:**

- Only 2 parameters are required: `url` and `currentLocale`
- Optional `options` object with `locales`, `defaultLocale`, and `mode`
- Uses your project's internationalisation configuration as defaults
- Can be used with minimal parameters for simple cases or fully customised for complex scenarios
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

## Description

The `getLocalizedUrl` function generates a localised URL by prefixing the given URL with the specified locale. It handles both absolute and relative URLs, ensuring that the correct locale prefix is applied based on the configuration.

---

## Parameters

- `url: string`
  - **Description**: The original URL string to be prefixed with a locale.
  - **Type**: `string`

- `currentLocale: Locales`
  - **Description**: The current locale for which the URL is being localised.
  - **Type**: `Locales`

- `locales: Locales[]`
  - **Description**: Optional array of supported locales. By default, the configured locales in the project are provided.
  - **Type**: `Locales[]`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/configuration.md#middleware)

- `defaultLocale: Locales`
  - **Description**: The default locale for the application. By default, the configured default locale in the project is provided.
  - **Type**: `Locales`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: Whether to prefix the URL for the default locale. By default, the configured value in the project is provided.
  - **Type**: `boolean`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/configuration.md#middleware)

### Returns

- **Type**: `string`
- **Description**: The localised URL for the specified locale.

---

## Example Usage

### Basic Usage (Only Required Parameters)

When you have configured your project with internationalisation settings, you can use the function with just the required parameters:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// Uses your project's configuration for locales, defaultLocale, and mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (assuming French is supported and mode is 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" or "/en/about" (depending on your mode setting)
```

### Advanced Usage (With Optional Parameters)

You can override the default configuration by providing the optional `options` parameter:

### Relative URLs

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
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
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Current Locale
  [Locales.ENGLISH, Locales.FRENCH], // Supported Locales
  Locales.ENGLISH, // Default Locale
  false // Prefix Default Locale
); // Output: "https://example.com/fr/about" for the French

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Current Locale
  [Locales.ENGLISH, Locales.FRENCH], // Supported Locales
  Locales.ENGLISH, // Default Locale
  false // Prefix Default Locale
); // Output: "https://example.com/about" for the English

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Current Locale
  [Locales.ENGLISH, Locales.FRENCH], // Supported Locales
  Locales.ENGLISH, // Default Locale
  true // Prefix Default Locale
); // Output: "https://example.com/en/about" for the English
```

### Unsupported Locale

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Current Locale
  [Locales.ENGLISH, Locales.FRENCH], // Supported Locales
  Locales.ENGLISH // Default Locale
); // Output: "/about" (no prefix applied for unsupported locale)
```

---

## Edge Cases

- **No Locale Segment:**
  - If the URL does not contain any locale segment, the function safely prefixes the appropriate locale.

- **Default Locale:**
  - When `prefixDefault` is `false`, the function does not prefix the URL for the default locale.

- **Unsupported Locales:**
  - For locales not listed in `locales`, the function does not apply any prefix.

---

## Usage in Applications

In a multilingual application, configuring the internationalisation settings with `locales` and `defaultLocale` is critical for ensuring the correct language is displayed. Below is an example of how `getLocalizedUrl` can be used in an application setup:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

The above configuration ensures that the application recognises `ENGLISH`, `FRENCH`, and `SPANISH` as supported languages and uses `ENGLISH` as the fallback language.

Using this configuration, the `getLocalizedUrl` function can dynamically generate localised URLs based on the user's language preference:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

By integrating `getLocalizedUrl`, developers can maintain consistent URL structures across multiple languages, enhancing both user experience and SEO.
