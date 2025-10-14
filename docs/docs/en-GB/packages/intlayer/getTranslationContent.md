---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: getTranslation Function - Intlayer JavaScript Documentation
description: Documentation for the getTranslation function in Intlayer, which retrieves localized content for specific locales with fallback to default locale.
keywords:
  - getTranslation
  - intlayer
  - function
  - localization
  - i18n
  - JavaScript
  - translation
  - locale
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initial history
---

# Documentation: `getTranslation` Function in `intlayer`

## Description

The `getTranslation` function retrieves the content corresponding to a specific locale from a set of customisable language content. If the specified locale is not found, it defaults to returning the content for the default locale configured in the project.

The `getTranslation` function retrieves the content corresponding to a specific locale from a set of customisable language content. If the specified locale is not found, it defaults to returning the content for the default locale configured in the project.

## Parameters

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: An object containing translations for various locales. Each key represents a locale, and its value is the corresponding content.
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content` can be any type, defaulting to `string`.

- `locale: Locales`

  - **Description**: The locale for which content is to be retrieved.
  - **Type**: `Locales`

## Returns

- **Type**: `Content`
- **Description**: The content corresponding to the specified locale. If the locale is not found, the content of the default locale is returned.

## Example Usage

### Basic Usage

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Missing Locale:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (default locale content)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (default locale content)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (default locale content)
```

### Using Custom Content Types:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Edge Cases

- **Locale Not Found:**
  - When the `locale` is not found in the `languageContent`, the function returns the content for the default locale.
- **Incomplete Language Content:**
  - If a locale is partially defined, the function does not merge contents. It strictly retrieves the value of the specified locale or falls back to the default.
- \*\*TypeScript Enforcement::
  - If the locales in `languageContent` do not match the project configuration, TypeScript will enforce all required locales to be defined, ensuring the content is complete and type-safe.
