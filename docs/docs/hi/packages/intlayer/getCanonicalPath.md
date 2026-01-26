---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath फ़ंक्शन डॉक्यूमेंटेशन | intlayer
description: देखें कि intlayer पैकेज के लिए getCanonicalPath फ़ंक्शन का उपयोग कैसे करें
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: कस्टम URL री-राइट लागू किए गए
---

# प्रलेखन: `getCanonicalPath` फ़ंक्शन `intlayer` में

## विवरण

`getCanonicalPath` फ़ंक्शन एक लोकलाइज़्ड URL पाथ (उदा., `/a-propos`) को उसके आंतरिक कैनोनिकल एप्लिकेशन पाथ (उदा., `/about`) में रेज़ॉल्व करता है। यह routers के लिए आवश्यक है ताकि URL भाषा की परवाह किए बिना सही internal route मैच किया जा सके।

**मुख्य विशेषताएँ:**

- `[param]` सिंटैक्स का उपयोग करके डायनामिक रूट पैरामीटर को सपोर्ट करता है।
- आपकी configuration में परिभाषित कस्टम rewrite नियमों के खिलाफ localized paths से मेल खाता है।
- यदि कोई मेल खाता rewrite नियम नहीं मिलता है, तो यह मूल path वापस करता है।

---

## फ़ंक्शन सिग्नेचर

```typescript
getCanonicalPath(
  localizedPath: string,         // आवश्यक
  locale: Locales,               // आवश्यक
  rewriteRules?: RoutingConfig['rewrite'] // वैकल्पिक
): string
```

---

## पैरामीटर

### आवश्यक पैरामीटर

- `localizedPath: string`
  - **विवरण**: ब्राउज़र में दिखाई देने वाला स्थानीयकृत पथ (उदा., `/a-propos`)।
  - **प्रकार**: `string`
  - **आवश्यक**: हाँ

- `locale: Locales`
  - **विवरण**: वह locale जो रिजॉल्व किए जा रहे पथ के लिए उपयोग किया गया है।
  - **प्रकार**: `Locales`
  - **आवश्यक**: हाँ

### वैकल्पिक पैरामीटर

- `rewriteRules?: RoutingConfig['rewrite']`
  - **विवरण**: कस्टम rewrite नियमों को परिभाषित करने वाला एक ऑब्जेक्ट। यदि प्रदान नहीं किया गया है, तो यह आपके प्रोजेक्ट की configuration में मौजूद `routing.rewrite` प्रॉपर्टी पर डिफ़ॉल्ट होगा।
  - **प्रकार**: `RoutingConfig['rewrite']`
  - **डिफ़ॉल्ट**: `configuration.routing.rewrite`

---

## रिटर्न

- **प्रकार**: `string`
- **विवरण**: आंतरिक canonical पथ।

---

## उपयोग का उदाहरण

### बुनियादी उपयोग (कॉन्फ़िगरेशन के साथ)

यदि आपने अपने `intlayer.config.ts` में कस्टम rewrites कॉन्फ़िगर किए हैं:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// कॉन्फ़िगरेशन: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// आउटपुट: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// आउटपुट: "/about"
```

### डायनामिक रूट्स के साथ उपयोग

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// कॉन्फ़िगरेशन: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// आउटपुट: "/product/123"
```

### मैनुअल रीराइट नियम

आप फ़ंक्शन को मैनुअल रीराइट नियम भी दे सकते हैं:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## संबंधित फ़ंक्शन

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedPath.md): किसी canonical path को उसके स्थानीयकृत समकक्ष में हल करता है।
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md): पूर्ण रूप से स्थानीयकृत URL बनाता है (जिसमें protocol, host, और locale prefix शामिल हैं)।
