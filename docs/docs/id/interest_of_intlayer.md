---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Ketertarikan pada Intlayer
description: Temukan manfaat dan keuntungan menggunakan Intlayer dalam proyek Anda. Pahami mengapa Intlayer menonjol di antara kerangka kerja lainnya.
keywords:
  - Manfaat
  - Keuntungan
  - Intlayer
  - Kerangka Kerja
  - Perbandingan
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "Rilis Kompiler"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Pembaruan tabel komparatif"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Riwayat awal"
---

# Mengapa Anda harus mempertimbangkan Intlayer?

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi yang dirancang khusus untuk pengembang JavaScript. Ini memungkinkan deklarasi konten Anda di mana saja dalam kode Anda. Ini mengubah deklarasi konten multibahasa menjadi kamus terstruktur untuk diintegrasikan dengan mudah dalam kode Anda. Menggunakan TypeScript, **Intlayer** membuat pengembangan Anda lebih kuat dan efisien.

## Mengapa Intlayer dibuat?

Intlayer dibuat untuk memecahkan masalah umum yang memengaruhi semua pustaka i18n umum seperti `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl`, dan `vue-i18n`.

Semua solusi ini mengadopsi pendekatan terpusat untuk mendaftarkan dan mengelola konten Anda. Misalnya:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Atau di sini menggunakan namespace:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Jenis arsitektur ini memperlambat proses pengembangan dan membuat basis kode lebih kompleks untuk dipelihara karena beberapa alasan:

1. **Untuk setiap komponen baru yang dibuat, Anda harus:**
   - Membuat sumber daya/namespace baru di folder `locales`
   - Ingat untuk mengimpor namespace baru di halaman Anda
   - Menerjemahkan konten Anda (seringkali dilakukan secara manual dengan salin/tempel dari penyedia AI)

2. **Untuk setiap perubahan yang dilakukan pada komponen Anda, Anda harus:**
   - Mencari sumber daya/namespace terkait (jauh dari komponen)
   - Menerjemahkan konten Anda
   - Memastikan konten Anda mutakhir untuk setiap lokal
   - Memverifikasi namespace Anda tidak menyertakan kunci/nilai yang tidak digunakan
   - Memastikan struktur file JSON Anda sama untuk semua lokal

Pada proyek profesional yang menggunakan solusi ini, platform lokalisasi sering digunakan untuk membantu mengelola terjemahan konten Anda. Namun, ini dapat dengan cepat menjadi mahal untuk proyek besar.

Untuk memecahkan masalah ini, Intlayer mengadopsi pendekatan yang melingkupi konten Anda per komponen dan menjaga konten Anda tetap dekat dengan komponen Anda, seperti yang sering kita lakukan dengan CSS (`styled-components`), tipe, dokumentasi (`storybook`), atau pengujian unit (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Pendekatan ini memungkinkan Anda untuk:

1. **Meningkatkan kecepatan pengembangan**
   - File `.content.{{ts|mjs|cjs|json}}` dapat dibuat menggunakan ekstensi VSCode
   - Alat AI penyelesaian otomatis di IDE Anda (seperti GitHub Copilot) dapat membantu Anda mendeklarasikan konten Anda, mengurangi salin/tempel

2. **Membersihkan basis kode Anda**
   - Mengurangi kompleksitas
   - Meningkatkan pemeliharaan

3. **Menduplikasi komponen Anda dan konten terkaitnya dengan lebih mudah (Contoh: komponen login/register, dll.)**
   - Dengan membatasi risiko memengaruhi konten komponen lain
   - Dengan menyalin/menempel konten Anda dari satu aplikasi ke aplikasi lain tanpa dependensi eksternal

4. **Menghindari pengotoran basis kode Anda dengan kunci/nilai yang tidak digunakan untuk komponen yang tidak digunakan**
   - Jika Anda tidak menggunakan komponen, Intlayer tidak akan mengimpor konten terkaitnya
   - Jika Anda menghapus komponen, Anda akan lebih mudah mengingat untuk menghapus konten terkaitnya karena akan ada di folder yang sama

5. **Mengurangi biaya penalaran bagi agen AI untuk mendeklarasikan konten multibahasa Anda**
   - Agen AI tidak perlu memindai seluruh basis kode Anda untuk mengetahui di mana harus mengimplementasikan konten Anda
   - Terjemahan dapat dengan mudah dilakukan oleh alat AI penyelesaian otomatis di IDE Anda (seperti GitHub Copilot)

6. **Mengoptimalkan performa pemuatan**
   - Jika sebuah komponen dimuat secara malas (lazy-loaded), konten terkaitnya akan dimuat pada saat yang sama

## Fitur tambahan Intlayer

| Fitur                                                                                                                     | Deskripsi                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Fitur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                            | **Dukungan Lintas-Kerangka Kerja**<br><br>Intlayer kompatibel dengan semua kerangka kerja dan pustaka utama, termasuk Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, dan banyak lagi.                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **Manajemen Konten Berbasis JavaScript**<br><br>Manfaatkan fleksibilitas JavaScript untuk mendefinisikan dan mengelola konten Anda secara efisien. <br><br> - [Deklarasi konten](https://intlayer.org/doc/concept/content)                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Fitur" width="700">    | **Kompiler**<br><br>Kompiler Intlayer mengekstrak konten secara otomatis dari komponen dan menghasilkan file kamus.<br><br> - [Kompiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **File Deklarasi Konten Per-Lokal**<br><br>Percepat pengembangan Anda dengan mendeklarasikan konten Anda sekali, sebelum pembuatan otomatis.<br><br> - [File Deklarasi Konten Per-Lokal](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Lingkungan Type-Safe**<br><br>Manfaatkan TypeScript untuk memastikan definisi konten dan kode Anda bebas dari kesalahan, sambil juga mendapatkan keuntungan dari penyelesaian otomatis IDE.<br><br> - [Konfigurasi TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Setup yang Disederhanakan**<br><br>Mulai dan jalankan dengan cepat dengan konfigurasi minimal. Sesuaikan pengaturan untuk internasionalisasi, perutean, AI, build, dan penanganan konten dengan mudah. <br><br> - [Jelajahi integrasi Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Pengambilan Konten yang Disederhanakan**<br><br>Tidak perlu memanggil fungsi `t` Anda untuk setiap bagian konten. Ambil semua konten Anda secara langsung menggunakan satu hook.<br><br> - [Integrasi React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Implementasi Komponen Server yang Konsisten**<br><br>Sangat cocok untuk komponen server Next.js, gunakan implementasi yang sama untuk komponen klien dan server, tidak perlu meneruskan fungsi `t` Anda melalui setiap komponen server. <br><br> - [Komponen Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Basis Kode yang Terorganisir**<br><br>Jaga basis kode Anda lebih terorganisir: 1 komponen = 1 kamus di folder yang sama. Terjemahan yang dekat dengan komponen masing-masing meningkatkan pemeliharaan dan kejelasan. <br><br> - [Cara kerja Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Perutean yang Ditingkatkan**<br><br>Dukungan penuh perutean aplikasi, beradaptasi dengan mulus ke struktur aplikasi yang kompleks, untuk Next.js, React, Vite, Vue.js, dll.<br><br> - [Jelajahi integrasi Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Dukungan Markdown**<br><br>Impor dan interpretasikan file lokal dan Markdown jarak jauh untuk konten multibahasa seperti kebijakan privasi, dokumentasi, dll. Interpretasikan dan buat metadata Markdown dapat diakses dalam kode Anda.<br><br> - [File konten](https://intlayer.org/doc/concept/content/file)                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Editor Visual & CMS Gratis**<br><br>Editor visual dan CMS gratis tersedia untuk penulis konten, menghilangkan kebutuhan akan platform lokalisasi. Jaga konten Anda tetap sinkron menggunakan Git, atau eksternalisasikan secara total atau sebagian dengan CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Konten Tree-shakable**<br><br>Konten tree-shakable, mengurangi ukuran bundel akhir. Memuat konten per komponen, tidak termasuk konten yang tidak digunakan dari bundel Anda. Mendukung pemuatan malas (lazy loading) untuk meningkatkan efisiensi pemuatan aplikasi. <br><br> - [Optimasi build aplikasi](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Rendering Statis**<br><br>Tidak memblokir Rendering Statis. <br><br> - [Integrasi Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **Terjemahan Berbasis AI**<br><br>Ubah situs web Anda ke dalam 231 bahasa hanya dengan satu klik menggunakan alat terjemahan bertenaga AI canggih dari Intlayer dengan penyedia AI/kunci API Anda sendiri. <br><br> - [Integrasi CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Isi otomatis](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **Integrasi Server MCP**<br><br>Menyediakan server MCP (Model Context Protocol) untuk otomatisasi IDE, memungkinkan manajemen konten dan alur kerja i18n yang lancar langsung di dalam lingkungan pengembangan Anda. <br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/id/mcp_server.md)                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **Ekstensi VSCode**<br><br>Intlayer menyediakan ekstensi VSCode untuk membantu Anda mengelola konten dan terjemahan, membangun kamus, menerjemahkan konten, dan banyak lagi. <br><br> - [Ekstensi VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilitas**<br><br>Memungkinkan interoperabilitas dengan react-i18next, next-i18next, next-intl, dan react-intl. <br><br> - [Intlayer dan react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer dan next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer dan next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)               |
| Menguji Terjemahan yang Hilang (CLI/CI)                                                                                   | ✅ CLI: npx intlayer content test (audit ramah CI)                                                                                                                                                                                                                                                                                                                                                            |

## Perbandingan Intlayer dengan solusi lain

| Fitur                                               | `intlayer`                                                                                                                                 | `react-i18next`                                                                                                | `react-intl` (FormatJS)                                                                                                                    | `lingui`                                                          | `next-intl`                                                                                                    | `next-i18next`                                                                                                 | `vue-i18n`                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Terjemahan Dekat Komponen**                       | ✅ Ya, konten diletakkan bersama dengan setiap komponen                                                                                    | ❌ Tidak                                                                                                       | ❌ Tidak                                                                                                                                   | ❌ Tidak                                                          | ❌ Tidak                                                                                                       | ❌ Tidak                                                                                                       | ✅ Ya - menggunakan `Single File Components` (SFCs)                |
| **Integrasi TypeScript**                            | ✅ Lanjutan, tipe ketat yang dihasilkan secara otomatis                                                                                    | ⚠️ Dasar; perlu konfigurasi ekstra untuk keamanan                                                              | ✅ Bagus, tapi kurang ketat                                                                                                                | ⚠️ Tipifikasi, perlu konfigurasi                                  | ✅ Bagus                                                                                                       | ⚠️ Dasar                                                                                                       | ✅ Bagus (tipe tersedia; keamanan kunci perlu pengaturan)          |
| **Deteksi Terjemahan yang Hilang**                  | ✅ Penyorotan kesalahan TypeScript dan kesalahan/peringatan waktu build                                                                    | ⚠️ Sebagian besar string fallback saat runtime                                                                 | ⚠️ String fallback                                                                                                                         | ⚠️ Perlu konfigurasi ekstra                                       | ⚠️ Runtime fallback                                                                                            | ⚠️ Runtime fallback                                                                                            | ⚠️ Runtime fallback/peringatan (dapat dikonfigurasi)               |
| **Konten Kaya (JSX/Markdown/komponen)**             | ✅ Dukungan langsung                                                                                                                       | ⚠️ Terbatas / hanya interpolasi                                                                                | ⚠️ Sintaks ICU, bukan JSX asli                                                                                                             | ⚠️ Terbatas                                                       | ❌ Tidak dirancang untuk node kaya                                                                             | ⚠️ Terbatas                                                                                                    | ⚠️ Terbatas (komponen melalui `<i18n-t>`, Markdown melalui plugin) |
| **Terjemahan Berbasis AI**                          | ✅ Ya, mendukung beberapa penyedia AI. Dapat digunakan dengan kunci API Anda sendiri. Mempertimbangkan konteks aplikasi dan cakupan konten | ❌ Tidak                                                                                                       | ❌ Tidak                                                                                                                                   | ❌ Tidak                                                          | ❌ Tidak                                                                                                       | ❌ Tidak                                                                                                       | ❌ Tidak                                                           |
| **Editor Visual**                                   | ✅ Ya, Editor Visual lokal + CMS opsional; dapat mengeksternalisasi konten basis kode; dapat disematkan                                    | ❌ Tidak / tersedia melalui platform lokalisasi eksternal                                                      | ❌ Tidak / tersedia melalui platform lokalisasi eksternal                                                                                  | ❌ Tidak / tersedia melalui platform lokalisasi eksternal         | ❌ Tidak / tersedia melalui platform lokalisasi eksternal                                                      | ❌ Tidak / tersedia melalui platform lokalisasi eksternal                                                      | ❌ Tidak / tersedia melalui platform lokalisasi eksternal          |
| **Perutean Terlokalisasi**                          | ✅ Ya, mendukung jalur terlokalisasi secara langsung (berfungsi dengan Next.js & Vite)                                                     | ⚠️ Tidak bawaan, memerlukan plugin (misal: `next-i18next`) atau konfigurasi router kustom                      | ❌ Tidak, hanya pemformatan pesan, perutean harus manual                                                                                   | ⚠️ Tidak bawaan, memerlukan plugin atau konfigurasi manual        | ✅ Bawaan, App Router mendukung segmen `[locale]`                                                              | ✅ Bawaan                                                                                                      | ✅ Bawaan                                                          |
| **Pembuatan Rute Dinamis**                          | ✅ Ya                                                                                                                                      | ⚠️ Plugin/ekosistem atau pengaturan manual                                                                     | ❌ Tidak disediakan                                                                                                                        | ⚠️ Plugin/manual                                                  | ✅ Ya                                                                                                          | ✅ Ya                                                                                                          | ❌ Tidak disediakan (Nuxt i18n menyediakan)                        |
| **Pluralisasi**                                     | ✅ Pola berbasis enumerasi                                                                                                                 | ✅ Dapat dikonfigurasi (plugin seperti i18next-icu)                                                            | ✅ (ICU)                                                                                                                                   | ✅ (ICU/messageformat)                                            | ✅ Bagus                                                                                                       | ✅ Bagus                                                                                                       | ✅ Aturan plural bawaan                                            |
| **Pemformatan (tanggal, angka, mata uang)**         | ✅ Pemformat yang dioptimalkan (Intl di balik layar)                                                                                       | ⚠️ Melalui plugin atau penggunaan Intl kustom                                                                  | ✅ Pemformat ICU                                                                                                                           | ✅ Helper ICU/CLI                                                 | ✅ Bagus (Intl helper)                                                                                         | ✅ Bagus (Intl helper)                                                                                         | ✅ Pemformat tanggal/angka bawaan (Intl)                           |
| **Format Konten**                                   | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml sedang dikerjakan)                                                                             | ⚠️ .json                                                                                                       | ✅ .json, .js                                                                                                                              | ⚠️ .po, .json                                                     | ✅ .json, .js, .ts                                                                                             | ⚠️ .json                                                                                                       | ✅ .json, .js                                                      |
| **Dukungan ICU**                                    | ⚠️ Sedang dikerjakan                                                                                                                       | ⚠️ Melalui plugin (i18next-icu)                                                                                | ✅ Ya                                                                                                                                      | ✅ Ya                                                             | ✅ Ya                                                                                                          | ⚠️ Melalui plugin (`i18next-icu`)                                                                              | ⚠️ Melalui pemformat/kompiler kustom                               |
| **SEO Helper (hreflang, sitemap)**                  | ✅ Alat bawaan: helper untuk sitemap, robots.txt, metadata                                                                                 | ⚠️ Plugin komunitas/manual                                                                                     | ❌ Bukan inti                                                                                                                              | ❌ Bukan inti                                                     | ✅ Bagus                                                                                                       | ✅ Bagus                                                                                                       | ❌ Bukan inti (Nuxt i18n menyediakan helper)                       |
| **Ekosistem / Komunitas**                           | ⚠️ Lebih kecil tetapi tumbuh cepat dan reaktif                                                                                             | ✅ Terbesar dan matang                                                                                         | ✅ Besar                                                                                                                                   | ⚠️ Lebih kecil                                                    | ✅ Ukuran menengah, fokus pada Next.js                                                                         | ✅ Ukuran menengah, fokus pada Next.js                                                                         | ✅ Besar dalam ekosistem Vue                                       |
| **Server-side Rendering & Server Components**       | ✅ Ya, disederhanakan untuk SSR / React Server Components                                                                                  | ⚠️ Didukung di tingkat halaman tetapi perlu meneruskan fungsi-t pada pohon komponen untuk komponen server anak | ⚠️ Didukung di tingkat halaman dengan pengaturan tambahan, tetapi perlu meneruskan fungsi-t pada pohon komponen untuk komponen server anak | ✅ Didukung, perlu pengaturan                                     | ⚠️ Didukung di tingkat halaman tetapi perlu meneruskan fungsi-t pada pohon komponen untuk komponen server anak | ⚠️ Didukung di tingkat halaman tetapi perlu meneruskan fungsi-t pada pohon komponen untuk komponen server anak | ✅ SSR melalui Nuxt/Vue SSR (tanpa RSC)                            |
| **Tree-shaking (hanya muat konten yang digunakan)** | ✅ Ya, per komponen pada waktu build melalui plugin Babel/SWC                                                                              | ⚠️ Biasanya memuat semua (dapat ditingkatkan dengan namespace/pemecahan kode)                                  | ⚠️ Biasanya memuat semua                                                                                                                   | ❌ Bukan default                                                  | ⚠️ Parsial                                                                                                     | ⚠️ Parsial                                                                                                     | ⚠️ Parsial (dengan pemecahan kode/pengaturan manual)               |
| **Lazy loading**                                    | ✅ Ya, per lokal / per kamus                                                                                                               | ✅ Ya (misal: backend/namespace sesuai permintaan)                                                             | ✅ Ya (pemisahan bundel lokal)                                                                                                             | ✅ Ya (impor katalog dinamis)                                     | ✅ Ya (per rute/per lokal), perlu manajemen namespace                                                          | ✅ Ya (per rute/per lokal), perlu manajemen namespace                                                          | ✅ Ya (pesan lokal asinkron)                                       |
| **Bersihkan konten yang tidak digunakan**           | ✅ Ya, per kamus pada waktu build                                                                                                          | ❌ Tidak, hanya melalui segmentasi namespace manual                                                            | ❌ Tidak, semua pesan yang dideklarasikan dibundel                                                                                         | ✅ Ya, kunci yang tidak digunakan terdeteksi & dihapus saat build | ❌ Tidak, dapat dikelola secara manual dengan manajemen namespace                                              | ❌ Tidak, dapat dikelola secara manual dengan manajemen namespace                                              | ❌ Tidak, hanya mungkin melalui lazy-loading manual                |
| **Manajemen Proyek Besar**                          | ✅ Mendorong modularitas, cocok untuk sistem desain                                                                                        | ⚠️ Perlu disiplin file yang baik                                                                               | ⚠️ Katalog pusat bisa menjadi besar                                                                                                        | ⚠️ Bisa menjadi kompleks                                          | ✅ Modular dengan pengaturan                                                                                   | ✅ Modular dengan pengaturan                                                                                   | ✅ Modular dengan pengaturan Vue Router/Nuxt i18n                  |

---

## Bintang GitHub

Bintang GitHub adalah indikator kuat dari popularitas proyek, kepercayaan komunitas, dan relevansi jangka panjang. Meskipun bukan ukuran langsung dari kualitas teknis, bintang-bintang tersebut mencerminkan berapa banyak pengembang yang menganggap proyek tersebut berguna, mengikuti kemajuannya, dan kemungkinan akan mengadopsinya. Untuk memperkirakan nilai suatu proyek, bintang membantu membandingkan daya tarik di berbagai alternatif dan memberikan wawasan tentang pertumbuhan ekosistem.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabilitas

`intlayer` juga dapat membantu mengelola namespace `react-intl`, `react-i18next`, `next-intl`, `next-i18next`, dan `vue-i18n` Anda.

Menggunakan `intlayer`, Anda dapat mendeklarasikan konten dalam format pustaka i18n favorit Anda, dan intlayer akan menghasilkan namespace Anda di lokasi pilihan Anda (contoh: `/messages/{{locale}}/{{namespace}}.json`).
