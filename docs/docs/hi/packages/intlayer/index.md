---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ | intlayer
description: intlayer पैकेज का उपयोग कैसे करें देखें
keywords:
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: बहुभाषी शब्दकोश (i18n) प्रबंधित करने के लिए NPM पैकेज

**Intlayer** विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक समूह है। यह React, Next.js, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`intlayer` पैकेज** आपको अपने कोड में कहीं भी अपनी सामग्री घोषित करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपके एप्लिकेशन में सहजता से एकीकृत हो जाते हैं। TypeScript के साथ, **Intlayer** आपके विकास को मजबूत और अधिक कुशल उपकरण प्रदान करके बढ़ाता है।

## Intlayer को एकीकृत क्यों करें?

- **JavaScript-संचालित सामग्री प्रबंधन**: अपनी सामग्री को प्रभावी ढंग से परिभाषित और प्रबंधित करने के लिए JavaScript की लचीलापन का उपयोग करें।
- **टाइप-सुरक्षित वातावरण**: सुनिश्चित करें कि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि-मुक्त हों, इसके लिए TypeScript का लाभ उठाएं।
- **एकीकृत सामग्री फ़ाइलें**: अपनी अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे रखरखाव और स्पष्टता बढ़े।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

Intlayer आपके प्रोजेक्ट को सेटअप करने के लिए एक कॉन्फ़िगरेशन फ़ाइल प्रदान करता है। इस फ़ाइल को अपने प्रोजेक्ट की रूट डायरेक्टरी में रखें।

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
import { Locales } from "intlayer";

javascript fileName="intlayer.config.mjs" codeFormat="esm"
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

> उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## उपयोग का उदाहरण

Intlayer के साथ, आप अपने कोडबेस में कहीं भी अपने कंटेंट को संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer उन फाइलों को स्कैन करता है जिनका एक्सटेंशन `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` होता है।

> आप डिफ़ॉल्ट एक्सटेंशन को [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी सेट करके बदल सकते हैं।

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

### अपने कंटेंट को घोषित करें

यहाँ कंटेंट घोषणा का एक उदाहरण है:

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
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
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
      "<-1": "माइनस एक कार से कम",
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
      "<-1": "माइनस एक कार से कम",
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

### अपनी शब्दकोश बनाएं

आप [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md) का उपयोग करके अपने शब्दकोश बना सकते हैं।

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

यह कमांड सभी `*.content.*` फ़ाइलों को स्कैन करता है, उन्हें संकलित करता है, और परिणामों को उस निर्देशिका में लिखता है जो आपके **`intlayer.config.ts`** में निर्दिष्ट है (डिफ़ॉल्ट रूप से, `./.intlayer`)।

एक सामान्य आउटपुट इस प्रकार दिख सकता है:

```bash
.
└── .intlayer
    ├── dictionary  # आपकी सामग्री के शब्दकोश को समाहित करता है
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # आपके एप्लिकेशन में उपयोग के लिए आपके शब्दकोश का प्रवेश बिंदु समाहित करता है
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # आपके शब्दकोश के स्वचालित रूप से उत्पन्न प्रकार परिभाषाओं को समाहित करता है
        ├── intlayer.d.ts  # Intlayer के स्वचालित रूप से उत्पन्न प्रकार परिभाषाओं को समाहित करता है
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18next संसाधन बनाएं

Intlayer को [i18next](https://www.i18next.com/) के लिए शब्दकोश बनाने के लिए कॉन्फ़िगर किया जा सकता है। इसके लिए आपको अपने `intlayer.config.ts` फ़ाइल में निम्नलिखित कॉन्फ़िगरेशन जोड़ना होगा:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["i18next"],

    // वह निर्देशिका जहाँ Intlayer आपके संदेश JSON फ़ाइलें लिखेगा
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["i18next"],

    // वह निर्देशिका जहाँ Intlayer आपके संदेश JSON फ़ाइलें लिखेगा
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["i18next"],

    // वह निर्देशिका जहाँ Intlayer आपके संदेश JSON फ़ाइलें लिखेगा
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> उपलब्ध पैरामीटरों की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

आउटपुट:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

उदाहरण के लिए, **en/client-component.json** इस प्रकार दिख सकता है:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "कुछ कारें"
}
```

### next-intl शब्दकोश बनाएँ

Intlayer को [i18next](https://www.i18next.com/) या [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) के लिए शब्दकोश बनाने के लिए कॉन्फ़िगर किया जा सकता है। इसके लिए आपको अपने `intlayer.config.ts` फ़ाइल में निम्नलिखित कॉन्फ़िगरेशन जोड़ना होगा:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["next-intl"],

    // वह निर्देशिका जहाँ Intlayer आपके संदेश JSON फ़ाइलें लिखेगा
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["next-intl"],

    // वह निर्देशिका जहाँ Intlayer आपके संदेश JSON फ़ाइलें लिखेगा
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["next-intl"],

    // वह निर्देशिका जहाँ Intlayer आपके संदेश JSON फ़ाइलें लिखेगा
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

आउटपुट:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

उदाहरण के लिए, **en/client-component.json** इस प्रकार दिख सकता है:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "नमस्ते दुनिया",
  "zero_numberOfCar": "कोई कार नहीं",
  "one_numberOfCar": "एक कार",
  "two_numberOfCar": "दो कारें",
  "other_numberOfCar": "कुछ कारें"
}
```

## CLI उपकरण

Intlayer एक CLI उपकरण प्रदान करता है जो:

- आपकी सामग्री घोषणाओं का ऑडिट करता है और गायब अनुवादों को पूरा करता है
- आपकी सामग्री घोषणाओं से शब्दकोश बनाता है
- आपके CMS से दूरस्थ शब्दकोशों को आपके स्थानीय प्रोजेक्ट में पुश और पुल करता है

अधिक जानकारी के लिए [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) देखें।

## अपने एप्लिकेशन में Intlayer का उपयोग करें

एक बार आपकी सामग्री घोषित हो जाने के बाद, आप अपने एप्लिकेशन में Intlayer शब्दकोशों का उपयोग कर सकते हैं।

Intlayer आपके एप्लिकेशन के लिए एक पैकेज के रूप में उपलब्ध है।

### React एप्लिकेशन

अपने React एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md) का उपयोग कर सकते हैं।

### Next.js एप्लिकेशन

अपने Next.js एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md) का उपयोग कर सकते हैं।

### Express एप्लिकेशन

अपने Express एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/express-intlayer/index.md) का उपयोग कर सकते हैं।

## `intlayer` पैकेज द्वारा प्रदान की गई फ़ंक्शन

`intlayer` पैकेज कुछ फ़ंक्शन भी प्रदान करता है जो आपकी एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करते हैं।

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
