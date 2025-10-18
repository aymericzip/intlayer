---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleLang फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getLocaleLang फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# दस्तावेज़ीकरण: `intlayer` में `getLocaleLang` फ़ंक्शन

## विवरण

`getLocaleLang` फ़ंक्शन एक लोकल स्ट्रिंग से भाषा कोड निकालता है। यह देश कोड के साथ या बिना देश कोड वाले लोकल का समर्थन करता है। यदि कोई लोकल प्रदान नहीं किया गया है, तो यह डिफ़ॉल्ट रूप से एक खाली स्ट्रिंग लौटाता है।

## पैरामीटर

- `locale?: Locales`

  - **विवरण**: लोकल स्ट्रिंग (जैसे, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) जिससे भाषा कोड निकाला जाता है।
  - **प्रकार**: `Locales` (वैकल्पिक)

## रिटर्न

- **प्रकार**: `string`
- **विवरण**: लोकल से निकाला गया भाषा कोड। यदि लोकल प्रदान नहीं किया गया है, तो यह एक खाली स्ट्रिंग (`''`) लौटाता है।

## उदाहरण उपयोग

### भाषा कोड निकालना:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

## किनारे के मामले

- **कोई लोकल प्रदान नहीं किया गया:**

  - जब `locale` `undefined` होता है, तो फ़ंक्शन एक खाली स्ट्रिंग लौटाता है।

- **गलत स्वरूप वाले लोकल स्ट्रिंग्स:**
  - यदि `locale` `language-country` प्रारूप का पालन नहीं करता है (जैसे, `Locales.ENGLISH-US`), तो फ़ंक्शन सुरक्षित रूप से `'-'` से पहले का भाग या यदि `'-'` मौजूद नहीं है तो पूरी स्ट्रिंग लौटाता है।
