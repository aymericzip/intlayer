---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Kelola Konfigurasi
description: Pelajari cara mendapatkan dan mengirim konfigurasi Intlayer Anda ke CMS.
keywords:
  - Konfigurasi
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Kelola Konfigurasi

## Dapatkan Konfigurasi

Perintah `configuration get` mengambil konfigurasi saat ini untuk Intlayer, khususnya pengaturan locale. Ini berguna untuk memverifikasi pengaturan Anda.

```bash
npx intlayer configuration get
```

## Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argumen:

- **`--env`**: Tentukan environment (misalnya, `development`, `production`).
- **`--env-file`**: Berikan file environment kustom untuk memuat variabel dari file tersebut.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true menggunakan CLI)
- **`--no-cache`**: Nonaktifkan cache.

## Kirim Konfigurasi

Perintah `configuration push` mengunggah konfigurasi Anda ke Intlayer CMS dan editor. Langkah ini diperlukan untuk mengaktifkan penggunaan kamus jarak jauh di Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

## Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argumen:

- **`--env`**: Tentukan environment (misalnya, `development`, `production`).
- **`--env-file`**: Berikan file environment kustom untuk memuat variabel dari.
- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true menggunakan CLI)
- **`--no-cache`**: Nonaktifkan cache.

Dengan mengirim konfigurasi, proyek Anda sepenuhnya terintegrasi dengan Intlayer CMS, memungkinkan manajemen kamus yang mulus di seluruh tim.
