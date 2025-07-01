---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: एनेमरेशन
description: जानिए कि अपनी बहुभाषी वेबसाइट में एनेमरेशन को कैसे घोषित और उपयोग करें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपने प्रोजेक्ट को सेटअप करें।
keywords:
  - एनेमरेशन
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - hi
  - dictionary
  - enumeration
---

# एनेमरेशन / बहुवचन रूप

## एनेमरेशन कैसे काम करता है

Intlayer में, एनेमरेशन `enu` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो विशिष्ट कुंजियों को उनके संबंधित सामग्री से मैप करता है। ये कुंजियाँ संख्यात्मक मान, रेंज, या कस्टम पहचानकर्ता हो सकती हैं। जब React Intlayer या Next Intlayer के साथ उपयोग किया जाता है, तो एप्लिकेशन की लोकल और परिभाषित नियमों के आधार पर उपयुक्त सामग्री स्वचालित रूप से चुनी जाती है।

## एनेमरेशन सेटअप करना

अपने Intlayer प्रोजेक्ट में एनेमरेशन सेटअप करने के लिए, आपको एक कंटेंट मॉड्यूल बनाना होगा जिसमें एनेमरेशन परिभाषाएँ शामिल हों। यहाँ कारों की संख्या के लिए एक सरल एनेमरेशन का उदाहरण दिया गया है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
      "fallback": "फॉलबैक मान", // वैकल्पिक
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
      "fallback": "फॉलबैक मान", // वैकल्पिक
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
      "fallback": "फॉलबैक मान", // वैकल्पिक
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "माइनस एक कार से कम",
        "-1": "माइनस एक कार",
        "0": "कोई कार नहीं",
        "1": "एक कार",
        ">5": "कुछ कारें",
        ">19": "कई कारें",
        "fallback": "फॉलबैक मान" // वैकल्पिक
      }
    }
  }
}
```

इस उदाहरण में, `enu` विभिन्न स्थितियों को विशिष्ट सामग्री से मैप करता है। जब इसे एक React घटक में उपयोग किया जाता है, तो Intlayer दिए गए चर के आधार पर स्वचालित रूप से उपयुक्त सामग्री चुन सकता है।

> Intlayer एनेमरेशन में घोषणा का क्रम महत्वपूर्ण होता है। पहली मान्य घोषणा को चुना जाएगा। यदि कई स्थितियां लागू होती हैं, तो सुनिश्चित करें कि वे सही क्रम में हैं ताकि अप्रत्याशित व्यवहार से बचा जा सके।

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो यदि कोई कुंजी मेल नहीं खाती है, तो फ़ंक्शन `undefined` लौटाएगा।

## React Intlayer के साथ एनेमरेशन का उपयोग करना

React घटक में एनेमरेशन का उपयोग करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक का उपयोग कर सकते हैं। यह हुक निर्दिष्ट ID के आधार पर सही सामग्री प्राप्त करता है। इसका उपयोग करने का एक उदाहरण यहां दिया गया है:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // आउटपुट: कोई कार नहीं
        }
      </p>
      <p>
        {
          numberOfCar(6) // आउटपुट: कुछ कारें
        }
      </p>
      <p>
        {
          numberOfCar(20) // आउटपुट: कई कारें
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // आउटपुट: फॉलबैक मान
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // आउटपुट: कोई कार नहीं
        }
      </p>
      <p>
        {
          numberOfCar(6) // आउटपुट: कुछ कारें
        }
      </p>
      <p>
        {
          numberOfCar(20) // आउटपुट: कई कारें
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // आउटपुट: फॉलबैक मान
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // आउटपुट: कोई कार नहीं
        }
      </p>
      <p>
        {
          numberOfCar(6) // आउटपुट: कुछ कारें
        }
      </p>
      <p>
        {
          numberOfCar(20) // आउटपुट: कई कारें
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // आउटपुट: फॉलबैक मान
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

इस उदाहरण में, घटक गतिशील रूप से कारों की संख्या के आधार पर अपने आउटपुट को समायोजित करता है। निर्दिष्ट सीमा के अनुसार सही सामग्री स्वचालित रूप से चुनी जाती है।

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न फ्रेमवर्क के साथ Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
