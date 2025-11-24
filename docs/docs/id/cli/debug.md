---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Debug Perintah Intlayer
description: Pelajari cara melakukan debug dan memecahkan masalah CLI Intlayer.
keywords:
  - Debug
  - Memecahkan Masalah
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Debug perintah intlayer

## 1. **Pastikan Anda menggunakan versi terbaru**

Jalankan:

```bash
npx intlayer --version                  # versi intlayer lokal saat ini
npx intlayer@latest --version           # versi intlayer terbaru saat ini
```

## 2. **Periksa apakah perintah sudah terdaftar**

Anda dapat memeriksa dengan:

```bash
npx intlayer --help                     # Menampilkan daftar perintah yang tersedia dan informasi penggunaan
npx intlayer dictionary build --help    # Menampilkan daftar opsi yang tersedia untuk sebuah perintah
```

## 3. **Restart terminal Anda**

Terkadang restart terminal diperlukan agar perintah baru dikenali.

## 4. **Bersihkan cache npx (jika Anda terjebak dengan versi lama)**

```bash
npx clear-npx-cache
```
