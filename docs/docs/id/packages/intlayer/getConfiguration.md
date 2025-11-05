---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getConfiguration | intlayer
description: Lihat cara menggunakan fungsi getConfiguration untuk paket intlayer
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getConfiguration` dalam `intlayer`

## Deskripsi

Fungsi `getConfiguration` mengambil seluruh konfigurasi untuk aplikasi `intlayer` dengan mengekstrak variabel lingkungan. Fungsi ini memberikan fleksibilitas untuk menggunakan konfigurasi yang sama di sisi klien dan server, memastikan konsistensi di seluruh aplikasi.

---

## Parameter

Fungsi ini tidak menerima parameter apa pun. Sebagai gantinya, fungsi ini menggunakan variabel lingkungan untuk konfigurasi.

### Pengembalian

- **Tipe**: `IntlayerConfig`
- **Deskripsi**: Sebuah objek yang berisi konfigurasi lengkap untuk `intlayer`. Konfigurasi tersebut mencakup bagian-bagian berikut:
  - `internationalization`: Pengaturan terkait locale dan mode ketat.
  - `middleware`: Pengaturan terkait manajemen URL dan cookie.
  - `content`: Pengaturan terkait file konten, direktori, dan pola.
  - `editor`: Konfigurasi spesifik untuk editor.

Lihat [dokumentasi konfigurasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk detail lebih lanjut.

---

## Contoh Penggunaan

### Mengambil Konfigurasi Lengkap

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Mengambil `availableLocales` dan `defaultLocale`

Bagian `internationalization` dari konfigurasi menyediakan pengaturan terkait locale seperti `locales` (locale yang tersedia) dan `defaultLocale` (bahasa fallback).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Contoh output: ["en", "fr", "es"]
console.log(defaultLocale); // Contoh output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Contoh output: ["en", "fr", "es"]
console.log(defaultLocale); // Contoh output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Contoh output: ["en", "fr", "es"]
console.log(defaultLocale); // Contoh output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Catatan

- Pastikan semua variabel lingkungan yang diperlukan sudah diatur dengan benar sebelum memanggil fungsi ini. Variabel yang hilang akan menyebabkan kesalahan saat inisialisasi.
- Fungsi ini dapat digunakan di sisi klien maupun server, menjadikannya alat yang serbaguna untuk mengelola konfigurasi secara terpadu.

## Penggunaan dalam Aplikasi

Fungsi `getConfiguration` adalah utilitas utama untuk menginisialisasi dan mengelola konfigurasi aplikasi `intlayer`. Dengan menyediakan akses ke pengaturan seperti locales, middleware, dan direktori konten, fungsi ini memastikan konsistensi dan skalabilitas di seluruh aplikasi multibahasa dan berbasis konten.
