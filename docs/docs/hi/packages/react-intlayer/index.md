---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | react-intlayer
description: देखें कि react-intlayer पैकेज का उपयोग कैसे करें
keywords:
  - Intlayer
  - react-intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
---

# react-intlayer: एक React एप्लिकेशन को अंतर्राष्ट्रीयकृत (i18n) करने के लिए NPM पैकेज

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`react-intlayer` पैकेज** आपको अपने React एप्लिकेशन को अंतर्राष्ट्रीयकृत करने की अनुमति देता है। यह React अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

## अपने React एप्लिकेशन को अंतर्राष्ट्रीयकृत क्यों करें?

अपने React एप्लिकेशन को अंतर्राष्ट्रीयकृत करना एक वैश्विक दर्शकों की प्रभावी सेवा के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

## Intlayer को एकीकृत क्यों करें?

- **JavaScript-संचालित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए JavaScript की लचीलापन का उपयोग करें।
- **टाइप-सेफ वातावरण**: TypeScript का उपयोग करें ताकि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हों।
- **एकीकृत सामग्री फ़ाइलें**: अपने अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे रखरखाव और स्पष्टता में सुधार होता है।

## स्थापना

अपनी पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## उपयोग का उदाहरण

Intlayer के साथ, आप अपनी सामग्री को अपनी कोडबेस में कहीं भी संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer उन फ़ाइलों को स्कैन करता है जिनका एक्सटेंशन `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` होता है।

> आप डिफ़ॉल्ट एक्सटेंशन को [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी सेट करके संशोधित कर सकते हैं।

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### अपनी सामग्री घोषित करें

`react-intlayer` को [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/index.md) के साथ काम करने के लिए बनाया गया है। `intlayer` एक ऐसा पैकेज है जो आपको अपने कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपके एप्लिकेशन में सहजता से एकीकृत हो जाते हैं।

यहाँ सामग्री घोषणा का एक उदाहरण है:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
};

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
};

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "माइनस एक कार से कम",
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

एक बार जब आप अपनी सामग्री घोषित कर लेते हैं, तो आप इसे अपने कोड में उपयोग कर सकते हैं। यहाँ एक उदाहरण है कि कैसे सामग्री को एक React घटक में उपयोग किया जाए:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## अपने React एप्लिकेशन के अंतरराष्ट्रीयकरण में महारत हासिल करना

Intlayer आपके React एप्लिकेशन को अंतरराष्ट्रीयकृत करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन विशेषताओं के बारे में अधिक जानने के लिए, Vite और React एप्लिकेशन के लिए [Intlayer और Vite और React के साथ React अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) गाइड या React Create App के लिए [Intlayer और React (CRA) के साथ React अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md) गाइड देखें।**

## `react-intlayer` पैकेज द्वारा प्रदान की गई फ़ंक्शन

`react-intlayer` पैकेज आपकी एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करने के लिए कुछ फ़ंक्शन भी प्रदान करता है।

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
