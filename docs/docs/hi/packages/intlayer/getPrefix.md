---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getPrefix फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getPrefix
  - prefix
  - Intlayer
  - intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: प्रारंभिक दस्तावेज़ीकरण
---

# दस्तावेज़ीकरण: `intlayer` में `getPrefix` फ़ंक्शन

## विवरण

`getPrefix` फ़ंक्शन रूटिंग मोड कॉन्फ़िगरेशन के आधार पर दिए गए locale के लिए URL प्रीफ़िक्स निर्धारित करता है। यह locale की तुलना डिफ़ॉल्ट locale से करता है और लचीले URL निर्माण के लिए तीन अलग-अलग प्रीफ़िक्स प्रारूपों वाला एक ऑब्जेक्ट लौटाता है।

**मुख्य विशेषताएँ:**

- पहले पैरामीटर के रूप में एक locale लेता है (आवश्यक)
- वैकल्पिक `options` ऑब्जेक्ट जिसमें `defaultLocale` और `mode` शामिल हैं
- `prefix` और `localePrefix` गुणों वाला एक ऑब्जेक्ट लौटाता है
- सभी रूटिंग मोड का समर्थन करता है: `prefix-no-default`, `prefix-all`, `no-prefix`, और `search-params`
- locale प्रीफ़िक्स जोड़ने के समय निर्धारित करने के लिए हल्का उपयोगिता

---

## फ़ंक्शन सिग्नेचर

```typescript
getPrefix(
  locale: Locales,               // आवश्यक
  options?: {                    // वैकल्पिक
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // उदाहरण के लिए, 'fr/' या ''
  localePrefix?: Locale; // उदाहरण के लिए, 'fr' या undefined
}
```

---

## पैरामीटर

- `locale: Locales`
  - **विवरण**: उस locale के लिए prefix उत्पन्न करने के लिए। यदि मान falsy है (undefined, null, खाली स्ट्रिंग), तो फ़ंक्शन एक खाली स्ट्रिंग लौटाता है।
  - **प्रकार**: `Locales`
  - **आवश्यक**: हाँ

- `options?: object`
  - **विवरण**: prefix निर्धारण के लिए कॉन्फ़िगरेशन ऑब्जेक्ट।
  - **प्रकार**: `object`
  - **आवश्यक**: नहीं (वैकल्पिक)

  - `options.defaultLocale?: Locales`
    - **विवरण**: एप्लिकेशन के लिए डिफ़ॉल्ट locale। यदि प्रदान नहीं किया गया है, तो आपके प्रोजेक्ट कॉन्फ़िगरेशन से कॉन्फ़िगर किया गया डिफ़ॉल्ट locale उपयोग किया जाता है।
    - **प्रकार**: `Locales`
    - **डिफ़ॉल्ट**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **विवरण**: locale हैंडलिंग के लिए URL रूटिंग मोड। यदि प्रदान नहीं किया गया है, तो आपके प्रोजेक्ट कॉन्फ़िगरेशन से कॉन्फ़िगर किया गया मोड उपयोग किया जाता है।
    - **प्रकार**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **डिफ़ॉल्ट**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)
    - **मोड्स**:
      - `prefix-no-default`: जब locale डिफ़ॉल्ट locale से मेल खाता है तो खाली स्ट्रिंग लौटाता है
      - `prefix-all`: सभी locales के लिए prefix लौटाता है जिसमें डिफ़ॉल्ट भी शामिल है
      - `no-prefix`: खाली स्ट्रिंग लौटाता है (URLs में कोई prefix नहीं)
      - `search-params`: खाली स्ट्रिंग लौटाता है (locale क्वेरी पैरामीटर में)

### Returns

- **प्रकार**: `GetPrefixResult`
- **विवरण**: एक ऑब्जेक्ट जिसमें तीन अलग-अलग prefix फॉर्मेट शामिल हैं:
  - `prefix`: ट्रेलिंग स्लैश के साथ पाथ प्रीफिक्स (जैसे, `'fr/'`, `''`)
  - `localePrefix`: स्लैश के बिना locale पहचानकर्ता (जैसे, `'fr'`, `undefined`)

---

## उदाहरण उपयोग

### बुनियादी उपयोग

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// अंग्रेज़ी locale के लिए प्रीफिक्स जांचें
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// लौटाता है: { prefix: 'en/', localePrefix: 'en' }

// फ्रेंच locale के लिए प्रीफिक्स जांचें
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// लौटाता है: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// लौटाता है: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// लौटाता है: { prefix: '', localePrefix: undefined }
```

### विभिन्न रूटिंग मोड्स

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: हमेशा प्रीफिक्स लौटाता है
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// लौटाता है: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: जब locale डिफ़ॉल्ट से मेल खाता है तो कोई प्रीफिक्स नहीं
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// लौटाता है: { prefix: '', localePrefix: undefined }

// prefix-no-default: जब locale डिफ़ॉल्ट से भिन्न हो तो प्रीफिक्स लौटाता है
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// लौटाता है: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: कभी भी प्रीफिक्स नहीं लौटाता
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// लौटाता है: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// लौटाता है: { prefix: '', localePrefix: undefined }
```

### व्यावहारिक उदाहरण

```typescript
import { getPrefix, Locales } from "intlayer";

// किसी विशिष्ट locale के लिए उपयुक्त प्रीफिक्स के साथ URLs बनाएं
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// पथ निर्माण के लिए प्रीफिक्स का उपयोग करना
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// परिणाम: "/fr/about"

// localePrefix का उपयोग locale पहचान के लिए
console.log(`वर्तमान locale: ${localePrefix}`);
// आउटपुट: "वर्तमान locale: fr"
```

---

## संबंधित फ़ंक्शन

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md): एक विशिष्ट locale के लिए स्थानीयकृत URL उत्पन्न करता है
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getMultilingualUrls.md): सभी कॉन्फ़िगर किए गए locales के लिए URLs उत्पन्न करता है

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // ट्रेलिंग स्लैश के साथ पथ प्रीफिक्स (जैसे, 'fr/' या '')
  localePrefix?: Locale; // स्लैश के बिना locale पहचानकर्ता (जैसे, 'fr' या undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
