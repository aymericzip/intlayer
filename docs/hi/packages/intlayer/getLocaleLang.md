---
docName: package__intlayer__getLocaleLang
url: /doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getLocaleLang फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getLocaleLang फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getLocaleLang
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getLocaleLang` फ़ंक्शन `intlayer` में

## विवरण

`getLocaleLang` फ़ंक्शन एक लोकल स्ट्रिंग से भाषा कोड निकालता है। यह देश कोड के साथ या बिना लोकल्स का समर्थन करता है। यदि कोई लोकल प्रदान नहीं किया गया है, तो यह डिफ़ॉल्ट रूप से एक खाली स्ट्रिंग लौटाता है।

## पैरामीटर

- `locale?: Locales`

  - **विवरण**: वह लोकल स्ट्रिंग (उदा., `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) जिससे भाषा कोड निकाला जाता है।
  - **प्रकार**: `Locales` (वैकल्पिक)

## रिटर्न्स

- **प्रकार**: `string`
- **विवरण**: लोकल से निकाला गया भाषा कोड। यदि लोकल प्रदान नहीं किया गया है, तो यह एक खाली स्ट्रिंग (`''`) लौटाता है।

## उदाहरण उपयोग

### भाषा कोड निकालना:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
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

- **गलत लोकल स्ट्रिंग्स:**
  - यदि `locale` `language-country` प्रारूप का पालन नहीं करता है (उदा., `Locales.ENGLISH-US`), तो फ़ंक्शन सुरक्षित रूप से `'-'` से पहले का भाग या यदि `'-'` मौजूद नहीं है तो पूरी स्ट्रिंग लौटाता है।
