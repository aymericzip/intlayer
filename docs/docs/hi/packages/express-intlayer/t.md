---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t फ़ंक्शन दस्तावेज़ीकरण | express-intlayer
description: express-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
---

# दस्तावेज़ीकरण: `express-intlayer` में `t` फ़ंक्शन

`express-intlayer` पैकेज में `t` फ़ंक्शन आपके Express एप्लिकेशन में स्थानीयकृत प्रतिक्रियाएँ प्रदान करने के लिए मुख्य उपयोगिता है। यह उपयोगकर्ता की पसंदीदा भाषा के आधार पर सामग्री को गतिशील रूप से चयनित करके अंतरराष्ट्रीयकरण (i18n) को सरल बनाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग एक निर्दिष्ट भाषाओं के सेट के लिए अनुवादों को परिभाषित करने और पुनः प्राप्त करने के लिए किया जाता है। यह स्वचालित रूप से क्लाइंट के अनुरोध सेटिंग्स, जैसे कि `Accept-Language` हेडर के आधार पर उपयुक्त भाषा निर्धारित करता है। यदि पसंदीदा भाषा उपलब्ध नहीं है, तो यह आपके कॉन्फ़िगरेशन में निर्दिष्ट डिफ़ॉल्ट लोकल पर सहजता से वापस चला जाता है।

---

## मुख्य विशेषताएँ

- **गतिशील स्थानीयकरण**: क्लाइंट के लिए सबसे उपयुक्त अनुवाद को स्वचालित रूप से चयनित करता है।
- **डिफ़ॉल्ट लोकल पर वापस जाना**: यदि क्लाइंट की पसंदीदा भाषा उपलब्ध नहीं है, तो यह डिफ़ॉल्ट लोकल पर वापस चला जाता है, जिससे उपयोगकर्ता अनुभव में निरंतरता बनी रहती है।
- **हल्का और तेज़**: उच्च प्रदर्शन वाले अनुप्रयोगों के लिए डिज़ाइन किया गया, जो न्यूनतम ओवरहेड सुनिश्चित करता है।
- **सख्त मोड समर्थन**: विश्वसनीय व्यवहार के लिए घोषित लोकलों का सख्ती से पालन लागू करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t(translations: Record<string, string>): string;
```

### पैरामीटर

- `translations`: एक ऑब्जेक्ट जिसमें कुंजी लोकल कोड होते हैं (जैसे, `en`, `fr`, `es-MX`) और मान संबंधित अनुवादित स्ट्रिंग्स होते हैं।

### रिटर्न करता है

- एक स्ट्रिंग जो क्लाइंट की पसंदीदा भाषा में सामग्री का प्रतिनिधित्व करती है।

---

## अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करना

`express-intlayer` द्वारा प्रदान की गई अंतरराष्ट्रीयकरण कार्यक्षमता को सही ढंग से काम करने के लिए, आपको अपने Express एप्लिकेशन की शुरुआत में अंतरराष्ट्रीयकरण मिडलवेयर को **ज़रूर** लोड करना चाहिए। यह `t` फ़ंक्शन को सक्षम बनाता है और लोकल डिटेक्शन और अनुवाद के सही हैंडलिंग को सुनिश्चित करता है।

अपने एप्लिकेशन में किसी भी रूट से पहले `app.use(intlayer())` मिडलवेयर को रखें ताकि सभी रूट्स अंतरराष्ट्रीयकरण का लाभ उठा सकें:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स परिभाषित करें
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स परिभाषित करें
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स परिभाषित करें
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### यह क्यों आवश्यक है

- **लोकल डिटेक्शन**: `intlayer` मिडलवेयर आने वाले अनुरोधों को संसाधित करता है ताकि हेडर, कुकीज़, या अन्य कॉन्फ़िगर किए गए तरीकों के आधार पर उपयोगकर्ता की पसंदीदा लोकल का पता लगाया जा सके।
- **अनुवाद संदर्भ**: `t` फ़ंक्शन को सही तरीके से काम करने के लिए आवश्यक संदर्भ सेट करता है, जिससे अनुवाद सही भाषा में लौटाए जाते हैं।
- **त्रुटि रोकथाम**: इस मिडलवेयर के बिना, `t` फ़ंक्शन का उपयोग रनटाइम त्रुटियों का कारण बनेगा क्योंकि आवश्यक लोकल जानकारी उपलब्ध नहीं होगी।

---

## उपयोग उदाहरण

### बुनियादी उदाहरण

विभिन्न भाषाओं में स्थानीयकृत सामग्री परोसें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**क्लाइंट अनुरोध:**

- `Accept-Language: fr` वाले क्लाइंट को `Bienvenue!` प्राप्त होगा।
- `Accept-Language: es` वाले क्लाइंट को `¡Bienvenido!` प्राप्त होगा।
- `Accept-Language: de` वाले क्लाइंट को `Welcome!` (डिफ़ॉल्ट लोकल) प्राप्त होगा।

### त्रुटियों को संभालना

कई भाषाओं में त्रुटि संदेश प्रदान करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### लोकल वेरिएंट्स का उपयोग करना

लोकल-विशिष्ट वेरिएंट्स के लिए अनुवाद निर्दिष्ट करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## उन्नत विषय

### फॉलबैक तंत्र

यदि पसंदीदा लोकल उपलब्ध नहीं है, तो `t` फ़ंक्शन कॉन्फ़िगरेशन में परिभाषित डिफ़ॉल्ट लोकल पर फॉलबैक करेगा:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
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

उदाहरण के लिए:

- यदि `defaultLocale` `Locales.CHINESE` है और कोई क्लाइंट `Locales.DUTCH` का अनुरोध करता है, तो लौटाई गई अनुवादित सामग्री डिफ़ॉल्ट रूप से `Locales.CHINESE` मान होगी।
- यदि `defaultLocale` परिभाषित नहीं है, तो `t` फ़ंक्शन `Locales.ENGLISH` मान पर वापस लौटेगा।

---

### सख्त मोड प्रवर्तन

घोषित स्थानीयताओं के कड़ाई से पालन के लिए `t` फ़ंक्शन को कॉन्फ़िगर करें:

| मोड         | व्यवहार                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `strict`    | सभी घोषित स्थानीयताओं के लिए अनुवाद प्रदान करना आवश्यक है। गायब स्थानीयताएँ त्रुटियाँ उत्पन्न करेंगी।           |
| `inclusive` | घोषित स्थानीयताओं के लिए अनुवाद होना आवश्यक है। गायब स्थानीयताएँ चेतावनियाँ उत्पन्न करेंगी लेकिन स्वीकार्य हैं। |
| `loose`     | कोई भी मौजूदा स्थानीयता स्वीकार्य है, भले ही वह घोषित न हो।                                                     |

कॉन्फ़िगरेशन उदाहरण:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... आपकी मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपकी मौजूदा अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // सख्त मोड लागू करें
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... आपकी मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपकी मौजूदा अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // सख्त मोड लागू करें
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... आपकी मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपकी मौजूदा अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // सख्त मोड लागू करें
  },
};

module.exports = config;
```

---

### टाइपस्क्रिप्ट एकीकरण

जब टाइपस्क्रिप्ट के साथ `t` फ़ंक्शन का उपयोग किया जाता है, तो यह टाइप-सुरक्षित होता है। एक टाइप-सुरक्षित अनुवाद ऑब्जेक्ट परिभाषित करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### सामान्य त्रुटियाँ और समस्या निवारण

| समस्या                      | कारण                                 | समाधान                                                              |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| `t` फ़ंक्शन काम नहीं कर रहा | मिडलवेयर लोड नहीं हुआ                | सुनिश्चित करें कि `app.use(intlayer())` रूट्स से पहले जोड़ा गया है। |
| अनुवाद गायब त्रुटि          | सभी भाषाओं के बिना सख्त मोड सक्षम है | सभी आवश्यक अनुवाद प्रदान करें।                                      |

---

## प्रभावी उपयोग के लिए सुझाव

1. **अनुवादों को केंद्रीकृत करें**: रखरखाव में सुधार के लिए अनुवादों का प्रबंधन करने के लिए एक केंद्रीकृत मॉड्यूल या JSON फ़ाइलों का उपयोग करें।
2. **अनुवादों को सत्यापित करें**: सुनिश्चित करें कि प्रत्येक भाषा संस्करण के लिए एक संबंधित अनुवाद मौजूद हो ताकि अनावश्यक रूप से फॉल बैक न हो।
3. **फ्रंटेंड i18n के साथ संयोजन करें**: ऐप में एक सहज उपयोगकर्ता अनुभव के लिए फ्रंटेंड अंतरराष्ट्रीयकरण के साथ सिंक्रनाइज़ करें।
4. **प्रदर्शन का बेंचमार्क करें**: अनुवाद जोड़ते समय अपने ऐप के प्रतिक्रिया समय का परीक्षण करें ताकि न्यूनतम प्रभाव सुनिश्चित किया जा सके।

---

## निष्कर्ष

`t` फ़ंक्शन बैकएंड अंतरराष्ट्रीयकरण के लिए एक शक्तिशाली उपकरण है। इसे प्रभावी ढंग से उपयोग करके, आप एक अधिक समावेशी और उपयोगकर्ता-अनुकूल एप्लिकेशन बना सकते हैं जो वैश्विक दर्शकों के लिए उपयुक्त हो। उन्नत उपयोग और विस्तृत कॉन्फ़िगरेशन विकल्पों के लिए, कृपया [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
