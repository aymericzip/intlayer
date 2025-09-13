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
---

# Intlayer Biçimlendiricileri

## Genel Bakış

Intlayer, yerel `Intl` API'leri üzerine inşa edilmiş hafif yardımcılar kümesi sağlar, ayrıca ağır biçimlendiricileri tekrar tekrar oluşturmaktan kaçınmak için önbelleğe alınmış bir `Intl` sarmalayıcısı. Bu yardımcılar tamamen yerel ayar duyarlıdır ve ana `intlayer` paketinden kullanılabilir.

### İçe Aktarma

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
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

React kullanıyorsanız, kancalar da kullanılabilir; `react-intlayer/format` bölümüne bakın.

## Önbelleğe Alınmış Intl

Dışa aktarılan `Intl`, global `Intl` etrafında ince, önbelleğe alınmış bir sarmalayıcıdır. `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` ve `PluralRules` örneklerini önbelleğe alır, bu da aynı biçimlendiriciyi tekrar tekrar yeniden oluşturmaktan kaçınır.

Biçimlendirici yapımı nispeten pahalı olduğundan, bu önbelleğe alma davranış değiştirmeden performansı iyileştirir. Sarmalayıcı yerel `Intl` ile aynı API'yi gösterir, bu yüzden kullanım aynıdır.

- Önbelleğe alma işlem başına şeffaftır ve arayanlara görünmez.

> Eğer `Intl.DisplayNames` ortamda mevcut değilse, tek bir dev-only uyarısı yazdırılır (polyfill düşünün).

Örnekler:

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

// Sıralama için karşılaştırma
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (eşit)

// Çoğul kuralları
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Ek Intl Yardımcıları

Biçimlendirici yardımcılarının ötesinde, önbelleğe alınmış Intl sarmalayıcısını doğrudan diğer Intl özellikleri için de kullanabilirsiniz:

### `Intl.DisplayNames`

Diller, bölgeler, para birimleri ve yazılar için yerelleştirilmiş adlar için:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

Yerel ayar duyarlı dize karşılaştırması ve sıralama için:

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

Farklı yerel ayarlarda çoğul formları belirlemek için:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Yerel Ayar Yardımcıları

### `getLocaleName(displayLocale, targetLocale?)`

Bir yerel ayar adını başka bir yerel ayarda alır:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: Adı alınacak yerel ayar
- **targetLocale**: Adın görüntüleneceği yerel ayar (varsayılan olarak displayLocale)

### `getLocaleLang(locale?)`

Bir yerel ayar dizesinden dil kodunu çıkarır:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Dili çıkarılacak yerel ayar (varsayılan olarak mevcut yerel ayar)

### `getLocaleFromPath(inputUrl)`

Bir URL veya yol adından yerel ayar segmentini çıkarır:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (varsayılan yerel ayar)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: İşlenecek tam URL dizesi veya yol adı
- **returns**: Algılanan yerel ayar veya yerel ayar bulunamazsa varsayılan yerel ayar

### `getPathWithoutLocale(inputUrl, locales?)`

Bir URL veya yol adından yerel ayar segmentini kaldırır:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: İşlenecek tam URL dizesi veya yol adı
- **locales**: İsteğe bağlı desteklenen yerel ayarlar dizisi (varsayılan olarak yapılandırılmış yerel ayarlar)
- **returns**: Yerel ayar segmenti olmadan URL

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Mevcut yerel ayar için yerelleştirilmiş bir URL oluşturur:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: Yerelleştirilecek orijinal URL
- **currentLocale**: Mevcut yerel ayar
- **locales**: İsteğe bağlı desteklenen yerel ayarlar dizisi (varsayılan olarak yapılandırılmış yerel ayarlar)
- **defaultLocale**: İsteğe bağlı varsayılan yerel ayar (varsayılan olarak yapılandırılmış varsayılan yerel ayar)
- **prefixDefault**: Varsayılan yerel ayarın öneklenip öneklenmeyeceği (varsayılan olarak yapılandırılmış değer)

### `getHTMLTextDir(locale?)`

Bir yerel ayar için metin yönünü döndürür:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: Metin yönünün alınacağı yerel ayar (varsayılan olarak mevcut yerel ayar)
- **returns**: `"ltr"`, `"rtl"` veya `"auto"`

## İçerik İşleme Yardımcıları

### `getContent(node, nodeProps, locale?)`

Bir içerik düğümünü tüm kullanılabilir eklentilerle dönüştürür (çeviri, numaralandırma, ekleme vb.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Dönüştürülecek içerik düğümü
- **nodeProps**: Dönüşüm bağlamı için özellikler
- **locale**: İsteğe bağlı yerel ayar (varsayılan olarak yapılandırılmış varsayılan yerel ayar)

### `getLocalisedContent(node, locale, nodeProps, fallback?)`

Bir içerik düğümünü sadece çeviri eklentisiyle dönüştürür:

```ts
import { getLocalisedContent } from "intlayer";

const content = getLocalisedContent(
  contentNode,
  "fr",
  { dictionaryKey: "common" },
  true // çeviri eksikse varsayılan yerel ayara geri dön
);
```

- **node**: Dönüştürülecek içerik düğümü
- **locale**: Çeviri için kullanılacak yerel ayar
- **nodeProps**: Dönüşüm bağlamı için özellikler
- **fallback**: Varsayılan yerel ayara geri dönülüp dönülmeyeceği (varsayılan olarak false)

### `getTranslation(languageContent, locale?, fallback?)`

Bir dil içerik nesnesinden belirli bir yerel ayar için içerik çıkarır:

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

- **languageContent**: Yerel ayarları içeriğe eşleyen nesne
- **locale**: Hedef yerel ayar (varsayılan olarak yapılandırılmış varsayılan yerel ayar)
- **fallback**: Varsayılan yerel ayara geri dönülüp dönülmeyeceği (varsayılan olarak true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Bir anahtara göre sözlükten içerik alır ve dönüştürür:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Alınacak sözlüğün anahtarı
- **locale**: İsteğe bağlı yerel ayar (varsayılan olarak yapılandırılmış varsayılan yerel ayar)
- **plugins**: İsteğe bağlı özel dönüşüm eklentileri dizisi

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Uzak bir sözlükten eşzamansız olarak içerik alır:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: Alınacak sözlüğün anahtarı
- **locale**: İsteğe bağlı yerel ayar (varsayılan olarak yapılandırılmış varsayılan yerel ayar)
- **plugins**: İsteğe bağlı özel dönüşüm eklentileri dizisi

## Biçimlendiriciler

Aşağıdaki tüm yardımcılar `intlayer`'dan dışa aktarılır.

### `number(value, options?)`

Yerel ayar duyarlı gruplandırma ve ondalıklar kullanarak sayısal bir değeri biçimlendirir.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Örnekler:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en-US'de)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Bir sayıyı yüzde dizesi olarak biçimlendirir.

Davranış: 1'den büyük değerler tam yüzdeler olarak yorumlanır ve normalleştirilir (ör. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Örnekler:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Bir değeri yerelleştirilmiş para birimi olarak biçimlendirir. Varsayılan olarak `USD` ile iki kesirli basamak.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Yaygın alanlar: `currency` (ör. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Örnekler:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

`Intl.DateTimeFormat` ile tarih/saat değerini biçimlendirir.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` veya ön ayarların biri:
  - Ön ayarlar: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Örnekler:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // ör. "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

`Intl.RelativeTimeFormat` ile iki an arasında göreceli zamanı biçimlendirir.

- Doğal ifadeler için ilk argüman olarak "now" geçin ve ikinci olarak hedefi.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (varsayılan olarak `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Varsayılan `unit` `"second"`.

Örnekler:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

`Intl.NumberFormat` ile `style: 'unit'` kullanarak sayısal bir değeri yerelleştirilmiş birim dizesi olarak biçimlendirir.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Yaygın alanlar: `unit` (ör. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Varsayılanlar: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Örnekler:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (yerel ayara bağlı)
```

### `compact(value, options?)`

Kompakt gösterim kullanarak bir sayıyı biçimlendirir (ör. `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (arka planda `notation: 'compact'` kullanır)

Örnekler:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Değerler dizisini `Intl.ListFormat` kullanarak yerelleştirilmiş liste dizesine biçimlendirir.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Yaygın alanlar: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Varsayılanlar: `type: 'conjunction'`, `style: 'long'`

Örnekler:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Notlar

- Tüm yardımcılar `string` girdilerini kabul eder; dahili olarak sayılara veya tarihlere dönüştürülürler.
- Yerel ayar sağlanmazsa yapılandırılmış `internationalization.defaultLocale`'a varsayılan olarak ayarlanır.
- Bu yardımcılar ince sarmalayıcılardır; gelişmiş biçimlendirme için standart `Intl` seçeneklerini geçirin.

## Giriş Noktaları ve Yeniden Dışa Aktarmalar (`@index.ts`)

Biçimlendiriciler çekirdek pakette yaşar ve çalışma zamanları arasında içe aktarmaları ergonomik tutmak için daha yüksek seviyeli paketlerden yeniden dışa aktarılır:

Örnekler:

```ts
// Uygulama kodu (önerilen)
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
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

### React

İstemci bileşenleri:

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
// veya Preact uygulamalarında
// "preact-intlayer/format";
// veya Next.js uygulamalarında
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
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Sunucu bileşenleri (veya React Server çalışma zamanı):

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

> Bu kancalar `IntlayerProvider` veya `IntlayerServerProvider`'dan yerel ayarı dikkate alacaktır

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

> Bu composable'lar enjekte edilen `IntlayerProvider`'dan yerel ayarı dikkate alacaktır

## Doküman Geçmişi

| Sürüm | Tarih      | Değişiklikler                                                                          |
| ----- | ---------- | -------------------------------------------------------------------------------------- |
| 5.8.0 | 2025-08-20 | Vue biçimlendiricileri eklendi                                                         |
| 5.8.0 | 2025-08-18 | Biçimlendiriciler dokümantasyonu eklendi                                               |
| 5.8.0 | 2025-08-20 | Liste biçimlendirici dokümantasyonu eklendi                                            |
| 5.8.0 | 2025-08-20 | Ek Intl yardımcıları eklendi (DisplayNames, Collator, PluralRules)                     |
| 5.8.0 | 2025-08-20 | Yerel ayar yardımcıları eklendi (getLocaleName, getLocaleLang, getLocaleFromPath, vb.) |
| 5.8.0 | 2025-08-20 | İçerik işleme yardımcıları eklendi (getContent, getTranslation, getIntlayer, vb.)      |
