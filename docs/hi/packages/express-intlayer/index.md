# express-intlayer: JavaScript पैकेज जो एक Express.js एप्लिकेशन का अंतर्राष्ट्रीयकरण (i18n) करता है

**Intlayer** एक पैकेजों का सूट है जो विशेष रूप से JavaScript विकासकर्ताओं के लिए डिज़ाइन किया गया है। यह React, Next.js और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`express-intlayer` पैकेज** आपको अपने Express.js एप्लिकेशन का अंतर्राष्ट्रीयकरण करने की अनुमति देता है। यह उपयोगकर्ता की पसंदीदा स्थानीय भाषा का पता लगाने के लिए एक मिडलवेयर प्रदान करता है, और उपयोगकर्ता के लिए उपयुक्त शब्दकोश लौटाता है।

## अपने बैकएंड का अंतर्राष्ट्रीयकरण क्यों करें?

अपने बैकएंड का अंतर्राष्ट्रीयकरण एक वैश्विक दर्शक को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश देने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को विस्तारित करती है, जिससे यह विभिन्न भाषाई पृष्ठभूमियों के लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियों को प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मूल भाषा में संदेश प्रदर्शित करने से समझ में सुधार होता है और निराशा कम होती है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे तोस्ट या मोडल में प्रदर्शित हो सकते हैं।

- **बहु-भाषी सामग्री पुनः प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले एप्लिकेशनों के लिए, अंतर्राष्ट्रीयकरण सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में प्रदान कर सकें। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उत्पाद विवरण, लेख और उपयोगकर्ता द्वारा पसंद की गई भाषा में अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।

- **बहु-भाषी ईमेल भेजना**: चाहे वह लेनदेन संबंधित ईमेल, विपणन अभियान, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजना संलग्नता और प्रभावशीलता को काफी बढ़ा सकता है।

- **बहु-भाषी पुश सूचनाएं**: मोबाइल एप्लिकेशनों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजने से इंटरैक्शन और प्रतिधारण में सुधार हो सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को और अधिक प्रासंगिक और क्रियाशील बना सकता है।

- **अन्य संवाद**: बैकएंड से कोई भी संवाद, जैसे कि एसएमएस संदेश, सिस्टम चेतावनियाँ, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होना लाभकारी है, जिससे स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव को बढ़ाया जा सकता है।

बैकएंड का अंतर्राष्ट्रीयकरण करके, आपका एप्लिकेशन न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तरीके से संरेखित होता है, जिससे यह आपके सेवाओं को वैश्विक स्तर पर स्केल करने में एक महत्वपूर्ण कदम बनता है।

## Intlayer को एकीकृत करने का कारण?

- **टाइप-सुरक्षित वातावरण**: TypeScript का लाभ उठाएं ताकि आपकी सभी सामग्री परिभाषाएँ सटीक और त्रुटि रहित हों।

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

Intlayer आपके प्रोजेक्ट को सेटअप करने के लिए एक कॉन्फ़िगरेशन फ़ाइल प्रदान करता है। इस फ़ाइल को अपने प्रोजेक्ट के रूट में रखें।

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

> उपलब्ध पैरामीटरों की पूर्ण सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

## उपयोग का उदाहरण

अपने Express एप्लिकेशन को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट
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

// रूट
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

// रूट
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

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) React एप्लिकेशनों के लिए
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/next-intlayer/index.md) Next.js एप्लिकेशनों के लिए
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/vite-intlayer/index.md) Vite एप्लिकेशनों के लिए

यह विभिन्न वातावरणों, जैसे कि ब्राउज़रों और API अनुरोधों में विभिन्न अंतर्राष्ट्रीयकरण समाधानों के साथ सुचारु रूप से कार्य करता है। आप मिडलवेयर को हेडर या कुकीज़ के माध्यम से स्थानीय भाषा का पता लगाने के लिए अनुकूलित कर सकते हैं:

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

डिफ़ॉल्ट रूप से, `express-intlayer` ग्राहक की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर को व्याख्यायित करेगा।

## `express-intlayer` पैकेज द्वारा प्रदान की गई कार्यक्षमताएँ

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/express-intlayer/t.md)
