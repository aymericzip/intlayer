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
    changes: Riwayat awal
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

### svelte-intlayer (WIP)

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

### @intlayer/chokidar

Paket `@intlayer/chokidar` digunakan untuk memantau file konten dan menghasilkan ulang kamus yang dimodifikasi setiap kali ada perubahan.

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
