# गणना / बहुवचन

## गणना कैसे काम करती है

Intlayer में, गणना `enu` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो विशिष्ट कुंजियों को उनके संबंधित सामग्री से मैप करता है। ये कुंजियाँ संख्यात्मक मान, श्रेणियाँ, या कस्टम पहचानकर्ता का प्रतिनिधित्व कर सकती हैं। जब React Intlayer या Next Intlayer के साथ उपयोग किया जाता है, तो एप्लिकेशन की स्थानीयता और परिभाषित नियमों के आधार पर उपयुक्त सामग्री स्वचालित रूप से चुनी जाती है।

## गणना सेट करना

अपने Intlayer प्रोजेक्ट में गणना सेट करने के लिए, आपको एक सामग्री मॉड्यूल बनाना होगा जिसमें गणना परिभाषाएँ शामिल हों। यहाँ कारों की संख्या के लिए एक साधारण गणना का उदाहरण दिया गया है:

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

इस उदाहरण में, `enu` विभिन्न शर्तों को विशिष्ट सामग्री से मैप करता है। जब React घटक में उपयोग किया जाता है, तो Intlayer दिए गए वेरिएबल के आधार पर स्वचालित रूप से उपयुक्त सामग्री चुन सकता है।

> Intlayer गणनाओं में घोषणा का क्रम महत्वपूर्ण है। पहली मान्य घोषणा वह होगी जिसे चुना जाएगा। यदि कई शर्तें लागू होती हैं, तो अप्रत्याशित व्यवहार से बचने के लिए उन्हें सही क्रम में व्यवस्थित करें।

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो यदि कोई कुंजी मेल नहीं खाती है तो फ़ंक्शन `undefined` लौटाएगा।

## React Intlayer के साथ गणना का उपयोग करना

React घटक में गणना का उपयोग करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक का लाभ उठा सकते हैं। यह हुक निर्दिष्ट ID के आधार पर सही सामग्री पुनः प्राप्त करता है। इसका उपयोग कैसे करें, इसका एक उदाहरण यहाँ दिया गया है:

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

इस उदाहरण में, घटक कारों की संख्या के आधार पर अपने आउटपुट को गतिशील रूप से समायोजित करता है। निर्दिष्ट श्रेणी के आधार पर सही सामग्री स्वचालित रूप से चुनी जाती है।

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न फ्रेमवर्क के साथ Intlayer की सेटअप और उपयोग पर अधिक जानकारी प्रदान करते हैं।
