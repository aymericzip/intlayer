---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: लोकल सूची को कैसे अनुकूलित करें?
description: लोकल सूची को अनुकूलित करना सीखें।
keywords:
  - लोकल
  - सूची
  - intlayer
  - कॉन्फ़िगरेशन
  - availableLocales
  - defaultLocale
  - useLocale
  - हुक
  - लोकल
  - सूची
slugs:
  - frequent-questions
  - customized-locale-list
---

# क्या किसी भाषा प्रकार को ब्लॉक करना संभव है, जैसे अंग्रेज़ी? मैं अपनी शब्दकोशों में अंग्रेज़ी जोड़ रहा हूँ लेकिन मैं अभी अंग्रेज़ी को वेबसाइट पर उपलब्ध नहीं करना चाहता

हाँ, आप Intlayer कॉन्फ़िगरेशन में `availableLocales` विकल्प का उपयोग करके किसी भाषा प्रकार को ब्लॉक कर सकते हैं, जैसे अंग्रेज़ी।

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

या

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

यह कॉन्फ़िगरेशन आपके `t()` फ़ंक्शन के प्रकारों को केवल उपलब्ध लोकल्स तक सीमित कर देगा।

`availableLocales` विकल्प वैकल्पिक है, यदि आप इसे प्रदान नहीं करते हैं, तो सभी लोकल्स उपलब्ध होंगे।

सावधान रहें, `availableLocales` विकल्प में शामिल सभी लोकल्स को `locales` विकल्प में भी शामिल किया जाना चाहिए।

ध्यान दें कि यदि आप `useLocale` हुक का उपयोग करते हैं, तो `availableLocales` विकल्प का उपयोग लोकल सूची तक पहुंच सेट करने के लिए किया जाएगा।

```ts
import { useLocale } from "react-intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
