---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "Format Pesan ICU: Sintaksis, Bentuk Jamak, dan Select"
description: Panduan praktis untuk ICU MessageFormat, interpolasi argumen, percabangan plural dan select, kategori jamak CLDR per bahasa, dan kesalahan umum.
keywords:
  - format pesan icu
  - icu messageformat
  - aturan jamak cldr
  - kategori jamak
  - selectordinal
  - pluralisasi i18n
  - sintaksis pesan
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Format Pesan ICU: Sintaksis dan Bagian yang Sering Menjebak Pengembang

ICU MessageFormat adalah sintaksis string yang memungkinkan terjemahan memiliki logika percabangannya sendiri: bentuk jamak, bentuk berdasarkan gender, serta pemformatan angka dan tanggal. Gagasan utamanya adalah bahwa tata bahasa merupakan ranah penerjemah, bukan pengembang yang menulis `if (count === 1)`. Artikel ini mengulas sintaksis dasar, aspek ketergantungan bahasa yang menggagalkan implementasi sederhana, dan bagaimana ekosistem JavaScript mengelolanya.

## Daftar Isi

<TOC/>

## Masalah Nyata di Lapangan

Berikut adalah kode yang hampir selalu ditulis pertama kali oleh pengembang:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Cara ini berfungsi dengan baik dalam bahasa Inggris tetapi gagal di hampir semua bahasa lain:

- **Bahasa Rusia dan Polandia** membutuhkan tiga atau empat bentuk, bukan dua.
- **Bahasa Indonesia dan Jepang** hanya memerlukan satu bentuk, dan spasi yang digabungkan secara manual menjadi tidak tepat.
- **Bahasa Arab** memerlukan enam bentuk jamak, dan angka itu sendiri harus ditampilkan dalam sistem penomoran lokal.
- **Bahasa Prancis** menyisipkan spasi yang tidak dapat diputus (non-breaking space) sebelum tanda baca tertentu, yang langsung rusak oleh `+ " "`.

Masalah yang lebih mendasar adalah kalimat telah terpotong menjadi beberapa fragmen. Penerjemah hanya melihat kata `item` dan `items` tanpa konteks serta tanpa kemampuan untuk mengatur ulang susunan kata dalam kalimat. ICU MessageFormat mengatasi hal ini dengan mempertahankan seluruh kalimat dalam satu string tunggal yang dapat diterjemahkan, sembari memberi penerjemah operator percabangan.

## Argumen Sederhana

Unit terkecil adalah placeholder di dalam kurung kurawal tunggal:

```text
Hello, {name}!
```

Saat proses pemformatan, Anda meneruskan `{ name: "Alice" }` dan menghasilkan `Hello, Alice!`. Kurung kurawal adalah satu-satunya karakter khusus. Untuk mencetak tanda kurung kurawal secara harfiah, bungkus dengan tanda kutip tunggal: `'{'`.

Itulah keseluruhan fitur interpolasi. Segala hal lain dalam ICU dibangun di atas mekanisme dasar ini.

## Bentuk Jamak (plural)

Operator `plural` memilih cabang berdasarkan nilai numerik:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Tiga poin penting yang harus dipahami:

- **`#`** digantikan oleh nilai `count` yang telah diformat sesuai lokal. Misalnya, `1234` menjadi `1,234` dalam `en-US` dan `1.234` dalam `id-ID`.
- **`other` bersifat wajib.** Setiap implementasi ICU akan memunculkan error atau gagal validasi jika `other` tidak disertakan. Ini adalah fallback ketika tidak ada kategori yang cocok.
- **`=0`, `=1`, … mencocokkan nilai persis** dan dievaluasi _sebelum_ kategori CLDR. Gunakan untuk teks kasus khusus (seperti "Tidak ada pesan"), bukan sebagai pengganti `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` mengurangi `n` dari nilai angka sebelum pemilihan kategori dan penggantian `#`. Fitur ini berguna untuk pola seperti "Alice dan 3 orang lainnya menyukai ini":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Dengan `count: 4`, tanda `#` akan menghasilkan angka `3`. Fitur `offset` sangat berguna namun tingkat dukungannya bervariasi di beberapa runtime, jadi selalu periksa lingkungan Anda sebelum mengandalkannya.

## Kategori Jamak Bergantung pada Bahasa

Ini adalah bagian yang paling sering disalahpahami. Nama kategori `zero`, `one`, `two`, `few`, `many`, `other` bukanlah wadah universal yang berlaku sama untuk setiap bahasa. Setiap lokal menggunakan _subset_ tertentu yang ditentukan oleh [aturan jamak CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), dan aturan ini bersifat gramatikal, bukan sekadar intuisi matematika.

| Bahasa    | Tag  | Kategori yang Digunakan          | Total |
| --------- | ---- | -------------------------------- | ----- |
| Indonesia | `id` | other                            | 1     |
| Jepang    | `ja` | other                            | 1     |
| Tionghoa  | `zh` | other                            | 1     |
| Inggris   | `en` | one, other                       | 2     |
| Jerman    | `de` | one, other                       | 2     |
| Prancis   | `fr` | one, many, other                 | 3     |
| Ceko      | `cs` | one, few, many, other            | 4     |
| Polandia  | `pl` | one, few, many, other            | 4     |
| Rusia     | `ru` | one, few, many, other            | 4     |
| Arab      | `ar` | zero, one, two, few, many, other | 6     |
| Wales     | `cy` | zero, one, two, few, many, other | 6     |

Dua konsekuensi yang sering mengejutkan:

- **`one` tidak selalu berarti angka "1".** Dalam bahasa Rusia, `one` mencakup 1, 21, 31, 101: angka apa pun yang berakhiran 1 kecuali yang berakhiran 11. Dalam bahasa Prancis, angka `0` juga masuk ke dalam kategori `one`.
- **Menambahkan kategori pada teks sumber bahasa Inggris tidak berpengaruh apa pun.** Pesan bahasa Inggris hanya memerlukan `one` dan `other`; sedangkan terjemahan bahasa Polandia memerlukan empat cabang, dan struktur tersebut harus berada di string bahasa Polandia, bukan di bahasa Inggris. Format yang memaksa semua bahasa memiliki struktur kunci yang sama akan menimbulkan kendala di sini.

Anda dapat memverifikasi perilaku runtime secara langsung tanpa menginstal dependensi apa pun:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

Objek bawaan `Intl.PluralRules` menyediakan data CLDR di semua browser modern dan Node.js. Pustaka mana pun yang mendukung aturan jamak CLDR hampir selalu memanggil API bawaan ini.

## select dan selectordinal

`select` membuat percabangan berdasarkan string apa pun: gender, peran pengguna, status, atau tingkatan paket.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Kunci dicocokkan secara harfiah dan cabang `other` juga wajib ada di sini. `select` adalah alat yang tepat ketika struktur kalimat bergantung pada nilai enum, karena setiap bahasa memiliki perbedaan dalam menentukan nilai mana yang memengaruhi tata bahasanya.

`selectordinal` memiliki bentuk yang sama dengan `plural`, tetapi menggunakan aturan jamak **ordinal** (ke-1, ke-2, dll.) yang tabelnya berbeda dari angka kardinal:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

Bahasa Inggris menggunakan empat kategori ordinal (1st, 2nd, 3rd, 4th) meskipun hanya menggunakan dua kategori kardinal. Perbedaan inilah yang mendasari pemisahan kedua operator tersebut.

## Argumen Angka, Tanggal, dan Waktu

ICU dapat memformat nilai yang diinterpolasi secara langsung:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

Format modern yang disarankan adalah **skeleton**, yang diperkenalkan pada ICU 60 dan ditandai dengan awalan `::`. Skeleton jauh lebih ekspresif daripada gaya penamaan lama:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Dukungan terhadap skeleton bervariasi di seluruh ekosistem. FormatJS mengimplementasikannya secara penuh, sementara beberapa runtime lain hanya menerima format lama seperti `number, currency` atau `date, long`. Pastikan untuk memeriksa lingkungan Anda sebelum menerapkannya di produksi.

## Struktur Bersarang dan Keterbacaan

Sintaksis ICU bersifat modular. Cabang jamak dapat memuat select, yang pada gilirannya dapat memuat cabang jamak lainnya:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Ini adalah contoh klasik ICU sekaligus argumen utama untuk menghindari struktur bersarang yang terlalu dalam. Di atas dua tingkat, penerjemah mulai rentan melakukan kesalahan kurung kurawal dan editor TMS menjadi kurang efektif. Batasi hingga maksimal dua tingkat; jika membutuhkan tingkat ketiga, pisahkan kalimat menjadi dua pesan terpisah.

## Dukungan ICU di Pustaka JavaScript

| Pustaka               | Dukungan ICU       | Yang Sebenarnya Ditulis                                               |
| --------------------- | ------------------ | --------------------------------------------------------------------- |
| react-intl (FormatJS) | Asli, penuh        | String ICU lengkap, termasuk skeleton dan tag rich-text               |
| next-intl             | Asli               | String ICU melalui paket `intl-messageformat` dari FormatJS           |
| i18next               | Perlu plugin       | Akhiran `key_one` / `key_other` dan `{{name}}`; ICU via `i18next-icu` |
| vue-i18n              | Sebagian / mandiri | Interpolasi `{name}` dan cabang jamak yang dipisahkan garis vertikal  |
| Angular (`$localize`) | Sebagian           | ICU `plural` / `select` di dalam template, diekstrak ke XLIFF         |

Catatan penting terkait tabel:

- **Sintaksis default i18next bukanlah ICU**, dan ini bukan kekurangan. Akhiran kunci (`item_one`, `item_few`) dipetakan ke kategori `Intl.PluralRules` dan sering kali lebih mudah diedit dalam file JSON datar. Namun, `select` dan percabangan bersarang bukan bagian dari fitur intinya, sehingga Anda harus menambahkan `i18next-icu` atau menulis logika dalam kode.
- **Bentuk jamak vue-i18n dengan pipa** secara default menggunakan fungsi aturan per lokal, bukan kategori CLDR. Fitur ini bekerja dengan baik, tetapi aturan jamak berada dalam konfigurasi aplikasi dan bukan di dalam data.
- **FormatJS adalah implementasi acuan** di dunia JS. Ketika pengembang membicarakan "ICU MessageFormat" dalam konteks JavaScript, biasanya yang dimaksud adalah format yang diterima oleh FormatJS.

## Pendekatan Intlayer

Intlayer tidak menggunakan DSL berbasis string. Operator percabangan adalah fungsi TypeScript dalam file deklarasi konten bertipe data ketat, sehingga setiap lokal hanya mendeklarasikan kategori yang benar-benar dibutuhkan oleh tata bahasanya:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      id: plural({
        other: "{{count}} lowongan",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Lokal Polandia → "5 ofert"
```

Pemetaan ke konsep ICU sangat jelas dan langsung:

| Konstruksi ICU                | Padanan di Intlayer                               |
| ----------------------------- | ------------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")`, atau deteksi otomatis |
| `{count, plural, …}`          | `plural({ one, few, many, other })`               |
| `{value, select, …}`          | `select({ draft, published, fallback })`          |
| cabang gender di `select`     | `gender({ male, female, fallback })`              |
| cabang boolean di `select`    | `cond({ true, false })`                           |
| rentang angka (non-CLDR)      | `enu({ "0": …, ">5": …, fallback: … })`           |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })`      |

Operator `plural` menyerahkan pemilihan kategori kepada `Intl.PluralRules`, sehingga tabel CLDR di atas berlaku tanpa perubahan. Logika pemformatan tetap terpisah: angka, tanggal, mata uang, dan daftar ditangani melalui [hooks pemformatan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md), alih-alih dicampur ke dalam teks pesan.

- [hooks pemformatan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)

Batasan praktis:

- Intlayer memerlukan tahap build: compiler mengekstrak deklarasi saat proses build aplikasi. Jika Anda menginginkan JSON biasa yang dimuat saat runtime, itu adalah model yang berbeda.
- Saat ini cabang `plural` belum dapat memuat `t()` secara bersarang di dalamnya; Anda membungkus `plural` di dalam `t()`, bukan sebaliknya.
- Ekosistemnya lebih baru dibandingkan i18next, dengan integrasi bawaan TMS yang masih terus berkembang.

Jika Anda beralih dari basis kode yang sudah memuat string ICU asli, [adapter kompatibilitas react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md) dapat langsung menguraikannya: `plural`, `select`, `selectordinal`, `#`, dan argumen lama `number`, `date`, `time`. Skeleton dan `offset:` belum didukung oleh parser tersebut dan perlu diperiksa saat migrasi. Sementara itu, [adapter i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md) menyelesaikan bentuk akhiran (`key_one`, `key_male`) melalui `Intl.PluralRules`.

- [adapter kompatibilitas react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md)
- [adapter i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md)

## Kesalahan yang Sering Terjadi

- **Menuliskan logika jamak langsung di kode JS.** Ungkapan `count === 1 ? a : b` menghasilkan keluaran yang salah untuk 8 dari 10 bahasa pada tabel di atas. Sekali operator ternary berada di kode, penerjemah tidak dapat memperbaikinya.
- **Menggabungkan fragmen terjemahan.** Urutan kata, kesesuaian tata bahasa, dan spasi sebelum tanda baca bergantung pada lokal. Selalu pertahankan kalimat secara utuh.
- **Melewatkan cabang `other`.** Ini adalah persyaratan spesifikasi resmi, bukan opsi opsional. Sebagian besar parser akan menolak pesan tersebut, dan sisanya tidak akan menampilkan apa pun.
- **Menganggap semua bahasa memiliki kategori yang sama.** Fakta bahwa sumber bahasa Inggris hanya memiliki `one` dan `other` tidak berarti bahasa Polandia hanya memiliki dua cabang. Biarkan setiap lokal mendeklarasikan cabangnya sendiri. Lihat [deklarasi konten per lokal](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md).
- **Menggunakan `=1` padahal yang dimaksud adalah `one`.** `=1` hanya cocok persis dengan angka 1. Dalam bahasa Rusia, angka 21 membutuhkan kategori `one`, dan aturan `=1` tidak akan pernah aktif untuk angka tersebut.
- **Menempatkan `#` di luar cabang plural.** Simbol `#` hanya memiliki arti khusus di dalam `plural` atau `selectordinal`. Di tempat lain, simbol ini diperlakukan sebagai karakter tanda pagar biasa.
- **Lupa bahwa `#` sudah diformat.** Jika Anda membutuhkan angka murni tanpa pemisah ribuan lokal, gunakan interpolasi argumen berdasarkan namanya.

## Pelajari Lebih Lanjut

- [Konten Bentuk Jamak di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md)
- [Konten Berbasis Select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/select.md)
- [Placeholder Penyisipan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)
- [Tolok Ukur Pustaka i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/react-i18next_vs_react-intl_vs_intlayer.md)
- [Apa itu Internasionalisasi (i18n)?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/what_is_internationalization.md)
