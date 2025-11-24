---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Temukan cara menggunakan Intlayer CLI untuk mengelola situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi daring ini untuk mengatur proyek Anda dalam beberapa menit.
keywords:
  - CLI
  - Command Line Interface
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
  - version: 7.2.3
    date: 2025-11-22
    changes: Menambahkan perintah transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Menambahkan opsi skipIfExists pada perintah translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Menambahkan alias untuk argumen dan perintah CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Menambahkan opsi build pada perintah
  - version: 6.1.2
    date: 2025-09-26
    changes: Menambahkan perintah version
  - version: 6.1.0
    date: 2025-09-26
    changes: Mengatur opsi verbose menjadi default true menggunakan CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Menambahkan perintah watch dan opsi with
  - version: 6.0.1
    date: 2025-09-23
    changes: Menambahkan perintah editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Menambahkan perintah content test dan list
  - version: 5.5.11
    date: 2025-07-11
    changes: Memperbarui dokumentasi parameter perintah CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Intlayer CLI

---

## Daftar Isi

<TOC/>

---

## Instal Paket

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Jika paket `intlayer` sudah terpasang, CLI akan terpasang secara otomatis. Anda dapat melewati langkah ini.

## Paket intlayer-cli

Paket `intlayer-cli` bertujuan untuk mentranspilasi [deklarasi intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md) Anda menjadi kamus.

Paket ini akan mentranspilasi semua file intlayer, seperti `src/**/*.content.{ts|js|mjs|cjs|json}`. [Lihat cara mendeklarasikan file deklarasi Intlayer Anda](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Untuk menginterpretasikan kamus intlayer, Anda dapat menggunakan interpreter, seperti [react-intlayer](https://www.npmjs.com/package/react-intlayer), atau [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Dukungan File Konfigurasi

Intlayer menerima berbagai format file konfigurasi:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Untuk melihat cara mengonfigurasi locale yang tersedia, atau parameter lainnya, lihat [dokumentasi konfigurasi di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Menjalankan perintah intlayer

### Perintah Inti

- **[Bangun Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/build.md)** - Bangun kamus Anda dari file deklarasi konten
- **[Pantau Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/watch.md)** - Pantau perubahan dan bangun kamus secara otomatis
- **[Periksa Versi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/version.md)** - Periksa versi Intlayer CLI yang terpasang

### Manajemen Kamus

- **[Dorong Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/push.md)** - Dorong kamus ke editor dan CMS Intlayer
- **[Tarik Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/pull.md)** - Tarik kamus dari editor dan CMS Intlayer
- **[Isi Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)** - Isi, audit, dan terjemahkan kamus menggunakan AI
- **[Uji Terjemahan yang Hilang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/test.md)** - Uji dan identifikasi terjemahan yang hilang
- **[Daftar File Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/list.md)** - Daftar semua file deklarasi konten dalam proyek Anda

### Manajemen Komponen

- **[Transformasi Komponen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/transform.md)** - Transformasi komponen yang ada untuk menggunakan Intlayer

### Konfigurasi

- **[Kelola Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/configuration.md)** - Dapatkan dan dorong konfigurasi Intlayer Anda ke CMS

### Manajemen Dokumentasi

- **[Terjemahkan Dokumen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-translate.md)** - Terjemahkan file dokumentasi secara otomatis menggunakan AI
- **[Tinjau Dokumen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-review.md)** - Tinjau file dokumentasi untuk kualitas dan konsistensi

### Editor & Sinkronisasi Langsung

- **[Perintah Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/editor.md)** - Gunakan perintah editor Intlayer
- **[Perintah Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/live.md)** - Gunakan Live Sync untuk mencerminkan perubahan konten CMS saat runtime

### Alat Pengembangan

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/sdk.md)** - Gunakan Intlayer CLI SDK dalam kode Anda sendiri
- **[Perintah Debug Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/debug.md)** - Debug dan selesaikan masalah Intlayer CLI

## Gunakan perintah intlayer dalam `package.json` Anda

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Catatan**: Anda juga dapat menggunakan alias yang lebih singkat:
>
> - `npx intlayer list` sebagai pengganti `npx intlayer content list`
> - `npx intlayer test` sebagai pengganti `npx intlayer content test`
