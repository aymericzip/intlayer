---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentasi Hook useRewriteURL
description: Hook khusus Next.js untuk mengelola rewrite URL yang dilokalkan dalam Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` untuk Next.js adalah sebuah hook sisi-klien yang secara otomatis mengelola rewrite URL yang dilokalkan. Hook ini memastikan bahwa URL di browser selalu mencerminkan jalur terlokalisasi yang "pretty" yang didefinisikan di `intlayer.config.ts` Anda, bahkan jika pengguna secara manual mengetik jalur kanonik dengan prefix locale.

Hook ini bekerja secara diam-diam dengan menggunakan `window.history.replaceState`, menghindari navigasi router Next.js yang berulang atau penyegaran halaman.

## Penggunaan

Cukup panggil hook ini di Client Component yang merupakan bagian dari layout Anda.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Otomatis memperbaiki /fr/privacy-notice menjadi /fr/politique-de-confidentialite di bilah alamat
  useRewriteURL();

  return null;
};
```

## Cara kerjanya

1. **Pemantauan Path**: Hook mendengarkan perubahan pada `locale` pengguna.
2. **Deteksi Rewrite**: Memeriksa `window.location.pathname` saat ini terhadap aturan rewrite di konfigurasi Anda.
3. **Koreksi URL**: Jika ditemukan alias lokal yang lebih cantik untuk path saat ini, hook akan memicu `window.history.replaceState` untuk memperbarui bilah alamat sambil menjaga pengguna tetap berada di halaman internal yang sama.

## Mengapa menggunakannya di Next.js?

Sementara `intlayerMiddleware` menangani rewrite sisi-server dan redirect awal, hook `useRewriteURL` memastikan URL di browser tetap konsisten dengan struktur SEO pilihan Anda bahkan setelah transisi sisi-klien.

- **URL Bersih**: Menerapkan penggunaan segmen terlokalisasi seperti `/fr/essais` alih-alih `/fr/tests`.
- **Performa**: Memperbarui bilah alamat tanpa memicu siklus router penuh atau pengambilan ulang data.
- **Keselarasan SEO**: Mencegah masalah konten duplikat dengan memastikan hanya satu versi URL yang terlihat oleh pengguna dan bot mesin pencari.
