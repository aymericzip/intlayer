---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: intlayer एकीकरण प्रलेखन | astro-intlayer
description: astro.config.mjs में intlayer Astro एकीकरण को कॉन्फ़िगर और उपयोग करने का तरीका देखें।
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - एकीकरण
  - i18n
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "मिडलवेयर और हुक्स विवरण के साथ एकीकरण प्रलेखन अपडेट करें"
  - version: 8.0.0
    date: 2026-01-21
    changes: "प्रारंभिक प्रलेखन"
author: aymericzip
---

# intlayer Astro एकीकरण प्रलेखन

Astro के लिए `intlayer` एकीकरण आपके प्रोजेक्ट को बहुभाषी अंतर्राष्ट्रीयकरण (i18n) के लिए कॉन्फ़िगर करता है। यह बिल्ड-टाइम शब्दकोश तैयारी, Vite प्लगइन इंजेक्शन, स्वचालित अनुरोध मिडलवेयर पंजीकरण, और स्थानीयकृत प्री-रेंडर किए गए पेजों को आउटपुट करने का कार्य संभालता है।

## उपयोग

अपने `astro.config.mjs` में `intlayer()` जोड़ें:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Astro CLI का कोडमोड (`astro add astro-intlayer`) भी एक डिफ़ॉल्ट इम्पोर्ट उत्पन्न करता है जो समर्थित है:

```ts
import intlayer from "astro-intlayer";
```

## विवरण

यह एकीकरण Astro के बिल्ड और रनटाइम जीवनचक्र में जुड़ता है:

1. **कॉन्फ़िग सेटअप (`astro:config:setup`)**:
   - **शब्दकोश तैयारी**: बिल्ड चलने से पहले Intlayer शब्दकोशों और उत्पन्न प्रकारों को तैयार करता है।
   - **Vite प्लगइन्स**: Vite उपनामों (सहज शब्दकोश आयात को सक्षम करने), लोकेल रूटिंग प्रॉक्सी, और बिल्ड प्रूनिंग के लिए प्लगइन्स इंजेक्ट करता है।
   - **मिडलवेयर पंजीकरण**: आपके प्रोजेक्ट की मिडलवेयर श्रृंखला में `astro-intlayer/middleware` को स्वचालित रूप से इंजेक्ट करता है, प्रत्येक आने वाले अनुरोध पर `Astro.locals.intlayer` को भरता है।
2. **बिल्ड पूर्ण (`astro:build:done`)**:
   - **पेज रीराइट्स**: स्थानीयकृत URL रीराइट नियमों का निरीक्षण करता है और उनके संबंधित स्थानीयकृत पथों पर प्री-रेंडर किए गए HTML पेज आउटपुट करता है।

## बॉक्स से बाहर क्या प्रदान किया जाता है

एक बार कॉन्फ़िगर होने के बाद, आपका Astro एप्लिकेशन तुरंत उपयोग कर सकता है:

- `.astro` कंपोनेंट फ्रंटमैटर के अंदर `useIntlayer`, `useDictionary`, और `useLocale` हुक्स।
- Astro एंडपॉइंट्स और पेजों में `Astro.locals.intlayer` ऑब्जेक्ट।
- `<script>` ब्लॉक्स में क्लाइंट-साइड इम्पोर्ट्स जो प्रतिक्रियाशील अपडेट के साथ समान API को प्रतिबिंबित करते हैं।
- `astro-intlayer/format` के तहत अंतर्निहित फॉर्मैटर्स (`useDate`, `useNumber`, `useCurrency`, आदि)।

## संबंधित दस्तावेज़

- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useLocale.md)
- [`onRequest` मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/onRequest.md)
