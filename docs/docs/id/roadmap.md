---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Roadmap
description: Temukan roadmap Intlayer. Lihat semua fitur yang telah diimplementasikan Intlayer, dan yang direncanakan untuk diimplementasikan.
keywords:
  - Roadmap
  - Intlayer
  - Internasionalisasi
  - CMS
  - Sistem Manajemen Konten
  - Editor Visual
slugs:
  - doc
  - roadmap
history:
  - version: 5.5.10
    date: 2025-06-30
    changes: Menambahkan dukungan Preact dan Nuxt, Server MCP, memperbarui CLI
  - version: 5.5.11
    date: 2025-06-29
    changes: Menambahkan perintah `docs`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Intlayer: Ikhtisar Fitur & Roadmap

Intlayer adalah solusi manajemen konten dan internasionalisasi yang dirancang untuk mempermudah cara Anda mendeklarasikan, mengelola, dan memperbarui konten di seluruh aplikasi Anda. Solusi ini menawarkan fitur-fitur kuat seperti deklarasi konten terpusat atau terdistribusi, opsi internasionalisasi yang luas, dukungan Markdown, rendering kondisional, integrasi TypeScript/JavaScript/JSON, dan banyak lagi. Berikut adalah gambaran menyeluruh tentang apa yang saat ini disediakan oleh Intlayer, diikuti dengan fitur-fitur roadmap yang akan datang.

---

## Daftar Isi

<TOC/>

---

## Fitur Saat Ini

### 1. Deklarasi Konten

#### Terpusat atau Terdistribusi

- **Terpusat**: Deklarasikan semua konten Anda dalam satu file besar di dasar aplikasi Anda, mirip dengan i18next, sehingga Anda dapat mengelola semuanya di satu tempat.
- **Terdistribusi**: Sebagai alternatif, pisahkan konten Anda ke dalam file-file terpisah pada tingkat komponen atau fitur untuk pemeliharaan yang lebih baik. Ini menjaga konten Anda tetap dekat dengan kode yang relevan (komponen, pengujian, Storybook, dll.). Menghapus sebuah komponen memastikan konten terkait juga dihapus, mencegah data sisa yang mengacaukan basis kode Anda.

> Sumber Daya:
>
> - [Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)

### 2. Internasionalisasi

- Mendukung **230 bahasa dan lokal** (termasuk varian regional seperti Prancis (Perancis), Inggris (Kanada), Inggris (UK), Portugis (Portugal), dll.).
- Kelola terjemahan untuk semua lokal ini dengan mudah dari satu tempat.

> Sumber Daya:
>
> - [Internasionalisasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)

### 3. Dukungan Markdown

- Deklarasikan konten menggunakan **Markdown**, memungkinkan Anda secara otomatis memformat teks dengan paragraf, judul, tautan, dan lainnya.
- Ideal untuk posting blog, artikel, halaman dokumentasi, atau skenario apa pun yang membutuhkan pemformatan teks kaya.

> Sumber Daya:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)

### 4. Dukungan file eksternal

- Impor konten dari file eksternal dalam format teks, seperti TXT, HTML, JSON, YAML, atau CSV.
- Gunakan fungsi `file` di Intlayer untuk menyematkan konten file eksternal ke dalam dictionary, memastikan integrasi mulus dengan Intlayer Visual Editor dan CMS.
- Mendukung pembaruan konten dinamis, artinya ketika file sumber dimodifikasi, konten akan diperbarui secara otomatis di dalam Intlayer.
- Memungkinkan manajemen konten multibahasa dengan menghubungkan file Markdown spesifik bahasa secara dinamis.

> Sumber Daya:
>
> - [Penyisipan Konten File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/file.md)

### 5. Konten Dinamis & Pengambilan Fungsi

Intlayer menyediakan berbagai metode untuk menyisipkan dan mengelola konten dinamis, memastikan fleksibilitas dan adaptabilitas dalam penyampaian konten. Ini mencakup fungsi untuk penyisipan konten dinamis, rendering kondisional, enumerasi, penanaman, dan pengambilan fungsi.

1. Penyisipan Konten Dinamis

   Gunakan fungsi insert untuk mendefinisikan konten dengan placeholder ({{name}}, {{age}}, dll).

   Memungkinkan konten seperti template yang beradaptasi berdasarkan input pengguna, respons API, atau sumber data dinamis lainnya.

   Bekerja dengan mulus dengan konfigurasi TypeScript, ESM, CommonJS, dan JSON.

   Mudah diintegrasikan dengan React Intlayer dan Next Intlayer menggunakan useIntlayer.

2. Rendering Kondisional

   Mendefinisikan konten yang beradaptasi berdasarkan kondisi spesifik pengguna, seperti bahasa atau status autentikasi.

   Menyesuaikan pengalaman personal tanpa menduplikasi konten di beberapa file.

3. Enumerasi & Pluralisasi

   Gunakan fungsi enu untuk mendefinisikan variasi konten berdasarkan nilai numerik, rentang, atau kunci khusus.

   Memastikan pemilihan otomatis frasa yang tepat berdasarkan nilai yang diberikan.

   Mendukung aturan pengurutan, memastikan perilaku yang dapat diprediksi.

4. Nesting & Referensi Sub-Konten

   Gunakan fungsi nest untuk mereferensikan dan menggunakan kembali konten dari kamus lain, mengurangi duplikasi.

   Mendukung manajemen konten yang terstruktur dan hierarkis untuk pemeliharaan yang lebih baik.

5. Pengambilan Fungsi

   Intlayer memungkinkan konten dideklarasikan sebagai fungsi, memungkinkan pengambilan konten secara sinkron dan asinkron.

   Fungsi Sinkron: Konten dihasilkan secara dinamis saat build time.

   Fungsi Asinkron: Mengambil data dari sumber eksternal (misalnya, API, basis data) secara dinamis.

   Integrasi: Bekerja dengan TypeScript, ESM, dan CommonJS tetapi tidak didukung dalam file konten JSON atau remote.

### 6. Format Deklarasi Konten

Intlayer mendukung **TypeScript** (juga JavaScript) dan **JSON** untuk mendeklarasikan konten.

- **TypeScript**:
  - Memastikan struktur konten Anda benar dan tidak ada terjemahan yang hilang.
  - Menawarkan mode validasi yang ketat atau lebih fleksibel.
  - Memungkinkan pengambilan data dinamis dari variabel, fungsi, atau API eksternal.

- **JSON**:
  - Memudahkan integrasi dengan alat eksternal (seperti editor visual) karena formatnya yang standar.

  > Sumber Daya:
  >
  > - [Format Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)

### 7. Purging, optimasi bundle, dan impor dinamis

- Intlayer mengintegrasikan plugin `Babel` dan `SWC` untuk mengoptimalkan bundle Anda dan meningkatkan performa. Plugin ini menggantikan impor, sehingga hanya kamus yang digunakan yang diimpor ke dalam bundle.
- Dengan mengaktifkan opsi ini, Intlayer juga memungkinkan untuk mengimpor konten kamus secara dinamis hanya untuk locale saat ini.

> Sumber Daya:
>
> - [Konfigurasi Build](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integrasi dengan Framework & Lingkungan

### 1. Next.js

#### a. Komponen Server dan Client

- Menyediakan **pendekatan manajemen konten terpadu** untuk komponen server dan client.
- Menawarkan konteks bawaan untuk komponen server, mempermudah implementasi dibandingkan solusi lain.

#### b. Metadata, Sitemap, dan robots.txt

- Mengambil dan menyuntikkan konten secara dinamis untuk menghasilkan metadata, sitemap, atau file `robots.txt`.

#### c. Middleware

- Menambahkan middleware untuk **mengalihkan pengguna** ke konten berdasarkan bahasa pilihan mereka.

#### d. Kompatibilitas Turbopack dan Webpack

- Sepenuhnya kompatibel dengan Turbopack Next.js yang baru serta Webpack tradisional.

> Sumber Daya:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

### 2. Vite

- Serupa dengan Next.js, Anda dapat mengintegrasikan Intlayer dengan Vite dan menggunakan **middleware** untuk mengarahkan pengguna ke konten berdasarkan bahasa pilihan mereka.

> Sumber Daya:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)

### 3. Express

- Mengelola konten dan melakukan internasionalisasi layanan backend yang dibangun dengan Express.
- Personalisasi email, pesan kesalahan, notifikasi push, dan lainnya dengan teks yang dilokalkan.

> Sumber Daya:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_express.md)

### 4. React Native

- Integrasikan Intlayer dengan React Native untuk mengelola konten dan menginternasionalkan aplikasi mobile Anda.
- Mendukung platform iOS dan Android.

> Sumber Daya:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_react_native.md)

### 5. Lynx

- Integrasikan Intlayer dengan Lynx untuk mengelola konten dan menginternasionalkan aplikasi mobile Anda.
- Mendukung platform iOS dan Android.

> Sumber Daya:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_lynx.md)

### 6. Vue

- Integrasikan Intlayer dengan Vue untuk mengelola konten dan menginternasionalkan aplikasi Vite / Vue.js Anda.

> Sumber Daya:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vue.md)

### 7. Nuxt

- Integrasikan Intlayer dengan Nuxt untuk mengelola konten dan menginternasionalkan aplikasi Nuxt / Vue.js Anda.
- Mendukung komponen server dan klien.
- Mengintegrasikan routing dan middleware untuk mengarahkan pengguna ke konten berdasarkan bahasa pilihan mereka.

> Sumber Daya:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md)

### 8. Preact

- Integrasikan Intlayer dengan Preact untuk mengelola konten dan menginternasionalkan aplikasi Preact Anda.

> Sumber Daya:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_preact.md)

---

## Editor Visual dan CMS

### 1. Editor Visual Lokal

- Editor visual lokal **gratis** yang memungkinkan Anda mengedit konten aplikasi dengan langsung memilih elemen di halaman.
- Mengintegrasikan fitur AI untuk membantu:
  - Menghasilkan atau memperbaiki terjemahan
  - Memeriksa sintaks dan ejaan
  - Menyarankan perbaikan
- Dapat dihosting secara lokal atau dideploy di server jarak jauh.

> Sumber daya:
>
> - [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remote)

- Solusi **CMS yang dihosting** yang memungkinkan Anda mengelola konten aplikasi secara online, tanpa menyentuh codebase Anda.
- Menyediakan fitur berbantuan AI untuk mendeklarasikan konten, mengelola terjemahan, dan memperbaiki kesalahan sintaks atau ejaan.
- Berinteraksi dengan konten Anda melalui antarmuka aplikasi langsung Anda.

> Sumber daya:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

---

## Ekstensi IDE

- Ekstensi untuk IDE utama yang menyediakan **antarmuka grafis** untuk mengelola terjemahan lokal dan jarak jauh.
- Fitur dapat mencakup pembuatan otomatis file deklarasi konten untuk komponen, integrasi langsung dengan Intlayer CMS, dan validasi waktu nyata.

---

## Server MCP

- Sebuah **server MCP** yang memungkinkan Anda mengelola konten dan terjemahan menggunakan alat terintegrasi di IDE Anda.

---

## Intlayer CLI

- **Terjemahan dan pembuatan file**: Jalankan audit pada file konten Anda untuk menghasilkan terjemahan yang hilang dan meninjau inkonsistensi.
- **Interaksi Jarak Jauh**: Dorong konten lokal Anda ke CMS jarak jauh atau tarik konten jarak jauh untuk diintegrasikan ke dalam aplikasi lokal Anda.
- **Terjemahan dan review dokumen**: Terjemahkan dan tinjau dokumentasi / file Anda, dll.

> Sumber daya:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)

---

## Lingkungan

- Gunakan **variabel lingkungan** untuk mengonfigurasi Intlayer secara berbeda di lingkungan produksi, pengujian, dan lokal.
- Tentukan editor visual atau proyek CMS jarak jauh mana yang akan ditargetkan tergantung pada lingkungan Anda.

---

## Pembaruan Konten Hot

- Saat menggunakan kamus jarak jauh dan Intlayer CMS, Anda dapat **memperbarui konten aplikasi Anda secara langsung**, tanpa perlu melakukan redeploy.

> Sumber daya:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

---

## Fitur Mendatang

### 1. Pengujian A/B & Personalisasi

- **Pengujian Multivariat**: Uji berbagai versi dari sebuah konten untuk melihat mana yang berkinerja terbaik (misalnya, tingkat klik yang lebih tinggi).
- **Personalisasi Berbasis Data**: Tampilkan konten yang berbeda berdasarkan demografi pengguna (jenis kelamin, usia, lokasi, dll.), atau pola perilaku lainnya.
- **Iterasi Otomatis**: Memungkinkan AI untuk secara otomatis menguji beberapa versi dan memilih yang terbaik atau merekomendasikan opsi untuk persetujuan admin.

### 2. Versi

- Pulihkan versi sebelumnya dari konten Anda dengan **versi konten**.
- Lacak perubahan dari waktu ke waktu dan kembalikan ke keadaan sebelumnya jika diperlukan.

### 3. Terjemahan Otomatis

- Untuk pengguna CMS jarak jauh, **pembuatan terjemahan dengan satu klik** untuk bahasa yang didukung.
- Sistem akan menghasilkan terjemahan di latar belakang dan kemudian meminta Anda untuk validasi atau pengeditan.

### 4. Peningkatan SEO

- Alat untuk **menganalisis kata kunci**, niat pencarian pengguna, dan tren yang sedang berkembang.
- Menyarankan konten yang ditingkatkan untuk peringkat yang lebih baik, dan melacak kinerja jangka panjang.

### 5. Kompatibilitas dengan Lebih Banyak Framework

- Upaya sedang dilakukan untuk mendukung **Solid, Svelte, Angular**, dan lainnya.
- Bertujuan agar Intlayer kompatibel dengan **aplikasi berbasis JavaScript apa pun**.

---

## Kesimpulan

- Sistem akan menghasilkan terjemahan di latar belakang dan kemudian meminta Anda untuk validasi atau suntingan.

### 4. Peningkatan SEO

- Alat untuk **menganalisis kata kunci**, niat pencarian pengguna, dan tren yang sedang berkembang.
- Menyarankan konten yang ditingkatkan untuk peringkat yang lebih baik, dan melacak kinerja jangka panjang.

### 5. Kompatibilitas dengan Lebih Banyak Framework

- Upaya sedang dilakukan untuk mendukung **Solid, Svelte, Angular**, dan lainnya.
- Bertujuan agar Intlayer kompatibel dengan **aplikasi berbasis JavaScript apa pun**.

---

## Kesimpulan

Intlayer bertujuan menjadi solusi satu atap untuk manajemen konten dan internasionalisasi. Fokusnya pada fleksibilitas (file terpusat atau terdistribusi), dukungan bahasa yang luas, integrasi mudah dengan framework dan bundler modern, serta fitur bertenaga AI yang kuat. Seiring dengan hadirnya kemampuan baru, seperti pengujian A/B, versioning, dan terjemahan otomatis, Intlayer akan terus menyederhanakan alur kerja konten dan meningkatkan pengalaman pengguna di berbagai platform.

Tetap nantikan rilis berikutnya, dan jangan ragu untuk menjelajahi fitur yang ada untuk melihat bagaimana Intlayer dapat membantu memusatkan dan mengoptimalkan proses manajemen konten Anda hari ini!

---
