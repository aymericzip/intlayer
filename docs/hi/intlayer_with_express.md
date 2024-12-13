# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer` एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) मिडलवेयर है जो Express अनुप्रयोगों के लिए डिज़ाइन किया गया है, ताकि आपके बैकएंड सेवाओं को वैश्विक रूप से उपयोगकर्ता की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएँ प्रदान करके सुगम बनाया जा सके।

## Why Internationalize Your Backend?

अपने बैकएंड को अंतर्राष्ट्रीयकरण करना वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए अनिवार्य है। यह आपके आवेदन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके application's की पहुँच को बढ़ाकर उसे विभिन्न भाषाई पृष्ठभूमियों से लोगों के लिए अधिक उपयोगी बनाती है।

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: जब एक त्रुटि होती है, तो उपयोगकर्ता की मातृ भाषा में संदेश दिखाना समझ को बेहतर बनाता है और निराशा को कम करता है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट या मोडलों में दिखाए जा सकते हैं।

- **Retrieving Multilingual Content**: उन अनुप्रयोगों के लिए जो डेटाबेस से सामग्री खींचते हैं, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में सेवा कर सकें। यह ई-कॉमर्स साइटों या सामग्री प्रबंध प्रणाली जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उपयोगकर्ता द्वारा पसंद की गई भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।

- **Sending Multilingual Emails**: चाहे वह लेनदेन संबंधी ईमेल हों, मार्केटिंग अभियान हों या नोटिफिकेशन, प्राप्तकर्ता की भाषा में ईमेल भेजना सहभागिता और प्रभावशीलता को उल्लेखनीय रूप से बढ़ा सकता है।

- **Multilingual Push Notifications**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश नोटिफिकेशन भेजना बातचीत और संरक्षण को बढ़ा सकता है। यह व्यक्तिगत स्पर्श नोटिफिकेशन को अधिक प्रासंगिक और क्रियान्वयन योग्य बना सकता है।

- **Other Communications**: बैकएंड से किसी भी प्रकार की संचार, जैसे SMS संदेश, प्रणाली अलर्ट या उपयोगकर्ता इंटरफ़ेस अद्यतन, उपयोगकर्ता की भाषा में होने से स्पष्टता बढ़ती है और समग्र उपयोगकर्ता अनुभव में सुधार होता है।

बैकएंड को अंतर्राष्ट्रीयकरण करके, आपका आवेदन न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तरीके से संरेखित होता है, जिससे यह आपके सेवाओं को वैश्विक स्तर पर स्केल करने के लिए एक महत्वपूर्ण कदम बनता है।

## Getting Started

### Installation

To begin using `express-intlayer`, पैकेज को npm का उपयोग करके इंस्टॉल करें:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Setup

अपने प्रोजेक्ट की रूट में `intlayer.config.ts` बनाकर अंतर्राष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

```typescript
// intlayer.config.ts
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

### Express Application Setup

अपने Express अनुप्रयोग को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript
// src/index.ts
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

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// सर्वर चालू करें
app.listen(3000, () => {
  console.info(`Listening on port 3000`);
});
```

### Compatibility

`express-intlayer` पूरी तरह से संगत है:

- `react-intlayer` React अनुप्रयोगों के लिए
- `next-intlayer` Next.js अनुप्रयोगों के लिए

यह विभिन्न वातावरणों में ब्राउज़रों और API अनुरोधों के साथ किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ सहजता से काम करता है। आप शीर्षकों या कुकीज़ के माध्यम से स्थानीय पहचान करने के लिए मिडलवेयर को अनुकूलित कर सकते हैं:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

डिफ़ॉल्ट रूप से, `express-intlayer` `Accept-Language` हेडर को क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए इंटरप्रेट करेगा।

> अधिक जानकारी और उन्नत विषयों के लिए, हमारी [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/concept/configuration.md) पर जाएँ।

## Powered by TypeScript

`express-intlayer` TypeScript की मजबूत क्षमताओं का लाभ उठाता है ताकि अंतर्राष्ट्रीयकरण प्रक्रिया को बढ़ाया जा सके। TypeScript की स्थैतिक टाइपिंग सुनिश्चित करती है कि हर अनुवाद कुंजी का حساب किया जाए, जिससे अनुवादों की कमी का जोखिम कम होता है और रखरखाव में सुधार होता है।

> सुनिश्चित करें कि उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपके tsconfig.json फ़ाइल में शामिल हैं।
