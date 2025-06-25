---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getPathWithoutLocale Function Documentation | intlayer
description: See how to use the getPathWithoutLocale function for intlayer package
keywords:
  - getPathWithoutLocale
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description

Removes the locale segment from the given URL or pathname if present. It works with both absolute URLs and relative pathnames.

## Parameters

- `inputUrl: string`

  - **Description**: The complete URL string or pathname to process.
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: Optional array of supported locales. Defaults to the configured locales in the project.
  - **Type**: `Locales[]`

## Returns

- **Type**: `string`
- **Description**: The URL string or pathname without the locale segment.

## Example Usage

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```
