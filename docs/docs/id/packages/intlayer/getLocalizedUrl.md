---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getLocalizedUrl | intlayer
description: Lihat cara menggunakan fungsi getLocalizedUrl untuk paket intlayer
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getLocalizedUrl` di `intlayer`

## Deskripsi

Fungsi `getLocalizedUrl` menghasilkan URL yang dilokalisasi dengan menambahkan prefix locale yang ditentukan pada URL yang diberikan. Fungsi ini menangani URL absolut maupun relatif, memastikan bahwa prefix locale yang benar diterapkan berdasarkan konfigurasi.

**Fitur Utama:**

- Hanya 2 parameter yang diperlukan: `url` dan `currentLocale`
- 3 parameter opsional: `locales`, `defaultLocale`, dan `prefixDefault`
- Menggunakan konfigurasi internasionalisasi proyek Anda sebagai default
- Dapat digunakan dengan parameter minimal untuk kasus sederhana atau dikustomisasi sepenuhnya untuk skenario kompleks

---

## Tanda Tangan Fungsi

```typescript
getLocalizedUrl(
  url: string,                   // Wajib
  currentLocale: Locales,        // Wajib
  locales?: Locales[],           // Opsional
  defaultLocale?: Locales,       // Opsional
  prefixDefault?: boolean        // Opsional
): string
```

---

## Parameter

### Parameter Wajib

- `url: string`
  - **Deskripsi**: String URL asli yang akan diberi prefix locale.
  - **Tipe**: `string`
  - **Wajib**: Ya

- `currentLocale: Locales`
  - **Deskripsi**: Locale saat ini yang digunakan untuk melokalisasi URL.
  - **Tipe**: `Locales`
  - **Wajib**: Ya

### Parameter Opsional

- `locales?: Locales[]`
  - **Deskripsi**: Array locale yang didukung. Jika tidak disediakan, menggunakan locale yang dikonfigurasi dari konfigurasi proyek Anda.
  - **Tipe**: `Locales[]`
  - **Wajib**: Tidak (Opsional)
  - **Default**: [`Konfigurasi Proyek`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)

- `defaultLocale?: Locales`
  - **Deskripsi**: Locale default untuk aplikasi. Jika tidak disediakan, menggunakan locale default yang dikonfigurasi dari konfigurasi proyek Anda.
  - **Tipe**: `Locales`
  - **Wajib**: Tidak (Opsional)
  - **Default**: [`Konfigurasi Proyek`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)

- `prefixDefault?: boolean`
  - **Deskripsi**: Apakah akan menambahkan prefix pada URL untuk locale default. Jika tidak disediakan, menggunakan nilai yang dikonfigurasi dari konfigurasi proyek Anda.
  - **Tipe**: `boolean`
  - **Wajib**: Tidak (Opsional)
  - **Default**: [`Konfigurasi Proyek`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)

### Mengembalikan

- **Tipe**: `string`
- **Deskripsi**: URL yang sudah dilokalisasi untuk locale yang ditentukan.

---

## Contoh Penggunaan

### Penggunaan Dasar (Hanya Parameter Wajib)

Ketika Anda telah mengonfigurasi proyek Anda dengan pengaturan internasionalisasi, Anda dapat menggunakan fungsi ini hanya dengan parameter yang wajib:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Menggunakan konfigurasi proyek Anda untuk locales, defaultLocale, dan prefixDefault
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (asumsi Bahasa Perancis didukung dalam konfigurasi Anda)

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" atau "/en/about" (tergantung pada pengaturan prefixDefault Anda)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Menggunakan konfigurasi proyek Anda
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Menggunakan konfigurasi proyek Anda
getLocalizedUrl("/about", Locales.FRENCH);
typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Secara eksplisit memberikan semua parameter opsional
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Output: "/fr/about" untuk locale Bahasa Perancis
// Output: "/about" untuk locale default (Bahasa Inggris)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Secara eksplisit memberikan semua parameter opsional
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Output: "/fr/about" untuk locale Bahasa Perancis
// Output: "/about" untuk locale default (Bahasa Inggris)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Secara eksplisit memberikan semua parameter opsional
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Output: "/fr/about" untuk locale Bahasa Perancis
// Output: "/about" untuk locale default (Bahasa Inggris)
```

### Partial Configuration Override

Anda juga dapat memberikan hanya beberapa parameter opsional. Fungsi akan menggunakan konfigurasi proyek Anda untuk parameter yang tidak Anda tentukan:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Hanya override locales, gunakan konfigurasi proyek untuk defaultLocale dan prefixDefault
getLocalizedUrl(
  "/about",
  Locales.SPANISH,
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH] // Hanya tentukan locales
);

// Hanya override prefixDefault, gunakan konfigurasi proyek untuk locales dan defaultLocale
getLocalizedUrl(
  "/about",
  Locales.ENGLISH,
  undefined, // Gunakan konfigurasi proyek untuk locales
  undefined, // Gunakan konfigurasi proyek untuk defaultLocale
  true // Paksa prefix untuk locale default
);
```

### URL Absolut

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Saat Ini
  [Locales.ENGLISH, Locales.FRENCH], // Locale yang Didukung
  Locales.ENGLISH, // Locale Default
  false // Prefix Locale Default
); // Output: "https://example.com/fr/about" untuk bahasa Perancis

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Saat Ini
  [Locales.ENGLISH, Locales.FRENCH], // Locale yang Didukung
  Locales.ENGLISH, // Locale Default
  false // Prefix Locale Default
); // Output: "https://example.com/about" untuk bahasa Inggris

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Saat Ini
  [Locales.ENGLISH, Locales.FRENCH], // Locale yang Didukung
  Locales.ENGLISH, // Locale Default
  true // Prefix Locale Default
); // Output: "https://example.com/en/about" untuk bahasa Inggris
```

### Locale Tidak Didukung

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Saat Ini
  [Locales.ENGLISH, Locales.FRENCH], // Locale yang Didukung
  Locales.ENGLISH // Locale Default
); // Output: "/about" (tidak ada prefix yang diterapkan untuk locale yang tidak didukung)
```

---

## Kasus Tepi

- **Tidak Ada Segmen Locale:**
  - Jika URL tidak mengandung segmen locale, fungsi dengan aman menambahkan prefix locale yang sesuai.

- **Locale Default:**
  - Ketika `prefixDefault` adalah `false`, fungsi tidak menambahkan prefix pada URL untuk locale default.

- **Locale Tidak Didukung:**
  - Untuk locale yang tidak tercantum dalam `locales`, fungsi tidak menerapkan prefix apapun.

---

## Penggunaan dalam Aplikasi

Dalam aplikasi multibahasa, mengonfigurasi pengaturan internasionalisasi dengan `locales` dan `defaultLocale` sangat penting untuk memastikan bahasa yang benar ditampilkan. Berikut adalah contoh bagaimana `getLocalizedUrl` dapat digunakan dalam pengaturan aplikasi:

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
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Konfigurasi di atas memastikan bahwa aplikasi mengenali `ENGLISH`, `FRENCH`, dan `SPANISH` sebagai bahasa yang didukung dan menggunakan `ENGLISH` sebagai bahasa cadangan.

Dengan menggunakan konfigurasi ini, fungsi `getLocalizedUrl` dapat secara dinamis menghasilkan URL yang dilokalkan berdasarkan preferensi bahasa pengguna:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

Dengan mengintegrasikan `getLocalizedUrl`, pengembang dapat mempertahankan struktur URL yang konsisten di berbagai bahasa, meningkatkan pengalaman pengguna sekaligus SEO.
