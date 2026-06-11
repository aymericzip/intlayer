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
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Debug perintah intlayer

## 1. **Pastikan Anda menggunakan versi terbaru**

Jalankan:

```bash packageManager="npm"
npx intlayer --version                  # versi intlayer lokal saat ini
npx intlayer@latest --version           # versi intlayer terbaru saat ini
```

```bash packageManager="yarn"
yarn intlayer --version                  # versi intlayer lokal saat ini
yarn intlayer@latest --version           # versi intlayer terbaru saat ini
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # versi intlayer lokal saat ini
pnpm intlayer@latest --version           # versi intlayer terbaru saat ini
```

```bash packageManager="bun"
bun x intlayer --version                  # versi intlayer lokal saat ini
bun x intlayer@latest --version           # versi intlayer terbaru saat ini
```

## 2. **Periksa apakah perintah sudah terdaftar**

Anda dapat memeriksa dengan:

```bash packageManager="npm"
npx intlayer --help                     # Menampilkan daftar perintah yang tersedia dan informasi penggunaan
npx intlayer dictionary build --help    # Menampilkan daftar opsi yang tersedia untuk sebuah perintah
```

```bash packageManager="yarn"
yarn intlayer --help                     # Menampilkan daftar perintah yang tersedia dan informasi penggunaan
yarn intlayer dictionary build --help    # Menampilkan daftar opsi yang tersedia untuk sebuah perintah
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # Menampilkan daftar perintah yang tersedia dan informasi penggunaan
pnpm intlayer dictionary build --help    # Menampilkan daftar opsi yang tersedia untuk sebuah perintah
```

```bash packageManager="bun"
bun x intlayer --help                     # Menampilkan daftar perintah yang tersedia dan informasi penggunaan
bun x intlayer dictionary build --help    # Menampilkan daftar opsi yang tersedia untuk sebuah perintah
```

## 3. **Restart terminal Anda**

Terkadang restart terminal diperlukan agar perintah baru dikenali.

## 4. **Bersihkan cache npx (jika Anda terjebak dengan versi lama)**

```bash
npx clear-npx-cache
```
