---
createdAt: 2025-09-09
updatedAt: 2026-03-12
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
  - version: 8.2.0
    date: 2026-03-09
    changes: Perbarui opsi kompiler, tambah dukungan FilePathPattern
  - version: 8.1.7
    date: 2026-02-25
    changes: Perbarui opsi kompiler
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

Sebagai alternatif, untuk mengotomatisasi proses i18n Anda sambil mempertahankan kontrol penuh atas konten Anda, Intlayer juga menyediakan perintah auto-ekstraksi `intlayer extract` (lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)), atau perintah `Intlayer: extract content to Dictionary` dari ekstensi Intlayer VS Code (lihat [dokumentasi ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)).

## Penggunaan

<Tabs>
 <Tab value='vite'>

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

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

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

 </Tab>
 <Tab value='nextjs'>

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
    // Ekstrak konten dari komponen ke dalam kamus
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimalkan impor dengan mengganti useIntlayer dengan impor kamus langsung
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Konfigurasi ini memastikan bahwa konten yang dideklarasikan dalam komponen Anda secara otomatis diekstraksi dan digunakan untuk menghasilkan kamus selama proses build Anda.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Konfigurasi kustom

Untuk menyesuaikan perilaku compiler, Anda dapat memperbarui file `intlayer.config.ts` di root proyek Anda.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Menunjukkan apakah kompiler harus diaktifkan.
     * Atur ke 'build-only' untuk melewatkan kompiler selama pengembangan dan mempercepat waktu mulai.
     */
    enabled: true,

    /**
     * Mendefinisikan jalur file output. Menggantikan `outputDir`.
     *
     * - Jalur yang dimulai dengan `./` diselesaikan relatif terhadap direktori komponen.
     * - Jalur yang dimulai dengan `/` diselesaikan relatif terhadap root proyek (`baseDir`).
     *
     * - Menyertakan variabel `{{locale}}` dalam jalur akan mengaktifkan pembuatan kamus yang dipisahkan berdasarkan bahasa.
     *
     * Contoh:
     * ```ts
     * {
     *   // Buat file .content.ts multi-bahasa di sebelah komponen
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Padanan menggunakan string template
     * }
     * ```
     *
     * ```ts
     * {
     *   // Buat file JSON terpusat berdasarkan bahasa di root proyek
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Padanan menggunakan string template
     * }
     * ```
     *
     * Daftar variabel:
     *   - `fileName`: Nama file.
     *   - `key`: Kunci konten.
     *   - `locale`: Bahasa konten.
     *   - `extension`: Ekstensi file.
     *   - `componentFileName`: Nama file komponen.
     *   - `componentExtension`: Ekstensi file komponen.
     *   - `format`: Format kamus.
     *   - `componentFormat`: Format kamus komponen.
     *   - `componentDirPath`: Jalur direktori komponen.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah ditransformasi.
     * Dengan begitu, kompiler hanya perlu dijalankan sekali untuk mentransformasi aplikasi, lalu dapat dihapus.
     */
    saveComponents: false,

    /**
     * Masukkan konten saja dalam file yang dihasilkan. Berguna untuk output JSON i18next atau ICU MessageFormat per bahasa.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "", // Tambahkan awalan opsional untuk kunci kamus yang diekstrak
  },
};
````

### Referensi Konfigurasi Kompiler

Properti berikut dapat dikonfigurasi dalam blok `compiler` pada file `intlayer.config.ts` Anda:

- **enabled**:
  - _Tipe_: `boolean | 'build-only'`
  - _Default_: `true`
  - _Deskripsi_: Menunjukkan apakah kompiler harus diaktifkan.

- **dictionaryKeyPrefix**:
  - _Tipe_: `string`
  - _Default_: `''`
  - _Deskripsi_: Awalan untuk kunci kamus yang diekstrak.

- **transformPattern**:
  - _Tipe_: `string | string[]`
  - _Default_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Deskripsi_: (Sudah tidak digunakan: gunakan `build.traversePattern` sebagai gantinya) Pola untuk menelusuri kode yang ingin dioptimalkan.

- **excludePattern**:
  - _Tipe_: `string | string[]`
  - _Default_: `['**/node_modules/**']`
  - _Deskripsi_: (Sudah tidak digunakan: gunakan `build.traversePattern` sebagai gantinya) Pola yang harus dikecualikan dari optimasi.

- **output**:
  - _Tipe_: `FilePathPattern`
  - _Default_: `({ key }) => 'compiler/${key}.content.json'`
  - _Deskripsi_: Mendefinisikan jalur file output. Menggantikan `outputDir`. Menangani variabel dinamis seperti `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, dan `{{componentFormat}}`. Dapat diatur sebagai string menggunakan format `'my/{{var}}/path'`, atau sebagai fungsi.
  - _Catatan_: Jalur `./**/*` diselesaikan relatif terhadap komponen. Jalur `/**/*` diselesaikan relatif terhadap `baseDir` Intlayer.
  - _Catatan_: Jika bahasa didefinisikan dalam jalur, kamus akan dihasilkan per bahasa.
  - _Contoh_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Tipe_: `boolean`
  - _Default_: `false`
  - _Deskripsi_: Menunjukkan apakah metadata harus disimpan dalam file. Jika benar, kompiler tidak akan menyimpan metadata kamus (kunci, pembungkus konten).
  - _Catatan_: Berguna jika digunakan dengan plugin `loadJSON`. Berguna untuk output JSON i18next atau ICU MessageFormat per bahasa.
  - _Contoh_:
    Jika `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Jika `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Tipe_: `boolean`
  - _Default_: `false`
  - _Deskripsi_: Menunjukkan apakah komponen harus disimpan setelah ditransformasi.

### Isi terjemahan yang hilang

Intlayer menyediakan alat CLI untuk membantu Anda mengisi terjemahan yang hilang. Anda dapat menggunakan perintah `intlayer` untuk menguji dan mengisi terjemahan yang hilang dari kode Anda.

```bash
npx intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash
npx intlayer fill         # Isi terjemahan yang hilang
```

### Ekstraksi

Intlayer menyediakan alat CLI untuk membantu Anda mengekstrak konten dari kode Anda. Anda dapat menggunakan perintah `intlayer extract` untuk mengekstrak konten dari kode Anda.

```bash
npx intlayer extract
```

> Untuk rincian lebih lanjut, silakan merujuk ke [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
