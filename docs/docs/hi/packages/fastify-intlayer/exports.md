---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: fastify-intlayer पैकेज दस्तावेज़ीकरण
description: Intlayer के लिए Fastify प्लगइन, जो अनुवाद फ़ंक्शन और locale का पता लगाने की सुविधाएँ प्रदान करता है।
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# fastify-intlayer पैकेज

`fastify-intlayer` पैकेज Fastify एप्लिकेशनों के लिए एक प्लगइन प्रदान करता है जो internationalization को संभालता है। यह उपयोगकर्ता की locale का पता लगाता है और request ऑब्जेक्ट को सजाता है।

## स्थापना

```bash
npm install fastify-intlayer
```

## निर्यात

### प्लगइन

इम्पोर्ट:

```tsx
import "fastify-intlayer";
```

| फ़ंक्शन    | विवरण                                                                                                                                                                                                                                                                                                                                         | संबंधित दस्तावेज                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Fastify plugin जो Intlayer को आपके Fastify एप्लिकेशन में इंटीग्रेट करता है। स्टोरेज (cookies, headers) से locale का पता लगाता है, request ऑब्जेक्ट को `intlayer` डेटा जिसमें `t`, `getIntlayer`, और `getDictionary` शामिल हैं, के साथ डेकोरेट करता है, और request lifecycle के दौरान प्रोग्रामैटिक एक्सेस के लिए CLS namespace सेटअप करता है। | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/fastify-intlayer/intlayer.md) |

### फ़ंक्शन्स

Import:

```tsx
import "fastify-intlayer";
```

| फ़ंक्शन         | विवरण                                                                                                                                                                                                                                                                                       | संबंधित दस्तावेज                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | ग्लोबल अनुवाद फ़ंक्शन जो Fastify में वर्तमान locale के लिए कंटेंट प्राप्त करता है। CLS (Async Local Storage) का उपयोग करता है और इसे `intlayer` plugin द्वारा मैनेज किए गए request context के भीतर उपयोग किया जाना चाहिए। इसे `req.intlayer.t` के माध्यम से भी एक्सेस किया जा सकता है।      | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |
| `getIntlayer`   | जनरेटेड declaration से key के आधार पर एक dictionary प्राप्त करता है और निर्दिष्ट locale के लिए उसका कंटेंट लौटाता है। `getDictionary` का optimized संस्करण। request context तक पहुँचने के लिए CLS का उपयोग करता है। इसे `req.intlayer.getIntlayer` के माध्यम से भी एक्सेस किया जा सकता है।  | -                                                                                                      |
| `getDictionary` | डिक्शनरी ऑब्जेक्ट्स को प्रोसेस करता है और निर्दिष्ट locale के लिए सामग्री लौटाता है। `t()` अनुवादों, enumerations, markdown, HTML, आदि को प्रोसेस करता है। request context तक पहुँचने के लिए CLS का उपयोग करता है। इसे `req.intlayer.getDictionary` के माध्यम से भी एक्सेस किया जा सकता है। | -                                                                                                      |
