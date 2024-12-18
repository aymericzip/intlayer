# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description:

The `getLocalizedUrl` function generates a localized URL by prefixing the given URL with the specified locale. It handles both absolute and relative URLs, ensuring that the correct locale prefix is applied based on the configuration.

---

## Parameters:

- `url: string`

  - **Description**: The original URL string to be prefixed with a locale.
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: The current locale for which the URL is being localized.
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: Optional array of supported locales. By defaults, the configured locales in the project are provided.
  - **Type**: `Locales[]`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: The default locale for the application. By defaults, the configured default locale in the project are provided.
  - **Type**: `Locales`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: Whether to prefix the URL for the default locale. By defaults, the configured value in the project are provided.
  - **Type**: `boolean`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md#middleware)

### Returns:

- **Type**: `string`
- **Description**: The localized URL for the specified locale.

---

## Example Usage:

### Relative URLs:

```typescript
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

### Absolute URLs:

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

### Unsupported Locale:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Current Locale
  [Locales.ENGLISH, Locales.FRENCH], // Supported Locales
  Locales.ENGLISH // Default Locale
); // Output: "/about" (no prefix applied for unsupported locale)
```

---

## Edge Cases:

- **No Locale Segment:**

  - If the URL does not contain any locale segment, the function safely prefixes the appropriate locale.

- **Default Locale:**

  - When `prefixDefault` is `false`, the function does not prefix the URL for the default locale.

- **Unsupported Locales:**
  - For locales not listed in `locales`, the function does not apply any prefix.

---

## Usage in Applications:

In a multilingual application, configuring the internationalization settings with `locales` and `defaultLocale` is critical for ensuring the correct language is displayed. Below is an example of how `getLocalizedUrl` can be used in an application setup:

```tsx
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

Using this configuration, the `getLocalizedUrl` function can dynamically generate localized URLs based on the user's language preference:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

By integrating `getLocalizedUrl`, developers can maintain consistent URL structures across multiple languages, enhancing both user experience and SEO.
