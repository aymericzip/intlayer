---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: validatePrefix Function Documentation | intlayer
description: See how to use the validatePrefix function for the intlayer package.
keywords:
  - validatePrefix
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initial documentation
---

# validatePrefix Function Documentation

The `validatePrefix` function checks if a given prefix is a valid locale prefix according to the configuration.

## Usage

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `prefix`  | `string` | The prefix to validate. |

## Returns

`true` if the prefix is valid, `false` otherwise.
