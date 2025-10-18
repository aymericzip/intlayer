---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: getTranslation फ़ंक्शन - Intlayer जावास्क्रिप्ट दस्तावेज़ीकरण
description: Intlayer में getTranslation फ़ंक्शन के लिए दस्तावेज़ीकरण, जो विशिष्ट लोकल के लिए स्थानीयकृत सामग्री प्राप्त करता है और डिफ़ॉल्ट लोकल पर वापस लौटता है।
keywords:
  - getTranslation
  - intlayer
  - फ़ंक्शन
  - स्थानीयकरण
  - i18n
  - जावास्क्रिप्ट
  - अनुवाद
  - लोकल
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# दस्तावेज़ीकरण: `intlayer` में `getTranslation` फ़ंक्शन

## विवरण

`getTranslation` फ़ंक्शन एक सेट से किसी विशिष्ट लोकल के अनुरूप सामग्री प्राप्त करता है जो अनुकूलन योग्य भाषा सामग्री होती है। यदि निर्दिष्ट लोकल नहीं मिलता है, तो यह परियोजना में कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल की सामग्री लौटाता है।

## पैरामीटर

- `languageContent: CustomizableLanguageContent<Content>`

  - **विवरण**: एक ऑब्जेक्ट जिसमें विभिन्न लोकलों के लिए अनुवाद होते हैं। प्रत्येक कुंजी एक लोकल का प्रतिनिधित्व करती है, और इसका मान संबंधित सामग्री होती है।
  - **प्रकार**: `CustomizableLanguageContent<Content>`
    - `Content` किसी भी प्रकार का हो सकता है, जिसका डिफ़ॉल्ट `string` है।

- `locale: Locales`

  - **विवरण**: वह लोकल जिसके लिए सामग्री प्राप्त करनी है।
  - **प्रकार**: `Locales`

## रिटर्न

- **प्रकार**: `Content`
- **विवरण**: निर्दिष्ट लोकल के अनुरूप सामग्री। यदि लोकल नहीं मिलता है, तो डिफ़ॉल्ट लोकल की सामग्री लौटाई जाती है।

## उदाहरण उपयोग

### बुनियादी उपयोग

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

### गायब लोकल:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकल सामग्री)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट लोकल सामग्री)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
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
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
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
  - यदि कोई लोकल आंशिक रूप से परिभाषित है, तो फ़ंक्शन सामग्री को मर्ज नहीं करता है। यह सख्ती से निर्दिष्ट लोकल का मान प्राप्त करता है या डिफ़ॉल्ट पर वापस जाता है।
- **टाइपस्क्रिप्ट प्रवर्तन:**
  - यदि `languageContent` में लोकल परियोजना कॉन्फ़िगरेशन से मेल नहीं खाते हैं, तो टाइपस्क्रिप्ट सभी आवश्यक लोकल को परिभाषित करने के लिए प्रवर्तन करेगा, जिससे सामग्री पूरी और प्रकार-सुरक्षित होगी।
