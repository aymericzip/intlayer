---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: सामग्री एक्सटेंशन अनुकूलन
description: अपनी सामग्री घोषणा फ़ाइलों के एक्सटेंशनों को अनुकूलित करना सीखें। अपने प्रोजेक्ट में शर्तों को कुशलतापूर्वक लागू करने के लिए इस दस्तावेज़ का पालन करें।
keywords:
  - सामग्री एक्सटेंशन अनुकूलन
  - प्रलेखन
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# सामग्री एक्सटेंशन अनुकूलन

## सामग्री फ़ाइल एक्सटेंशन

Intlayer आपको अपनी सामग्री घोषणा फ़ाइलों के एक्सटेंशनों को अनुकूलित करने की अनुमति देता है। यह अनुकूलन बड़े पैमाने पर परियोजनाओं के प्रबंधन में लचीलापन प्रदान करता है और अन्य मॉड्यूल के साथ संघर्ष से बचने में मदद करता है।

### डिफ़ॉल्ट एक्सटेंशन

डिफ़ॉल्ट रूप से, Intlayer निम्नलिखित एक्सटेंशनों वाली सभी फ़ाइलों को सामग्री घोषणाओं के लिए देखता है:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

ये डिफ़ॉल्ट एक्सटेंशन अधिकांश अनुप्रयोगों के लिए उपयुक्त हैं। हालांकि, जब आपकी विशिष्ट आवश्यकताएँ होती हैं, तो आप कस्टम एक्सटेंशन परिभाषित कर सकते हैं ताकि बिल्ड प्रक्रिया को सरल बनाया जा सके और अन्य घटकों के साथ संघर्ष के जोखिम को कम किया जा सके।

### सामग्री एक्सटेंशनों को अनुकूलित करना

फ़ाइल एक्सटेंशनों को अनुकूलित करने के लिए जिनका उपयोग Intlayer सामग्री घोषणा फ़ाइलों की पहचान के लिए करता है, आप इन्हें Intlayer कॉन्फ़िगरेशन फ़ाइल में निर्दिष्ट कर सकते हैं। यह दृष्टिकोण बड़े पैमाने पर परियोजनाओं के लिए लाभकारी है जहाँ वॉच प्रक्रिया के दायरे को सीमित करने से बिल्ड प्रदर्शन में सुधार होता है।

यहाँ आपके कॉन्फ़िगरेशन में कस्टम सामग्री एक्सटेंशनों को परिभाषित करने का एक उदाहरण है:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // आपके कस्टम एक्सटेंशन
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // आपके कस्टम एक्सटेंशन
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // आपके कस्टम एक्सटेंशन
  },
};

module.exports = config;
```

इस उदाहरण में, कॉन्फ़िगरेशन दो कस्टम एक्सटेंशन निर्दिष्ट करता है: `.my_content.ts` और `.my_content.tsx`। Intlayer केवल इन एक्सटेंशनों वाली फ़ाइलों को देखेगा ताकि शब्दकोश बनाए जा सकें।

### कस्टम एक्सटेंशनों के लाभ

- **बिल्ड प्रदर्शन**: देखी जाने वाली फ़ाइलों के दायरे को कम करने से बड़े प्रोजेक्ट्स में बिल्ड प्रदर्शन में काफी सुधार हो सकता है।
- **संघर्ष से बचाव**: कस्टम एक्सटेंशन आपकी परियोजना में अन्य जावास्क्रिप्ट या टाइपस्क्रिप्ट फ़ाइलों के साथ संघर्ष को रोकने में मदद करते हैं।
- **संगठन**: कस्टम एक्सटेंशन आपको अपनी परियोजना की आवश्यकताओं के अनुसार अपनी सामग्री घोषणा फ़ाइलों को व्यवस्थित करने की अनुमति देते हैं।

### कस्टम एक्सटेंशनों के लिए दिशानिर्देश

जब आप सामग्री फ़ाइल एक्सटेंशनों को कस्टमाइज़ कर रहे हों, तो निम्नलिखित दिशानिर्देशों का ध्यान रखें:

- **विशिष्टता**: ऐसे एक्सटेंशन चुनें जो आपकी परियोजना में विशिष्ट हों ताकि संघर्ष से बचा जा सके।
- **सुसंगत नामकरण**: बेहतर कोड पठनीयता और रखरखाव के लिए सुसंगत नामकरण कन्वेंशन का उपयोग करें।
- **सामान्य एक्सटेंशनों से बचाव**: अन्य मॉड्यूल या लाइब्रेरी के साथ संघर्ष से बचने के लिए `.ts` या `.js` जैसे सामान्य एक्सटेंशनों का उपयोग करने से बचें।

## निष्कर्ष

Intlayer में सामग्री फ़ाइल एक्सटेंशनों को कस्टमाइज़ करना बड़े पैमाने पर अनुप्रयोगों में प्रदर्शन को अनुकूलित करने और संघर्षों से बचने के लिए एक मूल्यवान सुविधा है। इस दस्तावेज़ में उल्लिखित दिशानिर्देशों का पालन करके, आप अपनी सामग्री घोषणाओं का प्रभावी ढंग से प्रबंधन कर सकते हैं और अपनी परियोजना के अन्य भागों के साथ सुचारू एकीकरण सुनिश्चित कर सकते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
