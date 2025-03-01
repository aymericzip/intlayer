# express-intlayer: Express.js एप्लिकेशन को अंतर्राष्ट्रीय बनाने के लिए JavaScript पैकेज

**Intlayer** विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, Next.js, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`express-intlayer` पैकेज** आपको अपने Express.js एप्लिकेशन को अंतर्राष्ट्रीय बनाने की अनुमति देता है। यह उपयोगकर्ता की पसंदीदा भाषा का पता लगाने के लिए एक मिडलवेयर प्रदान करता है और उपयोगकर्ता के लिए उपयुक्त शब्दकोश लौटाता है।

## अपने बैकएंड को अंतर्राष्ट्रीय क्यों बनाएं?

अपने बैकएंड को अंतर्राष्ट्रीय बनाना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपकी एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपकी एप्लिकेशन की पहुंच को व्यापक बनाती है, इसे विभिन्न भाषाई पृष्ठभूमियों के लोगों के लिए अधिक सुलभ और प्रासंगिक बनाती है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मूल भाषा में संदेश प्रदर्शित करना समझ को बेहतर बनाता है और निराशा को कम करता है। यह विशेष रूप से उन गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट्स या मोडल्स में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री पुनः प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में सेवा दे सकते हैं। यह ई-कॉमर्स साइट्स या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उपयोगकर्ता द्वारा पसंद की गई भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।

- **बहुभाषी ईमेल भेजना**: चाहे वह लेन-देन ईमेल हो, विपणन अभियान हो, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएं**: मोबाइल एप्लिकेशन के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजने से बातचीत और प्रतिधारण को बढ़ावा मिल सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।

- **अन्य संचार**: बैकएंड से किसी भी प्रकार का संचार, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव को बढ़ावा मिलता है।

बैकएंड को अंतर्राष्ट्रीय बनाकर, आपकी एप्लिकेशन न केवल सांस्कृतिक मतभेदों का सम्मान करती है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तालमेल बिठाती है, जिससे यह आपकी सेवाओं को विश्व स्तर पर स्केल करने में एक प्रमुख कदम बन जाता है।

## Intlayer को क्यों एकीकृत करें?

- **टाइप-सुरक्षित वातावरण**: TypeScript का उपयोग करके सुनिश्चित करें कि आपकी सभी सामग्री परिभाषाएं सटीक और त्रुटि-मुक्त हैं।

## इंस्टॉलेशन

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
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

> उपलब्ध पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

## उपयोग का उदाहरण

अपने Express एप्लिकेशन को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
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

// सर्वर शुरू करें
app.listen(3000, () => console.log(`पोर्ट 3000 पर सुन रहा है`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
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

// सर्वर शुरू करें
app.listen(3000, () => console.log(`पोर्ट 3000 पर सुन रहा है`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
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

// सर्वर शुरू करें
app.listen(3000, () => console.log(`पोर्ट 3000 पर सुन रहा है`));
```

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- React एप्लिकेशन के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md)
- Next.js एप्लिकेशन के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/index.md)
- Vite एप्लिकेशन के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/vite-intlayer/index.md)

यह विभिन्न वातावरणों में किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ सहजता से काम करता है, जिसमें ब्राउज़र और एपीआई अनुरोध शामिल हैं। आप हेडर या कुकीज़ के माध्यम से भाषा का पता लगाने के लिए मिडलवेयर को अनुकूलित कर सकते हैं:

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

## `express-intlayer` पैकेज द्वारा प्रदान किए गए फ़ंक्शन

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi-GB/packages/express-intlayer/t.md)
