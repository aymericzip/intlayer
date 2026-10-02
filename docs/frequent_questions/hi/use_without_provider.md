---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "क्या मैं Intlayer को global provider के बिना उपयोग कर सकता हूँ?"
description: "provider mount किए बिना Intlayer content पढ़ें, server और browser में locale कैसे resolve होता है, और provider की तुलना में performance का अंतर।"
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performance
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# क्या मैं Intlayer को global provider के बिना उपयोग कर सकता हूँ?

हाँ। `getIntlayer` और `getDictionary` साधारण functions हैं जिन्हें किसी provider की ज़रूरत नहीं होती, और `useIntlayer` भी provider के बाहर काम करता है।

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // कोई locale नहीं दिया गया
```

## कौन सा locale उपयोग होता है?

स्पष्ट रूप से दिया गया locale हमेशा प्राथमिकता पाता है। अन्यथा, locale इस क्रम में resolve होता है:

1. **वर्तमान request का locale**, server पर, जब कोई Intlayer integration उसे संभालता है: `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` और `astro-intlayer` के middlewares, या React Server Components में `IntlayerProvider`।
2. **browser में संग्रहीत locale** (cookie, `localStorage`, `sessionStorage`), जिसे आपका locale switcher सहेजता है।
3. आपके configuration का **`defaultLocale`**।

हर request अपनी cookies और headers से resolve होती है, और उसी request के scope में रखी जाती है। अलग-अलग locale वाले एक साथ आने वाले users कभी locale साझा नहीं करते।

यही resolution `getDictionary` पर, [build optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) द्वारा दोबारा लिखे गए calls पर, और provider के बाहर render किए गए `useIntlayer` और `useDictionaryDynamic` पर भी लागू होता है।

- [build optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)

[Formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md) (`number`, `date`, `list`…) और उनके hooks (`useNumber`, `useDate`, `useList`…) भी `locale` पास न होने पर यही क्रम अपनाते हैं।

- [Formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)

### Next.js Server Components

Next.js में, request का locale केवल asynchronous रूप से, `headers()` और `cookies()` के ज़रिए पढ़ा जा सकता है। [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md) का उपयोग करें, जो `next-intlayer/server` के `getLocale()` की तरह ही उसकी प्रतीक्षा करता है:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // request का locale

  return { title };
};
```

headers पढ़ने से route dynamic rendering में चला जाता है। जब `IntlayerProvider` पहले से locale देता है, तो headers नहीं पढ़े जाते और route static रहता है।

## Performance: provider के साथ या बिना

content वही है। अंतर reactivity और rendering cost का है।

|                  | provider के साथ                                   | provider के बिना                                                                                                          |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| locale बदलना     | components बिना reload के वहीं re-render होते हैं | कुछ भी re-render नहीं होता; नया locale अगले call पर दिखता है (navigation, reload)                                         |
| एक read की cost  | context lookup और locale का subscription          | एक memoized function call, एक ही `key + locale` के लिए वही object                                                         |
| एक बदलाव की cost | हर consumer का re-render                          | कोई नहीं                                                                                                                  |
| server rendering | server और browser एक ही locale render करते हैं    | request integration के बाहर, server `defaultLocale` और browser संग्रहीत locale render करता है: संभावित hydration mismatch |
| Bundle           | provider का code                                  | संग्रहीत locale पढ़ने के लिए लगभग 100 bytes (gzip), अगले बदलाव तक cache                                                   |

उन interactive apps के लिए provider रखें जो locale वहीं बदलते हैं या server पर render करते हैं। backends, scripts, URL से locale लेने वाले static pages (उसे स्पष्ट रूप से पास करें), या content को एक बार पढ़ने वाले code के लिए provider के बिना काम करें।

अधिक जानकारी के लिए [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md) देखें।

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md)
