---
createdAt: 2026-09-19
updatedAt: 2026-09-19
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

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## विवरण

`Intlayer` का उपयोग `intlayer()` मिडलवेयर द्वारा वर्तमान सत्र स्थिति को Remix के अनुरोध संदर्भ (`RequestContext`) से बांधने के लिए किया जाता है। आमतौर पर `useLocale()` या `useIntlayer()` जैसे हुक्स का उपयोग करने की अनुशंसा की जाती है। `context.get(Intlayer)` के माध्यम से सीधा उपयोग निम्न-स्तरीय मिडलवेयर हैंडलर्स या API रूट्स में उपयोगी होता है जहाँ संदर्भ आवृत्ति स्पष्ट रूप से पारित की जाती है।

## संबंधित दस्तावेज़

- [`intlayer` मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)
