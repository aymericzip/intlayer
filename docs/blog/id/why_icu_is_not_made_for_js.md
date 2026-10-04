---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Mengapa ICU MessageFormat Tidak Dibuat untuk JavaScript
description: "ICU MessageFormat awalnya dirancang untuk Java dan C++. Di browser, dukungan penuh membebani sekitar 10 KB kode parser. Dari mana biaya tersebut berasal, serta alternatifnya."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - ukuran bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - pluralisasi i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Mengapa ICU MessageFormat Tidak Dibuat untuk JavaScript

ICU MessageFormat adalah standar yang andal. Format ini lengkap, dipahami secara luas oleh penerjemah, dan dapat diproses oleh sebagian besar sistem manajemen terjemahan (TMS). Masalah utamanya terletak pada lingkungan runtime asalnya. ICU berakar dari C++ dan Java, tempat parser dan formatter pesan lengkap hanya memerlukan biaya komputasi yang dapat diabaikan jika dibandingkan dengan keseluruhan program. Namun dalam bundle browser, biaya tersebut harus dibayar pada setiap pemuatan halaman.

Artikel ini membahas asal-usul ICU, alasan mengapa sintaksnya terasa berat untuk bentuk jamak, dan mengapa kompatibilitas penuh menambah beban pada library i18n JavaScript apa pun. Jika Anda memerlukan panduan sintaks dasarnya, silakan baca [referensi ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md) terlebih dahulu.

- [Referensi ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md)

<TOC/>

## Dari IBM ke Unicode Consortium

ICU merupakan singkatan dari _International Components for Unicode_. Sintaks pesannya bermula di Java: Taligent, sebuah joint venture antara Apple dan IBM, mengembangkan kelas-kelas internasionalisasi untuk JDK 1.1 (1997), termasuk `java.text.MessageFormat`. IBM melanjutkan pengembangannya sebagai ICU4J, mem-portingnya ke C/C++ sebagai ICU4C, dan merilisnya sebagai open source pada tahun 1999. Pada tahun 2016, ICU bernaung di bawah payung Unicode Consortium, yang juga mengelola CLDR, basis data lokal yang menjadi fondasinya.

### Penggunaan awalnya

Fokus utamanya adalah perangkat lunak server dan desktop: aplikasi enterprise Java, produk-produk IBM, serta kemudian sistem operasi. Pesan-pesan disimpan dalam file `.properties` Java yang dimuat via `ResourceBundle`, atau dalam format paket sumber daya bawaan ICU untuk C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

Versi awal JDK belum mengenal kata kunci `plural`. Versi tersebut mengandalkan `choice` dengan rentang angka (`{0,choice,0#no files|1#one file|1<{0} files}`), yang hanya cocok untuk bahasa dengan aturan jamak menyerupai bahasa Inggris. ICU menambahkan fitur `plural` berbasis aturan CLDR pada tahun 2008 (ICU 4.0) dan menambahkan `select` pada tahun 2010 (ICU 4.4).

### Perbedaannya dengan `.po`

ICU sering kali disamakan dengan gettext, padahal keduanya berasal dari tradisi yang berlainan. File `.po` berasal dari GNU gettext (C, Linux, lalu PHP dan Python). Sebuah entri `.po` memuat pasangan sederhana `msgid` / `msgstr`, dan penentuan jamak dilakukan oleh ekspresi C di header file (`Plural-Forms: nplurals=2; plural=(n > 1);`). Tidak ada percabangan logika di dalam string pesan itu sendiri. Sebaliknya, ICU menanamkan percabangan langsung di dalam teks, sehingga satu pesan dapat menggabungkan `plural`, `select`, dan pemformatan angka sekaligus.

### Di mana ICU berjalan saat ini

ICU4C terpasang secara bawaan di Android, iOS, macOS, Windows, Node.js, serta engine JavaScript di Chrome dan Firefox. API `Intl` standar pada browser sebagian besar dibangun di atasnya. Dengan demikian, browser sudah memiliki aturan jamak serta logika format angka dan tanggal dari ICU. Yang tidak dimiliki oleh browser adalah parser pesannya: `Intl.MessageFormat` saat ini masih berupa proposal tahap awal di TC39, dirancang dengan sintaks MessageFormat 2 yang baru dan tidak kompatibel secara langsung dengan ICU MessageFormat 1.

Latar belakang historis ini memperjelas motif desainnya:

- **Ditujukan untuk runtime server dan desktop.** Parsing string pesan saat runtime sangat murah di lingkungan tersebut, dan library diinstal satu kali di tingkat sistem operasi, bukan diunduh oleh setiap pengunjung situs web.
- **Berupa DSL di dalam string.** Percabangan, format angka, tanggal, dan struktur bertingkat disatukan dalam satu sintaks yang dapat disunting penerjemah tanpa menyentuh kode aplikasi.
- **Menargetkan kelengkapan mutlak.** Tersedia operator khusus untuk setiap kasus gramatikal yang mungkin dihadapi penerjemah.

Semua keputusan ini bukanlah kesalahan desain. Keputusan tersebut hanya berpijak pada asumsi lingkungan kerja yang tidak sama dengan browser web.

## Aturan bentuk jamak terlalu berbelit-belit

Pola yang paling sering digunakan dalam ICU justru merupakan pola dengan tingkat kompleksitas sintaks tertinggi. Sebuah penghitung yang menyertakan kasus nol ditulis seperti berikut:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Format ini memerlukan nama argumen, kata kunci `plural`, label untuk setiap cabang, kurung kurawal berlapis, dan tanda `#` sebagai token khusus yang hanya berlaku di dalam blok plural. Apabila kita menambahkan pembedaan gender subjek, tingkat percabangannya semakin dalam:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Sembilan dari lima belas baris tersebut hanyalah kerangka sintaks murni. Bahasa Polandia, misalnya, membutuhkan empat cabang jamak untuk masing-masing dari ketiga opsi gender tersebut. Akibatnya, string terjemahan menjadi labirin kurung kurawal di mana satu kurung tutup `}` yang terlewat dapat merusak seluruh pesan, dan sering kali baru disadari saat aplikasi berjalan di tingkat runtime.

Dalam JavaScript, struktur yang sama dapat ditulis langsung sebagai data murni: sebuah objek dengan kunci kategori jamak, yang divalidasi langsung oleh sistem tipe dan editor kode, tanpa memerlukan parser perantara antara file dan nilai akhir.

## Kelengkapan fitur menghasilkan biaya ekstra

ICU mencakup banyak sekali kapabilitas:

- `plural` dengan pencocokan eksak (`=0`) dan pergeseran (`offset:`)
- `selectordinal` dengan tabel urutan angka CLDR mandiri
- `select` dengan kedalaman bertingkat bebas
- Argumen `number`, `date`, dan `time`, baik dalam format konvensional (`number, currency`) maupun skeleton (`::currency/EUR compact-short`)
- Aturan karakter escape dan tanda kutip (`'{'`, `''`)
- Tag format rich-text pada implementasi tertentu (`<b>…</b>`)

Sebuah library yang mengklaim kompatibilitas penuh 1:1 dengan ICU wajib menyertakan semua modul tersebut, karena proses build tidak dapat memastikan fitur mana saja yang akan dipakai dalam pesan Anda. Secara teknis, ini mengharuskan hadirnya:

1. **Parser** untuk mengonversi string menjadi AST dan menangani kesalahan kurung kurawal yang rusak.
2. **Parser skeleton** untuk memproses sintaks `::` angka dan tanggal, yang merupakan bahasa kecil tersendiri.
3. **Formatter** yang membaca AST dan memetakan setiap simpul ke `Intl.PluralRules`, `Intl.NumberFormat`, dan `Intl.DateTimeFormat`.

Komponen ketiga sangat ringan karena JavaScript modern telah mengintegrasikan logika CLDR ke dalam `Intl`. Sebaliknya, dua komponen pertama hanya ada demi menafsirkan sintaks teks. Pada `intl-messageformat` dari FormatJS, yang menjadi fondasi bagi `react-intl` dan `next-intl`, kedua modul ini menyumbang sekitar **10 KB JavaScript terkompresi** yang dikirim ke setiap pengunjung sebelum teks aplikasi Anda sempat dimuat.

Sebagian besar aplikasi web hanya membutuhkan sebagian kecil dari kemampuan tersebut: interpolasi `{name}` dan beberapa blok `plural`. Namun, pengguna tetap dipaksa mengunduh parser lengkap untuk skeleton, bilangan ordinal, dan offset karena bundler tidak dapat melakukan tree-shaking pada string yang di-parse saat runtime.

## next-intl juga menghadapi tantangan serupa

Ini bukan sekadar kekhawatiran teoretis belaka. `next-intl`, salah satu library berbasis ICU yang paling populer, menarik kesimpulan yang persis sama. Pada versi 4.8 (Januari 2026), mereka meluncurkan opsi eksperimental `precompile`. Opsi ini mem-parse pesan ICU pada tahap build menjadi AST ringkas dan mengganti parser runtime dengan evaluator minimalis. Dokumentasi proyek tersebut mencatat bahwa langkah ini berhasil **menghemat sekitar 9 KB JavaScript terkompresi**.

Namun kompromi ini juga memperlihatkan keterbatasan pendekatan berbasis string: fungsi `t.raw` tidak lagi bekerja dalam mode pra-kompilasi karena string mentah ICU sudah tidak ada lagi saat runtime. Begitu browser berhenti mem-parse string, yang Anda kirimkan sebenarnya bukan lagi format asli ICU. Anda mengirimkan hasil kompilasi, dan sintaks teks hanya menjadi format perantara saat penulisan.

Pertanyaan mendasar pun muncul: jika browser tidak pernah membaca string tersebut secara langsung, untuk apa developer dan penerjemah harus repot-repot menuliskannya dalam sintaks string yang rumit?

## Wujud pendekatan native dalam JavaScript

JavaScript sudah menyelesaikan bagian tersulitnya secara native. `Intl.PluralRules` memahami berbagai kategori gramatikal jamak dan ordinal lintas bahasa. `Intl.NumberFormat` dan `Intl.DateTimeFormat` menangani mata uang, satuan, notasi ringkas, dan sistem penanggalan. Yang tersisa hanyalah memilih cabang kondisi dan menyisipkan nilai, yang hanya memerlukan beberapa baris kode jika strukturnya dimodelkan sebagai data dan bukan string.

Inilah arsitektur yang diusung oleh Intlayer. Percabangan diekspresikan sebagai fungsi di dalam deklarasi konten bertipe, dan setiap bahasa hanya mendeklarasikan kategori yang memang diwajibkan oleh tata bahasanya:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      id: plural({
        other: "{{count}} pesan belum dibaca",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Lokal Polandia → "5 nieprzeczytanych wiadomości"
```

Keuntungan utama dibandingkan ICU:

- **Bebas dari parser dalam bundle.** Struktur teks sudah menjadi objek JavaScript siap pakai saat tiba di browser. Fungsi `plural` menentukan kunci menggunakan `Intl.PluralRules` bawaan sistem.
- **Kesalahan terdeteksi saat proses build.** Cabang yang terlewat atau saltik (typo) pada properti langsung memicu pesan error TypeScript, mencegah kerusakan di tahap produksi.
- **Pemisahan logika format dari teks.** Angka, tanggal, dan mata uang diproses melalui [hook formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) yang langsung memanfaatkan `Intl`, sehingga tidak membutuhkan parser skeleton.
- **Fitur yang tidak terpakai tidak membebani ukuran bundle.** Jika tidak ada konten yang menggunakan `gender`, bundler akan menghilangkannya secara otomatis melalui tree-shaking.

- [Hook formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)

Tentu saja pendekatan ini memiliki konsekuensinya tersendiri: diperlukan tahapan build, file konten berupa kode alih-alih teks biasa, dan sejumlah platform TMS yang dirancang khusus untuk string ICU mungkin tidak dapat membaca file deklarasi TypeScript secara langsung.

## Kapan ICU tetap menjadi pilihan yang tepat

ICU tetap menjadi alternatif terbaik jika:

- **Pipeline lokalisasi Anda sudah terikat penuh dengannya.** Berbagai perangkat lunak TMS mengimpor dan mengekspor string ICU, dan tim penerjemah sudah terlatih dengan sintaks tersebut.
- **Pesan dibagikan lintas platform secara bersamaan.** Menggunakan katalog terjemahan yang sama untuk aplikasi iOS, Android, dan web merupakan argumen kuat untuk mempertahankan format terpadu.
- **Anda telah memiliki repositori pesan ICU yang sangat besar.** Menulis ulang ribuan pesan secara manual jarang sebanding dengan waktu dan biaya yang dikeluarkan.

Pada skenario terakhir, Anda tidak perlu dipaksa memilih antara penulisan ulang total atau menanggung parser yang berat. [Adapter kompatibilitas react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md) dari Intlayer mampu membaca string ICU yang sudah ada (`plural`, `select`, `selectordinal`, `#`, format lama `number` / `date` / `time`). Ini memungkinkan migrasi bertahap, sehingga beban ICU hanya terbatas pada string warisan yang masih membutuhkannya.

- [Adapter kompatibilitas react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md)

## Kesimpulan

ICU MessageFormat telah berhasil menyelesaikan masalah nyata: aturan tata bahasa adalah wewenang penerjemah dan tidak boleh dicampuradukkan dalam logika `if (count === 1)` di kode aplikasi. Solusi ini bekerja luar biasa pada lingkungan di mana parsing DSL berbasis string tidak menimbulkan beban. Di browser web, kompatibilitas penuh memaksa pengiriman kode parser untuk fitur yang tidak pernah digunakan sebagian besar proyek, hingga akhirnya library berbasis ICU pun beralih ke pra-kompilasi.

JavaScript telah menyediakan aturan CLDR yang lengkap melalui `Intl`. Kebutuhan inti dari format i18n modern hanyalah struktur percabangan yang terorganisasi, dan hal tersebut jauh lebih optimal jika direpresentasikan sebagai data bertipe.

## Bacaan lanjutan

- [ICU Message Format: sintaks, bentuk jamak, dan select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md)
- [Konten bentuk jamak di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md)
- [Konten berbasis select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/select.md)
- [Benchmark perbandingan library i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Apakah next-intl sudah usang?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_next-intl_outdated.md)
