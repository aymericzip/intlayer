---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getPathWithoutLocale | intlayer
description: Lihat cara menggunakan fungsi getPathWithoutLocale untuk paket intlayer
keywords:
  - getPathWithoutLocale
  - terjemahan
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
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
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getPathWithoutLocale` di `intlayer`

## Deskripsi

Menghapus segmen locale dari URL atau pathname yang diberikan jika ada. Fungsi ini bekerja dengan URL absolut maupun pathname relatif.

## Parameter

- `inputUrl: string`
  - **Deskripsi**: String URL lengkap atau pathname yang akan diproses.
  - **Tipe**: `string`

- `locales: Locales[]`
  - **Deskripsi**: Array opsional dari locale yang didukung. Default-nya adalah locale yang dikonfigurasi dalam proyek.
  - **Tipe**: `Locales[]`

## Mengembalikan

- **Tipe**: `string`
- **Deskripsi**: String URL atau pathname tanpa segmen locale.

## Contoh Penggunaan

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```
