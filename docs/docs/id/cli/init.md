---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inisialisasi Intlayer
description: Pelajari cara menginisialisasi Intlayer dalam proyek Anda.
keywords:
  - Inisialisasi
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Menambahkan perintah init
---

# Inisialisasi Intlayer

```bash
npx intlayer init
```

Perintah `init` secara otomatis mengatur Intlayer dalam proyek Anda dengan mengonfigurasi file dan pengaturan yang diperlukan. Ini adalah cara yang direkomendasikan untuk memulai dengan Intlayer.

## Alias:

- `npx intlayer init`

## Argumen:

- `--project-root [projectRoot]` - Opsional. Tentukan direktori root proyek. Jika tidak diberikan, perintah akan mencari root proyek mulai dari direktori kerja saat ini.

## Apa yang dilakukan:

Perintah `init` melakukan tugas pengaturan berikut:

1. **Memvalidasi struktur proyek** - Memastikan Anda berada di direktori proyek yang valid dengan file `package.json`
2. **Memperbarui `.gitignore`** - Menambahkan `.intlayer` ke file `.gitignore` Anda untuk mengecualikan file yang dihasilkan dari kontrol versi
3. **Mengonfigurasi TypeScript** - Memperbarui semua file `tsconfig.json` untuk menyertakan definisi tipe Intlayer (`.intlayer/**/*.ts`)
4. **Membuat file konfigurasi** - Menghasilkan `intlayer.config.ts` (untuk proyek TypeScript) atau `intlayer.config.mjs` (untuk proyek JavaScript) dengan pengaturan default
5. **Memperbarui konfigurasi Vite** - Jika terdeteksi file konfigurasi Vite, menambahkan impor plugin `vite-intlayer`
6. **Memperbarui konfigurasi Next.js** - Jika file konfigurasi Next.js terdeteksi, menambahkan impor plugin `next-intlayer`

## Contoh:

### Inisialisasi dasar:

```bash
npx intlayer init
```

Ini akan menginisialisasi Intlayer di direktori saat ini, secara otomatis mendeteksi root proyek.

### Inisialisasi dengan root proyek kustom:

```bash
npx intlayer init --project-root ./my-project
```

Ini akan menginisialisasi Intlayer di direktori yang ditentukan.

## Contoh output:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
intlayer.config.ts dibuat
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Catatan:

- Perintah ini idempoten - Anda dapat menjalankannya beberapa kali dengan aman. Ini akan melewati langkah-langkah yang sudah dikonfigurasi.
- Jika file konfigurasi sudah ada, file tersebut tidak akan ditimpa.
- File konfigurasi TypeScript tanpa array `include` (mis. konfigurasi gaya solution dengan references) akan dilewati.
- Perintah akan keluar dengan kesalahan jika tidak ditemukan `package.json` di root proyek.

- Perintah ini idempoten - Anda dapat menjalankannya beberapa kali dengan aman. Perintah akan melewati langkah yang sudah dikonfigurasi.
- Jika file konfigurasi sudah ada, file tersebut tidak akan ditimpa.
- File konfigurasi TypeScript tanpa array `include` (misalnya, konfigurasi gaya solution dengan references) akan dilewati.
- Perintah akan keluar dengan error jika tidak ditemukan `package.json` di root proyek.
