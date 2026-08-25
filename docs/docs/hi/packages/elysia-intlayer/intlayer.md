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

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    hi: "नमस्ते",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> प्लगइन अपना context एक **ग्लोबल** `derive` के माध्यम से रजिस्टर करता है, जिसे Elysia `Partial<{ intlayer: IntlayerContext }>` के रूप में टाइप करता है। `.use(intlayer())` के बाद रजिस्टर किए गए routes के लिए रनटाइम पर यह मान हमेशा मौजूद रहता है, इसलिए `strict` मोड में TypeScript को संतुष्ट करने के लिए non-null assertion (`intlayer!.t`) — या optional chaining — का उपयोग करें।

वही helpers स्टैंडअलोन exports के रूप में भी उपलब्ध हैं, इसलिए आप route context को डीस्ट्रक्चर किए बिना उन्हें कॉल कर सकते हैं:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    hi: "नमस्ते",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## विवरण

प्लगइन निम्नलिखित कार्य करता है:

1. **लोकेल पहचान**: यह क्लाइंट द्वारा स्पष्ट रूप से सेट की गई locale को storage (cookie, header) से पढ़ता है, फिर `Accept-Language` header से नेगोशिएट की गई locale पर fallback करता है।
2. **कॉन्टेक्स्ट इंजेक्शन**: यह Elysia route context में एक `intlayer` प्रॉपर्टी जोड़ता है (नीचे दी गई Route Context तालिका देखें)।
3. **Context Management**: यह एक असिंक्रोनस संदर्भ प्रबंधित करने के लिए `AsyncLocalStorage` का उपयोग करता है, जिससे वैश्विक Intlayer फ़ंक्शन (`t`, `getIntlayer`, `getDictionary`) संदर्भ ऑब्जेक्ट पास किए बिना रिक्वेस्ट-विशिष्ट locale तक पहुंच सकें।
4. **Dictionaries की तैयारी**: प्लगइन बनते समय यह `prepareIntlayer` को कॉल करता है, ताकि ऐप के बूट होने पर dictionaries बन जाएँ।

### Route Context

| प्रॉपर्टी         | टाइप                   | विवरण                                                                                                        |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `locale`          | `Locale`               | इस अनुरोध के लिए उपयोग की जाने वाली locale, जिसमें `locale_storage` को `locale_detected` पर वरीयता मिलती है। |
| `locale_storage`  | `Locale` (वैकल्पिक)    | क्लाइंट द्वारा cookie या header के माध्यम से स्पष्ट रूप से मांगी गई locale।                                  |
| `locale_detected` | `Locale`               | अनुरोध के headers से नेगोशिएट की गई locale।                                                                  |
| `defaultLocale`   | `Locale`               | `intlayer.config.ts` में fallback के रूप में कॉन्फ़िगर की गई locale।                                         |
| `t`               | `TranslateFunction`    | एक अनुवाद फ़ंक्शन।                                                                                           |
| `getIntlayer`     | `typeof getIntlayer`   | कुंजी द्वारा dictionaries प्राप्त करने वाला फ़ंक्शन।                                                         |
| `getDictionary`   | `typeof getDictionary` | dictionary ऑब्जेक्ट्स को प्रोसेस करने वाला फ़ंक्शन।                                                          |

> Node पर आधारित Intlayer प्लगइनों के विपरीत, `elysia-intlayer` `cls-hooked` के बजाय `AsyncLocalStorage` पर निर्भर करता है, क्योंकि `cls-hooked` `async_hooks.createHook` पर निर्भर है, जिसे Bun लागू नहीं करता।

रिस्पॉन्स मैप होते ही रिक्वेस्ट संदर्भ मुक्त कर दिया जाता है, ताकि स्टैंडअलोन helpers कभी भी पहले से समाप्त हो चुके अनुरोध के विरुद्ध हल न हों। जब उन्हें प्लगइन द्वारा संभाले गए अनुरोध के बाहर कॉल किया जाता है, तो वे कॉन्फ़िगर की गई डिफ़ॉल्ट locale पर fallback करते हैं।

## Locale हल करने का क्रम

डिफ़ॉल्ट रूप से, प्लगइन locale को इस क्रम में हल करता है:

1. `INTLAYER_LOCALE` कुकी।
2. `x-intlayer-locale` हेडर।
3. `Accept-Language` हेडर negotiation।
4. कॉन्फ़िगर किया गया `defaultLocale`।

```bash
# `Accept-Language` से negotiate किया गया
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# कुकी `Accept-Language` पर प्राथमिकता रखती है
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# हेडर `Accept-Language` पर प्राथमिकता रखता है
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## कॉन्फ़िगरेशन

प्लगइन आपकी `intlayer.config.ts` फ़ाइल पढ़ता है। आप locale पहचान के लिए उपयोग किए जाने वाले cookie और header को कस्टमाइज़ कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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

## संबंधित दस्तावेज़

- [elysia-intlayer पैकेज दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/elysia-intlayer/exports.md)
- [Elysia i18n - अपने ऐप्लिकेशन को अनुवाद करने के लिए संपूर्ण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_elysia.md)
