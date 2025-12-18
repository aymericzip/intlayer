---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleName Function Documentation | intlayer
description: See how to use the getLocaleName function for intlayer package
keywords:
  - getLocaleName
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
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Add polyfills for React Native and older environments
  - version: 5.5.10
    date: 2025-06-29
    changes: Initial history
---

# Documentation: `getLocaleName` Function in `intlayer`

## Description

The `getLocaleName` function returns the localised name of a given locale (`targetLocale`) in the display locale (`displayLocale`). If no `targetLocale` is provided, it returns the name of the `displayLocale` in its own language.

## Parameters

- `displayLocale: Locales`
  - **Description**: The locale in which the name of the target locale will be displayed.
  - **Type**: Enum or string representing valid locales.

- `targetLocale?: Locales`
  - **Description**: The locale whose name is to be localised.
  - **Type**: Optional. Enum or string representing valid locales.

## Returns

- **Type**: `string`
- **Description**: The localised name of the `targetLocale` in the `displayLocale`, or the `displayLocale`'s own name if `targetLocale` is not provided. If no translation is found, it returns `"Unknown locale"`.

## Example Usage

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Edge Cases

- **No `targetLocale` provided:**
  - The function defaults to returning the `displayLocale`'s own name.
- **Missing translations:**
  - If `localeNameTranslations` does not contain an entry for the `targetLocale` or the specific `displayLocale`, the function falls back to the `ownLocalesName` or returns `"Unknown locale"`.

## Polyfills for React Native and Older Environments

The `getLocaleName` function relies on the `Intl.DisplayNames` API, which is not available in React Native or older JavaScript environments. If you're using `getLocaleName` in these environments, you need to add polyfills.

Import the polyfills early in your application, ideally in your entry point file (e.g., `index.js`, `App.tsx`, or `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

For more details, see the [FormatJS polyfills documentation](https://formatjs.io/docs/polyfills/intl-displaynames/).
