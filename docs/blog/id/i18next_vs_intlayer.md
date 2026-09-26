---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs Intlayer: Benchmark & Perbandingan 2026"
description: "react-i18next dan next-i18next diuji terhadap Intlayer pada Next.js dan TanStack Start. Ukuran bundle, kebocoran konten, responsivitas pergantian bahasa, dan pengalaman pengembang."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internasionalisasi
  - i18n
  - Benchmark
  - Ukuran bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Benchmark Internasionalisasi (i18n) React & Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` adalah framework i18n yang paling banyak digunakan dalam ekosistem JavaScript. Melalui `react-i18next` dan `next-i18next`, library ini mendukung sebagian besar aplikasi React dan Next.js. Intlayer hadir sebagai alternatif modern berbasis kompilator dengan cakupan konten per komponen.

Artikel ini membandingkan keduanya berdasarkan pengukuran riil, bukan sekadar daftar fitur. Angka-angka ini diperoleh dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), sebuah suite pengujian sumber terbuka yang membangun aplikasi yang sama persis dengan masing-masing library dan mencatat data yang diunduh oleh peramban secara akurat.

<TOC/>

> **Ringkasan (tl;dr)**: `i18next` merupakan runtime terberat dalam pengujian benchmark ini: menambah **+77 KB gzip per halaman** pada Next.js dalam konfigurasi dasar (naive), dan masih menambah **+22 KB** bahkan setelah optimasi penuh namespace dan lazy-loading. Sebaliknya, Intlayer hanya menambah **+0.3 KB**. Setiap konfigurasi `i18next` kecuali konfigurasi yang diisolasi penuh (scoped) mengirimkan **sekitar 90% string dari halaman lain yang tidak dibuka**; sementara Intlayer secara bawaan mencatat **0%** kebocoran. Pergantian bahasa menggunakan backend lazy-load membutuhkan **123-185 ms** dengan `react-i18next`, dibandingkan hanya **3-4 ms** dengan Intlayer. Adaptor `@intlayer/next-i18next` mempertahankan API `i18next` dan menurunkan ukuran per halaman dari **218.5 KB** menjadi **150.7 KB**.

## Ringkasan Singkat

- **i18next / react-i18next / next-i18next** - Matang, kaya akan plugin, dan agnostik terhadap framework. Mendukung namespaces, detektor bahasa, backend, ICU via plugin, serta `<Trans>` untuk konten kaya. Konten dikelola terpusat di `locales/{lng}/{ns}.json`. Sangat andal, namun setiap langkah optimasi (pemecahan namespace, pemuatan per halaman, keamanan tipe data) membutuhkan konfigurasi manual yang harus Anda pelihara sendiri.
- **Intlayer** - Model konten berbasis komponen. Kamus `.content.ts` ditempatkan langsung di samping komponen terkait, kompilator saat build otomatis menerapkan tree-shaking dan lazy loading per komponen serta per bahasa, tipe data TypeScript yang ketat dibuat otomatis dari konten, dan terjemahan yang hilang akan langsung memicu error saat build. Menyediakan middleware bawaan, pembantu SEO, Visual Editor / CMS, dan penerjemahan dengan bantuan AI.

| Library                 | Bintang GitHub                                                                                                                                                                     | Total Commit                                                                                                                                                                           | Commit Terakhir                                                                                                                                         | Versi Perdana | Versi NPM                                                                                                             | Unduhan Bulanan NPM                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Januari 2012  | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Desember 2015 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | November 2018 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Lencana diperbarui secara otomatis. Angka dapat berubah seiring waktu.

## Perbandingan Fitur

| Fitur                                           | Intlayer (`react-intlayer` / `next-intlayer`)                                   | i18next (`react-i18next` / `next-i18next`)                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Terjemahan berada di dekat komponen**         | ✅ Ya, file `.content.ts` ditempatkan bersama komponen                          | ❌ Tidak, terpusat di `locales/{lng}/{ns}.json`                               |
| **Integrasi TypeScript**                        | ✅ Tipe ketat dihasilkan otomatis dari isi konten                               | ⚠️ Dasar; kunci ketat memerlukan perluasan `CustomTypeOptions` dan pengetikan |
| **Deteksi terjemahan yang hilang**              | ✅ Error TypeScript + error/peringatan saat build                               | ⚠️ Fallback runtime (`saveMissing`, pengulangan kunci)                        |
| **Konten kaya (JSX / Markdown / komponen)**     | ✅ Dukungan langsung secara native                                              | ⚠️ Menggunakan tag bernomor pada `<Trans>`                                    |
| **Dukungan ICU**                                | ⚠️ Dalam tahap pengembangan                                                     | ⚠️ Melalui plugin (`i18next-icu`)                                             |
| **Bentuk Jamak (Pluralization)**                | ✅ Pola berbasis enumerasi yang jelas                                           | ✅ Akhiran `_one` / `_other` (Intl.PluralRules)                               |
| **Pemformatan (tanggal, angka, mata uang)**     | ✅ `useNumber`, `useDate`, ... (memanfaatkan Intl bawaan)                       | ⚠️ Formatter interpolasi atau pemanggilan manual `Intl.*`                     |
| **Routing terlokalisasi dan middleware**        | ✅ Proxy/middleware terintegrasi, `getMultilingualUrls`                         | ⚠️ Tidak ada di core; membutuhkan middleware kustom atau pihak ketiga         |
| **Pembantu SEO (hreflang, sitemap, robots)**    | ✅ Alat bantu terintegrasi                                                      | ❌ Dikerjakan manual                                                          |
| **Komponen server sinkron (RSC)**               | ✅ `useIntlayer` dari `next-intlayer/server` dapat langsung dipanggil di server | ⚠️ Memanggil `getFixedT` di page lalu mengalirkan `t` melalui Props           |
| **Tree-shaking (hanya memuat konten terpakai)** | ✅ Per komponen dan per bahasa, otomatis oleh kompilator                        | ⚠️ Manual: namespaces + daftar `ns` per halaman + backend                     |
| **Pemuatan lambat (Lazy loading)**              | ✅ `importMode: 'dynamic'` (cukup satu baris konfigurasi)                       | ✅ Melalui plugin backend (`i18next-resources-to-backend`, dll.)              |
| **Pembersihan konten tak terpakai (Purge)**     | ✅ Kamus yang tidak terpakai dibuang saat build                                 | ❌ Tidak tersedia secara bawaan                                               |
| **Uji terjemahan hilang (CLI / CI)**            | ✅ `npx intlayer content test`                                                  | ⚠️ Menggunakan `i18next-parser` atau perkakas eksternal                       |
| **Terjemahan berbantuan AI**                    | ✅ Terintegrasi, menggunakan kunci API penyedia pilihan Anda                    | ❌ Tidak ada (Locize merupakan layanan berbayar terpisah)                     |
| **Visual Editor / CMS**                         | ✅ Visual Editor gratis + CMS opsional                                          | ❌ Tidak ada (bergantung pada Locize atau platform luar)                      |
| **Server MCP & Agent Skills**                   | ✅ Didukung penuh                                                               | ❌ Tidak didukung                                                             |
| **Ekosistem & Komunitas**                       | ⚠️ Lebih baru namun berkembang sangat pesat                                     | ✅ Terbesar dan paling berpengalaman                                          |

## Pengujian Benchmark

### Apa yang Diukur?

Suite pengujian [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi yang identik** dengan setiap library: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 bahasa** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), dengan komponen dan konten yang sama persis. Pengukuran diuji pada bahasa Inggris (`en`) dan Prancis (`fr`). Setiap library diuji dengan hingga empat **strategi pemuatan**:

| Strategi           | Deskripsi                                                                                   | Contoh Penggunaan                           |
| ------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **static**         | Seluruh bahasa dan halaman digabungkan dalam satu bundle (`resources` langsung di `init()`) | Prototipe kilat, kode hasil generasi AI     |
| **dynamic**        | Hanya bahasa aktif yang dimuat lewat backend, namun seluruh namespace dimuat bersamaan      | Sebagian besar proyek umum                  |
| **scoped-static**  | Satu namespace per rute, seluruhnya disertakan di bundle awal                               | Kasus yang jarang terjadi                   |
| **scoped-dynamic** | Namespace per rute + lazy loading lewat backend. Hanya halaman aktif dan bahasa aktif       | Aplikasi dengan batasan performa yang ketat |

Intlayer tidak memerlukan varian "scoped": Kompilator secara otomatis mengisolasi konten **pada level komponen**, sehingga baris `static` dan `dynamic` sudah teroptimasi sejak awal.

Metrik yang dicatat untuk setiap build:

- **Lib size**: Ukuran gzip komponen kosong yang hanya mengimpor library i18n (biaya runtime tetap).
- **Page JS**: Rata-rata ukuran gzip JavaScript yang diunduh per halaman (di seluruh halaman dan bahasa).
- **Locale leak %**: Persentase string terjemahan dalam file JS yang diunduh yang berasal dari bahasa yang **tidak** sedang dilihat pengguna.
- **Page leak %**: Persentase string terjemahan dalam file JS yang berasal dari halaman tempat pengguna **tidak** berada.
- **Component avg**: Rata-rata ukuran gzip setiap komponen yang dikompilasi secara terisolasi.
- **E2E reactivity**: Waktu aktual dari pemilihan bahasa baru hingga pembaruan tag `html[lang]` di DOM (Playwright, rata-rata 5 kali percobaan).
- **Hydration**: Durasi fase hidrasi React.

> Data di bawah ini diambil dari pengujian tanggal **2026-09-12** menggunakan `next-i18next` 16.3.0, `react-i18next` 17.0.13, dan `intlayer` 9.5.1. Aplikasi pengujian dirancang ringkas, sehingga persentase kebocoran mencerminkan **pola struktural**: Kebocoran akan bertambah besar seiring bertambahnya teks aplikasi, sementara biaya runtime tetap statis.

### Hasil pada Next.js (`next-i18next`)

Pilih metrik dan pustaka yang Anda minati:

<I18nBenchmark framework="nextjs" vertical/>

| Library                           | Strategi       | Lib size (gz) | Page JS avg (gz) | Kebocoran Bahasa | Kebocoran Halaman | Rata-rata Komp. (gz) | Reaktivitas E2E | Hydration |
| --------------------------------- | -------------- | ------------: | ---------------: | ---------------: | ----------------: | -------------------: | --------------: | --------: |
| **base** (tanpa i18n)             | -              |        0.0 KB |         141.0 KB |             0.0% |              0.0% |               0.9 KB |         13.4 ms |   11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |             0.0% |             89.8% |              78.5 KB |         16.4 ms |   15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |            50.0% |             89.8% |              26.1 KB |         15.4 ms |   27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |             0.0% |             89.8% |              78.9 KB |         16.4 ms |   14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |             0.0% |              0.0% |              27.1 KB |         15.9 ms |   15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |         **0.0%** |          **0.0%** |           **8.5 KB** |     **15.5 ms** |   16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |         **0.0%** |          **0.0%** |           **6.9 KB** |     **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (kompat) | static         |        9.4 KB |         150.7 KB |             0.0% |              0.0% |               9.7 KB |         10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (kompat) | dynamic        |        9.4 KB |         150.7 KB |             0.0% |              0.0% |               9.7 KB |         11.9 ms |   10.6 ms |

**Analisis Hasil**

- **Biaya runtime**: Inti `i18next` yang digabungkan dengan `react-i18next` merupakan runtime paling berat yang diuji: **19.7 KB gzip** untuk sebuah komponen kosong, dibandingkan hanya 5.5 KB pada `next-intlayer`.
- **Konfigurasi standar sangat membebani**: Menyematkan `resources` langsung pada `init()` menghasilkan **218.5 KB per halaman** (+77.5 KB di atas aplikasi dasar). Setiap halaman dipaksa mengunduh seluruh namespace.
- **Optimasi manual memakan waktu**: Beralih ke backend (`dynamic`) menghemat 49 KB namun **tetap membocorkan 90% teks halaman lain**, dan separuh dari teks yang terunduh berasal dari bahasa yang salah. Pemecahan namespace per rute (`scoped-dynamic`) berhasil menghentikan kebocoran pada angka **163.4 KB**, namun tetap **+22.4 KB per halaman lebih besar** daripada Intlayer (141.3 KB) yang tidak memerlukan pengaturan manual sama sekali.
- **Ukuran per komponen**: Komponen yang memanggil `useTranslation()` menghasilkan ukuran 26-79 KB; komponen yang sama dengan `useIntlayer()` hanya berukuran 6.9 KB.
- **Waktu hidrasi**: Pada konfigurasi `dynamic`, waktu hidrasi melonjak menjadi 27.7 ms karena instance i18next harus diinisialisasi dan meminta data backend di sisi klien sebelum React dapat menyelesaikan hidrasi.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap, setiap pustaka dan setiap strategi, ada di [laporan benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md).

### Hasil pada TanStack Start (`react-i18next`)

Aplikasi yang sama pada TanStack Start dengan `react-i18next` murni untuk memisahkan faktor arsitektur Next.js:

| Library               | Strategi       | Lib size (gz) | Page JS avg (gz) | Kebocoran Bahasa | Kebocoran Halaman | Rata-rata Komp. (gz) | Reaktivitas E2E | Hydration |
| --------------------- | -------------- | ------------: | ---------------: | ---------------: | ----------------: | -------------------: | --------------: | --------: |
| **base** (tanpa i18n) | -              |        0.0 KB |         111.0 KB |             0.0% |              0.0% |               0.7 KB |          8.1 ms |   21.6 ms |
| `react-i18next`       | static         |       18.4 KB |         180.3 KB |            50.0% |             89.8% |              24.3 KB |         12.9 ms |   85.1 ms |
| `react-i18next`       | dynamic        |       18.4 KB |         136.4 KB |            23.1% |             89.8% |              24.8 KB |        123.1 ms |   32.9 ms |
| `react-i18next`       | scoped-static  |       18.4 KB |         184.2 KB |            50.7% |             89.8% |              25.3 KB |        185.1 ms |   25.2 ms |
| `react-i18next`       | scoped-dynamic |       18.4 KB |         127.2 KB |             0.0% |              0.0% |              26.7 KB |         17.6 ms |   11.3 ms |
| **`intlayer`**        | static         |    **5.0 KB** |     **125.8 KB** |            50.0% |          **0.0%** |           **8.1 KB** |      **3.2 ms** |   11.5 ms |
| **`intlayer`**        | dynamic        |    **5.0 KB** |     **118.6 KB** |         **0.0%** |          **0.0%** |           **6.3 KB** |      **3.6 ms** |   14.1 ms |

**Analisis Hasil**

- Aplikasi dasar `react-i18next` mengunduh **+69 KB per halaman** lebih banyak dari aplikasi tanpa i18n, dan hidrasi membutuhkan **85 ms** (4 kali lebih lama) karena seluruh struktur data diterjemahkan dan didaftarkan di klien sebelum render pertama.
- **Keterlambatan saat berganti bahasa**: Saat menggunakan pemuatan bertahap (lazy load), pergantian bahasa mengharuskan komunikasi bolak-balik ke jaringan sebelum `html[lang]` diperbarui: **123 ms** pada `dynamic`, dan **185 ms** pada `scoped-static`. Sedangkan Intlayer memperbarui DOM dalam **3-4 ms** pada kedua mode tanpa tertahan oleh antrean jaringan.
- Konfigurasi `scoped-dynamic` yang sangat dioptimalkan mencapai 127.2 KB, yang masih **+8.6 KB lebih berat** daripada Intlayer di mode `dynamic`, serta menuntut pengaturan peta rute, backend sumber daya, dan batasan Suspense yang rumit.
- Mode `static` pada Intlayer secara bawaan memiliki **0% kebocoran halaman** karena hanya kamus yang diimpor oleh komponen halaman tersebut yang dimasukkan ke bundle. Mengaktifkan `importMode: 'dynamic'` juga langsung meniadakan kebocoran bahasa.
- **Ukuran per komponen**: 24-27 KB pada `react-i18next` berbanding 6-8 KB pada Intlayer. `useTranslation()` mengikat setiap komponen ke instance global i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap ada di [laporan benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md).

## Mengapa Perbedaannya Begitu Nyata? Global Instance vs Kamus Terkompilasi

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` dirancang pada tahun 2012 sebagai pustaka runtime: Satu instance global menyimpan data teks, serangkaian plugin memperluas fungsinya, dan fungsi `t()` mencari kunci saat perenderan. Pola ini sangat fleksibel namun memicu penumpukan ukuran:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # harus tahu bahwa halaman ini membutuhkan ["common", "about"]
```

Instance global tidak dapat mengetahui kunci apa saja yang akan dipanggil oleh suatu komponen; sehingga ia menampung seluruh namespace yang diminta. Mengoptimalkannya berarti **Anda** harus membagi file, **Anda** harus mencatat namespace yang dibutuhkan setiap halaman, dan **Anda** harus memperbaruinya saat ada komponen yang dipindahkan.

Biaya membengkak pada dua sumbu sekaligus, halaman dan bahasa:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Seperti dikutip dalam [laporan benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "Menjaga keamanan tipe data sambil memastikan namespace mana yang harus disertakan di setiap halaman adalah mimpi buruk".

Intlayer meniadakan instance global tersebut. Konten dideklarasikan langsung di sebelah komponen, dan kompilator menyelesaikan grafik ketergantungan pada fase build:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` mendeteksi komponen mana yang memakai kamus mana, mengemas hanya kamus tersebut untuk bahasa aktif, dan membersihkan teks yang tidak terpakai. Pola "scoped-dynamic" menjadi output alami dari proses build, bukan lagi tugas manual yang harus dipelihara pengembang.

> Untuk menerapkan performa pada baris `dynamic`, setel `dictionary.importMode: 'dynamic'` di file `intlayer.config.ts`. Silakan pelajari lebih lanjut di [panduan optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

## Pengalaman Pengembang (DX)

### Perbandingan Konfigurasi Awal

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
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
};
```

Pengembang juga harus mengelola `I18nProvider` di klien, mengatur `generateStaticParams`, serta mendefinisikan array `namespaces` pada tiap halaman.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

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

export default LocaleLayout;
```

</Tab>
</Tabs>

### Komponen Klien

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
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
```

> Halaman yang memuat komponen ini wajib menyertakan namespace `about`, dan `t("counter.label")` hanyalah string biasa tanpa bantuan tipe TypeScript sebelum `CustomTypeOptions` diperluas.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
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

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Properti `label` dan `increment` memiliki tipe data yang sangat ketat; kesalahan ketik akan langsung terdeteksi oleh TypeScript dan terjemahan bahasa Prancis yang belum diisi akan menggagalkan proses build.

</Tab>
</Tabs>

### Komponen Server Sinkron (RSC)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

Halaman harus menjalankan `i18n.getFixedT(locale, "about")` dan meneruskan `t` serta `locale` ke bawah melalui props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## Gunakan API i18next, Nikmati Keringanan Intlayer

Anda tidak harus menulis ulang komponen yang ada untuk menikmati keuntungan benchmark di atas. Adaptor `@intlayer/i18next`, `@intlayer/react-i18next`, dan `@intlayer/next-i18next` dapat langsung dipasang: pemanggilan `useTranslation`, `t()`, `<Trans>`, dan bentuk jamak tetap berfungsi seperti biasa, disuplai oleh kamus yang dioptimalkan kompilator Intlayer di latar belakang.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

Dalam pengujian benchmark, build kompatibel pada aplikasi Next.js yang sama mengalami penyusutan dari **218.5 KB menjadi 150.7 KB** per halaman, dari **78.5 KB menjadi 9.7 KB** per komponen, kebocoran halaman turun dari **~90% ke 0%**, dan waktu hidrasi membaik dari 15.6 ms ke 11.3 ms, tanpa merombak kode komponen Anda. File `locales/{lng}/{ns}.json` Anda yang sudah ada tetap bisa dijadikan sumber data melalui plugin sinkronisasi JSON.

Pelajari panduan migrasinya: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-i18next_to_intlayer.md).

## Kapan Memilih yang Mana?

<AccordionGroup>
<Accordion header="Pilih i18next">

Jika Anda sangat bergantung pada ekosistem pluginnya (pendeteksi khusus, backend unik, ICU, Locize), menerapkan lokalisasi di luar React (Node services, vanilla JS, framework lain), tim Anda sudah terbiasa, atau sistem penerjemah mengharuskan struktur `locales/{lng}/{ns}.json`. Namun, pastikan Anda menyisihkan waktu untuk mengelola namespace dan rute jika kinerja adalah prioritas.

</Accordion>
<Accordion header="Pilih Intlayer">

Anda menginginkan **konten berbasis komponen**, **TypeScript yang ketat**, **kesalahan kunci yang hilang saat waktu build**, **tree-shaking dan lazy loading tanpa usaha**, pergantian bahasa instan, komponen server sinkron, dan alat editorial bawaan ([Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), [terjemahan AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md), [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)). Sangat relevan untuk basis kode modular yang besar dan sistem desain.

</Accordion>
<Accordion header="Pilih adaptor @intlayer/*-i18next">

Anda sudah menggunakan i18next dan menginginkan efisiensi bundle serta peningkatan reaktivitas tanpa perlu menulis ulang komponen. Berkas `locales/{lng}/{ns}.json` Anda tetap menjadi sumber kebenaran utama. Diukur berdampingan dalam [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Mengapa i18next jauh lebih berat dibandingkan pustaka lainnya?">

Ia dirancang sebagai runtime agnostik framework: instance global, pipeline plugin, repositori sumber daya, resolver kunci. Fleksibilitas tersebut dikompilasi ke dalam setiap bundel. Komponen kosong yang hanya mengimpor pustaka berbobot **19.7 KB gzip** dengan `next-i18next` berbanding **5.5 KB** dengan `next-intlayer`, dan biaya tersebut dibayar pada setiap halaman apa pun isi konten Anda.

</Question>

<Question title="Apakah lazy loading dengan backend memperbaikinya?">

Itu memperbaiki ukuran byte, bukan latensi. Beralih ke `i18next-resources-to-backend` menghemat ~49 KB per halaman tetapi menambahkan round-trip jaringan pada pergantian bahasa: **123 ms** dalam pengaturan `dynamic` dan **185 ms** dalam `scoped-static`, berbanding **3-4 ms** dengan Intlayer. Hidrasi juga melonjak ke 27.7 ms karena instance menyelesaikan backend-nya sebelum React dapat melakukan hidrasi.

</Question>

<Question title="Bisakah saya mencapai 0% kebocoran konten dengan i18next?">

Bisa, dengan `scoped-dynamic`: satu namespace per rute, backend sumber daya, dan pemetaan halaman ke namespace yang dikelola secara manual. Ini menghasilkan 163.4 KB per halaman di Next.js, masih **+22 KB** lebih besar daripada 141.3 KB milik Intlayer yang tidak memerlukan konfigurasi tambahan. Lihat [optimasi bundel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

</Question>

<Question title="Apakah saya harus menulis ulang komponen untuk bermigrasi?">

Tidak. `@intlayer/i18next`, `@intlayer/react-i18next`, dan `@intlayer/next-i18next` mempertahankan `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, bentuk jamak `_one` / `_other`, sufiks konteks, dan `returnObjects`. Cukup satu baris plugin di `next.config.ts` atau `vite.config.ts`. Panduan langkah demi langkah ada di [panduan migrasi next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="Apa yang terjadi pada plugin i18next saya?">

Backend dan pendeteksi bahasa tetap diterima tetapi menjadi tidak aktif: tidak ada lagi yang perlu dimuat atau dideteksi saat runtime. Deteksi bahasa menjadi konfigurasi routing Intlayer (awalan URL, cookie, header). Jika aplikasi Anda mengambil terjemahan dari CMS saat permintaan tiba, gunakan [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) atau perintah `intlayer pull` / `push` sebagai gantinya.

</Question>

</FAQ>

## Perbandingan Terkait

Benchmark yang sama, pustaka lain:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/react-i18next_vs_react-intl_vs_intlayer.md)

Mendalami i18next lebih lanjut:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer-i18next.md), perbandingan adaptor yang diukur pada aplikasi yang sama
- [Apakah i18next sudah ketinggalan zaman?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_i18next_outdated.md)
- [Menggunakan Intlayer dengan i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/intlayer_with_i18next.md) dan [dengan react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/intlayer_with_react-i18next.md)
- [Cara menginternasionalkan aplikasi Next.js dengan next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-i18next.md)

Dokumentasi referensi:

- [Laporan benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md) dan [laporan benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)
- Adaptor kompatibilitas: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/next-i18next.md)
- Panduan migrasi: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-i18next_to_intlayer.md)
- [Optimasi bundel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [kompiler Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
- [i18n berbasis kompilator vs deklaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)

## Bintang GitHub

Bintang GitHub mencerminkan popularitas, kepercayaan komunitas, dan prospek jangka panjang sebuah proyek open-source. Meskipun bukan penentu tunggal dari kualitas kode, angka ini memperlihatkan antusiasme dan kesiapan adopsi di kalangan developer.

[![Grafik Riwayat Bintang](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Kesimpulan

`i18next` telah mengukir reputasi kuat: berjalan di mana saja, memiliki plugin untuk segala kebutuhan, dan dipelihara secara konsisten selama lebih dari sepuluh tahun. Namun, benchmark ini membuktikan beban dari arsitektur yang berpusat pada runtime. Penyiapan standar menambah beban **+70-77 KB gzip per halaman**, **membocorkan ~90% konten halaman lain**, dan memakan waktu **lebih dari 100 ms** saat berpindah bahasa. Menghilangkan kebocoran hingga 0% memang dapat dilakukan, tetapi butuh pengelolaan manual yang rumit dan tetap **9-22 KB lebih berat** daripada Intlayer.

Intlayer memindahkan seluruh beban kerja tersebut ke kompilator. Pengelolaan kamus per komponen, pemuatan bertahap per bahasa, dan pembersihan teks tak terpakai menjadi hasil otomatis dari proses build. Pada aplikasi yang sama, hasilnya: **Hanya +0.3 KB per halaman**, **0% kebocoran**, komponen **3-10 kali lebih kecil**, dan pergantian bahasa instan dalam **3-4 ms**.

Seluruh data mentah, aplikasi pengujian, dan skrip dapat diakses di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Anda bebas mengujinya sendiri.

Untuk pemahaman lebih mendalam, kunjungi dokumentasi ['Mengapa Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).
