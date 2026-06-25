---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Solusi i18n Terbaik untuk Svelte di Tahun 2026 - Laporan Benchmark
description: Bandingkan pustaka internasionalisasi (i18n) Svelte seperti svelte-i18n, Paraglide, dan Intlayer. Laporan performa mendetail tentang ukuran bundle, kebocoran, dan reaktivitas.
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - performa
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: aymericzip
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "Tambahkan perbandingan bintang GitHub"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inisialisasi benchmark"
---

# Pustaka i18n Svelte - Laporan Benchmark 2026

Halaman ini adalah laporan benchmark untuk solusi i18n pada Svelte.

## Daftar Isi

<Toc/>

## Benchmark Interaktif

<I18nBenchmark framework="vite-svelte" vertical/>

## Referensi hasil:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Lihat data benchmark lengkap](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

Lihat repositori benchmark lengkap [di sini](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Pendahuluan

Solusi internasionalisasi adalah salah satu dependensi terberat dalam aplikasi Svelte. Risiko utamanya adalah mengirimkan konten yang tidak perlu: terjemahan untuk halaman lain dan bahasa lain dalam satu bundle rute.

Seiring berkembangnya aplikasi Anda, masalah tersebut dapat dengan cepat membengkak JavaScript yang dikirim ke klien dan memperlambat navigasi.

Dalam praktiknya, untuk implementasi yang paling tidak dioptimalkan, halaman yang diinternasionalisasi bisa berakhir beberapa kali lebih berat daripada versi tanpa i18n.

Dampak lainnya adalah pada pengalaman pengembang (DX): bagaimana Anda mendeklarasikan konten, tipe data, organisasi namespace, pemuatan dinamis, dan reaktivitas saat bahasa berubah.

## TL;DR

- **Intlayer**: Pilihan paling efisien dalam performa (v8.7.12) dengan footprint terkecil.
- **Paraglide**: Kontender kuat untuk tree-shaking tetapi memiliki pengalaman pengembang yang lebih kompleks dan overhead reaktivitas.
- **svelte-i18n**: Komprehensif dan standar untuk Svelte, tetapi membawa beban bundle yang jauh lebih besar (~7× Intlayer).

## Uji aplikasi Anda

Untuk mendeteksi masalah kebocoran i18n dengan cepat, saya menyiapkan pemindai gratis yang tersedia [di sini](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Masalahnya

Dua tuas sangat penting untuk membatasi biaya aplikasi multibahasa:

- Pisahkan konten berdasarkan halaman / namespace agar Anda tidak memuat seluruh kamus saat tidak dibutuhkan.
- Muat bahasa yang tepat secara dinamis, hanya saat dibutuhkan.

Memahami batasan teknis dari pendekatan ini:

**Pemuatan dinamis**

Tanpa pemuatan dinamis, sebagian besar solusi menyimpan pesan dalam memori sejak render pertama, yang menambah overhead signifikan untuk aplikasi dengan banyak rute dan bahasa.

Dengan pemuatan dinamis, Anda menerima kompromi: JS awal yang lebih sedikit, tetapi terkadang permintaan ekstra saat mengganti bahasa.

**Pemisahan konten (Splitting)**

Sintaks yang dibangun di sekitar `t('a.b.c')` sangat nyaman tetapi sering kali mendorong penyimpanan objek JSON besar saat runtime. Model tersebut membuat tree-shaking sulit kecuali pustaka menawarkan strategi pemisahan per halaman yang nyata.

## Metodologi Penelitian

Untuk benchmark ini, kami membandingkan pustaka berikut:

- `Base App` (Tanpa pustaka i18n)
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

Framework yang digunakan adalah `Svelte` dengan aplikasi multibahasa yang terdiri dari **10 halaman** dan **10 bahasa**.

Kami membandingkan **empat strategi pemuatan**:

| Strategia            | Tanpa namespace (global)                            | Dengan namespace (scoped)                                                        |
| :------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------- |
| **Pemuatan statis**  | **Static**: Segalanya di memori saat startup.       | **Scoped static**: Dipisah berdasarkan namespace; segalanya dimuat saat startup. |
| **Pemuatan dinamis** | **Dynamic**: Pemuatan sesuai permintaan per bahasa. | **Scoped dynamic**: Pemuatan granular per namespace dan bahasa.                  |

## Ringkasan strategi

- **Static**: Sederhana; tidak ada latensi jaringan setelah pemuatan awal. Kekurangan: ukuran bundle besar.
- **Dynamic**: Mengurangi beban awal (lazy-loading). Ideal bila Anda memiliki banyak bahasa.
- **Scoped static**: Menjaga kode tetap teratur (pemisahan logis) tanpa permintaan jaringan ekstra yang kompleks.
- **Scoped dynamic**: Pendekatan terbaik untuk _code splitting_ dan performa. Meminimalkan memori dengan hanya memuat apa yang dibutuhkan oleh tampilan saat ini dan bahasa yang aktif.

### Apa yang saya ukur:

Saya menjalankan aplikasi multibahasa yang sama di browser nyata untuk setiap stack, kemudian mencatat apa yang sebenarnya muncul di wire dan berapa lama waktu yang dibutuhkan. Ukuran dilaporkan **setelah kompresi web normal**, karena itu lebih dekat dengan apa yang orang unduh daripada hitungan sumber mentah.

- **Ukuran library internationalization**: Setelah bundling, tree-shaking dan minification, ukuran library i18n adalah ukuran kode providers + stores dalam komponen kosong. Ini tidak termasuk pemuatan file terjemahan. Ini menjawab seberapa mahal library sebelum konten Anda memasuki gambaran.

- **JavaScript per halaman**: Untuk setiap rute benchmark, berapa banyak script yang browser tarik untuk kunjungan itu, dirata-ratakan di seluruh halaman dalam suite (dan di seluruh locale di mana laporan menggabungkannya). Halaman berat adalah halaman lambat.

- **Kebocoran dari locale lain**: Ini adalah konten halaman yang sama tetapi dalam bahasa lain yang akan dimuat secara tidak sengaja di halaman yang diaudit. Konten ini tidak perlu dan harus dihindari. (misalnya, konten halaman `/fr/about` dalam bundel halaman `/en/about`)

- **Kebocoran dari rute lain**: Ide yang sama untuk **layar lain** di aplikasi: apakah salinannya ikut ketika Anda hanya membuka satu halaman. (misalnya, konten halaman `/en/about` dalam bundel halaman `/en/contact`). Skor tinggi menunjukkan pemisahan lemah atau bundel yang terlalu luas.

- **Ukuran bundel komponen rata-rata**: Piece UI umum diukur **satu per satu** daripada bersembunyi di dalam satu angka aplikasi raksasa. Ini menunjukkan apakah internationalization diam-diam membengkak komponen sehari-hari. Misalnya, jika komponen Anda merender ulang, komponen akan memuat semua data itu dari memori. Melampirkan JSON raksasa ke komponen apa pun seperti menghubungkan penyimpanan data yang tidak digunakan yang akan memperlambat kinerja komponen Anda.

- **Responsivitas switch bahasa**: Saya membalik bahasa menggunakan kontrol aplikasi sendiri dan mengukur berapa lama waktu yang dibutuhkan hingga halaman telah jelas beralih, apa yang akan diperhatikan pengunjung, bukan micro-step lab.

- **Rendering work setelah perubahan bahasa**: Tindak lanjut yang lebih sempit: seberapa banyak upaya yang dibutuhkan antarmuka untuk melukis ulang bahasa baru setelah switch sedang berlangsung. Berguna ketika "terasa" waktu dan biaya framework menyimpang.

- **Waktu pemuatan halaman awal**: Dari navigasi ke browser menganggap halaman sepenuhnya dimuat untuk skenario yang saya uji. Baik untuk membandingkan cold start.

- **Waktu hydration**: Ketika aplikasi memperlihatkannya, berapa lama klien menghabiskan waktu mengubah HTML server menjadi sesuatu yang benar-benar bisa Anda klik. Tanda garis dalam tabel berarti implementasi itu tidak memberikan gambar hydration yang dapat diandalkan dalam benchmark ini.

## Bintang GitHub

Bintang GitHub adalah indikator kuat dari popularitas proyek, kepercayaan komunitas, dan relevansi jangka panjang. Meskipun bukan ukuran langsung dari kualitas teknis, bintang-bintang tersebut mencerminkan berapa banyak pengembang yang menganggap proyek tersebut berguna, mengikuti kemajuannya, dan kemungkinan akan mengadopsinya. Untuk memperkirakan nilai suatu proyek, bintang membantu membandingkan daya tarik di berbagai alternatif dan memberikan wawasan tentang pertumbuhan ekosistem.

[![Star History Chart](https://api.star-history.com/chart?repos=kaisermann%2Fsvelte-i18n%2Copral%2Fparaglide-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#kaisermann/svelte-i18n&opral/paraglide-js&aymericzip/intlayer)

## Hasil secara mendetail

### 1 - Solusi yang harus dihindari

> Tidak ada solusi yang jelas untuk dihindari dalam ekosistem Svelte.

### 2 - Solusi yang dapat diterima

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

`Paraglide` menawarkan pendekatan yang inovatif dan dipikirkan dengan matang. Dalam konteks aplikasi Vite + Svelte, tree-shaking yang diiklankan perusahaan mereka bekerja seperti yang diharapkan, yang mana sangat bagus.
Tetapi dalam kasus React + TanStack Start, tree-shaking tidak bekerja seperti yang diharapkan, sama halnya untuk Next.js. Karena itu, penggunaan Paraglide dalam proyek Svelte dan TanStack Start layak untuk diperiksa ulang.
Alur kerja dan DX juga lebih kompleks daripada opsi lainnya.
Secara pribadi saya bukan penggemar keharusan untuk meregenerasi file JS sebelum setiap push, yang menciptakan risiko konflik merge yang konstan melalui PR. Alat ini juga tampaknya lebih fokus pada Vite daripada Next.js.
Terakhir, dibandingkan dengan solusi lain, Paraglide tidak menggunakan store (misalnya Svelte store) untuk mengambil locale saat ini guna merender konten. Untuk setiap node yang di-parse, ia akan meminta locale dari localStorage / cookie dll. Hal ini menyebabkan eksekusi logika yang tidak perlu yang berdampak pada reaktivitas komponen.

> Catatan tentang paraglide: solusi ini menginjeksi kode ke dalam codebase Anda untuk impor; hasilnya, metrik 'lib size' dalam laporan benchmark hampir 0. Pembuatan kode (Code generation) adalah hal yang baik, karena fungsi yang digunakan hanya akan menyertakan logika yang diperlukan (prefix di mana-mana vs tanpa prefix, cookie vs storage, dll.). Sebagai perbandingan, Intlayer melakukan pemfilteran ini melalui injeksi variabel lingkungan dalam build untuk memaksa bundler melakukan tree-shaking konten tergantung pada logika. Berkat ini, paraglide dan intlayer akhirnya menjadi solusi yang 6 hingga 10 kali lebih ringan daripada i18next atau next-intl.

**(svelte-i18n)** (`svelte-i18n@3.4.0`):

Solusi ini menjawab semua kebutuhan i18n dalam proyek Svelte. Tetapi seperti halnya i18next atau solusi i18n besar lainnya, ia sedikit berat (~15.9kb, yang mana sekitar 7× `svelte-intlayer`).

### 3 - Rekomendasi

**(Intlayer)** (`svelte-intlayer@8.7.12`):

Saya tidak akan menilai `svelte-intlayer` secara pribadi demi objektivitas, karena ini adalah solusi saya sendiri.

### Catatan pribadi

Catatan ini bersifat pribadi dan tidak memengaruhi hasil benchmark. Namun, di dunia i18n Anda sering melihat konsensus seputar pola seperti `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` untuk konten terjemahan.

Dalam aplikasi Svelte, menginjeksi fungsi sebagai `Slot` menurut pandangan saya adalah sebuah anti-pattern. Hal ini juga menambah kompleksitas yang dapat dihindari dan overhead eksekusi JavaScript (meskipun hampir tidak terlihat).
