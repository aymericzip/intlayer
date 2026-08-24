---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: intlayer Elysia प्लगइन दस्तावेज़ | elysia-intlayer
description: देखें कि elysia-intlayer पैकेज के intlayer प्लगइन का उपयोग कैसे करें
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "दस्तावेज़ीकरण की शुरुआत"
author: aymericzip
---

# intlayer Elysia प्लगइन दस्तावेज़

Elysia के लिए `intlayer` प्लगइन उपयोगकर्ता की locale का पता लगाता है और route context में एक `intlayer` ऑब्जेक्ट इंजेक्ट करता है। यह अनुरोध संदर्भ के भीतर global translation फ़ंक्शनों के उपयोग को भी सक्षम बनाता है।

## उपयोग

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    hi: "नमस्ते",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

वही helpers स्टैंडअलोन exports के रूप में भी उपलब्ध हैं, इसलिए आप route context को डीस्ट्रक्चर किए बिना उन्हें कॉल कर सकते हैं:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    hi: "नमस्ते",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## विवरण

प्लगइन निम्नलिखित कार्य करता है:

1. **लोकेल पहचान**: यह क्लाइंट द्वारा स्पष्ट रूप से सेट की गई locale को storage (cookie, header) से पढ़ता है, फिर `Accept-Language` header से नेगोशिएट की गई locale पर fallback करता है।
2. **कॉन्टेक्स्ट इंजेक्शन**: यह Elysia route context में एक `intlayer` प्रॉपर्टी जोड़ता है, जिसमें शामिल हैं:
   - `locale`: इस अनुरोध के लिए उपयोग की जाने वाली locale, जिसमें `locale_storage` को `locale_detected` पर वरीयता मिलती है।
   - `locale_storage`: क्लाइंट द्वारा cookie या header के माध्यम से स्पष्ट रूप से मांगी गई locale।
   - `locale_detected`: अनुरोध के headers से नेगोशिएट की गई locale।
   - `defaultLocale`: `intlayer.config.ts` में fallback के रूप में कॉन्फ़िगर की गई locale।
   - `t`: एक अनुवाद फ़ंक्शन।
   - `getIntlayer`: कुंजी द्वारा dictionaries प्राप्त करने वाला फ़ंक्शन।
   - `getDictionary`: dictionary ऑब्जेक्ट्स को प्रोसेस करने वाला फ़ंक्शन।
3. **Context Management**: यह एक असिंक्रोनस संदर्भ प्रबंधित करने के लिए `AsyncLocalStorage` का उपयोग करता है, जिससे वैश्विक Intlayer फ़ंक्शन (`t`, `getIntlayer`, `getDictionary`) संदर्भ ऑब्जेक्ट पास किए बिना रिक्वेस्ट-विशिष्ट locale तक पहुंच सकें।

> Node पर आधारित Intlayer प्लगइनों के विपरीत, `elysia-intlayer` `cls-hooked` के बजाय `AsyncLocalStorage` पर निर्भर करता है, क्योंकि `cls-hooked` `async_hooks.createHook` पर निर्भर है, जिसे Bun लागू नहीं करता।

रिस्पॉन्स मैप होते ही रिक्वेस्ट संदर्भ मुक्त कर दिया जाता है, ताकि स्टैंडअलोन helpers कभी भी पहले से समाप्त हो चुके अनुरोध के विरुद्ध हल न हों। जब उन्हें प्लगइन द्वारा संभाले गए अनुरोध के बाहर कॉल किया जाता है, तो वे कॉन्फ़िगर की गई डिफ़ॉल्ट locale पर fallback करते हैं।

## कॉन्फ़िगरेशन

प्लगइन आपकी `intlayer.config.ts` फ़ाइल पढ़ता है। आप locale पहचान के लिए उपयोग किए जाने वाले cookie और header को कस्टमाइज़ कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> कॉन्फ़िगरेशन के बारे में अधिक जानकारी के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।
