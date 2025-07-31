---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getPathWithoutLocale फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getPathWithoutLocale फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getPathWithoutLocale
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
---

# दस्तावेज़ीकरण: `getPathWithoutLocale` फ़ंक्शन `intlayer` में

## विवरण

यदि मौजूद हो तो दिए गए URL या पाथनेम से लोकल सेगमेंट को हटा देता है। यह पूर्ण URL और सापेक्ष पाथनेम दोनों के साथ काम करता है।

## पैरामीटर

- `inputUrl: string`

  - **विवरण**: संसाधित करने के लिए पूर्ण URL स्ट्रिंग या पाथनेम।
  - **प्रकार**: `string`

- `locales: Locales[]`
  - **विवरण**: समर्थित लोकल्स की वैकल्पिक सूची। डिफ़ॉल्ट रूप से परियोजना में कॉन्फ़िगर किए गए लोकल्स।
  - **प्रकार**: `Locales[]`

## रिटर्न करता है

- **प्रकार**: `string`
- **विवरण**: लोकल सेगमेंट के बिना URL स्ट्रिंग या पाथनेम।

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

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
