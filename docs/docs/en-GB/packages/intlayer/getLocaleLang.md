---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleLang Function Documentation | intlayer
description: See how to use the getLocaleLang function for intlayer package
keywords:
  - getLocaleLang
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getLocaleLang` Function in `intlayer`

## Description

The `getLocaleLang` function extracts the language code from a locale string. It supports locales with or without country codes. If no locale is provided, it defaults to returning an empty string.

## Parameters

- `locale?: Locales`

  - **Description**: The locale string (e.g., `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) from which the language code is extracted.
  - **Type**: `Locales` (optional)

## Returns

- **Type**: `string`
- **Description**: The language code extracted from the locale. If the locale is not provided, it returns an empty string (`''`).

## Example Usage

### Extracting Language Codes:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

## Edge Cases

- **No Locale Provided:**

  - The function returns an empty string when `locale` is `undefined`.

- **Malformed Locale Strings:**
  - If the `locale` does not follow the `language-country` format (e.g., `Locales.ENGLISH-US`), the function safely returns the part before `'-'` or the entire string if no `'-'` is present.
