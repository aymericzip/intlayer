---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Locale yang Salah Diambil dari URL
description: Pelajari cara memperbaiki locale yang salah diambil dari URL.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# Locale yang Salah Diambil dari URL

## Deskripsi Masalah

Saat mencoba mengakses parameter locale dari URL, Anda mungkin mengalami masalah di mana nilai locale yang didapatkan salah:

```js
const { locale } = await params;
console.log(locale); // mengembalikan "about" alih-alih locale yang diharapkan
```

## Solusi

### 1. Verifikasi Struktur File

Pastikan path router aplikasi Next.js Anda mengikuti struktur ini:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Periksa Konfigurasi Middleware

Masalah ini sering terjadi ketika middleware tidak ada atau tidak dijalankan. File middleware harus berada di:

```bash
src/middleware.ts
```

Middleware ini bertanggung jawab untuk menulis ulang rute ketika `prefixDefault` disetel ke `false`. Misalnya, ia menulis ulang `/en/about` menjadi `/about`.

### 3. Pola URL Berdasarkan Konfigurasi

#### Konfigurasi Default (`prefixDefault: false`, `noPrefix: false`)

- Bahasa Inggris: `/about`
- Bahasa Prancis: `/fr/about`
- Bahasa Spanyol: `/es/about`

#### Dengan `prefixDefault: true`

- Bahasa Inggris: `/en/about`
- Bahasa Prancis: `/fr/about`
- Bahasa Spanyol: `/es/about`

#### Dengan `noPrefix: true`

- Bahasa Inggris: `/about`
- Bahasa Prancis: `/about`
- Bahasa Spanyol: `/about`

Untuk detail lebih lanjut tentang opsi konfigurasi ini, lihat [Dokumentasi Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).
