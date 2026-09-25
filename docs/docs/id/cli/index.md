---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "Menambahkan perintah upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Menambahkan perintah init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Mengganti perintah `ci` dengan flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Menambahkan konten perintah scan"
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
author: aymericzip
---

# Intlayer CLI - Semua perintah Intlayer CLI untuk situs web multibahasa Anda

## Daftar Isi

<TOC/>

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

Paket ini mentranspilasi semua file intlayer, seperti `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Lihat cara mendeklarasikan file deklarasi Intlayer Anda](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/login" />
</TechGrid>

> `intlayer login` mengeluarkan sebuah **access key** (`clientId` / `clientSecret`) yang digunakan oleh setiap perintah yang memerlukan kredensial. Secret adalah kredensial sisi server dan tidak pernah mencapai client bundle Anda — lihat [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/login.md#keeping-the-access-key-safe).

### Perintah Utama

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/list_projects" />
</TechGrid>

### Manajemen Kamus

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/list" />
</TechGrid>

### Manajemen Komponen

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract" />
</TechGrid>

### Konfigurasi

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/configuration" />
</TechGrid>

### Manajemen Dokumen

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-review" />
</TechGrid>

### Editor dan Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/live" />
</TechGrid>

### Audit & Diagnostik

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/scan" />
</TechGrid>

### Alat Pengembang

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/debug" />
</TechGrid>

## Gunakan perintah intlayer di `package.json` Anda

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Catatan**: Anda juga dapat menggunakan alias yang lebih pendek:
>
> - `npx intlayer list`: menggantikan `npx intlayer content list`
> - `npx intlayer test`: menggantikan `npx intlayer content test`
> - `npx intlayer projects-list` atau `npx intlayer pl`: menggantikan `npx intlayer projects list`
