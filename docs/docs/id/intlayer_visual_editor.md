---
createdAt: 2025-08-23
updatedAt: 2025-09-23
title: Intlayer Visual Editor | Edit konten Anda menggunakan editor visual
description: Temukan cara menggunakan Intlayer Editor untuk mengelola situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi online ini untuk mengatur proyek Anda dalam beberapa menit.
keywords:
  - Editor
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.1.0
    date: 2025-09-23
    changes: Menambahkan opsi with pada CLI
  - version: 6.0.1
    date: 2025-09-22
    changes: Mengubah perilaku editor ketika ekstensi file bukan `.json`
  - version: 6.0.0
    date: 2025-09-21
    changes: Menambahkan perintah reexported
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi Intlayer Visual Editor

<iframe title="Editor Visual + CMS untuk Aplikasi Web Anda: Penjelasan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor adalah alat yang akan membungkus situs web Anda untuk berinteraksi dengan file deklarasi konten Anda menggunakan editor visual.

![Antarmuka Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Paket `intlayer-editor` didasarkan pada Intlayer dan tersedia untuk aplikasi JavaScript, seperti React (Create React App), Vite + React, dan Next.js.

## Editor visual vs CMS

Editor Visual Intlayer adalah alat yang memungkinkan Anda mengelola konten Anda dalam editor visual untuk kamus lokal. Setelah perubahan dilakukan, konten akan digantikan dalam basis kode. Itu berarti aplikasi akan dibangun ulang dan halaman akan dimuat ulang untuk menampilkan konten baru.

Sebaliknya, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) adalah alat yang memungkinkan Anda mengelola konten Anda dalam editor visual untuk kamus jarak jauh. Setelah perubahan dilakukan, konten **tidak** akan memengaruhi basis kode Anda. Dan situs web akan secara otomatis menampilkan konten yang telah diubah.

## Integrasikan Intlayer ke dalam aplikasi Anda

Untuk detail lebih lanjut tentang cara mengintegrasikan Intlayer, lihat bagian terkait di bawah ini:

### Integrasi dengan Next.js

Untuk integrasi dengan Next.js, lihat [panduan pengaturan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md).

### Integrasi dengan Create React App

Untuk integrasi dengan Create React App, lihat [panduan pengaturan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md).

### Integrasi dengan Vite + React

Untuk integrasi dengan Vite + React, lihat [panduan pengaturan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md).

## Cara Kerja Intlayer Editor

Editor visual dalam sebuah aplikasi mencakup dua hal:

- Sebuah aplikasi frontend yang akan menampilkan situs web Anda dalam sebuah iframe. Jika situs web Anda menggunakan Intlayer, editor visual akan secara otomatis mendeteksi konten Anda, dan memungkinkan Anda untuk berinteraksi dengannya. Setelah modifikasi dilakukan, Anda akan dapat mengunduh perubahan Anda.

- Setelah Anda mengklik tombol unduh, editor visual akan mengirim permintaan ke server untuk mengganti file deklarasi konten Anda dengan konten baru (di mana pun file-file ini dideklarasikan dalam proyek Anda).

> Perlu dicatat bahwa Intlayer Editor akan menulis file deklarasi konten Anda sebagai JSON jika ekstensi file adalah `.json`. Jika ekstensi file adalah `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs`, maka file akan ditulis sebagai file JavaScript menggunakan babel transformer.

## Instalasi

Setelah Intlayer dikonfigurasi dalam proyek Anda, cukup instal `intlayer-editor` sebagai dependensi pengembangan:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Dengan flag `--with`, Anda dapat memulai editor secara paralel dengan perintah lain:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Konfigurasi

Dalam file konfigurasi Intlayer Anda, Anda dapat menyesuaikan pengaturan editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... pengaturan konfigurasi lainnya
  editor: {
    /**
     * Wajib
     * URL dari aplikasi.
     * Ini adalah URL yang ditargetkan oleh editor visual.
     * Contoh: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opsional
     * Default sebagai `true`. Jika `false`, editor tidak aktif dan tidak dapat diakses.
     * Dapat digunakan untuk menonaktifkan editor pada lingkungan tertentu demi alasan keamanan, seperti produksi.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opsional
     * Default sebagai `8000`.
     * Port dari server editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opsional
     * Default sebagai "http://localhost:8000"
     * URL dari server editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... pengaturan konfigurasi lainnya
  editor: {
    /**
     * Wajib
     * URL dari aplikasi.
     * Ini adalah URL yang ditargetkan oleh visual editor.
     * Contoh: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opsional
     * Default sebagai `true`. Jika `false`, editor tidak aktif dan tidak dapat diakses.
     * Dapat digunakan untuk menonaktifkan editor pada lingkungan tertentu demi alasan keamanan, seperti produksi.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opsional
     * Default sebagai `8000`.
     * Port yang digunakan oleh server visual editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opsional
     * Default sebagai "http://localhost:8000"
     * URL dari server editor yang dapat diakses dari aplikasi. Digunakan untuk membatasi asal yang dapat berinteraksi dengan aplikasi demi alasan keamanan. Jika diatur ke `'*'`, editor dapat diakses dari asal mana pun. Harus diatur jika port diubah, atau jika editor dihosting di domain yang berbeda.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... pengaturan konfigurasi lainnya
  editor: {
    /**
     * Wajib
     * URL dari aplikasi.
     * Ini adalah URL yang ditargetkan oleh visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opsional
     * Default sebagai `8000`.
     * Port dari server editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opsional
     * Default sebagai "http://localhost:8000"
     * URL dari server editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opsional
     * Default sebagai `true`. Jika `false`, editor tidak aktif dan tidak dapat diakses.
     * Dapat digunakan untuk menonaktifkan editor pada lingkungan tertentu demi alasan keamanan, seperti produksi.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Untuk melihat semua parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Menggunakan Editor

1. Ketika editor sudah terpasang, Anda dapat memulai editor menggunakan perintah berikut:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Perlu diperhatikan bahwa Anda harus menjalankan aplikasi Anda secara paralel.** URL aplikasi harus sesuai dengan yang Anda atur dalam konfigurasi editor (`applicationURL`).

   > **Perlu diperhatikan bahwa perintah ini diekspor ulang oleh paket `intlayer`. Anda dapat menggunakan `npx intlayer editor start` sebagai gantinya.**

2. Kemudian, buka URL yang disediakan. Secara default `http://localhost:8000`.

   Anda dapat melihat setiap field yang diindeks oleh Intlayer dengan mengarahkan kursor Anda ke konten.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Jika konten Anda diberi garis tepi, Anda dapat menekan lama untuk menampilkan laci edit.

## Konfigurasi lingkungan

Editor dapat dikonfigurasi untuk menggunakan file lingkungan tertentu. Ini berguna ketika Anda ingin menggunakan file konfigurasi yang sama untuk pengembangan dan produksi.

Untuk menggunakan file lingkungan tertentu, Anda dapat menggunakan flag `--env-file` atau `-f` saat memulai editor:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Perlu dicatat bahwa file lingkungan harus berada di direktori root proyek Anda.

Atau Anda dapat menggunakan flag `--env` atau `-e` untuk menentukan lingkungan:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Debug

Jika Anda mengalami masalah dengan visual editor, periksa hal-hal berikut:

- Visual editor dan aplikasi sedang berjalan.

- Konfigurasi [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) sudah diatur dengan benar di file konfigurasi Intlayer Anda.
  - Field yang diperlukan:
    - URL aplikasi harus sesuai dengan yang Anda atur dalam konfigurasi editor (`applicationURL`).

- Visual editor menggunakan iframe untuk menampilkan situs web Anda. Pastikan Content Security Policy (CSP) situs web Anda mengizinkan URL CMS sebagai `frame-ancestors` ('http://localhost:8000' secara default). Periksa konsol editor untuk setiap kesalahan.
