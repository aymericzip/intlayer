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
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi yang disatukan untuk semua ekspor
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

| Hook                   | Deskripsi                                                                                                      | Dokumen Terkait |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | --------------- |
| `useIntlayer`          | Berdasarkan `useDictionary`, tetapi menyuntikkan versi kamus yang dioptimalkan dari deklarasi yang dihasilkan. | -               |
| `useDictionary`        | Memproses objek yang menyerupai dictionary (key, content). Ia memproses terjemahan `t()`, enumerasi, dll.      | -               |
| `useDictionaryAsync`   | Sama seperti `useDictionary`, tetapi menangani dictionary asinkron.                                            | -               |
| `useDictionaryDynamic` | Sama seperti `useDictionary`, tetapi menangani dictionary dinamis.                                             | -               |
| `useLocale`            | Mengembalikan locale saat ini dan sebuah fungsi untuk mengaturnya.                                             | -               |
| `useIntl`              | Mengembalikan objek Intl untuk locale saat ini.                                                                | -               |
| `useLoadDynamic`       | Hook untuk memuat kamus dinamis.                                                                               | -               |

### Komponen

| Komponen                    | Deskripsi                                       |
| --------------------------- | ----------------------------------------------- |
| `IntlayerMarkdownComponent` | Komponen Angular yang merender konten Markdown. |
