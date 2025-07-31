---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getMultilingualUrls Function Documentation | intlayer
description: See how to use the getMultilingualUrls function for intlayer package
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
---

# Documentation: `getMultilingualUrls` Function in `intlayer`

## Description

The `getMultilingualUrls` function generates a mapping of multilingual URLs by prefixing the given URL with each supported locale. It can handle both absolute and relative URLs, applying the appropriate locale prefix based on the provided configuration or defaults.

---

## Parameters

- `url: string`

  - **Description**: The original URL string to be prefixed with locales.
  - **Type**: `string`

- `locales: Locales[]`

  - **Description**: Optional array of supported locales. Defaults to the configured locales in the project.
  - **Type**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`

  - **Description**: The default locale for the application. Defaults to the configured default locale in the project.
  - **Type**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Description**: Whether to prefix the default locale. Defaults to the configured value in the project.
  - **Type**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Returns

- **Type**: `IConfigLocales<string>`
- **Description**: An object mapping each locale to its corresponding multilingual URL.

---

## Example Usage

### Relative URLs

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Edge Cases

- **No Locale Segment:**

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
// en: "/dashboard",
// fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Edge Cases

- **No Locale Segment:**

  - The function removes any existing locale segment from the URL before generating the multilingual mappings.

- **Default Locale:**

  - When `prefixDefault` is `false`, the function does not prefix the URL for the default locale.

- **Unsupported Locales:**
  - Only the locales provided in the `locales` array are considered for generating the URLs.

---

## Usage in Applications

In a multilingual application, configuring the internationalisation settings with `locales` and `defaultLocale` is critical for ensuring the correct language is displayed. Below is an example of how `getMultilingualUrls` can be used in an application setup:

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

module.exports = config;
```

The above configuration ensures that the application recognises `ENGLISH`, `FRENCH`, and `SPANISH` as supported languages and uses `ENGLISH` as the fallback language.

Using this configuration, the `getMultilingualUrls` function can dynamically generate multilingual URL mappings based on the application's supported locales:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Output:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

By integrating `getMultilingualUrls`, developers can maintain consistent URL structures across multiple languages, enhancing both user experience and SEO.

## Doc History

- 5.5.10 - 2025-06-29: Initial history
