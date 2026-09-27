---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Intlayer संदर्भ प्रलेखन | remix-intlayer
description: Remix 3 एप्लिकेशनों में Intlayer अनुरोध संदर्भ संग्रहण कुंजी का प्रलेखन।
keywords:
  - Intlayer
  - remix
  - remix-3
  - अनुरोध संदर्भ
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Intlayer संदर्भ कुंजी का प्रारंभिक प्रलेखन"
author: aymericzip
---

# Intlayer अनुरोध संदर्भ कुंजी

`Intlayer` एक्सपोर्ट Remix 3 में अनुरोध संदर्भ संग्रहण पहचानकर्ता के रूप में कार्य करता है। यह आपको रूट हैंडलर्स या कस्टम मिडलवेयर के भीतर Remix संदर्भ ऑब्जेक्ट से सीधे Intlayer स्थिति प्राप्त करने की अनुमति देता है।

## उपयोग

जब `intlayer()` मिडलवेयर चलता है, तो यह अनुरोध संदर्भ में `Intlayer` कुंजी के अंतर्गत एक `IntlayerState` ऑब्जेक्ट संग्रहीत करता है। आप इसे किसी भी रूट हैंडलर के भीतर प्राप्त कर सकते हैं:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // context.get(Intlayer) के माध्यम से एक्सेस
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

आप सीधे प्रॉपर्टी शॉर्टहैंड `context.intlayer` का उपयोग करके भी इसे एक्सेस कर सकते हैं:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## `IntlayerState` संरचना

`IntlayerState` ऑब्जेक्ट में शामिल हैं:

| प्रॉपर्टी          | प्रकार              | विवरण                                                          |
| ------------------ | ------------------- | -------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | वर्तमान अनुरोध के लिए निर्धारित लोकेल।                         |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts` में परिभाषित फ़ॉलबैक लोकेल।               |
| `availableLocales` | `DeclaredLocales[]` | प्रोजेक्ट के लिए कॉन्फ़िगर किए गए सभी समर्थित लोकेल्स की सूची। |

## संबंधित दस्तावेज़

- [`intlayer` मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)
