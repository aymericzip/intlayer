---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getLocaleName फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getLocaleName फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getLocaleName
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getLocaleName` फ़ंक्शन `intlayer` में

## विवरण

`getLocaleName` फ़ंक्शन एक दिए गए लोकल (`targetLocale`) का स्थानीयकृत नाम डिस्प्ले लोकल (`displayLocale`) में लौटाता है। यदि कोई `targetLocale` प्रदान नहीं किया गया है, तो यह `displayLocale` का नाम उसकी अपनी भाषा में लौटाता है।

## पैरामीटर्स

- `displayLocale: Locales`

  - **विवरण**: वह लोकल जिसमें लक्ष्य लोकल का नाम प्रदर्शित किया जाएगा।
  - **प्रकार**: वैध लोकल्स का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

- `targetLocale?: Locales`
  - **विवरण**: वह लोकल जिसका नाम स्थानीयकृत किया जाना है।
  - **प्रकार**: वैकल्पिक। वैध लोकल्स का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

## रिटर्न्स

- **प्रकार**: `string`
- **विवरण**: `targetLocale` का `displayLocale` में स्थानीयकृत नाम, या यदि `targetLocale` प्रदान नहीं किया गया है तो `displayLocale` का अपना नाम। यदि कोई अनुवाद नहीं मिलता है, तो यह `"Unknown locale"` लौटाता है।

## उदाहरण उपयोग

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // आउटपुट: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // आउटपुट: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // आउटपुट: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // आउटपुट: "English"

getLocaleName(Locales.FRENCH); // आउटपुट: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // आउटपुट: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // आउटपुट: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // आउटपुट: "French"

getLocaleName(Locales.CHINESE); // आउटपुट: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // आउटपुट: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // आउटपुट: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // आउटपुट: "Chinese"

getLocaleName("unknown-locale"); // आउटपुट: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // आउटपुट: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // आउटपुट: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // आउटपुट: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // आउटपुट: "English"

getLocaleName(Locales.FRENCH); // आउटपुट: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // आउटपुट: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // आउटपुट: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // आउटपुट: "French"

getLocaleName(Locales.CHINESE); // आउटपुट: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // आउटपुट: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // आउटपुट: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // आउटपुट: "Chinese"

getLocaleName("unknown-locale"); // आउटपुट: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // आउटपुट: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // आउटपुट: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // आउटपुट: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // आउटपुट: "English"

getLocaleName(Locales.FRENCH); // आउटपुट: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // आउटपुट: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // आउटपुट: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // आउटपुट: "French"

getLocaleName(Locales.CHINESE); // आउटपुट: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // आउटपुट: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // आउटपुट: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // आउटपुट: "Chinese"

getLocaleName("unknown-locale"); // आउटपुट: "Unknown locale"
```

## किनारे के मामले

- **कोई `targetLocale` प्रदान नहीं किया गया:**
  - फ़ंक्शन डिफ़ॉल्ट रूप से `displayLocale` का अपना नाम लौटाता है।
- **अनुवाद गायब:**
  - यदि `localeNameTranslations` में `targetLocale` या विशिष्ट `displayLocale` के लिए कोई प्रविष्टि नहीं है, तो फ़ंक्शन `ownLocalesName` पर वापस जाता है या `"Unknown locale"` लौटाता है।
