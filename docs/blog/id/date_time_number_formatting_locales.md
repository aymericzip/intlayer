---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Memformat Tanggal dan Angka Berdasarkan Bahasa dengan Intl"
description: Anda kemungkinan besar tidak memerlukan pustaka pemformatan pihak ketiga. Cara Intl menangani tanggal, angka, mata uang, dan daftar per locale, biaya caching, dan bug zona waktu di produksi.
keywords:
  - format tanggal berdasarkan bahasa
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - format mata uang locale
  - format waktu relatif
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Memformat Tanggal dan Angka Berdasarkan Bahasa dengan Intl

Menerjemahkan teks hanyalah separuh bagian yang terlihat dari internasionalisasi (i18n). Separuh lainnya yang rutin memicu laporan bug adalah pemformatan: pengguna di Jerman melihat `1,234.56` alih-alih `1.234,56`, pengguna di Jepang melihat `08/02/2026` dan mengiranya bulan Agustus, atau tanggal yang dirender berbeda di server dan browser sehingga menyebabkan kerusakan hidrasi (hydration mismatch) di React.

Semua itu tidak memerlukan pustaka eksternal. API `Intl` bawaan sudah tersedia di setiap runtime modern.

## Daftar Isi

<TOC/>

## Mulailah dengan menghapus fungsi pembantu tanggal buatan sendiri

Hampir setiap basis kode memiliki fungsi `formatDate` yang ditulis sebelum tim memikirkan dukungan multi-bahasa. Fungsi ini biasanya mengunci urutan tertentu, pemisah tertentu, dan nama-nama bulan dalam bahasa Inggris.

```ts
// Kode yang perlu Anda hapus:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` menggantikannya sepenuhnya dan bekerja akurat untuk setiap locale:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Hal yang sama berlaku untuk angka. Memanggil `toFixed(2)` menghasilkan `1234.56` di mana saja, yang salah di sebagian besar negara Eropa.

## Apa Saja yang Dicakup oleh `Intl`

| API                       | Kegunaan                                                  |
| :------------------------ | :-------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Tanggal dan waktu dengan preset `dateStyle` / `timeStyle` |
| `Intl.NumberFormat`       | Desimal, mata uang, persentase, satuan, notasi ringkas    |
| `Intl.RelativeTimeFormat` | "3 hari yang lalu", "dalam 2 jam"                         |
| `Intl.ListFormat`         | "a, b, dan c" versus variasi bahasa lainnya               |
| `Intl.PluralRules`        | Menentukan kategori bentuk jamak untuk nilai numerik      |
| `Intl.Collator`           | Pengurutan string sesuai kaidah alfabetis bahasa setempat |

`Intl.Collator` adalah alat yang paling sering dilupakan. Menjalankan `array.sort()` standar pada string menggunakan urutan code point Unicode, sehingga karakter beraksen terlempar ke urutan setelah huruf `z` dan huruf khusus seperti `ö` berada di posisi yang keliru. Jika Anda mengurutkan daftar yang dilihat pengguna, selalu gunakan collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("id").compare);
// ["apple", "édouard", "zebra"]
```

## Utamakan preset daripada opsi yang dirangkai manual

`dateStyle` dan `timeStyle` membiarkan locale menentukan urutan logis dan pemisah yang tepat secara otomatis. Menentukan `year`, `month`, dan `day` secara individual memberi Anda kontrol yang sebenarnya tidak perlu, karena urutan yang tepat bervariasi menurut wilayah dan Anda berisiko menimpa standar CLDR dengan asumsi pribadi.

```ts
// Locale menentukan struktur yang benar:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Anda memaksakan struktur sendiri, dan salah di wilayah lain:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Gunakan komponen eksplisit hanya jika desain tampilan mutlak membutuhkan lebar tetap, seperti pada kolom tabel yang sempit.

## Membangun objek pemformat (formatter) itu mahal

Ini adalah detail performa yang krusial. Membangun sebuah `Intl.NumberFormat` memerlukan pemuatan data locale yang cukup besar ke memori, dan langkah ini jauh lebih berat daripada eksekusi `.format()` berikutnya. Menjalankannya di dalam perulangan render pada seribu baris data akan menimbulkan penurunan performa yang nyata.

```ts
// Membuat ulang formatter pada setiap baris (lambat):
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Buat sekali, gunakan berulang kali (cepat):
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` dan `toLocaleString()` menyembunyikan masalah yang sama: setiap pemanggilan membuat instansiasi formatter baru. Tidak masalah untuk satu nilai tunggal, tetapi sangat buruk untuk daftar data.

Simpan di cache berdasarkan kombinasi locale dan opsi:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Bug zona waktu yang hanya muncul di produksi

Masalah ini kerap menghabiskan waktu berjam-jam. Server merender tanggal saat SSR, browser melakukan hidrasi di sisi klien, dan React melempar error hydration mismatch karena kedua lingkungan menghasilkan teks yang berbeda.

Penyebabnya: `Intl.DateTimeFormat` menggunakan zona waktu sistem operasi lokal jika Anda tidak menentukannya secara eksplisit. Server produksi berjalan di UTC, sedangkan komputer lokal pengembang menggunakan zona waktu lain. Akibatnya bug tidak terlihat di lokal dan hanya meledak di produksi.

```ts
// Server di UTC dan browser di UTC+7 menghasilkan teks berbeda. Gagal hidrasi:
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Keduanya cocok sempurna tanpa celah:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Tiga pendekatan yang dapat diterapkan:

- **Kunci zona waktu** di server dan teruskan secara eksplisit. Stabil dan deterministik, tetapi semua orang melihat waktu UTC.
- **Render di sisi klien saja**, dengan placeholder netral saat proses di server. Akurat bagi pengguna, meski ada sedikit kedipan visual.
- **Simpan zona waktu pengguna** dan teruskan ke server maupun klien. Pengalaman terbaik dengan sedikit pekerjaan integrasi tambahan.

Pendekatan mana pun yang Anda pilih, selalu tentukan `timeZone` secara eksplisit untuk tanggal apa pun yang dirender di server dan klien. Tanggal tanpa zona waktu yang jelas adalah tanggal dengan dua nilai yang berbeda.

## Mata uang memerlukan kode mata uang, bukan locale

Locale dan mata uang adalah dua entitas independen. `fr-FR` tidak selalu berarti euro: pengguna di Prancis bisa saja sedang memeriksa faktur berdenominasi dolar AS.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

Locale mengatur pemisah, pengelompokan digit, dan letak simbol. Mata uang berasal dari data transaksi Anda. Mengasumsikan salah satu dari yang lain akan memicu kekeliruan pembukuan.

Perhatikan pula properti `currencyDisplay`. Pada antarmuka di mana beberapa mata uang berbagi simbol dolar ($), opsi `"code"` menghilangkan keraguan antara dolar AS, Kanada, dan Australia.

## Waktu relatif lebih mudah dipahami daripada waktu absolut

Untuk kejadian terkini, "2 jam yang lalu" jauh lebih nyaman dibaca daripada timestamp kaku, dan `Intl.RelativeTimeFormat` menangani lokalisasinya secara otomatis.

```ts
new Intl.RelativeTimeFormat("id", { numeric: "auto" }).format(-1, "day");
// "kemarin"
```

`numeric: "auto"` menghasilkan kata "kemarin" alih-alih bentuk numerik kaku "1 hari yang lalu".

## Apa yang Ditambahkan oleh Intlayer

Intlayer membungkus API ini ke dalam helper siap pakai dengan caching bawaan, membebaskan Anda dari keharusan mengelola Map secara manual, serta menerapkan bahasa yang aktif secara default tanpa harus mengoper argumen di setiap pemanggilan.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "€1.234,50"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 jam yang lalu"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilometer"
compact(1200); // "1,2 rb"
list(["apel", "pisang", "jeruk"]); // "apel, pisang, dan jeruk"
```

Fungsi `date()` juga mendukung preset (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`). Untuk React dan Vue, tersedia hook dan composable yang langsung mengekstrak bahasa aktif dari konteks.

Ini adalah lapisan cache dan penyediaan default bahasa di atas API bawaan platform. Logika pemformatannya sendiri sepenuhnya bersumber dari `Intl`. Rincian lengkap tersedia di [dokumentasi formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md).

## Kesalahan umum

- **`toLocaleDateString()` tanpa menentukan locale.** Bergantung pada konfigurasi wadah kontainer di server.
- **Melakukan pemformatan di dalam loop tanpa cache.** Instansiasi formatters memakan mayoritas waktu komputasi.
- **Menghilangkan `timeZone` pada tanggal isomorfik.** Menghasilkan error hidrasi yang tidak pernah terjadi di mesin pengembang.
- **Menyimpulkan mata uang dari locale.** `fr-FR` tidak menjamin transaksi dalam euro.
- **Menggunakan `sort()` biasa pada string yang tampil di layar.** Selalu gunakan `Intl.Collator`.
- **Menuliskan nama bulan atau hari secara hardcode.** Seluruhnya sudah tersedia di CLDR untuk setiap bahasa.
- **Mempertahankan `numeric: "always"` pada waktu relatif.** Menghasilkan "1 hari yang lalu" di bahasa yang memiliki kata seperti kemarin.

## Pelajari lebih lanjut

- [Formatters dan utilitas bahasa: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)
- [Panduan konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Laporan benchmark performa framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Adapter kompatibilitas react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md)
- [Format pesan ICU: bentuk jamak, seleksi, dan skeleton angka](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md)
- [Cara menguji terjemahan, termasuk cakupan formatter dan bentuk jamak](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_testing_strategies.md)
- [Apa saja yang sebenarnya dicakup oleh internasionalisasi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/what_is_internationalization.md)
