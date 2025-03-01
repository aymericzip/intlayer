# दस्तावेज़: `t` फ़ंक्शन `express-intlayer` में

`express-intlayer` पैकेज में `t` फ़ंक्शन आपके Express एप्लिकेशन में स्थानीयकृत प्रतिक्रियाएं प्रदान करने के लिए मुख्य उपयोगिता है। यह उपयोगकर्ता की पसंदीदा भाषा के आधार पर सामग्री का चयन करके अंतर्राष्ट्रीयकरण (i18n) को सरल बनाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग भाषाओं के एक दिए गए सेट के लिए अनुवादों को परिभाषित और पुनः प्राप्त करने के लिए किया जाता है। यह स्वचालित रूप से क्लाइंट के अनुरोध सेटिंग्स, जैसे कि `Accept-Language` हेडर के आधार पर उपयुक्त भाषा का निर्धारण करता है। यदि पसंदीदा भाषा अनुपलब्ध है, तो यह आपकी कॉन्फ़िगरेशन में निर्दिष्ट डिफ़ॉल्ट लोकेल पर वापस चला जाता है।

---

## मुख्य विशेषताएं

- **डायनामिक स्थानीयकरण**: क्लाइंट के लिए सबसे उपयुक्त अनुवाद स्वचालित रूप से चुनता है।
- **डिफ़ॉल्ट लोकेल पर फॉलबैक**: यदि क्लाइंट की पसंदीदा भाषा उपलब्ध नहीं है, तो डिफ़ॉल्ट लोकेल पर वापस चला जाता है, जिससे उपयोगकर्ता अनुभव में निरंतरता बनी रहती है।
- **हल्का और तेज़**: उच्च-प्रदर्शन एप्लिकेशन के लिए डिज़ाइन किया गया, न्यूनतम ओवरहेड सुनिश्चित करता है।
- **सख्त मोड समर्थन**: विश्वसनीय व्यवहार के लिए घोषित लोकेल का सख्ती से पालन लागू करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t(translations: Record<string, string>): string;
```

### पैरामीटर

- `translations`: एक ऑब्जेक्ट जहां कुंजियाँ लोकेल कोड (जैसे, `en`, `fr`, `es-MX`) हैं और मान संबंधित अनुवादित स्ट्रिंग्स हैं।

### रिटर्न करता है

- एक स्ट्रिंग जो क्लाइंट की पसंदीदा भाषा में सामग्री का प्रतिनिधित्व करती है।

---

## अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करना

सुनिश्चित करने के लिए कि `express-intlayer` द्वारा प्रदान की गई अंतर्राष्ट्रीयकरण कार्यक्षमता सही ढंग से काम करती है, आपको **अपने Express एप्लिकेशन की शुरुआत में** अंतर्राष्ट्रीयकरण मिडलवेयर लोड करना चाहिए। यह `t` फ़ंक्शन को सक्षम करता है और लोकेल डिटेक्शन और अनुवाद को सही ढंग से संभालता है।

`app.use(intlayer())` मिडलवेयर को **किसी भी रूट से पहले** रखें ताकि सभी रूट्स को अंतर्राष्ट्रीयकरण का लाभ मिल सके:

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
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      hi: "नमस्ते, दुनिया!",
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
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      hi: "नमस्ते, दुनिया!",
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
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      hi: "नमस्ते, दुनिया!",
    })
  );
});
```

### यह क्यों आवश्यक है

- **लोकेल डिटेक्शन**: `intlayer` मिडलवेयर इनकमिंग अनुरोधों को प्रोसेस करता है ताकि हेडर, कुकीज़, या अन्य कॉन्फ़िगर किए गए तरीकों के आधार पर उपयोगकर्ता की पसंदीदा लोकेल का पता लगाया जा सके।
- **अनुवाद संदर्भ**: `t` फ़ंक्शन को सही ढंग से संचालित करने के लिए आवश्यक संदर्भ सेट करता है, यह सुनिश्चित करता है कि अनुवाद सही भाषा में लौटाए जाएं।
- **त्रुटि निवारण**: इस मिडलवेयर के बिना, `t` फ़ंक्शन का उपयोग करने से रनटाइम त्रुटियां होंगी क्योंकि आवश्यक लोकेल जानकारी उपलब्ध नहीं होगी।

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
      hi: "स्वागत है!",
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
      hi: "स्वागत है!",
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
      hi: "स्वागत है!",
    })
  );
});
```

**क्लाइंट अनुरोध:**

- `Accept-Language: fr` वाला क्लाइंट `Bienvenue!` प्राप्त करेगा।
- `Accept-Language: es` वाला क्लाइंट `¡Bienvenido!` प्राप्त करेगा।
- `Accept-Language: de` वाला क्लाइंट `Welcome!` (डिफ़ॉल्ट लोकेल) प्राप्त करेगा।

### त्रुटियों को संभालना

कई भाषाओं में त्रुटि संदेश प्रदान करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
      hi: "एक अप्रत्याशित त्रुटि हुई।",
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
      hi: "एक अप्रत्याशित त्रुटि हुई।",
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
      hi: "एक अप्रत्याशित त्रुटि हुई।",
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
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
      hi: "नमस्ते!",
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
      hi: "नमस्ते!",
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
      hi: "नमस्ते!",
    })
  );
});
```

---

## निष्कर्ष

`t` फ़ंक्शन बैकएंड अंतर्राष्ट्रीयकरण के लिए एक शक्तिशाली उपकरण है। इसका प्रभावी ढंग से उपयोग करके, आप एक अधिक समावेशी और उपयोगकर्ता-अनुकूल एप्लिकेशन बना सकते हैं जो वैश्विक दर्शकों के लिए उपयुक्त हो। उन्नत उपयोग और विस्तृत कॉन्फ़िगरेशन विकल्पों के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।
