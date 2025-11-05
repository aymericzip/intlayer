---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Membandingkan next-i18next dengan next-intl dan Intlayer untuk internasionalisasi (i18n) aplikasi Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internasionalisasi
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Internasionalisasi Next.js (i18n)

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Mari kita lihat persamaan dan perbedaan antara tiga opsi i18n untuk Next.js: next-i18next, next-intl, dan Intlayer.

Ini bukan tutorial lengkap. Ini adalah perbandingan untuk membantu Anda memilih.

Kami fokus pada **Next.js 13+ App Router** (dengan **React Server Components**) dan mengevaluasi:

<TOC/>

> **singkatnya**: Ketiganya dapat melokalkan aplikasi Next.js. Jika Anda menginginkan **konten yang dibatasi pada komponen**, **tipe TypeScript yang ketat**, **pemeriksaan kunci yang hilang saat build-time**, **kamus yang di-tree-shake**, dan **App Router kelas satu + pembantu SEO**, **Intlayer** adalah pilihan paling lengkap dan modern.

> Salah satu kebingungan yang sering dibuat oleh pengembang adalah mengira bahwa `next-intl` adalah versi Next.js dari `react-intl`. Itu tidak benar, `next-intl` dikelola oleh [Amann](https://github.com/amannn), sementara `react-intl` dikelola oleh [FormatJS](https://github.com/formatjs/formatjs).

---

## Singkatnya

- **next-intl** - Format pesan yang ringan dan sederhana dengan dukungan Next.js yang solid. Katalog terpusat umum digunakan; DX sederhana, tetapi keamanan dan pemeliharaan skala besar sebagian besar menjadi tanggung jawab Anda.
- **next-i18next** - i18next dalam balutan Next.js. Ekosistem matang dan fitur melalui plugin (misalnya, ICU), tetapi konfigurasi bisa verbose dan katalog cenderung terpusat seiring pertumbuhan proyek.
- **Intlayer** - Model konten berfokus pada komponen untuk Next.js, **pengetikan TS yang ketat**, **pemeriksaan saat build-time**, **tree-shaking**, **middleware & pembantu SEO bawaan**, **Visual Editor/CMS** opsional, dan **terjemahan dibantu AI**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Lencana diperbarui secara otomatis. Snapshot akan bervariasi seiring waktu.

---

## Perbandingan Fitur Berdampingan (Fokus pada Next.js)

| Fitur                                                 | `next-intlayer` (Intlayer)                                                                                                                      | `next-intl`                                                                                                      | `next-i18next`                                                                                                   |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Terjemahan Dekat Komponen**                         | ✅ Ya, konten ditempatkan bersama dengan setiap komponen                                                                                        | ❌ Tidak                                                                                                         | ❌ Tidak                                                                                                         |
| **Integrasi TypeScript**                              | ✅ Lanjutan, tipe ketat yang dihasilkan secara otomatis                                                                                         | ✅ Baik                                                                                                          | ⚠️ Dasar                                                                                                         |
| **Deteksi Terjemahan yang Hilang**                    | ✅ Sorotan error TypeScript dan error/peringatan saat build                                                                                     | ⚠️ Cadangan saat runtime                                                                                         | ⚠️ Cadangan saat runtime                                                                                         |
| **Konten Kaya (JSX/Markdown/komponen)**               | ✅ Dukungan langsung                                                                                                                            | ❌ Tidak dirancang untuk node kaya                                                                               | ⚠️ Terbatas                                                                                                      |
| **Terjemahan Berbasis AI**                            | ✅ Ya, mendukung beberapa penyedia AI. Dapat digunakan dengan kunci API Anda sendiri. Mempertimbangkan konteks aplikasi dan cakupan konten Anda | ❌ Tidak                                                                                                         | ❌ Tidak                                                                                                         |
| **Editor Visual**                                     | ✅ Ya, Editor Visual lokal + CMS opsional; dapat mengeksternalisasi konten codebase; dapat disematkan                                           | ❌ Tidak / tersedia melalui platform lokalisasi eksternal                                                        | ❌ Tidak / tersedia melalui platform lokalisasi eksternal                                                        |
| **Routing Lokal**                                     | ✅ Ya, mendukung jalur lokal secara langsung (berfungsi dengan Next.js & Vite)                                                                  | ✅ Bawaan, App Router mendukung segmen `[locale]`                                                                | ✅ Bawaan                                                                                                        |
| **Generasi Rute Dinamis**                             | ✅ Ya                                                                                                                                           | ✅ Ya                                                                                                            | ✅ Ya                                                                                                            |
| **Pluralisasi**                                       | ✅ Pola berbasis enumerasi                                                                                                                      | ✅ Baik                                                                                                          | ✅ Baik                                                                                                          |
| **Format (tanggal, angka, mata uang)**                | ✅ Formatter yang dioptimalkan (Intl di balik layar)                                                                                            | ✅ Baik (bantuan Intl)                                                                                           | ✅ Baik (bantuan Intl)                                                                                           |
| **Format Konten**                                     | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml dalam pengembangan)                                                                                 | ✅ .json, .js, .ts                                                                                               | ⚠️ .json                                                                                                         |
| **Dukungan ICU**                                      | ⚠️ Sedang dalam pengembangan                                                                                                                    | ✅ Ya                                                                                                            | ⚠️ Melalui plugin (`i18next-icu`)                                                                                |
| **Bantuan SEO (hreflang, sitemap)**                   | ✅ Alat bawaan: bantuan untuk sitemap, robots.txt, metadata                                                                                     | ✅ Baik                                                                                                          | ✅ Baik                                                                                                          |
| **Ekosistem / Komunitas**                             | ⚠️ Lebih kecil tetapi tumbuh cepat dan responsif                                                                                                | ✅ Baik                                                                                                          | ✅ Baik                                                                                                          |
| **Rendering sisi server & Komponen Server**           | ✅ Ya, dioptimalkan untuk SSR / Komponen Server React                                                                                           | ⚠️ Didukung pada tingkat halaman tetapi perlu meneruskan fungsi t pada pohon komponen untuk komponen server anak | ⚠️ Didukung pada tingkat halaman tetapi perlu meneruskan fungsi t pada pohon komponen untuk komponen server anak |
| **Tree-shaking (memuat hanya konten yang digunakan)** | ✅ Ya, per-komponen saat build time melalui plugin Babel/SWC                                                                                    | ⚠️ Sebagian                                                                                                      | ⚠️ Sebagian                                                                                                      |
| **Lazy loading**                                      | ✅ Ya, per-locale / per-dictionary                                                                                                              | ✅ Ya (per-route/per-locale), perlu manajemen namespace                                                          | ✅ Ya (per-route/per-locale), perlu manajemen namespace                                                          |
| **Purge unused content**                              | ✅ Ya, per-dictionary saat build time                                                                                                           | ❌ Tidak, dapat dikelola secara manual dengan manajemen namespace                                                | ❌ Tidak, dapat dikelola secara manual dengan manajemen namespace                                                |
| **Manajemen Proyek Besar**                            | ✅ Mendorong modular, cocok untuk design-system                                                                                                 | ✅ Modular dengan setup                                                                                          | ✅ Modular dengan setup                                                                                          |
| **Pengujian Terjemahan yang Hilang (CLI/CI)**         | ✅ CLI: `npx intlayer content test` (audit ramah CI)                                                                                            | ⚠️ Tidak bawaan; dokumentasi menyarankan `npx @lingual/i18n-check`                                               | ⚠️ Tidak bawaan; mengandalkan alat i18next / runtime `saveMissing`                                               |

---

## Pendahuluan

Next.js memberikan dukungan bawaan untuk routing internasionalisasi (misalnya segmen locale). Namun fitur tersebut tidak melakukan terjemahan secara otomatis. Anda masih memerlukan pustaka untuk menampilkan konten yang dilokalisasi kepada pengguna Anda.

Banyak pustaka i18n yang ada, tetapi di dunia Next.js saat ini, tiga yang sedang naik daun: next-i18next, next-intl, dan Intlayer.

---

## Arsitektur & skalabilitas

- **next-intl / next-i18next**: Default ke **katalog terpusat** per locale (ditambah **namespace** di i18next). Bekerja dengan baik pada awalnya, tetapi sering menjadi area bersama yang besar dengan peningkatan keterkaitan dan perubahan kunci yang tinggi.
- **Intlayer**: Mendorong kamus **per-komponen** (atau per-fitur) yang **berada bersama** dengan kode yang mereka layani. Ini mengurangi beban kognitif, mempermudah duplikasi/migrasi bagian UI, dan mengurangi konflik antar tim. Konten yang tidak digunakan secara alami lebih mudah dikenali dan dihapus.

**Mengapa ini penting:** Dalam basis kode besar atau pengaturan sistem desain, **konten modular** lebih mudah diskalakan dibandingkan katalog monolitik.

---

## Ukuran bundle & dependensi

Setelah membangun aplikasi, bundle adalah JavaScript yang akan dimuat oleh browser untuk merender halaman. Oleh karena itu, ukuran bundle penting untuk performa aplikasi.

Ada dua komponen yang penting dalam konteks bundle aplikasi multi-bahasa:

- Kode aplikasi
- Konten yang dimuat oleh browser

## Kode Aplikasi

Pentingnya kode aplikasi dalam kasus ini minimal. Ketiga solusi tersebut mendukung tree-shaking, yang berarti bagian kode yang tidak digunakan tidak akan disertakan dalam bundle.

Berikut adalah perbandingan ukuran bundle JavaScript yang dimuat oleh browser untuk aplikasi multi-bahasa dengan ketiga solusi tersebut.

Jika kita tidak memerlukan formatter apapun dalam aplikasi, daftar fungsi yang diekspor setelah tree-shaking adalah:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Ukuran bundle adalah 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Ukuran bundle adalah 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Ukuran bundle adalah 80.7 kB -> 25.5 kB (gzip))

Fungsi-fungsi ini hanya pembungkus di sekitar konteks/state React, sehingga dampak total dari pustaka i18n pada ukuran bundle adalah minimal.

> Intlayer sedikit lebih besar daripada `next-intl` dan `next-i18next` karena mencakup lebih banyak logika dalam fungsi `useIntlayer`. Ini terkait dengan integrasi markdown dan `intlayer-editor`.

## Konten dan Terjemahan

Bagian ini sering diabaikan oleh pengembang, tetapi mari kita pertimbangkan kasus sebuah aplikasi yang terdiri dari 10 halaman dalam 10 bahasa. Mari kita asumsikan bahwa setiap halaman mengintegrasikan konten yang 100% unik untuk menyederhanakan perhitungan (dalam kenyataannya, banyak konten yang berulang antar halaman, misalnya judul halaman, header, footer, dll.).

Seorang pengguna yang ingin mengunjungi halaman `/fr/about` akan memuat konten dari satu halaman dalam bahasa tertentu. Mengabaikan optimasi konten berarti memuat 8.200% `((1 + (((10 halaman - 1) × (10 bahasa - 1)))) × 100)` dari konten aplikasi secara tidak perlu. Apakah Anda melihat masalahnya? Bahkan jika konten ini tetap berupa teks, dan sementara Anda mungkin lebih memilih untuk memikirkan optimasi gambar situs Anda, Anda mengirimkan konten yang tidak berguna ke seluruh dunia dan membuat komputer pengguna memprosesnya tanpa alasan.

Dua masalah penting:

- **Pemecahan berdasarkan rute:**

  > Jika saya berada di halaman `/about`, saya tidak ingin memuat konten dari halaman `/home`

- **Pemecahan berdasarkan locale:**

  > Jika saya berada di halaman `/fr/about`, saya tidak ingin memuat konten dari halaman `/en/about`

Sekali lagi, ketiga solusi ini menyadari masalah ini dan memungkinkan pengelolaan optimasi tersebut. Perbedaan antara ketiga solusi ini adalah DX (Developer Experience).

`next-intl` dan `next-i18next` menggunakan pendekatan terpusat untuk mengelola terjemahan, memungkinkan pemecahan JSON berdasarkan locale dan sub-file. Dalam `next-i18next`, file JSON disebut 'namespaces'; `next-intl` memungkinkan deklarasi pesan. Dalam `intlayer`, file JSON disebut 'dictionaries'.

- Dalam kasus `next-intl`, seperti `next-i18next`, konten dimuat pada tingkat halaman/layout, kemudian konten ini dimuat ke dalam context provider. Ini berarti pengembang harus secara manual mengelola file JSON yang akan dimuat untuk setiap halaman.

> Dalam praktiknya, ini berarti pengembang sering melewatkan optimasi ini, lebih memilih untuk memuat semua konten dalam context provider halaman demi kesederhanaan.

- Dalam kasus `intlayer`, semua konten dimuat dalam aplikasi. Kemudian sebuah plugin (`@intlayer/babel` / `@intlayer/swc`) yang mengurus optimasi bundle dengan memuat hanya konten yang digunakan pada halaman tersebut. Oleh karena itu, pengembang tidak perlu secara manual mengelola kamus yang akan dimuat. Ini memungkinkan optimasi yang lebih baik, pemeliharaan yang lebih mudah, dan mengurangi waktu pengembangan.

Seiring pertumbuhan aplikasi (terutama ketika beberapa pengembang bekerja pada aplikasi tersebut), seringkali lupa untuk menghapus konten yang tidak lagi digunakan dari file JSON.

> Perlu dicatat bahwa semua JSON dimuat dalam semua kasus (next-intl, next-i18next, intlayer).

Inilah mengapa pendekatan Intlayer lebih efisien: jika sebuah komponen tidak lagi digunakan, kamusnya tidak dimuat dalam bundle.

Cara pustaka menangani fallback juga penting. Misalkan aplikasi menggunakan bahasa Inggris secara default, dan pengguna mengunjungi halaman `/fr/about`. Jika terjemahan dalam bahasa Prancis tidak tersedia, maka fallback ke bahasa Inggris akan digunakan.

Dalam kasus `next-intl` dan `next-i18next`, perpustakaan mengharuskan memuat JSON yang terkait dengan locale saat ini, tetapi juga dengan locale fallback. Dengan demikian, menganggap bahwa semua konten telah diterjemahkan, setiap halaman akan memuat 100% konten yang tidak diperlukan. **Sebaliknya, `intlayer` memproses fallback pada saat pembuatan kamus. Dengan demikian, setiap halaman hanya akan memuat konten yang digunakan.**

> Catatan: Untuk mengoptimalkan bundle menggunakan `intlayer`, Anda perlu mengatur opsi `importMode: 'dynamic'` di file `intlayer.config.ts` Anda. Dan pastikan plugin `@intlayer/babel` / `@intlayer/swc` terpasang (terpasang secara default menggunakan `vite-intlayer`).

Berikut adalah contoh dampak optimasi ukuran bundle menggunakan `intlayer` dalam aplikasi vite + react:

| Bundle yang dioptimalkan                                                                                      | Bundle yang tidak dioptimalkan                                                                                                      |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ![bundle yang dioptimalkan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![bundle yang tidak dioptimalkan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript & keamanan

<Columns>
  <Column>

**next-i18next**

- Typing dasar untuk hooks. **pengetikan kunci yang ketat memerlukan alat/konfigurasi tambahan**.

  </Column>
  <Column>

**next-intl**

- Dukungan TypeScript yang solid, tetapi **kunci tidak secara ketat ditegakkan secara default**. Anda harus mempertahankan pola keamanan secara manual.

  </Column>
  <Column>

**intlayer**

- **Menghasilkan tipe yang ketat** dari konten Anda. **Autocompletion IDE** dan **kesalahan saat kompilasi** menangkap kesalahan ketik dan kunci yang hilang sebelum deploy.

  </Column>
</Columns>

**Mengapa ini penting:** Pengetikan yang kuat memindahkan kegagalan ke **kiri** (CI/build) daripada ke **kanan** (runtime).

---

## Penanganan terjemahan yang hilang

<Columns>
  <Column>

**next-i18next**

- Mengandalkan **fallback saat runtime**. Build tidak gagal.

  </Column>
  <Column>

**next-intl**

- Mengandalkan **fallback saat runtime**. Build tidak gagal.

  </Column>
  <Column>

**intlayer**

- **Deteksi saat build** dengan **peringatan/eror** untuk locale atau kunci yang hilang.

  </Column>
</Columns>

**Mengapa ini penting:** Menangkap kekurangan saat build mencegah string 'undefined' muncul di produksi.

---

## Routing, middleware & strategi URL

<Columns>
  <Column>

**next-i18next**

- Memungkinkan routing yang dilokalisasi. Namun middleware tidak disertakan secara bawaan.

  </Column>
  <Column>

**next-intl**

- Memungkinkan routing yang dilokalisasi.
- Menyediakan middleware.

  </Column>
  <Column>

**intlayer**

- Memungkinkan routing yang dilokalisasi.
- Menyediakan middleware.

  </Column>
</Columns>

**Mengapa ini penting:** Membantu SEO dan penemuan, serta pengalaman pengguna.

---

## Kesesuaian Server Components (RSC)

<Columns>
  <Column>

**next-i18next**

- Mendukung komponen server halaman dan layout.
- Tidak menyediakan API sinkron untuk komponen server anak.

  </Column>
  <Column>

**next-intl**

- Mendukung komponen server halaman dan layout.
- Tidak menyediakan API sinkron untuk komponen server anak.

  </Column>
  <Column>

**intlayer**

- Mendukung komponen server halaman dan layout.
- Menyediakan API sinkron untuk komponen server anak.

  </Column>
</Columns>

**Mengapa ini penting:** Dukungan komponen server adalah fitur utama Next.js 13+, membantu meningkatkan performa. Meneruskan props locale atau fungsi `t` dari komponen induk ke komponen server anak membuat komponen Anda kurang dapat digunakan ulang.

---

## Integrasi dengan platform lokalisasi (TMS)

Organisasi besar sering mengandalkan Sistem Manajemen Terjemahan (TMS) seperti **Crowdin**, **Phrase**, **Lokalise**, **Localizely**, atau **Localazy**.

- **Mengapa perusahaan peduli**
  - **Kolaborasi & peran**: Banyak aktor yang terlibat: pengembang, manajer produk, penerjemah, reviewer, tim pemasaran.
  - **Skala & efisiensi**: lokalisasi berkelanjutan, tinjauan dalam konteks.

- **next-intl / next-i18next**
  - Biasanya menggunakan **katalog JSON terpusat**, sehingga ekspor/impor dengan TMS menjadi mudah.
  - Ekosistem yang matang dan contoh/integrasi untuk platform-platform di atas.

- **Intlayer**
  - Mendorong **kamus terdesentralisasi per komponen** dan mendukung konten **TypeScript/TSX/JS/JSON/MD**.
  - Ini meningkatkan modularitas dalam kode, tetapi dapat membuat integrasi TMS plug-and-play menjadi lebih sulit ketika sebuah alat mengharapkan file JSON yang terpusat dan datar.
  - Intlayer menyediakan alternatif: **terjemahan berbantuan AI** (menggunakan kunci penyedia Anda sendiri), **Editor Visual/CMS**, dan alur kerja **CLI/CI** untuk menangkap dan mengisi celah.

> Catatan: `next-intl` dan `i18next` juga menerima katalog TypeScript. Jika tim Anda menyimpan pesan dalam file `.ts` atau mendesentralisasikannya berdasarkan fitur, Anda bisa menghadapi gesekan TMS yang serupa. Namun, banyak pengaturan `next-intl` tetap terpusat di folder `locales/`, yang sedikit lebih mudah untuk direfaktor ke JSON untuk TMS.

---

## Pengalaman Pengembang

Bagian ini membuat perbandingan mendalam antara tiga solusi. Alih-alih mempertimbangkan kasus sederhana, seperti yang dijelaskan dalam dokumentasi 'memulai' untuk setiap solusi, kita akan mempertimbangkan kasus penggunaan nyata, yang lebih mirip dengan proyek nyata.

### Struktur Aplikasi

Struktur aplikasi penting untuk memastikan pemeliharaan yang baik untuk basis kode Anda.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Perbandingan

- **next-intl / next-i18next**: Katalog terpusat (JSON; namespace/pesan). Struktur yang jelas, terintegrasi dengan baik dengan platform terjemahan, tetapi dapat menyebabkan lebih banyak pengeditan lintas file seiring pertumbuhan aplikasi.
- **Intlayer**: Kamus `.content.{ts|js|json}` per-komponen yang ditempatkan bersama komponen. Memudahkan penggunaan ulang komponen dan penalaran lokal; menambah file dan bergantung pada tooling saat build.

#### Pengaturan dan Memuat Konten

Seperti yang disebutkan sebelumnya, Anda harus mengoptimalkan bagaimana setiap file JSON diimpor ke dalam kode Anda.
Cara pustaka menangani pemuatan konten sangat penting.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Mengembalikan path yang sudah dilokalkan berdasarkan locale
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
// Menghasilkan URL absolut berdasarkan locale dan path
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Memuat sumber daya JSON dari src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Memaksa rendering statis untuk halaman ini
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Muat hanya namespace yang dibutuhkan oleh layout/halaman Anda
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams()() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Atur locale permintaan aktif untuk render server ini (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Pesan dimuat di sisi server. Kirim hanya yang diperlukan ke klien.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Terjemahan/pemformatan yang benar-benar di sisi server
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Perbandingan

Ketiganya mendukung pemuatan konten dan penyedia per-locale.

- Dengan **next-intl/next-i18next**, Anda biasanya memuat pesan/namespace yang dipilih per rute dan menempatkan penyedia di tempat yang diperlukan.

- Dengan **Intlayer**, menambahkan analisis saat build untuk menginfer penggunaan, yang dapat mengurangi pengkabelan manual dan memungkinkan satu penyedia root saja.

Pilih antara kontrol eksplisit dan otomatisasi berdasarkan preferensi tim.

### Penggunaan dalam komponen klien

Mari kita ambil contoh komponen klien yang merender sebuah penghitung.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Terjemahan (satu JSON per namespace di bawah `src/locales/...`)**

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Komponen klien (memuat hanya namespace yang diperlukan)**

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Pastikan halaman/provider hanya memuat namespace yang Anda butuhkan (misalnya `about`).
> Jika Anda menggunakan React < 19, gunakan memo untuk formatter berat seperti `Intl.NumberFormat`.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Terjemahan (bentuk digunakan ulang; muat ke dalam pesan next-intl sesuai keinginan Anda)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Komponen klien**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Lingkup langsung ke objek bersarang
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Jangan lupa untuk menambahkan pesan "about" pada pesan klien halaman

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Konten**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Komponen klien**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // mengembalikan string
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### Perbandingan

- **Format angka**
  - **next-i18next**: tidak ada `useNumber`; menggunakan `Intl.NumberFormat` (atau i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: `useNumber()` bawaan.

- **Kunci**
  - Pertahankan struktur bertingkat (`about.counter.label`) dan sesuaikan cakupan hook Anda (`useTranslation("about")` + `t("counter.label")` atau `useTranslations("about.counter")` + `t("label")`).

- **Lokasi file**
  - **next-i18next** mengharapkan JSON di `public/locales/{lng}/{ns}.json`.
  - **next-intl** fleksibel; muat pesan sesuai konfigurasi Anda.
  - **Intlayer** menyimpan konten dalam kamus TS/JS dan menyelesaikan berdasarkan kunci.

---

### Penggunaan dalam komponen server

Kita akan mengambil kasus sebuah komponen UI. Komponen ini adalah komponen server, dan harus dapat dimasukkan sebagai anak dari komponen klien. (halaman (komponen server) -> komponen klien -> komponen server). Karena komponen ini dapat dimasukkan sebagai anak dari komponen klien, maka tidak boleh bersifat async.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({
  t,
  locale,
  count,
  formatter,
}: ServerComponentProps) => {
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

> Karena komponen server tidak dapat bersifat async, Anda perlu mengoper terjemahan dan fungsi formatter sebagai props.
>
> Di halaman / layout Anda:
>
> - `import { getTranslations, getFormatter } from "next-intl/server";`
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer menyediakan hook **aman untuk server** melalui `next-intlayer/server`. Untuk bekerja, `useIntlayer` dan `useNumber` menggunakan sintaks mirip hook, serupa dengan hook di sisi klien, tetapi bergantung pada konteks server di bawahnya (`IntlayerServerProvider`).

### Metadata / Sitemap / Robots

Menerjemahkan konten itu bagus. Namun orang sering lupa bahwa tujuan utama internasionalisasi adalah membuat situs web Anda lebih terlihat oleh dunia. I18n adalah tuas luar biasa untuk meningkatkan visibilitas situs web Anda.

Berikut adalah daftar praktik terbaik terkait SEO multibahasa.

- atur tag meta hreflang di tag `<head>`
  > Ini membantu mesin pencari memahami bahasa apa saja yang tersedia di halaman
- daftarkan semua terjemahan halaman dalam sitemap.xml menggunakan skema XML `http://www.w3.org/1999/xhtml`
  >
- jangan lupa untuk mengecualikan halaman dengan prefix dari robots.txt (misalnya `/dashboard`, dan `/fr/dashboard`, `/es/dashboard`)
  >
- gunakan komponen Link khusus untuk mengarahkan ke halaman yang paling terlokalisasi (misalnya dalam bahasa Prancis `<a href="/fr/about">A propos</a>`)
  >

Pengembang sering lupa untuk mereferensikan halaman mereka dengan benar di berbagai locale.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;

  // Impor bundel JSON yang benar dari src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};

export default async function AboutPage() {
  return <h1>Tentang</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export const sitemap = (): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
};
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

const localizedPath = (locale: string, path: string) => {
  return locale === defaultLocale ? path : "/" + locale + path;
};

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
};

// ... Sisa kode halaman
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export const sitemap = (): MetadataRoute.Sitemap => {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
};
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Sisa kode halaman
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer menyediakan fungsi `getMultilingualUrls` untuk menghasilkan URL multibahasa untuk sitemap Anda.

### Middleware untuk routing locale

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

Tambahkan middleware untuk menangani deteksi locale dan routing:

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // mengecualikan file dengan ekstensi

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === "/" + l || pathname.startsWith("/" + l + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Cocokkan semua path kecuali yang diawali dengan ini dan file dengan ekstensi
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

Tambahkan middleware untuk menangani deteksi locale dan routing:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Lewati API, internal Next, dan aset statis
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

Intlayer menyediakan penanganan middleware bawaan melalui konfigurasi paket `next-intlayer`.

```ts fileName="src/middleware.ts"
import { intlayerMiddleware } from "next-intlayer/middleware";

export const middleware = intlayerMiddleware();

// menerapkan middleware ini hanya pada file di direktori app
export const config = {
  matcher: "/((?!api|_next|static|.*\\..*).*)",
};
```

Pengaturan middleware dipusatkan dalam file `intlayer.config.ts`.

  </TabItem>
</Tab>

### Daftar periksa pengaturan dan praktik terbaik

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

- Pastikan `lang` dan `dir` disetel pada root `<html>` di `src/app/[locale]/layout.tsx`.
- Pisahkan terjemahan ke dalam namespace (misalnya `common.json`, `about.json`) di bawah `src/locales/<locale>/`.
- Hanya muat namespace yang diperlukan di komponen klien menggunakan `useTranslation('<ns>')` dan dengan membatasi `I18nProvider` pada namespace yang sama.
- Pertahankan halaman agar statis jika memungkinkan: ekspor `export const dynamic = 'force-static'` pada halaman; atur `dynamicParams = false` dan implementasikan `generateStaticParams`.
- Gunakan komponen server sinkron yang bersarang di bawah batas klien dengan mengoper string yang sudah dihitung atau fungsi `t` dan `locale`.
- Untuk SEO, atur `alternates.languages` di metadata, daftarkan URL lokal di `sitemap.ts`, dan larang rute lokal duplikat di `robots.ts`.
- Lebih memilih formatter yang sadar locale (misalnya, `Intl.NumberFormat(locale)`) dan simpan dalam memo di sisi client jika menggunakan React < 19.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

- **Setel html `lang` dan `dir`**: Di `src/app/[locale]/layout.tsx`, hitung `dir` melalui `getLocaleDirection(locale)` dan setel `<html lang={locale} dir={dir}>`.
- **Pisahkan pesan berdasarkan namespace**: Atur JSON per locale dan namespace (misalnya, `common.json`, `about.json`).
- **Minimalkan payload client**: Pada halaman, kirim hanya namespace yang diperlukan ke `NextIntlClientProvider` (misalnya, `pick(messages, ['common', 'about'])`).
- **Utamakan halaman statis**: Ekspor `export const dynamic = 'force-static'` dan buat parameter statis untuk semua `locales`.
- **Komponen server sinkron**: Pertahankan komponen server agar sinkron dengan mengoper string yang sudah dihitung sebelumnya (label yang diterjemahkan, angka yang diformat) daripada panggilan async atau fungsi yang tidak dapat diserialisasi.

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

- **Konten modular**: Tempatkan kamus konten bersama dengan komponen menggunakan file `.content.{ts|js|json}`.
- **Keamanan tipe**: Manfaatkan integrasi TypeScript untuk validasi konten saat waktu kompilasi.
- **Optimasi saat build**: Gunakan alat build Intlayer untuk tree-shaking otomatis dan optimasi bundel.
- **Alat terintegrasi**: Manfaatkan routing bawaan, pembantu SEO, dan dukungan editor visual.

  </TabItem>
</Tab>

---

## Dan pemenangnya adalah…

Ini tidak sederhana. Setiap opsi memiliki kelebihan dan kekurangan. Berikut pandangan saya:

<Columns>
  <Column>

**next-i18next**

- matang, penuh fitur, banyak plugin komunitas, tetapi biaya pengaturan lebih tinggi. Jika Anda membutuhkan **ekosistem plugin i18next** (misalnya, aturan ICU lanjutan melalui plugin) dan tim Anda sudah mengenal i18next, menerima **lebih banyak konfigurasi** untuk fleksibilitas.

  </Column>
  <Column>

**next-intl**

- paling sederhana, ringan, lebih sedikit keputusan yang dipaksakan pada Anda. Jika Anda menginginkan solusi **minimal**, Anda nyaman dengan katalog terpusat, dan aplikasi Anda berukuran **kecil hingga menengah**.

  </Column>
  <Column>

**Intlayer**

- dibangun untuk Next.js modern, dengan konten modular, keamanan tipe, tooling, dan lebih sedikit boilerplate. Jika Anda menghargai **konten yang terfokus pada komponen**, **TypeScript yang ketat**, **jaminan waktu build**, **tree-shaking**, dan tooling routing/SEO/editor yang **lengkap** - terutama untuk **Next.js App Router**, sistem desain, dan **codebase besar yang modular**.

  </Column>
</Columns>

Jika Anda lebih memilih pengaturan minimal dan menerima beberapa penyambungan manual, next-intl adalah pilihan yang baik. Jika Anda membutuhkan semua fitur dan tidak keberatan dengan kompleksitas, next-i18next bisa digunakan. Namun jika Anda menginginkan solusi modern, skalabel, modular dengan alat bawaan, Intlayer bertujuan memberikan itu langsung dari kotak.

> **Alternatif untuk tim enterprise**: Jika Anda membutuhkan solusi yang sudah terbukti dan bekerja sempurna dengan platform lokalisasi yang sudah mapan seperti **Crowdin**, **Phrase**, atau sistem manajemen terjemahan profesional lainnya, pertimbangkan **next-intl** atau **next-i18next** karena ekosistem mereka yang matang dan integrasi yang sudah terbukti.

> **Roadmap masa depan**: Intlayer juga berencana mengembangkan plugin yang bekerja di atas solusi **i18next** dan **next-intl**. Ini akan memberikan Anda keuntungan dari Intlayer untuk otomasi, sintaks, dan manajemen konten sambil menjaga keamanan dan stabilitas yang disediakan oleh solusi mapan ini dalam kode aplikasi Anda.

## GitHub STARs

Bintang GitHub adalah indikator kuat dari popularitas sebuah proyek, kepercayaan komunitas, dan relevansi jangka panjang. Meskipun bukan ukuran langsung dari kualitas teknis, bintang tersebut mencerminkan berapa banyak pengembang yang menganggap proyek tersebut berguna, mengikuti perkembangannya, dan kemungkinan akan mengadopsinya. Untuk memperkirakan nilai sebuah proyek, bintang membantu membandingkan daya tarik antar alternatif dan memberikan wawasan tentang pertumbuhan ekosistem.

[![Grafik Sejarah Bintang](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Kesimpulan

Ketiga perpustakaan tersebut berhasil dalam lokalisasi inti. Perbedaannya adalah **seberapa banyak pekerjaan yang harus Anda lakukan** untuk mencapai pengaturan yang kuat dan skalabel di **Next.js modern**:

- Dengan **Intlayer**, **konten modular**, **TS ketat**, **keamanan saat build**, **bundle yang di-tree-shake**, dan **App Router kelas satu + alat SEO** adalah **default**, bukan tugas yang merepotkan.
- Jika tim Anda menghargai **pemeliharaan dan kecepatan** dalam aplikasi multi-locale yang berbasis komponen, Intlayer menawarkan pengalaman yang **paling lengkap** saat ini.

Lihat dokumen ['Mengapa Intlayer?'](https://intlayer.org/doc/why) untuk detail lebih lanjut.
