# next-intlayer: NPM पैकेज Next.js एप्लिकेशन को इंटरनेशनलाइज़ करने के लिए (i18n)

**Intlayer** एक पैकेज का समूह है जिसे विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, Next.js और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`next-intlayer` पैकेज** आपको अपने Next.js एप्लिकेशन को इंटरनेशनलाइज़ करने की अनुमति देता है। यह Next.js अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा स्थानीयता का पता लगाने, कुकीज़ प्रबंधित करने और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी है।

## अपने Next.js एप्लिकेशन को इंटरनेशनलाइज़ करने के लिए क्यों?

अपने Next.js एप्लिकेशन को इंटरनेशनलाइज़ करना एक वैश्विक ऑडियंस को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश देने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपकी एप्लिकेशन की पहुंच को उन लोगों तक और अधिक सुलभ और प्रासंगिक बनाकर व्यापक बनाती है, जो विभिन्न भाषाई पृष्ठभूमियों से आते हैं।

## Intlayer को एकीकृत करने के लिए क्यों?

- **जावास्क्रिप्ट-समर्थित सामग्री प्रबंधन**: आपके सामग्री को कुशलता से परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का लाभ उठाएं।
- **टाइप-सेफ वातावरण**: सुनिश्चित करने के लिए TypeScript का लाभ उठाएं कि आपकी सभी सामग्री परिभाषाएं सटीक और त्रुटि-मुक्त हों।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे रखरखाव और स्पष्टता बढ़ती है।

## स्थापना

आवश्यक पैकेज को अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके स्थापित करें:

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

Intlayer के साथ, आप अपने कोडबेस में कहीं भी अपनी सामग्री को संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer `.content.{ts,tsx,js,jsx,mjs,cjs}` एक्सटेंशन वाली फ़ाइलों को स्कैन करता है।

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

### अपनी सामग्री की घोषणा करें

`next-intlayer` को [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ काम करने के लिए बनाया गया है। `intlayer` एक पैकेज है जो आपको अपने कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपकी एप्लिकेशन में सहजता से एकीकृत होते हैं।

यहां सामग्री की उद्घाटन का एक उदाहरण है:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car", // एक से कम गाड़ी
      "-1": "Minus one car", // एक गाड़ी कम
      "0": "No cars", // कोई गाड़ी नहीं
      "1": "One car", // एक गाड़ी
      ">5": "Some cars", // कुछ गाड़ियाँ
      ">19": "Many cars", // कई गाड़ियाँ
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car", // एक से कम गाड़ी
      "-1": "Minus one car", // एक गाड़ी कम
      "0": "No cars", // कोई गाड़ी नहीं
      "1": "One car", // एक गाड़ी
      ">5": "Some cars", // कुछ गाड़ियाँ
      ">19": "Many cars", // कई गाड़ियाँ
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car", // एक से कम गाड़ी
      "-1": "Minus one car", // एक गाड़ी कम
      "0": "No cars", // कोई गाड़ी नहीं
      "1": "One car", // एक गाड़ी
      ">5": "Some cars", // कुछ गाड़ियों
      ">19": "Many cars", // कई गाड़ियाँ
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
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
        "<-1": "Less than minus one car", // एक से कम गाड़ी
        "-1": "Minus one car", // एक गाड़ी कम
        "0": "No cars", // कोई गाड़ी नहीं
        "1": "One car", // एक गाड़ी
        ">5": "Some cars", // कुछ गाड़ियाँ
        ">19": "Many cars" // कई गाड़ियाँ
      }
    }
  }
}
```

### अपनी सामग्री का उपयोग करें

एक बार जब आप अपनी सामग्री की घोषणा कर लेते हैं, तो आप इसका उपयोग अपने कोड में कर सकते हैं। यहाँ एक उदाहरण है कि आप एक React घटक में सामग्री का उपयोग कैसे कर सकते हैं:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // संबंधित सामग्री की घोषणा करें

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
  const { myTranslatedContent } = useIntlayer("client-component"); // संबंधित सामग्री की घोषणा करें

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
  const { myTranslatedContent } = useIntlayer("client-component"); // संबंधित सामग्री की घोषणा करें

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## अपने Next.js एप्लिकेशन की अंतरराष्ट्रीयकरण को मास्टर करना

Intlayer आपके Next.js एप्लिकेशन को अंतरराष्ट्रीयकरण करने में मदद करने के लिए बहुत सारे फीचर्स प्रदान करता है। यहां कुछ प्रमुख विशेषताएँ हैं:

- **सर्वर घटकों का अंतरराष्ट्रीयकरण**: Intlayer आपको अपने सर्वर घटकों को उसी तरह अंतरराष्ट्रीयकरण करने की अनुमति देता है जैसे आपके क्लाइंट घटक। इसका मतलब है कि आप क्लाइंट और सर्वर घटकों के लिए समान सामग्री घोषणाओं का उपयोग कर सकते हैं।
- **स्थान सेट करने के लिए मिडलवेयर**: Intlayer उपयोगकर्ता की पसंदीदा स्थानीयता का पता लगाने के लिए मिडलवेयर प्रदान करता है। यह मिडलवेयर उपयोगकर्ता की पसंदीदा स्थानीयता का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में निर्दिष्ट उचित URL पर पुनर्निर्देशित करने के लिए उपयोग किया जाता है।
- **मेटाडाटा का अंतरराष्ट्रीयकरण**: Intlayer आपको Next.js द्वारा प्रदान की गई `generateMetadata` फ़ंक्शन का उपयोग करके अपने मेटाडाटा, जैसे आपके पृष्ठ का शीर्षक, का अंतरराष्ट्रीयकरण करने का एक तरीका प्रदान करता है। आप अपने मेटाडाटा का अनुवाद करने के लिए `getTranslation` फ़ंक्शन का उपयोग कर सकते हैं।
- **sitemap.xml और robots.txt का अंतरराष्ट्रीयकरण**: Intlayer आपको अपने sitemap.xml और robots.txt फ़ाइलों का अंतरराष्ट्रीयकरण करने की अनुमति देता है। आप अपने साइटमैप के लिए बहुभाषी URLs उत्पन्न करने के लिए `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं।
- **URLs का अंतरराष्ट्रीयकरण**: Intlayer आपको अपने URLs का अंतरराष्ट्रीयकरण करने की अनुमति देता है `getMultilingualUrls` फ़ंक्शन का उपयोग करके। यह फ़ंक्शन आपके साइटमैप के लिए बहुभाषी URLs उत्पन्न करता है।

**इन विशेषताओं के बारे में अधिक जानने के लिए, [Next.js इंटरनेशनलाइजेशन (i18n) के साथ Intlayer और Next.js 15 एप्लिकेशन राऊटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) गाइड को देखें।**

## `next-intlayer` पैकेज द्वारा प्रदान किए गए फ़ंक्शन

`next-intlayer` पैकेज आपके एप्लिकेशन को अंतरराष्ट्रीयकरण करने में मदद के लिए कुछ फ़ंक्शन भी प्रदान करता है।

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/useIntlayerAsync.md)
