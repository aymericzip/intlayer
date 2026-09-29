---
createdAt: 2025-08-23
updatedAt: 2026-09-27
priority: 5
title: getPathWithoutLocale Function Documentation | intlayer
description: "Use getPathWithoutLocale to remove the locale segment from a URL or pathname, for both absolute URLs and relative paths."
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
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
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

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```
