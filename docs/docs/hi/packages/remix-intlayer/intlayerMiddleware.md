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

# intlayer Remix 3 मिडलवेयर दस्तावेज़

Remix 3 के लिए `intlayer` मिडलवेयर आपके पूरे एप्लिकेशन में अंतर्राष्ट्रीयकरण परत का प्रबंधन करता है। वेब मानकों (`Request` और `Response`) पर निर्मित, यह लोकेल रूटिंग (रीडायरेक्ट और आंतरिक रीराइट) को संभालता है, अनुरोध के लोकेल का पता लगाता है, उसे कुकीज़ और हेडर में सहेजता है, और एक `AsyncLocalStorage` स्कोप स्थापित करता है ताकि आगे के हैंडलर और कंपोनेंट्स props ड्रिलिंग के बिना अनुवादों तक पहुँच सकें।

## उपयोग

अपने Remix 3 राउटर को इनिशियलाइज़ करते समय `intlayer` मिडलवेयर पंजीकृत करें:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// `/`, `/fr`, `/es` को सर्व करता है, लोकेल अनुरोध से हल किया जाता है
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## विवरण

`intlayer` मिडलवेयर निम्नलिखित कार्य करता है:

1. **डिक्शनरी तैयारी**: स्टार्टअप पर `prepareIntlayer` चलाता है ताकि यह सुनिश्चित हो सके कि सभी जनरेट की गई डिक्शनरी बिल्ड हो चुकी हैं और उपलब्ध हैं।
2. **लोकेल रूटिंग**: कॉन्फ़िगर की गई रूटिंग रणनीति (`prefix_always`, `prefix_as_needed`, `no_prefix`) के अनुसार अनुरोध का मूल्यांकन करता है:
   - **रीडायरेक्ट**: यदि कोई उपयोगकर्ता `/about` पर जाता है और उसे लोकेल उपसर्ग (उदा. `/fr/about`) पर रूट किया जाना चाहिए, तो मिडलवेयर उपयुक्त `location` और `Set-Cookie` हेडर के साथ एक रीडायरेक्ट प्रतिक्रिया जारी करता है।
   - **आंतरिक रीराइट**: जब कोई उपयोगकर्ता `/fr/about` तक पहुँचता है, तो URL को आंतरिक रूप से रीराइट किया जाता है ताकि आपका रूट हैंडलर `/about` से मेल खाए, जबकि हल किया गया लोकेल `fr` के रूप में दर्ज किया जाता है।
   - **स्थानीयकृत URL उपनाम**: `intlayer.config.ts` में परिभाषित URL रीराइट नियमों का पालन करता है (उदा. `/fr/about` को `/fr/a-propos` में रीराइट करना)।
3. **लोकेल समाधान**: URL उपसर्ग, सहेजी गई कुकीज़, कस्टम हेडर, या `Accept-Language` ब्राउज़र प्राथमिकताओं के आधार पर सक्रिय लोकेल का पता लगाता है।
4. **संदर्भ इंजेक्शन**:
   - `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) को Remix `RequestContext` में `Intlayer` कुंजी के तहत और `context.intlayer` में संलग्न करता है।
   - अनुरोध के शेष भाग को एक `AsyncLocalStorage` स्कोप (`requestStorage`) के भीतर चलाता है, जिससे `useIntlayer`, `useDictionary`, और `useLocale` को हैंडलर, व्यू और कंपोनेंट्स में सहजता से कॉल किया जा सकता है।
5. **स्थायित्व**: उपयोगकर्ता की प्राथमिकता को बनाए रखने के लिए आउटगोइंग लोकेल हेडर और कुकीज़ को अंतिम HTTP प्रतिक्रिया में संलग्न करता है।

## पैरामीटर

`intlayer` फ़ंक्शन वैकल्पिक `IntlayerMiddlewareOptions` स्वीकार करता है:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // कस्टम रूटिंग कॉन्फ़िगरेशन ओवरराइड
};

const middleware = intlayer(options);
```

## संदर्भ को सीधे एक्सेस करना

हुक्स का उपयोग करने के अलावा, आप हल किए गए `IntlayerState` को सीधे Remix अनुरोध संदर्भ से एक्सेस कर सकते हैं:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // context.get() के माध्यम से
  const state = context.get(Intlayer);

  // या सीधे context.intlayer प्रॉपर्टी के माध्यम से
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## संबंधित दस्तावेज़

- [`Intlayer` अनुरोध संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/Intlayer.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)
