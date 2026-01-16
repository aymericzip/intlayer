---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Eksternalisasi konten Anda ke Intlayer CMS
description: Eksternalisasi konten Anda ke Intlayer CMS untuk mendelegasikan pengelolaan konten kepada tim Anda.
keywords:
  - CMS
  - Visual Editor
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Menambahkan dokumentasi live sync
  - version: 6.0.0
    date: 2025-09-04
    changes: Mengganti field `hotReload` dengan `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi Sistem Manajemen Konten (CMS) Intlayer

<iframe title="Visual Editor + CMS untuk Aplikasi Web Anda: Penjelasan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS adalah sebuah Aplikasi yang memungkinkan Anda untuk mengeksternalisasi konten dari proyek Intlayer.

Untuk itu, Intlayer memperkenalkan konsep 'kamus jauh'.

![Antarmuka Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Daftar Isi

<TOC/>

---

## Memahami kamus jauh

Intlayer membedakan antara kamus 'lokal' dan 'remote'.

- Kamus 'lokal' adalah kamus yang dideklarasikan dalam proyek Intlayer Anda. Seperti file deklarasi sebuah tombol, atau bilah navigasi Anda. Mengeksternalisasi konten Anda tidak masuk akal dalam kasus ini karena konten tersebut tidak seharusnya sering berubah.

- Kamus 'remote' adalah kamus yang dikelola melalui Intlayer CMS. Ini bisa berguna untuk memungkinkan tim Anda mengelola konten secara langsung di situs web Anda, dan juga bertujuan untuk menggunakan fitur pengujian A/B dan optimasi SEO otomatis.

## Editor visual vs CMS

[Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) adalah alat yang memungkinkan Anda mengelola konten Anda dalam editor visual untuk kamus lokal. Setelah perubahan dilakukan, konten akan diganti dalam code-base. Itu berarti aplikasi akan dibangun ulang dan halaman akan dimuat ulang untuk menampilkan konten baru.

Sebaliknya, Intlayer CMS adalah alat yang memungkinkan Anda mengelola konten Anda dalam editor visual untuk kamus jarak jauh. Setelah perubahan dilakukan, konten **tidak** akan memengaruhi code-base Anda. Dan situs web akan secara otomatis menampilkan konten yang telah diubah.

## Integrasi

Untuk detail lebih lanjut tentang cara menginstal paket, lihat bagian terkait di bawah ini:

### Integrasi dengan Next.js

Untuk integrasi dengan Next.js, lihat [panduan pengaturan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md).

### Integrasi dengan Create React App

Untuk integrasi dengan Create React App, lihat [panduan pengaturan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md).

### Integrasi dengan Vite + React

Untuk integrasi dengan Vite + React, lihat [panduan pengaturan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md).

## Konfigurasi

Jalankan perintah berikut untuk masuk ke Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bunx intlayer login
```

Ini akan membuka browser default Anda untuk menyelesaikan proses autentikasi dan menerima kredensial yang diperlukan (Client ID dan Client Secret) untuk menggunakan layanan Intlayer.

Dalam file konfigurasi Intlayer Anda, Anda dapat menyesuaikan pengaturan CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... pengaturan konfigurasi lainnya
  editor: {
    /**
     * Wajib
     *
     * URL dari aplikasi.
     * Ini adalah URL yang ditargetkan oleh editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Wajib
     *
     * Client ID dan client secret diperlukan untuk mengaktifkan editor.
     * Mereka memungkinkan identifikasi pengguna yang sedang mengedit konten.
     * Mereka dapat diperoleh dengan membuat client baru di Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opsional
     *
     * Jika Anda meng-host sendiri Intlayer CMS, Anda dapat mengatur URL CMS.
     *
     * URL dari Intlayer CMS.
     * Secara default, diatur ke https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opsi
     *
     * Jika Anda meng-host sendiri Intlayer CMS, Anda dapat mengatur URL backend.
     *
     * URL dari Intlayer CMS.
     * Secara default, diatur ke https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * URL dari aplikasi.
     * Ini adalah URL yang ditargetkan oleh visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Wajib
     *
     * Client ID dan client secret diperlukan untuk mengaktifkan editor.
     * Mereka memungkinkan identifikasi pengguna yang sedang mengedit konten.
     * Mereka dapat diperoleh dengan membuat client baru di Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opsi
     *
     * Jika Anda meng-host sendiri Intlayer CMS, Anda dapat mengatur URL CMS.
     *
     * URL dari Intlayer CMS.
     * Secara default, diatur ke https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opsi
     *
     * Jika Anda meng-host sendiri Intlayer CMS, Anda dapat mengatur URL backend.
     *
     * URL dari Intlayer CMS.
     * Secara default, diatur ke https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * URL dari aplikasi.
     * Ini adalah URL yang ditargetkan oleh visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Wajib
     *
     * Client ID dan client secret diperlukan untuk mengaktifkan editor.
     * Mereka memungkinkan identifikasi pengguna yang sedang mengedit konten.
     * Mereka dapat diperoleh dengan membuat client baru di Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opsi
     *
     * Jika Anda meng-host sendiri Intlayer CMS, Anda dapat mengatur URL CMS.
     *
     * URL dari Intlayer CMS.
     * Secara default, diatur ke https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opsional
     *
     * Jika Anda meng-host sendiri Intlayer CMS, Anda dapat mengatur URL backend.
     *
     * URL dari Intlayer CMS.
     * Secara default, diatur ke https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Jika Anda belum memiliki client ID dan client secret, Anda dapat memperolehnya dengan membuat client baru di [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Untuk melihat semua parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Menggunakan CMS

### Push konfigurasi Anda

Untuk mengonfigurasi Intlayer CMS, Anda dapat menggunakan perintah [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/id/intlayer_cli.md).

```bash
npx intlayer config push
```

> Jika Anda menggunakan variabel lingkungan dalam file konfigurasi `intlayer.config.ts` Anda, Anda dapat menentukan lingkungan yang diinginkan menggunakan argumen `--env`:

```bash
npx intlayer config push --env production
```

Perintah ini mengunggah konfigurasi Anda ke Intlayer CMS.

### Push kamus

Untuk mengubah kamus lokal Anda menjadi kamus jarak jauh, Anda dapat menggunakan perintah [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/id/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Jika Anda menggunakan variabel lingkungan dalam file konfigurasi `intlayer.config.ts` Anda, Anda dapat menentukan lingkungan yang diinginkan menggunakan argumen `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Perintah ini mengunggah kamus konten awal Anda, sehingga tersedia untuk pengambilan dan pengeditan secara asinkron melalui platform Intlayer.

### Edit kamus

Kemudian Anda akan dapat melihat dan mengelola kamus Anda di [Intlayer CMS](https://app.intlayer.org/content).

## Sinkronisasi langsung

Sinkronisasi Langsung memungkinkan aplikasi Anda mencerminkan perubahan konten CMS secara real-time. Tidak perlu membangun ulang atau menerapkan ulang. Saat diaktifkan, pembaruan dikirimkan ke server Sinkronisasi Langsung yang menyegarkan kamus yang dibaca aplikasi Anda.

Aktifkan Sinkronisasi Langsung dengan memperbarui konfigurasi Intlayer Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... pengaturan konfigurasi lainnya
  editor: {
    /**
     * Mengaktifkan hot reloading konfigurasi locale saat perubahan terdeteksi.
     * Misalnya, ketika sebuah kamus ditambahkan atau diperbarui, aplikasi akan memperbarui
     * konten yang ditampilkan pada halaman.
     *
     * Karena hot reloading memerlukan koneksi terus-menerus ke server, fitur ini
     * hanya tersedia untuk klien dengan paket `enterprise`.
     *
     * Default: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Mengontrol bagaimana kamus diimpor:
     *
     * - "live": Kamus diambil secara dinamis menggunakan Live Sync API.
     *   Menggantikan useIntlayer dengan useDictionaryDynamic.
     *
     * Catatan: Mode live menggunakan Live Sync API untuk mengambil kamus. Jika panggilan API
     * gagal, kamus diimpor secara dinamis.
     * Catatan: Hanya kamus dengan konten jarak jauh dan flag "live" yang menggunakan mode live.
     * Yang lain menggunakan mode dinamis untuk kinerja.
     */
    importMode: "live",
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
     * Mengaktifkan hot reloading konfigurasi locale saat perubahan terdeteksi.
     * Misalnya, ketika sebuah kamus ditambahkan atau diperbarui, aplikasi akan memperbarui
     * konten yang ditampilkan di halaman.
     *
     * Karena hot reloading memerlukan koneksi yang terus-menerus ke server, fitur ini
     * hanya tersedia untuk klien dengan paket `enterprise`.
     *
     * Default: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Mengontrol bagaimana kamus diimpor:
     *
     * - "live": Kamus diambil secara dinamis menggunakan Live Sync API.
     *   Menggantikan useIntlayer dengan useDictionaryDynamic.
     *
     * Catatan: Mode live menggunakan Live Sync API untuk mengambil kamus. Jika panggilan API
     * gagal, kamus diimpor secara dinamis.
     * Catatan: Hanya kamus dengan konten jarak jauh dan flag "live" yang menggunakan mode live.
     * Lainnya menggunakan mode dinamis untuk performa.
     */
    importMode: "live",
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
     * Mengaktifkan hot reloading konfigurasi locale saat perubahan terdeteksi.
     * Misalnya, ketika sebuah kamus ditambahkan atau diperbarui, aplikasi akan memperbarui
     * konten yang ditampilkan di halaman.
     *
     * Karena hot reloading memerlukan koneksi yang terus-menerus ke server, fitur ini
     * hanya tersedia untuk klien dengan paket `enterprise`.
     *
     * Default: false
     */
    liveSync: true,

    /**
     * Port dari server Live Sync.
     *
     * Default: 4000
     */
    liveSyncPort: 4000,

    /**
     * URL dari server Live Sync.
     *
     * Default: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Mengontrol bagaimana kamus diimpor:
     *
     * - "live": Kamus diambil secara dinamis menggunakan Live Sync API.
     *   Menggantikan useIntlayer dengan useDictionaryDynamic.
     *
     * Catatan: Mode live menggunakan Live Sync API untuk mengambil kamus. Jika panggilan API
     * gagal, kamus diimpor secara dinamis.
     * Catatan: Hanya kamus dengan konten jarak jauh dan flag "live" yang menggunakan mode live.
     * Lainnya menggunakan mode dinamis untuk performa.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Mulai server Live Sync untuk membungkus aplikasi Anda:

Contoh menggunakan server mandiri:

```json5 fileName="package.json"
{
  "scripts": {
    // ... skrip lainnya
    "live:start": "npx intlayer live",
  },
}
```

Anda juga dapat menggunakan server aplikasi Anda secara paralel dengan menggunakan argumen `--process`.

Contoh menggunakan Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... skrip lainnya
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Contoh menggunakan Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... skrip lainnya
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Server Live Sync membungkus aplikasi Anda dan secara otomatis menerapkan konten yang diperbarui saat konten tersebut tiba.

Untuk menerima notifikasi perubahan dari CMS, server Live Sync mempertahankan koneksi SSE ke backend. Ketika konten berubah di CMS, backend meneruskan pembaruan ke server Live Sync, yang kemudian menulis kamus baru. Aplikasi Anda akan mencerminkan pembaruan tersebut pada navigasi berikutnya atau saat memuat ulang browser—tidak perlu membangun ulang.

Diagram alur (CMS/Backend -> Server Live Sync -> Server Aplikasi -> Frontend):

![Alur Live Sync CMS/Backend/Server Live Sync/Server Aplikasi/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Cara kerjanya:

![Skema Logika Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### Alur kerja pengembangan (lokal)

- Dalam pengembangan, semua kamus jarak jauh diambil saat aplikasi dimulai, sehingga Anda dapat menguji pembaruan dengan cepat.
- Untuk menguji Live Sync secara lokal dengan Next.js, bungkus server dev Anda:

```json5 fileName="package.json"
{
  "scripts": {
    // ... skrip lainnya
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Untuk Vite
  },
}
```

Aktifkan optimasi agar Intlayer menerapkan transformasi impor Live selama pengembangan:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

module.exports = config;
```

Pengaturan ini membungkus server dev Anda dengan server Live Sync, mengambil kamus jarak jauh saat startup, dan mengalirkan pembaruan dari CMS melalui SSE. Segarkan halaman untuk melihat perubahan.

Catatan dan batasan:

- Tambahkan origin live sync ke kebijakan keamanan situs Anda (CSP). Pastikan URL live sync diizinkan dalam `connect-src` (dan `frame-ancestors` jika relevan).
- Live Sync tidak berfungsi dengan output statis. Untuk Next.js, halaman harus dinamis agar dapat menerima pembaruan saat runtime (misalnya, gunakan `generateStaticParams`, `generateMetadata`, `getServerSideProps`, atau `getStaticProps` secara tepat untuk menghindari batasan hanya statis penuh).
- Di CMS, setiap kamus memiliki flag `live`. Hanya kamus dengan `live=true` yang diambil melalui API live sync; yang lain diimpor secara dinamis dan tetap tidak berubah saat runtime.
- Flag `live` dievaluasi untuk setiap kamus saat build. Jika konten jarak jauh tidak diberi flag `live=true` selama build, Anda harus membangun ulang untuk mengaktifkan Live Sync untuk kamus tersebut.
- Server live sync harus dapat menulis ke `.intlayer`. Dalam container, pastikan akses tulis ke `/.intlayer`.

## Debug

Jika Anda mengalami masalah dengan CMS, periksa hal-hal berikut:

- Aplikasi sedang berjalan.

- Konfigurasi [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) sudah diatur dengan benar dalam file konfigurasi Intlayer Anda.
  - Field yang diperlukan:
    - URL aplikasi harus sesuai dengan yang Anda atur dalam konfigurasi editor (`applicationURL`).
    - URL CMS

- Pastikan konfigurasi proyek telah dipush ke Intlayer CMS.

- Visual editor menggunakan iframe untuk menampilkan situs web Anda. Pastikan Content Security Policy (CSP) situs web Anda mengizinkan URL CMS sebagai `frame-ancestors` ('https://app.intlayer.org' secara default). Periksa konsol editor untuk setiap kesalahan.
