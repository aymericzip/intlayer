---
createdAt: 2025-05-20
updatedAt: 2025-06-29
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
  - doc
  - faq
  - translated-path-url
---

# क्या URL का निम्नलिखित रूप में अनुवाद संभव है:

```bash
en -> /product (कोई उपसर्ग नहीं) या /en/product (उपसर्ग के साथ)
fr -> /fr/produit
es -> /es/producto
```

दुर्भाग्यवश Intlayer निर्दिष्ट URL का अनुवाद करने की अनुमति नहीं देता है। इसे प्राप्त करने के लिए, आपको अपने स्वयं के मिडलवेयर या प्रॉक्सी का उपयोग करके URL को पुनःलिखित (rewrite) करना होगा।

लेकिन आप `getMultilingualUrl` फ़ंक्शन का उपयोग करके किसी दिए गए लोकल के लिए URL में उपसर्ग डाल सकते हैं।

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (कोई उपसर्ग नहीं) या /en/product (उपसर्ग के साथ)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

या `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
