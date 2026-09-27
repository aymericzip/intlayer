---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Dokumentasi Fungsi validatePrefix | intlayer
description: "Gunakan validatePrefix untuk memeriksa apakah segmen URL adalah prefiks locale yang valid menurut konfigurasi Intlayer Anda."
keywords:
  - validatePrefix
  - terjemahan
  - Intlayer
  - intlayer
  - Internationalization
  - Dokumentasi
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Dokumentasi Fungsi validatePrefix

Fungsi `validatePrefix` memeriksa apakah prefix yang diberikan adalah prefix locale yang valid sesuai konfigurasi.

## Penggunaan

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Parameter

| Parameter | Tipe     | Deskripsi                    |
| --------- | -------- | ---------------------------- |
| `prefix`  | `string` | Prefix yang akan divalidasi. |

## Mengembalikan

`true` jika prefix valid, `false` jika tidak.
