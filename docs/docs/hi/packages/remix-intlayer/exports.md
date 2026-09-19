---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer पैकेज प्रलेखन
description: remix-intlayer पैकेज के एक्सपोर्ट्स का प्रलेखन, जो Remix 3 एप्लिकेशनों के लिए अंतर्राष्ट्रीयकरण (i18n) प्रदान करता है।
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer एक्सपोर्ट्स का प्रारंभिक प्रलेखन"
author: aymericzip
---

# remix-intlayer पैकेज

`remix-intlayer` पैकेज Remix 3 एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक उपकरण प्रदान करता है। इसमें अनुरोध लोकेल का पता लगाने के लिए मिडलवेयर, अनुरोध संदर्भ एक्सेस, और शब्दकोश प्राप्त करने तथा लोकेल प्रबंधित करने के लिए हुक्स शामिल हैं।

## इंस्टॉलेशन

```bash
npm install remix-intlayer
```

## पैकेज एक्सपोर्ट्स

### मिडलवेयर

| एक्सपोर्ट  | प्रकार           | विवरण                                                                                                       | संबंधित दस्तावेज़                                                                                                                |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | मिडलवेयर फ़ंक्शन | Remix 3 के लिए मिडलवेयर जो अनुरोध लोकेल का पता लगाता है, रीडायरेक्ट्स संभालता है, और अनुरोध संदर्भ भरता है। | [intlayer मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md) |

### संदर्भ संग्रहण

| एक्सपोर्ट  | प्रकार                         | विवरण                                                                                                                   | संबंधित दस्तावेज़                                                                                                    |
| ---------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | RequestContext कुंजी / संग्रहण | Remix 3 अनुरोध संदर्भ (`context.get(Intlayer)`) से Intlayer स्थिति प्राप्त करने के लिए उपयोग की जाने वाली संदर्भ कुंजी। | [Intlayer संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/Intlayer.md) |

### हुक्स

| एक्सपोर्ट       | प्रकार | विवरण                                                                                         | संबंधित दस्तावेज़                                                                                                           |
| --------------- | ------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | हुक    | वर्तमान अनुरोध लोकेल के अनुसार कुंजी द्वारा शब्दकोश सामग्री प्राप्त और संसाधित करता है।       | [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | हुक    | पहले से इम्पोर्ट किए गए शब्दकोश ऑब्जेक्ट से वर्तमान अनुरोध लोकेल के अनुरूप सामग्री लौटाता है। | [useDictionary हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | हुक    | वर्तमान अनुरोध लोकेल, डिफ़ॉल्ट लोकेल, और उपलब्ध लोकेल्स की सूची तक पहुंच प्रदान करता है।      | [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)         |

## त्वरित शुरुआत

### राउटर में मिडलवेयर कॉन्फ़िगर करें

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### व्यू और कंपोनेंट्स में सामग्री का उपयोग करें

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
