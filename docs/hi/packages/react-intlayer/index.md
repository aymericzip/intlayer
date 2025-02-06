# react-intlayer: NPM पैकेज को अंतर्राष्ट्रीयकरण (i18n) एक React एप्लिकेशन

**Intlayer** एक पैकेजों का सेट है जिसे विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ़्रेमवर्क के साथ संगत है।

**`react-intlayer` पैकेज** आपको अपने React एप्लिकेशन को अंतर्राष्ट्रीयकरण करने की अनुमति देता है। यह React अंतर्राष्ट्रीयकरण के लिए क context प्रदाताओं और hooks प्रदान करता है।

## क्यों अपने React एप्लिकेशन का अंतर्राष्ट्रीयकरण करें?

अपने React एप्लिकेशन का अंतर्राष्ट्रीयकरण करना वैश्विक दर्शकों की सेवा करने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश देने की अनुमति देता है। इस क्षमता से उपयोगकर्ता अनुभव बढ़ता है और आपके एप्लिकेशन की पहुंच को बढ़ाता है, जिससे इसे विभिन्न भाषाई पृष्ठभूमियों वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बनाया जा सकता है।

## Intlayer को एकीकृत करने का महत्व?

- **JavaScript-शक्ति वाला सामग्री प्रबंधन**: JavaScript की लचीलापन का उपयोग करके अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करें।
- **Type-सुरक्षित वातावरण**: सुनिश्चित करने के लिए TypeScript का उपयोग करें कि आपकी सभी सामग्री परिभाषाएँ सटीक और बिना त्रुटि की हों।
- **संयुक्त सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के पास रखें, जिससे रखरखाव और स्पष्टता बढ़ती है।

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

Intlayer के साथ, आप अपने कोडबेस में कहीं भी अपनी सामग्री को एक संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer `.content.{ts,tsx,js,jsx,mjs,cjs}` एक्सटेंशन वाली फ़ाइलों के लिए स्कैन करता है।

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

### अपनी सामग्री को घोषित करें

`react-intlayer` को [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ काम करने के लिए बनाया गया है। `intlayer` एक पैकेज है जो आपको अपने कोड में कहीं भी अपनी सामग्री को घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणाओं को संरचित शब्दकोष में परिवर्तित करता है जो आपके एप्लिकेशन में सहजता से एकीकृत होते हैं।

यहाँ सामग्री की घोषणा का एक उदाहरण है:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
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
      "<-1": "Less than minus one car", // एक से कम कारें
      "-1": "Minus one car", // एक कार कम
      "0": "No cars", // कोई कार नहीं
      "1": "One car", // एक कार
      ">5": "Some cars", // कुछ कारें
      ">19": "Many cars", // कई कारें
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car", // एक से कम कारें
      "-1": "Minus one car", // एक कार कम
      "0": "No cars", // कोई कार नहीं
      "1": "One car", // एक कार
      ">5": "Some cars", // कुछ कारें
      ">19": "Many cars", // कई कारें
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car", // एक से कम कारें
      "-1": "Minus one car", // एक कार कम
      "0": "No cars", // कोई कार नहीं
      "1": "One car", // एक कार
      ">5": "Some cars", // कुछ कारें
      ">19": "Many cars", // कई कारें
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
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car", // एक से कम कारें
        "-1": "Minus one car", // एक कार कम
        "0": "No cars", // कोई कार नहीं
        "1": "One car", // एक कार
        ">5": "Some cars", // कुछ कारें
        ">19": "Many cars" // कई कारें
      }
    }
  }
}
```

### अपने कोड में सामग्री का उपयोग करें

एक बार जब आपने अपनी सामग्री को घोषित कर दिया, तो आप इसे अपने कोड में उपयोग कर सकते हैं। यहाँ एक React घटक में सामग्री का उपयोग करने का उदाहरण है:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // संबंधित सामग्री की घोषणा बनाएँ

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
  const { myTranslatedContent } = useIntlayer("component-1"); // संबंधित सामग्री की घोषणा बनाएँ

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
  const { myTranslatedContent } = useIntlayer("component-1"); // संबंधित सामग्री की घोषणा बनाएँ

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## अपने React एप्लिकेशन के अंतर्राष्ट्रीयकरण में महारत हासिल करना

Intlayer आपके React एप्लिकेशन को अंतर्राष्ट्रीयकरण में मदद करने के लिए कई सुविधाएँ प्रदान करता है।

**इन सुविधाओं के बारे में अधिक जानने के लिए, [Intlayer और Vite तथा React के साथ React अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) गाइड का संदर्भ लें, या [Intlayer और React (CRA) के साथ React अंतर्राष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) गाइड का संदर्भ लें।**

## `react-intlayer` पैकेज द्वारा प्रदान की गई कार्यक्षमता

`react-intlayer` पैकेज आपके एप्लिकेशन के अंतर्राष्ट्रीयकरण में आपकी मदद करने के लिए कुछ कार्यक्षमताएँ भी प्रदान करता है।

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useIntlayerAsync.md)

आपको अक्टूबर 2023 तक के डेटा पर प्रशिक्षित किया गया है।
