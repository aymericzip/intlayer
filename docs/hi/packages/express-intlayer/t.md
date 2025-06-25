---
docName: package__express-intlayer__t
url: /doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: t फ़ंक्शन दस्तावेज़ | express-intlayer
description: express-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - एक्सप्रेस
  - जावास्क्रिप्ट
  - रिएक्ट
---

# दस्तावेज़: `t` फ़ंक्शन `express-intlayer` में

`express-intlayer` पैकेज में `t` फ़ंक्शन आपके Express एप्लिकेशन में स्थानीयकृत प्रतिक्रियाएँ प्रदान करने के लिए मुख्य उपयोगिता है। यह उपयोगकर्ता की प्राथमिक भाषा के आधार पर सामग्री को गतिशील रूप से चुनकर अंतर्राष्ट्रीयकरण (i18n) को सरल बनाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग भाषाओं के एक दिए गए सेट के लिए अनुवादों को परिभाषित और पुनः प्राप्त करने के लिए किया जाता है। यह क्लाइंट के अनुरोध सेटिंग्स, जैसे `Accept-Language` हेडर, के आधार पर स्वचालित रूप से उपयुक्त भाषा का निर्धारण करता है। यदि प्राथमिक भाषा अनुपलब्ध है, तो यह आपके कॉन्फ़िगरेशन में निर्दिष्ट डिफ़ॉल्ट लोकेल पर वापस चला जाता है।

---

## मुख्य विशेषताएँ

- **गतिशील स्थानीयकरण**: क्लाइंट के लिए सबसे उपयुक्त अनुवाद स्वचालित रूप से चुनता है।
- **डिफ़ॉल्ट लोकेल पर वापस जाएं**: यदि क्लाइंट की प्राथमिक भाषा उपलब्ध नहीं है, तो डिफ़ॉल्ट लोकेल पर वापस चला जाता है, जिससे उपयोगकर्ता अनुभव में निरंतरता बनी रहती है।
- **हल्का और तेज़**: उच्च-प्रदर्शन एप्लिकेशन के लिए डिज़ाइन किया गया, न्यूनतम ओवरहेड सुनिश्चित करता है।
- **सख्त मोड समर्थन**: विश्वसनीय व्यवहार के लिए घोषित लोकेल का सख्ती से पालन करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t(translations: Record<string, string>): string;
```

### पैरामीटर

- `translations`: एक ऑब्जेक्ट जिसमें कुंजियाँ लोकेल कोड (जैसे, `en`, `fr`, `es-MX`) हैं और मान संबंधित अनुवादित स्ट्रिंग्स हैं।

### रिटर्न्स

- एक स्ट्रिंग जो क्लाइंट की प्राथमिक भाषा में सामग्री का प्रतिनिधित्व करती है।

---

## अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करना

सुनिश्चित करने के लिए कि `express-intlayer` द्वारा प्रदान की गई अंतर्राष्ट्रीयकरण कार्यक्षमता सही ढंग से काम करती है, आपको अपने Express एप्लिकेशन की शुरुआत में अंतर्राष्ट्रीयकरण मिडलवेयर लोड करना **चाहिए**। यह `t` फ़ंक्शन को सक्षम करता है और लोकेल डिटेक्शन और अनुवाद को सही ढंग से संभालता है।

अपने एप्लिकेशन में किसी भी रूट से पहले `app.use(intlayer())` मिडलवेयर रखें ताकि सभी रूट्स को अंतर्राष्ट्रीयकरण का लाभ मिल सके:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स को परिभाषित करें
app.get("/", (_req, res) => {
  res.send(
    t({
      hi: "नमस्ते, दुनिया!",
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

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स को परिभाषित करें
app.get("/", (_req, res) => {
  res.send(
    t({
      hi: "नमस्ते, दुनिया!",
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

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स को परिभाषित करें
app.get("/", (_req, res) => {
  res.send(
    t({
      hi: "नमस्ते, दुनिया!",
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### यह क्यों आवश्यक है

- **लोकेल डिटेक्शन**: `intlayer` मिडलवेयर इनकमिंग अनुरोधों को प्रोसेस करता है ताकि उपयोगकर्ता की प्राथमिक लोकेल का पता लगाया जा सके, हेडर, कुकीज़, या अन्य कॉन्फ़िगर की गई विधियों के आधार पर।
- **अनुवाद संदर्भ**: `t` फ़ंक्शन के सही संचालन के लिए आवश्यक संदर्भ सेट करता है, यह सुनिश्चित करता है कि अनुवाद सही भाषा में लौटाए जाएं।
- **त्रुटि रोकथाम**: इस मिडलवेयर के बिना, `t` फ़ंक्शन का उपयोग करने पर रनटाइम त्रुटियाँ होंगी क्योंकि आवश्यक लोकेल जानकारी उपलब्ध नहीं होगी।

---

## उपयोग के उदाहरण

### बेसिक उदाहरण

विभिन्न भाषाओं में स्थानीयकृत सामग्री प्रदान करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      hi: "स्वागत है!",
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
      hi: "स्वागत है!",
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
      hi: "स्वागत है!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**क्लाइंट अनुरोध:**

- `Accept-Language: fr` के साथ क्लाइंट को `Bienvenue!` प्राप्त होगा।
- `Accept-Language: es` के साथ क्लाइंट को `¡Bienvenido!` प्राप्त होगा।
- `Accept-Language: de` के साथ क्लाइंट को `Welcome!` (डिफ़ॉल्ट लोकेल) प्राप्त होगा।

### त्रुटियों को संभालना

कई भाषाओं में त्रुटि संदेश प्रदान करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      hi: "एक अप्रत्याशित त्रुटि हुई।",
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
      hi: "एक अप्रत्याशित त्रुटि हुई।",
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
      hi: "एक अप्रत्याशित त्रुटि हुई।",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### लोकेल वेरिएंट्स का उपयोग करना

लोकेल-विशिष्ट वेरिएंट्स के लिए अनुवाद निर्दिष्ट करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      hi: "नमस्ते!",
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
      hi: "नमस्ते!",
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
      hi: "नमस्ते!",
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

यदि प्राथमिक लोकेल अनुपलब्ध है, तो `t` फ़ंक्शन कॉन्फ़िगरेशन में परिभाषित डिफ़ॉल्ट लोकेल पर वापस चला जाएगा:

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

- यदि `defaultLocale` `Locales.CHINESE` है और एक क्लाइंट `Locales.DUTCH` का अनुरोध करता है, तो लौटाया गया अनुवाद `Locales.CHINESE` मान पर डिफ़ॉल्ट होगा।

---

---

### सख्त मोड प्रवर्तन

घोषित लोकल्स के लिए सख्त अनुपालन लागू करने के लिए `t` फ़ंक्शन को कॉन्फ़िगर करें:

| मोड         | व्यवहार                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------ |
| `strict`    | सभी घोषित लोकल्स के लिए अनुवाद प्रदान करना आवश्यक है। गायब लोकल्स त्रुटियां उत्पन्न करेंगे।      |
| `inclusive` | घोषित लोकल्स के लिए अनुवाद आवश्यक है। गायब लोकल्स चेतावनियां उत्पन्न करेंगे लेकिन स्वीकार्य हैं। |
| `loose`     | कोई भी मौजूदा लोकल स्वीकार्य है, भले ही वह घोषित न हो।                                           |

कॉन्फ़िगरेशन उदाहरण:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... आपकी मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपकी मौजूदा अंतर्राष्ट्रीयकरण कॉन्फ़िगरेशन
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
    // ... आपकी मौजूदा अंतर्राष्ट्रीयकरण कॉन्फ़िगरेशन
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
    // ... आपकी मौजूदा अंतर्राष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // सख्त मोड लागू करें
  },
};

module.exports = config;
```

---

### TypeScript एकीकरण

TypeScript के साथ उपयोग किए जाने पर `t` फ़ंक्शन टाइप-सुरक्षित है। एक टाइप-सुरक्षित अनुवाद ऑब्जेक्ट परिभाषित करें:

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

### सामान्य त्रुटियां और समस्या निवारण

| समस्या                      | कारण                                        | समाधान                                                              |
| --------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| `t` फ़ंक्शन काम नहीं कर रहा | मिडलवेयर लोड नहीं हुआ                       | सुनिश्चित करें कि `app.use(intlayer())` रूट्स से पहले जोड़ा गया है। |
| गायब अनुवाद त्रुटि          | सख्त मोड सक्षम है लेकिन सभी लोकल्स नहीं हैं | सभी आवश्यक अनुवाद प्रदान करें।                                      |

---

## प्रभावी उपयोग के लिए सुझाव

1. **अनुवाद केंद्रीकृत करें**: अनुवाद प्रबंधन को बेहतर बनाने के लिए एक केंद्रीकृत मॉड्यूल या JSON फ़ाइलों का उपयोग करें।
2. **अनुवाद सत्यापित करें**: सुनिश्चित करें कि प्रत्येक भाषा संस्करण का एक संबंधित अनुवाद है ताकि अनावश्यक रूप से बैकअप पर न जाए।
3. **फ्रंटएंड i18n के साथ संयोजन करें**: ऐप में एक सहज उपयोगकर्ता अनुभव के लिए फ्रंटएंड अंतर्राष्ट्रीयकरण के साथ सिंक्रनाइज़ करें।
4. **प्रदर्शन का परीक्षण करें**: अनुवाद जोड़ते समय ऐप की प्रतिक्रिया समय का परीक्षण करें ताकि न्यूनतम प्रभाव सुनिश्चित हो।

---

## निष्कर्ष

`t` फ़ंक्शन बैकएंड अंतर्राष्ट्रीयकरण के लिए एक शक्तिशाली उपकरण है। इसे प्रभावी ढंग से उपयोग करके, आप एक अधिक समावेशी और उपयोगकर्ता-अनुकूल एप्लिकेशन बना सकते हैं जो वैश्विक दर्शकों के लिए उपयुक्त हो। उन्नत उपयोग और विस्तृत कॉन्फ़िगरेशन विकल्पों के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।
