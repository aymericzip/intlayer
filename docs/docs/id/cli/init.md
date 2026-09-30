---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: siapkan Intlayer di proyek Anda"
description: "Jalankan intlayer init untuk menambahkan Intlayer ke proyek yang ada: mendeteksi framework, memasang paket, dan menulis konfigurasi."
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
  - version: 9.5.13
    date: 2026-09-29
    changes: "init hanya memasang paket dan menyiapkan framework; satu sub-perintah untuk tiap langkah; --interactive gagal tanpa terminal"
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

Perintah `init` memasang paket Intlayer dan menyiapkan framework Anda (file konfigurasi, TypeScript, plugin bundler, middleware/proxy, provider). Ini cara yang disarankan untuk mulai menggunakan Intlayer.

Selebihnya (workflow CI, skill AI, server MCP, alat editor, aturan lint, CMS, infrastruktur) bersifat opsional: pilih dari checklist `--interactive`, atau jalankan sub-perintah khususnya (lihat di bawah).

## Alias:

- `npx intlayer init`

## Argumen:

- `--project-root [projectRoot]` - Opsional. Tentukan direktori akar proyek. Jika tidak disediakan, perintah akan mencari akar proyek mulai dari direktori kerja saat ini.
- `--no-gitignore` - Opsional. Melewati pembaruan otomatis file `.gitignore`. Jika flag ini disetel, `.intlayer` tidak akan ditambahkan ke `.gitignore`.
- `--no-framework-setup` - Opsional. Hanya memasang paket, tanpa mengubah file proyek.
- `--routing <routing>` - Opsional. Routing locale: `prefix-no-default` (default), `prefix-all`, `no-prefix`, `search-params`, atau `none`.
- `-i, --interactive` - Opsional. Pilih langkah penyiapan dari checklist (paket, CI, skill, MCP, VS Code, LSP, lint, CMS, infrastruktur, …) alih-alih set default. Membutuhkan terminal: tanpa terminal (agen AI, CI), perintah gagal dan menampilkan sub-perintah yang harus dijalankan sebagai gantinya.
- `--no-github-actions` - Opsional. Dengan `--interactive`, tidak pernah membuat workflow GitHub Actions, meskipun dipilih.

## Apa yang dilakukan:

Perintah `init` melakukan tugas setup berikut:

1. **Memvalidasi struktur proyek** - Memastikan Anda berada di direktori proyek yang valid dengan file `package.json`.
2. **Memasang paket** - Memasang paket Intlayer yang belum ada untuk stack Anda (mis. `react-intlayer`, `vite-intlayer`) dan memperbarui yang sudah usang.
3. **Memperbarui `.gitignore`** - Menambahkan `.intlayer` ke file `.gitignore` Anda untuk mengecualikan file yang dihasilkan dari kontrol versi (dapat dilewati dengan `--no-gitignore`).
4. **Mengonfigurasi TypeScript** - Memperbarui file `tsconfig.json` apa pun untuk menyertakan definisi tipe Intlayer (`.intlayer/**/*.ts`).
5. **Membuat file konfigurasi** - Menghasilkan `intlayer.config.ts` (untuk proyek TypeScript) atau `intlayer.config.mjs` (untuk proyek JavaScript) dengan pengaturan default.
6. **Memperbarui konfigurasi bundler / framework** - Menambahkan plugin Intlayer ke konfigurasi Vite, Next.js, Nuxt, Astro, …, serta membuat middleware/proxy dan provider jika framework mendukungnya.

## Siapkan satu langkah sekaligus

Setiap langkah di checklist `--interactive` punya sub-perintah sendiri. Sub-perintah ini tidak bertanya apa pun jika nilainya diberikan sebagai flag, jadi aman dijalankan dari agen AI atau job CI.

| Perintah                                                              | Yang disiapkan                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `intlayer init packages`                                              | Memasang paket Intlayer yang belum ada dan memperbarui yang usang                          |
| `intlayer init project [--routing <routing>]`                         | File konfigurasi, TypeScript, plugin bundler, middleware/proxy, provider, dan `.gitignore` |
| `intlayer init github-actions`                                        | Workflow GitHub Actions `fill` dan `test`                                                  |
| `intlayer init vscode-extension`                                      | Merekomendasikan ekstensi Intlayer di `.vscode/extensions.json`                            |
| `intlayer init lsp`                                                   | Language server Intlayer di `.vscode/settings.json`                                        |
| `intlayer init eslint`                                                | Aturan lint Intlayer (ESLint / oxlint), jika proyek sudah memakai linter                   |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | Dokumentasi Intlayer sebagai skill untuk agen AI                                           |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Server MCP Intlayer                                                                        |
| `intlayer init extension [--browser <chrome/firefox>]`                | Membuka halaman store ekstensi browser Intlayer                                            |
| `intlayer init cms`                                                   | Masuk ke Intlayer CMS lewat browser dan menyimpan kredensial di `.env`                     |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Aplikasi desktop atau stack self-hosted                                                    |

### Dari agen AI atau job CI

Shell agen AI tidak punya terminal, jadi pertanyaan tidak bisa dijawab. Gunakan perintah default, lalu sub-perintah yang Anda butuhkan:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Tanpa terminal:

- `init skills` memasang skill yang sesuai dengan stack Anda, kecuali `--skills` diatur (mis. `--skills Usage Content React`).
- `init skills` dan `init mcp` memakai platform AI yang terdeteksi (Claude Code, Cursor, VS Code, Windsurf, …), kecuali `--platform` diatur, dan gagal dengan daftar platform jika tidak ada yang terdeteksi.
- `init mcp` memakai transport `stdio`, kecuali `--transport` diatur.
- `init infra` wajib memakai `--mode`, dan `init extension` hanya menampilkan tautan store, kecuali `--browser` diatur.

Server MCP selalu dikonfigurasi di dalam proyek (untuk Claude Code, di `.mcp.json`).

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

- [referensi `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/infra.md)
- [panduan self-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)

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
