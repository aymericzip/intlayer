---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Dokumentasi Fungsi getLocalizedPath | intlayer
description: Lihat cara menggunakan fungsi getLocalizedPath untuk paket intlayer
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "Mengimplementasikan penulisan ulang URL kustom"
author: aymericzip
---

# Dokumentasi: Fungsi `getLocalizedPath` di `intlayer`

## Deskripsi

Fungsi `getLocalizedPath` mengubah canonical path (path internal aplikasi) menjadi padanan yang dilokalkan berdasarkan locale dan aturan rewrite yang disediakan. Fungsi ini sangat berguna untuk menghasilkan URL ramah SEO yang berbeda menurut bahasa.

Ini adalah padanan relatif dari [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md) — untuk input relatif keduanya mengembalikan nilai yang sama. Tidak seperti `getLocalizedUrl`, ini tidak pernah mengembalikan URL absolut: konfigurasi `domains` diabaikan, jadi locale yang disajikan dari domain-nya sendiri masih menghasilkan path. Input absolut diterima, tetapi asal-usulnya dijatuhkan — hanya path, query string, dan hash yang dipertahankan.

**Fitur Utama:**

- Mendukung parameter route dinamis menggunakan sintaks `[param]`.
- Menyelesaikan path sesuai aturan rewrite kustom yang didefinisikan dalam konfigurasi proyek Anda.
- Secara otomatis menangani fallback ke canonical path jika tidak ada aturan rewrite yang ditemukan untuk locale yang ditentukan.

---

## Tanda Tangan Fungsi

```typescript
getLocalizedPath(
  canonicalPath: string,         // Wajib
  locale: Locales,               // Wajib
  rewriteRules?: RoutingConfig['rewrite'] // Opsional
): string
```

---

## Parameter

### Parameter Wajib

- `canonicalPath: string`
  - **Deskripsi**: Jalur internal aplikasi (mis. `/about`, `/product/[id]`).
  - **Tipe**: `string`
  - **Diperlukan**: Ya

### Parameter Opsional

- `locale?: Locales`
  - **Description**: Locale target untuk mana path harus dilokalisasi.
  - **Type**: `Locales`
  - **Default**: Locale default dari konfigurasi proyek Anda.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Deskripsi**: Objek yang mendefinisikan aturan rewrite kustom. Jika tidak diberikan, akan menggunakan properti `routing.rewrite` dari konfigurasi proyek Anda.
  - **Tipe**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — locale yang didukung. **Default**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — locale default. **Default**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — bagaimana locale muncul di path. **Default**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — custom rewrite rules. **Default**: `configuration.routing.rewrite`

---

## Pengembalian

- **Tipe**: `string`
- **Deskripsi**: Jalur yang telah dilokalkan untuk locale yang ditentukan.

Jenis ini disempitkan dari aturan rewrite yang dideklarasikan dalam konfigurasi Anda, sehingga editor menampilkan jalur yang diselesaikan daripada `string` biasa:

```typescript codeFormat="typescript"
// Konfigurasi: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (tidak ada aturan rewrite yang cocok, hanya prefix yang diterapkan)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Penyempitan yang sama mengalir ke dalam [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md), yang menerapkan aturan penulisan ulang sebelum memberi awalan locale.

Dua kasus tetap meluas menjadi `string`, karena tidak dapat diselesaikan pada waktu kompilasi:

- sebuah path yang bukan string literal (misalnya, yang dibangun dari variabel);
- sebuah path yang cocok dengan rule menggunakan parameter multi-segment atau opsional (`[...slug]`, `[[...slug]]`, `:param?`).

---

## Contoh Penggunaan

### Penggunaan Dasar (Dengan Konfigurasi)

Jika Anda telah mengonfigurasi rewrite kustom di `intlayer.config.ts` Anda:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Konfigurasi: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Keluaran: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Keluaran: "/about"
```

### Penggunaan dengan Rute Dinamis

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Konfigurasi: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Keluaran: "/produit/123"
```

### Aturan Rewrite Manual

Anda juga dapat memberikan aturan rewrite manual ke fungsi:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Keluaran: "/contactez-nous"
```

### Menghilangkan Locale

Ketika tidak ada locale yang diberikan, path dilokalisasi untuk locale default yang dikonfigurasi:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Konfigurasi: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

---

## Fungsi Terkait

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getCanonicalPath.md): Mengembalikan path yang dilokalkan ke canonical path internalnya.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md): Menghasilkan URL yang sepenuhnya dilokalkan (termasuk protokol, host, dan prefiks locale).
