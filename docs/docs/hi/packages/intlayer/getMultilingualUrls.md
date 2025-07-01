---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getMultilingualUrls.md
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
---

# दस्तावेज़ीकरण: `intlayer` में `getMultilingualUrls` फ़ंक्शन

## विवरण

`getMultilingualUrls` फ़ंक्शन प्रत्येक समर्थित भाषा-स्थान के साथ दिए गए URL को उपसर्गित करके बहुभाषी URL का एक मानचित्रण उत्पन्न करता है। यह दोनों पूर्ण और सापेक्ष URL को संभाल सकता है, और प्रदान की गई कॉन्फ़िगरेशन या डिफ़ॉल्ट के आधार पर उपयुक्त भाषा-स्थान उपसर्ग लागू करता है।

---

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

### रिटर्न्स

- **प्रकार**: `IConfigLocales<string>`
- **विवरण**: एक ऑब्जेक्ट जो प्रत्येक भाषा-स्थान को उसके संबंधित बहुभाषी URL से मैप करता है।

---

## उदाहरण उपयोग

### सापेक्ष URL

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;

module.exports = config;
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

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
