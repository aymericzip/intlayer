---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: getLocale function documentation | intlayer
description: See how to use the getLocale function for the intlayer package
keywords:
  - getLocale
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# getLocale function documentation

The `getLocale` function allows you to detect the locale from a given string, such as a URL or path.

## Usage

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Parameters

| Parameter | Type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| `path`    | `string` | The path or string from which to extract the locale. |

## Returns

The detected locale, or the default locale if none is detected.
