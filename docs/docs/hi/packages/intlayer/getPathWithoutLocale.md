---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getPathWithoutLocale फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getPathWithoutLocale फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getPathWithoutLocale
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getPathWithoutLocale` फ़ंक्शन `intlayer` में

## विवरण

दिए गए URL या पथनाम से स्थानीय खंड को हटा देता है यदि वह मौजूद हो। यह पूर्ण URLs और सापेक्ष पथनाम दोनों के साथ काम करता है।

## पैरामीटर

- `inputUrl: string`

  - **विवरण**: प्रक्रिया के लिए पूर्ण URL स्ट्रिंग या पथनाम।
  - **प्रकार**: `string`

- `locales: Locales[]`
  - **विवरण**: समर्थित स्थानीयताओं की वैकल्पिक सूची। प्रोजेक्ट में कॉन्फ़िगर की गई स्थानीयताओं को डिफ़ॉल्ट करता है।
  - **प्रकार**: `Locales[]`

## रिटर्न्स

- **प्रकार**: `string`
- **विवरण**: स्थानीय खंड के बिना URL स्ट्रिंग या पथनाम।

## उदाहरण उपयोग

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // आउटपुट: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // आउटपुट: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // आउटपुट: "https://example.com/dashboard"
```
