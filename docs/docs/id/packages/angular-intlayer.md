---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket angular-intlayer
description: Integrasi khusus Angular untuk Intlayer, menyediakan provider dan service untuk aplikasi Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi yang disatukan untuk semua ekspor
---

# Paket angular-intlayer

Paket `angular-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Angular. Paket ini mencakup provider dan service untuk menangani konten multibahasa.

## Instalasi

```bash
npm install angular-intlayer
```

## Ekspor

### Pengaturan

| Fungsi            | Deskripsi                                                      |
| ----------------- | -------------------------------------------------------------- |
| `provideIntlayer` | Fungsi untuk menyediakan Intlayer dalam aplikasi Angular Anda. |

### Layanan

| Layanan           | Deskripsi                                                                         |
| ----------------- | --------------------------------------------------------------------------------- |
| `IntlayerService` | Layanan yang memilih satu kamus berdasarkan kuncinya dan mengembalikan kontennya. |
| `LocaleService`   | Layanan yang mengembalikan locale saat ini dan sebuah fungsi untuk mengaturnya.   |

### Komponen

| Komponen                    | Deskripsi                                       |
| --------------------------- | ----------------------------------------------- |
| `IntlayerMarkdownComponent` | Komponen Angular yang merender konten markdown. |
