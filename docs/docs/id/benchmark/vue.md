---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Solusi i18n Terbaik untuk Vue di Tahun 2026 - Laporan Benchmark
description: Bandingkan pustaka internasionalisasi (i18n) Vue seperti vue-i18n, fluent-vue, dan Intlayer. Laporan performa mendetail tentang ukuran bundle, kebocoran, dan reaktivitas.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - performa
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inisialisasi benchmark"
---

# Pustaka i18n Vue — Laporan Benchmark 2026

Halaman ini adalah laporan benchmark untuk solusi i18n pada Vue.

## Daftar Isi

<Toc/>

## Benchmark Interaktif

<I18nBenchmark framework="vite-vue" vertical/>

## Referensi hasil:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md

Lihat repositori benchmark lengkap [di sini](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Pendahuluan

Solusi internasionalisasi adalah salah satu dependensi terberat dalam aplikasi Vue. Risiko utamanya adalah mengirimkan konten yang tidak perlu: terjemahan untuk halaman lain dan bahasa lain dalam satu bundle rute.

Seiring berkembangnya aplikasi Anda, masalah tersebut dapat dengan cepat membengkak JavaScript yang dikirim ke klien dan memperlambat navigasi.

Dalam praktiknya, untuk implementasi yang paling tidak dioptimalkan, halaman yang diinternasionalisasi bisa berakhir beberapa kali lebih berat daripada versi tanpa i18n.

Dampak lainnya adalah pada pengalaman pengembang (DX): bagaimana Anda mendeklarasikan konten, tipe data, organisasi namespace, pemuatan dinamis, dan reaktivitas saat bahasa berubah.

## TL;DR

- **Intlayer**: Solusi paling ringan (v8.7.12) dengan scoping bawaan dan pemuatan dinamis.
- **vue-i18n**: Standar industri dengan ekosistem yang kaya, tetapi bisa menjadi jauh lebih berat dan sulit dioptimalkan untuk code-splitting dalam aplikasi besar.
- **fluent-vue**: Organisasi pesan yang inovatif tetapi kurang dalam keamanan tipe (type-safety) dan ternyata merupakan solusi yang sangat berat.

## Uji aplikasi Anda

Untuk mendeteksi masalah kebocoran i18n dengan cepat, saya menyiapkan pemindai gratis yang tersedia [di sini](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Masalahnya

Dua tuas sangat penting untuk membatasi biaya aplikasi multibahasa:

- Pisahkan konten berdasarkan halaman / namespace agar Anda tidak memuat seluruh kamus saat tidak dibutuhkan.
- Muat bahasa yang tepat secara dinamis, hanya saat dibutuhkan.

Memahami batasan teknis dari pendekatan ini:

**Pemuatan dinamis**

Tanpa pemuatan dinamis, sebagian besar solusi menyimpan pesan dalam memori sejak render pertama, yang menambah overhead signifikan untuk aplikasi dengan banyak rute dan bahasa.

Dengan pemuatan dinamis, Anda menerima kompromi: JS awal yang lebih sedikit, tetapi terkadang permintaan ekstra saat mengganti bahasa.

**Pemisahan konten (Splitting)**

Sintaks yang dibangun di sekitar `const { t } = useI18n()` + `t('a.b.c')` sangat nyaman tetapi sering kali mendorong penyimpanan objek JSON besar saat runtime. Model tersebut membuat tree-shaking sulit kecuali pustaka menawarkan strategi pemisahan per halaman yang nyata.

## Metodologi Penelitian

Untuk benchmark ini, kami membandingkan pustaka berikut:

- `Base App` (Tanpa pustaka i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Framework yang digunakan adalah `Vue` dengan aplikasi multibahasa yang terdiri dari **10 halaman** dan **10 bahasa**.

Kami membandingkan **empat strategi pemuatan**:

| Strategi             | Tanpa namespace (global)                            | Dengan namespace (scoped)                                                        |
| :------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------- |
| **Pemuatan statis**  | **Static**: Segalanya di memori saat startup.       | **Scoped static**: Dipisah berdasarkan namespace; segalanya dimuat saat startup. |
| **Pemuatan dinamis** | **Dynamic**: Pemuatan sesuai permintaan per bahasa. | **Scoped dynamic**: Pemuatan granular per namespace dan bahasa.                  |

## Ringkasan strategi

- **Static**: Sederhana; tidak ada latensi jaringan setelah pemuatan awal. Kekurangan: ukuran bundle besar.
- **Dynamic**: Mengurangi beban awal (lazy-loading). Ideal bila Anda memiliki banyak bahasa.
- **Scoped static**: Menjaga kode tetap teratur (pemisahan logis) tanpa permintaan jaringan ekstra yang kompleks.
- **Scoped dynamic**: Pendekatan terbaik untuk _code splitting_ dan performa. Meminimalkan memori dengan hanya memuat apa yang dibutuhkan oleh tampilan saat ini dan bahasa yang aktif.

### Apa yang saya ukur:

Saya menjalankan aplikasi multibahasa yang sama di browser asli untuk setiap stack, lalu mencatat apa yang sebenarnya muncul di jaringan dan berapa lama waktu yang dibutuhkan. Ukuran dilaporkan **setelah kompresi web normal**, karena itu lebih dekat dengan apa yang sebenarnya diunduh orang daripada hitungan kode sumber mentah.

- **Ukuran pustaka internasionalisasi**: Setelah pembundelan, tree-shaking, dan minifikasi, ukuran pustaka i18n adalah ukuran kode provider + composable dalam komponen kosong. Ini tidak termasuk pemuatan file terjemahan. Ini menjawab seberapa "mahal" pustaka tersebut sebelum konten Anda masuk.

- **JavaScript per halaman**: Untuk setiap rute benchmark, seberapa banyak skrip yang ditarik browser untuk kunjungan tersebut, dirata-ratakan di seluruh halaman dalam pengujian (dan di seluruh bahasa). Halaman yang berat adalah halaman yang lambat.

- **Kebocoran dari bahasa lain (Leakage)**: Ini adalah konten dari halaman yang sama tetapi dalam bahasa lain yang akan dimuat secara tidak sengaja di halaman yang sedang diaudit. Konten ini tidak perlu dan harus dihindari (misalnya: konten halaman `/fr/about` dalam bundle halaman `/en/about`).

- **Kebocoran dari rute lain**: Ide yang sama untuk **layar lain** dalam aplikasi: apakah teks mereka ikut terbawa saat Anda hanya membuka satu halaman (misalnya: konten halaman `/en/about` dalam bundle halaman `/en/contact`). Skor tinggi menandakan pemisahan yang lemah atau bundle yang terlalu luas.

- **Ukuran rata-rata bundle komponen**: Potongan UI umum diukur **satu per satu** alih-alih bersembunyi di dalam satu angka aplikasi raksasa. Ini menunjukkan apakah internasionalisasi secara diam-diam membengkakkan komponen sehari-hari. Misalnya, jika komponen Anda merender ulang, ia akan memuat semua data tersebut dari memori. Melampirkan JSON raksasa ke komponen mana pun seperti menghubungkan gudang besar data yang tidak terpakai yang akan memperlambat performa komponen Anda.

- **Responsivitas perpindahan bahasa**: Saya mengganti bahasa menggunakan kontrol aplikasi itu sendiri dan menghitung waktu hingga halaman benar-benar beralih, apa yang akan diperhatikan oleh pengunjung.

- **Pekerjaan rendering setelah perubahan bahasa**: Tindak lanjut yang lebih sempit: seberapa besar upaya antarmuka untuk menggambar ulang untuk bahasa baru setelah perpindahan dimulai. Berguna saat waktu yang "dirasakan" dan biaya framework berbeda.

- **Waktu pemuatan halaman awal**: Dari navigasi hingga browser menganggap halaman dimuat sepenuhnya untuk skenario yang saya uji. Bagus untuk membandingkan cold start.

- **Waktu hidrasi (Hydration)**: Waktu yang dihabiskan klien untuk mengubah HTML server menjadi antarmuka interaktif. Tanda hubung dalam tabel berarti implementasi tersebut tidak memberikan angka hidrasi yang andal dalam benchmark ini.

## Hasil secara mendetail

### 1 — Solusi yang harus dihindari

> Tidak ada solusi yang jelas untuk dihindari dalam ekosistem Vue.

### 2 — Solusi yang dapat diterima

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** tanpa keraguan adalah pustaka i18n yang paling banyak digunakan untuk Vue, ia memiliki banyak fitur dan ekosistem yang besar. Namun di balik layar solusinya cukup berat. Meskipun vue-i18n mengintegrasikan lazy loading untuk pesan, ia melewatkan fitur scoping. Dalam kasus aplikasi Vue SPA klasik tidak ada masalah, tetapi untuk aplikasi Nuxt, menggunakan @nuxt/i18n, hal itu menyebabkan penyertaan pesan dari semua halaman ke dalam satu halaman. Untuk aplikasi Nuxt besar yang mencakup lebih dari 10 halaman, ini bisa menjadi sangat bermasalah.

Paketnya sangat berat (~24.3kb, yang mana sekitar 9× `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** menawarkan satu upaya inovasi melalui format .ftl. Organisasi pesan sangat bagus, lebih mudah untuk memulai. Namun dalam praktiknya, kurangnya keamanan tipe meningkatkan risiko kesalahan dan dapat dengan cepat memakan waktu untuk proses debug. Selain itu, solusi tersebut memuat pesan menggunakan plugin vite yang memaksa pemuatan semua konten dalam semua bahasa ke setiap halaman. Selain itu, ini adalah solusi yang sangat berat (~92.7kb, yang mana sekitar 34× `vue-intlayer`).

### 3 — Rekomendasi

**(Intlayer)** (`vue-intlayer@8.7.12`):

Saya tidak akan menilai `vue-intlayer` secara pribadi demi objektivitas, karena ini adalah solusi saya sendiri.
