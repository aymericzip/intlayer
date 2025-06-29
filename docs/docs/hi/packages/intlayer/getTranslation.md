---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getTranslation फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getTranslation फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getTranslation
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getTranslationContent` फ़ंक्शन `intlayer` में

## विवरण

`getTranslationContent` फ़ंक्शन एक सेट से एक विशिष्ट लोकेल के लिए सामग्री प्राप्त करता है जो अनुकूलन योग्य भाषा सामग्री है। यदि निर्दिष्ट लोकेल नहीं मिलता है, तो यह प्रोजेक्ट में कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकेल की सामग्री को लौटाता है।

## पैरामीटर

- `languageContent: CustomizableLanguageContent<Content>`

  - **विवरण**: एक ऑब्जेक्ट जिसमें विभिन्न लोकेल्स के लिए अनुवाद होते हैं। प्रत्येक कुंजी एक लोकेल का प्रतिनिधित्व करती है, और इसका मान संबंधित सामग्री है।
  - **प्रकार**: `CustomizableLanguageContent<Content>`
    - `Content` किसी भी प्रकार का हो सकता है, डिफ़ॉल्ट रूप से `string`।

- `locale: Locales`

  - **विवरण**: वह लोकेल जिसके लिए सामग्री प्राप्त की जानी है।
  - **प्रकार**: `Locales`

## रिटर्न्स

- **प्रकार**: `Content`
- **विवरण**: निर्दिष्ट लोकेल के लिए सामग्री। यदि लोकेल नहीं मिलता है, तो डिफ़ॉल्ट लोकेल की सामग्री लौटाई जाती है।

## उदाहरण उपयोग

### बुनियादी उपयोग

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    hi: "नमस्ते",
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
    hi: "नमस्ते",
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
    hi: "नमस्ते",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

### गायब लोकेल:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    hi: "नमस्ते",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकेल सामग्री)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    hi: "नमस्ते",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकेल सामग्री)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    hi: "नमस्ते",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकेल सामग्री)
```

### कस्टम सामग्री प्रकारों का उपयोग:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    hi: { greeting: "नमस्ते" },
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
    hi: { greeting: "नमस्ते" },
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
    hi: { greeting: "नमस्ते" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

## किनारे के मामले

- **लोकेल नहीं मिला:**
  - जब `locale` `languageContent` में नहीं मिलता है, तो फ़ंक्शन डिफ़ॉल्ट लोकेल की सामग्री लौटाता है।
- **अधूरी भाषा सामग्री:**
  - यदि कोई लोकेल आंशिक रूप से परिभाषित है, तो फ़ंक्शन सामग्री को मर्ज नहीं करता है। यह निर्दिष्ट लोकेल का मान सख्ती से प्राप्त करता है या डिफ़ॉल्ट पर वापस आ जाता है।
- **टाइपस्क्रिप्ट प्रवर्तन:**
  - यदि `languageContent` में लोकेल्स प्रोजेक्ट कॉन्फ़िगरेशन से मेल नहीं खाते हैं, तो टाइपस्क्रिप्ट सभी आवश्यक लोकेल्स को परिभाषित करने के लिए मजबूर करेगा, जिससे सामग्री पूरी और प्रकार-सुरक्षित हो।
