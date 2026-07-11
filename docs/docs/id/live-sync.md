---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Sinkronisasi langsung | Refleksikan perubahan konten CMS saat runtime
description: Biarkan aplikasi Anda merefleksikan perubahan konten Intlayer CMS saat runtime, tanpa perlu build ulang atau deploy ulang.
keywords:
  - Sinkronisasi langsung
  - Live Sync
  - CMS
  - Editor Visual
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Dipindahkan dari dokumentasi Intlayer CMS ke halamannya sendiri"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Menambahkan dokumentasi live sync"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Mengganti field `hotReload` dengan `liveSync`"
author: aymericzip
---

# Sinkronisasi langsung

Sinkronisasi Langsung memungkinkan aplikasi Anda mencerminkan perubahan konten CMS secara real-time. Tidak perlu membangun ulang atau menerapkan ulang. Saat diaktifkan, pembaruan dikirimkan ke server Sinkronisasi Langsung yang menyegarkan kamus yang dibaca aplikasi Anda.

## Daftar Isi

<TOC/>

---

## Mengaktifkan Sinkronisasi langsung

Aktifkan Sinkronisasi Langsung dengan memperbarui konfigurasi Intlayer Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
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
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Server Live Sync membungkus aplikasi Anda dan secara otomatis menerapkan konten yang diperbarui saat konten tersebut tiba.

Untuk menerima notifikasi perubahan dari CMS, server Live Sync mempertahankan koneksi SSE ke backend. Ketika konten berubah di CMS, backend meneruskan pembaruan ke server Live Sync, yang kemudian menulis kamus baru. Aplikasi Anda akan mencerminkan pembaruan tersebut pada navigasi berikutnya atau saat memuat ulang browser, tidak perlu membangun ulang.

Diagram alur (CMS/Backend -> Server Live Sync -> Server Aplikasi -> Frontend):

![Alur Live Sync CMS/Backend/Server Live Sync/Server Aplikasi/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Cara kerjanya:

![Skema Logika Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## Alur kerja pengembangan (lokal)

- Dalam pengembangan, semua kamus jarak jauh diambil saat aplikasi dimulai, sehingga Anda dapat menguji pembaruan dengan cepat.
- Untuk menguji Live Sync secara lokal dengan Next.js, bungkus server dev Anda:

```json5 fileName="package.json"
{
  "scripts": {
    // ... skrip lainnya
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Untuk Vite
  },
}
```

Aktifkan optimasi agar Intlayer menerapkan transformasi impor Live selama pengembangan:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Pengaturan ini membungkus server dev Anda dengan server Live Sync, mengambil kamus jarak jauh saat startup, dan mengalirkan pembaruan dari CMS melalui SSE. Segarkan halaman untuk melihat perubahan.

## Catatan dan batasan

- Tambahkan origin live sync ke kebijakan keamanan situs Anda (CSP). Pastikan URL live sync diizinkan dalam `connect-src` (dan `frame-ancestors` jika relevan).
- Live Sync tidak berfungsi dengan output statis. Untuk Next.js, halaman harus dinamis agar dapat menerima pembaruan saat runtime (misalnya, gunakan `generateStaticParams`, `generateMetadata`, `getServerSideProps`, atau `getStaticProps` secara tepat untuk menghindari batasan hanya statis penuh).
- Di CMS, setiap kamus memiliki flag `live`. Hanya kamus dengan `live=true` yang diambil melalui API live sync; yang lain diimpor secara dinamis dan tetap tidak berubah saat runtime.
- Flag `live` dievaluasi untuk setiap kamus saat build. Jika konten jarak jauh tidak diberi flag `live=true` selama build, Anda harus membangun ulang untuk mengaktifkan Live Sync untuk kamus tersebut.
- Server live sync harus dapat menulis ke `.intlayer`. Dalam container, pastikan akses tulis ke `/.intlayer`.

## Tautan berguna

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [Referensi Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Panduan Self-Hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)
