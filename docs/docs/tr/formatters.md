---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Biçimlendiriciler
description: Sayılar, yüzdeler, para birimi, tarihler, göreceli zaman, birimler ve kompakt gösterim için Intl tabanlı yerel ayar duyarlı biçimlendirme yardımcıları. Önbelleğe alınmış Intl yardımcısı içerir.
keywords:
  - Biçimlendiriciler
  - Intl
  - Sayı
  - Para Birimi
  - Yüzde
  - Tarih
  - Göreceli Zaman
  - Birimler
  - Kompakt
  - Liste
  - Uluslararasılaştırma
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Vue biçimlendiricileri eklendi"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Biçimlendiriciler dokümantasyonu eklendi"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Liste biçimlendirici dokümantasyonu eklendi"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Ek Intl yardımcıları eklendi (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Yerel ayar yardımcıları eklendi (getLocaleName, getLocaleLang, getLocaleFromPath, vb.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "İçerik işleme yardımcıları eklendi (getContent, getTranslation, getIntlayer, vb.)"
author: aymericzip
---

# Intlayer Biçimlendiricileri

## Genel Bakış

Intlayer, yerel `Intl` API'leri üzerine inşa edilmiş hafif yardımcılar kümesi sağlar, ayrıca ağır biçimlendiricileri tekrar tekrar oluşturmaktan kaçınmak için önbelleğe alınmış bir `Intl` sarmalayıcısı. Bu yardımcılar tamamen yerel ayar duyarlıdır ve ana `intlayer` paketinden kullanılabilir.

## Önbelleğe Alınmış Intl

Biçimlendirici yapımı nispeten pahalı olduğundan, bu önbelleğe alma davranış değiştirmeden performansı iyileştirir. Sarmalayıcı yerel `Intl` ile aynı API'yi gösterir, bu yüzden kullanım aynıdır.

> Eğer `Intl.DisplayNames` ortamda mevcut değilse, tek bir dev-only uyarısı yazdırılır (polyfill düşünün).

Örnekler:

## Yerel Ayar Yardımcıları

### `getLocaleFromPath(inputUrl)`

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (varsayılan yerel ayar)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

### `getPathWithoutLocale(inputUrl, locales?)`

Bir URL veya yol adından yerel ayar segmentini kaldırır:

- **inputUrl**: İşlenecek tam URL dizesi veya yol adı
- **locales**: İsteğe bağlı desteklenen yerel ayarlar dizisi (varsayılan olarak yapılandırılmış yerel ayarlar)
- **returns**: Yerel ayar segmenti olmadan URL

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

### `getHTMLTextDir(locale?)`

Bir yerel ayar için metin yönünü döndürür:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## İçerik İşleme Yardımcıları

### `getContent(node, nodeProps, locale?)`

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

Bir dil içerik nesnesinden belirli bir yerel ayar için içerik çıkarır:

- **languageContent**: Yerel ayarları içeriğe eşleyen nesne
- **locale**: Hedef yerel ayar (varsayılan olarak yapılandırılmış varsayılan yerel ayar)
- **fallback**: Varsayılan yerel ayara geri dönülüp dönülmeyeceği (varsayılan olarak true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Uzak bir sözlükten eşzamansız olarak içerik alır:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

## Biçimlendiriciler

Aşağıdaki tüm yardımcılar `intlayer`'dan dışa aktarılır.

### `percentage(value, options?)`

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### Ek Intl Özellikleri

#### `number(value, options?)`

Sayısal bir değeri yerel ayara duyarlı gruplama ve ondalık sayılarla biçimlendirir.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (en-US'de)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Bir sayıyı yüzde dizesi olarak biçimlendirir. 1'den büyük değerler normalize edilir (örneğin, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Bir değeri yerelleştirilmiş para biriminde biçimlendirir. Varsayılan olarak `USD` kullanılır.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Ortak: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Bir tarih/saat değerini biçimlendirir.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` veya preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // örn., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

İki zaman noktası arasındaki göreceli zamanı biçimlendirir.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (varsayılan olarak `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "3 gün içinde"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 saat önce"
```

#### `units(value, options?)`

Bir sayısal değeri bir birimle biçimlendirir.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Yaygın: `unit` (örn. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Bir sayıyı compact gösterimini kullanarak biçimlendirir.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Bir diziyi yerelleştirilmiş bir liste dizesine biçimlendirir.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Yaygın: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

`intlayer`'dan dışa aktarılan `Intl`, global `Intl` etrafında bir cache wrapper'ıdır. Formatter örneklerini (`NumberFormat`, `DateTimeFormat`, vb.) memoize eder, bunları tekrar tekrar oluşturmaktan kaçınır ve performansı artırır.

```ts
import { Intl } from "intlayer";

// Sayı biçimlendirme
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Diller, bölgeler vb. için görünen adlar
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Sıralama için harflerin sıralanması
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (eşit)

// Çoğul kuralları
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Ek Intl Özellikleri

#### `Intl.DisplayNames`

Diller, bölgeler, para birimleri ve yazı sistemlerinin yerelleştirilmiş adları için:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Locale'a duyarlı string karşılaştırması ve sıralaması için:

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

Farklı yerel ayarlarda çoğul formlarını belirlemek için:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Locale Utilities

### `list(values, options?)`

Örnekler:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### `getLocaleLang(locale?)`

Bir locale stringinden dil kodunu çıkarır:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
```

### `getLocaleFromPath(inputUrl)`

Bir URL veya pathname'den locale segmentini çıkarır:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (varsayılan locale)
```

### `getPathWithoutLocale(inputUrl, locales?)`

URL'den yerel ayar segmentini kaldırır:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
```

### React

İstemci bileşenleri:

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
// veya Next.js uygulamalarında
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

### `getHTMLTextDir(locale?)`

Bir locale için metin yönünü döndürür:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## Content Handling Utilities

### Vue

İstemci bileşenleri:

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

### `getTranslation(languageContent, locale?, fallback?)`

Belirli bir locale için içeriği çıkarır:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  { en: "Hello", fr: "Bonjour", de: "Hallo" },
  "fr",
  true
); // "Bonjour"
```

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Bir sözlükten içeriği alır ve dönüştürür:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
```

## Notlar

- Tüm yardımcılar `string` girdilerini kabul eder; dahili olarak sayılara veya tarihlere dönüştürülür.
- Yerel ayar sağlanmadıysa, yapılandırılmış `internationalization.defaultLocale` değerine varsayılan olarak ayarlanır.
- Bu yardımcılar ince sarmalayıcılardır; gelişmiş biçimlendirme için standart `Intl` seçeneklerinden geçin.
