---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Fungsi getLocale | intlayer
description: Lihat cara menggunakan fungsi getLocale untuk paket intlayer
keywords:
  - getLocale
  - terjemahan
  - Intlayer
  - intlayer
  - Internationalization
  - Dokumentasi
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

# Dokumentasi Fungsi getLocale

Fungsi `getLocale` memungkinkan Anda mendeteksi locale dari string yang diberikan, seperti URL atau path.

## Penggunaan

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Parameter

| Parameter | Tipe     | Deskripsi                                           |
| --------- | -------- | --------------------------------------------------- |
| `path`    | `string` | Jalur atau string untuk mengekstrak locale darinya. |

## Pengembalian

Locale yang terdeteksi, atau locale default jika tidak ada locale yang terdeteksi.
