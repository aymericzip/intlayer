---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getMultilingualUrls फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getMultilingualUrls फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getMultilingualUrls
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getMultilingualUrls` फ़ंक्शन `intlayer` में

## विवरण

`getMultilingualUrls` फ़ंक्शन बहुभाषी URLs का एक मैपिंग उत्पन्न करता है, दिए गए URL को प्रत्येक समर्थित लोकेल के साथ प्रीफिक्स करके। यह दोनों पूर्ण और सापेक्ष URLs को संभाल सकता है, प्रदान की गई कॉन्फ़िगरेशन या डिफ़ॉल्ट्स के आधार पर उपयुक्त लोकेल प्रीफिक्स लागू करता है।

---

## पैरामीटर्स

- `url: string`

  - **विवरण**: मूल URL स्ट्रिंग जिसे लोकेल्स के साथ प्रीफिक्स किया जाना है।
  - **प्रकार**: `string`

- `locales: Locales[]`

  - **विवरण**: समर्थित लोकेल्स की वैकल्पिक सूची। प्रोजेक्ट में कॉन्फ़िगर किए गए लोकेल्स को डिफ़ॉल्ट मानता है।
  - **प्रकार**: `Locales[]`
  - **डिफ़ॉल्ट**: `localesDefault`

- `defaultLocale: Locales`

  - **विवरण**: एप्लिकेशन के लिए डिफ़ॉल्ट लोकेल। प्रोजेक्ट में कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकेल को डिफ़ॉल्ट मानता है।
  - **प्रकार**: `Locales`
  - **डिफ़ॉल्ट**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **विवरण**: डिफ़ॉल्ट लोकेल को प्रीफिक्स करना है या नहीं। प्रोजेक्ट में कॉन्फ़िगर किए गए मान को डिफ़ॉल्ट मानता है।
  - **प्रकार**: `boolean`
  - **डिफ़ॉल्ट**: `prefixDefaultDefault`

### रिटर्न्स

- **प्रकार**: `IConfigLocales<string>`
- **विवरण**: प्रत्येक लोकेल को उसके संबंधित बहुभाषी URL के साथ मैप करने वाला एक ऑब्जेक्ट।

---

## उदाहरण उपयोग

### सापेक्ष URLs

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

### पूर्ण URLs

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

- **कोई लोकेल सेगमेंट नहीं:**

  - फ़ंक्शन URL से किसी भी मौजूदा लोकेल सेगमेंट को हटाता है, इससे पहले कि बहुभाषी मैपिंग उत्पन्न हो।

- **डिफ़ॉल्ट लोकेल:**

  - जब `prefixDefault` `false` होता है, तो फ़ंक्शन डिफ़ॉल्ट लोकेल के लिए URL को प्रीफिक्स नहीं करता।

- **असमर्थित लोकेल्स:**
  - केवल `locales` ऐरे में प्रदान किए गए लोकेल्स को URLs उत्पन्न करने के लिए माना जाता है।

---

## एप्लिकेशन में उपयोग

एक बहुभाषी एप्लिकेशन में, `locales` और `defaultLocale` के साथ अंतर्राष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना सही भाषा सुनिश्चित करने के लिए महत्वपूर्ण है। नीचे दिखाया गया है कि `getMultilingualUrls` को एप्लिकेशन सेटअप में कैसे उपयोग किया जा सकता है:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// समर्थित लोकेल्स और डिफ़ॉल्ट लोकेल के लिए कॉन्फ़िगरेशन
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
```

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में पहचानता है और `ENGLISH` को बैकअप भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getMultilingualUrls` फ़ंक्शन एप्लिकेशन के समर्थित लोकेल्स के आधार पर गतिशील रूप से बहुभाषी URL मैपिंग उत्पन्न कर सकता है:

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
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

`getMultilingualUrls` को एकीकृत करके, डेवलपर्स कई भाषाओं में सुसंगत URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।
