---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getConfiguration फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getConfiguration फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getConfiguration
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
  - getConfiguration
---

# दस्तावेज़ीकरण: `intlayer` में `getConfiguration` फ़ंक्शन

## विवरण

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन के लिए पूरी कॉन्फ़िगरेशन को पर्यावरण चर (environment variables) से निकालता है। यह फ़ंक्शन क्लाइंट और सर्वर दोनों पक्षों पर एक ही कॉन्फ़िगरेशन का उपयोग करने की लचीलापन प्रदान करता है, जिससे एप्लिकेशन में स्थिरता सुनिश्चित होती है।

---

## पैरामीटर

यह फ़ंक्शन कोई पैरामीटर नहीं लेता है। इसके बजाय, यह कॉन्फ़िगरेशन के लिए पर्यावरण चर का उपयोग करता है।

### रिटर्न

- **प्रकार**: `IntlayerConfig`
- **विवरण**: एक ऑब्जेक्ट जो `intlayer` के लिए पूरी कॉन्फ़िगरेशन को समाहित करता है। कॉन्फ़िगरेशन में निम्नलिखित अनुभाग शामिल हैं:

  - `internationalization`: लोकल और सख्त मोड से संबंधित सेटिंग्स।
  - `middleware`: URL और कुकी प्रबंधन से संबंधित सेटिंग्स।
  - `content`: सामग्री फ़ाइलों, निर्देशिकाओं, और पैटर्न से संबंधित सेटिंग्स।
  - `editor`: संपादक-विशिष्ट कॉन्फ़िगरेशन।

अधिक जानकारी के लिए देखें [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)।

---

## उदाहरण उपयोग

### पूरी कॉन्फ़िगरेशन प्राप्त करना

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// आउटपुट:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// आउटपुट:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// आउटपुट:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### `availableLocales` और `defaultLocale` निकालना

कॉन्फ़िगरेशन का `internationalization` सेक्शन लोकल से संबंधित सेटिंग्स प्रदान करता है जैसे कि `locales` (उपलब्ध देशिकाएँ) और `defaultLocale` (डिफ़ॉल्ट भाषा)।

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // आउटपुट उदाहरण: ["en", "fr", "es"]
console.log(defaultLocale); // आउटपुट उदाहरण: "en"
console.log(cookieName); // आउटपुट: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // आउटपुट उदाहरण: ["en", "fr", "es"]
console.log(defaultLocale); // आउटपुट उदाहरण: "en"
console.log(cookieName); // आउटपुट: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // आउटपुट उदाहरण: ["en", "fr", "es"]
console.log(defaultLocale); // आउटपुट उदाहरण: "en"
console.log(cookieName); // आउटपुट: "INTLAYER_LOCALE"
```

## नोट्स

- इस फ़ंक्शन को कॉल करने से पहले सुनिश्चित करें कि सभी आवश्यक पर्यावरण चर सही ढंग से सेट हैं। यदि कोई चर गायब होगा तो प्रारंभिककरण के दौरान त्रुटियाँ होंगी।
- इस फ़ंक्शन का उपयोग क्लाइंट और सर्वर दोनों पक्षों पर किया जा सकता है, जिससे यह कॉन्फ़िगरेशन को एकीकृत तरीके से प्रबंधित करने के लिए एक बहुमुखी उपकरण बन जाता है।

## अनुप्रयोगों में उपयोग

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन की कॉन्फ़िगरेशन को प्रारंभ करने और प्रबंधित करने के लिए एक मूलभूत उपयोगिता है। यह लोकल्स, मिडलवेयर, और कंटेंट डायरेक्टरी जैसी सेटिंग्स तक पहुँच प्रदान करके बहुभाषी और कंटेंट-चालित अनुप्रयोगों में स्थिरता और विस्तारशीलता सुनिश्चित करता है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
