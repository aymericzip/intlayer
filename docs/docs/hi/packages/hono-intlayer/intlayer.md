---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono मिडलवेयर दस्तावेज़ीकरण | hono-intlayer
description: देखें कि hono-intlayer पैकेज के लिए intlayer मिडलवेयर का उपयोग कैसे करें
keywords:
  - intlayer
  - hono
  - मिडलवेयर
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: दस्तावेज़ प्रारंभ करें
---

# intlayer Hono मिडलवेयर दस्तावेज़ीकरण

Hono के लिए `intlayer` मिडलवेयर उपयोगकर्ता के लोकेल का पता लगाता है और संदर्भ ऑब्जेक्ट को Intlayer फ़ंक्शंस के साथ भरता है। यह अनुरोध संदर्भ के भीतर वैश्विक अनुवाद फ़ंक्शंस के उपयोग को भी सक्षम बनाता है।

## उपयोग

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    hi: "नमस्ते",
  });

  return c.text(content);
});
```

## विवरण

मिडलवेयर निम्नलिखित कार्य करता है:

1. **लोकेल डिटेक्शन**: यह उपयोगकर्ता के पसंदीदा लोकेल को निर्धारित करने के लिए अनुरोध (हेडर, कुकीज़, आदि) का विश्लेषण करता है।
2. **संदर्भ जनसंख्या**: यह Hono संदर्भ में Intlayer डेटा जोड़ता है, जिसे `c.get()` के माध्यम से एक्सेस किया जा सकता है। इसमें शामिल हैं:
   - `locale`: पता लगाया गया लोकेल।
   - `t`: एक अनुवाद फ़ंक्शन।
   - `getIntlayer`: शब्दकोशों को प्राप्त करने के लिए एक फ़ंक्शन।
   - `getDictionary`: शब्दकोश ऑब्जेक्ट्स को प्रोसेस करने के लिए एक फ़ंक्शन।
3. **संदर्भ प्रबंधन**: यह एक एसिंक्रोनस संदर्भ को प्रबंधित करने के लिए `cls-hooked` का उपयोग करता है, जिससे वैश्विक Intlayer फ़ंक्शंस (`t`, `getIntlayer`, `getDictionary`) को संदर्भ ऑब्जेक्ट पास किए बिना अनुरोध-विशिष्ट लोकेल तक पहुँचने की अनुमति मिलती है।
