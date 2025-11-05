---
createdAt: 2024-08-11
updatedAt: 2025-01-27
title: CLI
description: Temukan cara menggunakan Intlayer CLI untuk mengelola situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi daring ini untuk mengatur proyek Anda dalam beberapa menit.
keywords:
  - CLI
  - Command Line Interface
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 6.1.4
    date: 2025-01-27
    changes: Menambahkan alias untuk argumen dan perintah CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Menambahkan opsi build ke perintah
  - version: 6.1.2
    date: 2025-09-26
    changes: Menambahkan perintah version
  - version: 6.1.0
    date: 2025-09-26
    changes: Mengatur opsi verbose menjadi default true menggunakan CLI
  - version: 6.1.0
  date: 2025-09-23
  changes: Menambahkan perintah watch dan opsi with
- version: 6.0.1
  date: 2025-09-23
  changes: Menambahkan perintah editor
- version: 6.0.0
  date: 2025-09-17
  changes: Menambahkan perintah content test dan list
- version: 5.5.11
  date: 2025-07-11
  changes: Memperbarui dokumentasi parameter perintah CLI
- version: 5.5.10
  date: 2025-06-29
  changes: Inisialisasi riwayat
---

# Intlayer CLI

---

## Daftar Isi

<TOC/>

---

## Instal Paket

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Jika paket `intlayer` sudah terpasang, CLI akan terpasang secara otomatis. Anda dapat melewati langkah ini.

## Paket intlayer-cli

Paket `intlayer-cli` bertujuan untuk mentranspilasi [deklarasi intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md) Anda menjadi kamus.

Paket ini akan mentranspilasi semua file intlayer, seperti `src/**/*.content.{ts|js|mjs|cjs|json}`. [Lihat cara mendeklarasikan file deklarasi Intlayer Anda](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Untuk menginterpretasikan kamus intlayer, Anda dapat menggunakan interpreter, seperti [react-intlayer](https://www.npmjs.com/package/react-intlayer), atau [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Dukungan File Konfigurasi

Intlayer menerima berbagai format file konfigurasi:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Untuk melihat cara mengonfigurasi locale yang tersedia, atau parameter lainnya, lihat [dokumentasi konfigurasi di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

## Menjalankan perintah intlayer

### Cek versi CLI

```bash
npx intlayer --version
npx intlayer version
```

Kedua perintah tersebut akan menampilkan versi Intlayer CLI yang terpasang.

### Membangun kamus

Untuk membangun kamus Anda, Anda dapat menjalankan perintah:

```bash
npx intlayer build
```

atau dalam mode pengawasan (watch mode)

```bash
npx intlayer build --watch
```

Perintah ini akan mencari file deklarasi konten Anda secara default di `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Dan membangun kamus di direktori `.intlayer`.

##### Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

##### Argumen:

- **`--base-dir`**: Menentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer build --base-dir ./src`

- **`--env`**: Menentukan lingkungan (misalnya, `development`, `production`). Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer Anda.

  > Contoh: `npx intlayer build --env production`

- **`--env-file`**: Menyediakan file environment kustom untuk memuat variabel. Berguna jika Anda menggunakan variabel environment dalam file konfigurasi intlayer Anda.

  > Contoh: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Menjalankan perintah secara paralel dengan proses build.

  > Contoh: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Melewati langkah prepare.

  > Contoh: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Menonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

### Watch dictionaries

```bash
npx intlayer watch
```

Perintah ini akan memantau perubahan pada file deklarasi konten Anda dan membangun kamus di direktori `.intlayer`.
Perintah ini setara dengan `npx intlayer build --watch --skip-prepare`.

##### Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

##### Argumen:

- **`--with`**: Menjalankan perintah secara paralel dengan watch.

  > Contoh: `npx intlayer watch --with "next dev --turbopack"`

### Push dictionaries

```bash
npx intlayer dictionary push
```

Jika [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) terpasang, Anda juga dapat mendorong kamus ke editor. Perintah ini akan memungkinkan kamus tersedia di [editor](https://intlayer.org/dashboard). Dengan cara ini, Anda dapat membagikan kamus Anda dengan tim dan mengedit konten tanpa mengubah kode aplikasi Anda.

##### Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumen:

**Opsi Kamus:**

- **`-d`, `--dictionaries`**: id kamus yang akan ditarik. Jika tidak ditentukan, semua kamus akan didorong.

  > Contoh: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: id kamus yang akan ditarik (alias untuk --dictionaries).

  > Contoh: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`). Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer.
- **`--env-file`**: Sediakan file environment kustom untuk memuat variabel dari file tersebut. Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer Anda.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

  > Contoh: `npx intlayer dictionary push --env production`

**Opsi output:**

- **`-r`, `--delete-locale-dictionary`**: Lewati pertanyaan yang menanyakan apakah akan menghapus direktori lokal setelah kamus didorong, dan hapus direktori tersebut. Secara default, jika kamus didefinisikan secara lokal, itu akan menimpa konten kamus yang ada di jarak jauh.

  > Contoh: `npx intlayer dictionary push -r`

  > Contoh: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Lewati pertanyaan yang menanyakan apakah akan menghapus direktori lokal setelah kamus didorong, dan simpan direktori tersebut. Secara default, jika kamus didefinisikan secara lokal, itu akan menimpa konten kamus yang ada di jarak jauh.

  > Contoh: `npx intlayer dictionary push -k`

  > Contoh: `npx intlayer dictionary push --keep-locale-dictionary`

**Opsi persiapan:**

- **`--build`**: Bangun kamus sebelum mendorong untuk memastikan konten terbaru. True akan memaksa pembangunan, false akan melewati pembangunan, undefined akan memungkinkan menggunakan cache dari pembangunan.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada kamus yang mencakup perubahan dari basis (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Tentukan referensi basis untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Tentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum didorong.
- **`--untracked`**: Sertakan file yang tidak terlacak.

  > Contoh: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Tarik kamus jarak jauh

```bash
npx intlayer pull
```

Jika [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) terpasang, Anda juga dapat menarik kamus dari editor. Dengan cara ini, Anda dapat menimpa konten kamus Anda sesuai kebutuhan aplikasi Anda.

##### Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumen:

**Opsi Kamus:**

- **`-d, --dictionaries`**: Id kamus yang akan ditarik. Jika tidak ditentukan, semua kamus akan ditarik.

  > Contoh: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Id kamus yang akan ditarik (alias dari --dictionaries).

  > Contoh: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opsi Konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file`**: Berikan file lingkungan khusus untuk memuat variabel dari file tersebut.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

  > Contoh: `npx intlayer dictionary push --env production`

**Opsi output:**

- **`--new-dictionaries-path`**: Jalur ke direktori tempat kamus baru akan disimpan. Jika tidak ditentukan, kamus baru akan disimpan di direktori `./intlayer-dictionaries` dalam proyek. Jika ada field `filePath` yang ditentukan dalam konten kamus Anda, kamus tidak akan mempertimbangkan argumen ini dan akan disimpan di direktori `filePath` yang ditentukan.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

##### Contoh:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Isi / audit / terjemahkan kamus

```bash
npx intlayer fill
```

Perintah ini menganalisis file deklarasi konten Anda untuk masalah potensial seperti terjemahan yang hilang, inkonsistensi struktural, atau ketidaksesuaian tipe. Jika ditemukan masalah, **intlayer fill** akan mengusulkan atau menerapkan pembaruan untuk menjaga kamus Anda tetap konsisten dan lengkap.

##### Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumen:

**Opsi daftar file:**

- **`-f, --file [files...]`**: Daftar file deklarasi konten spesifik yang akan diaudit. Jika tidak diberikan, semua file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` yang ditemukan berdasarkan pengaturan file konfigurasi Anda akan diaudit.

  > Contoh: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Memfilter kamus berdasarkan kunci. Jika tidak diberikan, semua kamus akan diaudit.

  > Contoh: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Memfilter kamus berdasarkan kunci (alias dari --keys).

  > Contoh: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Memfilter kamus dengan mengecualikan berdasarkan kunci. Jika tidak diberikan, semua kamus akan diaudit.

  > Contoh: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Memfilter kamus berdasarkan kunci (alias dari --excluded-keys).

  > Contoh: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Memfilter kamus berdasarkan pola glob untuk jalur file.

  > Contoh: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opsi output entri:**

- **`--source-locale [sourceLocale]`**: Locale sumber untuk diterjemahkan. Jika tidak ditentukan, locale default dari konfigurasi Anda akan digunakan.

- **`--output-locales [outputLocales...]`**: Locale target untuk diterjemahkan. Jika tidak ditentukan, semua locale dari konfigurasi Anda akan digunakan kecuali locale sumber.

- **`--mode [mode]`**: Mode terjemahan: `complete`, `review`. Default adalah `complete`. `complete` akan mengisi semua konten yang hilang, `review` akan mengisi konten yang hilang dan meninjau kunci yang sudah ada.

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada kamus yang mencakup perubahan dari basis (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Tentukan referensi basis untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Tentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum dipush.
- **`--untracked`**: Sertakan file yang belum terlacak.

  > Contoh: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opsi AI:**

- **`--model [model]`**: Model AI yang digunakan untuk terjemahan (misalnya, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Penyedia AI yang digunakan untuk terjemahan.
- **`--temperature [temperature]`**: Pengaturan temperature untuk model AI.
- **`--api-key [apiKey]`**: Berikan API key Anda sendiri untuk layanan AI.
- **`--custom-prompt [prompt]`**: Berikan prompt kustom untuk instruksi terjemahan Anda.
- **`--application-context [applicationContext]`**: Berikan konteks tambahan untuk terjemahan AI.

  > Contoh: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Aplikasi saya adalah toko kucing"`

  **Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file lingkungan kustom untuk memuat variabel dari file tersebut.

  > Contoh: `npx intlayer fill --env-file .env.production.local`

  > Contoh: `npx intlayer fill --env production`

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek.

  > Contoh: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi persiapan:**

- **`--build`**: Bangun kamus sebelum melakukan push untuk memastikan konten terbaru. True akan memaksa build, false akan melewati build, undefined akan mengizinkan penggunaan cache dari build.

- **`--skip-metadata`**: Lewati pengisian metadata yang hilang (deskripsi, judul, tag) untuk kamus.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

##### Contoh:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Perintah ini akan menerjemahkan konten dari bahasa Inggris ke bahasa Perancis dan Spanyol untuk semua file deklarasi konten di direktori `src/home/` menggunakan model GPT-3.5 Turbo.

### Uji terjemahan yang hilang

```bash
npx intlayer content test
```

##### Alias:

- `npx intlayer test`

Perintah ini menganalisis file deklarasi konten Anda untuk mengidentifikasi terjemahan yang hilang di semua locale yang dikonfigurasi. Ini memberikan laporan komprehensif yang menunjukkan kunci terjemahan mana yang hilang untuk locale mana, membantu Anda menjaga konsistensi di seluruh konten multibahasa Anda.

##### Contoh output:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Terjemahan yang dibutuhkan hilang: -
Total locale yang hilang: 3
Total locale yang dibutuhkan hilang: 0
```

##### Argumen:

**Opsi konfigurasi:**

- **`--env`**: Tentukan environment (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file environment kustom untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.

  > Contoh: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi persiapan:**

- **`--build`**: Bangun kamus sebelum melakukan push untuk memastikan konten terbaru. True akan memaksa build, false akan melewati build, undefined akan mengizinkan menggunakan cache dari build.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

  > Contoh: `npx intlayer content test --verbose`

##### Contoh:

```bash
npx intlayer content test --verbose
```

##### Contoh output:

```bash
npx intlayer content list
File deklarasi konten:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total file deklarasi konten: 3
```

Perintah ini akan memindai semua file deklarasi konten Anda dan menampilkan:

- Daftar rinci terjemahan yang hilang beserta kunci, locale yang hilang, dan jalur file
- Statistik ringkasan termasuk total locale yang hilang dan locale wajib yang hilang
- Output berwarna untuk memudahkan identifikasi masalah

Output ini membantu Anda dengan cepat mengidentifikasi terjemahan mana yang perlu diselesaikan agar aplikasi Anda berfungsi dengan baik di semua locale yang dikonfigurasi.

### Daftar file deklarasi konten

```bash
npx intlayer content list
```

##### Alias:

- `npx intlayer list`

Perintah ini menampilkan semua file deklarasi konten dalam proyek Anda, menunjukkan kunci kamus dan jalur file mereka. Ini berguna untuk mendapatkan gambaran semua file konten Anda dan memverifikasi bahwa mereka terdeteksi dengan benar oleh Intlayer.

##### Contoh:

```bash
npx intlayer content list
```

Perintah ini akan menampilkan:

- Daftar terformat dari semua file deklarasi konten dengan kunci dan jalur file relatif mereka
- Total jumlah file deklarasi konten yang ditemukan

Output ini membantu Anda memverifikasi bahwa semua file konten Anda telah dikonfigurasi dengan benar dan dapat ditemukan oleh sistem Intlayer.

### Kelola Konfigurasi

#### Dapatkan Konfigurasi

Perintah `configuration get` mengambil konfigurasi saat ini untuk Intlayer, terutama pengaturan locale. Ini berguna untuk memverifikasi pengaturan Anda.

```bash
npx intlayer configuration get
```

##### Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumen:

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file`**: Berikan file lingkungan khusus untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true menggunakan CLI)
- **`--no-cache`**: Nonaktifkan cache.

#### Push Konfigurasi

Perintah `configuration push` mengunggah konfigurasi Anda ke Intlayer CMS dan editor. Langkah ini diperlukan untuk mengaktifkan penggunaan kamus jarak jauh di Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

##### Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argumen:

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file`**: Berikan file lingkungan khusus untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true menggunakan CLI)
- **`--no-cache`**: Nonaktifkan cache.

Dengan mendorong konfigurasi, proyek Anda sepenuhnya terintegrasi dengan Intlayer CMS, memungkinkan manajemen kamus yang mulus di seluruh tim.

### Manajemen Dokumen

Perintah `doc` menyediakan alat untuk mengelola dan menerjemahkan file dokumentasi di berbagai locale.

#### Terjemahkan Dokumen

Perintah `doc translate` secara otomatis menerjemahkan file dokumentasi dari locale dasar ke locale target menggunakan layanan terjemahan AI.

```bash
npx intlayer doc translate
```

##### Argumen:

**Opsi daftar file:**

- **`--doc-pattern [docPattern...]`**: Pola glob untuk mencocokkan file dokumentasi yang akan diterjemahkan.

  > Contoh: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pola glob untuk mengecualikan file dari terjemahan.

  > Contoh: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Lewati file jika telah dimodifikasi sebelum waktu yang diberikan.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Lewati file jika telah dimodifikasi dalam waktu yang diberikan.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Opsi keluaran entri:**

- **`--locales [locales...]`**: Lokalisasi target untuk menerjemahkan dokumentasi.

  > Contoh: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Lokalisasi sumber untuk menerjemahkan dari.

  > Contoh: `npx intlayer doc translate --base-locale en`

**Opsi pemrosesan file:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Jumlah file yang diproses secara bersamaan untuk terjemahan.

  > Contoh: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opsi AI:**

- **`--model [model]`**: Model AI yang digunakan untuk terjemahan (misalnya, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Penyedia AI yang digunakan untuk terjemahan.
- **`--temperature [temperature]`**: Pengaturan temperature untuk model AI.
- **`--api-key [apiKey]`**: Berikan API key Anda sendiri untuk layanan AI.
- **`--application-context [applicationContext]`**: Berikan konteks tambahan untuk terjemahan AI.
- **`--custom-prompt [prompt]`**: Sesuaikan prompt dasar yang digunakan untuk terjemahan. (Catatan: Untuk sebagian besar kasus penggunaan, opsi `--custom-instructions` lebih disarankan karena memberikan kontrol yang lebih baik atas perilaku terjemahan.)

  > Contoh: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Aplikasi saya adalah toko kucing"`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file lingkungan khusus untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

  > Contoh: `npx intlayer doc translate --verbose`

**Opsi instruksi khusus:**

- **`--custom-instructions [customInstructions]`**: Instruksi khusus yang ditambahkan ke prompt. Berguna untuk menerapkan aturan spesifik terkait format, terjemahan URL, dll.
  - Bisa berupa waktu absolut seperti "2025-12-05" (string atau Date)
  - Bisa berupa waktu relatif dalam ms `1 * 60 * 60 * 1000` (1 jam)
  - Opsi ini memeriksa waktu pembaruan file menggunakan metode `fs.stat`. Jadi bisa terpengaruh oleh Git atau alat lain yang memodifikasi file.

  > Contoh: `npx intlayer doc translate --custom-instructions "Hindari menerjemahkan url, dan pertahankan format markdown"`

  > Contoh: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada kamus yang mencakup perubahan dari base (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Tentukan referensi base untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Tentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum dipush.
- **`--untracked`**: Sertakan file yang belum terlacak.

  > Contoh: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Perlu diperhatikan bahwa jalur file output akan ditentukan dengan mengganti pola-pola berikut
>
> - `/{{baseLocale}}/` menjadi `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` menjadi `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` menjadi `_{{locale}}.`
> - `{{baseLocale}}_` menjadi `{{locale}}_`
> - `.{{baseLocaleName}}.` menjadi `.{{localeName}}.`
>
> Jika pola tidak ditemukan, file output akan menambahkan `.{{locale}}` pada ekstensi file. Misalnya `./my/file.md` akan diterjemahkan menjadi `./my/file.fr.md` untuk locale Prancis.

#### Review Dokumen

Perintah `doc review` menganalisis file dokumentasi untuk kualitas, konsistensi, dan kelengkapan di berbagai locale.

```bash
npx intlayer doc review
```

Dapat digunakan untuk meninjau file yang sudah diterjemahkan, dan untuk memeriksa apakah terjemahannya sudah benar.

Untuk sebagian besar kasus penggunaan,

- lebih baik menggunakan `doc translate` ketika versi terjemahan dari file ini belum tersedia.
- lebih baik menggunakan `doc review` ketika versi terjemahan dari file ini sudah ada.

> Perlu diperhatikan bahwa proses review menggunakan lebih banyak token input dibandingkan proses translate untuk meninjau file yang sama secara keseluruhan. Namun, proses review akan mengoptimalkan chunk yang ditinjau, dan akan melewati bagian yang tidak berubah.

##### Argumen:

Perintah `doc review` menerima argumen yang sama dengan `doc translate`, memungkinkan Anda untuk meninjau file dokumentasi tertentu dan menerapkan pemeriksaan kualitas.

Jika Anda mengaktifkan salah satu opsi git, perintah hanya akan meninjau bagian dari file yang mengalami perubahan. Skrip akan memproses dengan membagi file menjadi beberapa bagian dan meninjau setiap bagian. Jika tidak ada perubahan pada bagian tersebut, skrip akan melewatinya untuk mempercepat proses peninjauan dan membatasi biaya API Penyedia AI.

## Gunakan perintah intlayer di `package.json` Anda

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Catatan**: Anda juga dapat menggunakan alias yang lebih singkat:
>
> - `npx intlayer list` sebagai pengganti `npx intlayer content list`
> - `npx intlayer test` sebagai pengganti `npx intlayer content test`

### Perintah Editor

Perintah `editor` membungkus ulang perintah `intlayer-editor`.

> Untuk dapat menggunakan perintah `editor`, paket `intlayer-editor` harus diinstal. (Lihat [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```

### Perintah Live Sync

Live Sync memungkinkan aplikasi Anda mencerminkan perubahan konten CMS secara runtime. Tidak perlu membangun ulang atau melakukan deploy ulang. Saat diaktifkan, pembaruan akan dialirkan ke server Live Sync yang menyegarkan kamus yang dibaca oleh aplikasi Anda. Lihat [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk detail lebih lanjut.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

##### Argumen:

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

---

## CLI SDK

CLI SDK adalah sebuah library yang memungkinkan Anda menggunakan Intlayer CLI dalam kode Anda sendiri.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Contoh penggunaan:

```ts
import {
  push,
  pull,
  fill,
  build,
  listContentDeclaration,
  testMissingTranslations,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
listContentDeclaration();
// ...
testMissingTranslations();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Debug perintah intlayer

### 1. **Pastikan Anda menggunakan versi terbaru**

Jalankan:

```bash
npx intlayer --version                  # versi intlayer lokal saat ini
npx intlayer@latest --version           # versi intlayer terbaru saat ini
```

### 2. **Periksa apakah perintah sudah terdaftar**

Anda dapat memeriksa dengan:

```bash
npx intlayer --help                     # Menampilkan daftar perintah yang tersedia dan informasi penggunaan
npx intlayer dictionary build --help    # Menampilkan daftar opsi yang tersedia untuk sebuah perintah
```

### 3. **Restart terminal Anda**

Kadang-kadang perlu restart terminal agar perintah baru dikenali.

### 4. **Bersihkan cache npx (jika Anda terjebak dengan versi lama)**

```bash
npx clear-npx-cache
```
