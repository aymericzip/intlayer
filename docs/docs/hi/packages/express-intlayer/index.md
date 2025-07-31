---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: पैकेज दस्तावेज़ीकरण | express-intlayer
description: देखें कि express-intlayer पैकेज का उपयोग कैसे करें
keywords:
  - Intlayer
  - express-intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
---

# express-intlayer: Express.js एप्लिकेशन को अंतरराष्ट्रीयकृत (i18n) करने के लिए JavaScript पैकेज

**Intlayer** विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, Next.js, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`express-intlayer` पैकेज** आपको अपने Express.js एप्लिकेशन को अंतरराष्ट्रीयकृत करने की अनुमति देता है। यह उपयोगकर्ता की पसंदीदा भाषा (locale) का पता लगाने के लिए एक मिडलवेयर प्रदान करता है, और उपयोगकर्ता के लिए उपयुक्त शब्दकोश लौटाता है।

## अपने बैकएंड को अंतरराष्ट्रीयकृत क्यों करें?

अपने बैकएंड को अंतरराष्ट्रीयकृत करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियों को प्रदर्शित करना**: जब कोई त्रुटि होती है, तो संदेशों को उपयोगकर्ता की मातृभाषा में प्रदर्शित करने से समझ बेहतर होती है और निराशा कम होती है। यह विशेष रूप से उन गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट या मोडल में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: उन एप्लिकेशन के लिए जो डेटाबेस से सामग्री खींचते हैं, अंतरराष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में प्रदान कर सकें। यह उन प्लेटफार्मों के लिए महत्वपूर्ण है जैसे ई-कॉमर्स साइटें या सामग्री प्रबंधन प्रणाली, जिन्हें उपयोगकर्ता की पसंदीदा भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करनी होती है।

- **बहुभाषी ईमेल भेजना**: चाहे वह लेनदेन संबंधी ईमेल हों, विपणन अभियान हों, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएं**: मोबाइल एप्लिकेशन के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजना इंटरैक्शन और प्रतिधारण को बढ़ा सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और क्रियाशील महसूस कराता है।

- **अन्य संचार**: बैकएंड से किसी भी प्रकार का संचार, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव में सुधार होता है।

बैकएंड को अंतरराष्ट्रीयकृत करके, आपका एप्लिकेशन न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तालमेल भी स्थापित करता है, जिससे यह आपकी सेवाओं को विश्व स्तर पर स्केल करने में एक महत्वपूर्ण कदम बन जाता है।

## Intlayer को क्यों एकीकृत करें?

- **टाइप-सेफ वातावरण**: TypeScript का उपयोग करें ताकि आपकी सभी सामग्री परिभाषाएं सटीक और त्रुटि-मुक्त हों।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Intlayer कॉन्फ़िगर करें

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

> उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## उपयोग का उदाहरण

अपने Express एप्लिकेशन को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
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
      fr: "फ्रेंच में लौटाया गया सामग्री का उदाहरण",
      "es-ES": "स्पेनिश (स्पेन) में लौटाया गया सामग्री का उदाहरण",
      "es-MX": "स्पेनिश (मेक्सिको) में लौटाया गया सामग्री का उदाहरण",
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

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "फ्रेंच में लौटाया गया सामग्री का उदाहरण",
      "es-MX": "स्पेनिश (मेक्सिको) में लौटाया गया सामग्री का उदाहरण",
      "es-ES": "स्पेनिश (स्पेन) में लौटाया गया सामग्री का उदाहरण",
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

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "फ्रेंच में लौटाया गया सामग्री का उदाहरण",
      "es-MX": "स्पेनिश (मेक्सिको) में लौटाया गया सामग्री का उदाहरण",
      "es-ES": "स्पेनिश (स्पेन) में लौटाया गया सामग्री का उदाहरण",
    })
  );
});

// सर्वर शुरू करें
app.listen(3000, () => console.log(`पोर्ट 3000 पर सुन रहा है`));
```

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)

यह विभिन्न वातावरणों में किसी भी अंतरराष्ट्रीयकरण समाधान के साथ सहजता से काम करता है, जिसमें ब्राउज़र और API अनुरोध शामिल हैं। आप मिडलवेयर को हेडर या कुकीज़ के माध्यम से स्थानीय भाषा का पता लगाने के लिए अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header", // हेडर का नाम
    cookieName: "my-locale-cookie", // कुकी का नाम
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
    headerName: "my-locale-header", // हेडर का नाम
    cookieName: "my-locale-cookie", // कुकी का नाम
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
    headerName: "my-locale-header", // हेडर का नाम
    cookieName: "my-locale-cookie", // कुकी का नाम
  },
};

module.exports = config;
```

डिफ़ॉल्ट रूप से, `express-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

## `express-intlayer` पैकेज द्वारा प्रदान की गई फ़ंक्शन

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/express-intlayer/t.md)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
