---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket vue-intlayer
description: Integrasi khusus Vue untuk Intlayer, menyediakan plugin dan composable untuk aplikasi Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket vue-intlayer

Paket `vue-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Vue. Paket ini mencakup plugin Vue dan composable untuk menangani konten multibahasa.

## Instalasi

```bash
npm install vue-intlayer
```

## Ekspor

### Plugin

| Fungsi            | Deskripsi                                              |
| ----------------- | ------------------------------------------------------ |
| `installIntlayer` | Plugin Vue untuk menginstal Intlayer di aplikasi Anda. |

### Composables

| Composable      | Deskripsi                                                          |
| --------------- | ------------------------------------------------------------------ |
| `useIntlayer`   | Memilih satu kamus berdasarkan kuncinya dan mengembalikan isinya.  |
| `useDictionary` | Memilih satu kamus berdasarkan kuncinya dan mengembalikan isinya.  |
| `useLocale`     | Mengembalikan locale saat ini dan sebuah fungsi untuk mengaturnya. |
| `useIntl`       | Mengembalikan objek Intl untuk locale saat ini.                    |

### Fungsi

| Fungsi          | Deskripsi                         |
| --------------- | --------------------------------- |
| `getDictionary` | Mengambil dictionary.             |
| `getIntlayer`   | Mengambil konten dari dictionary. |

### Markdown

| Fungsi                    | Deskripsi                                                     |
| ------------------------- | ------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue untuk memasang Intlayer Markdown di aplikasi Anda. |
