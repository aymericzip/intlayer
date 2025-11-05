---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: URL से गलत लोकल प्राप्त हुआ
description: URL से गलत लोकल प्राप्त होने की समस्या को कैसे ठीक करें, जानें।
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# URL से गलत लोकल प्राप्त हुआ

## समस्या का विवरण

जब आप URL से locale पैरामीटर को एक्सेस करने की कोशिश करते हैं, तो आपको एक समस्या का सामना करना पड़ सकता है जहाँ locale का मान गलत होता है:

```js
const { locale } = await params;
console.log(locale); // अपेक्षित locale के बजाय "about" लौटाता है
```

## समाधान

### 1. फ़ाइल संरचना सत्यापित करें

सुनिश्चित करें कि आपका Next.js ऐप राउटर पथ इस संरचना का पालन करता है:

```bash
src/app/[locale]/about/page.tsx
```

### 2. मिडलवेयर कॉन्फ़िगरेशन जांचें

यह समस्या अक्सर तब होती है जब मिडलवेयर मौजूद नहीं होता या सक्रिय नहीं होता। मिडलवेयर फ़ाइल इस स्थान पर होनी चाहिए:

```bash
src/middleware.ts
```

यह मिडलवेयर तब रूट्स को पुनः लिखने के लिए जिम्मेदार होता है जब `prefixDefault` को `false` पर सेट किया गया हो। उदाहरण के लिए, यह `/en/about` को `/about` में पुनः लिखता है।

### 3. कॉन्फ़िगरेशन के आधार पर URL पैटर्न

#### डिफ़ॉल्ट कॉन्फ़िगरेशन (`prefixDefault: false`, `noPrefix: false`)

- अंग्रेज़ी: `/about`
- फ्रेंच: `/fr/about`
- स्पेनिश: `/es/about`

#### `prefixDefault: true` के साथ

- अंग्रेज़ी: `/en/about`
- फ्रेंच: `/fr/about`
- स्पेनिश: `/es/about`

#### `noPrefix: true` के साथ

- अंग्रेज़ी: `/about`
- फ्रेंच: `/about`
- स्पेनिश: `/about`

For more details about these configuration options, see the [Configuration Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md).
