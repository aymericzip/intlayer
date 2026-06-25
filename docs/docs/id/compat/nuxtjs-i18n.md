---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari NuxtJS I18n ke Intlayer"
description: "Pelajari cara migrasi aplikasi Nuxt.js Anda dari @nuxtjs/i18n ke Intlayer menggunakan adapter kompatibilitas."
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

# Migrasi dari NuxtJS I18n ke Intlayer

Migrasi aplikasi Nuxt Anda dari `@nuxtjs/i18n` ke Intlayer adalah proses yang mulus menggunakan modul adapter Nuxt.

## Yang perlu dilakukan

Untuk menginisialisasi proyek, jalankan:

```bash
npx intlayer init
```

Ini akan menyiapkan `intlayer.config.ts`. Kemudian, tambahkan modul Nuxt Intlayer (misalnya `@intlayer/nuxt-i18n`) di array modules `nuxt.config.ts` Anda. Ini secara otomatis menerapkan konfigurasi kompatibilitas untuk aplikasi Anda.

## Yang terjadi di balik layar

`@nuxtjs/i18n` membungkus `vue-i18n` sambil menyediakan composable routing khusus Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Di balik layar:

- **Terjemahan:** Bergantung secara native pada lapisan kompatibilitas `@intlayer/vue-i18n` untuk semua tugas terjemahan string (mendukung sepenuhnya format `vue-i18n`, plural pipe, dan reaktivitas).
- **Routing:** Mencerminkan composable routing menggunakan helper URL yang dilokalisasi Intlayer.
- **Konfigurasi:** Membaca `availableLocales` dan pengaturan default langsung dari `intlayer.config.ts` Anda untuk mengkoordinasikan halaman Nuxt secara otomatis.
