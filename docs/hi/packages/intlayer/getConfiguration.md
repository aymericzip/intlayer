# Documentation: `getConfiguration` Function in `intlayer`

## Description:

`getConfiguration` फ़ंक्शन `intlayer` एप्लिकेशन के लिए पूरे कॉन्फ़िगरेशन को वातावरण वेरिएबल्स को निकालकर प्राप्त करता है। यह फ़ंक्शन क्लाइंट और सर्वर दोनों पक्षों पर समान कॉन्फ़िगरेशन का उपयोग करने की लचीलापन प्रदान करता है, एप्लिकेशन भर में संवाद और एकरूपता सुनिश्चित करता है।

---

## Parameters:

यह फ़ंक्शन कोई पैरामीटर नहीं लेता। इसके बजाय, यह कॉन्फ़िगरेशन के लिए वातावरण वेरिएबल्स का उपयोग करता है।

### Returns:

- **Type**: `IntlayerConfig`
- **Description**: `intlayer` के लिए पूर्ण कॉन्फ़िगरेशन वाली वस्तु। कॉन्फ़िगरेशन में निम्नलिखित खंड शामिल हैं:

  - `internationalization`: स्थानीय और सख्त मोड से संबंधित सेटिंग्स।
  - `middleware`: URL और कुकी प्रबंधन से संबंधित सेटिंग्स।
  - `content`: सामग्री फ़ाइलों, निर्देशिकाओं और पैटर्न से संबंधित सेटिंग्स।
  - `editor`: संपादक-विशिष्ट कॉन्फ़िगरेशन।

अधिक विवरण के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

---

## Example Usage:

### Retrieving the Full Configuration:

```typescript
import { getConfiguration } from "intlayer";

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

### Extracting `availableLocales` and `defaultLocale`:

कॉन्फ़िगरेशन का `internationalization` खंड स्थानीय संबंधित सेटिंग्स प्रदान करता है जैसे कि `locales` (उपलब्ध स्थानीय) और `defaultLocale` (फॉलबैक भाषा)।

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output example: ["en", "fr", "es"]
console.log(defaultLocale); // Output example: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Notes:

- सुनिश्चित करें कि सभी आवश्यक वातावरण वेरिएबल्स सही ढंग से सेट किए गए हैं इससे पहले कि इस फ़ंक्शन को कॉल करें। लापता वेरिएबल्स Initialization के दौरान त्रुटियों का कारण बनेंगे।
- यह फ़ंक्शन दोनों क्लाइंट और सर्वर पक्षों पर उपयोग किया जा सकता है, जिससे यह कॉन्फ़िगरेशन को एकीकृत तरीके से प्रबंधित करने के लिए एक बहुपरकारी उपकरण बनता है।

## Usage in Applications:

`getConfiguration` फ़ंक्शन एक `intlayer` एप्लिकेशन के कॉन्फ़िगरेशन को आरंभ करने और प्रबंधित करने के लिए एक आधारभूत उपयोगिता है। स्थानीय, मिडलवेयर, और सामग्री निर्देशिकाओं जैसी सेटिंग्स तक पहुंच प्रदान करके, यह बहुभाषी और सामग्री-आधारित एप्लिकेशन में समरूपता और स्केलेबिलिटी सुनिश्चित करता है।
