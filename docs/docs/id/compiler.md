---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | Ekstraksi Konten Otomatis untuk i18n
description: Otomatiskan proses internasionalisasi Anda dengan Intlayer Compiler. Ekstrak konten langsung dari komponen Anda untuk i18n yang lebih cepat dan efisien di Vite, Next.js, dan lainnya.
keywords:
  - Intlayer
  - Compiler
  - Internasionalisasi
  - i18n
  - Otomatisasi
  - Ekstraksi
  - Kecepatan
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: Rilis Compiler
---

# Intlayer Compiler | Ekstraksi Konten Otomatis untuk i18n

## Apa itu Intlayer Compiler?

**Intlayer Compiler** adalah alat yang kuat yang dirancang untuk mengotomatisasi proses internasionalisasi (i18n) dalam aplikasi Anda. Alat ini memindai kode sumber Anda (JSX, TSX, Vue, Svelte) untuk deklarasi konten, mengekstraknya, dan secara otomatis menghasilkan file kamus yang diperlukan. Ini memungkinkan Anda untuk menjaga konten tetap berdekatan dengan komponen Anda sementara Intlayer menangani manajemen dan sinkronisasi kamus Anda.

## Mengapa Menggunakan Intlayer Compiler?

- **Otomatisasi**: Menghilangkan penyalinan konten secara manual ke dalam kamus.
- **Kecepatan**: Ekstraksi konten yang dioptimalkan memastikan proses build Anda tetap cepat.
- **Pengalaman Pengembang**: Menjaga deklarasi konten tepat di tempat mereka digunakan, meningkatkan pemeliharaan.
- **Pembaruan Langsung**: Mendukung Hot Module Replacement (HMR) untuk umpan balik instan selama pengembangan.

Lihat posting blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md) untuk perbandingan yang lebih mendalam.

## Mengapa Tidak Menggunakan Intlayer Compiler?

Meskipun compiler menawarkan pengalaman "langsung bekerja" yang sangat baik, compiler juga memperkenalkan beberapa kompromi yang harus Anda ketahui:

- **Ambiguitas heuristik**: Compiler harus menebak apa yang merupakan konten yang ditujukan untuk pengguna versus logika aplikasi (misalnya, `className="active"`, kode status, ID produk). Dalam codebase yang kompleks, ini dapat menyebabkan false positive atau string yang terlewat yang memerlukan anotasi manual dan pengecualian.
- **Ekstraksi hanya statis**: Ekstraksi berbasis compiler bergantung pada analisis statis. String yang hanya ada saat runtime (kode kesalahan API, field CMS, dll.) tidak dapat ditemukan atau diterjemahkan oleh compiler saja, jadi Anda masih memerlukan strategi i18n runtime yang melengkapi.

Untuk perbandingan arsitektur yang lebih mendalam, lihat posting blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md).

Sebagai alternatif, untuk mengotomatisasi proses i18n Anda sambil mempertahankan kontrol penuh atas konten Anda, Intlayer juga menyediakan perintah auto-ekstraksi `intlayer transform` (lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/transform.md)), atau perintah `Intlayer: extract content to Dictionary` dari ekstensi Intlayer VS Code (lihat [dokumentasi ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)).

## Penggunaan

### Vite

Untuk aplikasi berbasis Vite (React, Vue, Svelte, dll.), cara termudah menggunakan compiler adalah melalui plugin `vite-intlayer`.

#### Instalasi

```bash
npm install vite-intlayer
```

#### Konfigurasi

Perbarui `vite.config.ts` Anda untuk menyertakan plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Menambahkan plugin compiler
  ],
});
```

#### Dukungan Framework

Plugin Vite secara otomatis mendeteksi dan menangani berbagai jenis file:

- **React / JSX / TSX**: Ditangani secara native.
- **Vue**: Memerlukan `@intlayer/vue-compiler`.
- **Svelte**: Memerlukan `@intlayer/svelte-compiler`.

Pastikan untuk menginstal paket compiler yang sesuai untuk framework Anda:

```bash
# Untuk Vue
npm install @intlayer/vue-compiler

# Untuk Svelte
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Untuk Next.js atau aplikasi berbasis Webpack lainnya yang menggunakan Babel, Anda dapat mengonfigurasi compiler menggunakan plugin `@intlayer/babel`.

#### Instalasi

```bash
npm install @intlayer/babel
```

#### Konfigurasi

Perbarui `babel.config.js` Anda (atau `babel.config.json`) untuk menyertakan plugin ekstraksi. Kami menyediakan helper `getExtractPluginOptions` untuk memuat konfigurasi Intlayer Anda secara otomatis.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Konfigurasi ini memastikan bahwa konten yang dideklarasikan dalam komponen Anda secara otomatis diekstraksi dan digunakan untuk menghasilkan kamus selama proses build Anda.
