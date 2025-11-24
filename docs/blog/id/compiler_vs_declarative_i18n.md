---
createdAt: 2025-11-24
updatedAt: 2025-11-24
title: Compiler vs. Deklaratif i18n
description: Menjelajahi pertukaran arsitektural antara internasionalisasi berbasis compiler "ajaib" dan manajemen konten deklaratif yang eksplisit.
keywords:
  - Intlayer
  - Internasionalisasi
  - Blog
  - Next.js
  - JavaScript
  - React
  - i18n
  - Compiler
  - Deklaratif
slugs:
  - compiler-vs-declarative-i18n
  - blog
  - i18n
---

# Argumen Mendukung dan Menentang i18n Berbasis Compiler

Jika Anda telah membangun aplikasi web selama lebih dari satu dekade, Anda tahu bahwa Internasionalisasi (i18n) selalu menjadi titik gesekan. Ini sering menjadi tugas yang tidak ada yang ingin lakukan—mengekstrak string, mengelola file JSON, dan memikirkan aturan pluralisasi.

Baru-baru ini, gelombang baru alat i18n "berbasis Compiler" telah muncul, menjanjikan untuk menghilangkan rasa sakit ini. Janjinya menggoda: **Cukup tulis teks di komponen Anda, dan biarkan alat build yang mengurus sisanya.** Tidak perlu kunci, tidak perlu impor, hanya keajaiban.

Namun seperti semua abstraksi dalam rekayasa perangkat lunak, keajaiban datang dengan harga.

Dalam posting blog ini, kita akan mengeksplorasi pergeseran dari perpustakaan deklaratif ke pendekatan berbasis compiler, utang arsitektural tersembunyi yang mereka perkenalkan, dan mengapa cara "membosankan" mungkin masih menjadi cara terbaik untuk aplikasi profesional.

## Sejarah Singkat Terjemahan

Untuk memahami di mana kita berada, kita harus melihat kembali dari mana kita memulai.

Sekitar tahun 2011–2012, lanskap JavaScript sangat berbeda. Bundler seperti yang kita kenal sekarang (Webpack, Vite) belum ada atau masih dalam tahap awal. Kita menggabungkan skrip langsung di browser. Pada era ini, perpustakaan seperti **i18next** lahir.

Mereka memecahkan masalah dengan satu-satunya cara yang mungkin saat itu: **Kamus Runtime**. Anda memuat objek JSON besar ke dalam memori, dan sebuah fungsi mencari kunci secara langsung saat runtime. Ini dapat diandalkan, eksplisit, dan bekerja di mana saja.

Maju ke hari ini. Kita memiliki compiler yang kuat (SWC, bundler berbasis Rust) yang dapat mengurai Abstract Syntax Trees (AST) dalam hitungan milidetik. Kekuatan ini melahirkan ide baru: _Mengapa kita harus mengelola kunci secara manual? Mengapa compiler tidak langsung melihat teks "Hello World" dan menggantinya untuk kita?_

Dengan demikian, i18n berbasis Compiler lahir.

## Daya Tarik Compiler (Pendekatan "Ajaib")

Ada alasan mengapa pendekatan baru ini sedang tren. Bagi seorang developer, pengalamannya terasa luar biasa.

### 1. Kecepatan dan "Aliran"

Saat Anda sedang fokus, berhenti untuk memikirkan nama variabel (`home_hero_title_v2`) akan memutus aliran kerja Anda. Dengan pendekatan compiler, Anda mengetik `<p>Welcome back</p>` dan terus melanjutkan. Hambatannya nol.

### 2. Misi Penyelamatan Warisan

Bayangkan mewarisi codebase besar dengan 5.000 komponen dan tanpa terjemahan sama sekali. Memasang sistem berbasis kunci manual pada ini adalah mimpi buruk yang memakan waktu berbulan-bulan. Alat berbasis compiler bertindak sebagai strategi penyelamatan, langsung mengekstrak ribuan string tanpa Anda perlu menyentuh satu file pun secara manual.

### 3. Era AI

Ini adalah manfaat modern yang tidak boleh kita abaikan. Asisten pengkodean AI (seperti Copilot atau ChatGPT) secara alami menghasilkan JSX/HTML standar. Mereka tidak mengetahui skema kunci terjemahan spesifik Anda.

- **Deklaratif:** Anda harus menulis ulang output AI untuk mengganti teks dengan kunci.
- **Compiler:** Anda cukup menyalin-tempel kode AI, dan itu langsung bekerja.

## Pemeriksaan Realitas: Mengapa "Ajaib" Itu Berbahaya

Meskipun "ajaib" itu menarik, abstraksi tersebut bisa bocor. Mengandalkan alat build untuk memahami niat manusia memperkenalkan kerentanan arsitektural.

### 1. Kerentanan Heuristik (Permainan Tebak-tebakan)

Compiler harus menebak mana yang konten dan mana yang kode.

- Apakah `className="active"` diterjemahkan? Itu adalah string.
- Apakah `status="pending"` diterjemahkan?
- Apakah `<MyComponent errorMessage="An error occurred" />` diterjemahkan?
- Apakah ID produk seperti `"AX-99"` diterjemahkan?

Anda pada akhirnya harus "berjuang" dengan compiler, menambahkan komentar khusus (seperti `// ignore-translation`) untuk mencegahnya merusak logika aplikasi Anda.

### 2. Batas Keras Data Dinamis

Ekstraksi compiler bergantung pada **analisis statis**. Compiler harus melihat string literal dalam kode Anda untuk menghasilkan ID yang stabil.
Jika API Anda mengembalikan string kode error seperti `server_error`, Anda tidak bisa menerjemahkannya dengan compiler karena compiler tidak mengetahui string tersebut ada saat build time. Anda terpaksa membangun sistem "runtime-only" sekunder hanya untuk data dinamis.

### 3. "Ledakan Chunk" dan Air Terjun Jaringan

Untuk memungkinkan tree-shaking, alat compiler sering membagi terjemahan per komponen.

- **Konsekuensinya:** Satu tampilan halaman dengan 50 komponen kecil mungkin memicu **50 permintaan HTTP terpisah** untuk fragmen terjemahan kecil. Bahkan dengan HTTP/2, ini menciptakan waterfall jaringan yang membuat aplikasi Anda terasa lambat dibandingkan memuat satu bundel bahasa yang dioptimalkan.

### 4. Beban Kinerja Runtime

Untuk membuat terjemahan bersifat reaktif (sehingga mereka langsung diperbarui saat Anda mengganti bahasa), compiler sering menyuntikkan hooks manajemen state ke _setiap_ komponen.

- **Biayanya:** Jika Anda merender daftar dengan 5.000 item, Anda menginisialisasi 5.000 hook `useState` dan `useEffect` hanya untuk teks. Ini menghabiskan memori dan siklus CPU yang sebenarnya bisa dihemat oleh pustaka deklaratif (yang biasanya menggunakan satu penyedia Context).

## Perangkap: Vendor Lock-in

Ini mungkin aspek paling berbahaya dari i18n berbasis compiler.

Dalam pustaka deklaratif, kode sumber Anda mengandung maksud yang eksplisit. Anda memiliki kunci-kuncinya. Jika Anda mengganti pustaka, Anda hanya perlu mengubah impor.

Dalam pendekatan berbasis compiler, **kode sumber Anda hanyalah teks bahasa Inggris.** "Logika terjemahan" hanya ada di dalam konfigurasi plugin build.
Jika perpustakaan itu berhenti dipelihara, atau jika Anda merasa sudah tidak cocok lagi, Anda akan terjebak. Anda tidak bisa dengan mudah "eject" karena Anda tidak memiliki kunci terjemahan sama sekali di kode sumber Anda. Anda harus menulis ulang seluruh aplikasi secara manual untuk bermigrasi.

## Sisi Lain: Risiko dari Pendekatan Deklaratif

Untuk adilnya, cara deklaratif tradisional juga tidak sempurna. Ia memiliki serangkaian "jebakan" tersendiri.

1.  **Namespace Hell:** Anda sering harus mengelola secara manual file JSON mana yang akan dimuat (`common.json`, `dashboard.json`, `footer.json`). Jika Anda lupa satu, pengguna akan melihat kunci mentah.
2.  **Over-fetching:** Tanpa konfigurasi yang hati-hati, sangat mudah secara tidak sengaja memuat _semua_ kunci terjemahan Anda untuk _semua_ halaman pada pemuatan awal, yang membuat ukuran bundle membengkak.
3.  **Sync Drift:** Umum terjadi kunci tetap ada di file JSON jauh setelah komponen yang menggunakannya dihapus. File terjemahan Anda tumbuh tanpa batas, dipenuhi dengan "kunci zombie."

## Jalan Tengah Intlayer

Di sinilah alat seperti **Intlayer** mencoba berinovasi. Intlayer memahami bahwa meskipun compiler itu kuat, sihir implisit itu berbahaya.

Intlayer menawarkan **perintah `transform`** yang unik. Alih-alih hanya melakukan sihir di langkah build tersembunyi, ia sebenarnya dapat **menulis ulang kode komponen Anda**. Ia memindai teks Anda dan menggantinya dengan deklarasi konten eksplisit di dalam codebase Anda.

Ini memberi Anda yang terbaik dari kedua dunia:

1.  **Granularitas:** Anda menjaga terjemahan tetap dekat dengan komponen Anda (meningkatkan modularitas dan tree-shaking).
2.  **Keamanan:** Terjemahan menjadi kode eksplisit, bukan sihir tersembunyi saat build-time.
3.  **Tanpa Lock-in:** Karena kode diubah menjadi struktur deklaratif standar dalam repo Anda, Anda tidak menyembunyikan logika dalam plugin webpack.

## Kesimpulan

Jadi, mana yang harus Anda pilih?

**Jika Anda seorang Junior Developer, Solo Founder, atau sedang membangun MVP:**
Pendekatan berbasis compiler adalah pilihan yang valid. Ini memungkinkan Anda bergerak sangat cepat. Anda tidak perlu khawatir tentang struktur file atau kunci. Anda hanya membangun. Hutang teknis adalah masalah untuk "Anda di Masa Depan."

**Jika Anda membangun Aplikasi Profesional, Tingkat Enterprise:**
Sihir umumnya adalah ide buruk. Anda membutuhkan kontrol.

- Anda perlu menangani data dinamis dari backend.
- Anda perlu memastikan performa pada perangkat kelas bawah (menghindari ledakan hook).
- Anda perlu memastikan Anda tidak terkunci pada alat build tertentu selamanya.

Untuk aplikasi profesional, **Manajemen Konten Deklaratif** (seperti Intlayer atau pustaka yang sudah mapan) tetap menjadi standar emas. Ini memisahkan kekhawatiran Anda, menjaga arsitektur Anda tetap bersih, dan memastikan kemampuan aplikasi Anda untuk berbicara dalam berbagai bahasa tidak bergantung pada compiler "kotak hitam" yang menebak niat Anda.
