---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Solusi i18n terbaik untuk TanStack Start tahun 2026 - Laporan Benchmark
description: Bandingkan library internasionalisasi TanStack Start seperti react-i18next, use-intl, dan Intlayer. Laporan performa terperinci tentang ukuran bundle, kebocoran, dan reaktivitas.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - performa
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inisialisasi benchmark"
---

# Library i18n TanStack Start — Laporan Benchmark 2026

Halaman ini adalah laporan benchmark untuk solusi i18n pada TanStack Start.

## Daftar Isi

<Toc/>

## Benchmark Interaktif

<I18nBenchmark framework="tanstack" vertical/>

## Referensi hasil:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md

Lihat repositori benchmark lengkap [di sini](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Pendahuluan

Solusi internasionalisasi adalah salah satu dependensi terberat dalam aplikasi React. Pada TanStack Start, risiko utamanya adalah mengirimkan konten yang tidak perlu: terjemahan untuk halaman lain dan lokal lain dalam bundle rute tunggal.

Seiring berkembangnya aplikasi Anda, masalah tersebut dapat dengan cepat meledakkan JavaScript yang dikirim ke klien dan memperlambat navigasi.

Dalam praktiknya, untuk implementasi yang paling tidak dioptimalkan, halaman yang diinternasionalisasi bisa menjadi beberapa kali lebih berat daripada versi tanpa i18n.

Dampak lainnya adalah pada pengalaman pengembang (DX): bagaimana Anda mendeklarasikan konten, tipe, organisasi namespace, pemuatan dinamis, dan reaktivitas saat lokal berubah.

## Uji aplikasi Anda

Untuk mendeteksi masalah kebocoran i18n dengan cepat, saya menyiapkan pemindai gratis yang tersedia [di sini](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Masalah

Dua pengungkit sangat penting untuk membatasi biaya aplikasi multibahasa:

- Memisahkan konten per halaman / namespace sehingga Anda tidak memuat seluruh kamus saat tidak membutuhkannya.
- Memuat lokal yang tepat secara dinamis, hanya saat dibutuhkan.

Memahami batasan teknis dari pendekatan ini:

**Pemuatan dinamis**

Tanpa pemuatan dinamis, sebagian besar solusi menyimpan pesan dalam memori sejak render pertama, yang menambah overhead signifikan untuk aplikasi dengan banyak rute dan lokal.

Dengan pemuatan dinamis, Anda menerima trade-off: JS awal yang lebih sedikit, tetapi terkadang permintaan ekstra saat mengganti bahasa.

**Pemisahan konten (Content splitting)**

Sintaksis yang dibangun di sekitar `const t = useTranslation()` + `t('a.b.c')` sangat nyaman tetapi seringkali mendorong penyimpanan objek JSON besar pada saat runtime. Model tersebut membuat tree-shaking sulit kecuali library menawarkan strategi pemisahan per halaman yang nyata.

## Metodologi

Untuk benchmark ini, kami membandingkan library berikut:

- `Base App` (Tanpa library i18n)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

Framework yang digunakan adalah `TanStack Start` dengan aplikasi multibahasa yang terdiri dari **10 halaman** dan **10 bahasa**.

Kami membandingkan **empat strategi pemuatan**:

| Strategi             | Tanpa namespace (global)                     | Dengan namespace (terlingkup/scoped)                                    |
| :------------------- | :------------------------------------------- | :---------------------------------------------------------------------- |
| **Pemuatu statis**   | **Static**: Semuanya di memori saat startup. | **Scoped static**: Dipisah per namespace; semuanya dimuat saat startup. |
| **Pemuatan dinamis** | **Dynamic**: Pemuatan on-demand per lokal.   | **Scoped dynamic**: Pemuatan granular per namespace dan lokal.          |

## Ringkasan strategi

- **Static**: Sederhana; tidak ada latensi jaringan setelah pemuatan awal. Kekurangannya: ukuran bundle yang besar.
- **Dynamic**: Mengurangi beban awal (lazy-loading). Ideal bila Anda memiliki banyak lokal.
- **Scoped static**: Menjaga kode tetap teratur (pemisahan logis) tanpa permintaan jaringan ekstra yang kompleks.
- **Scoped dynamic**: Pendekatan terbaik untuk _code splitting_ dan performa. Meminimalkan memori dengan memuat hanya apa yang dibutuhkan tampilan saat ini dan lokal yang aktif.

## Hasil secara terperinci

### 1 — Solusi yang harus dihindari

Beberapa solusi, seperti `gt-react` atau `lingo.dev`, jelas merupakan solusi yang sebaiknya dihindari. Mereka menggabungkan ketergantungan pada vendor (vendor lock-in) dengan pengotoran basis kode Anda. Lebih buruk lagi: meskipun menghabiskan banyak waktu mencoba menerapkannya, saya tidak pernah berhasil membuatnya bekerja dengan benar di TanStack Start (mirip dengan Next.js dengan `gt-next`).

Masalah yang ditemui:

**(General Translation)** (`gt-react@latest`):

- Untuk aplikasi sekitar 110kb, `gt-react` dapat menambahkan lebih dari 440kb ekstra (besaran yang sama seperti yang terlihat pada implementasi Next.js dalam benchmark yang sama).
- `Quota Exceeded, please upgrade your plan` pada build pertama dengan General Translation.
- Terjemahan tidak dirender; saya mendapatkan error `Error: <T> used on the client-side outside of <GTProvider>`, yang tampaknya merupakan bug pada library tersebut.
- Saat menerapkan **gt-tanstack-start-react**, saya juga menemukan [masalah](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) dengan library tersebut: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, yang membuat aplikasi rusak. Setelah melaporkan masalah ini, pengelola memperbaikinya dalam waktu 24 jam.
- Library ini menggunakan anti-pattern melalui fungsi `initializeGT()`, yang memblokir bundle dari tree-shaking secara bersih.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- Kuota AI terlampaui (atau memblokir dependensi server), membuat build / produksi berisiko tanpa membayar.
- Kompilator melewatkan hampir 40% konten yang diterjemahkan. Saya harus menulis ulang semua `.map` menjadi blok komponen datar agar dapat berfungsi.
- CLI mereka penuh bug dan sering mereset file config tanpa alasan.
- Saat build, library ini menghapus total JSON yang dihasilkan ketika ada konten baru ditambahkan. Akibatnya, Anda bisa berakhir dengan hanya beberapa kunci yang menghapus ratusan kunci yang ada.
- Saya menemui masalah reaktivitas dengan library tersebut di TanStack Start: saat lokal berubah saya harus memaksa perenderan ulang provider agar berfungsi.

### 2 — Solusi eksperimental

**(Wuchale)** (`wuchale@0.22.11`):

Ide di balik `Wuchale` menarik tetapi belum menjadi solusi yang layak. Saya menemui masalah reaktivitas dengan library tersebut dan harus memaksa perenderan ulang provider untuk menjalankan aplikasi di TanStack Start. Dokumentasinya juga cukup tidak jelas, yang membuat adopsi lebih sulit.

### 3 — Solusi yang dapat diterima

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` menawarkan pendekatan yang inovatif dan terencana dengan baik. Meskipun demikian, dalam benchmark ini tree-shaking yang diiklankan perusahaan mereka tidak berfungsi untuk implementasi Next.js saya atau untuk TanStack Start. Alur kerja dan DX-nya juga lebih kompleks daripada opsi lainnya. Secara pribadi saya bukan penggemar keharusan untuk membuat ulang file JS sebelum setiap push, yang menciptakan risiko konflik merge yang konstan bagi pengembang melalui PR.

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` mengatasi banyak masalah yang disebutkan sebelumnya. Saya merasa lebih sulit untuk memulai adopsi Tolgee dibandingkan alat lain dengan pendekatan serupa. Ia tidak memberikan type safety, yang juga membuat pendeteksian kunci yang hilang saat compile time jauh lebih sulit. Saya harus membungkus API Tolgee dengan API saya sendiri untuk menambahkan deteksi kunci yang hilang.

Pada TanStack Start saya juga memiliki masalah reaktivitas: saat lokal berubah, saya harus memaksa provider untuk me-render ulang dan berlangganan ke event perubahan lokal sehingga pemuatan dalam bahasa lain berperilaku dengan benar.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl` adalah bagian "intl" paling modis di ekosistem React (keluarga yang sama dengan `next-intl`) dan sering didorong oleh agen AI—tetapi menurut pandangan saya itu salah dalam pengaturan yang mementingkan performa. Memulainya cukup sederhana. Dalam praktiknya, proses untuk mengoptimalkan dan membatasi kebocoran cukup kompleks. Demikian juga, menggabungkan pemuatan dinamis + namespacing + tipe TypeScript sangat memperlambat pengembangan.

Pada TanStack Start Anda menghindari jebakan khusus Next.js (`setRequestLocale`, rendering statis), tetapi masalah intinya sama: tanpa disiplin yang ketat, bundle dengan cepat membawa terlalu banyak pesan dan pemeliharaan namespace per rute menjadi menyakitkan.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` mungkin adalah opsi yang paling populer karena merupakan salah satu yang pertama melayani kebutuhan i18n aplikasi JavaScript. Ia juga memiliki serangkaian plugin komunitas yang luas untuk masalah tertentu.

Namun, ia memiliki kelemahan utama yang sama dengan stack yang dibangun di atas `t('a.b.c')`: optimasi dimungkinkan tetapi sangat memakan waktu, dan proyek besar berisiko jatuh ke dalam praktik buruk (namespace + pemuatan dinamis + tipe).

Format pesan juga berbeda: `use-intl` menggunakan ICU MessageFormat, sementara `i18next` menggunakan formatnya sendiri—yang memperumit tooling atau migrasi jika Anda mencampurnya.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` sering dipuji. Secara pribadi saya merasa alur kerja di sekitar `lingui extract` / `lingui compile` lebih kompleks daripada pendekatan lain, tanpa keunggulan yang jelas dalam benchmark TanStack Start ini. Saya juga menyadari sintaksis yang tidak konsisten yang membingungkan AI (misalnya `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

`react-intl` adalah implementasi performa dari tim Format.js. DX-nya tetap verbose: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` menambah kompleksitas, kerja JavaScript ekstra, dan mengikat instance i18n global ke banyak node di tree React.

### 4 — Rekomendasi

Benchmark TanStack Start ini tidak memiliki padanan langsung untuk `next-translate` (plugin Next.js + `getStaticProps`). Bagi tim yang benar-benar menginginkan API `t()` dengan ekosistem yang matang, `react-i18next` dan `use-intl` tetap menjadi pilihan yang "masuk akal"—tetapi bersiaplah untuk menghabiskan banyak waktu mengoptimalkan untuk menghindari kebocoran.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

Saya tidak akan secara pribadi menilai `react-intlayer` demi objektivitas, karena itu adalah solusi saya sendiri.

### Catatan pribadi

Catatan ini bersifat pribadi dan tidak memengaruhi hasil benchmark. Namun, di dunia i18n Anda sering melihat konsensus seputar pola seperti `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` untuk konten terjemahan.

Dalam aplikasi React, menyuntikkan fungsi sebagai `ReactNode` adalah, dalam pandangan saya, sebuah anti-pattern. Ini juga menambah kompleksitas yang dapat dihindari dan overhead eksekusi JavaScript (meskipun hampir tidak terlihat).
