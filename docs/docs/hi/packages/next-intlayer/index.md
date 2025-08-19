---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | next-intlayer
description: देखें कि next-intlayer पैकेज का उपयोग कैसे करें
keywords:
  - Intlayer
  - next-intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: Next.js एप्लिकेशन को अंतर्राष्ट्रीयकृत (i18n) करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक समूह है। यह React, Next.js, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`next-intlayer` पैकेज** आपको अपने Next.js एप्लिकेशन को अंतर्राष्ट्रीयकृत करने की अनुमति देता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

## अपने Next.js एप्लिकेशन को अंतर्राष्ट्रीयकृत क्यों करें?

अपने Next.js एप्लिकेशन को अंतर्राष्ट्रीयकृत करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा प्रदान करने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

## Intlayer को एकीकृत क्यों करें?

- **JavaScript-संचालित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए JavaScript की लचीलापन का उपयोग करें।
- **टाइप-सेफ वातावरण**: TypeScript का लाभ उठाएं ताकि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हों।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे रखरखाव और स्पष्टता बढ़े।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## उपयोग का उदाहरण

Intlayer के साथ, आप अपनी सामग्री को अपनी कोडबेस में कहीं भी संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer उन फ़ाइलों को स्कैन करता है जिनका एक्सटेंशन `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` होता है।

> आप डिफ़ॉल्ट एक्सटेंशन को [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी सेट करके बदल सकते हैं।

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### अपनी सामग्री घोषित करें

`next-intlayer` को [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/index.md) के साथ काम करने के लिए बनाया गया है। `intlayer` एक पैकेज है जो आपको अपने कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपके एप्लिकेशन में सहजता से एकीकृत हो जाते हैं।

यहाँ सामग्री घोषणा का एक उदाहरण है:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "hi": "नमस्ते दुनिया"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "माइनस एक से कम कार",
        "-1": "माइनस एक कार",
        "0": "कोई कार नहीं",
        "1": "एक कार",
        ">5": "कुछ कारें",
        ">19": "कई कारें"
      }
    }
  }
}
```

### अपने कोड में सामग्री का उपयोग करें

एक बार जब आपने अपनी सामग्री घोषित कर दी, तो आप इसे अपने कोड में उपयोग कर सकते हैं। यहाँ एक उदाहरण है कि सामग्री को React घटक में कैसे उपयोग किया जाए:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## आपके Next.js एप्लिकेशन के अंतरराष्ट्रीयकरण में महारत हासिल करना

Intlayer आपके Next.js एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करने के लिए कई सुविधाएँ प्रदान करता है। यहाँ कुछ प्रमुख विशेषताएँ दी गई हैं:

- **सर्वर कंपोनेंट्स का अंतरराष्ट्रीयकरण**: Intlayer आपको अपने सर्वर कंपोनेंट्स को उसी तरह अंतरराष्ट्रीय बनाने की अनुमति देता है जैसे आप अपने क्लाइंट कंपोनेंट्स को करते हैं। इसका मतलब है कि आप क्लाइंट और सर्वर दोनों कंपोनेंट्स के लिए एक ही सामग्री घोषणाएँ उपयोग कर सकते हैं।
- **स्थानिक पहचान के लिए मिडलवेयर**: Intlayer उपयोगकर्ता की पसंदीदा भाषा का पता लगाने के लिए मिडलवेयर प्रदान करता है। इस मिडलवेयर का उपयोग उपयोगकर्ता की पसंदीदा भाषा का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर पुनः निर्देशित करने के लिए किया जाता है।
- **मेटाडेटा का अंतरराष्ट्रीयकरण**: Intlayer आपके मेटाडेटा, जैसे आपके पृष्ठ के शीर्षक, को अंतरराष्ट्रीय बनाने का एक तरीका प्रदान करता है, जो Next.js द्वारा प्रदान किए गए `generateMetadata` फ़ंक्शन का उपयोग करता है। आप अपने मेटाडेटा का अनुवाद करने के लिए `getTranslation` फ़ंक्शन का उपयोग कर सकते हैं।
- **sitemap.xml और robots.txt का अंतरराष्ट्रीयकरण**: Intlayer आपको अपने sitemap.xml और robots.txt फ़ाइलों का अंतरराष्ट्रीयकरण करने की अनुमति देता है। आप अपने sitemap के लिए बहुभाषी URL उत्पन्न करने के लिए `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं।
- **URLs का अंतरराष्ट्रीयकरण**: Intlayer आपको अपने URLs का अंतरराष्ट्रीयकरण करने की अनुमति देता है, `getMultilingualUrls` फ़ंक्शन का उपयोग करके। यह फ़ंक्शन आपके sitemap के लिए बहुभाषी URLs उत्पन्न करता है।

**इन विशेषताओं के बारे में अधिक जानने के लिए, [Next.js Internationalization (i18n) with Intlayer and Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md) गाइड देखें।**

## `next-intlayer` पैकेज द्वारा प्रदान किए गए फ़ंक्शन

`next-intlayer` पैकेज आपके एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करने के लिए कुछ फ़ंक्शन भी प्रदान करता है।

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
