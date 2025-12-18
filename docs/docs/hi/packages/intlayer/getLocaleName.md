---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleName फ़ंक्शन दस्तावेज़ | intlayer
description: intlayer पैकेज के लिए getLocaleName फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getLocaleName
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: React Native और पुराने वातावरण के लिए polyfills जोड़ें
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# दस्तावेज़: `intlayer` में `getLocaleName` फ़ंक्शन

## विवरण

`getLocaleName` फ़ंक्शन दिए गए लोकल (`targetLocale`) का स्थानीयकृत नाम डिस्प्ले लोकल (`displayLocale`) में लौटाता है। यदि कोई `targetLocale` प्रदान नहीं किया गया है, तो यह `displayLocale` का नाम उसकी अपनी भाषा में लौटाता है।

## पैरामीटर

- `displayLocale: Locales`
  - **विवरण**: वह लोकल जिसमें लक्ष्य लोकल का नाम प्रदर्शित किया जाएगा।
  - **प्रकार**: वैध लोकल का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

- `targetLocale?: Locales`
  - **विवरण**: वह लोकल जिसका नाम स्थानीयकृत किया जाना है।
  - **प्रकार**: वैकल्पिक। वैध लोकल का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

## रिटर्न

- **प्रकार**: `string`
- **विवरण**: `targetLocale` का स्थानीयकृत नाम `displayLocale` में, या यदि `targetLocale` प्रदान नहीं किया गया है तो `displayLocale` का अपना नाम। यदि कोई अनुवाद नहीं मिलता है, तो यह `"Unknown locale"` लौटाता है।

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
  - फ़ंक्शन डिफ़ॉल्ट रूप से `displayLocale` के अपने नाम को लौटाता है।
- **अनुवाद गायब:**
  - यदि `localeNameTranslations` में `targetLocale` या विशिष्ट `displayLocale` के लिए कोई प्रविष्टि नहीं है, तो फ़ंक्शन `ownLocalesName` पर वापस चला जाता है या `"Unknown locale"` लौटाता है।

## React Native और पुराने वातावरण के लिए Polyfills

`getLocaleName` फ़ंक्शन `Intl.DisplayNames` API पर निर्भर करता है, जो React Native या पुराने JavaScript वातावरण में उपलब्ध नहीं है। यदि आप इन वातावरणों में `getLocaleName` का उपयोग कर रहे हैं, तो आपको polyfills जोड़ने की आवश्यकता है।

अपने एप्लिकेशन में जल्दी polyfills आयात करें, आदर्श रूप से अपनी प्रवेश बिंदु फ़ाइल में (उदाहरण के लिए, `index.js`, `App.tsx`, या `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

अधिक विवरण के लिए, [FormatJS polyfills दस्तावेज़](https://formatjs.io/docs/polyfills/intl-displaynames/) देखें।
