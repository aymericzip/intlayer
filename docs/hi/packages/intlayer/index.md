# intlayer: NPM पैकेज बहुभाषी सामग्री घोषणा प्रबंधन (i18n)

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिजाइन किया गया है। यह React, Next.js और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`intlayer` पैकेज** आपको अपने कोड में कहीं भी अपनी सामग्री की घोषणा करने की अनुमति देता है। यह बहुभाषी सामग्री घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है जो आपकी एप्लिकेशन में सहजता से एकीकृत होते हैं। TypeScript के साथ, **Intlayer** आपके विकास को मजबूत और कुशल उपकरण प्रदान करके बढ़ाता है।

## Intlayer को एकीकृत करने का कारण

- **JavaScript-संचालित सामग्री प्रबंधन**: सामग्री को कुशलता से परिभाषित और प्रबंधित करने के लिए JavaScript की लचीलेता का लाभ उठाएं।
- **टाइप-सुरक्षित वातावरण**: सभी सामग्री परिभाषाओं को सही और त्रुटि-रहित सुनिश्चित करने के लिए TypeScript का उपयोग करें।
- **एकीकृत सामग्री फ़ाइलें**: अपने अनुवादों को उनके संबंधित घटकों के करीब रखें, जिससे रखरखाव और स्पष्टता में वृद्धि हो।

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

Intlayer आपके प्रोजेक्ट को सेट अप करने के लिए एक कॉन्फ़िगरेशन फ़ाइल प्रदान करता है। इस फ़ाइल को अपने प्रोजेक्ट की जड़ में रखें।

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.HINDI, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.HINDI,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.HINDI, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.HINDI,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.HINDI, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.HINDI,
  },
};

module.exports = config;
```

> उपलब्ध पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

## उपयोग का उदाहरण

Intlayer के साथ, आप अपनी सामग्री को कहीं भी अपने कोडबेस में एक संरचित तरीके से घोषित कर सकते हैं।

डिफ़ॉल्ट रूप से, Intlayer `.content.{ts,tsx,js,jsx,mjs,cjs}` एक्सटेंशन वाली फ़ाइलों के लिए स्कैन करता है।

> डिफ़ॉल्ट एक्सटेंशन को संशोधित करने के लिए, [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में `contentDir` प्रॉपर्टी को सेट करें।

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

### अपनी सामग्री की घोषणा करें

यहां सामग्री की घोषणा का एक उदाहरण है:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      hi: "नमस्ते दुनिया",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "एक से कम एक कार",
      "-1": "एक कार कम",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      hi: "नमस्ते दुनिया",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "एक से कम एक कार",
      "-1": "एक कार कम",
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
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      hi: "नमस्ते दुनिया",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "एक से कम एक कार",
      "-1": "एक कार कम",
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
        "hi": "नमस्ते दुनिया",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "एक से कम एक कार",
        "-1": "एक कार कम",
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

यह कमांड सभी `*.content.*` फ़ाइलों को स्कैन करता है, उन्हें संकलित करता है, और परिणामों को आपकी **`intlayer.config.ts`** में निर्दिष्ट निर्देशिका (डिफ़ॉल्ट रूप से, `./.intlayer`) में लिखता है।

एक सामान्य आउटपुट इस प्रकार हो सकता है:

```bash
.
├── .intlayer
│   ├── dictionary  # आपकी सामग्री का शब्दकोश
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # आपकी एप्लिकेशन में उपयोग के लिए आपके शब्दकोश का एंट्री पॉइंट
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # आपके शब्दकोश के स्वचालित रूप से उत्पन्न प्रकार परिभाषाएँ
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Intlayer के स्वचालित रूप से उत्पन्न प्रकार की परिभाषाएँ
```

### i18next संसाधन बनाएं

Intlayer को [i18next](https://www.i18next.com/) के लिए शब्दकोश बनाने के लिए कॉन्फ़िगर किया जा सकता है। इसके लिए आपको अपनी `intlayer.config.ts` फ़ाइल में निम्नलिखित कॉन्फ़िगरेशन जोड़ने की आवश्यकता है:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["i18next"],

    // वह निर्देशिका जहां Intlayer आपकी संदेश JSON फ़ाइलें लिखेगा
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

    // वह निर्देशिका जहां Intlayer आपकी संदेश JSON फ़ाइलें लिखेगा
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

    // वह निर्देशिका जहां Intlayer आपकी संदेश JSON फ़ाइलें लिखेगा
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> उपलब्ध पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

आउटपुट:

```bash
.
└── i18next
    └── resources
        ├── hi
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

उदाहरण के लिए, **hi/client-component.json** इस तरह दिखाई दे सकता है:

```json filePath="intlayer/dictionary/hi/client-component.json"
{
  "myTranslatedContent": "नमस्ते दुनिया",
  "zero_numberOfCar": "कोई कार नहीं",
  "one_numberOfCar": "एक कार",
  "two_numberOfCar": "दो कारें",
  "other_numberOfCar": "कुछ कारें"
}
```

### i18next या next-intl शब्दकोश बना सकते हैं

Intlayer को [i18next](https://www.i18next.com/) या [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) के लिए शब्दकोश बनाने के लिए कॉन्फ़िगर किया जा सकता है। इसके लिए आपको अपनी `intlayer.config.ts` फ़ाइल में निम्नलिखित कॉन्फ़िगरेशन जोड़ने की आवश्यकता है:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer को i18next के लिए संदेश फ़ाइलें उत्पन्न करने के लिए बताता है
    dictionaryOutput: ["next-intl"],

    // वह निर्देशिका जहां Intlayer आपकी संदेश JSON फ़ाइलें लिखेगा
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

    // वह निर्देशिका जहां Intlayer आपकी संदेश JSON फ़ाइलें लिखेगा
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

    // वह निर्देशिका जहां Intlayer आपकी संदेश JSON फ़ाइलें लिखेगा
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> उपलब्ध पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

आउटपुट:

```bash
.
└── intl
    └── messages
        ├── hi
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

उदाहरण के लिए, **hi/client-component.json** इस तरह दिखाई दे सकता है:

```json filePath="intlayer/dictionary/hi/client-component.json"
{
  "myTranslatedContent": "नमस्ते दुनिया",
  "zero_numberOfCar": "कोई कार नहीं",
  "one_numberOfCar": "एक कार",
  "two_numberOfCar": "दो कारें",
  "other_numberOfCar": "कुछ कारें"
}
```

## CLI उपकरण

Intlayer एक CLI उपकरण प्रदान करता है:

- आपकी सामग्री घोषणाओं का ऑडिट करें और गायब अनुवादों को पूरा करें
- आपकी सामग्री घोषणाओं से शब्दकोश बनाएं
- आपके CMS से आपके स्थानीय प्रोजेक्ट में दूरस्थ शब्दकोश को पुश और पुल करें

अधिक जानकारी के लिए [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) की जांच करें।

## अपने एप्लिकेशन में Intlayer का उपयोग करें

एक बार आपकी सामग्री घोषित होने पर, आप अपने एप्लिकेशन में अपने Intlayer शब्दकोशों का उपभोग कर सकते हैं।

Intlayer आपके एप्लिकेशन के लिए एक पैकेज के रूप में उपलब्ध है।

### React एप्लिकेशन

अपने React एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) का उपयोग कर सकते हैं।

### Next.js एप्लिकेशन

अपने Next.js एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/index.md) का उपयोग कर सकते हैं।

### Express एप्लिकेशन

अपने Express एप्लिकेशन में Intlayer का उपयोग करने के लिए, आप [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/express-intlayer/index.md) का उपयोग कर सकते हैं।

## `intlayer` पैकेज द्वारा प्रदान की जाने वाली कार्यक्षमताएँ

`intlayer` पैकेज कुछ कार्यक्षमताएँ भी प्रदान करता है जो आपके एप्लिकेशन का अंतर्राष्ट्रीयकरण करने में मदद करती हैं।

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getConfiguration.md)
- [`getTranslationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getTranslationContent.md)
- [`getEnumerationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getEnumerationContent.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/getPathWithoutLocale.md)
