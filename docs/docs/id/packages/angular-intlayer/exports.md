---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket angular-intlayer
description: Integrasi spesifik Angular untuk Intlayer, menyediakan providers dan services untuk aplikasi Angular.
keywords:
  - angular-intlayer
  - angular
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Menambahkan utilitas usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokumentasi terpadu untuk semua ekspor"
author: aymericzip
---

# Paket angular-intlayer

Paket `angular-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Angular. Paket ini mencakup providers dan services untuk menangani konten multibahasa.

## Instalasi

```bash
npm install angular-intlayer
```

## Ekspor

Impor:

```tsx
import "angular-intlayer";
```

### Pengaturan

| Fungsi            | Deskripsi                                                      |
| ----------------- | -------------------------------------------------------------- |
| `provideIntlayer` | Fungsi untuk menyediakan Intlayer dalam aplikasi Angular Anda. |

### Hooks

| Hook                   | Deskripsi                                                                                                                               | Dokumen Terkait                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Berdasarkan `useDictionary`, tetapi menyuntikkan versi kamus yang dioptimalkan dari deklarasi yang dihasilkan.                          | -                                                                                                                     |
| `useDictionary`        | Memproses objek yang menyerupai dictionary (key, content). Ia memproses terjemahan `t()`, enumerasi, dll.                               | -                                                                                                                     |
| `useDictionaryAsync`   | Sama seperti `useDictionary`, tetapi menangani dictionary asinkron.                                                                     | -                                                                                                                     |
| `useDictionaryDynamic` | Sama seperti `useDictionary`, tetapi menangani dictionary dinamis.                                                                      | -                                                                                                                     |
| `useLocale`            | Mengembalikan lokal saat ini dan fungsi untuk mengaturnya.                                                                              | -                                                                                                                     |
| `usePathname`          | Mengembalikan pathname saat ini sebagai `Signal<string>` dengan segmen lokal dihapus. Reaktif terhadap `popstate` melalui `DestroyRef`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/angular-intlayer/usePathname.md) |
| `useIntl`              | Mengembalikan objek Intl untuk lokal saat ini.                                                                                          | -                                                                                                                     |
| `useLoadDynamic`       | Hook untuk memuat kamus dinamis.                                                                                                        | -                                                                                                                     |

### Komponen

| Komponen                    | Deskripsi                                       |
| --------------------------- | ----------------------------------------------- |
| `IntlayerMarkdownComponent` | Komponen Angular yang merender konten Markdown. |
