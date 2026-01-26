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
    changes: Mengimplementasikan penulisan ulang URL kustom
---

# Dokumentasi: Fungsi `getLocalizedPath` di `intlayer`

## Deskripsi

Fungsi `getLocalizedPath` mengubah canonical path (path internal aplikasi) menjadi padanan yang dilokalkan berdasarkan locale dan aturan rewrite yang disediakan. Fungsi ini sangat berguna untuk menghasilkan URL ramah SEO yang berbeda menurut bahasa.

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

- `locale: Locales`
  - **Deskripsi**: Locale target yang akan digunakan untuk melokalkan jalur.
  - **Tipe**: `Locales`
  - **Diperlukan**: Ya

### Parameter Opsional

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Deskripsi**: Objek yang mendefinisikan aturan rewrite kustom. Jika tidak diberikan, akan menggunakan properti `routing.rewrite` dari konfigurasi proyek Anda.
  - **Tipe**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

---

## Pengembalian

- **Tipe**: `string`
- **Deskripsi**: Jalur yang telah dilokalkan untuk locale yang ditentukan.

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

---

## Fungsi Terkait

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getCanonicalPath.md): Mengembalikan path yang dilokalkan ke canonical path internalnya.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md): Menghasilkan URL yang sepenuhnya dilokalkan (termasuk protokol, host, dan prefiks locale).
