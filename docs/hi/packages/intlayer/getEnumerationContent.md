# दस्तावेज़: `getEnumeration` फ़ंक्शन `intlayer` में

## विवरण:

`getEnumeration` फ़ंक्शन एक गणना (quantity) के विशिष्ट मान के अनुसार सामग्री को पुनर्प्राप्त करता है जो एक enumeration वस्तु में पूर्वनिर्धारित शर्तों के आधार पर होता है। शर्तें कुंजी के रूप में परिभाषित होती हैं, और उनकी प्राथमिकता उनके क्रम से निर्धारित होती है।

## मापदंड:

- `enumerationContent: QuantityContent<Content>`

  - **विवरण**: एक वस्तु जहां कुंजी शर्तों का प्रतिनिधित्व करती हैं (जैसे, `<=`, `<`, `>=`, `=`) और मान संबंधित सामग्री का प्रतिनिधित्व करते हैं। कुंजी का आदेश उनके मिलान की प्राथमिकता को परिभाषित करता है।
  - **प्रकार**: `QuantityContent<Content>`
    - `Content` कोई भी प्रकार हो सकता है।

- `quantity: number`

  - **विवरण**: वह संख्यात्मक मान जिसका मिलान `enumerationContent` में शर्तों के खिलाफ किया जाता है।
  - **प्रकार**: `number`

## लौटाता है:

- **प्रकार**: `Content`
- **विवरण**: यह वह सामग्री है जो `enumerationContent` में पहले मिलान करने वाली शर्त के अनुसार होती है। यदि कोई मेल नहीं मिलता है, तो यह कार्यान्वयन के आधार पर डिफ़ॉल्ट रूप से संभालता है (जैसे, त्रुटि या फॉलबैक सामग्री)।

## उदाहरण उपयोग:

### बुनियादी उपयोग:

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

console.log(content); // Output: "आपके पास दो हैं"
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

console.log(content); // Output: "आपके पास दो हैं"
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

console.log(content); // Output: "आपके पास दो हैं"
```

### शर्तों की प्राथमिकता:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "आपके पास चार से कम है",
    "2": "आपके पास दो हैं",
  },
  2
);

console.log(content); // Output: "आपके पास चार से कम है"
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

console.log(content); // Output: "आपके पास चार से कम है"
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

console.log(content); // Output: "आपके पास चार से कम है"
```

## किनारे के मामले:

- **कोई मिलान करने वाली शर्त नहीं:**

  - यदि कोई शर्त प्रदान की गई मात्रा से मेल नहीं खाती है, तो फ़ंक्शन या तो `undefined` लौटाएगा या स्पष्ट रूप से डिफ़ॉल्ट/फॉलबैक परिदृश्य को संभालेगा।

- **अस्पष्ट शर्तें:**

  - यदि शर्तें ओवरलैप होती हैं, तो पहली मिलान करने वाली शर्त (किसी वस्तु के क्रम के आधार पर) प्राधानता लेती है।

- **अमान्य कुंजियाँ:**

  - फ़ंक्शन यह मानता है कि `enumerationContent` में सभी कुंजियाँ मान्य और शर्तों के रूप में पार्स करने योग्य हैं। अमान्य या ठीक से स्वरूपित कुंजियाँ अप्रत्याशित व्यवहार का कारण बन सकती हैं।

- **TypeScript प्रवर्तन:**
  - फ़ंक्शन यह सुनिश्चित करता है कि सभी कुंजियों में `Content` प्रकार एकसार हैं, जो पुनः प्राप्त सामग्री में प्रकार सुरक्षा की अनुमति देता है।

## नोट्स:

- `findMatchingCondition` उपयोगिता का उपयोग दिए गए मात्रा के आधार पर उपयुक्त शर्त निर्धारित करने के लिए किया जाता है।
