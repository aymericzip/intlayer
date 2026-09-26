---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer मिडलवेयर प्रलेखन | remix-intlayer
description: जानें कि Remix 3 में लोकेल का पता लगाने, रीडायरेक्ट्स संभालने, और अनुरोध संदर्भ में Intlayer स्थिति इंजेक्ट करने के लिए intlayer मिडलवेयर का उपयोग कैसे करें।
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "intlayer मिडलवेयर का प्रारंभिक प्रलेखन"
author: aymericzip
---

# intlayer मिडलवेयर

`intlayer` मिडलवेयर फ़ंक्शन Remix 3 एप्लिकेशनों में प्रति-अनुरोध अंतर्राष्ट्रीयकरण कॉन्फ़िगर करता है। यह प्रत्येक आने वाले अनुरोध के लोकेल का पता लगाता है, URL रीडायरेक्ट नियम लागू करता है, और अनुरोध संदर्भ में लोकेल स्थिति बनाए रखता है।

## उपयोग

अपने Remix राउटर में मिडलवेयर पंजीकृत करें:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## यह कैसे काम करता है

मिडलवेयर प्रत्येक आने वाले अनुरोध के लिए निम्नलिखित कार्य करता है:

1. **लोकेल का पता लगाना**: आपके Intlayer कॉन्फ़िगरेशन के अनुसार URL पथ उपसर्ग (उदा. `/hi/about`), कुकीज़, या `Accept-Language` हेडर से लोकेल निकालता है।
2. **URL रीडायरेक्शन**: यदि अनुरोधित पथ में लोकेल उपसर्ग नहीं है और कॉन्फ़िगरेशन को उपसर्ग रूटिंग की आवश्यकता है, तो मिडलवेयर संबंधित उपसर्ग वाले URL पर एक रीडायरेक्ट प्रतिक्रिया (302/307/308) लौटाता है।
3. **अनुरोध संदर्भ भरना**: `Intlayer` कुंजी का उपयोग करके वर्तमान हल किए गए लोकेल को Remix अनुरोध संदर्भ में सहेजता है, जिससे हुक्स (`useLocale`, `useIntlayer`, `useDictionary`) पारदर्शी रूप से इसका उपभोग कर सकें।
4. **कुकी प्रबंधन**: उपयोगकर्ता के पसंदीदा लोकेल को बनाए रखने की आवश्यकता होने पर `Set-Cookie` हेडर सेट करता है।

## संबंधित दस्तावेज़

- [`Intlayer` अनुरोध संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/Intlayer.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)
