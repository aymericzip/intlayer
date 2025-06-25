---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getHTMLTextDir Function Documentation | intlayer
description: See how to use the getHTMLTextDir function for intlayer package
keywords:
  - getHTMLTextDir
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getHTMLTextDir` Function in `intlayer`

## Description

The `getHTMLTextDir` function determines the text direction (`ltr`, `rtl`, or `auto`) based on the provided locale. It is designed to help developers set the `dir` attribute in HTML for proper text rendering.

## Parameters

- `locale?: Locales`

  - **Description**: The locale string (e.g., `Locales.ENGLISH`, `Locales.ARABIC`) used to determine the text direction.
  - **Type**: `Locales` (optional)

## Returns

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: The text direction corresponding to the locale:
  - `'ltr'` for left-to-right languages.
  - `'rtl'` for right-to-left languages.
  - `'auto'` if the locale is not recognized.

## Example Usage

### Determining Text Direction

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Edge Cases

- **No Locale Provided:**

  - The function returns `'auto'` when `locale` is `undefined`.

- **Unrecognized Locale:**
  - For unrecognized locales, the function defaults to `'auto'`.

## Usage in Components:

The `getHTMLTextDir` function can be used to dynamically set the `dir` attribute in an HTML document for proper text rendering based on the locale.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

In the example above, the `dir` attribute is dynamically set based on the locale.
