---
createdAt: 2024-08-13
updatedAt: 2025-08-18
title: फॉर्मैटर्स
description: नंबर, प्रतिशत, मुद्रा, तिथियाँ, सापेक्ष समय, इकाइयाँ, और कॉम्पैक्ट नोटेशन के लिए Intl आधारित स्थानीय-संवेदनशील फॉर्मैटिंग यूटिलिटीज़। इसमें एक कैश्ड Intl हेल्पर शामिल है।
keywords:
  - फॉर्मैटर्स
  - Intl
  - नंबर
  - मुद्रा
  - प्रतिशत
  - तिथि
  - सापेक्ष समय
  - इकाइयाँ
  - कॉम्पैक्ट
  - अंतरराष्ट्रीयकरण
slugs:
  - doc
  - formatters
---

# Intlayer फॉर्मैटर्स

## अवलोकन

Intlayer मूल `Intl` APIs के ऊपर बनाए गए हल्के हेल्पर्स का एक सेट प्रदान करता है, साथ ही एक कैश्ड `Intl` रैपर भी है जो भारी फॉर्मैटर्स को बार-बार बनाने से बचाता है। ये यूटिलिटीज़ पूरी तरह से स्थानीय-संवेदनशील हैं और मुख्य `intlayer` पैकेज से उपयोग की जा सकती हैं।

### आयात करें

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
} from "intlayer";
```

यदि आप React का उपयोग कर रहे हैं, तो हुक्स भी उपलब्ध हैं; देखें `react-intlayer/format`।

## कैश्ड Intl

निर्यातित `Intl` वैश्विक `Intl` के चारों ओर एक पतला, कैश्ड रैपर है। यह `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat` के उदाहरणों को मेमोइज़ करता है, जिससे एक ही फॉर्मैटर को बार-बार पुनर्निर्मित करने से बचा जाता है।

चूंकि फॉर्मैटर निर्माण अपेक्षाकृत महंगा होता है, यह कैशिंग प्रदर्शन में सुधार करती है बिना व्यवहार को बदले। यह रैपर मूल `Intl` के समान API प्रदान करता है, इसलिए उपयोग समान होता है।

- कैशिंग प्रति प्रक्रिया होती है और कॉलर्स के लिए पारदर्शी होती है।

> यदि `Intl.DisplayNames` पर्यावरण में उपलब्ध नहीं है, तो एक बार केवल डेवलपर के लिए चेतावनी प्रदर्शित की जाती है (पॉलीफिल पर विचार करें)।

उदाहरण:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## फॉर्मैटर

नीचे दिए गए सभी हेल्पर `intlayer` से निर्यातित हैं।

### `number(value, options?)`

लोकल-आधारित समूह और दशमलव का उपयोग करके एक संख्यात्मक मान को स्वरूपित करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

उदाहरण:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en-US में)
number("1000000", { locale: "fr" }); // "1 000 000"
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

एक मान को स्थानीयकृत मुद्रा के रूप में स्वरूपित करता है। डिफ़ॉल्ट रूप से यह `USD` होता है जिसमें दो दशमलव अंक होते हैं।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - सामान्य फ़ील्ड: `currency` (जैसे, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

उदाहरण:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

`Intl.DateTimeFormat` के साथ एक दिनांक/समय मान को स्वरूपित करता है।

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` या निम्न प्रीसेट्स में से एक:
  - प्रीसेट्स: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

उदाहरण:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // उदाहरण के लिए, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

`Intl.RelativeTimeFormat` के साथ दो क्षणों के बीच सापेक्ष समय को स्वरूपित करता है।

- प्राकृतिक अभिव्यक्ति प्राप्त करने के लिए पहले तर्क के रूप में "now" पास करें और लक्ष्य को दूसरे तर्क के रूप में दें।
- **from**: `Date | string | number`
- **to**: `Date | string | number` (डिफ़ॉल्ट `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - डिफ़ॉल्ट `unit` है `"second"`।

उदाहरण:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

संख्यात्मक मान को `Intl.NumberFormat` के साथ `style: 'unit'` का उपयोग करके स्थानीयकृत इकाई स्ट्रिंग के रूप में स्वरूपित करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - सामान्य फ़ील्ड: `unit` (जैसे, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - डिफ़ॉल्ट: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

उदाहरण:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (locale-dependent)
```

### `compact(value, options?)`

संख्या को कॉम्पैक्ट नोटेशन (जैसे, `1.2K`, `1M`) का उपयोग करके स्वरूपित करता है।

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (अंदर से `notation: 'compact'` का उपयोग करता है)

उदाहरण:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## नोट्स

- सभी हेल्पर `string` इनपुट स्वीकार करते हैं; इन्हें आंतरिक रूप से नंबर या तारीखों में बदला जाता है।
- यदि लोकल प्रदान नहीं किया गया है, तो यह आपके कॉन्फ़िगर किए गए `internationalization.defaultLocale` को डिफ़ॉल्ट रूप से उपयोग करता है।
- ये यूटिलिटीज़ पतले रैपर हैं; उन्नत स्वरूपण के लिए, मानक `Intl` विकल्प पास करें।

## प्रवेश बिंदु और पुनः-निर्यात (`@index.ts`)

फॉर्मैटर कोर पैकेज में रहते हैं और उच्च-स्तरीय पैकेजों से पुनः-निर्यात किए जाते हैं ताकि रनटाइम्स में इम्पोर्ट्स को सहज बनाया जा सके:

उदाहरण:

```ts
// ऐप कोड (अनुशंसित)
import { number, currency, date, Intl } from "intlayer";
```

### रिएक्ट

क्लाइंट कंपोनेंट्स:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// या Next.js ऐप्स में
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

सर्वर कंपोनेंट्स (या रिएक्ट सर्वर रनटाइम):

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/server/format";
// या Next.js ऐप्स में
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> ये हुक्स `IntlayerProvider` या `IntlayerServerProvider` से लोकल को ध्यान में रखेंगे

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                   |
| ------- | ---------- | -------------------------- |
| 5.8.0   | 2025-08-18 | फॉर्मेटर्स दस्तावेज़ जोड़ा |
