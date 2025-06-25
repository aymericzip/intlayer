---
docName: package__next-intlayer
url: /doc/packages/next-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: पैकेज के डॉक्यूमेंटेशन | next-intlayer
description: next-intlayer पैकेज का उपयोग कैसे करें
keywords:
  - Intlayer
  - next-intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# next-intlayer: Next.js एप्लिकेशन को अंतर्राष्ट्रीयकरण (i18n) करने के लिए NPM पैकेज

**Intlayer** विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, Next.js, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`next-intlayer` पैकेज** आपको अपने Next.js एप्लिकेशन को अंतर्राष्ट्रीयकरण करने की अनुमति देता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन और उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधन और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर शामिल है।

## अपने Next.js एप्लिकेशन को अंतर्राष्ट्रीयकरण क्यों करें?

अपने Next.js एप्लिकेशन को अंतर्राष्ट्रीयकरण करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश वितरित करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि के लोगों के लिए अधिक सुलभ और प्रासंगिक बनता है।

## Intlayer को एकीकृत क्यों करें?

- **जावास्क्रिप्ट-संचालित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का उपयोग करें।
- **टाइप-सुरक्षित वातावरण**: सुनिश्चित करें कि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हैं, इसके लिए TypeScript का लाभ उठाएं।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के पास रखें, जिससे रखरखाव और स्पष्टता बढ़े।

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

डिफ़ॉल्ट रूप से, Intlayer `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` एक्सटेंशन वाली फ़ाइलों को स्कैन करता है।

> आप [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी सेट करके डिफ़ॉल्ट एक्सटेंशन को संशोधित कर सकते हैं।

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

`next-intlayer` [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ काम करने के लिए बनाया गया है। `intlayer` एक पैकेज है जो आपको अपनी सामग्री को अपनी कोड में कहीं भी घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपके एप्लिकेशन में सहजता से एकीकृत होते हैं।

यहाँ सामग्री घोषणा का एक उदाहरण है:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// सामग्री घोषणाओं के लिए शब्दकोश
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
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
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// सामग्री घोषणाओं के लिए शब्दकोश
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
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
// सामग्री घोषणाओं के लिए शब्दकोश
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
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

### अपनी कोड में सामग्री का उपयोग करें

एक बार जब आप अपनी सामग्री घोषित कर लेते हैं, तो आप इसे अपनी कोड में उपयोग कर सकते हैं। यहाँ React घटक में सामग्री का उपयोग करने का एक उदाहरण है:

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

## अपने Next.js एप्लिकेशन के अंतर्राष्ट्रीयकरण में महारत हासिल करें

Intlayer आपके Next.js एप्लिकेशन को अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है। यहाँ कुछ प्रमुख विशेषताएँ हैं:

- **सर्वर घटकों का अंतर्राष्ट्रीयकरण**: Intlayer आपको अपने सर्वर घटकों को उसी तरह अंतर्राष्ट्रीयकरण करने की अनुमति देता है जैसे आपके क्लाइंट घटकों को। इसका मतलब है कि आप क्लाइंट और सर्वर घटकों दोनों के लिए समान सामग्री घोषणाओं का उपयोग कर सकते हैं।
- **भाषा पहचान के लिए मिडलवेयर**: Intlayer उपयोगकर्ता की पसंदीदा भाषा का पता लगाने के लिए मिडलवेयर प्रदान करता है। यह मिडलवेयर उपयोगकर्ता की पसंदीदा भाषा का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर पुनर्निर्देशित करने के लिए उपयोग किया जाता है।
- **मेटाडेटा का अंतर्राष्ट्रीयकरण**: Intlayer आपके मेटाडेटा, जैसे आपके पृष्ठ के शीर्षक, को अंतर्राष्ट्रीयकरण करने का एक तरीका प्रदान करता है। आप अपने मेटाडेटा का अनुवाद करने के लिए `getTranslation` फ़ंक्शन का उपयोग कर सकते हैं।
- **sitemap.xml और robots.txt का अंतर्राष्ट्रीयकरण**: Intlayer आपको अपनी sitemap.xml और robots.txt फ़ाइलों का अंतर्राष्ट्रीयकरण करने की अनुमति देता है। आप अपनी साइटमैप के लिए बहुभाषी URL उत्पन्न करने के लिए `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं।
- **URL का अंतर्राष्ट्रीयकरण**: Intlayer आपको `getMultilingualUrls` फ़ंक्शन का उपयोग करके अपने URL का अंतर्राष्ट्रीयकरण करने की अनुमति देता है। यह फ़ंक्शन आपकी साइटमैप के लिए बहुभाषी URL उत्पन्न करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, [Next.js अंतर्राष्ट्रीयकरण (i18n) Intlayer और Next.js 15 App Router के साथ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) गाइड देखें।**

## `next-intlayer` पैकेज द्वारा प्रदान किए गए फ़ंक्शन

`next-intlayer` पैकेज आपके एप्लिकेशन को अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कुछ फ़ंक्शन भी प्रदान करता है।

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayerAsync.md)
