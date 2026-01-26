---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Fastify प्लगइन दस्तावेज़ | fastify-intlayer
description: देखें कि fastify-intlayer पैकेज के लिए intlayer प्लगइन का उपयोग कैसे करें
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - डॉक्यूमेंटेशन
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: प्रारंभिक दस्तावेज़
---

# intlayer Fastify प्लगइन दस्तावेज़

Fastify के लिए `intlayer` प्लगइन उपयोगकर्ता की locale का पता लगाता है और अनुरोध ऑब्जेक्ट को Intlayer फ़ंक्शनों से सजाता है। यह अनुरोध संदर्भ के भीतर global translation फ़ंक्शनों के उपयोग को भी सक्षम बनाता है।

## उपयोग

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    hi: "नमस्ते",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## विवरण

प्लगइन निम्नलिखित कार्य करता है:

1. **लोकेल पहचान**: यह अनुरोध (headers, cookies, आदि) का विश्लेषण करता है ताकि उपयोगकर्ता की पसंदीदा locale निर्धारित की जा सके।
2. **Request Decoration**: यह `FastifyRequest` ऑब्जेक्ट में एक `intlayer` प्रॉपर्टी जोड़ता है, जिसमें शामिल हैं:
   - `locale`: पता चला हुआ locale।
   - `t`: एक अनुवाद फ़ंक्शन।
   - `getIntlayer`: डिक्शनरी को प्राप्त करने का एक फ़ंक्शन।
3. **Context Management**: यह एक असिंक्रोनस संदर्भ प्रबंधित करने के लिए `cls-hooked` का उपयोग करता है, जिससे वैश्विक Intlayer फ़ंक्शन रिक्वेस्ट-विशिष्ट locale तक पहुंच सकें।
