---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath फ़ंक्शन प्रलेखन | intlayer
description: देखें कि intlayer पैकेज के लिए getLocalizedPath फ़ंक्शन का उपयोग कैसे करें
keywords:
  - getLocalizedPath
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: कस्टम URL रीराइट्स लागू किए गए
---

# प्रलेखन: `getLocalizedPath` फ़ंक्शन `intlayer` में

## विवरण

The `getLocalizedPath` फ़ंक्शन एक कैनोनिकल पाथ (आंतरिक एप्लिकेशन पाथ) को दिए गए locale और rewrite नियमों के आधार पर उसके लोकलाइज़्ड समतुल्य में resolve करता है। यह विशेष रूप से उन SEO-friendly URLs को जनरेट करने के लिए उपयोगी है जो भाषा के अनुसार बदलते हैं।

**मुख्य विशेषताएँ:**

- `[param]` सिंटैक्स का उपयोग करके डायनामिक रूट पैरामीटर का समर्थन करता है।
- आपकी कॉन्फ़िगरेशन में परिभाषित कस्टम rewrite नियमों के अनुसार पाथ को resolve करता है।
- यदि निर्दिष्ट locale के लिए कोई rewrite नियम नहीं मिलता है तो यह स्वचालित रूप से कैनोनिकल पाथ पर fallback संभालता है।

---

## फ़ंक्शन सिग्नेचर

```typescript
getLocalizedPath(
  canonicalPath: string,         // अनिवार्य
  locale: Locales,               // अनिवार्य
  rewriteRules?: RoutingConfig['rewrite'] // वैकल्पिक
): string
```

---

## पैरामीटर

### आवश्यक पैरामीटर

- `canonicalPath: string`
  - **विवरण**: आंतरिक एप्लिकेशन पथ (उदा., `/about`, `/product/[id]`)।
  - **प्रकार**: `string`
  - **आवश्यक**: हाँ

- `locale: Locales`
  - **विवरण**: वह लक्षित locale जिसके लिए पथ स्थानीयकृत किया जाना चाहिए।
  - **प्रकार**: `Locales`
  - **आवश्यक**: हाँ

### वैकल्पिक पैरामीटर

- `rewriteRules?: RoutingConfig['rewrite']`
  - **विवरण**: कस्टम rewrite नियमों को परिभाषित करने वाला एक ऑब्जेक्ट। यदि प्रदान नहीं किया गया है, तो यह आपके प्रोजेक्ट कॉन्फ़िगरेशन की `routing.rewrite` प्रॉपर्टी पर डिफॉल्ट होगा।
  - **प्रकार**: `RoutingConfig['rewrite']`
  - **डिफ़ॉल्ट**: `configuration.routing.rewrite`

---

## रिटर्न

- **प्रकार**: `string`
- **विवरण**: निर्दिष्ट locale के लिए स्थानीयकृत पथ।

---

## उदाहरण उपयोग

### बुनियादी उपयोग (कॉन्फ़िगरेशन के साथ)

यदि आपने अपने `intlayer.config.ts` में कस्टम rewrite नियम कॉन्फ़िगर किए हैं:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// कॉन्फ़िगरेशन: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// आउटपुट: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// आउटपुट: "/about"
```

### डायनामिक राउट्स के साथ उपयोग

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// कॉन्फ़िगरेशन: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// आउटपुट: "/produit/123"
```

### मैन्युअल रीव्राइट नियम

आप फ़ंक्शन को मैन्युअल रीव्राइट नियम भी पास कर सकते हैं:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

---

## संबंधित फ़ंक्शन

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getCanonicalPath.md): स्थानीयकृत पथ को उसके आंतरिक canonical path में वापस हल करता है।
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md): एक पूरी तरह स्थानीयकृत URL जनरेट करता है (जिसमें protocol, host, और locale prefix शामिल हैं)।
