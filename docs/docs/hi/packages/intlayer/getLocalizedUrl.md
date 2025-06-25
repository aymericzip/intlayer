---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getLocalizedUrl फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getLocalizedUrl फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getLocalizedUrl
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getLocalizedUrl` फ़ंक्शन `intlayer` में

## विवरण

`getLocalizedUrl` फ़ंक्शन एक स्थानीयकृत URL उत्पन्न करता है जो दिए गए URL को निर्दिष्ट लोकेल के साथ प्रीफिक्स करता है। यह पूर्ण और सापेक्ष दोनों URL को संभालता है, यह सुनिश्चित करते हुए कि कॉन्फ़िगरेशन के आधार पर सही लोकेल प्रीफिक्स लागू किया गया है।

---

## पैरामीटर

- `url: string`

  - **विवरण**: मूल URL स्ट्रिंग जिसे लोकेल के साथ प्रीफिक्स किया जाना है।
  - **प्रकार**: `string`

- `currentLocale: Locales`

  - **विवरण**: वर्तमान लोकेल जिसके लिए URL को स्थानीयकृत किया जा रहा है।
  - **प्रकार**: `Locales`

- `locales: Locales[]`

  - **विवरण**: समर्थित लोकेल की वैकल्पिक सूची। डिफ़ॉल्ट रूप से, प्रोजेक्ट में कॉन्फ़िगर किए गए लोकेल प्रदान किए जाते हैं।
  - **प्रकार**: `Locales[]`
  - **डिफ़ॉल्ट**: [`प्रोजेक्ट कॉन्फ़िगरेशन`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

- `defaultLocale: Locales`

  - **विवरण**: एप्लिकेशन के लिए डिफ़ॉल्ट लोकेल। डिफ़ॉल्ट रूप से, प्रोजेक्ट में कॉन्फ़िगर किया गया डिफ़ॉल्ट लोकेल प्रदान किया जाता है।
  - **प्रकार**: `Locales`
  - **डिफ़ॉल्ट**: [`प्रोजेक्ट कॉन्फ़िगरेशन`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

- `prefixDefault: boolean`
  - **विवरण**: डिफ़ॉल्ट लोकेल के लिए URL को प्रीफिक्स करना है या नहीं। डिफ़ॉल्ट रूप से, प्रोजेक्ट में कॉन्फ़िगर किया गया मान प्रदान किया जाता है।
  - **प्रकार**: `boolean`
  - **डिफ़ॉल्ट**: [`प्रोजेक्ट कॉन्फ़िगरेशन`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

### रिटर्न

- **प्रकार**: `string`
- **विवरण**: निर्दिष्ट लोकेल के लिए स्थानीयकृत URL।

---

## उदाहरण उपयोग

### सापेक्ष URL

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// आउटपुट: "/fr/about" फ्रेंच लोकेल के लिए
// आउटपुट: "/about" डिफ़ॉल्ट (अंग्रेज़ी) लोकेल के लिए
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// आउटपुट: "/fr/about" फ्रेंच लोकेल के लिए
// आउटपुट: "/about" डिफ़ॉल्ट (अंग्रेज़ी) लोकेल के लिए
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// आउटपुट: "/fr/about" फ्रेंच लोकेल के लिए
// आउटपुट: "/about" डिफ़ॉल्ट (अंग्रेज़ी) लोकेल के लिए
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// आउटपुट: "/fr/about" फ्रेंच लोकेल के लिए
// आउटपुट: "/about" डिफ़ॉल्ट (अंग्रेज़ी) लोकेल के लिए
```

### पूर्ण URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // वर्तमान लोकेल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकेल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकेल
  false // डिफ़ॉल्ट लोकेल को प्रीफिक्स करें
); // आउटपुट: "https://example.com/fr/about" फ्रेंच के लिए

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकेल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकेल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकेल
  false // डिफ़ॉल्ट लोकेल को प्रीफिक्स करें
); // आउटपुट: "https://example.com/about" अंग्रेज़ी के लिए

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकेल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकेल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकेल
  true // डिफ़ॉल्ट लोकेल को प्रीफिक्स करें
); // आउटपुट: "https://example.com/en/about" अंग्रेज़ी के लिए
```

### असमर्थित लोकेल

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // वर्तमान लोकेल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकेल
  Locales.ENGLISH // डिफ़ॉल्ट लोकेल
); // आउटपुट: "/about" (असमर्थित लोकेल के लिए कोई प्रीफिक्स लागू नहीं किया गया)
```

---

## किनारे के मामले

- **कोई लोकेल खंड नहीं:**

  - यदि URL में कोई लोकेल खंड नहीं है, तो फ़ंक्शन उपयुक्त लोकेल को सुरक्षित रूप से प्रीफिक्स करता है।

- **डिफ़ॉल्ट लोकेल:**

  - जब `prefixDefault` `false` है, तो फ़ंक्शन डिफ़ॉल्ट लोकेल के लिए URL को प्रीफिक्स नहीं करता है।

- **असमर्थित लोकेल:**
  - `locales` में सूचीबद्ध नहीं लोकेल के लिए, फ़ंक्शन कोई प्रीफिक्स लागू नहीं करता है।

---

## एप्लिकेशन में उपयोग

एक बहुभाषी एप्लिकेशन में, `locales` और `defaultLocale` के साथ अंतर्राष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना यह सुनिश्चित करने के लिए महत्वपूर्ण है कि सही भाषा प्रदर्शित हो। नीचे दिखाया गया है कि `getLocalizedUrl` को एप्लिकेशन सेटअप में कैसे उपयोग किया जा सकता है:

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
```

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में पहचानता है और `ENGLISH` को बैकअप भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getLocalizedUrl` फ़ंक्शन उपयोगकर्ता की भाषा प्राथमिकता के आधार पर स्थानीयकृत URL को गतिशील रूप से उत्पन्न कर सकता है:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // आउटपुट: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // आउटपुट: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // आउटपुट: "/about"
```

`getLocalizedUrl` को एकीकृत करके, डेवलपर्स कई भाषाओं में सुसंगत URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।
