---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: adaptor kompatibilitas untuk @nuxtjs/i18n"
description: "Pertahankan kode @nuxtjs/i18n Anda dan sajikan lewat Intlayer: pasang @intlayer/nuxt-i18n, buat alias untuk import, dan lihat apa yang diubah adaptor di balik layar."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# @intlayer/nuxt-i18n: adaptor kompatibilitas untuk @nuxtjs/i18n

Migrasi aplikasi Nuxt Anda dari `@nuxtjs/i18n` ke Intlayer adalah proses yang mulus menggunakan modul adapter Nuxt.

## Yang perlu dilakukan

Untuk menginisialisasi proyek, jalankan:

```bash
npx intlayer init --interactive
```

Ini akan menyiapkan `intlayer.config.ts`. Kemudian, tambahkan modul Nuxt Intlayer (misalnya `@intlayer/nuxt-i18n`) di array modules `nuxt.config.ts` Anda. Ini secara otomatis menerapkan konfigurasi kompatibilitas untuk aplikasi Anda.

## Yang terjadi di balik layar

`@nuxtjs/i18n` membungkus `vue-i18n` sambil menyediakan composable routing khusus Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Di balik layar:

- **Terjemahan:** Bergantung secara native pada lapisan kompatibilitas `@intlayer/vue-i18n` untuk semua tugas terjemahan string (mendukung sepenuhnya format `vue-i18n`, plural pipe, dan reaktivitas).
- **Routing:** Mencerminkan composable routing menggunakan helper URL yang dilokalisasi Intlayer.
- **Konfigurasi:** Membaca `availableLocales` dan pengaturan default langsung dari `intlayer.config.ts` Anda untuk mengkoordinasikan halaman Nuxt secara otomatis.

> Untuk memahami asal-usul pustaka-pustaka ini, baca sejarah i18n di JavaScript.

- [Sejarah i18n di JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
