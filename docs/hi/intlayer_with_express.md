# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer` एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) मध्यवर्ती है जो एक्सप्रेस अनुप्रयोगों के लिए डिज़ाइन किया गया है, जो आपके बैकेंड सेवाओं को ग्राहकों की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएँ प्रदान करके विश्व स्तर पर सुलभ बनाता है।

## Why Internationalize Your Backend?

अपने बैकेंड को अंतर्राष्ट्रीयकरण करना वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके अनुप्रयोग को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को सुधारती है और आपके अनुप्रयोग की पहुंच को बढ़ाकर इसे विभिन्न भाषा पृष्ठभूमियों के लोगों के लिए अधिक सुलभ और प्रासंगिक बनाती है।

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: जब एक त्रुटि होती है, तो उपयोगकर्ता की मूल भाषा में संदेशों को प्रदर्शित करना समझ को सुधारता है और निराशा को कम करता है। यह विशेष रूप से डायनामिक त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट या मोडल में दिखाए जा सकते हैं।

- **Retrieving Multilingual Content**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में सेवा कर सकें। यह उन प्लेटफार्मों के लिए महत्वपूर्ण है जैसे ई-कॉमर्स साइटें या सामग्री प्रबंधन प्रणाली जिन्हें उपयोगकर्ता द्वारा पसंदीदा भाषा में उत्पाद वर्णन, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।

- **Sending Multilingual Emails**: चाहे वह लेन-देन करने वाले ईमेल हों, विपणन अभियान, या सूचनाएँ, प्राप्तकर्ता की भाषा में ईमेल भेजना काफी हद तक सहभागिता और प्रभावशीलता को बढ़ा सकता है।

- **Multilingual Push Notifications**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएँ भेजना बातचीत और रखरखाव को बढ़ा सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और क्रियाशील महसूस करा सकता है।

- **Other Communications**: बैकेंड से किसी भी प्रकार की संचार, जैसे एसएमएस संदेश, सिस्टम चेतावनियाँ, या उपयोगकर्ता इंटरफेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव को बढ़ाती है।

अपने बैकेंड को अंतर्राष्ट्रीयकरण करके, आपका अनुप्रयोग न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर मेल खाता है, जिससे आपके सेवाओं को विश्व स्तर पर स्केल करने में एक प्रमुख कदम बनता है।

## Getting Started

### Installation

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

### Setup

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतर्राष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करें:

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

### Express Application Setup

अपने एक्सप्रेस अनुप्रयोग को `express-intlayer` का उपयोग करने के लिए सेट करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मार्ग
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// सर्वर शुरू करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मार्ग
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// सर्वर शुरू करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मार्ग
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// सर्वर शुरू करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibility

`express-intlayer` पूरी तरह से संगत है:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) React अनुप्रयोगों के लिए
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/index.md) Next.js अनुप्रयोगों के लिए
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/vite-intlayer/index.md) Vite अनुप्रयोगों के लिए

यह विभिन्न वातावरणों, जिसमें ब्राउज़र्स और एपीआई अनुरोध शामिल हैं, के भीतर किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ सहजता से काम करता है। आप हैडर या कुकीज़ के माध्यम से क्षेत्रीय पहचान करने के लिए मध्यवर्ती को अनुकूलित कर सकते हैं:

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

डिफ़ॉल्ट रूप से, `express-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हैडर को व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारी [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) पर जाएं।

## Powered by TypeScript

`express-intlayer` अंतर्राष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की robust क्षमताओं का लाभ उठाता है। TypeScript की स्थैतिक टाइपिंग हर अनुवाद कुंजी को सुनिश्चित करती है, अनुवादों के गायब होने के जोखिम को कम करती है और बनाए रखी जाती है।

> सुनिश्चित करें कि उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts) आपके tsconfig.json फ़ाइल में शामिल हैं।
