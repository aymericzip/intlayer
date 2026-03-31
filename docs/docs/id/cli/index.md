---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Semua perintah Intlayer CLI untuk situs web multibahasa Anda
description: Pelajari cara menggunakan Intlayer CLI untuk mengelola situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi online ini untuk menyiapkan proyek Anda dalam hitungan menit.
keywords:
  - CLI
  - Antarmuka Baris Perintah
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Menambahkan konten perintah standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Menambahkan konten perintah CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Menambahkan konten perintah list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Menambahkan konten perintah init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Menambahkan konten perintah extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Menambahkan opsi skipIfExists pada perintah translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Menambahkan alias untuk argumen dan perintah CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Menambahkan opsi build pada perintah"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Menambahkan konten perintah version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Menyetel opsi verbose ke true secara default melalui CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Menambahkan perintah watch dan opsi with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Menambahkan konten perintah editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Menambahkan perintah content test dan list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Memperbarui dokumentasi parameter perintah CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
---

# Intlayer CLI - Semua perintah Intlayer CLI untuk situs web multibahasa Anda

---

## Daftar Isi

<TOC/>

---

## Instal Paket

Instal paket-paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Jika paket `intlayer` sudah terinstal, CLI akan terinstal secara otomatis. Anda dapat melewatkan langkah ini.

## Paket intlayer-cli

Paket `intlayer-cli` dirancang untuk mentranspilasi [deklarasi intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md) Anda ke dalam kamus.

Paket ini mentranspilasi semua file intlayer, seperti `src/**/*.content.{ts|js|mjs|cjs|json}`. [Lihat cara mendeklarasikan file deklarasi Intlayer Anda](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Untuk menginterpretasikan kamus intlayer, Anda dapat menggunakan interpreter, seperti [react-intlayer](https://www.npmjs.com/package/react-intlayer) atau [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Dukungan File Konfigurasi

Intlayer menerima beberapa format file konfigurasi:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Untuk mempelajari cara mengonfigurasi bahasa yang tersedia atau parameter lainnya, lihat [dokumentasi konfigurasi di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Menjalankan Perintah Intlayer

### Autentikasi

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/login.md)** - Autentikasi dengan Intlayer CMS dan dapatkan kredensial akses

### Perintah Utama

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/build.md)** - Bangun kamus Anda dari file deklarasi konten
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/watch.md)** - Pantau perubahan dan bangun kembali kamus secara otomatis
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/standalone.md)** - Buat bundel JavaScript mandiri yang berisi Intlayer dan paket yang ditentukan
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/version.md)** - Periksa versi Intlayer CLI yang terinstal
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/list_projects.md)** - Daftar semua proyek Intlayer dalam direktori atau repositori git

### Manajemen Kamus

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/push.md)** - Kirim kamus ke Editor Intlayer dan CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/pull.md)** - Ambil kamus dari Editor Intlayer dan CMS
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)** - Isi, audit, dan terjemahkan kamus menggunakan AI
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/test.md)** - Uji dan identifikasi terjemahan yang hilang
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/list.md)** - Daftar semua file deklarasi konten dalam proyek Anda

### Manajemen Komponen

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)** - Ekstrak string dari komponen ke file .content di dekat komponen

### Konfigurasi

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/init.md)** - Siapkan Intlayer di proyek Anda dengan konfigurasi otomatis
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/configuration.md)** - Dapatkan konfigurasi Intlayer Anda dan kirimkan ke CMS

### Manajemen Dokumen

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-translate.md)** - Terjemahkan file dokumen secara otomatis menggunakan AI
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-review.md)** - Tinjau file dokumen untuk kualitas dan konsistensi

### Editor dan Live Sync

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/editor.md)** - Gunakan perintah editor Intlayer
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/live.md)** - Gunakan Live Sync untuk menerapkan perubahan konten dari CMS saat runtime

### CI/CD dan Otomatisasi

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/ci.md)** - Jalankan perintah Intlayer dengan kredensial yang disuntikkan secara otomatis untuk alur kerja CI/CD

### Alat Pengembang

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/sdk.md)** - Gunakan Intlayer CLI SDK di kode Anda sendiri
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/debug.md)** - Debug dan selesaikan masalah dengan Intlayer CLI

## Gunakan perintah intlayer di `package.json` Anda

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Catatan**: Anda juga dapat menggunakan alias yang lebih pendek:
>
> - `npx intlayer list`: menggantikan `npx intlayer content list`
> - `npx intlayer test`: menggantikan `npx intlayer content test`
> - `npx intlayer projects-list` atau `npx intlayer pl`: menggantikan `npx intlayer projects list`
