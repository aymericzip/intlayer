---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket intlayer-cli
description: Alat CLI untuk Intlayer, menyediakan perintah untuk membangun dan mengaudit kamus.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi yang disatukan untuk semua ekspor
---

# Paket intlayer-cli

Paket `intlayer-cli` menyediakan serangkaian perintah untuk mengelola kamus Intlayer dan konfigurasi.

## Instalasi

```bash
npm install intlayer-cli
```

## Ekspor

### Perintah CLI (Fungsi)

Paket ini mengekspor fungsi-fungsi yang menjalankan perintah CLI.

| Fungsi     | Deskripsi                                     |
| ---------- | --------------------------------------------- |
| `build`    | Membangun kamus Intlayer.                     |
| `audit`    | Mengaudit kamus untuk terjemahan yang hilang. |
| `liveSync` | Mensinkronkan kamus secara real-time.         |
| `pull`     | Menarik kamus dari sumber remote.             |
| `push`     | Mendorong kamus ke sumber remote.             |
| `test`     | Menjalankan tes pada kamus.                   |
| `extract`  | Mengonversi kamus antar format.               |
