---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration फ़ंक्शन दस्तावेज़ीकरण | intlayer
description: intlayer पैकेज के लिए getEnumeration फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getEnumeration
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़ीकरण: `intlayer` में `getEnumeration` फ़ंक्शन

## विवरण

`getEnumeration` फ़ंक्शन एक निर्दिष्ट मात्रा के अनुसार पूर्वनिर्धारित शर्तों के आधार पर एक एनेमरेशन ऑब्जेक्ट में संबंधित सामग्री प्राप्त करता है। शर्तें कुंजियों के रूप में परिभाषित होती हैं, और उनकी प्राथमिकता ऑब्जेक्ट में उनके क्रम द्वारा निर्धारित होती है।

## पैरामीटर

- `enumerationContent: QuantityContent<Content>`

  - **विवरण**: एक ऑब्जेक्ट जहाँ कुंजियाँ शर्तों का प्रतिनिधित्व करती हैं (जैसे, `<=`, `<`, `>=`, `=`) और मान संबंधित सामग्री का प्रतिनिधित्व करते हैं। कुंजियों का क्रम उनके मिलान प्राथमिकता को परिभाषित करता है।
  - **प्रकार**: `QuantityContent<Content>`
    - `Content` किसी भी प्रकार का हो सकता है।

- `quantity: number`

  - **विवरण**: वह संख्यात्मक मान जिसका उपयोग `enumerationContent` में शर्तों से मेल खाने के लिए किया जाता है।
  - **प्रकार**: `number`

## रिटर्न

- **प्रकार**: `Content`
- **विवरण**: `enumerationContent` में पहली मेल खाने वाली शर्त के अनुसार संबंधित सामग्री। यदि कोई मेल नहीं मिलता है, तो यह कार्यान्वयन के आधार पर डिफ़ॉल्ट रूप से संभाला जाता है (जैसे, त्रुटि या फॉलबैक सामग्री)।

## उदाहरण उपयोग

### बुनियादी उपयोग

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

### शर्तों की प्राथमिकता

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

- **कोई मेल खाने वाली शर्त नहीं:**

  - यदि कोई शर्त प्रदान की गई मात्रा से मेल नहीं खाती है, तो फ़ंक्शन या तो `undefined` लौटाएगा या डिफ़ॉल्ट/फॉलबैक स्थिति को स्पष्ट रूप से संभालेगा।

- **अस्पष्ट शर्तें:**

  - यदि शर्तें ओवरलैप होती हैं, तो पहली मेल खाने वाली शर्त (ऑब्जेक्ट क्रम के आधार पर) को प्राथमिकता दी जाती है।

- **अमान्य कुंजी:**

  - फ़ंक्शन मानता है कि `enumerationContent` में सभी कुंजियाँ वैध हैं और शर्तों के रूप में पार्स की जा सकती हैं। अमान्य या गलत स्वरूपित कुंजियाँ अप्रत्याशित व्यवहार का कारण बन सकती हैं।

- **TypeScript प्रवर्तन:**
  - फ़ंक्शन यह सुनिश्चित करता है कि `Content` प्रकार सभी कुंजियों में सुसंगत हो, जिससे प्राप्त सामग्री में प्रकार सुरक्षा सुनिश्चित होती है।

## नोट्स

- दिए गए मात्रा के आधार पर उपयुक्त शर्त निर्धारित करने के लिए `findMatchingCondition` उपयोगिता का उपयोग किया जाता है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
