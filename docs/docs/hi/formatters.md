---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: फॉर्मेटर्स
description: नंबर, प्रतिशत, मुद्रा, तिथियाँ, सापेक्ष समय, इकाइयाँ, और कॉम्पैक्ट नोटेशन के लिए Intl आधारित लोकल-आधारित फॉर्मेटिंग यूटिलिटीज। इसमें एक कैश्ड Intl हेल्पर शामिल है।
keywords:
  - फॉर्मेटर्स
  - Intl
  - नंबर
  - मुद्रा
  - प्रतिशत
  - तिथि
  - सापेक्ष समय
  - इकाइयाँ
  - कॉम्पैक्ट
  - सूची
  - अंतरराष्ट्रीयकरण
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "vue फॉर्मैटर्स जोड़े"
  - version: 5.8.0
    date: 2025-08-18
    changes: "फॉर्मैटर्स दस्तावेज़ जोड़े"
  - version: 5.8.0
    date: 2025-08-20
    changes: "सूची स्वरूपक प्रलेखन जोड़ें"
  - version: 5.8.0
    date: 2025-08-20
    changes: "अतिरिक्त Intl उपयोगिताएँ जोड़ें (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "लोकल उपयोगिताएँ जोड़ें (getLocaleName, getLocaleLang, getLocaleFromPath, आदि)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "सामग्री प्रबंधन उपयोगिताएँ जोड़ें (getContent, getTranslation, getIntlayer, आदि)"
author: aymericzip
---

# Intlayer Formatters

## विषय सूची

<TOC/>

## अवलोकन

Intlayer नेटिव `Intl` APIs के ऊपर बनाए गए हल्के हेल्पर्स का एक सेट प्रदान करता है, साथ ही भारी फॉर्मेटर्स को बार-बार बनाने से बचने के लिए एक कैश्ड `Intl` रैपर भी शामिल है। ये यूटिलिटीज पूरी तरह से लोकल-आधारित हैं और मुख्य `intlayer` पैकेज से उपयोग की जा सकती हैं।

**React, Vue, और अन्य frameworks के लिए**, अपने ऐप के locale context से स्वचालित रूप से जुड़ने वाले framework-specific hooks/composables का उपयोग करें:

| Framework                | Import                                           |
| ------------------------ | ------------------------------------------------ |
| **React** (client)       | `react-intlayer/format`                          |
| **React** (server)       | `react-intlayer/server/format`                   |
| **Next.js** (client)     | `next-intlayer/client/format`                    |
| **Next.js** (server)     | `next-intlayer/server/format`                    |
| **Vue**                  | `vue-intlayer/format`                            |
| **Preact**               | `preact-intlayer/format`                         |
| **Vanilla JS / Node.js** | `intlayer` (मैनुअल locale पासिंग की आवश्यकता है) |

## React Formatters

### आयात

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
  getIntlayerAsync,
} from "intlayer";
```

### उपलब्ध Hooks

सभी hooks स्वचालित रूप से `IntlayerProvider` या `IntlayerServerProvider` से locale का उपयोग करते हैं।

| Hook                | विवरण                                           | उदाहरण आउटपुट                 |
| ------------------- | ----------------------------------------------- | ----------------------------- |
| `useNumber()`       | समूहन के साथ संख्याओं को प्रारूपित करें         | `"123,456.789"`               |
| `useCurrency()`     | मुद्रा मानों को प्रारूपित करें                  | `"€1,234.50"`                 |
| `usePercentage()`   | प्रतिशत को प्रारूपित करें                       | `"25%"`                       |
| `useDate()`         | तारीखें और समय प्रारूपित करें                   | `"Aug 2, 2025"`               |
| `useRelativeTime()` | सापेक्ष समय प्रारूपित करें                      | `"in 3 days"`                 |
| `useUnit()`         | इकाइयों के साथ मानों को प्रारूपित करें          | `"5 kilometers"`              |
| `useCompact()`      | कॉम्पैक्ट नोटेशन में संख्याओं को प्रारूपित करें | `"1.2K"`                      |
| `useList()`         | सरणियों को सूचियों के रूप में प्रारूपित करें    | `"apple, banana, and orange"` |
| `useIntl()`         | locale-bound `Intl` ऑब्जेक्ट प्राप्त करें       | Full `Intl` API access        |

### संपूर्ण उदाहरण

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

### `Intl.DisplayNames`

भाषाओं, क्षेत्रों, मुद्राओं, और स्क्रिप्ट्स के स्थानीयकृत नामों के लिए:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
// "fr" भाषा का स्थानीयकृत नाम प्राप्त करें
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
// "US" क्षेत्र का स्थानीयकृत नाम प्राप्त करें
regionNames.of("US"); // "États-Unis"
```

## Vue Formatters

### `Intl.Collator`

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base", // तुलना की संवेदनशीलता
  numeric: true, // संख्यात्मक तुलना सक्षम करें
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### उपलब्ध Composables

सभी composables computed refs return करते हैं जो injected `IntlayerProvider` से locale को स्वचालित रूप से उपयोग करते हैं।

| Composable          | Description                                  | Example Output                |
| ------------------- | -------------------------------------------- | ----------------------------- |
| `useNumber()`       | grouping के साथ संख्याओं को format करें      | `"123,456.789"`               |
| `useCurrency()`     | currency values को format करें               | `"€1,234.50"`                 |
| `usePercentage()`   | प्रतिशत को format करें                       | `"25%"`                       |
| `useDate()`         | तारीखों और समय को format करें                | `"Aug 2, 2025"`               |
| `useRelativeTime()` | सापेक्ष समय को format करें                   | `"in 3 days"`                 |
| `useUnit()`         | units के साथ values को format करें           | `"5 kilometers"`              |
| `useCompact()`      | compact notation में संख्याओं को format करें | `"1.2K"`                      |
| `useList()`         | arrays को lists के रूप में format करें       | `"apple, banana, and orange"` |
| `useIntl()`         | locale-bound `Intl` object प्राप्त करें      | Full `Intl` API access        |

### पूर्ण उदाहरण

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

### `Intl.PluralRules`

विभिन्न स्थानीय भाषाओं में बहुवचन रूप निर्धारित करने के लिए:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero" (शून्य)
pluralRules.select(1); // "one" (एक)
pluralRules.select(2); // "two" (दो)
pluralRules.select(3); // "few" (कुछ)
pluralRules.select(11); // "many" (कई)
```

## Vanilla JS / Node.js Formatters

गैर-framework संदर्भों के लिए, `intlayer` से सीधे formatters को import करें। ध्यान दें कि आपको locale को manually pass करना होगा।

### Import

```ts
import {
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
} from "intlayer";
```

### Formatter Functions

#### `number(value, options?)`

एक numeric मान को locale-aware grouping और decimals का उपयोग करके फॉर्मेट करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

एक संख्या को प्रतिशत स्ट्रिंग के रूप में प्रारूपित करता है। 1 से अधिक मान सामान्यीकृत होते हैं (उदाहरण के लिए, `25` → `25%`, `0.25` → `25%`)।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

एक मान को स्थानीयकृत मुद्रा के रूप में प्रारूपित करता है। डिफ़ॉल्ट रूप से `USD`।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

एक date/time value को format करता है।

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` या preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // e.g., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

दो तत्काल के बीच सापेक्ष समय को फॉर्मेट करता है।

- **from**: `Date | string | number`
- **to**: `Date | string | number` (डिफ़ॉल्ट `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "3 दिन में"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 घंटे पहले"
```

#### `units(value, options?)`

एक संख्यात्मक मान को एक इकाई के साथ प्रारूपित करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - सामान्य: `unit` (उदाहरण के लिए, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

कॉम्पैक्ट नोटेशन का उपयोग करके एक संख्या को फ़ॉर्मेट करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

एक array को स्थानीयकृत list string में प्रारूपित करता है।

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

`intlayer` से निर्यात किया गया `Intl` ग्लोबल `Intl` के चारों ओर एक cached wrapper है। यह formatter instances (`NumberFormat`, `DateTimeFormat`, आदि) को memoize करता है ताकि उन्हें बार-बार construct करने से बचा जा सके, जिससे performance में सुधार होता है।

```ts
import { Intl } from "intlayer";

// संख्या फॉर्मेटिंग
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// भाषाओं, क्षेत्रों आदि के लिए प्रदर्शन नाम
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// सॉर्टिंग के लिए Collation
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// बहुवचन नियम
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### अतिरिक्त Intl Features

#### `Intl.DisplayNames`

भाषाओं, क्षेत्रों, मुद्राओं और लिपियों के स्थानीयकृत नामों के लिए:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

लोकेल-जागरूक स्ट्रिंग तुलना और सॉर्टिंग के लिए:

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

विभिन्न locales में plural forms निर्धारित करने के लिए:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## स्थानीय उपयोगिताएँ

### `getLocaleName(displayLocale, targetLocale?)`

किसी स्थानीय भाषा का नाम दूसरी स्थानीय भाषा में प्राप्त करें:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### `getLocaleLang(locale?)`

लोकल स्ट्रिंग से भाषा कोड निकालता है:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

### `getLocaleFromPath(inputUrl)`

URL या पाथनेम से लोकल सेगमेंट निकालता है:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (डिफ़ॉल्ट लोकल)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

### `getPathWithoutLocale(inputUrl, locales?)`

URL या पाथनेम से लोकल सेगमेंट को हटाता है:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

वर्तमान लोकल के लिए एक स्थानीयकृत URL उत्पन्न करता है:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

### `getHTMLTextDir(locale?)`

किसी लोकल के लिए टेक्स्ट दिशा लौटाता है:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## कंटेंट हैंडलिंग उपयोगिताएँ

### `getContent(node, nodeProps, locale?)`

सभी उपलब्ध प्लगइन्स (अनुवाद, अनुक्रमण, सम्मिलन, आदि) के साथ एक कंटेंट नोड को ट्रांसफॉर्म करता है:

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

किसी भाषा सामग्री ऑब्जेक्ट से एक विशिष्ट लोकल के लिए सामग्री निकालता है:

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

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

दूरस्थ शब्दकोश से असिंक्रोनस रूप से सामग्री पुनः प्राप्त करता है:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

## नोट्स

- सभी हेल्पर `string` इनपुट स्वीकार करते हैं; उन्हें आंतरिक रूप से संख्याओं या तिथियों में परिवर्तित किया जाता है।
- यदि प्रदान नहीं किया गया है, तो स्थानीय भाषा आपके कॉन्फ़िगर किए गए `internationalization.defaultLocale` पर डिफ़ॉल्ट होती है।
- ये यूटिलिटीज़ पतले रैपर हैं; उन्नत स्वरूपण के लिए, मानक `Intl` विकल्पों का उपयोग करें।
