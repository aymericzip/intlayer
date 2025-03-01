# intlayer: बहुभाषी शब्दकोश (i18n) प्रबंधन के लिए NPM पैकेज

**Intlayer** विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया पैकेजों का एक सेट है। यह React, Next.js, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`intlayer` पैकेज** आपको अपने कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपके एप्लिकेशन में आसानी से एकीकृत हो जाते हैं। TypeScript के साथ, **Intlayer** मजबूत और अधिक कुशल उपकरण प्रदान करके आपके विकास को बढ़ाता है।

## Intlayer को क्यों एकीकृत करें?

- **जावास्क्रिप्ट-संचालित सामग्री प्रबंधन**: अपनी सामग्री को कुशलतापूर्वक परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का उपयोग करें।
- **टाइप-सुरक्षित वातावरण**: TypeScript का उपयोग करके सुनिश्चित करें कि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हैं।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवाद फ़ाइलों को उनके संबंधित घटकों के पास रखें, जिससे रखरखाव और स्पष्टता बढ़ती है।

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Intlayer को कॉन्फ़िगर करें

Intlayer आपके प्रोजेक्ट को सेट अप करने के लिए एक कॉन्फ़िगरेशन फ़ाइल प्रदान करता है। इस फ़ाइल को अपने प्रोजेक्ट की रूट डायरेक्टरी में रखें।

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// कॉन्फ़िगरेशन फ़ाइल में स्थानीयकरण सेटिंग्स को परिभाषित करें
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
// कॉन्फ़िगरेशन फ़ाइल में स्थानीयकरण सेटिंग्स को परिभाषित करें
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
// कॉन्फ़िगरेशन फ़ाइल में स्थानीयकरण सेटिंग्स को परिभाषित करें
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

## उपयोग का उदाहरण

Intlayer के साथ, आप अपनी सामग्री को अपने कोडबेस में कहीं भी संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer `.content.{ts,tsx,js,jsx,mjs,cjs}` एक्सटेंशन वाली फ़ाइलों को स्कैन करता है।

> आप [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी सेट करके डिफ़ॉल्ट एक्सटेंशन को संशोधित कर सकते हैं।

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
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
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### अपनी सामग्री घोषित करें

यहाँ सामग्री घोषणा का एक उदाहरण है:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
// सामग्री को बहुभाषी रूप में परिभाषित करें
import { t, type Dictionary } from "intlayer";

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

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
// सामग्री को बहुभाषी रूप में परिभाषित करें
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
// सामग्री को बहुभाषी रूप में परिभाषित करें
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
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

### अपने शब्दकोश बनाएं

आप [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md) का उपयोग करके अपने शब्दकोश बना सकते हैं।

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

यह कमांड सभी `*.content.*` फ़ाइलों को स्कैन करता है, उन्हें संकलित करता है, और परिणामों को आपके **`intlayer.config.ts`** में निर्दिष्ट डायरेक्टरी में लिखता है (डिफ़ॉल्ट रूप से, `./.intlayer`)।

आउटपुट का एक सामान्य उदाहरण:

```bash
.
└── .intlayer
    ├── dictionary  # आपकी सामग्री का शब्दकोश
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # आपके एप्लिकेशन में उपयोग के लिए शब्दकोश का एंट्री पॉइंट
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # आपके शब्दकोश की ऑटो-जेनरेटेड टाइप परिभाषाएँ
        ├── intlayer.d.ts  # Intlayer की ऑटो-जेनरेटेड टाइप परिभाषाएँ
        ├── client-component.d.ts
        └── server-component.d.ts
```

## CLI उपकरण

Intlayer एक CLI उपकरण प्रदान करता है:

- आपकी सामग्री घोषणाओं का ऑडिट करने और गायब अनुवादों को पूरा करने के लिए
- आपकी सामग्री घोषणाओं से शब्दकोश बनाने के लिए
- आपके CMS से आपके स्थानीय प्रोजेक्ट में दूरस्थ शब्दकोशों को पुश और पुल करने के लिए

अधिक जानकारी के लिए [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) देखें।

## अपने एप्लिकेशन में Intlayer का उपयोग करें

एक बार आपकी सामग्री घोषित हो जाने के बाद, आप अपने एप्लिकेशन में Intlayer शब्दकोशों का उपयोग कर सकते हैं।

Intlayer आपके एप्लिकेशन के लिए एक पैकेज के रूप में उपलब्ध है।

### React एप्लिकेशन

अपने React एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) का उपयोग कर सकते हैं।

### Next.js एप्लिकेशन

अपने Next.js एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/index.md) का उपयोग कर सकते हैं।

### Express एप्लिकेशन

अपने Express एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/express-intlayer/index.md) का उपयोग कर सकते हैं।

## `intlayer` पैकेज द्वारा प्रदान किए गए फ़ंक्शन

`intlayer` पैकेज आपके एप्लिकेशन को अंतर्राष्ट्रीयकृत करने में मदद करने के लिए कुछ फ़ंक्शन भी प्रदान करता है।

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getPathWithoutLocale.md)
