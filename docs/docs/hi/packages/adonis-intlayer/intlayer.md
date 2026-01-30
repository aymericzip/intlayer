---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS मिडलवेयर दस्तावेज़ीकरण | adonis-intlayer
description: adonis-intlayer पैकेज के लिए intlayer मिडलवेयर का उपयोग करने का तरीका देखें
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: प्रारंभिक दस्तावेज़ीकरण
---

# intlayer AdonisJS मिडलवेयर दस्तावेज़ीकरण

AdonisJS के लिए `intlayer` मिडलवेयर उपयोगकर्ता के लोकेल का पता लगाता है और अनुरोध संदर्भ के माध्यम से अनुवाद फ़ंक्शन प्रदान करता है। यह अनुरोध प्रवाह के भीतर वैश्विक अनुवाद फ़ंक्शंस के उपयोग को भी सक्षम बनाता है।

## उपयोग

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## विवरण

मिडलवेयर निम्नलिखित कार्य करता है:

1. **लोकेल डिटेक्शन**: यह उपयोगकर्ता के पसंदीदा लोकेल को निर्धारित करने के लिए अनुरोध (हेडर, कुकीज़, आदि) का विश्लेषण करता है।
2. **संदर्भ सेटअप**: यह लोकेल जानकारी के साथ अनुरोध संदर्भ भरता है।
3. **Async Local Storage**: यह एक अतुल्यकालिक संदर्भ प्रबंधित करने के लिए `cls-hooked` का उपयोग करता है, जिससे `t`, `getIntlayer`, और `getDictionary` जैसे वैश्विक Intlayer फ़ंक्शंस को मैन्युअल रूप से पारित किए बिना अनुरोध-विशिष्ट लोकेल तक पहुँचने की अनुमति मिलती है।

> नोट: लोकेल डिटेक्शन के लिए कुकीज़ का उपयोग करने के लिए, सुनिश्चित करें कि आपके एप्लिकेशन में `@adonisjs/cookie` कॉन्फ़िगर और उपयोग किया गया है।
