---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getHTMLTextDir फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getHTMLTextDir फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getHTMLTextDir
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
---

# दस्तावेज़ीकरण: `intlayer` में `getHTMLTextDir` फ़ंक्शन

## विवरण

`getHTMLTextDir` फ़ंक्शन प्रदान किए गए लोकल के आधार पर टेक्स्ट दिशा (`ltr`, `rtl`, या `auto`) निर्धारित करता है। इसे डेवलपर्स को HTML में सही टेक्स्ट रेंडरिंग के लिए `dir` एट्रिब्यूट सेट करने में मदद करने के लिए डिज़ाइन किया गया है।

## पैरामीटर

- `locale?: Locales`

  - **विवरण**: टेक्स्ट दिशा निर्धारित करने के लिए उपयोग किया गया लोकल स्ट्रिंग (जैसे, `Locales.ENGLISH`, `Locales.ARABIC`)।
  - **प्रकार**: `Locales` (वैकल्पिक)

## रिटर्न

- **प्रकार**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **विवरण**: लोकल के अनुसार टेक्स्ट दिशा:
  - `'ltr'` बाएं से दाएं भाषाओं के लिए।
  - `'rtl'` दाएं से बाएं भाषाओं के लिए।
  - `'auto'` यदि लोकल मान्यता प्राप्त नहीं है।

## उदाहरण उपयोग

### टेक्स्ट दिशा निर्धारित करना

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.FRENCH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.ARABIC); // आउटपुट: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.FRENCH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.ARABIC); // आउटपुट: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.FRENCH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.ARABIC); // आउटपुट: "rtl"
```

## किनारे के मामले

- **कोई लोकल प्रदान नहीं किया गया:**

  - जब `locale` `undefined` होता है, तो फ़ंक्शन `'auto'` लौटाता है।

- **अमान्य लोकल:**
  - अमान्य लोकल के लिए, फ़ंक्शन डिफ़ॉल्ट रूप से `'auto'` लौटाता है।

## घटकों में उपयोग:

`getHTMLTextDir` फ़ंक्शन का उपयोग लोकल के आधार पर सही टेक्स्ट रेंडरिंग के लिए HTML दस्तावेज़ में `dir` एट्रिब्यूट को गतिशील रूप से सेट करने के लिए किया जा सकता है।

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

उपरोक्त उदाहरण में, `dir` एट्रिब्यूट को लोकल के आधार पर गतिशील रूप से सेट किया गया है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
