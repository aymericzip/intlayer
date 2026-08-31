---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "Bagian 'Sinkronisasi langsung' dipindahkan ke halamannya sendiri (live-sync.md), hanya menyisakan pengantar singkat dan tautan di sini"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Menambahkan dokumentasi live sync"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Mengganti field `hotReload` dengan `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Dokumentasi Sistem Manajemen Konten (CMS) Intlayer

<iframe title="Visual Editor + CMS untuk Aplikasi Web Anda: Penjelasan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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
bun x intlayer login
```

Ini akan membuka browser default Anda untuk menyelesaikan proses autentikasi dan menerima kredensial yang diperlukan (Client ID dan Client Secret) untuk menggunakan layanan Intlayer.

Dalam file konfigurasi Intlayer Anda, Anda dapat menyesuaikan pengaturan CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Jika Anda belum memiliki client ID dan client secret, Anda dapat memperolehnya dengan membuat client baru di [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Untuk melihat semua parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Menggunakan CMS

### Push konfigurasi Anda

Untuk mengonfigurasi Intlayer CMS, Anda dapat menggunakan perintah [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/id/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Jika Anda menggunakan variabel lingkungan dalam file konfigurasi `intlayer.config.ts` Anda, Anda dapat menentukan lingkungan yang diinginkan menggunakan argumen `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Perintah ini mengunggah konfigurasi Anda ke Intlayer CMS.

### Push kamus

Untuk mengubah kamus lokal Anda menjadi kamus jarak jauh, Anda dapat menggunakan perintah [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/id/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Jika Anda menggunakan variabel lingkungan dalam file konfigurasi `intlayer.config.ts` Anda, Anda dapat menentukan lingkungan yang diinginkan menggunakan argumen `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Perintah ini mengunggah kamus konten awal Anda, sehingga tersedia untuk pengambilan dan pengeditan secara asinkron melalui platform Intlayer.

### Edit kamus

Kemudian Anda akan dapat melihat dan mengelola kamus Anda di [Intlayer CMS](https://app.intlayer.org/content).

## Akses programatis dengan SDK `@intlayer/api`

Selain CLI dan editor visual, Intlayer menyediakan SDK yang ter-type dalam paket [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api). Ini memungkinkan Anda memperlakukan CMS sebagai **database konten headless**: Anda dapat mengambil proyek, mengambil dictionary, dan mendorong atau memperbarui mereka langsung dari aplikasi, skrip, atau pipeline CI Anda sendiri.

SDK menangani autentikasi untuk Anda. Selama `clientId` dan `clientSecret` Anda tersedia (dalam konfigurasi Intlayer atau environment), SDK memperoleh dan menyegarkan token akses OAuth2 secara otomatis serta menandatangani setiap permintaan.

### Instalasi

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Cara kerjanya: authenticator + endpoints

SDK dibagi menjadi **dua import terpisah** dengan tujuan, untuk membuat bundle Anda tetap kecil:

1. `createIntlayerCMS` — membuat **authenticator** yang ringan. Ini hanya membawa kredensial dan token akses yang dikelola; ia tidak mengetahui apa pun tentang domain tertentu.
2. `dictionaryEndpoint`, `projectEndpoint`, … — **endpoint binders** per-domain, masing-masing diimpor dari subpath-nya sendiri (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Anda melewatkan authenticator ke endpoint yang Anda butuhkan.

Karena setiap endpoint diimpor secara terpisah, bundle Anda hanya mencakup domain yang benar-benar Anda gunakan — mengimpor `dictionaryEndpoint` tidak akan pernah menarik klien project, AI, atau domain lainnya.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// Konfigurasi bersifat opsional: ketika dihilangkan, kredensial dibaca dari
// `@intlayer/config/built`, yang menyelesaikan variabel lingkungan INTLAYER_CLIENT_ID dan
// INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Kredensial CMS (`clientId` / `clientSecret`) memberikan **akses tulis** ke konten Anda. Selalu buat authenticator hanya di **sisi server** (server actions, route handlers, scripts, CI). Jangan pernah mengimpor ke kode sisi klien atau membuka kredensial Anda ke browser.

Jika Anda lebih suka tidak mengandalkan konfigurasi waktu build, teruskan kredensial secara eksplisit:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Opsional, untuk backend yang di-host sendiri:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Dapatkan kredensial Anda dengan membuat kunci akses baru di [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

### Fetch projects

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// Daftar proyek yang dapat diakses dengan kredensial Anda
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Baca wawasan lokalisasi agregat dari proyek yang dipilih
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Fetch dictionaries

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Daftar setiap kamus jarak jauh dari proyek
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// Atau dapatkan satu kamus berdasarkan kunci
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Push and update dictionaries

Use the CMS as a database to write content back:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Buat kamus baru
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert batch kamus (buat atau perbarui dalam satu panggilan)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Perbarui kamus yang ada
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> Tip: gunakan kembali endpoint yang terikat untuk menghindari pengulangan:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Mengekstrak satu method

Setiap endpoint method sudah terauthentikasi dan standalone (membawa penanganan token-nya sendiri), jadi Anda dapat mengekstraknya dan meneruskannya — misalnya untuk melakukannya sebagai dependency:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Sudah terauthentikasi — menyegarkan token secara otomatis pada setiap panggilan
export const pushDictionaries = dictionary.pushDictionaries;

// Penggunaan
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Sinkronisasi langsung

Sinkronisasi Langsung memungkinkan aplikasi Anda mencerminkan perubahan konten CMS secara real-time. Tidak perlu membangun ulang atau menerapkan ulang. Saat diaktifkan, pembaruan dikirimkan ke server Sinkronisasi Langsung yang menyegarkan kamus yang dibaca aplikasi Anda.

Untuk panduan pengaturan lengkap (mengaktifkan, menjalankan server Live Sync, alur kerja pengembangan lokal, dan batasan), lihat [dokumentasi Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/live-sync.md).

## Self-Hosting

Intlayer dapat berjalan sepenuhnya pada infrastruktur Anda sendiri. Satu baris perintah bootstrap stack lengkap (dashboard, API, database, object storage, dan email) dengan Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Untuk panduan setup lengkap, referensi variabel environment, instruksi upgrade, dan prosedur backup/restore, lihat [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

---

## Debug

Jika Anda mengalami masalah dengan CMS, periksa hal-hal berikut:

- Aplikasi sedang berjalan.

- Konfigurasi [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) sudah diatur dengan benar dalam file konfigurasi Intlayer Anda.
  - Field yang diperlukan:
    - URL aplikasi harus sesuai dengan yang Anda atur dalam konfigurasi editor (`applicationURL`).
    - URL CMS

- Pastikan konfigurasi proyek telah dipush ke Intlayer CMS.

- Visual editor menggunakan iframe untuk menampilkan situs web Anda. Pastikan Content Security Policy (CSP) situs web Anda mengizinkan URL CMS sebagai `frame-ancestors` ('https://app.intlayer.org' secara default). Periksa konsol editor untuk setiap kesalahan.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa perbedaan antara Intlayer CMS dan editor visual?">

[Editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) mengedit file kamus lokal di codebase Anda. CMS mengelola konten dari jarak jauh di server, memungkinkan pembaruan teks tanpa memerlukan deployment ulang kode aplikasi.

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle saya?">

Jauh lebih sedikit daripada pengaturan berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Markup yang dirender di server menyelesaikan kontennya di server, dan kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen, sehingga kunci dan bahasa yang tidak digunakan dibuang. [Kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale. Dibandingkan dengan alternatif konvensional, Intlayer mengurangi ukuran bundle dan halaman hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Bisakah saya bermigrasi dari i18next, next-intl atau react-i18next tanpa menulis ulang komponen saya?">

Ya, dan ada dua jalur. Anda dapat memigrasikan konten secara bertahap dengan [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md) atau [panduan migrasi next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md). Atau Anda dapat mempertahankan API Anda saat ini sepenuhnya: [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) mengekspos API yang sama persis dengan `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` dan `Lingui`, tetapi ditenagai oleh kamus Intlayer, sehingga hanya import yang berubah dan kode komponen tetap sama.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file sumber Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

Untuk alur kerja yang sepenuhnya otomatis, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time pada kode JSX, TSX, Vue dan Svelte, menghasilkan kamus pada setiap perubahan sehingga tidak ada kunci yang perlu dikelola secara manual. Karena bekerja melalui analisis statis, string yang hanya ada di runtime berada di luar jangkauannya.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: kesadaran yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan di mana pun. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Konten apa yang sebaiknya dipindahkan ke CMS?">

Konten yang sering berubah dan tidak terikat dengan siklus rilis kode: teks landing page, harga, pengumuman, banner promosi, dan artikel blog.

</Question>

<Question title="Apa yang terjadi jika CMS tidak dapat dihubungi?">

Aplikasi secara otomatis beralih ke deklarasi kamus lokal di codebase, sehingga gangguan jaringan tidak akan menampilkan halaman kosong kepada pengguna.

</Question>

<Question title="Bisakah saya meng-host CMS sendiri?">

Ya. CMS dapat dijalankan di infrastruktur Anda sendiri untuk kebutuhan di mana konten tidak boleh keluar dari jaringan internal Anda. Lihat [panduan self-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

<Question title="Apakah editor konten memerlukan developer untuk mempublikasikan perubahan?">

Tidak. Itulah tujuan utama kamus remote: editor mengubah teks di CMS dan berkat fitur sinkronisasi langsung (live sync), situs langsung menampilkan pembaruan tersebut.

</Question>

<Question title="Bisakah saya mengotomatiskan CMS alih-alih menggunakan antarmuka?">

Ya. SDK `@intlayer/api` mengekspos endpoint yang sama dengan antarmuka, memungkinkan Anda mengambil project, membaca kamus, dan mengotomatiskan publikasi melalui skrip.

</Question>

<Question title="Apakah CMS mendukung pengujian A/B untuk terjemahan?">

Ya. Kamus remote mendukung [varian konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md), memungkinkan Anda menguji berbagai versi teks pada kelompok audiens yang berbeda.

</Question>

<Question title="Apakah CMS gratis?">

Library Intlayer, CLI, compiler, dan editor visual gratis dan open source di bawah lisensi Apache 2.0. CMS cloud adalah layanan berbayar, tetapi versi self-host dapat dijalankan secara gratis di server Anda sendiri.

</Question>

</FAQ>
