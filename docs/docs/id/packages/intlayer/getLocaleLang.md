---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getLocaleLang | intlayer
description: Lihat cara menggunakan fungsi getLocaleLang untuk paket intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getLocaleLang` di `intlayer`

## Deskripsi

Fungsi `getLocaleLang` mengekstrak kode bahasa dari string locale. Fungsi ini mendukung locale dengan atau tanpa kode negara. Jika locale tidak diberikan, secara default akan mengembalikan string kosong.

## Parameter

- `locale?: Locales`
  - **Deskripsi**: String locale (misalnya, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) dari mana kode bahasa diekstrak.
  - **Tipe**: `Locales` (opsional)

## Mengembalikan

- **Tipe**: `string`
- **Deskripsi**: Kode bahasa yang diekstrak dari locale. Jika locale tidak diberikan, fungsi mengembalikan string kosong (`''`).

## Contoh Penggunaan

### Mengekstrak Kode Bahasa:

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

## Kasus Tepi

- **Tidak Ada Locale yang Diberikan:**
  - Fungsi mengembalikan string kosong ketika `locale` adalah `undefined`.

- **String Locale yang Rusak:**
  - Jika `locale` tidak mengikuti format `language-country` (misalnya, `Locales.ENGLISH-US`), fungsi akan dengan aman mengembalikan bagian sebelum `'-'` atau seluruh string jika tidak ada `'-'`.
