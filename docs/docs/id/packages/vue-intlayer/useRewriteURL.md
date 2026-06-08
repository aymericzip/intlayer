---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Composable useRewriteURL
description: Composable khusus Vue untuk mengelola penulisan ulang URL yang dilokalkan di Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL Composable

Composable `useRewriteURL` untuk Vue 3 dirancang untuk menangani penulisan ulang URL yang dilokalkan di sisi klien. Ia secara otomatis memperbaiki URL di browser ke versi terlokalisasi yang "rapi" berdasarkan locale pengguna saat ini dan konfigurasi di `intlayer.config.ts`.

Ini bekerja dengan menggunakan `window.history.replaceState`, yang menghindari pemicu navigasi Vue Router yang tidak diinginkan.

## Penggunaan

Panggil composable ini di dalam fungsi `setup()` Anda atau di `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Secara otomatis mengoreksi /fr/tests menjadi /fr/essais di bilah alamat jika ada aturan rewrite
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Cara kerjanya

1. **Pemantauan Reaktif**: Composable memasang `watch` pada `locale` pengguna.
2. **Pencocokan Rewrite**: Setiap kali locale berubah (atau saat mount), ia memeriksa apakah `window.location.pathname` saat ini cocok dengan rute kanonis yang memiliki alias terlokalisasi yang lebih rapi.
3. **Koreksi URL**: Jika ditemukan alias yang lebih rapi, composable memanggil `window.history.replaceState` untuk memperbarui bilah alamat tanpa memuat ulang halaman atau kehilangan status router.

## Mengapa menggunakannya?

- **Optimisasi SEO**: Memastikan mesin pencari mengindeks versi lokal URL Anda yang bersifat otoritatif.
  /// **Peningkatan UX**: Memperbaiki URL yang dimasukkan secara manual agar mencerminkan penamaan yang Anda inginkan (misalnya, `/fr/a-propos` alih-alih `/fr/about`).
  /// **Overhead Rendah**: Memperbarui URL secara diam-diam tanpa memicu ulang lifecycle komponen atau navigation guards.
  ///
  ///

---
