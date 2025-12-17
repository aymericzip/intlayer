---
createdAt: 2024-08-13
updatedAt: 2025-10-25
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
  - version: 7.5.0
    date: 2025-12-17
    changes: Menambahkan opsi `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Menambahkan konfigurasi `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Mengganti konfigurasi `middleware` dengan `routing`
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
    changes: Menambahkan mode import `live`
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

## Ikhtisar

File konfigurasi Intlayer memungkinkan kustomisasi berbagai aspek plugin, seperti internasionalisasi, middleware, dan penanganan konten. Dokumen ini memberikan deskripsi rinci tentang setiap properti dalam konfigurasi.

---

## Daftar Isi

<TOC/>

---

## Dukungan File Konfigurasi

Intlayer menerima format file konfigurasi JSON, JS, MJS, dan TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Contoh file konfigurasi

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  dictionary: {
    fill: "./{{fileName}}.content.json",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Ini adalah aplikasi uji",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Ini adalah aplikasi uji",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "contentDir": ["src", "../ui-library"],
  },
  "dictionary": {
    "fill": "./{{fileName}}.content.json",
  },
  "routing": {
    "mode": "prefix-no-default",
    "storage": "cookie",
  },
  "editor": {
    "applicationURL": "https://example.com",
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Ini adalah aplikasi uji",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Referensi Konfigurasi

Bagian berikut menjelaskan berbagai pengaturan konfigurasi yang tersedia untuk Intlayer.

---

### Konfigurasi Internasionalisasi

Mendefinisikan pengaturan yang terkait dengan internasionalisasi, termasuk locale yang tersedia dan locale default untuk aplikasi.

#### Properti

- **locales**:
  - _Tipe_: `string[]`
  - _Default_: `['en']`
  - _Deskripsi_: Daftar locale yang didukung dalam aplikasi.
  - _Contoh_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tipe_: `string[]`
  - _Default_: `[]`
  - _Deskripsi_: Daftar locale yang wajib ada dalam aplikasi.
  - _Contoh_: `[]`
  - _Catatan_: Jika kosong, semua locale diwajibkan dalam mode `strict`.
  - _Catatan_: Pastikan locale yang wajib juga didefinisikan dalam field `locales`.
- **strictMode**:
  - _Tipe_: `string`
  - _Default_: `inclusive`
  - _Deskripsi_: Menjamin implementasi konten internasionalisasi yang kuat menggunakan typescript.
  - _Catatan_: Jika diatur ke "strict", fungsi terjemahan `t` akan mengharuskan setiap locale yang dideklarasikan untuk didefinisikan. Jika satu locale hilang, atau jika locale tidak dideklarasikan dalam konfigurasi Anda, maka akan menghasilkan error.
  - _Catatan_: Jika diatur ke "inclusive", fungsi terjemahan `t` akan mengharuskan setiap locale yang dideklarasikan untuk didefinisikan. Jika satu locale hilang, akan memberikan peringatan. Namun akan menerima jika locale tidak dideklarasikan dalam konfigurasi Anda, tetapi ada.
  - _Catatan_: Jika diatur ke "loose", fungsi terjemahan `t` akan menerima locale yang ada.

- **defaultLocale**:
  - _Tipe_: `string`
  - _Default_: `'en'`
  - _Deskripsi_: Locale default yang digunakan sebagai fallback jika locale yang diminta tidak ditemukan.
  - _Contoh_: `'en'`
  - _Catatan_: Ini digunakan untuk menentukan locale ketika tidak ada yang ditentukan dalam URL, cookie, atau header.

---

### Konfigurasi Editor

Mendefinisikan pengaturan terkait editor terintegrasi, termasuk port server dan status aktif.

#### Properti

- **applicationURL**:
  - _Tipe_: `string`
  - _Default_: `http://localhost:3000`
  - _Deskripsi_: URL aplikasi. Digunakan untuk membatasi asal editor demi alasan keamanan.
  - _Contoh_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Catatan_: URL aplikasi. Digunakan untuk membatasi asal editor demi alasan keamanan. Jika diatur ke `'*'`, editor dapat diakses dari asal mana pun.

- **port**:
  - _Tipe_: `number`
  - _Default_: `8000`
  - _Deskripsi_: Port yang digunakan oleh server editor visual.

- **editorURL**:
  - _Tipe_: `string`
  - _Default_: `'http://localhost:8000'`
  - _Deskripsi_: URL server editor. Digunakan untuk membatasi asal editor demi alasan keamanan.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Catatan_: URL server editor yang dapat diakses dari aplikasi. Digunakan untuk membatasi asal yang dapat berinteraksi dengan aplikasi demi alasan keamanan. Jika diatur ke `'*'`, editor dapat diakses dari asal mana pun. Harus diatur jika port diubah, atau jika editor dihosting di domain yang berbeda.

- **cmsURL**:
  - _Tipe_: `string`
  - _Default_: `'https://intlayer.org'`
  - _Deskripsi_: URL dari Intlayer CMS.
  - _Contoh_: `'https://intlayer.org'`
  - _Catatan_: URL dari Intlayer CMS.

- **backendURL**:
  - _Tipe_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Deskripsi_: URL dari server backend.
  - _Contoh_: `http://localhost:4000`

- **enabled**:
  - _Tipe_: `boolean`
  - _Default_: `true`
  - _Deskripsi_: Menunjukkan apakah aplikasi berinteraksi dengan visual editor.
  - _Contoh_: `process.env.NODE_ENV !== 'production'`
  - _Catatan_: Jika true, editor akan dapat berinteraksi dengan aplikasi. Jika false, editor tidak akan dapat berinteraksi dengan aplikasi. Dalam hal apa pun, editor hanya dapat diaktifkan oleh visual editor. Menonaktifkan editor untuk lingkungan tertentu adalah cara untuk menegakkan keamanan.

- **clientId**:
  - _Tipe_: `string` | `undefined`
  - _Default_: `undefined`
  - _Deskripsi_: clientId dan clientSecret memungkinkan paket intlayer untuk melakukan autentikasi dengan backend menggunakan autentikasi oAuth2. Token akses digunakan untuk mengautentikasi pengguna yang terkait dengan proyek. Untuk mendapatkan token akses, kunjungi https://intlayer.org/dashboard/project dan buat akun.
  - _Contoh_: `true`
  - _Catatan_: Penting: clientId dan clientSecret harus dijaga kerahasiaannya dan tidak dibagikan secara publik. Pastikan untuk menyimpannya di lokasi yang aman, seperti variabel lingkungan.

- **clientSecret**:
  - _Tipe_: `string` | `undefined`
  - _Default_: `undefined`
  - _Deskripsi_: clientId dan clientSecret memungkinkan paket intlayer untuk melakukan autentikasi dengan backend menggunakan autentikasi oAuth2. Token akses digunakan untuk mengautentikasi pengguna yang terkait dengan proyek. Untuk mendapatkan token akses, kunjungi https://intlayer.org/dashboard/project dan buat akun.
  - _Contoh_: `true`
  - _Catatan_: Penting: clientId dan clientSecret harus dijaga kerahasiaannya dan tidak dibagikan secara publik. Pastikan untuk menyimpannya di lokasi yang aman, seperti variabel lingkungan.

- **dictionaryPriorityStrategy**:
  - _Tipe_: `string`
  - _Default_: `'local_first'`
  - _Deskripsi_: Strategi untuk memprioritaskan kamus dalam kasus adanya kamus lokal dan jauh. Jika diatur ke `'distant_first'`, aplikasi akan memprioritaskan kamus jauh dibandingkan kamus lokal. Jika diatur ke `'local_first'`, aplikasi akan memprioritaskan kamus lokal dibandingkan kamus jauh.
  - _Contoh_: `'distant_first'`

- **liveSync**:
  - _Tipe_: `boolean`
  - _Default_: `false`
  - _Deskripsi_: Menunjukkan apakah server aplikasi harus melakukan hot reload konten aplikasi ketika perubahan terdeteksi pada CMS / Visual Editor / Backend.
  - _Contoh_: `true`
  - _Catatan_: Misalnya, ketika kamus baru ditambahkan atau diperbarui, aplikasi akan memperbarui konten yang ditampilkan di halaman.
  - _Catatan_: Live sync membutuhkan eksternalisasi konten aplikasi ke server lain. Itu berarti dapat sedikit memengaruhi performa aplikasi. Untuk membatasi hal ini, kami menyarankan untuk meng-host aplikasi dan server live sync pada mesin yang sama. Selain itu, kombinasi live sync dan `optimize` dapat menghasilkan sejumlah besar permintaan ke server live sync. Tergantung pada infrastruktur Anda, kami menyarankan untuk menguji kedua opsi dan kombinasi keduanya.

- **liveSyncPort**:
  - _Tipe_: `number`
  - _Default_: `4000`
  - _Deskripsi_: Port dari server live sync.
  - _Contoh_: `4000`
  - _Catatan_: Port dari server live sync.

- **liveSyncURL**:
  - _Tipe_: `string`
  - _Default_: `'http://localhost:{liveSyncPort}'`
  - _Deskripsi_: URL dari server live sync.
  - _Contoh_: `'https://example.com'`
  - _Catatan_: Mengarah ke localhost secara default tetapi dapat diubah ke URL mana pun dalam kasus server live sync jarak jauh.

### Konfigurasi Routing

Pengaturan yang mengontrol perilaku routing, termasuk struktur URL, penyimpanan locale, dan penanganan middleware.

#### Properti

- **mode**:
  - _Tipe_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Default_: `'prefix-no-default'`
  - _Deskripsi_: Mode routing URL untuk penanganan locale.
  - _Contoh_:
    - `'prefix-no-default'`: `/dashboard` (en) atau `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) atau `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (locale ditangani dengan cara lain)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Catatan_: Pengaturan ini tidak memengaruhi manajemen cookie atau penyimpanan locale.

- **storage**:
  - _Tipe_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Default_: `'localStorage'`
  - _Deskripsi_: Konfigurasi untuk menyimpan locale di sisi klien.

  - **cookie**:
    - _Deskripsi_: Menyimpan data dalam cookie, potongan kecil data yang disimpan di browser klien, dapat diakses di sisi klien dan server.
    - _Catatan_: Untuk penyimpanan yang sesuai dengan GDPR, pastikan persetujuan pengguna yang tepat sebelum penggunaan.
    - _Catatan_: Parameter cookie dapat disesuaikan jika diatur sebagai CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Deskripsi_: Menyimpan data di browser tanpa tanggal kedaluwarsa, memungkinkan data bertahan antar sesi, hanya dapat diakses di sisi klien.
    - _Catatan_: Ideal untuk menyimpan data jangka panjang tetapi perlu memperhatikan implikasi privasi dan keamanan karena sifatnya yang tidak kedaluwarsa kecuali secara eksplisit dihapus.
    - _Catatan_: Penyimpanan locale hanya dapat diakses di sisi klien, proxy intlayer tidak akan dapat mengaksesnya.
    - _Catatan_: Parameter penyimpanan locale dapat disesuaikan jika diatur sebagai StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Deskripsi_: Menyimpan data selama durasi sesi halaman, artinya data akan dihapus setelah tab atau jendela ditutup, hanya dapat diakses di sisi klien.
    - _Catatan_: Cocok untuk penyimpanan data sementara untuk setiap sesi.
    - _Catatan_: Penyimpanan locale hanya dapat diakses di sisi klien, proxy intlayer tidak akan dapat mengaksesnya.
    - _Catatan_: Parameter penyimpanan locale dapat disesuaikan jika diatur sebagai StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Deskripsi_: Memanfaatkan header HTTP untuk menyimpan atau mengirim data locale, cocok untuk penentuan bahasa di sisi server.
    - _Catatan_: Berguna dalam panggilan API untuk menjaga konsistensi pengaturan bahasa di seluruh permintaan.
    - _Catatan_: Header hanya dapat diakses di sisi server, sisi klien tidak akan dapat mengaksesnya.
    - _Catatan_: Nama header dapat disesuaikan jika diatur sebagai StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Tipe_: `string`
  - _Default_: `''`
  - _Deskripsi_: Jalur dasar untuk URL aplikasi.
  - _Contoh_: `'/my-app'`
  - _Catatan_:
    - Jika aplikasi dihosting di `https://example.com/my-app`
    - Jalur dasar adalah `'/my-app'`
    - URL akan menjadi `https://example.com/my-app/en`
    - Jika jalur dasar tidak diatur, URL akan menjadi `https://example.com/en`

#### Atribut Cookie

Saat menggunakan penyimpanan cookie, Anda dapat mengonfigurasi atribut cookie tambahan:

- **name**: Nama cookie (default: `'INTLAYER_LOCALE'`)
- **domain**: Domain cookie (default: tidak ditentukan)
- **path**: Jalur cookie (default: tidak ditentukan)
- **secure**: Memerlukan HTTPS (default: tidak ditentukan)
- **httpOnly**: Flag hanya HTTP (default: tidak ditentukan)
- **sameSite**: Kebijakan SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Tanggal kedaluwarsa atau jumlah hari (default: undefined)

#### Atribut Penyimpanan Locale

Saat menggunakan localStorage atau sessionStorage:

- **type**: Tipe penyimpanan (`'localStorage' | 'sessionStorage'`)
- **name**: Nama kunci penyimpanan (default: `'INTLAYER_LOCALE'`)

#### Contoh Konfigurasi

Berikut beberapa contoh konfigurasi umum untuk struktur routing v7 yang baru:

**Konfigurasi Dasar (Default)**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Konfigurasi Sesuai GDPR**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Mode Parameter Pencarian**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Mode Tanpa Prefix dengan Penyimpanan Kustom**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-custom-locale",
    basePath: "/my-app",
  },
});
```

---

### Konfigurasi Konten

Pengaturan terkait penanganan konten dalam aplikasi, termasuk nama direktori, ekstensi file, dan konfigurasi turunan.

#### Properti

- **watch**:
  - _Tipe_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'development'`
  - _Deskripsi_: Menunjukkan apakah Intlayer harus memantau perubahan pada file deklarasi konten dalam aplikasi untuk membangun kembali kamus terkait.

- **fileExtensions**:
  - _Tipe_: `string[]`
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Deskripsi_: Ekstensi file yang dicari saat membangun kamus.
  - _Contoh_: `['.data.ts', '.data.js', '.data.json']`
  - _Catatan_: Menyesuaikan ekstensi file dapat membantu menghindari konflik.

- **baseDir**:
  - _Tipe_: `string`
  - _Default_: `process.cwd()`
  - _Deskripsi_: Direktori dasar untuk proyek.
  - _Contoh_: `'/path/to/project'`
  - _Catatan_: Ini digunakan untuk menyelesaikan semua direktori terkait Intlayer.

- **contentDir**:
  - _Tipe_: `string[]`
  - _Default_: `['.']`
  - _Contoh_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Deskripsi_: Jalur direktori tempat konten disimpan.

- **dictionariesDir**:
  - _Tipe_: `string`
  - _Default_: `'.intlayer/dictionaries'`
  - _Deskripsi_: Jalur direktori untuk menyimpan hasil sementara atau output.

- **moduleAugmentationDir**:
  - _Tipe_: `string`
  - _Default_: `'.intlayer/types'`
  - _Deskripsi_: Direktori untuk augmentasi modul, memungkinkan saran IDE yang lebih baik dan pengecekan tipe.
  - _Contoh_: `'intlayer-types'`
  - _Catatan_: Pastikan untuk memasukkan ini dalam `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Tipe_: `string`
  - _Default_: `'.intlayer/unmerged_dictionary'`
  - _Deskripsi_: Direktori untuk menyimpan kamus yang belum digabungkan.
  - _Contoh_: `'translations'`

- **dictionariesDir**:
  - _Tipe_: `string`
  - _Default_: `'.intlayer/dictionary'`
  - _Deskripsi_: Direktori untuk menyimpan kamus lokal.
  - _Contoh_: `'translations'`

- **typesDir**:
  - _Tipe_: `string`
  - _Default_: `'types'`
  - _Deskripsi_: Direktori untuk menyimpan tipe kamus.
  - _Contoh_: `'intlayer-types'`

- **mainDir**:
  - _Tipe_: `string`
  - _Default_: `'main'`
  - _Deskripsi_: Direktori tempat file aplikasi utama disimpan.
  - _Contoh_: `'intlayer-main'`

- **excludedPath**:
  - _Tipe_: `string[]`
  - _Default_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Deskripsi_: Direktori yang dikecualikan dari pencarian konten.
  - _Catatan_: Pengaturan ini belum digunakan, tetapi direncanakan untuk implementasi di masa depan.

- **formatCommand**:
  - _Tipe_: `string`
  - _Default_: `undefined`
  - _Deskripsi_: Perintah untuk memformat konten. Ketika intlayer menulis file .content Anda secara lokal, perintah ini akan digunakan untuk memformat konten.
  - _Contoh_: `'npx prettier --write "{{file}}" --log-level silent'` Menggunakan Prettier
  - _Contoh_: `'npx biome format "{{file}}" --write --log-level none'` Menggunakan Biome
  - _Contoh_: `'npx eslint --fix "{{file}}"  --quiet'` Menggunakan ESLint
  - _Catatan_: Intlayer akan menggantikan {{file}} dengan path file yang akan diformat.
  - _Catatan_: Jika tidak diatur, Intlayer akan mencoba mendeteksi perintah format secara otomatis dengan mencoba menyelesaikan perintah berikut: prettier, biome, eslint.

### Konfigurasi Kamus

Pengaturan yang mengontrol operasi kamus, termasuk perilaku pengisian otomatis dan pembuatan konten.

Konfigurasi kamus ini memiliki dua tujuan utama:

1. **Nilai Default**: Mendefinisikan nilai default saat membuat file deklarasi konten
2. **Perilaku Cadangan**: Memberikan nilai cadangan ketika bidang tertentu tidak didefinisikan, memungkinkan Anda untuk menentukan perilaku operasi kamus secara global

Untuk informasi lebih lanjut tentang file deklarasi konten dan bagaimana nilai konfigurasi diterapkan, lihat [Dokumentasi File Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

#### Properti

- **fill**
- **description**
- **locale**
- **priority**
- **live**
- **title**
- **tags**
- **version**

---

### Konfigurasi Logger

Pengaturan yang mengontrol logger, termasuk prefix yang digunakan.

#### Properti

- **mode**:
  - _Tipe_: `string`
  - _Default_: `default`
  - _Deskripsi_: Menunjukkan mode dari logger.
  - _Opsi_: `default`, `verbose`, `disabled`
  - _Contoh_: `default`
  - _Catatan_: Mode dari logger. Mode verbose akan mencatat lebih banyak informasi, tetapi dapat digunakan untuk tujuan debugging. Mode disabled akan menonaktifkan logger.

- **prefix**:
  - _Tipe_: `string`
  - _Default_: `'[intlayer] '`
  - _Deskripsi_: Prefix dari logger.
  - _Contoh_: `'[my custom prefix] '`
  - _Catatan_: Prefix dari logger.

### Konfigurasi AI

Pengaturan yang mengontrol fitur AI dari Intlayer, termasuk provider, model, dan API key.

Konfigurasi ini bersifat opsional jika Anda terdaftar di [Intlayer Dashboard](https://intlayer.org/dashboard/project) menggunakan access key. Intlayer akan secara otomatis mengelola solusi AI yang paling efisien dan hemat biaya untuk kebutuhan Anda. Menggunakan opsi default memastikan pemeliharaan jangka panjang yang lebih baik karena Intlayer terus diperbarui untuk menggunakan model yang paling relevan.

Jika Anda lebih memilih menggunakan API key sendiri atau model tertentu, Anda dapat mendefinisikan konfigurasi AI kustom Anda.
Konfigurasi AI ini akan digunakan secara global di seluruh lingkungan Intlayer Anda. Perintah CLI akan menggunakan pengaturan ini sebagai default untuk perintah (misalnya `fill`), serta SDK, Visual Editor, dan CMS. Anda dapat menimpa nilai default ini untuk kasus penggunaan tertentu dengan menggunakan parameter perintah.

Intlayer mendukung beberapa provider AI untuk fleksibilitas dan pilihan yang lebih baik. Provider yang saat ini didukung adalah:

- **OpenAI** (default)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Properti

- **provider**:
  - _Tipe_: `string`
  - _Default_: `'openai'`
  - _Deskripsi_: Provider yang digunakan untuk fitur AI dari Intlayer.
  - _Opsi_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Contoh_: `'anthropic'`
  - _Catatan_: Penyedia yang berbeda mungkin memerlukan kunci API yang berbeda dan memiliki model harga yang berbeda.

- **model**:
  - _Tipe_: `string`
  - _Default_: Tidak ada
  - _Deskripsi_: Model yang digunakan untuk fitur AI di Intlayer.
  - _Contoh_: `'gpt-4o-2024-11-20'`
  - _Catatan_: Model spesifik yang digunakan bervariasi tergantung penyedia.

- **temperature**:
  - _Tipe_: `number`
  - _Default_: Tidak ada
  - _Deskripsi_: Temperature mengontrol tingkat keacakan respons AI.
  - _Contoh_: `0.1`
  - _Catatan_: Temperature yang lebih tinggi akan membuat AI lebih kreatif dan kurang dapat diprediksi.

- **apiKey**:
  - _Tipe_: `string`
  - _Default_: Tidak ada
  - _Deskripsi_: Kunci API Anda untuk penyedia yang dipilih.
  - _Contoh_: `process.env.OPENAI_API_KEY`
  - _Catatan_: Penting: Kunci API harus dijaga kerahasiaannya dan tidak dibagikan secara publik. Pastikan untuk menyimpannya di lokasi yang aman, seperti variabel lingkungan.

- **applicationContext**:
  - _Tipe_: `string`
  - _Default_: Tidak ada
  - _Deskripsi_: Memberikan konteks tambahan tentang aplikasi Anda kepada model AI, membantu menghasilkan terjemahan yang lebih akurat dan sesuai konteks. Ini dapat mencakup informasi tentang domain aplikasi Anda, audiens target, nada, atau terminologi khusus.

### Konfigurasi Build

Pengaturan yang mengontrol bagaimana Intlayer mengoptimalkan dan membangun internasionalisasi aplikasi Anda.

Opsi build berlaku untuk plugin `@intlayer/babel` dan `@intlayer/swc`.

> Dalam mode pengembangan, Intlayer menggunakan impor statis untuk kamus agar pengalaman pengembangan menjadi lebih sederhana.

> Saat dioptimalkan, Intlayer akan mengganti panggilan kamus untuk mengoptimalkan chunking, sehingga bundel akhir hanya mengimpor kamus yang benar-benar digunakan.

#### Properti

- **mode**:
  - _Tipe_: `'auto' | 'manual'`
  - _Default_: `'auto'`
  - _Deskripsi_: Mengontrol mode build.
  - _Contoh_: `'manual'`
  - _Catatan_: Jika 'auto', build akan diaktifkan secara otomatis saat aplikasi dibangun.
  - _Catatan_: Jika 'manual', build akan disetel hanya ketika perintah build dieksekusi.
  - _Catatan_: Dapat digunakan untuk menonaktifkan build kamus, misalnya ketika eksekusi di lingkungan Node.js harus dihindari.

- **optimize**:
  - _Tipe_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'production'`
  - _Deskripsi_: Mengontrol apakah build harus dioptimalkan.
  - _Contoh_: `true`
  - _Catatan_: Saat diaktifkan, Intlayer akan mengganti semua panggilan kamus untuk mengoptimalkan chunking. Dengan begitu, bundel akhir hanya akan mengimpor kamus yang digunakan. Semua impor akan tetap sebagai impor statis untuk menghindari pemrosesan async saat memuat kamus.
  - _Catatan_: Intlayer akan mengganti semua panggilan `useIntlayer` dengan mode yang ditentukan oleh opsi `importMode` dan `getIntlayer` dengan `getDictionary`.
  - _Catatan_: Opsi ini bergantung pada plugin `@intlayer/babel` dan `@intlayer/swc`.
  - _Catatan_: Pastikan semua kunci dideklarasikan secara statis dalam panggilan `useIntlayer`. Contoh: `useIntlayer('navbar')`.

- **importMode**:
  - _Tipe_: `'static' | 'dynamic' | 'live'`
  - _Default_: `'static'`
  - _Deskripsi_: Mengontrol bagaimana kamus diimpor.
  - _Contoh_: `'dynamic'`
  - _Catatan_: Mode yang tersedia:
    - "static": Kamus diimpor secara statis. Mengganti `useIntlayer` dengan `useDictionary`.
    - "dynamic": Kamus diimpor secara dinamis menggunakan Suspense. Mengganti `useIntlayer` dengan `useDictionaryDynamic`.
    - "live": Kamus diambil secara dinamis menggunakan live sync API. Mengganti `useIntlayer` dengan `useDictionaryDynamic`.
  - _Catatan_: Impor dinamis bergantung pada Suspense dan mungkin sedikit memengaruhi performa rendering.
  - _Catatan_: Jika dinonaktifkan, semua locale akan dimuat sekaligus, meskipun tidak digunakan.
  - _Catatan_: Opsi ini bergantung pada plugin `@intlayer/babel` dan `@intlayer/swc`.
  - _Catatan_: Pastikan semua kunci dideklarasikan secara statis dalam panggilan `useIntlayer`. Contoh: `useIntlayer('navbar')`.
  - _Catatan_: Opsi ini akan diabaikan jika `optimize` dinonaktifkan.
  - _Catatan_: Jika diatur ke "live", hanya kamus yang menyertakan konten jarak jauh, dan diatur sebagai flag "live" yang akan diubah menjadi mode live. Yang lainnya akan diimpor secara dinamis sebagai mode "dynamic" untuk mengoptimalkan jumlah kueri pengambilan, dan kinerja pemuatan.
  - _Catatan_: Mode live akan menggunakan API sinkronisasi live untuk mengambil kamus. Jika panggilan API gagal, kamus akan diimpor secara dinamis sebagai mode "dynamic".
  - _Catatan_: Opsi ini tidak akan memengaruhi fungsi `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` dan `useDictionaryDynamic`.
- **outputFormat**:
  - _Tipe_: `'esm' | 'cjs'`
  - _Default_: `'esm'`
  - _Deskripsi_: Mengontrol format output dari kamus.
  - _Contoh_: `'cjs'`
  - _Catatan_: Format output dari kamus.

- **traversePattern**:
  - _Tipe_: `string[]`
  - _Default_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Deskripsi_: Pola yang menentukan file mana yang harus dilalui selama optimasi.
    - _Contoh_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Catatan_: Gunakan ini untuk membatasi optimasi hanya pada file kode yang relevan dan meningkatkan performa build.
  - _Catatan_: Opsi ini akan diabaikan jika `optimize` dinonaktifkan.
  - _Catatan_: Gunakan pola glob.
