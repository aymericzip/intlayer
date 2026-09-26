---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary हुक प्रलेखन | remix-intlayer
description: Remix 3 एप्लिकेशनों में वर्तमान अनुरोध लोकेल के लिए शब्दकोश ऑब्जेक्ट्स को हल करने के लिए useDictionary हुक का उपयोग करने का तरीका देखें।
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useDictionary हुक का प्रारंभिक प्रलेखन"
author: aymericzip
---

# useDictionary हुक प्रलेखन

`useDictionary` हुक एक इम्पोर्ट किए गए या इनलाइन शब्दकोश ऑब्जेक्ट को परिवर्तित करता है और Remix 3 एप्लिकेशनों में वर्तमान अनुरोध के लोकेल के लिए हल की गई सामग्री लौटाता है।

`useIntlayer` के विपरीत, जो वैश्विक शब्दकोश रजिस्ट्री से उनके स्ट्रिंग कुंजी द्वारा शब्दकोशों को हल करता है, `useDictionary` सीधे एक शब्दकोश ऑब्जेक्ट स्वीकार करता है।

## उपयोग

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

आप `t()` के साथ परिभाषित इनलाइन शब्दकोश भी पास कर सकते हैं:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        hi: "सर्वाधिकार सुरक्षित।",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## पैरामीटर

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: एक शब्दकोश ऑब्जेक्ट या योग्य शब्दकोश समूह।
2. **`localeOrSelector`** (वैकल्पिक): एक विशिष्ट लोकेल या चयनकर्ता ऑब्जेक्ट (`{ item }`, `{ variant }`, वैकल्पिक रूप से `locale` के साथ)। आपूर्ति किए जाने पर अनुरोध लोकेल पर वरीयता लेता है।

## विवरण

यह हुक निम्नलिखित कार्य करता है:

1. **लोकेल का पता लगाना**: `intlayer()` मिडलवेयर द्वारा बनाए गए `AsyncLocalStorage` स्टोर से सक्रिय अनुरोध लोकेल को पढ़ता है।
2. **सामग्री समाधान**: हल किए गए लोकेल के अनुसार अनुवाद (`t()`), गणना, शर्तें, और नेस्टेड संरचनाओं का मूल्यांकन करता है।
3. **चयनकर्ता प्रसंस्करण**: तर्कों में निर्दिष्ट किसी भी आइटम या संस्करण चयनकर्ता को लागू करता है।

## संबंधित दस्तावेज़

- [`intlayer` मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)
