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
    changes: "Menghapus getIntlayerAsync dari formatters"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Menambahkan formatters untuk vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Menambahkan dokumentasi formatters"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Menambahkan dokumentasi list formatter"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Menambahkan utilitas Intl tambahan (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Menambahkan utilitas lokal (getLocaleName, getLocaleLang, getLocaleFromPath, dll.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Menambahkan utilitas penanganan konten (getContent, getTranslation, getIntlayer, dll.)"
author: aymericzip
---

# Formatters Intlayer

## Daftar Isi

<TOC/>

## Ikhtisar

Intlayer menyediakan serangkaian pembantu ringan yang dibangun di atas API `Intl` asli, ditambah pembungkus `Intl` yang di-cache untuk menghindari pembuatan formatter berat berulang kali. Utilitas ini sepenuhnya sadar lokal dan dapat digunakan dari paket utama `intlayer`.

**Untuk React, Vue, dan framework lainnya**, gunakan hooks/composables spesifik framework yang secara otomatis terikat ke konteks lokal aplikasi Anda:

| Framework                | Import                                        |
| ------------------------ | --------------------------------------------- |
| **React** (client)       | `react-intlayer/format`                       |
| **React** (server)       | `react-intlayer/server/format`                |
| **Next.js** (client)     | `next-intlayer/client/format`                 |
| **Next.js** (server)     | `next-intlayer/server/format`                 |
| **Vue**                  | `vue-intlayer/format`                         |
| **Preact**               | `preact-intlayer/format`                      |
| **Vanilla JS / Node.js** | `intlayer` (memerlukan passing locale manual) |

## React Formatters

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

### Hook yang Tersedia

Semua hook secara otomatis menggunakan locale dari `IntlayerProvider` atau `IntlayerServerProvider`.

| Hook                | Description                          | Example Output                |
| ------------------- | ------------------------------------ | ----------------------------- |
| `useNumber()`       | Format angka dengan pengelompokan    | `"123,456.789"`               |
| `useCurrency()`     | Format nilai mata uang               | `"€1,234.50"`                 |
| `usePercentage()`   | Format persentase                    | `"25%"`                       |
| `useDate()`         | Format tanggal dan waktu             | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Format waktu relatif                 | `"in 3 days"`                 |
| `useUnit()`         | Format nilai dengan satuan           | `"5 kilometers"`              |
| `useCompact()`      | Format angka dalam notasi kompak     | `"1.2K"`                      |
| `useList()`         | Format array sebagai daftar          | `"apple, banana, and orange"` |
| `useIntl()`         | Dapatkan objek `Intl` terikat locale | Akses penuh API `Intl`        |

### Contoh Lengkap

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
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date(Date.now() + 86400000))}</p>
      <p>{unit(5, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### Hook `useIntl`

Hook `useIntl` menyediakan akses langsung ke objek `Intl` yang terikat pada locale. Ini berguna ketika Anda memerlukan API `Intl` lengkap (misalnya, `DisplayNames`, `Collator`, `PluralRules`) dengan injeksi locale otomatis.

```tsx
import { useIntl } from "react-intlayer/format";

const MyComponent = () => {
  const intl = useIntl(); // menggunakan locale konteks

  // API Intl standar, tetapi locale disuntikkan secara otomatis ketika undefined
  const formatted = new intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(123.45);

  // Anda masih dapat menimpa locale jika diperlukan
  const date = new intl.DateTimeFormat("fr-FR").format(new Date());

  // Akses fitur Intl lainnya
  const displayNames = new intl.DisplayNames(undefined, { type: "language" });
  const languageName = displayNames.of("fr"); // "French" (atau terlokalisasi)

  return (
    <div>
      <p>{formatted}</p>
      <p>{date}</p>
      <p>{languageName}</p>
    </div>
  );
};
```

## Vue Formatters

### `Intl.DisplayNames`

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Composables yang Tersedia

Semua composables mengembalikan computed refs yang secara otomatis menggunakan locale dari `IntlayerProvider` yang diinjeksi.

| Composable          | Deskripsi                            | Contoh Output                 |
| ------------------- | ------------------------------------ | ----------------------------- |
| `useNumber()`       | Format angka dengan pengelompokan    | `"123,456.789"`               |
| `useCurrency()`     | Format nilai mata uang               | `"€1,234.50"`                 |
| `usePercentage()`   | Format persentase                    | `"25%"`                       |
| `useDate()`         | Format tanggal dan waktu             | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Format waktu relatif                 | `"in 3 days"`                 |
| `useUnit()`         | Format nilai dengan unit             | `"5 kilometers"`              |
| `useCompact()`      | Format angka dalam notasi kompak     | `"1.2K"`                      |
| `useList()`         | Format array sebagai daftar          | `"apple, banana, and orange"` |
| `useIntl()`         | Dapatkan objek `Intl` terikat locale | Akses API `Intl` lengkap      |

### Contoh Lengkap

```vue
<script setup>
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

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
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

## Vanilla JS / Node.js Formatters

Untuk konteks non-framework, impor formatter langsung dari `intlayer`. Perhatikan bahwa Anda harus melewatkan locale secara manual.

### `Intl.PluralRules`

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

### Fungsi Formatter

#### `number(value, options?)`

Memformat nilai numerik menggunakan pengelompokan dan desimal yang menyadari lokal.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Memformat angka sebagai string persentase. Nilai lebih besar dari 1 dinormalisasi (misalnya, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Memformat nilai sebagai mata uang yang dilokalisasi. Default ke `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Memformat nilai tanggal/waktu.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` atau preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // misalnya, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Memformat waktu relatif antara dua momen.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (default ke `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "dalam 3 hari"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 jam yang lalu"
```

#### `units(value, options?)`

Memformat nilai numerik dengan unit.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Memformat angka menggunakan notasi kompak.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Memformat array menjadi string list yang terlokalisasi.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

`Intl` yang diekspor dari `intlayer` adalah wrapper yang di-cache di sekitar `Intl` global. Ini memoizes instance formatter (`NumberFormat`, `DateTimeFormat`, dll.) untuk menghindari pengulangan konstruksinya, meningkatkan performance.

```ts
import { Intl } from "intlayer";

// Pemformatan angka
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nama tampilan untuk bahasa, region, dll.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collation untuk pengurutan
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Aturan plural
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Fitur Intl Tambahan

#### `Intl.DisplayNames`

Untuk nama-nama terlokalisasi dari bahasa, region, mata uang, dan skrip:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Untuk perbandingan dan pengurutan string yang peka terhadap locale:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

Untuk menentukan bentuk plural dalam lokal yang berbeda:

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

### `getLocaleLang(locale?)`

Mengambil kode bahasa dari string locale:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

### `getLocaleFromPath(inputUrl)`

Mengambil segmen locale dari URL atau pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (locale default)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

### `getPathWithoutLocale(inputUrl, locales?)`

Menghapus segmen locale dari URL atau pathname:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Menghasilkan URL yang dilokalkan untuk locale saat ini:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

### `getHTMLTextDir(locale?)`

Mengembalikan arah teks untuk sebuah locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

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

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Mengambil dan mengubah konten dari kamus berdasarkan kunci:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

## Catatan

- Semua helper menerima input `string`; secara internal akan dikonversi menjadi angka atau tanggal.
- Locale default adalah `internationalization.defaultLocale` yang telah Anda konfigurasi jika tidak disediakan.
- Utilitas ini adalah pembungkus tipis; untuk pemformatan lanjutan, gunakan opsi standar `Intl`.
