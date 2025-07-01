---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getTranslation फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getTranslation फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getTranslation
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़ीकरण: `intlayer` में `getTranslationContent` फ़ंक्शन

## विवरण

`getTranslationContent` फ़ंक्शन एक सेट से एक विशिष्ट लोकल के अनुरूप सामग्री प्राप्त करता है जिसे अनुकूलित भाषा सामग्री कहा जाता है। यदि निर्दिष्ट लोकल नहीं मिलता है, तो यह परियोजना में कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल की सामग्री लौटाता है।

## पैरामीटर

- `languageContent: CustomizableLanguageContent<Content>`

  - **विवरण**: विभिन्न लोकलों के लिए अनुवादों वाला एक ऑब्जेक्ट। प्रत्येक कुंजी एक लोकल का प्रतिनिधित्व करती है, और इसका मान संबंधित सामग्री होती है।
  - **प्रकार**: `CustomizableLanguageContent<Content>`
    - `Content` किसी भी प्रकार का हो सकता है, डिफ़ॉल्ट रूप से `string`।

- `locale: Locales`

  - **विवरण**: वह लोकल जिसके लिए सामग्री प्राप्त करनी है।
  - **प्रकार**: `Locales`

## रिटर्न

- **प्रकार**: `Content`
- **विवरण**: निर्दिष्ट लोकल के अनुरूप सामग्री। यदि लोकल नहीं मिलता है, तो डिफ़ॉल्ट लोकल की सामग्री लौटाई जाती है।

## उदाहरण उपयोग

### बुनियादी उपयोग

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

### गायब लोकल:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकल सामग्री)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकल सामग्री)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकल सामग्री)
```

### कस्टम कंटेंट प्रकारों का उपयोग:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

## एज केस

- **लोकल नहीं मिला:**
  - जब `locale` `languageContent` में नहीं मिलता है, तो फ़ंक्शन डिफ़ॉल्ट लोकल के लिए सामग्री लौटाता है।
- **अधूरी भाषा सामग्री:**
  - यदि कोई लोकल आंशिक रूप से परिभाषित है, तो फ़ंक्शन सामग्री को मर्ज नहीं करता है। यह सख्ती से निर्दिष्ट लोकल का मान प्राप्त करता है या डिफ़ॉल्ट पर वापस चला जाता है।
- **TypeScript प्रवर्तन:**
  - यदि `languageContent` में लोकल प्रोजेक्ट कॉन्फ़िगरेशन से मेल नहीं खाते हैं, तो TypeScript सभी आवश्यक लोकल को परिभाषित करने के लिए प्रवर्तन करेगा, जिससे सामग्री पूरी और टाइप-सुरक्षित होगी।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
