# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer` एक शक्तिशाली अंतरराष्ट्रीयकरण (i18n) मध्यवर्ती है जो Express अनुप्रयोगों के लिए डिज़ाइन किया गया है, ताकि आपके बैकएंड सेवाओं को ग्राहक की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करके वैश्विक रूप से सुलभ बनाया जा सके।

## Why Internationalize Your Backend?

अपने बैकएंड का अंतरराष्ट्रीयकरण एक वैश्विक दर्शकों की सेवाओं के लिए जरूरी है। यह आपके आवेदन को प्रत्येक उपयोगकर्ता की चुनी हुई भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके application's की पहुँच को बढ़ाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमियों के लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाती है।

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: जब कोई त्रुटि होती है, उपयोगकर्ता की मूल भाषा में संदेश प्रदर्शित करना समझने में सुधार करता है और निराशा को कम करता है। यह विशेष रूप से उन गतिशील त्रुटि संदेशों के लिए उपयोगी है जो सामने के घटकों जैसे टोस्ट या मॉडल में दिखाए जा सकते हैं।

- **Retrieving Multilingual Content**: उन अनुप्रयोगों के लिए जो डेटाबेस से सामग्री खींचते हैं, अंतरराष्ट्रीयकरण सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में सेवा कर सकें। यह प्लेटफार्मों जैसे ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों के लिए महत्वपूर्ण है जिन्हें उपयोगकर्ता द्वारा पसंद की गई भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।

- **Sending Multilingual Emails**: चाहे वह लेनदेन संबंधी ईमेल, विपणन अभियानों, या सूचनाएँ हों, प्राप्तकर्ता की भाषा में ईमेल भेजना संलग्नता और प्रभावशीलता को महत्वपूर्ण रूप से बढ़ा सकता है।

- **Multilingual Push Notifications**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएँ भेजना बातचीत और रखरखाव को बढ़ा सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और क्रियाशील बना सकता है।

- **Other Communications**: बैकएंड से कोई भी प्रकार की संचार, जैसे SMS संदेश, सिस्टम चेतावनियाँ, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव को बढ़ाती है।

बैकएंड का अंतरराष्ट्रीयकरण करके, आपका अनुप्रयोग न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है, बल्कि वैश्विक बाजार की जरूरतों के साथ बेहतर मेल भी खाता है, जिससे आपके सेवाओं को वैश्विक स्तर पर स्केल करने में एक महत्वपूर्ण कदम बनता है।

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
// यह कॉन्फ़िगरेशन ऑब्जेक्ट अंतर्राष्ट्रीयकरण सेटिंग्स को परिभाषित करता है
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
// यह कॉन्फ़िगरेशन ऑब्जेक्ट अंतर्राष्ट्रीयकरण सेटिंग्स को परिभाषित करता है
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

अपने Express अनुप्रयोग को `express-intlayer` का उपयोग करने के लिए सेट करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
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

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
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

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
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

- `react-intlayer` के लिए React अनुप्रयोगों के लिए
- `next-intlayer` के लिए Next.js अनुप्रयोगों के लिए

यह विभिन्न वातावरणों में किसी भी अंतरराष्ट्रीयकरण समाधान के साथ सहजता से काम करता है, जिसमें ब्राउज़र और API अनुरोध शामिल हैं। आप हेडर या कुकीज़ के माध्यम से स्थान को पहचानने के लिए मध्यवर्ती को अनुकूलित कर सकते हैं:

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
// ... अन्य कॉन्फ़िगरेशन विकल्प
const config = {
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
// ... अन्य कॉन्फ़िगरेशन विकल्प
const config = {
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

डिफ़ॉल्ट रूप से, `express-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर को व्याख्या करेगा।

> अधिक जानकारी के लिए कॉन्फ़िगरेशन और उन्नत विषयों पर, हमारी [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) पर जाएँ।

## Powered by TypeScript

`express-intlayer` अंतरराष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की मजबूत क्षमताओं का लाभ उठाता है। TypeScript की स्थैतिक टाइपिंग यह सुनिश्चित करती है कि प्रत्येक अनुवाद कुंजी का ध्यान रखा गया है, अनुवादों की कमी के जोखिम को कम करती है और रखरखाव में सुधार करती है।

> सुनिश्चित करें कि उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपके tsconfig.json फ़ाइल में शामिल हैं।
