---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Dokumentasi Fungsi getCanonicalPath | intlayer
description: Pelajari cara menggunakan fungsi getCanonicalPath untuk paket intlayer
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Dokumentasi: Fungsi `getCanonicalPath` di `intlayer`

## Deskripsi

Fungsi `getCanonicalPath` mengonversi path URL yang dilokalkan (mis. `/a-propos`) kembali ke path kanonik internal aplikasi (mis. `/about`). Ini penting agar router dapat mencocokkan rute internal yang benar terlepas dari bahasa pada URL.

**Fitur Utama:**

- Mendukung parameter rute dinamis menggunakan sintaks `[param]`.
- Mencocokkan path yang dilokalkan dengan aturan rewrite kustom yang didefinisikan dalam konfigurasi Anda.
- Mengembalikan path asli jika tidak ditemukan aturan rewrite yang cocok.

---

## Tanda Tangan Fungsi

```typescript
getCanonicalPath(
  localizedPath: string,         // Diperlukan
  locale: Locales,               // Diperlukan
  rewriteRules?: RoutingConfig['rewrite'] // Opsional
): string
```

---

## Parameter

### Parameter Wajib

- `localizedPath: string`
  - **Deskripsi**: Jalur yang dilokalkan sebagaimana terlihat di browser (mis. `/a-propos`).
  - **Tipe**: `string`
  - **Diperlukan**: Ya

- `locale: Locales`
  - **Deskripsi**: Locale yang digunakan untuk jalur yang sedang di-resolve.
  - **Tipe**: `Locales`
  - **Diperlukan**: Ya

### Parameter Opsional

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Deskripsi**: Objek yang mendefinisikan aturan rewrite kustom. Jika tidak disediakan, akan default ke properti `routing.rewrite` dari konfigurasi proyek Anda.
  - **Tipe**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

---

## Pengembalian

- **Tipe**: `string`
- **Deskripsi**: Jalur kanonis internal.

---

## Contoh Penggunaan

### Penggunaan Dasar (Dengan Konfigurasi)

Jika Anda telah mengonfigurasi rewrite kustom di `intlayer.config.ts` Anda:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfigurasi: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Keluaran: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Keluaran: "/about"
```

### Penggunaan dengan Rute Dinamis

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfigurasi: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Keluaran: "/product/123"
```

### Aturan Rewrite Manual

Anda juga dapat memberikan aturan rewrite manual ke fungsi:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Keluaran: "/contact"
```

---

## Fungsi Terkait

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedPath.md): Menyelesaikan path kanonis menjadi padanan lokalnya.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md): Menghasilkan URL yang sepenuhnya dilokalkan (termasuk protokol, host, dan prefix locale).
