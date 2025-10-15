---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: अपना Express backend ऐप कैसे अनुवाद करें – i18n गाइड 2025
description: जानें कि कैसे अपनी vite बैकएंड को बहुभाषी बनाया जाए। इसे अंतर्राष्ट्रीय बनाने (i18n) और अनुवाद करने के लिए दस्तावेज़ का पालन करें।
keywords:
  - आंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Express
  - JavaScript
  - बैकएंड
slugs:
  - doc
  - environment
  - express
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ
---

# Intlayer के साथ अपना Express backend अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

`express-intlayer` Express अनुप्रयोगों के लिए एक शक्तिशाली अंतरराष्ट्रीयकरण (i18n) मिडलवेयर है, जिसे क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएँ प्रदान करके आपके बैकएंड सेवाओं को वैश्विक रूप से सुलभ बनाने के लिए डिज़ाइन किया गया है।

## अपने बैकएंड का अंतरराष्ट्रीयकरण क्यों करें?

अपने बैकएंड का अंतरराष्ट्रीयकरण करना एक वैश्विक दर्शकों की प्रभावी सेवा के लिए आवश्यक है। यह आपकी एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपकी एप्लिकेशन की पहुँच को व्यापक बनाती है, इसे विभिन्न भाषाई पृष्ठभूमियों के लोगों के लिए अधिक सुलभ और प्रासंगिक बनाती है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियाँ प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मूल भाषा में संदेश प्रदर्शित करना समझ को बेहतर बनाता है और निराशा को कम करता है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट्स या मोडल्स में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतरराष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में सेवा दे सकते हैं। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उत्पाद विवरण, लेख और अन्य सामग्री उपयोगकर्ता की पसंदीदा भाषा में प्रदर्शित करने की आवश्यकता होती है।
- **बहुभाषी ईमेल भेजना**: चाहे वह लेन-देन ईमेल हों, विपणन अभियान हों, या सूचनाएँ हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएँ**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएँ भेजने से बातचीत और प्रतिधारण में वृद्धि हो सकती है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।

- **अन्य संचार**: बैकएंड से किसी भी प्रकार के संचार, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव को बढ़ावा मिलता है।
  अपने बैकएंड का अंतरराष्ट्रीयकरण करके, आपकी एप्लिकेशन न केवल सांस्कृतिक मतभेदों का सम्मान करती है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तालमेल भी बिठाती है, जिससे यह आपकी सेवाओं को विश्व स्तर पर बढ़ाने में एक प्रमुख कदम बन जाती है।

## प्रारंभ करना

### स्थापना

`express-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### अपनी सामग्री घोषित करें

अपने अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "hi": "हिंदी में लौटाई गई सामग्री का उदाहरण",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### Express एप्लिकेशन सेटअप

अपने Express एप्लिकेशन को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// सर्वर प्रारंभ करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import dictionaryExample from "./index.content";

const app: Express = express();

// Load internationalization request handler
app.use(intlayer());

// Routes
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      hi: "अंग्रेज़ी में लौटाए गए सामग्री का उदाहरण",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Start server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t, getDictionary, getIntlayer } = require("express-intlayer");
const dictionaryExample = require("./index.content");

const app = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// सर्वर शुरू करें
app.listen(3000, () => console.log(`पोर्ट 3000 पर सुन रहा है`));
```

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)
  यह किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ विभिन्न वातावरणों में, जिसमें ब्राउज़र और API अनुरोध शामिल हैं, सहजता से काम करता है। आप मिडलवेयर को हेडर या कुकीज़ के माध्यम से लोकल का पता लगाने के लिए अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
  },
};

export default config;
```

यह किसी भी अंतरराष्ट्रीयकरण समाधान के साथ विभिन्न वातावरणों में, जिसमें ब्राउज़र और API अनुरोध शामिल हैं, सहजता से काम करता है। आप मिडलवेयर को हेडर या कुकी के माध्यम से लोकल का पता लगाने के लिए अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

डिफ़ॉल्ट रूप से, `express-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारी [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### TypeScript कॉन्फ़िगर करें

`express-intlayer` अंतरराष्ट्रीयकरण प्रक्रिया को बेहतर बनाने के लिए TypeScript की मजबूत क्षमताओं का उपयोग करता है। TypeScript की स्थैतिक टाइपिंग सुनिश्चित करती है कि हर अनुवाद कुंजी का ध्यान रखा गया है, जिससे अनुवादों के गायब होने का जोखिम कम होता है और रखरखाव में सुधार होता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि स्वचालित रूप से उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts में) आपके tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### VS कोड एक्सटेंशन

अपने Intlayer विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकंप्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक जानकारी के लिए देखें [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

### गिट कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

### VS Code एक्सटेंशन

अपने Intlayer विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/hi/vs-code-extension)।

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```
