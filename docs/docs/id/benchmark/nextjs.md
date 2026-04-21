---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Solusi i18n terbaik untuk Next.js tahun 2026 - Laporan Benchmark
description: Bandingkan library internasionalisasi (i18n) Next.js seperti next-intl, next-i18next, dan Intlayer. Laporan performa terperinci tentang ukuran bundle, kebocoran, dan reaktivitas.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - performa
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inisialisasi benchmark"
---

# Library i18n Next.js — Laporan Benchmark 2026

Halaman ini adalah laporan benchmark untuk solusi i18n pada Next.js.

## Daftar Isi

<Toc/>

## Benchmark Interaktif

<I18nBenchmark framework="nextjs" vertical/>

## Referensi hasil:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md

Lihat repositori benchmark lengkap [di sini](https://github.com/intlayer-org/benchmark-i18n).

## Pendahuluan

Library internasionalisasi memiliki dampak besar pada aplikasi Anda. Risiko utamanya adalah memuat konten untuk setiap halaman dan setiap bahasa padahal pengguna hanya mengunjungi satu halaman.

Seiring berkembangnya aplikasi Anda, ukuran bundle dapat tumbuh secara eksponensial, yang dapat mengganggu performa secara nyata.

Sebagai contoh, pada kasus terburuk, setelah diinternasionalisasi, halaman Anda bisa menjadi hampir 4 kali lebih besar.

Dampak lain dari library i18n adalah pengembangan yang lebih lambat. Mengubah komponen menjadi konten multibahasa di berbagai bahasa memakan waktu lama.

Karena masalah ini sulit, banyak solusi tersedia—beberapa berfokus pada DX (Developer Experience), yang lain pada performa atau skalabilitas, dan sebagainya.

Intlayer mencoba mengoptimalkan di semua dimensi ini.

## Uji aplikasi Anda

Untuk mengungkap masalah ini, saya membangun pemindai gratis yang dapat Anda coba [di sini](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Masalah

Ada dua cara utama untuk membatasi dampak aplikasi multibahasa pada bundle Anda:

- Memisahkan JSON (atau konten) Anda ke berbagai file / variabel / namespace sehingga bundler dapat melakukan tree-shaking pada konten yang tidak digunakan untuk halaman tertentu.
- Memuat konten halaman Anda secara dinamis hanya dalam bahasa pengguna.

Batasan teknis untuk pendekatan ini:

**Pemuatan dinamis**

Bahkan saat Anda mendeklarasikan rute seperti `[locale]/page.tsx`, dengan Webpack atau Turbopack, dan bahkan jika `generateStaticParams` didefinisikan, bundler tidak memperlakukan `locale` sebagai konstanta statis. Itu berarti bundler mungkin menarik konten untuk semua bahasa ke dalam setiap halaman. Cara utama untuk membatasi ini adalah memuat konten melalui impor dinamis (misalnya `import('./locales/${locale}.json')`).

Apa yang terjadi pada saat build adalah Next.js memancarkan satu bundle JS per lokal (misalnya `./locales_fr_12345.js`). Setelah situs dikirim ke klien, saat halaman berjalan, browser melakukan permintaan HTTP ekstra untuk file JS yang dibutuhkan (misalnya `./locales_fr_12345.js`).

> Cara lain untuk mengatasi masalah yang sama adalah dengan menggunakan `fetch()` untuk memuat JSON secara dinamis. Itulah cara kerja `Tolgee` saat JSON berada di bawah `/public`, atau `next-translate`, yang mengandalkan `getStaticProps` untuk memuat konten. Alurnya sama: browser membuat permintaan HTTP ekstra untuk memuat aset tersebut.

**Pemisahan konten (Content splitting)**

Jika Anda menggunakan sintaks seperti `const t = useTranslation()` + `t('objek-saya.sub-objek-saya.kunci-saya')`, seluruh JSON biasanya harus ada dalam bundle sehingga library dapat mem-parsing-nya dan menyelesaikan kuncinya. Banyak dari konten tersebut kemudian dikirimkan bahkan saat tidak digunakan di halaman.

Untuk memitigasi hal ini, beberapa library meminta Anda untuk mendeklarasikan per halaman namespace mana yang akan dimuat—misalnya `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

Sebaliknya, `Paraglide` menambahkan langkah ekstra sebelum build untuk mengubah JSON menjadi simbol datar seperti `const en_my_var = () => 'nilai saya'`. Secara teori, hal itu memungkinkan tree-shaking konten yang tidak digunakan pada halaman. Seperti yang akan kita lihat, metode tersebut masih memiliki trade-off.

Terakhir, `Intlayer` menerapkan optimisasi waktu build sehingga `useIntlayer('kunci-saya')` diganti dengan konten yang sesuai secara langsung.

## Metodologi

Untuk benchmark ini, kami membandingkan library berikut:

- `Base App` (Tanpa library i18n)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Saya menggunakan `Next.js` versi `16.2.4` dengan App Router.

Saya membangun aplikasi multibahasa dengan **10 halaman** dan **10 bahasa**.

Saya membandingkan **empat strategi pemuatan**:

| Strategi             | Tanpa namespace (global)                     | Dengan namespace (terlingkup/scoped)                                    |
| :------------------- | :------------------------------------------- | :---------------------------------------------------------------------- |
| **Pemuatan statis**  | **Static**: Semuanya di memori saat startup. | **Scoped static**: Dipisah per namespace; semuanya dimuat saat startup. |
| **Pemuatan dinamis** | **Dynamic**: Pemuatan on-demand per lokal.   | **Scoped dynamic**: Pemuatan granular per namespace dan lokal.          |

## Ringkasan strategi

- **Static**: Sederhana; tidak ada latensi jaringan setelah pemuatan awal. Kekurangannya: ukuran bundle yang besar.
- **Dynamic**: Mengurangi beban awal (lazy-loading). Ideal bila Anda memiliki banyak lokal.
- **Scoped static**: Menjaga kode tetap teratur (pemisahan logis) tanpa permintaan jaringan ekstra yang kompleks.
- **Scoped dynamic**: Pendekatan terbaik untuk _code splitting_ dan performa. Meminimalkan memori dengan memuat hanya apa yang dibutuhkan tampilan saat ini dan lokal yang aktif.

### Apa yang saya ukur:

Saya menjalankan aplikasi multibahasa yang sama di browser asli untuk setiap stack, lalu mencatat apa yang sebenarnya muncul di jaringan dan berapa lama waktu yang dibutuhkan. Ukuran dilaporkan **setelah kompresi web normal**, karena itu lebih mendekati apa yang sebenarnya diunduh orang daripada jumlah sumber mentah.

- **Ukuran library internasionalisasi**: Setelah pemaketan, tree-shaking, dan minifikasi, ukuran library i18n adalah ukuran kode provider (misalnya `NextIntlClientProvider`) + hook (misalnya `useTranslations`) dalam komponen kosong. Ini tidak termasuk pemuatan file terjemahan. Ini menjawab seberapa mahal library tersebut sebelum konten masuk dalam perhitungan.

- **JavaScript per halaman**: Untuk setiap rute benchmark, berapa banyak skrip yang ditarik browser untuk kunjungan tersebut, dirata-ratakan di seluruh halaman dalam suite (dan di seluruh lokal di mana laporan menggabungkannya). Halaman yang berat adalah halaman yang lambat.

- **Kebocoran dari lokal lain (Leakage)**: Ini adalah konten dari halaman yang sama tetapi dalam bahasa lain yang tidak sengaja dimuat di halaman yang diaudit. Konten ini tidak perlu dan harus dihindari (misalnya konten halaman `/fr/about` dalam bundle halaman `/en/about`).

- **Kebocoran dari rute lain**: Ide yang sama untuk **layar lain** di aplikasi: apakah teks mereka ikut terbawa saat Anda hanya membuka satu halaman (misalnya konten halaman `/en/about` dalam bundle halaman `/en/contact`). Skor tinggi menandakan pemisahan yang lemah atau bundle yang terlalu luas.

- **Ukuran bundle komponen rata-rata**: Bagian UI umum diukur **satu per satu** daripada bersembunyi di dalam satu angka aplikasi yang besar. Ini menunjukkan apakah internasionalisasi secara diam-diam membesarkan komponen sehari-hari. Misalnya, jika komponen Anda merender ulang, ia akan memuat semua data itu dari memori. Melampirkan JSON raksasa ke komponen mana pun, seperti menghubungkan gudang besar data yang tidak digunakan yang akan memperlambat performa komponen Anda.

- **Responsivitas pergantian bahasa**: Saya mengganti bahasa menggunakan kontrol aplikasi itu sendiri dan mencatat berapa lama waktu yang dibutuhkan hingga halaman benar-benar berganti — apa yang akan diperhatikan pengunjung, bukan langkah mikro laboratorium.

- **Pekerjaan render setelah perubahan bahasa**: Tindak lanjut yang lebih sempit: seberapa besar upaya yang dilakukan antarmuka untuk menggambar ulang bahasa baru setelah pergantian dilakukan. Berguna ketika waktu yang "dirasakan" dan biaya framework berbeda.

- **Waktu pemuatan halaman awal**: Dari navigasi hingga browser menganggap halaman dimuat sepenuhnya untuk skenario yang saya uji. Bagus untuk membandingkan cold start.

- **Waktu hidrasi (Hydration)**: Ketika aplikasi mengeksposnya, berapa lama waktu yang dihabiskan klien untuk mengubah HTML server menjadi sesuatu yang benar-benar dapat Anda klik. Tanda strip dalam tabel berarti implementasi tersebut tidak memberikan angka hidrasi yang andal dalam benchmark ini.

## Hasil secara terperinci

### 1 — Solusi yang harus dihindari

Beberapa solusi, seperti `gt-next` atau `lingo.dev`, jelas paling baik dihindari. Mereka menggabungkan ketergantungan pada vendor (vendor lock-in) dengan pengotoran basis kode Anda. Meskipun menghabiskan banyak waktu mencoba menerapkannya, saya tidak pernah berhasil membuatnya bekerja—baik di TanStack Start maupun di Next.js.

Masalah yang ditemui:

**(General Translation)** (`gt-next@6.16.5`):

- Untuk aplikasi 110kb, `gt-react` menambahkan lebih dari 440kb ekstra.
- `Quota Exceeded, please upgrade your plan` pada build pertama dengan General Translation.
- Terjemahan tidak dirender; saya mendapatkan error `Error: <T> used on the client-side outside of <GTProvider>`, yang tampaknya merupakan bug pada library.
- Saat menerapkan **gt-tanstack-start-react**, saya juga menemukan [masalah](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) dengan library tersebut: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, yang membuat aplikasi rusak. Setelah melaporkan masalah ini, pengelola memperbaikinya dalam waktu 24 jam.
- Library ini memblokir rendering statis halaman Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- Kuota AI terlampaui, memblokir seluruh build—sehingga Anda tidak dapat merilis ke produksi tanpa membayar.
- Kompilator melewatkan hampir 40% konten yang diterjemahkan. Saya harus menulis ulang semua `.map` menjadi blok komponen datar agar dapat berfungsi.
- CLI mereka penuh bug dan sering mereset file config tanpa alasan.
- Saat build, library ini menghapus total JSON yang dihasilkan ketika ada konten baru ditambahkan. Akibatnya, segelintir kunci dapat menghapus lebih dari 300 kunci yang ada.

### 2 — Solusi eksperimental

**(Wuchale)** (`wuchale@0.22.11`):

Ide di balik `Wuchale` menarik tetapi belum layak. Saya menemui masalah reaktivitas dan harus memaksa perenderan ulang provider untuk menjalankan aplikasi. Dokumentasinya juga cukup tidak jelas, yang membuat adopsi lebih sulit.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` menawarkan pendekatan yang inovatif dan terencana dengan baik. Meskipun demikian, dalam benchmark ini tree-shaking yang diiklankan perusahaan mereka tidak berfungsi untuk setup Next.js atau TanStack Start saya. Alur kerja dan DX lebih kompleks daripada opsi lainnya.
Secara pribadi saya tidak suka harus membuat ulang file JS sebelum setiap push, yang menciptakan risiko konflik merge konstan melalui PR. Alat ini juga tampak lebih fokus pada Vite daripada Next.js.
Terakhir, dibandingkan dengan solusi lain, Paraglide tidak menggunakan store (misalnya React context) untuk mengambil lokal saat ini untuk merender konten. Untuk setiap node yang di-parsing, ia akan meminta lokal dari localStorage / cookie dst. Ini mengarah pada eksekusi logika yang tidak perlu yang berdampak pada reaktivitas komponen.

### 3 — Solusi yang dapat diterima

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` mengatasi banyak masalah yang disebutkan sebelumnya. Saya merasa lebih sulit untuk mengadopsinya daripada alat serupa. Ia tidak memberikan type safety, yang juga membuat pendeteksian kunci yang hilang saat compile time lebih sulit. Saya harus membungkus fungsi Tolgee dengan fungsi saya sendiri untuk menambahkan deteksi kunci yang hilang.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` adalah opsi yang paling tren dan yang paling didorong oleh agen AI—tetapi menurut pandangan saya itu salah. Memulainya memang mudah. Dalam praktiknya, mengoptimalkan untuk membatasi kebocoran itu kompleks. Menggabungkan pemuatan dinamis + namespacing + tipe TypeScript sangat memperlambat pengembangan. Paket ini juga cukup berat (~13kb untuk `NextIntlClientProvider` + `useTranslations`, yang berarti lebih dari 2x lipat `next-intlayer`). **next-intl** dulu memblokir rendering statis halaman Next.js. Ia menyediakan helper bernama `setRequestLocale()`. Itu tampaknya sudah diatasi sebagian untuk file tersentralisasi seperti `en.json` / `fr.json`, tetapi rendering statis tetap rusak ketika konten dipisah ke dalam namespace seperti `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` mungkin adalah opsi yang paling populer karena merupakan salah satu solusi i18n pertama untuk aplikasi JavaScript. Ia memiliki banyak plugin komunitas. Ia memiliki kelemahan utama yang sama dengan `next-intl`. Paketnya sangat berat (~18kb untuk `I18nProvider` + `useTranslation`, sekitar 3x lipat `next-intlayer`).

Format pesan juga berbeda: `next-intl` menggunakan ICU MessageFormat, sementara `i18next` menggunakan formatnya sendiri.

**(Next International)** (`next-international@1.3.1`):

`next-international` juga menangani masalah di atas tetapi tidak jauh berbeda dari `next-intl` atau `next-i18next`. Ia menyertakan `scopedT()` untuk terjemahan spesifik namespace—tetapi menggunakannya pada dasarnya tidak berdampak pada ukuran bundle.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` sering dipuji. Secara pribadi saya merasa alur kerja `lingui extract` / `lingui compile` lebih kompleks daripada alternatifnya, tanpa keunggulan yang jelas. Saya juga menyadari sintaksis yang tidak konsisten yang membingungkan AI (misalnya `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Rekomendasi

**(Next Translate)** (`next-translate@3.1.2`):

`next-translate` adalah rekomendasi utama saya jika Anda menyukai API bergaya `t()`. Ini elegan melalui `next-translate-plugin`, memuat namespace melalui `getStaticProps` dengan loader Webpack / Turbopack. Ini juga merupakan opsi teringan di sini (~2,5kb). Untuk namespacing, mendefinisikan namespace per halaman atau rute di config dipikirkan dengan matang dan lebih mudah dipelihara daripada alternatif utama seperti **next-intl** atau **next-i18next**. Di versi `3.1.2`, saya mencatat bahwa rendering statis tidak berfungsi; Next.js kembali ke rendering dinamis.

**(Intlayer)** (`next-intlayer@8.7.5`):

Saya tidak akan secara pribadi menilai `next-intlayer` demi objektivitas, karena itu adalah solusi saya sendiri.

### Catatan pribadi

Catatan ini bersifat pribadi dan tidak memengaruhi hasil benchmark. Di dunia i18n Anda sering melihat konsensus seputar `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

Dalam aplikasi React, menyuntikkan fungsi sebagai `ReactNode` adalah, dalam pandangan saya, sebuah anti-pattern. Ini juga menambah kompleksitas yang dapat dihindari dan overhead eksekusi JavaScript (meskipun hampir tidak terlihat).
