---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: onRequest मिडलवेयर प्रलेखन | astro-intlayer
description: Astro एप्लिकेशनों में अनुरोध लोकेल को हल करने और Astro.locals.intlayer को भरने के लिए onRequest मिडलवेयर का उपयोग करने का तरीका देखें।
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "प्रारंभिक प्रलेखन"
author: aymericzip
---

# onRequest Astro मिडलवेयर प्रलेखन

`astro-intlayer/middleware` का `onRequest` मिडलवेयर प्रत्येक आने वाले HTTP अनुरोध के लोकेल को हल करता है और `Astro.locals.intlayer` को भरता है।

जब आप `astro.config.mjs` में `intlayer()` एकीकरण पंजीकृत करते हैं, तो यह मिडलवेयर स्वचालित रूप से इंजेक्ट हो जाता है। आपको इसे केवल तभी सीधे आयात करने की आवश्यकता होती है जब आप `sequence(...)` का उपयोग करके मैन्युअल रूप से Astro मिडलवेयर बना रहे हों।

## उपयोग

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // अपने कस्टम मिडलवेयर में हल किए गए लोकेल तक पहुँचें
  const { locale } = context.locals.intlayer;
  console.log(`लोकेल के लिए अनुरोध संभालना: ${locale}`);

  return next();
});
```

## विवरण

मिडलवेयर निम्नलिखित कार्य करता है:

1. **लोकेल का पता लगाना**:
   - **URL**: URL पथ उपसर्ग या `?locale=` खोज पैरामीटर का विश्लेषण करता है (जब तक कि `routing.mode` `no-prefix` पर सेट न हो)।
   - **कुकीज़ / हेडर**: सहेजे गए लोकेल कुकीज़ या कस्टम हेडर मानों की जाँच करता है।
   - **Accept-Language**: ब्राउज़र की पसंदीदा भाषा वार्ता पर वापस आ जाता है।
   - प्री-रेंडर किए गए पेजों (`context.isPrerendered`) के लिए, Astro बिल्ड चेतावनियों को रोकने के लिए लोकेल को सख्ती से URL से निकाला जाता है।
2. **संदर्भ भरना**: `Astro.locals.intlayer` को निम्नलिखित के साथ भरता है:
   - `locale`: हल किया गया लोकेल।
   - `defaultLocale`: डिफ़ॉल्ट फ़ॉलबैक लोकेल।
   - `availableLocales`: कॉन्फ़िगर किए गए लोकेल्स की सूची।
3. **AsyncLocalStorage स्कोप**: डाउनस्ट्रीम अनुरोध प्रसंस्करण को `AsyncLocalStorage` स्कोप के भीतर लपेटता है, जिससे `useIntlayer()`, `useDictionary()`, और `useLocale()` को तर्क पास किए बिना अनुरोध स्थिति तक पहुंचने की अनुमति मिलती है।

## `IntlayerLocals` प्रकार

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## संबंधित दस्तावेज़

- [`intlayer` एकीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useLocale.md)
