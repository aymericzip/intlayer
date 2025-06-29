---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getEnumeration फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - getEnumeration
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `getEnumeration` फ़ंक्शन `intlayer` में

## विवरण

`getEnumeration` फ़ंक्शन एक विशिष्ट मात्रा के अनुसार सामग्री को पुनः प्राप्त करता है, जो एक पूर्वनिर्धारित स्थिति वस्तु में परिभाषित होती है। स्थितियों को कुंजियों के रूप में परिभाषित किया जाता है, और उनकी प्राथमिकता वस्तु में उनके क्रम से निर्धारित होती है।

## पैरामीटर

- `enumerationContent: QuantityContent<Content>`

  - **विवरण**: एक वस्तु जिसमें कुंजियाँ स्थितियों का प्रतिनिधित्व करती हैं (जैसे, `<=`, `<`, `>=`, `=`) और मान संबंधित सामग्री का प्रतिनिधित्व करते हैं। कुंजियों का क्रम उनकी मिलान प्राथमिकता को परिभाषित करता है।
  - **प्रकार**: `QuantityContent<Content>`
    - `Content` किसी भी प्रकार का हो सकता है।

- `quantity: number`

  - **विवरण**: वह संख्यात्मक मान जो `enumerationContent` में स्थितियों के खिलाफ मिलान करने के लिए उपयोग किया जाता है।
  - **प्रकार**: `number`

## रिटर्न्स

- **प्रकार**: `Content`
- **विवरण**: `enumerationContent` में पहली मिलान स्थिति के लिए संबंधित सामग्री। यदि कोई मिलान नहीं मिलता है, तो यह कार्यान्वयन के आधार पर डिफ़ॉल्ट हैंडलिंग (जैसे, त्रुटि या फॉलबैक सामग्री) पर निर्भर करता है।

## उदाहरण उपयोग

### बेसिक उपयोग

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "आपके पास -2.3 से कम है",
    "<1": "आपके पास एक से कम है",
    "2": "आपके पास दो हैं",
    ">=3": "आपके पास तीन या अधिक हैं",
  },
  2
);

console.log(content); // आउटपुट: "आपके पास दो हैं"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "आपके पास एक से कम है",
    "2": "आपके पास दो हैं",
    ">=3": "आपके पास तीन या अधिक हैं",
  },
  2
);

console.log(content); // आउटपुट: "आपके पास दो हैं"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "आपके पास एक से कम है",
    "2": "आपके पास दो हैं",
    ">=3": "आपके पास तीन या अधिक हैं",
  },
  2
);

console.log(content); // आउटपुट: "आपके पास दो हैं"
```

### स्थितियों की प्राथमिकता

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "आपके पास चार से कम है",
    "2": "आपके पास दो हैं",
  },
  2
);

console.log(content); // आउटपुट: "आपके पास चार से कम है"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "आपके पास चार से कम है",
    "2": "आपके पास दो हैं",
  },
  2
);

console.log(content); // आउटपुट: "आपके पास चार से कम है"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "आपके पास चार से कम है",
    "2": "आपके पास दो हैं",
  },
  2
);

console.log(content); // आउटपुट: "आपके पास चार से कम है"
```

## किनारे के मामले

- **कोई मिलान स्थिति नहीं:**

  - यदि कोई स्थिति प्रदान की गई मात्रा से मेल नहीं खाती है, तो फ़ंक्शन या तो `undefined` लौटाएगा या डिफ़ॉल्ट/फॉलबैक परिदृश्य को स्पष्ट रूप से संभालेगा।

- **अस्पष्ट स्थितियाँ:**

  - यदि स्थितियाँ ओवरलैप करती हैं, तो पहली मिलान स्थिति (वस्तु क्रम के आधार पर) प्राथमिकता लेती है।

- **अमान्य कुंजियाँ:**

  - फ़ंक्शन मानता है कि `enumerationContent` में सभी कुंजियाँ मान्य और स्थितियों के रूप में पार्स करने योग्य हैं। अमान्य या अनुचित रूप से स्वरूपित कुंजियाँ अप्रत्याशित व्यवहार का कारण बन सकती हैं।

- **टाइपस्क्रिप्ट प्रवर्तन:**
  - फ़ंक्शन यह सुनिश्चित करता है कि `Content` प्रकार सभी कुंजियों में सुसंगत है, जिससे पुनः प्राप्त सामग्री में प्रकार सुरक्षा सुनिश्चित होती है।

## नोट्स

- `findMatchingCondition` उपयोगिता का उपयोग दी गई मात्रा के आधार पर उपयुक्त स्थिति निर्धारित करने के लिए किया जाता है।
