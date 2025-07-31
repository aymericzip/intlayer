---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getLocalizedUrl फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getLocalizedUrl
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतरराष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedUrl
---

# प्रलेखन: `intlayer` में `getLocalizedUrl` फ़ंक्शन

## विवरण

`getLocalizedUrl` फ़ंक्शन निर्दिष्ट लोकल के साथ दिए गए URL के आगे लोकलाइज़्ड URL उत्पन्न करता है। यह पूर्ण (absolute) और सापेक्ष (relative) दोनों प्रकार के URL को संभालता है, यह सुनिश्चित करते हुए कि कॉन्फ़िगरेशन के आधार पर सही लोकल उपसर्ग लागू किया गया है।

---

## पैरामीटर

- `url: string`

  - **विवरण**: मूल URL स्ट्रिंग जिसे लोकल के साथ उपसर्गित किया जाना है।
  - **प्रकार**: `string`

- `currentLocale: Locales`

  - **विवरण**: वर्तमान लोकल जिसके लिए URL लोकलाइज़ किया जा रहा है।
  - **प्रकार**: `Locales`

- `locales: Locales[]`

  - **विवरण**: समर्थित लोकल की वैकल्पिक सूची। डिफ़ॉल्ट रूप से, परियोजना में कॉन्फ़िगर किए गए लोकल प्रदान किए जाते हैं।
  - **प्रकार**: `Locales[]`
  - **डिफ़ॉल्ट**: [`परियोजना कॉन्फ़िगरेशन`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

- `defaultLocale: Locales`

  - **विवरण**: एप्लिकेशन के लिए डिफ़ॉल्ट लोकल। डिफ़ॉल्ट रूप से, परियोजना में कॉन्फ़िगर किया गया डिफ़ॉल्ट लोकल प्रदान किया जाता है।
  - **प्रकार**: `Locales`
  - **डिफ़ॉल्ट**: [`परियोजना कॉन्फ़िगरेशन`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

- `prefixDefault: boolean`
  - **विवरण**: क्या डिफ़ॉल्ट लोकल के लिए URL के आगे उपसर्ग जोड़ा जाए। डिफ़ॉल्ट रूप से, परियोजना में कॉन्फ़िगर किया गया मान प्रदान किया जाता है।
  - **प्रकार**: `boolean`
  - **डिफ़ॉल्ट**: [`परियोजना कॉन्फ़िगरेशन`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

### रिटर्न्स

- **प्रकार**: `string`
- **विवरण**: निर्दिष्ट लोकल के लिए स्थानीयकृत URL।

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

// आउटपुट: फ्रेंच लोकल के लिए "/fr/about"
// आउटपुट: डिफ़ॉल्ट (अंग्रेज़ी) लोकल के लिए "/about"
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

// आउटपुट: फ्रेंच लोकल के लिए "/fr/about"
// आउटपुट: डिफ़ॉल्ट (अंग्रेज़ी) लोकल के लिए "/about"
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

// आउटपुट: फ्रेंच लोकल के लिए "/fr/about"
// आउटपुट: डिफ़ॉल्ट (अंग्रेज़ी) लोकल के लिए "/about"
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

// आउटपुट: फ्रेंच लोकल के लिए "/fr/about"
// आउटपुट: डिफ़ॉल्ट (अंग्रेज़ी) लोकल के लिए "/about"
```

### पूर्ण URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  false // डिफ़ॉल्ट लोकल के लिए प्रीफिक्स
); // आउटपुट: फ्रेंच के लिए "https://example.com/fr/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  false // डिफ़ॉल्ट लोकल के लिए प्रीफिक्स
); // आउटपुट: अंग्रेज़ी के लिए "https://example.com/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  true // डिफ़ॉल्ट लोकल के लिए प्रीफिक्स
); // आउटपुट: अंग्रेज़ी के लिए "https://example.com/en/about"
```

### असमर्थित लोकल

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH // डिफ़ॉल्ट लोकल
); // आउटपुट: "/about" (असमर्थित लोकल के लिए कोई प्रीफिक्स लागू नहीं किया गया)
```

---

## किनारे के मामले

- **कोई लोकल सेगमेंट नहीं:**

  - यदि URL में कोई लोकल सेगमेंट नहीं है, तो फ़ंक्शन सुरक्षित रूप से उपयुक्त लोकल को प्रीफिक्स करता है।

- **डिफ़ॉल्ट लोकल:**

  - जब `prefixDefault` `false` होता है, तो फ़ंक्शन डिफ़ॉल्ट लोकल के लिए URL को प्रीफिक्स नहीं करता।

- **असमर्थित लोकल:**
  - `locales` में सूचीबद्ध नहीं किए गए लोकल के लिए, फ़ंक्शन कोई प्रीफिक्स लागू नहीं करता।

---

## अनुप्रयोगों में उपयोग

एक बहुभाषी अनुप्रयोग में, सही भाषा प्रदर्शित करने के लिए `locales` और `defaultLocale` के साथ अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना महत्वपूर्ण है। नीचे एक उदाहरण दिया गया है कि कैसे `getLocalizedUrl` को एक अनुप्रयोग सेटअप में उपयोग किया जा सकता है:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// समर्थित लोकल और डिफ़ॉल्ट लोकल के लिए कॉन्फ़िगरेशन
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

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में पहचानता है और `ENGLISH` को फॉलबैक भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getLocalizedUrl` फ़ंक्शन उपयोगकर्ता की भाषा प्राथमिकता के आधार पर गतिशील रूप से स्थानीयकृत URL उत्पन्न कर सकता है:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // आउटपुट: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // आउटपुट: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // आउटपुट: "/about"
```

`getLocalizedUrl` को एकीकृत करके, डेवलपर्स कई भाषाओं में सुसंगत URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
