---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getMultilingualUrls | intlayer
description: Lihat cara menggunakan fungsi getMultilingualUrls untuk paket intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getMultilingualUrls` di `intlayer`

## Deskripsi

Fungsi `getMultilingualUrls` menghasilkan pemetaan URL multibahasa dengan menambahkan prefix locale yang didukung pada URL yang diberikan. Fungsi ini dapat menangani URL absolut maupun relatif, dengan menerapkan prefix locale yang sesuai berdasarkan konfigurasi yang diberikan atau nilai default.

---

## Parameter

- `url: string`
  - **Deskripsi**: String URL asli yang akan diberi prefix locale.
  - **Tipe**: `string`

- `locales: Locales[]`
  - **Deskripsi**: Array opsional dari locale yang didukung. Defaultnya adalah locale yang dikonfigurasi dalam proyek.
  - **Tipe**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`
  - **Deskripsi**: Locale default untuk aplikasi. Defaultnya adalah locale default yang dikonfigurasi dalam proyek.
  - **Tipe**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Deskripsi**: Apakah akan menambahkan prefix pada locale default. Defaultnya adalah nilai yang dikonfigurasi dalam proyek.
  - **Tipe**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Mengembalikan

- **Tipe**: `IConfigLocales<string>`
- **Deskripsi**: Objek yang memetakan setiap locale ke URL multibahasa yang sesuai.

---

## Contoh Penggunaan

### URL Relatif

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL Absolut

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Kasus Tepi

- **Tidak Ada Segmen Locale:**
  - Fungsi menghapus segmen locale yang sudah ada dari URL sebelum menghasilkan pemetaan multibahasa.

- **Locale Default:**
  - Ketika `prefixDefault` adalah `false`, fungsi tidak menambahkan prefix pada URL untuk locale default.

- **Locale yang Tidak Didukung:**
  - Hanya locale yang disediakan dalam array `locales` yang dipertimbangkan untuk menghasilkan URL.

---

## Penggunaan dalam Aplikasi

Dalam aplikasi multibahasa, mengonfigurasi pengaturan internasionalisasi dengan `locales` dan `defaultLocale` sangat penting untuk memastikan bahasa yang benar ditampilkan. Berikut adalah contoh bagaimana `getMultilingualUrls` dapat digunakan dalam pengaturan aplikasi:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfigurasi untuk locale yang didukung dan locale default
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfigurasi untuk locale yang didukung dan locale default
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfigurasi untuk locale yang didukung dan locale default
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;

module.exports = config;
```

Konfigurasi di atas memastikan bahwa aplikasi mengenali `ENGLISH`, `FRENCH`, dan `SPANISH` sebagai bahasa yang didukung dan menggunakan `ENGLISH` sebagai bahasa fallback.

Dengan menggunakan konfigurasi ini, fungsi `getMultilingualUrls` dapat secara dinamis menghasilkan pemetaan URL multibahasa berdasarkan locale yang didukung oleh aplikasi:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Output:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Dengan mengintegrasikan `getMultilingualUrls`, pengembang dapat mempertahankan struktur URL yang konsisten di berbagai bahasa, meningkatkan pengalaman pengguna sekaligus SEO.
