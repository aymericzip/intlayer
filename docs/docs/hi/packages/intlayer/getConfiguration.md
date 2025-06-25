---
docName: package__intlayer__getConfiguration
url: https://intlayer.org/doc/packages/intlayer/getConfiguration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getConfiguration फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getConfiguration फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getConfiguration
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getConfiguration` फ़ंक्शन `intlayer` में

## विवरण

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन के लिए संपूर्ण कॉन्फ़िगरेशन को पर्यावरण चर से निकालकर पुनः प्राप्त करता है। यह फ़ंक्शन क्लाइंट और सर्वर दोनों पक्षों पर एक ही कॉन्फ़िगरेशन का उपयोग करने की लचीलापन प्रदान करता है, जिससे एप्लिकेशन में स्थिरता सुनिश्चित होती है।

---

## पैरामीटर्स

यह फ़ंक्शन कोई पैरामीटर नहीं लेता है। इसके बजाय, यह कॉन्फ़िगरेशन के लिए पर्यावरण चर का उपयोग करता है।

### रिटर्न करता है

- **प्रकार**: `IntlayerConfig`
- **विवरण**: `intlayer` के लिए संपूर्ण कॉन्फ़िगरेशन युक्त एक ऑब्जेक्ट। कॉन्फ़िगरेशन में निम्नलिखित अनुभाग शामिल हैं:

  - `internationalization`: स्थानीय और सख्त मोड से संबंधित सेटिंग्स।
  - `middleware`: URL और कुकी प्रबंधन से संबंधित सेटिंग्स।
  - `content`: सामग्री फ़ाइलों, निर्देशिकाओं और पैटर्न से संबंधित सेटिंग्स।
  - `editor`: संपादक-विशिष्ट कॉन्फ़िगरेशन।

अधिक विवरण के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

---

## उदाहरण उपयोग

### संपूर्ण कॉन्फ़िगरेशन पुनः प्राप्त करना

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

कॉन्फ़िगरेशन का `internationalization` अनुभाग स्थानीय से संबंधित सेटिंग्स प्रदान करता है जैसे `locales` (उपलब्ध स्थानीय) और `defaultLocale` (फॉलबैक भाषा)।

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

- इस फ़ंक्शन को कॉल करने से पहले सुनिश्चित करें कि सभी आवश्यक पर्यावरण चर सही ढंग से सेट हैं। गायब चर प्रारंभिकरण के दौरान त्रुटियां उत्पन्न करेंगे।
- यह फ़ंक्शन क्लाइंट और सर्वर दोनों पक्षों पर उपयोग किया जा सकता है, जिससे यह एकीकृत तरीके से कॉन्फ़िगरेशन प्रबंधन के लिए एक बहुमुखी उपकरण बनता है।

## एप्लिकेशन में उपयोग

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन के कॉन्फ़िगरेशन को प्रारंभ और प्रबंधित करने के लिए एक मुख्य उपयोगिता है। यह स्थानीय, मिडलवेयर और सामग्री निर्देशिकाओं जैसी सेटिंग्स तक पहुंच प्रदान करके बहुभाषी और सामग्री-चालित अनुप्रयोगों में स्थिरता और मापनीयता सुनिश्चित करता है।
