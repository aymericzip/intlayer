# react-intlayer: NPM पैकेज एक React एप्लिकेशन को अंतर्राष्ट्रीयकरण (i18n) करने के लिए

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`react-intlayer` पैकेज** आपको अपने React एप्लिकेशन को अंतर्राष्ट्रीयकरण करने की अनुमति देता है। यह React अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

## अपने React एप्लिकेशन को अंतर्राष्ट्रीयकरण क्यों करें?

अपने React एप्लिकेशन को अंतर्राष्ट्रीयकरण करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, इसे विभिन्न भाषाई पृष्ठभूमि के लोगों के लिए अधिक सुलभ और प्रासंगिक बनाती है।

## Intlayer को क्यों एकीकृत करें?

- **जावास्क्रिप्ट-संचालित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का उपयोग करें।
- **टाइप-सुरक्षित वातावरण**: टाइपस्क्रिप्ट का उपयोग करके सुनिश्चित करें कि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हैं।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के पास रखें, जिससे रखरखाव और स्पष्टता बढ़े।

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

डिफ़ॉल्ट रूप से, Intlayer `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` एक्सटेंशन वाली फ़ाइलों को स्कैन करता है।

> आप [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी सेट करके डिफ़ॉल्ट एक्सटेंशन को संशोधित कर सकते हैं।

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

`react-intlayer` [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ काम करने के लिए बनाया गया है। `intlayer` एक पैकेज है जो आपको अपनी सामग्री को अपनी कोड में कहीं भी घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपके एप्लिकेशन में सहजता से एकीकृत होते हैं।

यहाँ सामग्री घोषणा का एक उदाहरण है:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      hi: "नमस्ते दुनिया",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
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
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### अपनी कोड में सामग्री का उपयोग करें

एक बार जब आप अपनी सामग्री घोषित कर लेते हैं, तो आप इसे अपनी कोड में उपयोग कर सकते हैं। यहाँ एक उदाहरण है कि React घटक में सामग्री का उपयोग कैसे करें:

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

## अपने React एप्लिकेशन के अंतर्राष्ट्रीयकरण में महारत हासिल करें

Intlayer आपके React एप्लिकेशन को अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, [Intlayer और Vite और React के साथ React अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) गाइड को देखें, या [Intlayer और React (CRA) के साथ React अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) गाइड को देखें।**

## `react-intlayer` पैकेज द्वारा प्रदान किए गए फ़ंक्शन

`react-intlayer` पैकेज आपके एप्लिकेशन को अंतर्राष्ट्रीयकरण करने में मदद करने के लिए कुछ फ़ंक्शन भी प्रदान करता है।

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayerAsync.md)
