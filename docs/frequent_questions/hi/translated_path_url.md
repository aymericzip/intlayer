---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: क्या मैं URL पथ का अनुवाद कर सकता हूँ?
description: जानें कि URL पथ का अनुवाद कैसे करें।
keywords:
  - array
  - content
  - declaration
  - intlayer
  - middleware
  - proxy
  - rewrite
  - prefix
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# क्या URL का अनुवाद करना संभव है?

हाँ! Intlayer कस्टम URL पुनर्लेखन का समर्थन करता है, जो आपको लोकेल-विशिष्ट पथों को परिभाषित करने की अनुमति देता है। उदाहरण के लिए:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

इसे लागू करने के लिए, आप अपनी `intlayer.config.ts` फ़ाइल में `routing` अनुभाग को कॉन्फ़िगर कर सकते हैं।

इस सुविधा को लागू करने के तरीके के बारे में अधिक जानकारी के लिए, [कस्टम URL पुनर्लेखन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md) देखें।

आप इन URL को प्रोग्रामेटिक रूप से उत्पन्न करने के लिए `getMultilingualUrl` और `getLocalizedUrl` फ़ंक्शन का भी उपयोग कर सकते हैं, और वे आपके पुनर्लेखन नियमों का सम्मान करेंगे।

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (यदि कॉन्फ़िगर किया गया है)
```
