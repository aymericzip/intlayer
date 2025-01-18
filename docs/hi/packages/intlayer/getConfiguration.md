# Documentation: `getConfiguration` Function in `intlayer`

## Description

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन के लिए पूरी कॉन्फ़िगरेशन को निकालता है, जो वातावरण चर को निकालता है। यह फ़ंक्शन क्लाइंट और सर्वर दोनों पक्षों पर समान कॉन्फ़िगरेशन का उपयोग करने की लचीलेपन को प्रदान करता है, जिससे एप्लिकेशन में स्थिरता सुनिश्चित होती है।

---

## Parameters

यह फ़ंक्शन कोई पैरामीटर नहीं लेता है। इसके बजाय, यह कॉन्फ़िगरेशन के लिए वातावरण चर का उपयोग करता है।

### Returns

- **Type**: `IntlayerConfig`
- **Description**: `intlayer` के लिए पूरी कॉन्फ़िगरेशन शामिल करने वाला एक ऑब्जेक्ट। कॉन्फ़िगरेशन में निम्नलिखित अनुभाग शामिल हैं:

  - `internationalization`: स्थानीय और सख्त मोड से संबंधित सेटिंग्स।
  - `middleware`: URL और कुकी प्रबंधन से संबंधित सेटिंग्स।
  - `content`: सामग्री फ़ाइलों, निर्देशिकाओं और पैटर्न से संबंधित सेटिंग्स।
  - `editor`: संपादक-विशिष्ट कॉन्फ़िगरेशन।

अधिक जानकारी के लिए [Intlayer configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

---

## Example Usage

### Retrieving the Full Configuration

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

// पूरी कॉन्फ़िगरेशन प्राप्त करें
const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

// पूरी कॉन्फ़िगरेशन प्राप्त करें
const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

// पूरी कॉन्फ़िगरेशन प्राप्त करें
const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extracting `availableLocales` and `defaultLocale`

कॉन्फ़िगरेशन के `internationalization` अनुभाग में `locales` (उपलब्ध स्थानीय) और `defaultLocale` (फॉलबैक भाषा) जैसी स्थानीय से संबंधित सेटिंग्स प्रदान की जाती हैं।

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output example: ["en", "fr", "es"]
console.log(defaultLocale); // Output example: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output example: ["en", "fr", "es"]
console.log(defaultLocale); // Output example: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output example: ["en", "fr", "es"]
console.log(defaultLocale); // Output example: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Notes

- सुनिश्चित करें कि सभी आवश्यक वातावरण चर सही ढंग से सेट हैं इससे पहले कि आप इस फ़ंक्शन को कॉल करें। गायब चर प्रारंभिककरण के दौरान त्रुटियाँ उत्पन्न करेंगे।
- यह फ़ंक्शन क्लाइंट और सर्वर दोनों पक्षों पर उपयोग किया जा सकता है, जिससे यह कॉन्फ़िगरेशन को एकीकृत तरीके से प्रबंधित करने का एक बहुपरकारी उपकरण बन जाता है।

## Usage in Applications

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन के लिए कॉन्फ़िगरेशन को प्रारंभ करने और प्रबंधित करने के लिए एक कोने का पत्थर उपयोगिता है। यह स्थानीय, मिडलवेयर और सामग्री निर्देशिकाओं जैसी सेटिंग्स तक पहुंच प्रदान करके, यह बहुभाषी और सामग्री-चालित एप्लिकेशनों में स्थिरता और स्केलेबिलिटी सुनिश्चित करता है।
