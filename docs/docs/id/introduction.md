---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Pengenalan
description: Temukan bagaimana Intlayer bekerja. Lihat langkah-langkah yang digunakan oleh Intlayer di aplikasi Anda. Temukan apa yang dilakukan oleh berbagai paket yang ada.
keywords:
  - Pengenalan
  - Memulai
  - Intlayer
  - Aplikasi
  - Paket
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Dokumentasi Intlayer

Selamat datang di dokumentasi resmi Intlayer! Di sini, Anda akan menemukan semua yang Anda butuhkan untuk mengintegrasikan, mengonfigurasi, dan menguasai Intlayer untuk semua kebutuhan internasionalisasi (i18n) Anda, baik Anda bekerja dengan Next.js, React, Vite, Express, atau lingkungan JavaScript lainnya.

## Pengenalan

### Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi yang dirancang khusus untuk pengembang JavaScript. Ini memungkinkan deklarasi konten Anda di mana saja di dalam kode Anda. Intlayer mengubah deklarasi konten multibahasa menjadi kamus terstruktur untuk diintegrasikan dengan mudah ke dalam kode Anda. Dengan menggunakan TypeScript, **Intlayer** membuat pengembangan Anda lebih tangguh dan efisien.

Intlayer juga menyediakan editor visual opsional yang memungkinkan Anda mengedit dan mengelola konten Anda dengan mudah. Editor ini sangat berguna bagi pengembang yang lebih menyukai antarmuka visual untuk manajemen konten, atau untuk tim yang membuat konten tanpa perlu khawatir tentang kode.

### Contoh Penggunaan

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      id: "Halo Dunia",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "id": "Halo Dunia"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Mengapa Intlayer daripada alternatif lain?

Dibandingkan dengan solusi utama seperti `next-intl` atau `i18next`, Intlayer adalah solusi yang hadir dengan optimasi terintegrasi seperti:

<AccordionGroup>
<Accordion header="Ukuran bundel (Bundle size)">

Daripada memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundel dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemudahan Pemeliharaan (Maintainability)">

Menempatkan cakupan (scoping) konten aplikasi Anda di dekat komponen **memudahkan pemeliharaan** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **sepenuhnya diketik (fully typed)** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Penempatan konten yang berdekatan (co-location) **mengurangi konteks yang dibutuhkan** oleh Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat pengalaman pengembang (DX) menjadi lebih mulus bagi agen AI.

</Accordion>

<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan di jalur (pipeline) CI/CD Anda menggunakan LLM pilihan Anda dengan biaya dari penyedia AI Anda. Intlayer juga menawarkan **kompiler (compiler)** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Kinerja (Performance)">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah kinerja dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada saat kompilasi (build time).

</Accordion>

<Accordion header="Penskalaan tanpa pengembang (Scaling with non-dev)">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) yang dapat di-host sendiri** dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi mulus. Konten dapat disimpan secara lokal dan/atau dari jarak jauh.

</Accordion>
</AccordionGroup>

## Fitur Utama

Intlayer menawarkan berbagai fitur yang disesuaikan untuk memenuhi kebutuhan pengembangan web modern. Di bawah ini adalah fitur-fitur utama, dengan tautan ke dokumentasi terperinci untuk masing-masing fitur:

- **Dukungan Internasionalisasi**: Tingkatkan jangkauan global aplikasi Anda dengan dukungan internasionalisasi bawaan.
- **Editor Visual**: Tingkatkan alur kerja pengembangan Anda dengan plugin editor yang dirancang untuk Intlayer. Lihat [Panduan Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).
- **Fleksibilitas Konfigurasi**: Sesuaikan pengaturan Anda dengan opsi konfigurasi ekstensif yang dirinci di [Panduan Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).
- **Alat CLI Canggih**: Kelola proyek Anda secara efisien menggunakan antarmuka baris perintah (CLI) Intlayer. Jelajahi kemampuannya di [Dokumentasi Alat CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

## Konsep Inti

### Kamus (Dictionary)

Atur konten multibahasa Anda di dekat kode Anda untuk menjaga semuanya tetap konsisten dan mudah dikelola.

- **[Memulai](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)**  
  Pelajari dasar-dasar deklarasi konten Anda di Intlayer.

- **[Terjemahan (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)**  
  Pahami bagaimana terjemahan dihasilkan, disimpan, dan digunakan dalam aplikasi Anda.

- **[Pencacahan (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md)**  
  Kelola kumpulan data yang berulang atau tetap dengan mudah di berbagai bahasa.

- **[Kondisi (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/condition.md)**  
  Pelajari cara menggunakan logika kondisional di Intlayer untuk membuat konten dinamis.

- **[Penyisipan (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)**  
  Temukan cara menyisipkan nilai ke dalam string menggunakan tempat penampung (placeholder) penyisipan.

- **[Pengambilan Fungsi (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/function_fetching.md)**  
  Lihat cara mengambil konten secara dinamis dengan logika khusus agar sesuai dengan alur kerja proyek Anda.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)**  
  Pelajari cara menggunakan Markdown di Intlayer untuk membuat konten yang kaya.

- **[Penyematan File (File Embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/file.md)**  
  Temukan cara menyematkan file eksternal di Intlayer untuk menggunakannya di editor konten.

- **[Bersarang (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/nesting.md)**  
  Pahami cara menyusun konten bersarang di Intlayer untuk membuat struktur yang kompleks.

### Lingkungan & Integrasi

Kami membangun Intlayer dengan mempertimbangkan fleksibilitas, menawarkan integrasi yang mulus di berbagai framework dan alat build populer:

- **[Intlayer dengan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)**
- **[Intlayer dengan Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)**
- **[Intlayer dengan Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_14.md)**
- **[Intlayer dengan Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_page_router.md)**
- **[Intlayer dengan React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)**
- **[Intlayer dengan Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)**
- **[Intlayer dengan React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_react_router_v7.md)**
- **[Intlayer dengan Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)**
- **[Intlayer dengan React Native dan Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_react_native+expo.md)**
- **[Intlayer dengan Lynx dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_lynx+react.md)**
- **[Intlayer dengan Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+preact.md)**
- **[Intlayer dengan Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)**
- **[Intlayer dengan Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md)**
- **[Intlayer dengan Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+svelte.md)**
- **[Intlayer dengan SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_svelte_kit.md)**
- **[Intlayer dengan Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_express.md)**
- **[Intlayer dengan NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nestjs.md)**
- **[Intlayer dengan Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_hono.md)**
- **[Intlayer dengan Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_21.md)**

Setiap panduan integrasi mencakup praktik terbaik untuk menggunakan fitur Intlayer, seperti **perenderan sisi server (SSR)**, **perutean dinamis**, atau **perenderan sisi klien**, sehingga Anda dapat mempertahankan aplikasi yang cepat, ramah SEO, dan sangat skalabel.

## Kontribusi & Umpan Balik

Kami menghargai kekuatan open-source dan pengembangan berbasis komunitas. Jika Anda ingin mengusulkan perbaikan, menambahkan panduan baru, atau memperbaiki masalah apa pun di dokumen kami, jangan ragu untuk mengirimkan Pull Request atau membuka Issue di [repositori GitHub kami](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Siap menerjemahkan aplikasi Anda dengan lebih cepat dan lebih efisien?** Selami dokumen kami untuk mulai menggunakan Intlayer sekarang. Rasakan pendekatan yang kuat dan efisien untuk internasionalisasi yang membuat konten Anda tetap teratur dan tim Anda lebih produktif.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Untuk apa Intlayer digunakan?">

Intlayer adalah library internasionalisasi (i18n) untuk aplikasi JavaScript dan TypeScript. Anda mendeklarasikan konten komponen tepat di sebelah komponen tersebut dalam file `.content.ts`, Intlayer mengompilasi deklarasi tersebut menjadi kamus bertipe saat build time, dan komponen Anda membacanya melalui hook seperti `useIntlayer`. Ini mencakup terjemahan, aturan jamak, gender, Markdown, routing berbasis locale, metadata SEO, terjemahan dengan bantuan AI, dan editor visual untuk non-developer.

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

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi JavaScript?">

Bidang ini terbagi menjadi tiga generasi:

- **Library katalog runtime**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Pesan disimpan dalam namespace JSON yang dimuat di runtime. Matang dan agnostik framework, tetapi tidak memiliki static typing dan mengirimkan seluruh katalog ke klien.
- **Library pesan waktu kompilasi**: `Lingui`, `Paraglide`, `react-intl`, dan `next-intl` dengan langkah ekstraksi. Perilaku bundle lebih baik dan typing parsial, tetapi masih bergantung pada katalog terpusat.
- **Library lapisan konten (Content layer)**: `Intlayer`. Konten dideklarasikan per komponen dan dikompilasi per komponen; menggabungkan typing, tree-shaking, developer tooling, dan editing dalam satu sumber kebenaran.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Framework apa saja yang didukung Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro dengan komponen pulau apa pun, React Native dengan Expo, Lynx, dan di sisi backend Express, Fastify, NestJS, Hono, Elysia, dan AdonisJS. Masing-masing memiliki panduan khusus di bagian environments.

</Question>

<Question title="Mengapa mendeklarasikan konten di sebelah komponen alih-alih di file JSON terpusat?">

Ada tiga alasan: Pertama, halaman hanya mengirimkan entri yang benar-benar dirender oleh komponennya, bukan seluruh namespace, yang memotong ukuran bundle. Kedua, folder fitur dapat dipindahkan atau dihapus secara mandiri tanpa mencari kunci yang hilang. Ketiga, LLM atau agen AI yang mengedit komponen melihat kontennya di folder yang sama, yang menghasilkan akurasi lebih tinggi. Lihat [cara kerja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/how_works_intlayer.md).

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi saya secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. CLI mendeteksi terjemahan yang hilang dan mengisinya dengan LLM pilihan Anda, menggunakan provider dan API key Anda sendiri. Flag `--git-diff` membatasi proses ke konten yang diubah pada branch saat ini. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Bagaimana cara menemukan terjemahan yang hilang?">

Jalankan `npx intlayer test`. Perintah ini gagal jika ada locale yang dideklarasikan kehilangan konten, sehingga string yang belum diterjemahkan tidak akan pernah mencapai produksi. Ekstensi VS Code menandai error ini langsung di editor, dan plugin ESLint menandai string tanpa pembungkus. Lihat [pengujian konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).

</Question>

<Question title="Apakah saya harus mencantumkan locale di URL?">

Tidak. `routing.mode` menerima `"prefix-no-default"` (default: `/about` dan `/id/about`), `"prefix-all"`, `"no-prefix"`, dan `"search-params"`, dan `routing.domains` memetakan locale ke domainnya sendiri. Terlepas dari skema yang dipilih, `getMultilingualUrls` menghasilkan link alternatif `hreflang` untuk metadata dan sitemap. Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Question>

<Question title="Bagaimana penerjemah dan editor konten dapat bekerja tanpa menyentuh kode?">

Editor visual berjalan di infrastruktur Anda sendiri dan memungkinkan siapa saja mengklik teks di situs yang berjalan untuk mengeditnya, menyimpan perubahan kembali ke codebase. CMS mengeksternalisasi konten sehingga dapat diperbarui tanpa redeploy. Lihat [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) dan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya. Intlayer adalah open source di bawah lisensi Apache 2.0; library, CLI, compiler, dan editor visual gratis untuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
