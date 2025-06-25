---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Express का बैकएंड को अनुवाद करें (i18n)
description: जानें कि कैसे अपनी vite बैकएंड को बहुभाषी बनाया जाए। इसे अंतर्राष्ट्रीय बनाने (i18n) और अनुवाद करने के लिए दस्तावेज़ का पालन करें।
keywords:
  - आंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Express
  - JavaScript
  - बैकएंड
---

# अंतरराष्ट्रीयकरण (i18n) के साथ Intlayer और Express का उपयोग शुरू करना

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

### Express एप्लिकेशन सेटअप

अपने Express एप्लिकेशन को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
// Express और आवश्यक मॉड्यूल आयात करें
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
    })
  );
});

// सर्वर प्रारंभ करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
// Express और आवश्यक मॉड्यूल आयात करें
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
    })
  );
});

// सर्वर प्रारंभ करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
// Express और आवश्यक मॉड्यूल आयात करें
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
    })
  );
});

// सर्वर प्रारंभ करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- [React अनुप्रयोगों के लिए `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- [Next.js अनुप्रयोगों के लिए `next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- [Vite अनुप्रयोगों के लिए `vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)

यह विभिन्न वातावरणों में किसी भी अंतरराष्ट्रीयकरण समाधान के साथ सहजता से काम करता है, जिसमें ब्राउज़र और एपीआई अनुरोध शामिल हैं। आप हेडर या कुकीज़ के माध्यम से लोकेल का पता लगाने के लिए मिडलवेयर को अनुकूलित कर सकते हैं:

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

`express-intlayer` अंतरराष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की मजबूत क्षमताओं का लाभ उठाता है। TypeScript की स्थिर टाइपिंग यह सुनिश्चित करती है कि हर अनुवाद कुंजी का हिसाब रखा गया है, अनुवादों के छूटने के जोखिम को कम करता है और रखरखाव में सुधार करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि स्वचालित रूप से उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपके tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करना अनुशंसित है। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```
