---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari Vue I18n ke Intlayer"
description: "Pelajari cara migrasi aplikasi Vue Anda dari vue-i18n ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari Vue I18n ke Intlayer

Jika aplikasi Vue Anda saat ini menggunakan `vue-i18n`, Anda dapat migrasi ke Intlayer tanpa menulis ulang komponen atau hook terjemahan Anda. Intlayer menyediakan adapter kompatibilitas yang sempurna mencerminkan API `vue-i18n` sambil memanfaatkan fitur powerful Intlayer di balik layar.

## Yang perlu dilakukan

Untuk memulai, cukup jalankan perintah inisialisasi di proyek Anda:

```bash
npx intlayer init
```

Selama inisialisasi, Intlayer akan menyiapkan file konfigurasi Anda (`intlayer.config.ts`) dan mempersiapkan proyek Anda untuk migrasi. Anda hanya perlu menambahkan plugin Intlayer ke konfigurasi Vite Anda untuk secara otomatis mengaliaskan impor `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Yang terjadi di balik layar

`vueI18nVitePlugin` menyuntikkan alias modul ke bundler Anda. Setiap impor dari `vue-i18n` di codebase Anda akan secara transparan dialihkan ke `@intlayer/vue-i18n`.

**Di balik layar, adapter menangani sintaks `vue-i18n` yang kompleks secara native:**

- **Interpolasi & Plural:** Menyelesaikan interpolasi `{name}` dan daftar `{0}`. Plural pipe (`"car | cars"`) dikonversi menjadi node enumerasi/plural Intlayer berdasarkan semantik posisional.
- **Format:** Fungsi seperti `d()` dan `n()` membungkus `Intl` di balik layar, menghormati `datetimeFormats` dan `numberFormats` yang ditentukan dalam opsi Anda.
- **State Global & Lokal:** `global.locale` dipetakan ke `WritableComputedRef` yang didukung oleh klien Intlayer, sehingga reaktivitas berperilaku persis seperti yang diharapkan (misalnya `locale.value = 'fr'`).
- **Direktif:** Direktif `v-t` terdaftar dan berfungsi secara normal.

Aplikasi Anda terus merender persis seperti sebelumnya, tetapi kontennya didukung oleh kamus Intlayer Anda, memberikan keamanan tipe, optimasi bundle yang lebih baik, dan integrasi CMS yang mulus.
