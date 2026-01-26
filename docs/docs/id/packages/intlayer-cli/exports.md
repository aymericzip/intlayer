---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket intlayer-cli
description: Alat CLI untuk Intlayer, menyediakan perintah untuk membangun dan mengaudit kamus.
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket intlayer-cli

Paket `intlayer-cli` menyediakan serangkaian perintah untuk mengelola kamus Intlayer dan konfigurasi.

## Instalasi

```bash
npm install intlayer-cli
```

## Ekspor

### Perintah CLI (Fungsi)

Paket ini mengekspor fungsi-fungsi yang menjalankan perintah CLI, memungkinkan Anda memicu operasi Intlayer secara terprogram.

Impor:

```tsx
import "intlayer-cli";
```

| Fungsi         | Deskripsi                                                   |
| -------------- | ----------------------------------------------------------- |
| `build`        | Membangun kamus Intlayer.                                   |
| `audit`        | Mengaudit kamus untuk terjemahan yang hilang.               |
| `liveSync`     | Menyinkronkan kamus secara real-time.                       |
| `pull`         | Mengambil kamus dari sumber remote.                         |
| `push`         | Mendorong kamus ke sumber remote.                           |
| `test`         | Menjalankan tes pada kamus.                                 |
| `transform`    | Mentransformasikan kamus antar format.                      |
| `fill`         | Mengisi kamus dengan terjemahan yang hilang menggunakan AI. |
| `reviewDoc`    | Meninjau dokumentasi untuk internasionalisasi.              |
| `translateDoc` | Menerjemahkan dokumentasi menggunakan AI.                   |
