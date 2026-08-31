---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Cara Kerja Intlayer
description: Pelajari bagaimana Intlayer beroperasi secara internal. Pahami arsitektur dan komponen yang membuat Intlayer kuat.
keywords:
  - Intlayer
  - Cara kerjanya
  - Arsitektur
  - Komponen
  - Cara kerja internal
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Riwayat awal"
author: aymericzip
---

# Cara Kerja Intlayer

## Daftar Isi

<TOC/>

## Ikhtisar

Ide utama di balik Intlayer adalah mengadopsi manajemen konten per-komponen. Jadi ide di balik Intlayer adalah memungkinkan Anda untuk mendeklarasikan konten Anda di mana saja dalam codebase Anda, misalnya di direktori yang sama dengan komponen Anda.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Untuk melakukan itu, peran Intlayer adalah menemukan semua `file deklarasi konten` Anda, dalam berbagai format yang ada di proyek Anda, dan kemudian akan menghasilkan `kamus` dari file-file tersebut.

Jadi ada dua langkah utama:

- Langkah build
- Langkah interpretasi

### Langkah build kamus

Langkah build dapat dilakukan dengan tiga cara:

- menggunakan CLI dengan `npx intlayer build`
- menggunakan [ekstensi vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- menggunakan plugin aplikasi seperti paket [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md), atau yang setara untuk [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md). Ketika Anda menggunakan salah satu plugin tersebut, Intlayer akan secara otomatis membangun kamus Anda saat Anda memulai (dev) atau membangun (prod) aplikasi Anda.

1. Deklarasi file konten
   - File konten dapat didefinisikan dalam berbagai format, seperti TypeScript, ECMAScript, CommonJS, atau JSON.
   - File konten dapat didefinisikan di mana saja dalam proyek, yang memungkinkan pemeliharaan dan skalabilitas yang lebih baik. Penting untuk menghormati konvensi ekstensi file untuk file konten. Ekstensi ini secara default adalah `*.content.{js|cjs|mjs|ts|tsx|json}`, tetapi dapat diubah dalam [file konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

2. Generasi `dictionaries`
   - Kamus dihasilkan dari file konten. Secara default, kamus Intlayer dihasilkan di direktori `.intlayer/dictionaries` dalam proyek.
   - Kamus tersebut dihasilkan dalam berbagai format untuk memenuhi semua kebutuhan dan mengoptimalkan kinerja aplikasi.

3. Generasi tipe kamus

Berdasarkan `dictionaries` Anda, Intlayer akan menghasilkan tipe untuk membuatnya dapat digunakan dalam aplikasi Anda.

- Tipe kamus dihasilkan dari `content declaration files` Intlayer. Secara default, tipe kamus Intlayer dihasilkan di direktori `.intlayer/types` dalam proyek.

- Intlayer [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) adalah fitur TypeScript yang memungkinkan Anda mendefinisikan tipe tambahan untuk Intlayer. Ini membuat pengalaman pengembangan lebih mudah dengan menyarankan argumen yang tersedia atau argumen yang diperlukan.
  Di antara tipe yang dihasilkan, tipe kamus Intlayer atau bahkan tipe konfigurasi bahasa ditambahkan ke file `types/intlayer.d.ts`, dan digunakan oleh paket lain. Untuk melakukan ini, perlu agar file `tsconfig.json` dikonfigurasi untuk menyertakan direktori `types` dari proyek.

### Langkah interpretasi kamus

Dengan menggunakan Intlayer, Anda akan mengakses konten Anda dalam aplikasi menggunakan hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Hook ini akan mengelola deteksi locale untuk Anda dan akan mengembalikan konten untuk locale saat ini. Dengan menggunakan hook ini, Anda juga dapat menginterpretasikan markdown, mengelola pluralisasi, dan lainnya.

> Untuk melihat semua fitur Intlayer, Anda dapat membaca [dokumentasi kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

## Konten Jarak Jauh

Intlayer memungkinkan Anda untuk mendeklarasikan konten secara lokal, dan kemudian mengekspornya ke CMS agar dapat diedit oleh tim non-teknis Anda.

Jadi Anda akan dapat mendorong dan menarik konten dari CMS ke aplikasi Anda, dengan cara yang mirip seperti yang Anda lakukan dengan Git untuk kode Anda.

Untuk kamus yang dieksternalisasi menggunakan CMS, Intlayer melakukan operasi fetch dasar untuk mengambil kamus jarak jauh dan menggabungkannya dengan kamus lokal Anda. Jika dikonfigurasi pada proyek Anda, Intlayer akan secara otomatis mengelola pengambilan konten dari CMS saat aplikasi dimulai (dev) / dibangun (prod).

## Editor Visual

Intlayer juga menyediakan editor visual untuk memungkinkan Anda mengedit konten Anda secara visual. [Editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) ini tersedia dalam paket eksternal `intlayer-editor`.

![editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Server adalah aplikasi Express sederhana yang mendengarkan permintaan dari klien dan mengambil konten aplikasi Anda, seperti `dictionaries` dan konfigurasi untuk membuatnya dapat diakses di sisi klien.
- Di sisi lain, klien adalah aplikasi React yang digunakan untuk berinteraksi dengan konten Anda menggunakan antarmuka visual.

Ketika Anda memanggil konten Anda menggunakan `useIntlayer` dan editor diaktifkan, secara otomatis akan membungkus string Anda dengan objek Proxy bernama `IntlayerNode`. Node ini menggunakan `window.postMessage` untuk berkomunikasi dengan iframe yang dibungkus yang berisi antarmuka editor visual.
Di sisi editor, editor mendengarkan pesan-pesan ini dan mensimulasikan interaksi nyata dengan konten Anda, memungkinkan Anda mengedit teks langsung dalam konteks aplikasi Anda.

## Optimasi build aplikasi

Untuk mengoptimalkan ukuran bundle aplikasi Anda, Intlayer menyediakan dua plugin untuk mengoptimalkan build aplikasi Anda: plugin `@intlayer/babel` dan `@intlayer/swc`.

Plugin Babel dan SWC bekerja dengan menganalisis Abstract Syntax Tree (AST) aplikasi Anda untuk menggantikan pemanggilan fungsi Intlayer dengan kode yang dioptimalkan. Proses ini membuat bundle akhir Anda lebih ringan di produksi dengan memastikan hanya kamus yang benar-benar digunakan yang diimpor, mengoptimalkan chunking dan mengurangi ukuran bundle.

Dalam mode pengembangan, Intlayer menggunakan impor statis terpusat untuk kamus guna menyederhanakan pengalaman pengembangan.

Dengan mengaktifkan opsi `importMode = "dynamic"` dalam [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md), Intlayer akan menggunakan impor dinamis untuk memuat kamus. Opsi ini dinonaktifkan secara default untuk menghindari pemrosesan async saat merender aplikasi.

> `@intlayer/babel` tersedia secara default pada paket `vite-intlayer`,

> `@intlayer/swc` tidak terpasang secara default pada paket `next-intlayer` karena plugin SWC masih bersifat eksperimental di Next.js.

Untuk melihat cara mengonfigurasi build aplikasi Anda, Anda dapat membaca [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Paket

Intlayer terdiri dari beberapa paket, masing-masing dengan peran spesifik dalam proses terjemahan. Berikut adalah representasi grafis dari struktur paket ini:

![paket-paket intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Paket `intlayer` digunakan dalam aplikasi untuk mendeklarasikan konten dalam file konten.

### react-intlayer

Paket `react-intlayer` digunakan untuk menginterpretasikan kamus Intlayer dan membuatnya dapat digunakan dalam aplikasi React.

### next-intlayer

Paket `next-intlayer` digunakan sebagai lapisan di atas `react-intlayer` untuk membuat kamus Intlayer dapat digunakan dalam aplikasi Next.js. Paket ini mengintegrasikan fitur-fitur penting agar Intlayer dapat bekerja di lingkungan Next.js, seperti middleware terjemahan, routing, atau konfigurasi file `next.config.js`.

### vue-intlayer

Paket `vue-intlayer` digunakan untuk menginterpretasikan kamus Intlayer dan membuatnya dapat digunakan dalam aplikasi Vue.

### nuxt-intlayer

Paket `nuxt-intlayer` adalah modul Nuxt untuk membuat kamus Intlayer dapat digunakan dalam aplikasi Nuxt. Paket ini mengintegrasikan fitur-fitur penting agar Intlayer dapat bekerja di lingkungan Nuxt, seperti middleware terjemahan, routing, atau konfigurasi file `nuxt.config.js`.

### svelte-intlayer

Paket `svelte-intlayer` digunakan untuk menginterpretasikan kamus Intlayer dan membuatnya dapat digunakan dalam aplikasi Svelte.

### solid-intlayer (WIP)

Paket `solid-intlayer` digunakan untuk menginterpretasikan kamus Intlayer dan membuatnya dapat digunakan dalam aplikasi Solid.js.

### preact-intlayer

Paket `preact-intlayer` digunakan untuk menginterpretasikan kamus Intlayer dan membuatnya dapat digunakan dalam aplikasi Preact.

### angular-intlayer (WIP)

Paket `angular-intlayer` digunakan untuk menginterpretasikan kamus Intlayer dan membuatnya dapat digunakan dalam aplikasi Angular.

### express-intlayer

Paket `express-intlayer` digunakan untuk menggunakan Intlayer pada backend Express.js.

### react-native-intlayer

Paket `react-native-intlayer` menyediakan alat yang mengintegrasikan plugin agar Intlayer dapat bekerja dengan Metro bundler.

### lynx-intlayer

Paket `lynx-intlayer` menyediakan alat yang mengintegrasikan plugin agar Intlayer dapat bekerja dengan Lynx bundler.

### vite-intlayer

Menyertakan plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

### react-scripts-intlayer

Mencakup perintah dan plugin `react-scripts-intlayer` untuk mengintegrasikan Intlayer dengan aplikasi berbasis Create React App. Plugin ini didasarkan pada [craco](https://craco.js.org/) dan mencakup konfigurasi tambahan untuk bundler [Webpack](https://webpack.js.org/).

### intlayer-editor

Paket `intlayer-editor` digunakan untuk memungkinkan penggunaan editor visual. Paket ini bersifat opsional, dapat diinstal dalam aplikasi, dan akan digunakan oleh paket `react-intlayer`.
Paket ini terdiri dari dua bagian: server dan klien.

Klien berisi elemen UI yang akan digunakan oleh `react-intlayer`.

Server, yang berbasis Express, digunakan untuk menerima permintaan editor visual dan mengelola atau memodifikasi file konten.

### intlayer-cli

Paket `intlayer-cli` dapat digunakan untuk menghasilkan kamus menggunakan perintah `npx intlayer dictionaries build`. Jika `intlayer` sudah terpasang, CLI secara otomatis terpasang dan paket ini tidak diperlukan.

### @intlayer/core

Paket `@intlayer/core` adalah paket utama Intlayer. Paket ini berisi fungsi terjemahan dan manajemen kamus. `@intlayer/core` bersifat multiplatform dan digunakan oleh paket lain untuk melakukan interpretasi kamus.

### @intlayer/config

Paket `@intlayer/config` digunakan untuk mengonfigurasi pengaturan Intlayer, seperti bahasa yang tersedia, parameter middleware Next.js, atau pengaturan editor terintegrasi.

### @intlayer/webpack

Paket `@intlayer/webpack` digunakan untuk menyediakan konfigurasi Webpack agar aplikasi berbasis Webpack dapat bekerja dengan Intlayer. Paket ini juga menyediakan plugin untuk ditambahkan ke aplikasi Webpack yang sudah ada.

### @intlayer/cli

Paket `@intlayer/cli` adalah paket NPM yang digunakan untuk mendeklarasikan skrip yang terkait dengan antarmuka baris perintah Intlayer. Paket ini memastikan keseragaman semua perintah CLI Intlayer. Paket ini terutama digunakan oleh paket [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/id/packages/intlayer-cli/index.md), dan [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/id/packages/intlayer/index.md).

### @intlayer/mcp

Paket `@intlayer/mcp` menyediakan server MCP (Model Context Protocol) yang memberikan bantuan IDE bertenaga AI yang disesuaikan untuk ekosistem Intlayer. Paket ini secara otomatis memuat dokumentasi dan terintegrasi dengan Intlayer CLI.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Paket `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` dan `@intlayer/dynamic-dictionaries-entry` mengembalikan jalur entri dari kamus Intlayer. Karena pencarian sistem berkas dari browser tidak mungkin dilakukan, menggunakan bundler seperti Webpack atau Rollup untuk mengambil jalur entri kamus juga tidak memungkinkan. Paket-paket ini dirancang untuk di-alias-kan, memungkinkan optimasi bundling di berbagai bundler seperti Vite, Webpack, dan Turbopack.

### @intlayer/engine

Paket `@intlayer/engine` digunakan untuk memantau file konten dan menghasilkan ulang kamus yang dimodifikasi setiap kali ada perubahan.

### @intlayer/editor

Paket `@intlayer/editor` menyediakan utilitas yang terkait dengan editor kamus. Paket ini secara khusus mencakup API untuk menghubungkan aplikasi dengan editor Intlayer, serta utilitas untuk memanipulasi kamus. Paket ini bersifat lintas platform.

### @intlayer/editor-react

Paket `@intlayer/editor-react` menyediakan states, contexts, hooks, dan komponen untuk menghubungkan aplikasi React dengan editor Intlayer.

### @intlayer/babel

Paket `@intlayer/babel` menyediakan alat yang mengoptimalkan bundling kamus untuk aplikasi berbasis Vite dan Webpack.

### @intlayer/swc

Paket `@intlayer/swc` menyediakan alat yang mengoptimalkan bundling kamus untuk aplikasi Next.js.

### @intlayer/api

Paket `@intlayer/api` adalah SDK API untuk berinteraksi dengan backend.

### @intlayer/design-system

Paket `@intlayer/design-system` digunakan untuk berbagi elemen desain antara CMS dan editor Visual.

### @intlayer/backend

Paket `@intlayer/backend` mengekspor tipe backend dan pada akhirnya akan menawarkan backend sebagai paket mandiri di masa depan.

## Obrolan dengan dokumentasi pintar kami

- [Ajukan pertanyaan Anda ke dokumentasi pintar kami](https://intlayer.org/doc/chat)

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Kapan kamus dibuat, saat build time atau saat runtime?">

Saat build time. Plugin Intlayer memindai file `.content.ts`, mengompilasinya menjadi kamus teroptimasi, dan menulisnya ke folder `.intlayer`. Di lingkungan pengembangan, proses ini berjalan otomatis setiap kali Anda menyimpan file.

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

<Question title="Apa itu folder .intlayer dan haruskah saya meng-commit-nya ke git?">

Folder tersebut adalah output yang dihasilkan: kamus yang dikompilasi dan tipe TypeScript yang dibuat. Folder ini sepenuhnya dihasilkan dari file konten Anda, sehingga harus ditambahkan ke `.gitignore` dan dibuat ulang di CI/CD melalui `intlayer build`.

</Question>

<Question title="Bagaimana locale aktif ditentukan?">

Dari sumber yang tercantum dalam `routing.storage`, secara berurutan: prefix URL, cookie, header `Accept-Language`, dan bahasa default.

</Question>

<Question title="Apa perbedaan antara kamus lokal dan jarak jauh (remote)?">

Kamus lokal dideklarasikan di codebase Anda dan dikompilasi bersama aplikasi. Kamus remote dikelola di CMS dan diambil melalui API, memungkinkan pembaruan teks tanpa perlu deploy ulang kode aplikasi.

</Question>

<Question title="Apakah Intlayer bekerja tanpa TypeScript?">

Ya. File konten dapat ditulis dalam TypeScript, JavaScript, ESM, CommonJS, atau JSON. Namun, TypeScript membuka manfaat pengetikan otomatis dan autocompletion kunci di editor Anda.

</Question>

<Question title="Bagaimana server rendering dan client rendering berbagi konten yang sama?">

Server menyelesaikan konten komponen yang dirender di server secara langsung, sehingga tidak ada kamus yang dikirim ke klien untuk komponen tersebut. Komponen klien hanya menerima kamus yang diperlukan untuk interaktivitas di browser.

</Question>

<Question title="Bagaimana Intlayer menghindari hydration mismatch terkait bahasa?">

Bahasa diselesaikan satu kali di server dan diteruskan ke provider klien, bukan dideteksi ulang di browser, sehingga output HTML server dan klien cocok secara identik.

</Question>

<Question title="Apakah saya perlu me-rebuild saat menambahkan terjemahan?">

Di lingkungan dev tidak: plugin memantau file dan memperbarui kamus secara instan. Di produksi ya: kamus lokal dikompilasi ke dalam bundle aplikasi saat langkah build.

</Question>

</FAQ>
