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
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Dokumentasi: Fungsi `getMultilingualUrls` di `intlayer`

## Deskripsi

Fungsi `getMultilingualUrls` menghasilkan pemetaan URL multibahasa dengan menambahkan prefix locale yang didukung pada URL yang diberikan. Fungsi ini dapat menangani URL absolut maupun relatif, dengan menerapkan prefix locale yang sesuai berdasarkan konfigurasi yang diberikan atau nilai default.

---

## Tanda Tangan Fungsi

```typescript
getMultilingualUrls(
  url: string,                   // Wajib
  options?: {                    // Opsional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Parameter

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

### Parameter Opsional

- `options?: object`
  - **Description**: Objek konfigurasi untuk perilaku lokalisasi URL.
  - **Type**: `object`
  - **Required**: No (Opsional)

  - `options.locales?: Locales[]`
    - **Description**: Array dari locale yang didukung. Jika tidak disediakan, menggunakan locale yang dikonfigurasi dari konfigurasi proyek Anda.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Locale default untuk aplikasi. Jika tidak disediakan, menggunakan locale default yang dikonfigurasi dari konfigurasi proyek Anda.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Mode routing URL untuk penanganan locale. Jika tidak disediakan, menggunakan mode yang dikonfigurasi dari konfigurasi proyek Anda.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Tidak ada prefix untuk locale default, prefix untuk semua yang lain
      - `prefix-all`: Prefix untuk semua locale termasuk default
      - `no-prefix`: Tidak ada prefix locale dalam URL
      - `search-params`: Gunakan query parameters untuk locale (misalnya, `?locale=fr`)

### Mengembalikan

- **Tipe**: `IConfigLocales<string>`
- **Deskripsi**: Objek yang memetakan setiap locale ke URL multibahasa yang sesuai.

---

## Contoh Penggunaan

### Penggunaan Dasar (Menggunakan Konfigurasi Proyek)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Menggunakan konfigurasi proyek Anda untuk locales, defaultLocale, dan mode
getMultilingualUrls("/dashboard");
// Output (dengan asumsi konfigurasi proyek memiliki en, fr dengan mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL Relatif

```typescript codeFormat={["typescript", "esm", "commonjs"]}
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

### Mode Routing Berbeda

```typescript
// prefix-no-default: Tidak ada prefix untuk locale default
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Prefix untuk semua locale
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Tidak ada prefix locale dalam URL
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale sebagai query parameter
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
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

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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
