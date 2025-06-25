---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getHTMLTextDir फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getHTMLTextDir फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getHTMLTextDir
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getHTMLTextDir` फ़ंक्शन `intlayer` में

## विवरण

`getHTMLTextDir` फ़ंक्शन प्रदान किए गए लोकेल के आधार पर टेक्स्ट दिशा (`ltr`, `rtl`, या `auto`) निर्धारित करता है। यह डेवलपर्स को HTML में सही टेक्स्ट रेंडरिंग के लिए `dir` एट्रिब्यूट सेट करने में मदद करने के लिए डिज़ाइन किया गया है।

## पैरामीटर्स

- `locale?: Locales`

  - **विवरण**: टेक्स्ट दिशा निर्धारित करने के लिए उपयोग किया गया लोकेल स्ट्रिंग (जैसे, `Locales.ENGLISH`, `Locales.ARABIC`)।
  - **प्रकार**: `Locales` (वैकल्पिक)

## रिटर्न्स

- **प्रकार**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **विवरण**: लोकेल के अनुरूप टेक्स्ट दिशा:
  - `'ltr'` बाएं से दाएं भाषाओं के लिए।
  - `'rtl'` दाएं से बाएं भाषाओं के लिए।
  - `'auto'` यदि लोकेल मान्यता प्राप्त नहीं है।

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

- **कोई लोकेल प्रदान नहीं किया गया:**

  - जब `locale` `undefined` होता है, तो फ़ंक्शन `'auto'` लौटाता है।

- **अमान्य लोकेल:**
  - अमान्य लोकेल के लिए, फ़ंक्शन डिफ़ॉल्ट रूप से `'auto'` पर सेट होता है।

## घटकों में उपयोग:

`getHTMLTextDir` फ़ंक्शन का उपयोग HTML दस्तावेज़ में लोकेल के आधार पर सही टेक्स्ट रेंडरिंग के लिए `dir` एट्रिब्यूट को डायनामिक रूप से सेट करने के लिए किया जा सकता है।

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

उपरोक्त उदाहरण में, `dir` एट्रिब्यूट लोकेल के आधार पर डायनामिक रूप से सेट किया गया है।
