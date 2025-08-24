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
---

# Intlayer फॉर्मेटर्स

## अवलोकन

Intlayer नेटिव `Intl` APIs के ऊपर बनाए गए हल्के हेल्पर्स का एक सेट प्रदान करता है, साथ ही भारी फॉर्मेटर्स को बार-बार बनाने से बचने के लिए एक कैश्ड `Intl` रैपर भी शामिल है। ये यूटिलिटीज पूरी तरह से लोकल-आधारित हैं और मुख्य `intlayer` पैकेज से उपयोग की जा सकती हैं।

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
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

यदि आप React का उपयोग कर रहे हैं, तो हुक्स भी उपलब्ध हैं; देखें `react-intlayer/format`।

## कैश्ड Intl

निर्यातित `Intl` वैश्विक `Intl` के चारों ओर एक पतला, कैश्ड रैपर है। यह `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator`, और `PluralRules` के उदाहरणों को मेमोइज़ करता है, जो एक ही फॉर्मेटर को बार-बार पुनर्निर्माण करने से बचाता है।

चूंकि फॉर्मेटर निर्माण अपेक्षाकृत महंगा होता है, यह कैशिंग प्रदर्शन में सुधार करती है बिना व्यवहार को बदले। रैपर मूल `Intl` के समान API प्रदान करता है, इसलिए उपयोग समान होता है।

- कैशिंग प्रति प्रक्रिया होती है और कॉलर्स के लिए पारदर्शी होती है।

> यदि `Intl.DisplayNames` पर्यावरण में उपलब्ध नहीं है, तो एकल डेवलपर-केवल चेतावनी प्रदर्शित की जाती है (पॉलीफिल पर विचार करें)।

उदाहरण:

```ts
import { Intl } from "intlayer";

// संख्या स्वरूपण
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// भाषाओं, क्षेत्रों आदि के लिए डिस्प्ले नाम
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// क्रमबद्ध करने के लिए कोलेशन
const collator = new Intl.Collator("fr", { sensitivity: "base" });
// स्ट्रिंग की तुलना के लिए collator का उपयोग करें
collator.compare("é", "e"); // 0 (समान)

// बहुवचन नियम
const pluralRules = new Intl.PluralRules("fr");
// संख्या 1 के लिए बहुवचन रूप चुनें
pluralRules.select(1); // "one"
// संख्या 2 के लिए बहुवचन रूप चुनें
pluralRules.select(2); // "other"
```

## अतिरिक्त Intl उपयोगिताएँ

फॉर्मेटर हेल्पर्स के अलावा, आप अन्य Intl फीचर्स के लिए कैश किए गए Intl रैपर का सीधे उपयोग भी कर सकते हैं:

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

### `Intl.Collator`

स्थानीय भाषा के अनुसार स्ट्रिंग की तुलना और क्रमबद्धता के लिए:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base", // तुलना की संवेदनशीलता
  numeric: true, // संख्यात्मक तुलना सक्षम करें
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
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

## स्थानीय उपयोगिताएँ

### `getLocaleName(displayLocale, targetLocale?)`

किसी स्थानीय भाषा का नाम दूसरी स्थानीय भाषा में प्राप्त करें:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: उस लोकल का नाम प्राप्त करने के लिए
- **targetLocale**: जिस लोकल में नाम दिखाना है (डिफ़ॉल्ट रूप से displayLocale)

### `getLocaleLang(locale?)`

लोकल स्ट्रिंग से भाषा कोड निकालता है:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: उस लोकल से भाषा निकालने के लिए (डिफ़ॉल्ट रूप से वर्तमान लोकल)

### `getLocaleFromPath(inputUrl)`

URL या पाथनेम से लोकल सेगमेंट निकालता है:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (डिफ़ॉल्ट लोकल)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: पूरी URL स्ट्रिंग या पाथनेम जिसे प्रोसेस करना है
- **returns**: पता लगाया गया लोकल या डिफ़ॉल्ट लोकल यदि कोई लोकल नहीं मिला हो

### `getPathWithoutLocale(inputUrl, locales?)`

URL या पाथनेम से लोकल सेगमेंट को हटाता है:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: पूरी URL स्ट्रिंग या पाथनेम जिसे प्रोसेस करना है
- **locales**: समर्थित लोकल्स की वैकल्पिक सूची (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए लोकल्स)
- **returns**: लोकल सेगमेंट के बिना URL

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

वर्तमान लोकल के लिए एक स्थानीयकृत URL उत्पन्न करता है:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: स्थानीयकृत करने के लिए मूल URL
- **currentLocale**: वर्तमान लोकल
- **locales**: समर्थित लोकल्स की वैकल्पिक सूची (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए लोकल्स)
- **defaultLocale**: वैकल्पिक डिफ़ॉल्ट लोकल (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल)
- **prefixDefault**: क्या डिफ़ॉल्ट लोकल को प्रीफ़िक्स करना है (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए मान)

### `getHTMLTextDir(locale?)`

किसी लोकल के लिए टेक्स्ट दिशा लौटाता है:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: टेक्स्ट दिशा प्राप्त करने के लिए लोकल (डिफ़ॉल्ट रूप से वर्तमान लोकल)
- **returns**: `"ltr"`, `"rtl"`, या `"auto"`

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

- **node**: परिवर्तित करने के लिए सामग्री नोड
- **nodeProps**: रूपांतरण संदर्भ के लिए गुण
- **locale**: वैकल्पिक लोकल (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल)

### `getLocalisedContent(node, locale, nodeProps, fallback?)`

केवल अनुवाद प्लगइन के साथ सामग्री नोड को परिवर्तित करता है:

```ts
import { getLocalisedContent } from "intlayer";

const content = getLocalisedContent(
  contentNode,
  "fr",
  { dictionaryKey: "common" },
  true // यदि अनुवाद गायब हो तो डिफ़ॉल्ट लोकल पर वापस जाएं
);
```

- **node**: परिवर्तित करने के लिए सामग्री नोड
- **locale**: अनुवाद के लिए उपयोग किया जाने वाला लोकल
- **nodeProps**: रूपांतरण संदर्भ के लिए गुण
- **fallback**: क्या डिफ़ॉल्ट लोकल पर वापस जाना है (डिफ़ॉल्ट रूप से false)

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

- **languageContent**: लोकल को सामग्री से मैप करने वाला ऑब्जेक्ट
- **locale**: लक्षित लोकल (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल)
- **fallback**: क्या डिफ़ॉल्ट लोकल पर वापस जाना है (डिफ़ॉल्ट रूप से true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

डिक्शनरी की कुंजी से सामग्री प्राप्त करता है और रूपांतरित करता है:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: पुनः प्राप्त करने के लिए शब्दकोश की कुंजी
- **locale**: वैकल्पिक लोकल (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल)
- **plugins**: कस्टम रूपांतरण प्लगइन्स की वैकल्पिक सूची

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

दूरस्थ शब्दकोश से असिंक्रोनस रूप से सामग्री पुनः प्राप्त करता है:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: पुनः प्राप्त करने के लिए शब्दकोश की कुंजी
- **locale**: वैकल्पिक लोकल (डिफ़ॉल्ट रूप से कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल)
- **plugins**: कस्टम रूपांतरण प्लगइन्स की वैकल्पिक सूची

## फॉर्मेटर्स

नीचे सभी हेल्पर्स `intlayer` से निर्यात किए गए हैं।

### `number(value, options?)`

संख्या मान को लोकल-संवेदनशील समूहबद्धता और दशमलव के साथ स्वरूपित करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

उदाहरण:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en-US में)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

संख्या को प्रतिशत स्ट्रिंग के रूप में स्वरूपित करता है।

व्यवहार: 1 से अधिक मानों को पूर्ण प्रतिशत के रूप में व्याख्यायित किया जाता है और सामान्यीकृत किया जाता है (जैसे, `25` → `25%`, `0.25` → `25%`)।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

उदाहरण:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

मूल्य को स्थानीयकृत मुद्रा के रूप में स्वरूपित करता है। डिफ़ॉल्ट रूप से `USD` और दो दशमलव अंकों के साथ।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - सामान्य फ़ील्ड: `currency` (जैसे, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

उदाहरण:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

`Intl.DateTimeFormat` के साथ तिथि/समय मान को स्वरूपित करता है।

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` या प्रीसेट्स में से एक:
  - प्रीसेट्स: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

उदाहरण:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // उदाहरण के लिए, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

`Intl.RelativeTimeFormat` के साथ दो समय बिंदुओं के बीच सापेक्ष समय को स्वरूपित करता है।

- प्राकृतिक अभिव्यक्ति पाने के लिए पहले तर्क के रूप में "now" और दूसरे के रूप में लक्ष्य पास करें।
- **from**: `Date | string | number`
- **to**: `Date | string | number` (डिफ़ॉल्ट `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - डिफ़ॉल्ट `unit` `"second"` है।

उदाहरण:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "3 दिनों में"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 घंटे पहले"
```

### `units(value, options?)`

`Intl.NumberFormat` के साथ `style: 'unit'` का उपयोग करके एक संख्यात्मक मान को स्थानीयकृत इकाई स्ट्रिंग के रूप में स्वरूपित करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - सामान्य फ़ील्ड: `unit` (जैसे, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - डिफ़ॉल्ट: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

उदाहरण:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (स्थान-निर्भर)
```

### `compact(value, options?)`

संक्षिप्त संकेतन का उपयोग करके एक संख्या को स्वरूपित करता है (जैसे, `1.2K`, `1M`)।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (अंदर `notation: 'compact'` का उपयोग करता है)

उदाहरण:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

`Intl.ListFormat` का उपयोग करके मानों की एक सरणी को स्थानीयकृत सूची स्ट्रिंग में स्वरूपित करता है।

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - सामान्य फ़ील्ड: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - डिफ़ॉल्ट: `type: 'conjunction'`, `style: 'long'`

उदाहरण:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## नोट्स

- सभी हेल्पर `string` इनपुट स्वीकार करते हैं; उन्हें आंतरिक रूप से संख्याओं या तिथियों में परिवर्तित किया जाता है।
- यदि प्रदान नहीं किया गया है, तो स्थानीय भाषा आपके कॉन्फ़िगर किए गए `internationalization.defaultLocale` पर डिफ़ॉल्ट होती है।
- ये यूटिलिटीज़ पतले रैपर हैं; उन्नत स्वरूपण के लिए, मानक `Intl` विकल्पों का उपयोग करें।

## प्रवेश बिंदु और पुनः-निर्यात (`@index.ts`)

फॉर्मेटर कोर पैकेज में रहते हैं और उच्च-स्तरीय पैकेजों से पुनः निर्यात किए जाते हैं ताकि रनटाइम्स में आयात सहज बने रहें:

उदाहरण:

```ts
// ऐप कोड (अनुशंसित)
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

### रिएक्ट

क्लाइंट कंपोनेंट्स:

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
// या Next.js ऐप्स में
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

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

सर्वर कंपोनेंट्स (या रिएक्ट सर्वर रनटाइम):

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
} from "intlayer/server/format";
// या Next.js ऐप्स में
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

> ये हुक्स `IntlayerProvider` या `IntlayerServerProvider` से लोकल को ध्यान में रखेंगे

### Vue

क्लाइंट कंपोनेंट्स:

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

> ये कॉम्पोज़ेबल्स इंजेक्ट किए गए `IntlayerProvider` से लोकल को ध्यान में रखेंगे

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                                                                         |
| ------- | ---------- | -------------------------------------------------------------------------------- |
| 5.8.0   | 2025-08-20 | vue फॉर्मैटर्स जोड़े                                                             |
| 5.8.0   | 2025-08-18 | फॉर्मैटर्स दस्तावेज़ जोड़े                                                       |
| 5.8.0   | 2025-08-20 | सूची स्वरूपक प्रलेखन जोड़ें                                                      |
| 5.8.0   | 2025-08-20 | अतिरिक्त Intl उपयोगिताएँ जोड़ें (DisplayNames, Collator, PluralRules)            |
| 5.8.0   | 2025-08-20 | लोकल उपयोगिताएँ जोड़ें (getLocaleName, getLocaleLang, getLocaleFromPath, आदि)    |
| 5.8.0   | 2025-08-20 | सामग्री प्रबंधन उपयोगिताएँ जोड़ें (getContent, getTranslation, getIntlayer, आदि) |
