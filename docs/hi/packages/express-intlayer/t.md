# Documentation: `t` फ़ंक्शन in `express-intlayer`

`t` फ़ंक्शन in the `express-intlayer` पैकेज आपके Express एप्लिकेशन में स्थानीयकृत प्रतिक्रियाएँ प्रदान करने के लिए मुख्य उपकरण है। यह उपयोगकर्ता की पसंदीदा भाषा के आधार पर सामग्री का चयन करके अंतरराष्ट्रीयकरण (i18n) को सरल बनाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग एक दिए गए भाषाओं के सेट के लिए अनुवाद को परिभाषित और पुनर्प्राप्त करने के लिए किया जाता है। यह स्वचालित रूप से क्लाइंट के अनुरोध सेटिंग्स, जैसे `Accept-Language` हेडर के आधार पर उपयुक्त भाषा का निर्धारण करता है। यदि पसंदीदा भाषा उपलब्ध नहीं है, तो यह आपके कॉन्फ़िगरेशन में निर्दिष्ट डिफ़ॉल्ट लोकल में धीरे-धीरे वापस चला जाता है।

---

## मुख्य विशेषताएँ

- **डायनामिक स्थानीयकरण**: स्वचालित रूप से क्लाइंट के लिए सबसे उपयुक्त अनुवाद का चयन करता है।
- **डिफ़ॉल्ट लोकल पर वापस जाना**: यदि क्लाइंट की पसंदीदा भाषा उपलब्ध नहीं है, तो डिफ़ॉल्ट लोकल पर वापस जाता है, उपयोगकर्ता अनुभव में निरंतरता सुनिश्चित करता है।
- **हल्का और तेज़**: उच्च-प्रदर्शन अनुप्रयोगों के लिए डिज़ाइन किया गया, न्यूनतम ओवरहेड सुनिश्चित करता है।
- **कड़क मोड समर्थन**: विश्वसनीय व्यवहार के लिए घोषित लोकल के प्रति सख्त पालन को लागू करता है।

---

## फ़ंक्शन सिग्नेचर

```typescript
t(translations: Record<string, string>): string;
```

### पैरामीटर

- `translations`: एक वस्तु जहां कुंजी लोकल कोड (जैसे, `en`, `fr`, `es-MX`) होते हैं और मान संबंधित अनुवादित स्ट्रिंग होते हैं।

### लौटाता है

- एक स्ट्रिंग जो क्लाइंट की पसंदीदा भाषा में सामग्री का प्रतिनिधित्व करता है।

---

## अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करना

यह सुनिश्चित करने के लिए कि `express-intlayer` द्वारा प्रदान की गई अंतरराष्ट्रीयकरण कार्यक्षमता सही ढंग से काम करे, आपको अपने Express एप्लिकेशन के शुरूआत में अंतरराष्ट्रीयकरण मिडलवेयर को **लोड** करना **अनिवार्य** है। यह `t` फ़ंक्शन को सक्षम करता है और लोकल पहचान और अनुवाद के उचित प्रबंधन को सुनिश्चित करता है।

सुनिश्चित करने के लिए कि सभी रूट्स अंतरराष्ट्रीयकरण का लाभ उठाएँ, `app.use(intlayer())` मिडलवेयर को अपने एप्लिकेशन में किसी भी रूट से **पहले** रखें:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// मिडलवेयर लोड करने के बाद अपने रूट्स को परिभाषित करें
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

// मिडलवेयर लोड करने के बाद अपने रूट्स को परिभाषित करें
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

// मिडलवेयर लोड करने के बाद अपने रूट्स को परिभाषित करें
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

- **लोकल पहचान**: `intlayer` मिडलवेयर इनक्लेम करने वाले अनुरोधों को प्रोसेस करता है ताकि उपयोगकर्ता की पसंदीदा लोकल पहचान सके, जो हेडर, कुकीज़ या अन्य कॉन्फ़िगर किए गए तरीकों के आधार पर होती है।
- **अनुवाद संदर्भ**: `t` फ़ंक्शन को सही ढंग से काम करने के लिए आवश्यक संदर्भ तैयार करता है, यह सुनिश्चित करता है कि अनुवाद सही भाषा में लौटाए जाएँ।
- **त्रुटि रोकथाम**: बिना इस मिडलवेयर के, `t` फ़ंक्शन का उपयोग करने से रनटाइम त्रुटियाँ उत्पन्न होंगी क्योंकि आवश्यक लोकल जानकारी उपलब्ध नहीं होगी।

---

## उपयोग के उदाहरण

### बुनियादी उदाहरण

विभिन्न भाषाओं में स्थानीयकृत सामग्री प्रदान करें:

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

- `Accept-Language: fr` वाले क्लाइंट को `Bienvenue!` मिलेगा।
- `Accept-Language: es` वाले क्लाइंट को `¡Bienvenido!` मिलेगा।
- `Accept-Language: de` वाले क्लाइंट को `Welcome!` (डिफ़ॉल्ट लोकल) मिलेगा।

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

### बैकअप तंत्र

यदि कोई पसंदीदा लोकल उपलब्ध नहीं है, तो `t` फ़ंक्शन आपके कॉन्फ़िगरेशन में परिभाषित डिफ़ॉल्ट लोकल पर वापस जाएगा:

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

- यदि `defaultLocale` `Locales.CHINESE` है और एक क्लाइंट `Locales.DUTCH` का अनुरोध करता है, तो लौटाए गए अनुवाद `Locales.CHINESE` मूल्य पर वापस आएगा।
- यदि `defaultLocale` परिभाषित नहीं है, तो `t` फ़ंक्शन `Locales.ENGLISH` मूल्य पर वापस जाएगा।

---

### कड़क मोड प्रवर्तन

`t` फ़ंक्शन को घोषित लोकल के प्रति सख्त अनुपालन सुनिश्चित करने के लिए कॉन्फ़िगर करें:

| मोड             | व्यवहार                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `strict`        | सभी घोषित लोकल में अनुवाद प्रदान किए जाने चाहिए। गायब लोकल त्रुटियाँ उत्पन्न करेंगी।               |
| `required_only` | घोषित लोकल में अनुवाद होने चाहिए। गायब लोकल चेतावनियाँ उत्पन्न करती हैं लेकिन स्वीकार की जाती हैं। |
| `loose`         | कोई भी मौजूदा लोकल स्वीकार की जाती है, भले ही घोषित न हो।                                          |

कॉन्फ़िगरेशन उदाहरण:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... आपका मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपका मौजूदा अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // कड़क मोड लागू करें
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... आपका मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपका मौजूदा अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // कड़क मोड लागू करें
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... आपका मौजूदा कॉन्फ़िगरेशन
  internationalization: {
    // ... आपका मौजूदा अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन
    strictMode: "strict", // कड़क मोड लागू करें
  },
};

module.exports = config;
```

---

### TypeScript एकीकरण

`t` फ़ंक्शन का उपयोग करते समय TypeScript के साथ प्रकार-निशाचित होता है। एक प्रकार-निशाचित अनुवाद वस्तु को परिभाषित करें:

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

| समस्या                      | कारण                                     | समाधान                                                            |
| --------------------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| `t` फ़ंक्शन काम नहीं कर रहा | मिडलवेयर लोड नहीं किया गया               | सुनिश्चित करें कि `app.use(intlayer())` रूट से पहले जोड़ा गया है। |
| गायब अनुवाद त्रुटि          | सभी लोकल के बिना कड़क मोड सक्षम किया गया | सभी आवश्यक अनुवाद प्रदान करें।                                    |

---

## प्रभावी उपयोग के लिए सुझाव

1. **अनुवादों को केंद्रीकृत करें**: अनुवाद का प्रबंधन करने के लिए एक केंद्रीकृत मॉड्यूल या JSON फ़ाइलों का उपयोग करें ताकि रखरखाव में सुधार हो सके।
2. **अनुवादों की जांच करें**: सुनिश्चित करें कि हर भाषा वेरिएंट के पास एक संबंधित अनुवाद हो ताकि अनावश्यक रूप से बैकअप से बचा जा सके।
3. **फ्रंटएंड i18n के साथ संयोजन करें**: ऐप में उपयोगकर्ता अनुभव को सहज बनाने के लिए फ्रंटएंड अंतरराष्ट्रीयकरण के साथ समन्वय करें।
4. **प्रदर्शन का बेंचमार्क**: अनुवाद जोड़ने पर अपने ऐप के प्रतिक्रिया समय का परीक्षण करें ताकि न्यूनतम प्रभाव सुनिश्चित किया जा सके।

---

## निष्कर्ष

`t` फ़ंक्शन बैकएंड अंतरराष्ट्रीयकरण के लिए एक शक्तिशाली उपकरण है। इसका प्रभावी उपयोग करके, आप वैश्विक दर्शकों के लिए एक अधिक समावेशी और उपयोगकर्ता के अनुकूल एप्लिकेशन बना सकते हैं। उन्नत उपयोग और विस्तृत कॉन्फ़िगरेशन विकल्पों के लिए, [प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।
