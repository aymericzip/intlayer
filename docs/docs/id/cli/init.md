---
createdAt: 2025-12-30
updatedAt: 2026-09-21
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
  - version: 9.5.6
    date: 2026-09-21
    changes: "Menambahkan subperintah init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Menambahkan opsi --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Menambahkan konten perintah init"
author: aymericzip
---

# Inisialisasi Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
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

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Ini menginisialisasi Intlayer di direktori saat ini, mendeteksi akar proyek secara otomatis.

### Inisialisasi dengan akar proyek khusus:

```bash packageManager="npm"
npx intlayer init --project-root ./proyek-saya
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./proyek-saya
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./proyek-saya
```

```bash packageManager="bun"
bun x intlayer init --project-root ./proyek-saya
```

Ini menginisialisasi Intlayer di direktori yang ditentukan.

### Inisialisasi tanpa memperbarui .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Ini akan menyiapkan semua file konfigurasi tetapi tidak akan memodifikasi `.gitignore` Anda.

### Siapkan infrastruktur (aplikasi desktop atau self-hosting):

```bash
npx intlayer init infra
```

Mengunduh dan menjalankan penginstal yang dihosting (`https://intlayer.org/install.sh`, atau `install.ps1` di Windows), yang menanyakan cara Anda ingin menjalankan Intlayer:

- **Aplikasi desktop** - menginstal dasbor native di komputer Anda, terhubung ke Intlayer Cloud.
- **All-in-one Docker** - dasbor + API + MongoDB + Redis + MinIO dalam satu wadah.
- **Docker Compose** - satu wadah per layanan, untuk self-hosting yang skalabel.

Lewati menu dengan `--mode`:

```bash
npx intlayer init infra --mode compose
```

Langkah yang sama ditawarkan oleh `npx intlayer init --interactive`. Lihat [referensi `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/infra.md) untuk pengaturan penginstal, dan [panduan self-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md) untuk apa yang disiapkan oleh setiap mode.

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

- Perintah ini idempotent - Anda dapat menjalankannya berkali-kali dengan aman. Langkah-langkah yang sudah dikonfigurasi akan dilewati.
- Jika file konfigurasi sudah ada, file tersebut tidak akan ditimpa.
- Konfigurasi TypeScript tanpa array `include` (misal: konfigurasi gaya solusi dengan referensi) akan dilewati.
- Perintah akan keluar dengan kesalahan jika `package.json` tidak ditemukan di akar proyek.
