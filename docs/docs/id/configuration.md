---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Konfigurasi
description: Pelajari cara mengonfigurasi Intlayer untuk aplikasi Anda. Pahami berbagai pengaturan dan opsi yang tersedia untuk menyesuaikan Intlayer sesuai kebutuhan Anda.
keywords:
  - Konfigurasi
  - Pengaturan
  - Kustomisasi
  - Intlayer
  - Opsi
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: "Menambahkan notasi per-locale untuk 'compiler.output' dan 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Memindahkan 'baseDir' dari konfigurasi 'content' ke 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Memperbarui opsi kompiler, menambahkan dukungan 'output' dan 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Memperbarui opsi kompiler"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Menambahkan opsi kompiler 'build-only', dan prefix kamus"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Menambahkan dukungan untuk penyedia Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, dan Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Menambahkan `dataSerialization` ke konfigurasi AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Mengubah nama mode impor `live` menjadi `fetch` untuk mendeskripsikan mekanisme dasarnya dengan lebih baik."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Memindahkan konfigurasi build `importMode` ke konfigurasi `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Menambahkan opsi `rewrite` ke konfigurasi routing"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Memisahkan konfigurasi sistem dari konfigurasi konten. Memindahkan path internal ke properti `system`. Menambahkan `codeDir` untuk memisahkan file konten dari transformasi kode."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Menambahkan opsi kamus `location` dan `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Menambahkan dukungan untuk format file JSON5 dan JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Menambahkan opsi `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Menambahkan konfigurasi `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Mengganti `middleware` dengan konfigurasi `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Menambahkan opsi `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Memperbarui opsi `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Menambahkan opsi `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Menghapus bidang `dictionaryOutput` dan bidang `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Menambahkan mode impor `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Mengganti bidang `hotReload` dengan `liveSync` dan menambahkan bidang `liveSyncPort` dan `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Mengganti `activateDynamicImport` dengan opsi `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Mengubah default contentDir dari `['src']` menjadi `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Menambahkan perintah `docs`"
---

# Dokumentasi Konfigurasi Intlayer

## Gambaran Umum

File konfigurasi Intlayer memungkinkan kustomisasi berbagai aspek plugin, seperti internasionalisasi (i18n), middleware, dan penanganan konten. Dokumen ini memberikan deskripsi mendetail tentang setiap properti dalam konfigurasi.

---

## Daftar Isi

<TOC/>

---

## Dukungan File Konfigurasi

Intlayer menerima format file konfigurasi JSON, JS, MJS, dan TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Contoh file konfigurasi

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Contoh file konfigurasi Intlayer yang menunjukkan semua opsi yang tersedia.
 */
const config: IntlayerConfig = {
  /**
   * Konfigurasi untuk pengaturan internasionalisasi.
   */
  internationalization: {
    /**
     * Daftar locale yang didukung dalam aplikasi.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Daftar locale wajib yang harus ditentukan dalam setiap kamus (dictionary).
     * Jika kosong, semua locale wajib dalam mode `strict`.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Tingkat ketatnya (strictness) konten yang diinternasionalisasi.
     * - "strict": Error jika ada locale yang dideklarasikan hilang atau tidak dideklarasikan.
     * - "inclusive": Peringatan jika locale yang dideklarasikan hilang.
     * - "loose": Menerima locale apa pun yang ada.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Locale default yang digunakan sebagai cadangan (fallback) jika locale yang diminta tidak ditemukan.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Pengaturan yang mengontrol operasi kamus dan perilaku fallback.
   */
  dictionary: {
    /**
     * Mengontrol bagaimana kamus diimpor.
     * - "static": Diimpor secara statis pada saat build.
     * - "dynamic": Diimpor secara dinamis menggunakan Suspense.
     * - "fetch": Diambil secara dinamis melalui API sinkronisasi langsung (live sync).
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategi untuk mengisi otomatis terjemahan yang hilang menggunakan AI.
     * Bisa berupa boolean atau pola path untuk menyimpan konten yang diisi.
     * Default: true
     */
    fill: true,

    /**
     * Lokasi fisik file kamus.
     * - "local": Disimpan di sistem file lokal.
     * - "remote": Disimpan di Intlayer CMS.
     * - "hybrid": Disimpan di sistem file lokal dan Intlayer CMS.
     * - "plugin" (atau string kustom lainnya): Disediakan oleh plugin atau sumber kustom.
     * Default: "local"
     */
    location: "local",

    /**
     * Apakah akan mengubah konten secara otomatis (misalnya, Markdown ke HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Konfigurasi routing dan middleware.
   */
  routing: {
    /**
     * Strategi routing locale.
     * - "prefix-no-default": Prefiks untuk semua kecuali locale default (misalnya, /dashboard, /fr/dashboard).
     * - "prefix-all": Prefiks untuk semua locale (misalnya, /en/dashboard, /fr/dashboard).
     * - "no-prefix": Tidak ada locale di URL.
     * - "search-params": Gunakan ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Tempat menyimpan locale yang dipilih pengguna.
     * Opsi: 'cookie', 'localStorage', 'sessionStorage', 'header', atau array dari opsi ini.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Path dasar untuk URL aplikasi.
     * Default: ""
     */
    basePath: "",

    /**
     * Aturan penulisan ulang URL kustom untuk path spesifik locale.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Pengaturan untuk menemukan dan memproses file konten.
   */
  content: {
    /**
     * Ekstensi file yang akan dipindai untuk kamus.
     * Default: ['.content.ts', '.content.js', '.content.json', dll.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Direktori tempat file .content berada.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Direktori tempat kode sumber berada.
     * Digunakan untuk optimasi build dan transformasi kode.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Pola yang akan dikecualikan dari pemindaian.
     * Default: ['node_modules', '.intlayer', dll.]
     */
    excludedPath: ["node_modules"],

    /**
     * Apakah akan memantau perubahan dan membangun ulang kamus dalam pengembangan.
     * Default: true dalam pengembangan
     */
    watch: true,

    /**
     * Perintah untuk memformat file .content yang baru dibuat/diperbarui.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfigurasi Visual Editor.
   */
  editor: {
    /**
     * Apakah editor visual diaktifkan.
     * Default: false
     */
    enabled: true,

    /**
     * URL aplikasi Anda untuk validasi asal (origin).
     * Default: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port untuk server editor lokal.
     * Default: 8000
     */
    port: 8000,

    /**
     * URL publik untuk editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL Intlayer CMS.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL Back-end API.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Apakah akan mengaktifkan sinkronisasi konten real-time.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * Pengaturan terjemahan dan pembuatan berbasis AI.
   */
  ai: {
    /**
     * Penyedia AI yang akan digunakan.
     * Opsi: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model yang akan digunakan dari penyedia yang dipilih.
     */
    model: "gpt-4o",

    /**
     * Kunci API penyedia.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Konteks global untuk memandu AI dalam menghasilkan terjemahan.
     */
    applicationContext: "Ini adalah aplikasi pemesanan perjalanan.",

    /**
     * URL dasar untuk AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serialisasi data (Data serialization)
     *
     * Opsi:
     * - "json": Standar, andal; menggunakan lebih banyak token.
     * - "toon": Lebih sedikit token, kurang konsisten dibandingkan JSON.
     *
     * Default: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Pengaturan build dan optimasi.
   */
  build: {
    /**
     * Mode eksekusi build.
     * - "auto": Build otomatis selama build aplikasi.
     * - "manual": Memerlukan perintah build eksplisit.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Apakah akan mengoptimalkan bundel akhir dengan memangkas kamus yang tidak digunakan.
     * Default: true dalam produksi
     */
    optimize: true,

    /**
     * Format output untuk file kamus yang dihasilkan.
     * Default: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Menunjukkan apakah build harus memeriksa tipe TypeScript.
     * Default: false
     */
    checkTypes: false,
  },

  /**
   * Konfigurasi Logger.
   */
  log: {
    /**
     * Tingkat logging.
     * - "default": Logging standar.
     * - "verbose": Logging debug mendetail.
     * - "disabled": Tanpa logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefiks untuk semua pesan log.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Konfigurasi sistem (Kasus penggunaan tingkat lanjut)
   */
  system: {
    /**
     * Direktori untuk menyimpan kamus lokalisasi.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Direktori untuk augmentasi modul.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Direktori untuk menyimpan kamus yang tidak digabungkan.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Direktori untuk menyimpan tipe kamus.
     */
    typesDir: ".intlayer/types",

    /**
     * Direktori tempat file aplikasi utama disimpan.
     */
    mainDir: ".intlayer/main",

    /**
     * Direktori tempat file konfigurasi disimpan.
     */
    configDir: ".intlayer/config",

    /**
     * Direktori tempat file cache disimpan.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Konfigurasi kompiler (Kasus penggunaan tingkat lanjut)
   */
  compiler: {
    /**
     * Menunjukkan apakah kompiler harus diaktifkan.
     *
     * - false: Nonaktifkan kompiler.
     * - true: Aktifkan kompiler.
     * - "build-only": Lewati kompiler selama pengembangan dan mempercepat waktu mulai.
     *
     * Default: false
     */
    enabled: true,

    /**
     * Mendefinisikan path file output. Menggantikan `outputDir`.
     *
     * - Path `./` diselesaikan relatif terhadap direktori komponen.
     * - Path `/` diselesaikan relatif terhadap root proyek (`baseDir`).
     *
     * - Menyertakan variabel `{{locale}}` dalam path akan memicu pembuatan kamus terpisah per locale.
     *
     * Contoh:
     * ```ts
     * {
     *   // Buat file .content.ts Multibahasa di dekat komponen
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Setara menggunakan template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Buat JSON per-locale terpusat di root proyek
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Setara menggunakan template string
     * }
     * ```
     *
     * Daftar variabel:
     *   - `fileName`: Nama file.
     *   - `key`: Kunci konten.
     *   - `locale`: Locale konten.
     *   - `extension`: Ekstensi file.
     *   - `componentFileName`: Nama file komponen.
     *   - `componentExtension`: Ekstensi file komponen.
     *   - `format`: Format kamus.
     *   - `componentFormat`: Format kamus komponen.
     *   - `componentDirPath`: Path direktori komponen.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah diubah.
     * Dengan begitu, kompiler dapat dijalankan hanya sekali untuk mengubah aplikasi, dan kemudian dapat dihapus.
     */
    saveComponents: false,

    /**
     * Masukkan hanya konten ke dalam file yang dihasilkan. Berguna untuk output i18next per-locale atau ICU MessageFormat JSON.
     */
    noMetadata: false,

    /**
     * Prefix kunci kamus
     */
    dictionaryKeyPrefix: "", // Menambahkan prefix opsional untuk kunci kamus yang diekstrak
  },

  /**
   * Skema kustom untuk memvalidasi isi kamus.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Konfigurasi plugin.
   */
  plugins: [],
};

export default config;
````

---

## Referensi Konfigurasi

Bagian berikut mendeskripsikan berbagai pengaturan konfigurasi yang tersedia untuk Intlayer.

---

### Konfigurasi Internasionalisasi (Internationalization)

Mendefinisikan pengaturan yang terkait dengan internasionalisasi, termasuk locale yang tersedia dan locale default untuk aplikasi.

| Bidang            | Deskripsi                                                                                           | Tipe       | Default             | Contoh               | Catatan                                                                                                                                                                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Daftar locale yang didukung dalam aplikasi.                                                         | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                    |
| `requiredLocales` | Daftar locale wajib dalam aplikasi.                                                                 | `string[]` | `[]`                | `[]`                 | • Jika kosong, semua locale wajib dalam mode `strict`.<br/>• Pastikan locale wajib juga didefinisikan dalam bidang `locales`.                                                                                                                                                                                                      |
| `strictMode`      | Memastikan implementasi konten yang diinternasionalisasi yang kuat menggunakan TypeScript.          | `string`   | `'inclusive'`       |                      | • Jika `"strict"`: fungsi `t` mengharuskan setiap locale yang dideklarasikan ditentukan — memunculkan error jika ada yang hilang atau tidak dideklarasikan.<br/>• Jika `"inclusive"`: memperingatkan tentang locale yang hilang tetapi menerima yang tidak dideklarasikan.<br/>• Jika `"loose"`: menerima locale apa pun yang ada. |
| `defaultLocale`   | Locale default yang digunakan sebagai cadangan (fallback) jika locale yang diminta tidak ditemukan. | `string`   | `Locales.ENGLISH`   | `'en'`               | Digunakan untuk menentukan locale saat tidak ada yang ditentukan di URL, cookie, atau header.                                                                                                                                                                                                                                      |

---

### Konfigurasi Editor (Editor)

Mendefinisikan pengaturan yang terkait dengan editor terintegrasi, termasuk port server dan status aktif.

| Bidang                       | Deskripsi                                                                                                                                                                                | Tipe                              | Default                             | Contoh                                                                                          | Catatan                                                                                                                                                                                                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | URL aplikasi.                                                                                                                                                                            | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Digunakan untuk membatasi asal (origin) editor karena alasan keamanan.<br/>• Jika diatur ke `'*'`, editor dapat diakses dari asal mana pun.                                                                                                                       |
| `port`                       | Port yang digunakan oleh server visual editor.                                                                                                                                           | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                                     |
| `editorURL`                  | URL server editor.                                                                                                                                                                       | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Digunakan untuk membatasi asal yang dapat berinteraksi dengan aplikasi.<br/>• Jika diatur ke `'*'`, dapat diakses dari asal mana pun.<br/>• Harus diatur jika port diubah atau editor dihosting di domain yang berbeda.                                           |
| `cmsURL`                     | URL Intlayer CMS.                                                                                                                                                                        | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                                     |
| `backendURL`                 | URL server backend.                                                                                                                                                                      | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                                     |
| `enabled`                    | Menunjukkan apakah aplikasi berinteraksi dengan visual editor.                                                                                                                           | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Jika `false`, editor tidak dapat berinteraksi dengan aplikasi.<br/>• Menonaktifkan untuk lingkungan tertentu akan menegakkan keamanan.                                                                                                                            |
| `clientId`                   | Memungkinkan paket intlayer untuk melakukan autentikasi dengan backend menggunakan oAuth2. Untuk mendapatkan token akses, buka [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Jaga kerahasiaannya; simpan dalam variabel lingkungan.                                                                                                                                                                                                              |
| `clientSecret`               | Memungkinkan paket intlayer untuk melakukan autentikasi dengan backend menggunakan oAuth2. Untuk mendapatkan token akses, buka [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Jaga kerahasiaannya; simpan dalam variabel lingkungan.                                                                                                                                                                                                              |
| `dictionaryPriorityStrategy` | Strategi untuk memprioritaskan kamus saat ada kamus lokal dan jarak jauh.                                                                                                                | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: memprioritaskan jarak jauh daripada lokal.<br/>• `'local_first'`: memprioritaskan lokal daripada jarak jauh.                                                                                                                                   |
| `liveSync`                   | Menunjukkan apakah server aplikasi harus memuat ulang konten secara panas (hot reload) saat terdeteksi perubahan pada CMS <br/> Visual Editor <br/> Backend.                             | `boolean`                         | `true`                              | `true`                                                                                          | • Saat kamus ditambahkan/diperbarui, aplikasi memperbarui konten halaman.<br/>• Sinkronisasi langsung mengeksternalisasi konten ke server lain, yang mungkin sedikit berdampak pada performa.<br/>• Direkomendasikan untuk menghosting keduanya di mesin yang sama. |
| `liveSyncPort`               | Port server sinkronisasi langsung (live sync).                                                                                                                                           | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                                     |
| `liveSyncURL`                | URL server sinkronisasi langsung (live sync).                                                                                                                                            | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Menunjuk ke localhost secara default; dapat diubah untuk server sinkronisasi langsung jarak jauh.                                                                                                                                                                   |

---

### Konfigurasi Routing (Routing)

Pengaturan yang mengontrol perilaku routing, termasuk struktur URL, penyimpanan locale, dan penanganan middleware.

| Bidang     | Deskripsi                                                                                                                               | Tipe                                                                                                                                                                                                         | Default                | Contoh                                                                                                                                                                                            | Catatan                                                                                                                                                                                                                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Mode routing URL untuk penanganan locale.                                                                                               | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) atau `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale ditangani melalui cara lain. `'search-params'`: `/dashboard?locale=fr` | Tidak berdampak pada manajemen cookie atau penyimpanan locale.                                                                                                                                                                                                                                                   |
| `storage`  | Konfigurasi untuk menyimpan locale di klien.                                                                                            | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                | Lihat tabel Opsi Penyimpanan di bawah.                                                                                                                                                                                                                                                                           |
| `basePath` | Path dasar untuk URL aplikasi.                                                                                                          | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                       | Jika aplikasi berada di `https://example.com/my-app, basePath adalah `'/my-app'`dan URL menjadi`https://example.com/my-app/en`.                                                                                                                                                                                  |
| `rewrite`  | Aturan penulisan ulang URL kustom yang mengesampingkan mode routing default untuk path tertentu. Mendukung parameter dinamis `[param]`. | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Lihat contoh di bawah                                                                                                                                                                             | • Aturan penulisan ulang (rewrite) didahulukan daripada `mode`.<br/>• Berfungsi dengan Next.js dan Vite.<br/>• `getLocalizedUrl()` secara otomatis menerapkan aturan yang cocok.<br/>• Lihat [Penulisan Ulang URL Kustom](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |

**Contoh `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Strategi fallback
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Opsi Penyimpanan (Storage)

| Nilat              | Catatan                                                                                                                                                                                                        | Deskripsi                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `'cookie'`         | • Untuk kepatuhan GDPR, pastikan persetujuan pengguna yang tepat.<br/>• Dapat dikustomisasi melalui `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).          | Menyimpan locale dalam cookie — dapat diakses di sisi klien dan server.    |
| `'localStorage'`   | • Tidak kadaluarsa kecuali dihapus secara eksplisit.<br/>• Proxy Intlayer tidak dapat mengaksesnya.<br/>• Dapat dikustomisasi melalui `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | Menyimpan locale di browser tanpa kadaluarsa — hanya sisi klien.           |
| `'sessionStorage'` | • Dihapus saat tab/jendela ditutup.<br/>• Proxy Intlayer tidak dapat mengaksesnya.<br/>• Dapat dikustomisasi melalui `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                | Menyimpan locale selama durasi sesi halaman — hanya sisi klien.            |
| `'header'`         | • Berguna untuk panggilan API.<br/>• Sisi klien tidak dapat mengaksesnya.<br/>• Dapat dikustomisasi melalui `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                 | Menyimpan atau mengirimkan locale melalui header HTTP — hanya sisi server. |

#### Atribut Cookie (Cookie Attributes)

Saat menggunakan penyimpanan cookie, Anda dapat mengonfigurasi atribut cookie tambahan:

| Bidang     | Deskripsi                                                 | Tipe                                                  |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Nama cookie. Default: `'INTLAYER_LOCALE'`                 | `string`                                              |
| `domain`   | Domain cookie. Default: `undefined`                       | `string`                                              |
| `path`     | Path cookie. Default: `undefined`                         | `string`                                              |
| `secure`   | Memerlukan HTTPS. Default: `undefined`                    | `boolean`                                             |
| `httpOnly` | Flag HTTP-only. Default: `undefined`                      | `boolean`                                             |
| `sameSite` | Kebijakan SameSite.                                       | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Tanggal kadaluarsa atau jumlah hari. Default: `undefined` | `Date` &#124; <br/> `number`                          |

#### Atribut Penyimpanan (Storage Attributes)

Saat menggunakan localStorage atau sessionStorage:

| Bidang | Deskripsi                                            | Tipe                                             |
| ------ | ---------------------------------------------------- | ------------------------------------------------ |
| `type` | Tipe penyimpanan.                                    | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Nama kunci penyimpanan. Default: `'INTLAYER_LOCALE'` | `string`                                         |

#### Contoh Konfigurasi

Berikut adalah beberapa contoh konfigurasi umum untuk struktur routing v7 yang baru:

**Konfigurasi Dasar (Standar)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Konfigurasi Patuh GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Mode Parameter Pencarian (Search Parameter)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Mode Tanpa Prefiks dengan Penyimpanan Kustom**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Penulisan Ulang URL Kustom dengan Rute Dinamis**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Cadangan untuk path yang tidak ditulis ulang
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Konfigurasi Konten (Content)

Pengaturan yang terkait dengan penanganan konten dalam aplikasi, termasuk nama direktori, ekstensi file, dan konfigurasi turunan.

| Bidang           | Deskripsi                                                                                                      | Tipe       | Default                                                                                                                                                                   | Contoh                                                                                                                                                                                | Catatan                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Menunjukkan apakah Intlayer harus memantau perubahan pada file deklarasi konten untuk membangun kembali kamus. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                         |
| `fileExtensions` | Ekstensi file yang akan dipindai selama kompilasi kamus.                                                       | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Dapat membantu menghindari konflik saat melakukan kustomisasi.                                                                                          |
| `contentDir`     | Path direktori tempat file definisi konten berada (`.content.*`).                                              | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Digunakan untuk melacak file konten dan menghasilkan kembali kamus.                                                                                     |
| `codeDir`        | Path direktori tempat kode sumber berada, relatif terhadap direktori dasar.                                    | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Digunakan untuk melacak transformasi file kode (pruning bagian yang tidak perlu, optimasi).<br/>• Pemisahan dari `contentDir` meningkatkan performa.  |
| `excludedPath`   | Direktori yang akan dikecualikan dari pemindaian konten.                                                       | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Saat ini tidak digunakan; direncanakan untuk masa mendatang.                                                                                            |
| `formatCommand`  | Perintah untuk memformat file konten saat Intlayer menulisnya secara lokal.                                    | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` diganti dengan path file.<br/>• Jika tidak ditentukan, Intlayer akan mencoba mendeteksi secara otomatis (menguji prettier, biome, eslint). |

---

### Konfigurasi Kamus (Dictionary)

Opsi yang mengontrol operasi kamus, termasuk perilaku pengisian otomatis dan pembuatan konten.

| Bidang                      | Deskripsi                                                                                                                                                                  | Tipe                                                                                                            | Default         | Contoh                                                                                      | Catatan                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | Mengontrol pembuatan file output pengisian otomatis (terjemahan AI).                                                                                                       | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`          | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: path default (file yang sama dengan sumber).<br/>• `false`: dinonaktifkan.<br/>• Pola string/fungsi memungkinkan pembuatan per-locale.<br/>• Objek per-locale: setiap locale memiliki pola sendiri; `false` mengecualikan locale.<br/>• Menyertakan `{{locale}}` memungkinkan pembuatan per-locale.<br/>• Pengaturan `fill` tingkat kamus selalu didahulukan daripada pengaturan global ini. |
| `description`               | Membantu editor dan CMS memahami tujuan kamus. Juga digunakan sebagai konteks untuk pembuatan terjemahan AI.                                                               | `string`                                                                                                        | `undefined`     | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `locale`                    | Mengalihkan kamus ke format khusus untuk locale tertentu. Setiap bidang yang dideklarasikan menjadi node terjemahan. Jika hilang, kamus dianggap berisi banyak terjemahan. | `LocalesValues`                                                                                                 | `undefined`     | `'en'`                                                                                      | Gunakan ini jika kamus didedikasikan untuk bahasa tertentu, daripada berisi banyak terjemahan.                                                                                                                                                                                                                                                                                                         |
| `contentAutoTransformation` | Apakah akan secara otomatis mengubah string konten menjadi node bertipe (Markdown, HTML, atau sisipan).                                                                    | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`         | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')` .<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')` .<br/>• Sisipan : `Hello {{name}}` → `insert('Hello {{name}}')` .                                                                                                                                                                                                                          |
| `location`                  | Menunjukkan lokasi penyimpanan file kamus dan bagaimana file tersebut disinkronkan dengan CMS.                                                                             | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`       | `'hybrid'`                                                                                  | • `'local'`: Hanya manajemen lokal.<br/>• `'remote'`: Hanya manajemen jarak jauh (CMS).<br/>• `'hybrid'`: Manajemen lokal dan jarak jauh.<br/>• `'plugin'` atau string kustom: Dikelola melalui plugin atau sumber kustom.                                                                                                                                                                             |
| `importMode`                | Mengontrol bagaimana kamus diimpor.                                                                                                                                        | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`      | `'dynamic'`                                                                                 | • `'static'`: Impor statis.<br/>• `'dynamic'`: Impor dinamis melalui Suspense.<br/>• `'fetch'`: Pengambilan melalui API LIVE Sync; fallback ke `'dynamic'` jika gagal.<br/>• Memerlukan plugin `@intlayer/babel` dan `@intlayer/swc`.<br/>• Kunci harus dideklarasikan secara statis.<br/>• Diabaikan jika `optimize` dinonaktifkan.<br/>• Tidak berdampak pada `getIntlayer`, `getDictionary`, dll.   |
| `priority`                  | Prioritas kamus. Saat menyelesaikan konflik antar kamus, nilai yang lebih tinggi akan didahulukan daripada yang lebih rendah.                                              | `number`                                                                                                        | `undefined`     | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `live`                      | DEPRECATED — gunakan `importMode: 'fetch'`. Sebelumnya menunjukkan apakah akan mengambil konten kamus secara dinamis melalui API Live Sync.                                | `boolean`                                                                                                       | `undefined`     |                                                                                             | Diganti namanya menjadi `importMode: 'fetch'` di v8.0.0.                                                                                                                                                                                                                                                                                                                                               |
| `schema`                    | Dibuat secara otomatis oleh Intlayer untuk validasi skema JSON.                                                                                                            | `'https://intlayer.org/schema.json'`                                                                            | Dibuat otomatis |                                                                                             | Jangan mengedit secara manual.                                                                                                                                                                                                                                                                                                                                                                         |
| `title`                     | Membantu mengidentifikasi kamus di editor dan CMS.                                                                                                                         | `string`                                                                                                        | `undefined`     | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tags`                      | Mengklasifikasikan kamus dan memberikan konteks atau instruksi untuk editor dan AI.                                                                                        | `string[]`                                                                                                      | `undefined`     | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `version`                   | Versi kamus jarak jauh; membantu melacak versi yang sedang digunakan.                                                                                                      | `string`                                                                                                        | `undefined`     | `'1.0.0'`                                                                                   | • Dikelola di CMS.<br/>• Jangan mengedit secara lokal.                                                                                                                                                                                                                                                                                                                                                 |

**Contoh `fill`**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Konfigurasi Logger (Log)

Pengaturan untuk menyesuaikan output log Intlayer.

| Bidang   | Deskripsi                      | Tipe                                                           | Default         | Contoh             | Catatan                                                                                                                                       |
| -------- | ------------------------------ | -------------------------------------------------------------- | --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`   | Menentukan mode logger.        | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`        | • `'verbose'`: Mencatat lebih banyak informasi untuk penelusuran kesalahan (debugging).<br/>• `'disabled'`: Menonaktifkan logging sepenuhnya. |
| `prefix` | Prefiks untuk semua pesan log. | `string`                                                       | `'[intlayer] '` | `'[mój prefiks] '` |                                                                                                                                               |

---

### Konfigurasi AI (AI)

Pengaturan untuk mengelola fitur-fitur AI dalam Intlayer, termasuk penyedia, model, dan kunci API.

Konfigurasi ini bersifat opsional jika Anda mendaftar dengan kunci akses di [Intlayer Dashboard](https://app.intlayer.org/project). Intlayer secara otomatis akan mengelola solusi AI yang paling hemat biaya dan efisien untuk kebutuhan Anda. Menggunakan pengaturan default memastikan dukungan jangka panjang terbaik karena Intlayer terus diperbarui untuk menggunakan model-model terbaru.

Jika Anda lebih suka menggunakan kunci API Anda sendiri atau model tertentu, Anda dapat mendefinisikan konfigurasi AI Anda sendiri.
Konfigurasi AI ini akan digunakan secara global di seluruh lingkungan Intlayer Anda. Perintah CLI seperti `fill` akan menggunakan pengaturan ini sebagai default, begitu juga dengan SDK, Visual Editor, dan CMS. Anda dapat mengesampingkan default ini untuk kasus penggunaan tertentu menggunakan parameter perintah.

Intlayer mendukung berbagai penyedia AI untuk memastikan fleksibilitas maksimal. Penyedia yang saat ini didukung meliputi:

- **OpenAI** (Default)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Bidang               | Deskripsi                                                                                                                                       | Tipe                                                                                                                                                                                                                                                                                                                                                                                           | Default     | Contoh                                                        | Catatan                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Penyedia yang akan digunakan untuk fitur AI Intlayer.                                                                                           | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Penyedia yang berbeda memerlukan kunci API yang berbeda dan memiliki struktur harga yang berbeda pula.                                                                                |
| `model`              | Model AI yang akan digunakan dalam fitur AI.                                                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Tidak ada   | `'gpt-4o-2024-11-20'`                                         | Model tertentu bergantung pada penyedia.                                                                                                                                              |
| `temperature`        | Mengontrol keacakan respons AI.                                                                                                                 | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Tidak ada   | `0.1`                                                         | Temperatur yang lebih tinggi = respons yang lebih kreatif tetapi kurang andal.                                                                                                        |
| `apiKey`             | Kunci API Anda untuk penyedia yang dipilih.                                                                                                     | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Tidak ada   | `process.env.OPENAI_API_KEY`                                  | Jaga kerahasiaannya; simpan dalam variabel lingkungan.                                                                                                                                |
| `applicationContext` | Konteks tambahan tentang aplikasi Anda untuk membantu AI menghasilkan terjemahan yang lebih akurat (domain, audiens target, nada, terminologi). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Tidak ada   | `'mój własny kontekst aplikacji'`                             | Dapat digunakan untuk menambahkan aturan (misalnya: `"Anda tidak boleh menerjemahkan URL Anda"` ).                                                                                    |
| `baseURL`            | URL dasar untuk AI API.                                                                                                                         | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Tidak ada   | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Dapat merujuk ke endpoint AI API lokal atau kustom.                                                                                                                                   |
| `dataSerialization`  | Format serialisasi data untuk fitur AI.                                                                                                         | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: default, andal; menggunakan lebih banyak token.<br/>• `'toon'`: lebih sedikit token, kurang stabil.<br/>• Meneruskan parameter tambahan ke model (upaya penalaran, dll.). |

---

### Konfigurasi Build (Build)

Pengaturan yang mengontrol bagaimana Intlayer mengoptimalkan dan mengompilasi internasionalisasi aplikasi Anda.

Pengaturan build berlaku untuk plugin `@intlayer/babel` dan `@intlayer/swc`.

> Dalam mode pengembangan, Intlayer menggunakan impor kamus statis untuk memfasilitasi proses pengembangan.

> Selama optimasi, Intlayer mengganti panggilan kamus dengan optimasi pemisahan kode (chunking) sehingga bundel akhir hanya mengimpor kamus yang benar-benar digunakan.

| Bidang            | Deskripsi                                                                    | Tipe                             | Default                                                                                                                                                                           | Contoh                                                                        | Catatan                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Mengontrol mode eksekusi build.                                              | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: Build dipicu secara otomatis selama build aplikasi.<br/>• `'manual'`: Hanya dijalankan melalui perintah build eksplisit.<br/>• Dapat berguna untuk mencegah build kamus (misalnya: untuk menghindari eksekusi di lingkungan Node.js).                                                                          |
| `optimize`        | Mengontrol apakah optimasi build dilakukan.                                  | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Jika tidak ditentukan, ini akan dipicu selama build framework (Vite/Next.js).<br/>• `true` memaksakan optimasi bahkan dalam mode pengembangan.<br/>• `false` menonaktifkannya.<br/>• Jika diaktifkan, mengganti panggilan kamus dengan optimasi chunking.<br/>• Memerlukan plugin `@intlayer/babel` dan `@intlayer/swc`. |
| `checkTypes`      | Menunjukkan apakah build harus memeriksa tipe TypeScript dan mencatat error. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Dapat memperlambat performa build.                                                                                                                                                                                                                                                                                         |
| `outputFormat`    | Mengontrol format output kamus.                                              | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                            |
| `traversePattern` | Pola untuk file yang akan dipindai selama optimasi.                          | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Meningkatkan performa build dengan membatasi optimasi ke file yang relevan.<br/>• Diabaikan jika `optimize` dinonaktifkan.<br/>• Menggunakan pola glob.                                                                                                                                                                  |

---

### Konfigurasi Sistem (System)

Pengaturan ini ditujukan untuk pengguna tingkat lanjut dan konfigurasi internal Intlayer.

| Bidang                    | Deskripsi                                                  | Tipe     | Default                           | Contoh | Catatan |
| ------------------------- | ---------------------------------------------------------- | -------- | --------------------------------- | ------ | ------- |
| `dictionariesDir`         | Lokasi untuk kamus yang dikompilasi.                       | `string` | `'.intlayer/dictionary'`          |        |         |
| `moduleAugmentationDir`   | Direktori tempat module augmentation TypeScript berada.    | `string` | `'.intlayer/types'`               |        |         |
| `unmergedDictionariesDir` | Direktori tempat kamus yang belum digabungkan berada.      | `string` | `'.intlayer/unmerged_dictionary'` |        |         |
| `typesDir`                | Direktori tempat tipe yang dihasilkan berada.              | `string` | `'.intlayer/types'`               |        |         |
| `mainDir`                 | Direktori tempat file utama Intlayer berada.               | `string` | `'.intlayer/main'`                |        |         |
| `configDir`               | Direktori tempat file konfigurasi yang dikompilasi berada. | `string` | `'.intlayer/config'`              |        |         |
| `cacheDir`                | Direktori tempat file cache berada.                        | `string` | `'.intlayer/cache'`               |        |         |

---

### Konfigurasi Kompiler (Compiler)

Mengontrol pengaturan kompiler Intlayer yang mengumpulkan kamus langsung dari komponen Anda.

| Bidang                | Deskripsi                                                                                                                                                                                                                                                                                                          | Tipe                                                                                                            | Default     | Contoh                                                                                                                                                   | Catatan                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Menunjukkan apakah kompiler harus aktif untuk mengumpulkan kamus.                                                                                                                                                                                                                                                  | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` melewati kompiler selama pengembangan untuk waktu mulai yang lebih cepat; hanya dijalankan selama perintah build.                                                                                 |
| `dictionaryKeyPrefix` | Prefiks untuk kunci kamus yang dikumpulkan.                                                                                                                                                                                                                                                                        | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | Ditambahkan sebelum kunci yang dihasilkan (berdasarkan nama file) untuk menghindari konflik.                                                                                                                     |
| `saveComponents`      | Menunjukkan apakah komponen harus disimpan setelah diubah.                                                                                                                                                                                                                                                         | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Jika `true`, file asli akan ditimpa dengan versi yang telah diubah.<br/>• Memungkinkan kompiler dijalankan sekali, lalu dihapus.                                                                               |
| `output`              | Mendefinisikan path file output. Menggantikan `outputDir`. Mendukung variabel template: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}` . | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Path `./` dihitung relatif terhadap direktori komponen.<br/>• Path `/` dihitung relatif terhadap root proyek.<br/>• `{{locale}}` memungkinkan pembuatan per-locale.<br/>• Mendukung definisi objek per-locale. |
| `noMetadata`          | Jika `true`, kompiler menghapus metadata kamus (key, content wrapper) dari output.                                                                                                                                                                                                                                 | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • Berguna untuk output i18next per-locale atau ICU MessageFormat JSON.<br/>• Berfungsi baik dengan plugin `loadJSON`.                                                                                            |
| `dictionaryKeyPrefix` | Prefix kunci kamus                                                                                                                                                                                                                                                                                                 | `string`                                                                                                        | `''`        |                                                                                                                                                          | Menambahkan prefix opsional ke kunci kamus yang diekstrak                                                                                                                                                        |

---

### Skema Kustom (Custom Schemas)

| Bidang    | Deskripsi                                                                     | Tipe                        |
| --------- | ----------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Memungkinkan Anda menentukan skema Zod untuk memvalidasi struktur kamus Anda. | `Record<string, ZodSchema>` |

---

### Plugin (Plugins)

| Bidang    | Deskripsi                                    | Tipe               |
| --------- | -------------------------------------------- | ------------------ |
| `plugins` | Daftar plugin Intlayer yang akan disertakan. | `IntlayerPlugin[]` |
