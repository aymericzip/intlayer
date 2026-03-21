---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Konfigurasi (Configuration)
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
    changes: Menambahkan notasi objek per-locale untuk 'compiler.output' dan 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Memindahkan 'baseDir' dari konfigurasi 'content' ke konfigurasi 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Memperbarui opsi kompiler (compiler), menambahkan dukungan untuk 'output' dan 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Memperbarui opsi kompiler
  - version: 8.1.5
    date: 2026-02-23
    changes: Menambahkan opsi kompiler 'build-only' dan awalan kamus
  - version: 8.0.6
    date: 2026-02-12
    changes: Menambahkan dukungan untuk penyedia Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, dan Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Menambahkan `dataSerialization` ke konfigurasi AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Mengubah nama mode impor `live` menjadi `fetch` untuk mendeskripsikan mekanisme dasarnya dengan lebih baik.
  - version: 8.0.0
    date: 2026-01-22
    changes: Memindahkan konfigurasi build `importMode` ke konfigurasi `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Menambahkan opsi `rewrite` ke konfigurasi routing
  - version: 8.0.0
    date: 2026-01-18
    changes: Memisahkan konfigurasi sistem dari konfigurasi konten. Memindahkan jalur internal ke properti `system`. Menambahkan `codeDir` untuk memisahkan file konten dan transformasi kode.
  - version: 8.0.0
    date: 2026-01-18
    changes: Menambahkan opsi kamus `location` dan `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Menambahkan dukungan untuk format file JSON5 dan JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Menambahkan opsi `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Menambahkan konfigurasi `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Mengganti `middleware` dengan konfigurasi `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Menambahkan opsi `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Memperbarui opsi `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Menambahkan opsi `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Menghapus field `dictionaryOutput` dan field `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Menambahkan mode impor `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Mengganti field `hotReload` dengan `liveSync` dan menambahkan field `liveSyncPort` serta `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Mengganti `activateDynamicImport` dengan opsi `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Mengubah default contentDir dari `['src']` menjadi `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Menambahkan perintah `docs`
---

# Dokumentasi Konfigurasi Intlayer

## Ringkasan

File konfigurasi Intlayer memungkinkan Anda untuk menyesuaikan berbagai aspek plugin, seperti internasionalisasi (internationalization), middleware, dan penanganan konten. Dokumentasi ini memberikan deskripsi mendalam tentang setiap properti dalam konfigurasi.

---

## Daftar Isi

<TOC/>

---

## Format File Konfigurasi yang Didukung

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

## Contoh File Konfigurasi

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Contoh file konfigurasi Intlayer yang menampilkan semua opsi yang tersedia.
 */
const config: IntlayerConfig = {
  /**
   * Konfigurasi pengaturan internasionalisasi.
   */
  internationalization: {
    /**
     * Daftar locale yang didukung dalam aplikasi.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Daftar locale wajib yang harus didefinisikan dalam setiap kamus.
     * Jika kosong, semua locale bersifat wajib dalam mode `strict`.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Tingkat keketatan untuk konten yang diinternasionalisasi.
     * - "strict": Error jika locale yang dideklarasikan hilang atau tidak dideklarasikan.
     * - "inclusive": Peringatan jika locale yang dideklarasikan hilang.
     * - "loose": Menerima locale apa pun yang ada.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Locale default yang digunakan sebagai fallback jika locale yang diminta tidak ditemukan.
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
     * - "static": Diimpor secara statis saat waktu build.
     * - "dynamic": Diimpor secara dinamis menggunakan Suspense.
     * - "fetch": Diambil secara dinamis melalui API sinkronisasi langsung (live sync).
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategi untuk mengisi terjemahan yang hilang secara otomatis menggunakan AI.
     * Dapat berupa nilai boolean atau pola jalur untuk menyimpan konten yang diisi.
     * Default: true
     */
    fill: true,

    /**
     * Lokasi fisik file kamus.
     * - "local": Disimpan dalam sistem file lokal.
     * - "remote": Disimpan di Intlayer CMS.
     * - "hybrid": Disimpan di lokal dan di Intlayer CMS.
     * - "plugin" (atau string kustom apa pun): Disediakan oleh plugin atau sumber kustom.
     * Default: "local"
     */
    location: "local",

    /**
     * Apakah konten harus ditransformasi secara otomatis (misalnya Markdown ke HTML).
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
     * - "prefix-no-default": Menambahkan awalan ke semua kecuali locale default (misalnya /dashboard, /fr/dashboard).
     * - "prefix-all": Menambahkan awalan ke semua locale (misalnya /en/dashboard, /fr/dashboard).
     * - "no-prefix": Tidak ada locale di URL.
     * - "search-params": Menggunakan ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Tempat menyimpan locale yang dipilih pengguna.
     * Opsi: 'cookie', 'localStorage', 'sessionStorage', 'header', atau array dari opsi-opsi tersebut.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Jalur dasar untuk URL aplikasi.
     * Default: ""
     */
    basePath: "",

    /**
     * Aturan penulisan ulang (rewrite) URL kustom untuk jalur spesifik per-locale.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Pengaturan yang berkaitan dengan pencarian dan pemrosesan file konten.
   */
  content: {
    /**
     * Ekstensi file untuk memindai kamus.
     * Default: ['.content.ts', '.content.js', '.content.json', dll]
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
     * Pola yang dikecualikan dari pemindaian.
     * Default: ['node_modules', '.intlayer', dll]
     */
    excludedPath: ["node_modules"],

    /**
     * Apakah akan memantau perubahan dan membangun kembali kamus selama pengembangan.
     * Default: true dalam pengembangan
     */
    watch: true,

    /**
     * Perintah yang digunakan untuk memformat file .content yang baru dibuat / diperbarui.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfigurasi Visual Editor.
   */
  editor: {
    /**
     * Apakah visual editor diaktifkan.
     * Default: false
     */
    enabled: true,

    /**
     * URL aplikasi Anda untuk validasi asal (origin validation).
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
     * URL API Backend.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Apakah akan mengaktifkan sinkronisasi konten secara real-time.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * Pengaturan terjemahan dan pembuatan konten berbasis AI.
   */
  ai: {
    /**
     * Penyedia AI yang akan digunakan.
     * Opsi: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model dari penyedia yang dipilih untuk digunakan.
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
     * URL dasar untuk API AI.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serialisasi Data (Data Serialization)
     *
     * Opsi:
     * - "json": Default, kuat; menggunakan lebih banyak token.
     * - "toon": Menggunakan lebih sedikit token, kurang konsisten dibandingkan JSON.
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
     * - "auto": Build secara otomatis selama build aplikasi.
     * - "manual": Memerlukan perintah build eksplisit.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Apakah akan mengoptimalkan bundle akhir dengan menghapus kamus yang tidak digunakan.
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
     * - "verbose": Logging debug mendalam.
     * - "disabled": Menonaktifkan logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Awalan untuk semua pesan log.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Konfigurasi Sistem (Untuk penggunaan tingkat lanjut)
   */
  system: {
    /**
     * Direktori untuk menyimpan kamus yang dilokalisasi.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Direktori untuk augmentasi modul TypeScript.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Direktori untuk menyimpan kamus yang belum digabungkan.
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
   * Konfigurasi Kompiler (Compiler) (Untuk penggunaan tingkat lanjut)
   */
  compiler: {
    /**
     * Menunjukkan apakah kompiler harus diaktifkan.
     *
     * - false: Menonaktifkan kompiler.
     * - true: Mengaktifkan kompiler.
     * - "build-only": Melewati kompiler selama pengembangan dan mempercepat waktu startup.
     *
     * Default: false
     */
    enabled: true,

    /**
     * Mendefinisikan jalur untuk file output. Menggantikan `outputDir`.
     *
     * - Jalur `./` diselesaikan relatif terhadap direktori komponen.
     * - Jalur `/` diselesaikan relatif terhadap akar proyek (`baseDir`).
     *
     * - Menyertakan variabel `{{locale}}` dalam jalur akan memicu pembuatan kamus terpisah per-bahasa.
     *
     * Contoh:
     * ```ts
     * {
     *   // Buat file .content.ts multilingual di sebelah komponen
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Setara menggunakan template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Buat JSON terpusat per-bahasa di akar proyek
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
     *   - `componentDirPath`: Jalur direktori komponen.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah ditransformasi.
     * Dengan cara ini, kompiler dapat dijalankan sekali saja untuk mentransformasi aplikasi dan kemudian dapat dihapus.
     */
    saveComponents: false,

    /**
     * Hanya menyisipkan konten ke dalam file yang dihasilkan. Berguna untuk output JSON per-bahasa untuk i18next atau ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "", // Tambahkan awalan opsional ke kunci kamus yang diekstrak
  },

  /**
   * Schema kustom untuk memvalidasi konten kamus.
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

## Referensi Konfigurasi (Configuration Reference)

Bagian berikut menjelaskan berbagai pengaturan konfigurasi yang tersedia di Intlayer.

---

### Konfigurasi Internasionalisasi (Internationalization Configuration)

Mendefinisikan pengaturan yang berkaitan dengan internasionalisasi, termasuk locale yang tersedia dan locale default untuk aplikasi.

| Field             | Tipe       | Deskripsi                                                                                                           | Contoh               | Catatan                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Daftar locale yang didukung dalam aplikasi. Default: `[Locales.ENGLISH]`                                            | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                                |
| `requiredLocales` | `string[]` | Daftar locale wajib dalam aplikasi. Default: `[]`                                                                   | `[]`                 | Jika kosong, semua locale bersifat wajib dalam mode `strict`. Pastikan locale wajib juga didefinisikan dalam field `locales`.                                                                                                                                                                                                                  |
| `strictMode`      | `string`   | Menjamin implementasi konten internasionalisasi yang kuat menggunakan TypeScript. Default: `inclusive`              |                      | Jika `"strict"`: fungsi `t` mengharuskan setiap locale yang dideklarasikan untuk didefinisikan — melemparkan error jika ada yang hilang atau tidak dideklarasikan. Jika `"inclusive"`: memperingatkan tentang locale yang hilang tetapi menerima locale yang ada namun tidak dideklarasikan. Jika `"loose"`: menerima locale apa pun yang ada. |
| `defaultLocale`   | `string`   | Locale default yang digunakan sebagai fallback jika locale yang diminta tidak ditemukan. Default: `Locales.ENGLISH` | `'en'`               | Digunakan untuk menentukan locale ketika tidak ada locale yang ditentukan dalam URL, cookie, atau header.                                                                                                                                                                                                                                      |

---

### Konfigurasi Editor (Editor Configuration)

Mendefinisikan pengaturan yang berkaitan dengan editor terintegrasi, termasuk port server dan status aktivitas.

| Field                        | Tipe                      | Deskripsi                                                                                                                                                                                                     | Contoh                                                                                | Catatan                                                                                                                                                                                                                                     |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | URL aplikasi Anda. Default: `''`                                                                                                                                                                              | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Digunakan untuk membatasi asal (origin) editor demi alasan keamanan. Jika disetel ke `'*'`, editor dapat diakses dari asal mana pun.                                                                                                        |
| `port`                       | `number`                  | Port yang digunakan oleh server Visual Editor. Default: `8000`                                                                                                                                                |                                                                                       |                                                                                                                                                                                                                                             |
| `editorURL`                  | `string`                  | URL server editor. Default: `'http://localhost:8000'`                                                                                                                                                         | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Digunakan untuk membatasi asal yang dapat berinteraksi dengan aplikasi. Jika disetel ke `'*'`, dapat diakses dari asal mana pun. Harus disetel jika mengubah port atau jika editor di-host di domain yang berbeda.                          |
| `cmsURL`                     | `string`                  | URL Intlayer CMS. Default: `'https://intlayer.org'`                                                                                                                                                           | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                             |
| `backendURL`                 | `string`                  | URL server backend. Default: `https://back.intlayer.org`                                                                                                                                                      | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                             |
| `enabled`                    | `boolean`                 | Menunjukkan apakah aplikasi akan berinteraksi dengan visual editor. Default: `true`                                                                                                                           | `process.env.NODE_ENV !== 'production'`                                               | Jika `false`, editor tidak dapat berinteraksi dengan aplikasi. Menonaktifkannya untuk lingkungan tertentu akan meningkatkan keamanan.                                                                                                       |
| `clientId`                   | `string &#124; undefined` | Memungkinkan paket intlayer untuk melakukan autentikasi dengan backend menggunakan oAuth2. Untuk mendapatkan token akses, buka [intlayer.org/project](https://app.intlayer.org/project). Default: `undefined` |                                                                                       | Jaga kerahasiaannya; simpan dalam variabel lingkungan.                                                                                                                                                                                      |
| `clientSecret`               | `string &#124; undefined` | Memungkinkan paket intlayer untuk melakukan autentikasi dengan backend menggunakan oAuth2. Untuk mendapatkan token akses, buka [intlayer.org/project](https://app.intlayer.org/project). Default: `undefined` |                                                                                       | Jaga kerahasiaannya; simpan dalam variabel lingkungan.                                                                                                                                                                                      |
| `dictionaryPriorityStrategy` | `string`                  | Strategi untuk memprioritaskan kamus ketika kamus lokal dan jarak jauh ada. Default: `'local_first'`                                                                                                          | `'distant_first'`                                                                     | `'distant_first'`: memprioritaskan jarak jauh daripada lokal. `'local_first'`: memprioritaskan lokal daripada jarak jauh.                                                                                                                   |
| `liveSync`                   | `boolean`                 | Menunjukkan apakah server aplikasi harus memuat ulang konten secara panas (hot-reload) ketika perubahan terdeteksi pada CMS / Visual Editor / Backend. Default: `true`                                        | `true`                                                                                | Ketika kamus ditambahkan/diperbarui, aplikasi memperbarui konten halaman. Sinkronisasi langsung mengalihdayakan konten ke server lain, yang mungkin sedikit memengaruhi performa. Disarankan untuk menghosting keduanya di mesin yang sama. |
| `liveSyncPort`               | `number`                  | Port server sinkronisasi langsung. Default: `4000`                                                                                                                                                            | `4000`                                                                                |                                                                                                                                                                                                                                             |
| `liveSyncURL`                | `string`                  | URL server sinkronisasi langsung. Default: `'http://localhost:{liveSyncPort}'`                                                                                                                                | `'https://example.com'`                                                               | Menunjuk ke localhost secara default; dapat diubah ke server sinkronisasi langsung jarak jauh.                                                                                                                                              |

### Konfigurasi Routing (Routing Configuration)

Pengaturan yang mengontrol perilaku routing, termasuk struktur URL, penyimpanan locale, dan penanganan middleware.

| Field      | Tipe                                                                                                                                                 | Deskripsi                                                                                                                                                  | Contoh                                                                                                                                                                                           | Catatan                                                                                                                                                                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Mode routing URL untuk penanganan locale. Default: `'prefix-no-default'`                                                                                   | `'prefix-no-default'`: `/dashboard` (en) atau `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale ditangani dengan cara lain. `'search-params'`: `/dashboard?locale=fr` | Tidak memengaruhi manajemen cookie atau penyimpanan locale.                                                                                                                                                                                                                               |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Konfigurasi untuk menyimpan locale pada klien. Default: `['cookie', 'header']`                                                                             | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                    | Lihat tabel Opsi Penyimpanan di bawah.                                                                                                                                                                                                                                                    |
| `basePath` | `string`                                                                                                                                             | Jalur dasar untuk URL aplikasi. Default: `''`                                                                                                              | `'/my-app'`                                                                                                                                                                                      | Jika aplikasi berada di `https://example.com/my-app`, basePath adalah `'/my-app'` dan URL menjadi `https://example.com/my-app/en`.                                                                                                                                                        |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Aturan penulisan ulang URL kustom yang menggantikan mode routing default untuk jalur tertentu. Mendukung parameter dinamis `[param]`. Default: `undefined` | Lihat contoh di bawah                                                                                                                                                                            | Aturan penulisan ulang memiliki prioritas di atas `mode`. Berfungsi dengan Next.js dan Vite. `getLocalizedUrl()` secara otomatis menerapkan aturan yang sesuai. Lihat [Penulisan Ulang URL Kustom](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/custom_url_rewrites.md). |

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

#### Opsi Penyimpanan (Storage Options)

| Nilai              | Deskripsi                                                                      | Catatan                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Menyimpan locale dalam cookie — dapat diakses oleh sisi klien dan server.      | Untuk kepatuhan GDPR, pastikan mendapatkan persetujuan pengguna yang sesuai. Dapat disesuaikan melalui `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Menyimpan locale di browser tanpa batas waktu — hanya sisi klien.              | Tidak berakhir kecuali dihapus secara eksplisit. Proksi Intlayer tidak dapat mengaksesnya. Dapat disesuaikan melalui `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).            |
| `'sessionStorage'` | Menyimpan locale selama durasi sesi halaman — hanya sisi klien.                | Dihapus saat tab/jendela ditutup. Proksi Intlayer tidak dapat mengaksesnya. Dapat disesuaikan melalui `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                         |
| `'header'`         | Menyimpan atau mentransmisikan locale melalui header HTTP — hanya sisi server. | Berguna untuk panggilan API. Sisi klien tidak dapat mengaksesnya. Dapat disesuaikan melalui `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                           |

#### Atribut Cookie (Cookie Attributes)

Saat menggunakan penyimpanan cookie, Anda dapat mengonfigurasi atribut cookie tambahan:

| Field      | Tipe                                  | Deskripsi                                                  |
| ---------- | ------------------------------------- | ---------------------------------------------------------- |
| `name`     | `string`                              | Nama cookie. Default: `'INTLAYER_LOCALE'`                  |
| `domain`   | `string`                              | Domain cookie. Default: `undefined`                        |
| `path`     | `string`                              | Jalur cookie. Default: `undefined`                         |
| `secure`   | `boolean`                             | Memerlukan HTTPS. Default: `undefined`                     |
| `httpOnly` | `boolean`                             | Flag HTTP-only. Default: `undefined`                       |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Kebijakan SameSite.                                        |
| `expires`  | `Date &#124; number`                  | Tanggal kedaluwarsa atau jumlah hari. Default: `undefined` |

#### Atribut Penyimpanan Locale (Locale Storage Attributes)

Saat menggunakan localStorage atau sessionStorage:

| Field  | Tipe                                     | Deskripsi                                            |
| ------ | ---------------------------------------- | ---------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Tipe penyimpanan.                                    |
| `name` | `string`                                 | Nama kunci penyimpanan. Default: `'INTLAYER_LOCALE'` |

#### Contoh Konfigurasi (Configuration Examples)

Berikut adalah beberapa contoh konfigurasi umum untuk struktur routing v7 yang baru:

**Konfigurasi Dasar (Default)**:

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

**Mode Parameter Pencarian (Search Parameters Mode)**:

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

**Mode Tanpa Awalan (No Prefix Mode) dengan Penyimpanan Kustom**:

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

**Penulisan Ulang URL Kustom dengan Jalur Dinamis**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback untuk jalur yang tidak ditulis ulang
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

### Konfigurasi Konten (Content Configuration)

Pengaturan yang berkaitan dengan pemrosesan konten di dalam aplikasi (nama direktori, ekstensi file, dan konfigurasi turunan).

| Field            | Tipe       | Deskripsi                                                                                                                                                                                         | Contoh                              | Catatan                                                                                                                                    |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | `boolean`  | Menunjukkan apakah Intlayer harus memantau perubahan dalam file deklarasi konten untuk membangun kembali kamus. Default: `process.env.NODE_ENV === 'development'`                                 |                                     |                                                                                                                                            |
| `fileExtensions` | `string[]` | Ekstensi file yang digunakan untuk memindai file deklarasi konten. Default: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                            |
| `contentDir`     | `string[]` | Jalur ke direktori tempat file deklarasi konten berada. Default: `['.']`                                                                                                                          | `['src/content']`                   |                                                                                                                                            |
| `codeDir`        | `string[]` | Jalur ke direktori tempat file kode sumber aplikasi Anda berada. Default: `['.']`                                                                                                                 | `['src']`                           | Digunakan untuk mengoptimalkan build dan memastikan transformasi kode serta pemuatan ulang panas hanya berlaku untuk file yang diperlukan. |
| `excludedPath`   | `string[]` | Jalur yang dikecualikan dari pemindaian konten. Default: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                | `['src/styles']`                    |                                                                                                                                            |
| `formatCommand`  | `string`   | Perintah yang akan dijalankan untuk memformat file konten yang baru dibuat atau diperbarui. Default: `undefined`                                                                                  | `'npx prettier --write "{{file}}"'` | Digunakan selama ekstraksi konten atau melalui visual editor.                                                                              |

---

### Konfigurasi Kamus (Dictionary Configuration)

Pengaturan yang mengontrol operasi kamus, termasuk perilaku pengisian otomatis dan pembuatan konten.

Konfigurasi kamus ini memiliki dua tujuan utama:

1. **Nilai default**: Menentukan nilai default saat membuat file deklarasi konten.
2. **Perilaku fallback**: Memungkinkan pengaturan perilaku operasi kamus secara global, memberikan nilai fallback ketika field tertentu tidak didefinisikan.

Untuk informasi lebih lanjut tentang bagaimana file deklarasi konten dan nilai konfigurasi diterapkan, lihat [dokumentasi file konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

| Field                       | Tipe                                                                                            | Deskripsi                                                                                                                                                                         | Contoh                   | Catatan                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Mengontrol bagaimana file output pengisian otomatis (terjemahan AI) dihasilkan. Default: `true`                                                                                   | Lihat contoh di bawah    | `true`: jalur default (file yang sama dengan sumber). `false`: dinonaktifkan. Pola string/fungsi menghasilkan file per bahasa. Objek per bahasa: setiap bahasa dipetakan ke polanya sendiri; `false` melewatkan bahasa tersebut. Menyertakan variabel `{{locale}}` memicu pembuatan per-bahasa. `fill` di tingkat kamus selalu memiliki prioritas di atas konfigurasi global ini. |
| `description`               | `string`                                                                                        | Membantu memahami tujuan kamus di editor dan CMS. Juga digunakan sebagai konteks untuk pembuatan terjemahan AI. Default: `undefined`                                              | `'User profile section'` |                                                                                                                                                                                                                                                                                                                                                                                   |
| `locale`                    | `LocalesValues`                                                                                 | Mengubah kamus menjadi format per-lokal. Setiap field yang dideklarasikan menjadi node terjemahan. Jika tidak ada, kamus diperlakukan sebagai multibahasa. Default: `undefined`   | `'en'`                   | Gunakan ini ketika kamus spesifik untuk satu lokal saja, bukan berisi terjemahan untuk beberapa lokal.                                                                                                                                                                                                                                                                            |
| `contentAutoTransformation` | `boolean &#124; { markdown?: boolean; html?: boolean; insertion?: boolean }`                    | Secara otomatis mengubah string konten menjadi node yang diketik (markdown, HTML, atau penyisipan). Default: `false`                                                              | `true`                   | Markdown: `### Title` → `md('### Title')`. HTML: `<div>Title</div>` → `html('<div>Title</div>')`. Penyisipan: `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                      |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; 'plugin' &#124; string`                         | Menunjukkan di mana file kamus disimpan dan mode sinkronisasi CMS-nya. Default: `'local'`                                                                                         | `'hybrid'`               | `'local'`: dikelola secara lokal saja. `'remote'`: dikelola secara remote saja (CMS). `'hybrid'`: dikelola baik secara lokal maupun remote. `'plugin'` atau string kustom: dikelola oleh plugin atau sumber kustom.                                                                                                                                                               |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Mengontrol bagaimana kamus diimpor. Default: `'static'`                                                                                                                           | `'dynamic'`              | `'static'`: Diimpor secara statis. `'dynamic'`: Diimpor secara dinamis melalui 'Suspense'. `'fetch'`: Diambil secara dinamis melalui 'Live Sync API'. Tidak memengaruhi `getIntlayer`, `getDictionary`, `useDictionary`, dll.                                                                                                                                                     |
| `priority`                  | `number`                                                                                        | Prioritas kamus. Nilai yang lebih tinggi lebih diutamakan daripada yang lebih rendah saat menyelesaikan konflik antar kamus. Default: `undefined`                                 | `1`                      |                                                                                                                                                                                                                                                                                                                                                                                   |
| `live`                      | `boolean`                                                                                       | Tidak digunakan lagi — gunakan `importMode: 'fetch'` sebagai gantinya. Menunjukkan apakah konten kamus diambil secara dinamis melalui API sinkronisasi live. Default: `undefined` |                          | Diganti namanya menjadi `importMode: 'fetch'` di v8.0.0.                                                                                                                                                                                                                                                                                                                          |
| `schema`                    | `'https://intlayer.org/schema.json'`                                                            | Dibuat otomatis oleh Intlayer untuk validasi skema JSON. Default: dibuat otomatis                                                                                                 |                          | Jangan diubah secara manual.                                                                                                                                                                                                                                                                                                                                                      |
| `title`                     | `string`                                                                                        | Membantu mengidentifikasi kamus di editor dan CMS. Default: `undefined`                                                                                                           | `'User Profile'`         |                                                                                                                                                                                                                                                                                                                                                                                   |
| `tags`                      | `string[]`                                                                                      | Mengkategorikan kamus dan menyediakan konteks atau instruksi untuk editor dan AI. Default: `undefined`                                                                            | `['user', 'profile']`    |                                                                                                                                                                                                                                                                                                                                                                                   |
| `version`                   | `string`                                                                                        | Versi kamus remote; membantu melacak versi mana yang sedang digunakan. Default: `undefined`                                                                                       | `'1.0.0'`                | Dapat dikelola di CMS. Jangan diubah secara lokal.                                                                                                                                                                                                                                                                                                                                |

**Contoh `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Konfigurasi AI (AI Configuration)

Mendefinisikan pengaturan untuk fitur berkekuatan AI Intlayer, seperti pembuatan terjemahan.

| Field                | Tipe                   | Deskripsi                                                                        | Contoh                                            | Catatan                                                                                                  |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Penyedia AI yang akan digunakan.                                                 | `'openai'`, `'anthropic'`, `'googlevertex'`       |                                                                                                          |
| `model`              | `string`               | Model AI yang akan digunakan.                                                    | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`        |                                                                                                          |
| `apiKey`             | `string`               | Kunci API untuk penyedia yang dipilih.                                           | `process.env.OPENAI_API_KEY`                      |                                                                                                          |
| `applicationContext` | `string`               | Konteks tambahan tentang aplikasi Anda untuk meningkatkan akurasi terjemahan AI. | `'Sebuah platform pembelajaran untuk anak-anak.'` |                                                                                                          |
| `baseURL`            | `string`               | URL dasar opsional untuk panggilan API.                                          |                                                   | Berguna jika Anda menggunakan proksi atau penyebaran AI lokal.                                           |
| `dataSerialization`  | `'json' &#124; 'toon'` | Mendefinisikan bagaimana data dikirim ke AI. Default: `'json'`                   | `'json'`                                          | `'json'`: lebih kuat dan akurat. `'toon'`: menggunakan lebih sedikit token tetapi mungkin kurang stabil. |

---

### Konfigurasi Build (Build Configuration)

Pengaturan untuk proses build dan optimasi Intlayer.

| Field          | Tipe                     | Deskripsi                                                                                                               | Contoh | Catatan |
| -------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| `mode`         | `'auto' &#124; 'manual'` | Menunjukkan apakah Intlayer harus berjalan secara otomatis selama langkah-langkah pre-build aplikasi. Default: `'auto'` |        |         |
| `optimize`     | `boolean`                | Menunjukkan apakah kamus yang dikompilasi harus dioptimalkan untuk runtime. Default: `true` dalam produksi              |        |         |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Format output untuk file kamus yang dihasilkan. Default: `['cjs', 'esm']`                                               |        |         |
| `checkTypes`   | `boolean`                | Menunjukkan apakah Intlayer harus memeriksa tipe dalam file yang dihasilkan. Default: `false`                           |        |         |

---

### Konfigurasi Sistem (System Configuration)

Pengaturan ini untuk penggunaan tingkat lanjut dan konfigurasi internal Intlayer.

| Field                     | Tipe     | Deskripsi                                    | Default                           |
| ------------------------- | -------- | -------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Direktori kamus yang dikompilasi.            | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Direktori augmentasi modul TypeScript.       | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Direktori kamus yang belum digabungkan.      | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Direktori tipe yang dihasilkan.              | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Direktori file Intlayer utama.               | `'.intlayer/main'`                |
| `configDir`               | `string` | Direktori file konfigurasi yang dikompilasi. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Direktori file cache.                        | `'.intlayer/cache'`               |

---

### Konfigurasi Kompiler (Compiler Configuration)

Pengaturan untuk kompiler Intlayer (`intlayer compiler`).

| Field                 | Tipe                     | Deskripsi                                                                           | Default |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | Menunjukkan apakah kompiler aktif.                                                  | `false` |
| `output`              | `string &#124; Function` | Jalur output untuk kamus yang diekstrak.                                            |         |
| `saveComponents`      | `boolean`                | Menunjukkan apakah file sumber asli harus ditimpa dengan versi yang ditransformasi. | `false` |
| `noMetadata`          | `boolean`                | Jika `true`, kompiler tidak akan menyertakan metadata dalam file yang dihasilkan.   | `false` |
| `dictionaryKeyPrefix` | `string`                 | Awalan kunci kamus opsional.                                                        | `''`    |

---

### Konfigurasi Logger (Logger Configuration)

Pengaturan untuk menyesuaikan output log Intlayer.

| Field    | Tipe                                           | Deskripsi               | Default        |
| -------- | ---------------------------------------------- | ----------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Mode logging.           | `'default'`    |
| `prefix` | `string`                                       | Awalan untuk pesan log. | `'[intlayer]'` |

---

### Schema Kustom (Custom Schemas)

| Field     | Tipe                        | Deskripsi                                                                    |
| --------- | --------------------------- | ---------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Memungkinkan pendefinisian schema Zod untuk memvalidasi struktur kamus Anda. |

---

### Plugin

| Field     | Tipe               | Deskripsi                                    |
| --------- | ------------------ | -------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Daftar plugin Intlayer yang akan diaktifkan. |
