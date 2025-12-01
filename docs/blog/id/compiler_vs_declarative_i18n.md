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
  - blog
  - compiler-vs-declarative-i18n
---

# Argumen Mendukung dan Menentang i18n Berbasis Compiler

Jika Anda telah membangun aplikasi web selama lebih dari satu dekade, Anda tahu bahwa Internasionalisasi (i18n) selalu menjadi titik gesekan. Ini sering menjadi tugas yang tidak ingin dilakukan siapa pun—mengekstrak string, mengelola file JSON, dan khawatir tentang aturan pluralisasi.

Baru-baru ini, gelombang baru alat i18n **"Berbasis Compiler"** telah muncul, menjanjikan untuk menghilangkan rasa sakit ini. Janjinya menggoda: **Cukup tulis teks di komponen Anda, dan biarkan alat build yang mengurus sisanya.** Tidak perlu kunci, tidak perlu impor, hanya keajaiban.

Namun seperti semua abstraksi dalam rekayasa perangkat lunak, keajaiban datang dengan harga.

Dalam posting blog ini, kita akan mengeksplorasi pergeseran dari pustaka deklaratif ke pendekatan berbasis compiler, utang arsitektural tersembunyi yang mereka perkenalkan, dan mengapa cara yang "membosankan" mungkin masih menjadi cara terbaik untuk aplikasi profesional.

## Daftar Isi

<TOC/>

## Sejarah Singkat Internasionalisasi

Untuk memahami posisi kita saat ini, kita harus melihat kembali dari mana kita memulai.

Sekitar tahun 2011–2012, lanskap JavaScript sangat berbeda. Bundler seperti yang kita kenal sekarang (Webpack, Vite) belum ada atau masih dalam tahap awal. Saat itu, kita menyatukan skrip langsung di browser. Pada era ini, pustaka seperti **i18next** lahir.

Mereka memecahkan masalah dengan satu-satunya cara yang mungkin pada waktu itu: **Kamus Runtime**. Anda memuat objek JSON besar ke dalam memori, dan sebuah fungsi mencari kunci secara langsung saat runtime. Cara ini dapat diandalkan, eksplisit, dan bekerja di mana saja.

Maju ke hari ini. Kita memiliki compiler yang kuat (SWC, bundler berbasis Rust) yang dapat mengurai Abstract Syntax Trees (AST) dalam hitungan milidetik. Kekuatan ini melahirkan ide baru: _Mengapa kita harus mengelola kunci secara manual? Mengapa compiler tidak langsung melihat teks "Hello World" dan menggantinya untuk kita?_

Dengan demikian, i18n berbasis Compiler lahir.

> **Contoh i18n berbasis compiler:**
>
> - Paraglide (Modul tree-shaken yang mengompilasi setiap pesan menjadi fungsi ESM kecil sehingga bundler dapat secara otomatis menghapus locale dan kunci yang tidak digunakan. Anda mengimpor pesan sebagai fungsi daripada melakukan pencarian kunci string.)
> - LinguiJS (Compiler macro-ke-fungsi yang menulis ulang makro pesan seperti `<Trans>` menjadi panggilan fungsi JS biasa saat build. Anda mendapatkan sintaks ICU/MessageFormat dengan jejak runtime yang sangat kecil.)
> - Lingo.dev (Berfokus pada otomatisasi pipeline lokalisasi dengan menyuntikkan konten terjemahan langsung selama build aplikasi React Anda. Dapat menghasilkan terjemahan secara otomatis menggunakan AI dan terintegrasi langsung ke dalam CI/CD.)
> - Wuchale (Preprocessor yang mengutamakan Svelte yang mengekstrak teks inline dalam file .svelte dan mengompilasinya menjadi fungsi terjemahan tanpa pembungkus. Ini menghindari kunci string, dan memisahkan logika ekstraksi konten sepenuhnya dari runtime aplikasi utama.)
> - Intlayer (Compiler / Extract CLI yang mem-parsing komponen Anda, menghasilkan kamus bertipe, dan dapat secara opsional menulis ulang kode untuk menggunakan konten Intlayer secara eksplisit. Tujuannya adalah menggunakan compiler untuk kecepatan sambil menjaga inti yang deklaratif dan agnostik terhadap framework.)

> **Contoh i18n deklaratif:**
>
> - i18next / react-i18next / next-i18next (Standar industri matang yang menggunakan kamus JSON runtime dan ekosistem plugin yang luas)
> - react-intl (Bagian dari perpustakaan FormatJS, berfokus pada sintaks pesan ICU standar dan pemformatan data yang ketat)
> - next-intl (Dioptimalkan khusus untuk Next.js dengan integrasi untuk App Router dan React Server Components)
> - vue-i18n / @nuxt/i18n (Solusi ekosistem Vue standar yang menawarkan blok terjemahan tingkat komponen dan integrasi reaktivitas yang ketat)
> - svelte-i18n (Pembungkus ringan di sekitar Svelte stores untuk terjemahan reaktif saat runtime)
> - angular-translate (Perpustakaan terjemahan dinamis warisan yang mengandalkan pencarian kunci saat runtime daripada penggabungan saat build)
> - angular-i18n (Pendekatan asli Angular, ahead-of-time yang menggabungkan file XLIFF langsung ke dalam template selama build)
> - Tolgee (Menggabungkan kode deklaratif dengan SDK dalam konteks untuk pengeditan "klik-untuk-menerjemahkan" langsung di UI)
> - Intlayer (Pendekatan per-komponen, menggunakan file deklarasi konten yang memungkinkan tree-shaking native dan validasi TypeScript)

## Kompiler Intlayer

Meskipun **Intlayer** adalah solusi yang secara fundamental mendorong **pendekatan deklaratif** untuk konten Anda, ia menyertakan kompiler untuk membantu mempercepat pengembangan atau memfasilitasi prototipe cepat.

Kompiler Intlayer menelusuri AST (Abstract Syntax Tree) dari komponen React, Vue, atau Svelte Anda, serta file JavaScript/TypeScript lainnya. Perannya adalah mendeteksi string yang dikodekan secara langsung dan mengekstraknya ke dalam deklarasi `.content` khusus.

> Untuk detail lebih lanjut, lihat dokumentasi: [Dokumentasi Compiler Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)

## Daya Tarik Compiler (Pendekatan "Ajaib")

Ada alasan mengapa pendekatan baru ini sedang tren. Bagi seorang developer, pengalamannya terasa luar biasa.

### 1. Kecepatan dan "Aliran"

Saat Anda sedang fokus, berhenti untuk memikirkan nama variabel semantik (`home_hero_title_v2`) akan memutus aliran kerja Anda. Dengan pendekatan compiler, Anda mengetik `<p>Welcome back</p>` dan terus melanjutkan. Hambatan menjadi nol.

### 2. Misi Penyelamatan Legacy

Bayangkan mewarisi sebuah codebase besar dengan 5.000 komponen dan tanpa terjemahan sama sekali. Memodifikasi ini dengan sistem berbasis kunci manual adalah mimpi buruk yang memakan waktu berbulan-bulan. Alat berbasis compiler bertindak sebagai strategi penyelamatan, secara instan mengekstrak ribuan string tanpa Anda perlu menyentuh satu file pun secara manual.

### 3. Era AI

Ini adalah keuntungan modern yang tidak boleh kita abaikan. Asisten pengkodean AI (seperti Copilot atau ChatGPT) secara alami menghasilkan JSX/HTML standar. Mereka tidak mengetahui skema kunci terjemahan spesifik Anda.

- **Deklaratif:** Anda harus menulis ulang output AI untuk mengganti teks dengan kunci.
- **Compiler:** Anda cukup menyalin-tempel kode AI, dan itu langsung bekerja.

## Pemeriksaan Realitas: Mengapa "Magic" Berbahaya

Sementara "keajaiban" itu menarik, abstraksi tersebut bocor. Mengandalkan alat build untuk memahami niat manusia memperkenalkan kerentanan arsitektural.

### Kerentanan Heuristik (Permainan Tebak-tebakan)

Compiler harus menebak mana yang konten dan mana yang kode. Ini menyebabkan kasus-kasus tepi di mana Anda akhirnya "berjuang" dengan alat tersebut.

Pertimbangkan skenario-skenario ini:

- Apakah `<span className="active"></span>` diekstrak? (Ini adalah string, tapi kemungkinan kelas).
- Apakah `<span status="pending"></span>` diekstrak? (Ini adalah nilai prop).
- Apakah `<span>{"Hello World"}</span>` diekstrak? (Ini adalah ekspresi JS).
- Apakah `<span>Hello {name}. How are you?</span>` diekstrak? (Interpolasi itu kompleks).
- Apakah `<span aria-label="Image of cat"></span>` diekstrak? (Atribut aksesibilitas perlu diterjemahkan).
- Apakah `<span data-testid="my-element"></span>` diekstrak? (Test ID seharusnya TIDAK diterjemahkan).
- Apakah `<MyComponent errorMessage="An error occurred" />` diekstrak?
- Apakah `<p>This is a paragraph{" "}\n containing multiple lines</p>` diekstrak?
- Apakah hasil fungsi `<p>{getStatusMessage()}</p>` diekstrak?
- Apakah `<div>{isLoading ? "The page is loading" : <MyComponent/>} </div>` diekstrak?
- Apakah ID produk seperti `<span>AX-99</span>` diekstrak?

Anda pada akhirnya harus menambahkan komentar spesifik (seperti `// ignore-translation`, atau properti spesifik seperti `data-compiler-ignore="true"`) untuk mencegahnya merusak logika aplikasi Anda.

### Bagaimana Intlayer menangani kompleksitas ini?

Intlayer menggunakan pendekatan campuran untuk mendeteksi apakah sebuah field harus diekstrak untuk terjemahan, dengan upaya meminimalkan false positives:

1.  **Analisis AST:** Memeriksa tipe elemen (misalnya, membedakan antara `reactNode`, `label`, atau properti `title`).
2.  **Pengenalan Pola:** Mendeteksi apakah string menggunakan huruf kapital atau mengandung spasi, yang menunjukkan kemungkinan besar itu adalah teks yang dapat dibaca manusia daripada sebuah identifier kode.

### Batas Keras Data Dinamis

Ekstraksi compiler bergantung pada **analisis statis**. Compiler harus melihat string literal dalam kode Anda untuk menghasilkan ID yang stabil.
Jika API Anda mengembalikan string kode error seperti `server_error`, Anda tidak dapat menerjemahkannya dengan compiler karena compiler tidak mengetahui string tersebut ada saat waktu build. Anda terpaksa membangun sistem sekunder "hanya runtime" khusus untuk data dinamis.

### Kekurangan Chunking

Beberapa compiler tidak melakukan chunking terjemahan per halaman. Jika compiler Anda menghasilkan file JSON besar per bahasa (misalnya, `./lang/en.json`, `./lang/fr.json`, dll.), Anda kemungkinan akan memuat konten dari semua halaman Anda untuk satu halaman yang dikunjungi saja. Selain itu, setiap komponen yang menggunakan konten Anda kemungkinan akan dihidrasikan dengan konten yang jauh lebih banyak dari yang diperlukan, yang berpotensi menyebabkan masalah performa.

Juga berhati-hatilah saat memuat terjemahan Anda secara dinamis. Jika ini tidak dilakukan, Anda akan memuat konten untuk semua bahasa selain bahasa saat ini.

> Untuk mengilustrasikan masalah ini, pertimbangkan sebuah situs dengan 10 halaman dan 10 bahasa (semuanya 100% unik). Anda akan memuat konten untuk 99 halaman tambahan (10 × 10 - 1).

### "Ledakan Chunk" dan Jaringan Waterfall

Untuk mengatasi masalah chunking, beberapa solusi menawarkan chunking per komponen, atau bahkan per kunci. Namun masalah ini hanya teratasi sebagian. Keunggulan dari solusi ini sering kali dikatakan "Konten Anda di tree-shake."

Memang, jika Anda memuat konten secara statis, solusi Anda akan melakukan tree-shake pada konten yang tidak digunakan, tetapi Anda tetap akan memuat konten dari semua bahasa bersama aplikasi Anda.

Jadi mengapa tidak memuatnya secara dinamis? Ya, dalam kasus ini Anda akan memuat lebih banyak konten daripada yang diperlukan, tetapi hal ini tidak tanpa kompromi.

Memuat konten secara dinamis mengisolasi setiap potongan konten dalam chunk-nya sendiri, yang hanya akan dimuat saat komponen dirender. Ini berarti Anda akan membuat satu permintaan HTTP per blok teks. Ada 1.000 blok teks di halaman Anda? → 1.000 permintaan HTTP ke server Anda. Dan untuk membatasi dampak serta mengoptimalkan waktu render pertama aplikasi Anda, Anda perlu menyisipkan beberapa batas Suspense atau Skeleton Loader.

> Catatan: Bahkan dengan Next.js dan SSR, komponen Anda masih akan dihidratasi setelah pemuatan, jadi permintaan HTTP tetap akan dilakukan.

Solusinya? Mengadopsi solusi yang memungkinkan deklarasi konten yang terlokalisasi, seperti yang dilakukan oleh `i18next`, `next-intl`, atau `intlayer`.

> Catatan: `i18next` dan `next-intl` mengharuskan Anda mengelola impor namespace / pesan secara manual untuk setiap halaman guna mengoptimalkan ukuran bundle Anda. Anda harus menggunakan alat analisis bundle seperti `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js), atau `webpack-bundle-analyzer` (React CRA / Angular / dll) untuk mendeteksi apakah Anda mencemari bundle Anda dengan terjemahan yang tidak digunakan.

### Beban Kinerja Saat Runtime

Untuk membuat terjemahan menjadi reaktif (sehingga mereka langsung diperbarui saat Anda mengganti bahasa), compiler sering menyisipkan hooks manajemen state ke dalam setiap komponen.

- **Biaya:** Jika Anda merender daftar berisi 5.000 item, Anda menginisialisasi 5.000 hook `useState` dan `useEffect` hanya untuk teks. React harus mengidentifikasi dan merender ulang semua 5.000 konsumen secara bersamaan. Ini menyebabkan blok besar pada "Main Thread", membekukan UI selama pergantian bahasa. Ini menghabiskan memori dan siklus CPU yang sebenarnya bisa dihemat oleh pustaka deklaratif (yang biasanya menggunakan satu penyedia Context).

> Perlu dicatat bahwa masalah ini serupa pada framework lain selain React.

## Perangkap: Vendor Lock-in

Berhati-hatilah dalam memilih solusi i18n yang memungkinkan ekstraksi atau migrasi kunci terjemahan.

Dalam kasus library deklaratif, kode sumber Anda secara eksplisit berisi maksud terjemahan Anda: ini adalah kunci Anda, dan Anda mengendalikannya. Jika Anda ingin mengganti library, umumnya Anda hanya perlu memperbarui impor.

Dengan pendekatan compiler, kode sumber Anda mungkin hanya berupa teks bahasa Inggris biasa, tanpa jejak logika terjemahan: semuanya tersembunyi dalam konfigurasi alat build. Jika plugin tersebut tidak lagi dipelihara atau Anda ingin mengganti solusi, Anda bisa terjebak. Tidak ada cara mudah untuk "eject": tidak ada kunci yang dapat digunakan dalam kode Anda, dan Anda mungkin perlu menghasilkan ulang semua terjemahan untuk library baru.

Beberapa solusi juga menawarkan layanan pembuatan terjemahan. Tidak ada kredit lagi? Tidak ada terjemahan lagi.

Compiler sering kali meng-hash teks (misalnya, `"Hello World"` -> `x7f2a`). File terjemahan Anda akan terlihat seperti `{ "x7f2a": "Hola Mundo" }`. Perangkapnya: Jika Anda mengganti library, library baru akan melihat `"Hello World"` dan mencari kunci tersebut. Namun, ia tidak akan menemukannya karena file terjemahan Anda penuh dengan hash (`x7f2a`).

### Keterikatan Platform

Dengan memilih pendekatan berbasis compiler, Anda mengikat diri pada platform yang mendasarinya. Misalnya, compiler tertentu tidak tersedia untuk semua bundler (seperti Vite, Turbopack, atau Metro). Ini dapat membuat migrasi di masa depan menjadi sulit, dan Anda mungkin perlu mengadopsi beberapa solusi untuk mencakup semua aplikasi Anda.

## Sisi Lain: Risiko dari Pendekatan Deklaratif

Sejujurnya, cara deklaratif tradisional juga tidak sempurna. Ia memiliki serangkaian "jebakan" tersendiri.

1.  **Namespace Hell:** Anda sering harus mengelola secara manual file JSON mana yang akan dimuat (`common.json`, `dashboard.json`, `footer.json`). Jika Anda lupa satu, pengguna akan melihat kunci mentah.
2.  **Over-fetching:** Tanpa konfigurasi yang hati-hati, sangat mudah secara tidak sengaja memuat _semua_ kunci terjemahan Anda untuk _semua_ halaman pada pemuatan awal, yang membuat ukuran bundle membengkak.
3.  **Sync Drift:** Umum terjadi kunci tetap ada di file JSON jauh setelah komponen yang menggunakannya dihapus. File terjemahan Anda tumbuh tanpa batas, dipenuhi dengan "kunci zombie."

## Jalan Tengah Intlayer

Di sinilah alat seperti **Intlayer** mencoba berinovasi. Intlayer memahami bahwa meskipun compiler sangat kuat, sihir implisit itu berbahaya.

Intlayer menawarkan pendekatan campuran, memungkinkan Anda mendapatkan keuntungan dari kedua pendekatan: manajemen konten deklaratif, yang juga kompatibel dengan compiler-nya untuk menghemat waktu pengembangan.

Dan bahkan jika Anda tidak menggunakan compiler Intlayer, Intlayer menawarkan perintah `transform` (juga dapat diakses menggunakan ekstensi VSCode). Alih-alih hanya melakukan magic di langkah build yang tersembunyi, perintah ini sebenarnya dapat **menulis ulang kode komponen Anda**. Ia memindai teks Anda dan menggantinya dengan deklarasi konten eksplisit di dalam codebase Anda.

Ini memberi Anda yang terbaik dari kedua dunia:

1.  **Granularitas:** Anda menjaga terjemahan tetap dekat dengan komponen Anda (meningkatkan modularitas dan tree-shaking).
2.  **Keamanan:** Terjemahan menjadi kode eksplisit, bukan magic tersembunyi saat build.
3.  **Tanpa Lock-in:** Karena kode diubah menjadi struktur deklaratif di dalam repo Anda, Anda dapat dengan mudah menekan tab, atau menggunakan copilot IDE Anda, untuk menghasilkan deklarasi konten Anda, Anda tidak menyembunyikan logika dalam plugin webpack.

## Kesimpulan

Jadi, mana yang harus Anda pilih?

**Jika Anda sedang membangun MVP, atau ingin bergerak cepat:**  
Pendekatan berbasis compiler adalah pilihan yang valid. Ini memungkinkan Anda bergerak sangat cepat. Anda tidak perlu khawatir tentang struktur file atau kunci. Anda hanya membangun. Hutang teknis adalah masalah untuk "Anda di Masa Depan."

**Jika Anda seorang Junior Developer, atau tidak peduli dengan optimasi:**  
Jika Anda menginginkan manajemen manual yang paling sedikit, pendekatan berbasis compiler kemungkinan adalah yang terbaik. Anda tidak perlu menangani kunci atau file terjemahan sendiri—cukup tulis teks, dan compiler akan mengotomatisasi sisanya. Ini mengurangi usaha setup dan kesalahan i18n umum yang terkait dengan langkah manual.

**Jika Anda sedang menginternasionalkan proyek yang sudah ada yang sudah mencakup ribuan komponen untuk direfaktor:**  
Pendekatan berbasis compiler bisa menjadi pilihan pragmatis di sini. Tahap ekstraksi awal dapat menghemat minggu atau bahkan bulan kerja manual. Namun, pertimbangkan untuk menggunakan alat seperti perintah `transform` dari Intlayer, yang dapat mengekstrak string dan mengubahnya menjadi deklarasi konten deklaratif yang eksplisit. Ini memberi Anda kecepatan otomatisasi sambil mempertahankan keamanan dan portabilitas pendekatan deklaratif. Anda mendapatkan yang terbaik dari kedua dunia: migrasi awal yang cepat tanpa utang arsitektur jangka panjang.

**Jika Anda membangun Aplikasi Profesional, Kelas Enterprise:**
Sihir umumnya adalah ide yang buruk. Anda membutuhkan kontrol.

- Anda perlu menangani data dinamis dari backend.
- Anda perlu memastikan performa pada perangkat kelas bawah (menghindari ledakan hook).
- Anda perlu memastikan bahwa Anda tidak terkunci pada alat build tertentu untuk selamanya.

Untuk aplikasi profesional, **Manajemen Konten Deklaratif** (seperti Intlayer atau pustaka yang sudah mapan) tetap menjadi standar emas. Ini memisahkan kekhawatiran Anda, menjaga arsitektur Anda tetap bersih, dan memastikan kemampuan aplikasi Anda untuk berbicara dalam berbagai bahasa tidak bergantung pada compiler "kotak hitam" yang menebak niat Anda.
