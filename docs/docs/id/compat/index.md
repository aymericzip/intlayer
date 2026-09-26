---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
title: "Adapter Kompatibilitas Intlayer"
description: "Migrasikan solusi i18n Anda yang sudah ada ke Intlayer tanpa hambatan menggunakan adapter kompatibilitas."
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Adapter Kompatibilitas Intlayer

Migrasi aplikasi besar ke library internasionalisasi baru bisa terasa berat. Untuk memudahkan transisi ini, Intlayer menyediakan **adapter kompatibilitas** untuk library i18n paling populer dalam ekosistem.

Paket adapter ini mengekspos **API publik yang sama persis** dengan library i18n Anda yang sudah ada, namun mendelegasikan semua pekerjaan terjemahan ke Intlayer saat runtime.

## Cara kerjanya

Ketika Anda menggunakan adapter kompatibilitas, Anda tidak perlu menulis ulang impor aplikasi atau mengubah cara Anda menggunakan hook dan komponen terjemahan. Sebagai gantinya, plugin bundler Intlayer secara otomatis mengaliaskan impor yang ada ke paket kompatibilitas Intlayer.

Sebagai contoh, seorang pengembang mengganti `import { useTranslation } from 'react-i18next'` dengan `import { useTranslation } from '@intlayer/react-i18next'` (dilakukan secara otomatis melalui plugin bundler), dan aplikasi terus bekerja dengan terjemahan yang kini disajikan dari kamus Intlayer. Kunci juga diketik terhadap kamus Intlayer Anda!

## Adapter Kompatibilitas yang Tersedia

Pilih library Anda yang sudah ada di bawah ini untuk melihat cara migrasi secara mulus:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md)
