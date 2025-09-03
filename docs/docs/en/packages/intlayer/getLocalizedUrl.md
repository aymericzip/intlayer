---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
---

# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description

The `getLocalizedUrl` function generates a localized URL by prefixing the given URL with the specified locale. It handles both absolute and relative URLs, ensuring that the correct locale prefix is applied based on the configuration.

**Key Features:**

- Only 2 parameters are required: `url` and `currentLocale`
- 3 optional parameters: `locales`, `defaultLocale`, and `prefixDefault`
- Uses your project's internationalization configuration as defaults
- Can be used with minimal parameters for simple cases or fully customized for complex scenarios

---

## Function Signature

```typescript
getLocalizedUrl(
  url: string,                   // Required
  currentLocale: Locales,        // Required
  locales?: Locales[],           // Optional
  defaultLocale?: Locales,       // Optional
  prefixDefault?: boolean        // Optional
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

- `locales?: Locales[]`
  - **Description**: Array of supported locales. If not provided, uses the configured locales from your project configuration.
  - **Type**: `Locales[]`
  - **Required**: No (Optional)
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

- `defaultLocale?: Locales`
  - **Description**: The default locale for the application. If not provided, uses the configured default locale from your project configuration.
  - **Type**: `Locales`
  - **Required**: No (Optional)
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

- `prefixDefault?: boolean`
  - **Description**: Whether to prefix the URL for the default locale. If not provided, uses the configured value from your project configuration.
  - **Type**: `boolean`
  - **Required**: No (Optional)
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

### Returns

- **Type**: `string`
- **Description**: The localized URL for the specified locale.

---

## Example Usage

### Basic Usage (Only Required Parameters)

When you have configured your project with internationalization settings, you can use the function with just the required parameters:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Uses your project's configuration for locales, defaultLocale, and prefixDefault
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (assuming French is supported in your config)

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" or "/en/about" (depending on your prefixDefault setting)
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

You can override the default configuration by providing optional parameters:

### Relative URLs (All Parameters Specified)

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Explicitly providing all optional parameters
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Explicitly providing all optional parameters
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Explicitly providing all optional parameters
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

### Partial Configuration Override

You can also provide only some of the optional parameters. The function will use your project configuration for any parameters you don't specify:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Only override the locales, use project config for defaultLocale and prefixDefault
getLocalizedUrl(
  "/about",
  Locales.SPANISH,
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH] // Only specify locales
);

// Only override prefixDefault, use project config for locales and defaultLocale
getLocalizedUrl(
  "/about",
  Locales.ENGLISH,
  undefined, // Use project config for locales
  undefined, // Use project config for defaultLocale
  true // Force prefix for default locale
);
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

## Doc History

| Version | Date       | Changes      |
| ------- | ---------- | ------------ |
| 5.5.10  | 2025-06-29 | Init history |
