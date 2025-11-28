---
createdAt: 2024-08-13
updatedAt: 2025-10-14
title: Formatters
description: Utilitas pemformatan yang sadar lokal berdasarkan Intl untuk angka, persentase, mata uang, tanggal, waktu relatif, satuan, dan notasi ringkas. Termasuk pembantu Intl yang di-cache.
keywords:
  - Formatters
  - Intl
  - Number
  - Currency
  - Percentage
  - Date
  - Relative Time
  - Units
  - Compact
  - List
  - Internationalization
slugs:
  - doc
  - formatters
history:
  - version: 6.2.0
    date: 2025-10-14
    changes: Menghapus getIntlayerAsync dari formatters
  - version: 5.8.0
    date: 2025-08-20
    changes: Menambahkan formatters untuk vue
  - version: 5.8.0
    date: 2025-08-18
    changes: Menambahkan dokumentasi formatters
  - version: 5.8.0
    date: 2025-08-20
    changes: Menambahkan dokumentasi list formatter
  - version: 5.8.0
    date: 2025-08-20
    changes: Menambahkan utilitas Intl tambahan (DisplayNames, Collator, PluralRules)
  - version: 5.8.0
    date: 2025-08-20
    changes: Menambahkan utilitas lokal (getLocaleName, getLocaleLang, getLocaleFromPath, dll.)
  - version: 5.8.0
    date: 2025-08-20
    changes: Menambahkan utilitas penanganan konten (getContent, getTranslation, getIntlayer, dll.)
---

# Formatters Intlayer

## Daftar Isi

<TOC/>

## Ikhtisar

Intlayer menyediakan serangkaian pembantu ringan yang dibangun di atas API `Intl` asli, ditambah pembungkus `Intl` yang di-cache untuk menghindari pembuatan formatter berat berulang kali. Utilitas ini sepenuhnya sadar lokal dan dapat digunakan dari paket utama `intlayer`.

### Impor

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} dari "intlayer";
```

Jika Anda menggunakan React, hooks juga tersedia; lihat `react-intlayer/format`.

## Intl yang Di-cache

`Intl` yang diekspor adalah pembungkus tipis yang di-cache di sekitar `Intl` global. Ini menyimpan instance dari `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator`, dan `PluralRules`, yang menghindari pembuatan ulang formatter yang sama berulang kali.

Karena pembuatan formatter relatif mahal, caching ini meningkatkan performa tanpa mengubah perilaku. Pembungkus ini menampilkan API yang sama seperti `Intl` asli, sehingga penggunaannya identik.

- Caching dilakukan per proses dan transparan bagi pemanggil.

> Jika `Intl.DisplayNames` tidak tersedia di lingkungan, hanya satu peringatan khusus pengembang yang dicetak (pertimbangkan menggunakan polyfill).

Contoh:

```ts
import { Intl } from "intlayer";

// Format angka
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nama tampilan untuk bahasa, wilayah, dll.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Kolasi untuk pengurutan
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (sama)

// Aturan jamak
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Utilitas Intl Tambahan

Selain pembantu formatter, Anda juga dapat menggunakan pembungkus Intl yang di-cache secara langsung untuk fitur Intl lainnya:

### `Intl.DisplayNames`

Untuk nama yang dilokalkan dari bahasa, wilayah, mata uang, dan skrip:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

Untuk perbandingan dan pengurutan string yang sadar lokal:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

Untuk menentukan bentuk jamak dalam berbagai locale:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilitas Locale

### `getLocaleName(displayLocale, targetLocale?)`

Mendapatkan nama yang dilokalkan dari sebuah locale dalam locale lain:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: Locale yang ingin didapatkan namanya
- **targetLocale**: Locale untuk menampilkan nama (default-nya adalah displayLocale)

### `getLocaleLang(locale?)`

Mengambil kode bahasa dari string locale:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Locale yang akan diambil bahasanya (default-nya adalah locale saat ini)

### `getLocaleFromPath(inputUrl)`

Mengambil segmen locale dari URL atau pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (locale default)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: String URL lengkap atau pathname yang akan diproses
- **returns**: Locale yang terdeteksi atau locale default jika tidak ditemukan locale

### `getPathWithoutLocale(inputUrl, locales?)`

Menghapus segmen locale dari URL atau pathname:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: String URL lengkap atau pathname yang akan diproses
- **locales**: Array opsional dari locale yang didukung (default-nya adalah locale yang dikonfigurasi)
- **returns**: URL tanpa segmen locale

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Menghasilkan URL yang dilokalkan untuk locale saat ini:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: URL asli yang akan dilokalkan
- **currentLocale**: Locale saat ini
- **locales**: Array opsional dari locale yang didukung (default ke locale yang dikonfigurasi)
- **defaultLocale**: Locale default opsional (default ke locale default yang dikonfigurasi)
- **prefixDefault**: Apakah akan menambahkan prefix untuk locale default (default ke nilai yang dikonfigurasi)

### `getHTMLTextDir(locale?)`

Mengembalikan arah teks untuk sebuah locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: Locale untuk mendapatkan arah teks (default ke locale saat ini)
- **returns**: `"ltr"`, `"rtl"`, atau `"auto"`

## Utilitas Penanganan Konten

### `getContent(node, nodeProps, locale?)`

Mengubah node konten dengan semua plugin yang tersedia (terjemahan, enumerasi, penyisipan, dll.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Node konten yang akan diubah
- **nodeProps**: Properti untuk konteks transformasi
- **locale**: Locale opsional (default ke locale default yang dikonfigurasi)

### `getTranslation(languageContent, locale?, fallback?)`

Mengambil konten untuk locale tertentu dari objek konten bahasa:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: Objek yang memetakan locale ke konten
- **locale**: Locale target (default ke locale default yang dikonfigurasi)
- **fallback**: Apakah akan kembali ke locale default (default true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Mengambil dan mengubah konten dari kamus berdasarkan kunci:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Kunci dari kamus yang akan diambil
- **locale**: Locale opsional (default ke locale default yang dikonfigurasi)
- **plugins**: Array opsional dari plugin transformasi kustom

## Formatter

Semua helper di bawah ini diekspor dari `intlayer`.

### `number(value, options?)`

Memformat nilai numerik menggunakan pengelompokan dan desimal yang sesuai dengan locale.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Contoh:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (dalam en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Memformat angka sebagai string persentase.

Perilaku: nilai yang lebih besar dari 1 diartikan sebagai persentase utuh dan dinormalisasi (misalnya, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Contoh:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Memformat nilai sebagai mata uang lokal. Default ke `USD` dengan dua digit pecahan.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Field umum: `currency` (misalnya, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Contoh:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Memformat nilai tanggal/waktu dengan `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` atau salah satu preset:
  - Preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Contoh:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // misalnya, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Memformat waktu relatif antara dua momen dengan `Intl.RelativeTimeFormat`.

- Berikan "now" sebagai argumen pertama dan target sebagai argumen kedua untuk mendapatkan frasa yang alami.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (defaultnya `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Default `unit` adalah `"second"`.

Contoh:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "dalam 3 hari"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 jam yang lalu"
```

### `units(value, options?)`

Memformat nilai numerik sebagai string unit yang dilokalkan menggunakan `Intl.NumberFormat` dengan `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Field umum: `unit` (misalnya, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Default: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Contoh:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (tergantung locale)
```

### `compact(value, options?)`

Memformat angka menggunakan notasi ringkas (misalnya, `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (menggunakan `notation: 'compact'` secara internal)

Contoh:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 juta"
```

### `list(values, options?)`

Memformat array nilai menjadi string daftar yang dilokalkan menggunakan `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Field umum: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Default: `type: 'conjunction'`, `style: 'long'`

Contoh:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, dan orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Catatan

- Semua helper menerima input `string`; secara internal akan dikonversi menjadi angka atau tanggal.
- Locale default adalah `internationalization.defaultLocale` yang telah Anda konfigurasi jika tidak disediakan.
- Utilitas ini adalah pembungkus tipis; untuk pemformatan lanjutan, gunakan opsi standar `Intl`.

## Titik masuk dan ekspor ulang (`@index.ts`)

Formatter berada di paket inti dan diekspor ulang dari paket tingkat atas untuk menjaga impor tetap ergonomis di berbagai runtime:

Contoh:

```ts
// Kode aplikasi (direkomendasikan)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} from "intlayer";
```

### React

Komponen klien:

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// atau di aplikasi Preact
// "preact-intlayer/format";
// atau di aplikasi Next.js
// "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apel", "pisang", "jeruk"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Komponen server (atau runtime React Server):

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/server/format";
// atau di aplikasi Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> Hooks tersebut akan mempertimbangkan locale dari `IntlayerProvider` atau `IntlayerServerProvider`

### Vue

Komponen klien:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

> Composables tersebut akan mempertimbangkan locale dari `IntlayerProvider` yang di-inject
