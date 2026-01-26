---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket preact-intlayer
description: Integrasi khusus Preact untuk Intlayer, menyediakan provider dan hook untuk aplikasi Preact.
keywords:
  - preact-intlayer
  - preact
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket preact-intlayer

Paket `preact-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Preact. Paket ini mencakup provider dan hook untuk menangani konten multibahasa.

## Instalasi

```bash
npm install preact-intlayer
```

## Ekspor

### Provider

| Komponen           | Deskripsi                                                                      |
| ------------------ | ------------------------------------------------------------------------------ |
| `IntlayerProvider` | Provider utama yang membungkus aplikasi Anda dan menyediakan konteks Intlayer. |

### Hooks

| Hook            | Deskripsi                                                                                                          | Dokumentasi Terkait                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | Berdasarkan `useDictionary`, namun menyuntikkan versi dictionary yang dioptimalkan dari deklarasi yang dihasilkan. | -                                                                                                      |
| `useDictionary` | Memproses objek yang menyerupai dictionary (key, content). Ini memproses terjemahan `t()`, enumerasi, dll.         | -                                                                                                      |
| `useLocale`     | Mengembalikan locale saat ini dan sebuah fungsi untuk mengaturnya.                                                 | -                                                                                                      |
| `t`             | Memilih konten berdasarkan locale saat ini.                                                                        | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |

### Komponen

| Komponen           | Deskripsi                                          |
| ------------------ | -------------------------------------------------- |
| `MarkdownProvider` | Provider untuk konteks rendering markdown.         |
| `MarkdownRenderer` | Menyajikan konten markdown dengan komponen kustom. |
