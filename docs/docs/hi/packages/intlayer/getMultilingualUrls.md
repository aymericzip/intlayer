---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getMultilingualUrls फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getMultilingualUrls फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getMultilingualUrls
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# दस्तावेज़ीकरण: `intlayer` में `getMultilingualUrls` फ़ंक्शन

## विवरण

`getMultilingualUrls` फ़ंक्शन प्रत्येक समर्थित locale के साथ दिए गए URL को प्रीफ़िक्स करके बहुभाषी URLs की एक mapping तैयार करता है। यह निरपेक्ष और सापेक्ष दोनों URLs को संभाल सकता है, प्रदान किए गए कॉन्फ़िगरेशन या डिफ़ॉल्ट के आधार पर उपयुक्त locale prefix लागू करता है।

**मुख्य विशेषताएं:**

- केवल 1 पैरामीटर आवश्यक है: `url`
- Optional `options` ऑब्जेक्ट जिसमें `locales`, `defaultLocale`, और `mode` हैं
- अपने प्रोजेक्ट के internationalization कॉन्फ़िगरेशन को डिफ़ॉल्ट के रूप में उपयोग करता है
- कई routing modes को समर्थन करता है: `prefix-no-default`, `prefix-all`, `no-prefix`, और `search-params`
- एक mapping ऑब्जेक्ट रिटर्न करता है जिसमें सभी locales keys के रूप में हैं और उनके संबंधित URLs values के रूप में हैं

---

## विवरण

`getMultilingualUrls` फ़ंक्शन प्रत्येक समर्थित भाषा-स्थान के साथ दिए गए URL को उपसर्गित करके बहुभाषी URL का एक मानचित्रण उत्पन्न करता है। यह दोनों पूर्ण और सापेक्ष URL को संभाल सकता है, और प्रदान की गई कॉन्फ़िगरेशन या डिफ़ॉल्ट के आधार पर उपयुक्त भाषा-स्थान उपसर्ग लागू करता है।

---

## पैरामीटर

## पैरामीटर

- `url: string`
  - **विवरण**: मूल URL स्ट्रिंग जिसे भाषा-स्थान के साथ उपसर्गित किया जाना है।
  - **प्रकार**: `string`

- `locales: Locales[]`
  - **विवरण**: समर्थित भाषा-स्थान की वैकल्पिक सूची। डिफ़ॉल्ट रूप से परियोजना में कॉन्फ़िगर किए गए भाषा-स्थान होते हैं।
  - **प्रकार**: `Locales[]`
  - **डिफ़ॉल्ट**: `localesDefault`

- `defaultLocale: Locales`
  - **विवरण**: एप्लिकेशन के लिए डिफ़ॉल्ट भाषा-स्थान। डिफ़ॉल्ट रूप से परियोजना में कॉन्फ़िगर किए गए डिफ़ॉल्ट भाषा-स्थान होते हैं।
  - **प्रकार**: `Locales`
  - **डिफ़ॉल्ट**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **विवरण**: क्या डिफ़ॉल्ट भाषा-स्थान को उपसर्गित करना है। डिफ़ॉल्ट रूप से परियोजना में कॉन्फ़िगर किए गए मान का उपयोग किया जाता है।
  - **प्रकार**: `boolean`
  - **डिफ़ॉल्ट**: `prefixDefaultDefault`

### वैकल्पिक Parameters

- `options?: object`
  - **Description**: URL localization behavior के लिए configuration object।
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: समर्थित locales की array। यदि प्रदान नहीं किया गया है, तो आपके project configuration से configured locales का उपयोग करता है।
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: application के लिए default locale। यदि प्रदान नहीं किया गया है, तो आपके project configuration से configured default locale का उपयोग करता है।
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: locale handling के लिए URL routing mode। यदि प्रदान नहीं किया गया है, तो आपके project configuration से configured mode का उपयोग करता है।
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Default locale के लिए कोई prefix नहीं, अन्य सभी के लिए prefix
      - `prefix-all`: सभी locales के लिए prefix, default सहित
      - `no-prefix`: URL में कोई locale prefix नहीं
      - `search-params`: Locale के लिए query parameters का उपयोग करें (जैसे, `?locale=fr`)

### रिटर्न्स

- **प्रकार**: `IConfigLocales<string>`
- **विवरण**: एक ऑब्जेक्ट जो प्रत्येक भाषा-स्थान को उसके संबंधित बहुभाषी URL से मैप करता है।

---

## उदाहरण उपयोग

### बुनियादी उपयोग (परियोजना कॉन्फ़िगरेशन का उपयोग करता है)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// आपकी परियोजना के कॉन्फ़िगरेशन को locales, defaultLocale, और mode के लिए उपयोग करता है
getMultilingualUrls("/dashboard");
// आउटपुट (यह मानते हुए कि परियोजना कॉन्फ़िगरेशन में en, fr है mode 'prefix-no-default' के साथ):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### सापेक्ष URL

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// आउटपुट: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### पूर्ण URL

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// आउटपुट: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### विभिन्न रूटिंग मोड्स

```typescript
// prefix-no-default: डिफ़ॉल्ट लोकेल के लिए कोई प्रीफिक्स नहीं
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// आउटपुट: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: सभी लोकेल्स के लिए प्रीफिक्स
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// आउटपुट: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: URLs में कोई लोकेल प्रीफिक्स नहीं
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// आउटपुट: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: क्वेरी पैरामीटर के रूप में लोकेल
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// आउटपुट: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## किनारे के मामले

- **कोई भाषा-स्थान खंड नहीं:**
  - फ़ंक्शन बहुभाषी मैपिंग बनाने से पहले URL से किसी भी मौजूदा लोकेल सेगमेंट को हटा देता है।

- **डिफ़ॉल्ट लोकेल:**
  - जब `prefixDefault` `false` होता है, तो फ़ंक्शन डिफ़ॉल्ट लोकेल के लिए URL को प्रीफ़िक्स नहीं करता है।

- **असमर्थित लोकेल:**
  - केवल `locales` एरे में दिए गए लोकेल को ही URL बनाने के लिए माना जाता है।

---

## अनुप्रयोगों में उपयोग

एक बहुभाषी अनुप्रयोग में, सही भाषा प्रदर्शित करने के लिए `locales` और `defaultLocale` के साथ अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना महत्वपूर्ण है। नीचे एक उदाहरण दिया गया है कि कैसे `getMultilingualUrls` को अनुप्रयोग सेटअप में उपयोग किया जा सकता है:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// समर्थित लोकेल और डिफ़ॉल्ट लोकेल के लिए कॉन्फ़िगरेशन
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

उपरोक्त कॉन्फ़िगरेशन सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में पहचानता है और `ENGLISH` को फॉलबैक भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करते हुए, `getMultilingualUrls` फ़ंक्शन एप्लिकेशन के समर्थित लोकल्स के आधार पर बहुभाषी URL मैपिंग्स को गतिशील रूप से उत्पन्न कर सकता है:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// आउटपुट:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// आउटपुट:
// {
//   en: "https://example.com/en/dashboard",
  fr: "https://example.com/fr/dashboard",
  es: "https://example.com/es/dashboard"
}
```

`getMultilingualUrls` को एकीकृत करके, डेवलपर्स कई भाषाओं में सुसंगत URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।
