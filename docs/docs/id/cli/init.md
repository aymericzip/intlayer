---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inisialisasi Intlayer
description: Pelajari cara menginisialisasi Intlayer di proyek Anda.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Menambahkan opsi --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Menambahkan konten perintah init"
---

# Inisialisasi Intlayer

```bash
npx intlayer init
```

Perintah `init` secara otomatis mengonfigurasi Intlayer di proyek Anda dengan membuat file dan pengaturan yang diperlukan. Ini adalah cara yang disarankan untuk mulai menggunakan Intlayer.

## Alias:

- `npx intlayer init`

## Argumen:

- `--project-root [projectRoot]` - Opsional. Tentukan direktori akar proyek. Jika tidak disediakan, perintah akan mencari akar proyek mulai dari direktori kerja saat ini.
- `--no-gitignore` - Opsional. Melewati pembaruan otomatis file `.gitignore`. Jika flag ini disetel, `.intlayer` tidak akan ditambahkan ke `.gitignore`.

## Apa yang dilakukan:

Perintah `init` melakukan tugas setup berikut:

1. **Memvalidasi struktur proyek** - Memastikan Anda berada di direktori proyek yang valid dengan file `package.json`.
2. **Memperbarui `.gitignore`** - Menambahkan `.intlayer` ke file `.gitignore` Anda untuk mengecualikan file yang dihasilkan dari kontrol versi (dapat dilewati dengan `--no-gitignore`).
3. **Mengonfigurasi TypeScript** - Memperbarui file `tsconfig.json` apa pun untuk menyertakan definisi tipe Intlayer (`.intlayer/**/*.ts`).
4. **Membuat file konfigurasi** - Menghasilkan `intlayer.config.ts` (untuk proyek TypeScript) atau `intlayer.config.mjs` (untuk proyek JavaScript) dengan pengaturan default.
5. **Memperbarui konfigurasi Vite** - Jika file konfigurasi Vite terdeteksi, perintah akan menambahkan impor untuk plugin `vite-intlayer`.
6. **Memperbarui konfigurasi Next.js** - Jika file konfigurasi Next.js terdeteksi, perintah akan menambahkan impor untuk plugin `next-intlayer`.

## Contoh:

### Inisialisasi dasar:

```bash
npx intlayer init
```

Ini menginisialisasi Intlayer di direktori saat ini, mendeteksi akar proyek secara otomatis.

### Inisialisasi dengan akar proyek khusus:

```bash
npx intlayer init --project-root ./proyek-saya
```

Ini menginisialisasi Intlayer di direktori yang ditentukan.

### Inisialisasi tanpa memperbarui .gitignore:

```bash
npx intlayer init --no-gitignore
```

Ini akan menyiapkan semua file konfigurasi tetapi tidak akan memodifikasi `.gitignore` Anda.

## Contoh Output:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Catatan:

- Perintah ini idempotent — Anda dapat menjalankannya berkali-kali dengan aman. Langkah-langkah yang sudah dikonfigurasi akan dilewati.
- Jika file konfigurasi sudah ada, file tersebut tidak akan ditimpa.
- Konfigurasi TypeScript tanpa array `include` (misal: konfigurasi gaya solusi dengan referensi) akan dilewati.
- Perintah akan keluar dengan kesalahan jika `package.json` tidak ditemukan di akar proyek.
