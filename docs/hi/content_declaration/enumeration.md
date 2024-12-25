# Enumeration / Plurielisation

## How Enumeration Works

Intlayer में, enumeration को `enu` function के माध्यम से सिद्ध किया जाता है, जो विशिष्ट कुंजी को उनके संबंधित सामग्री से जोड़ता है। ये कुंजी संख्यात्मक मान, रेंज, या कस्टम पहचानकर्ताओं का प्रतिनिधित्व कर सकती हैं। जब React Intlayer या Next Intlayer के साथ उपयोग किया जाता है, तो उचित सामग्री को स्वचालित रूप से चुना जाता है जो अनुप्रयोग की स्थानीयता और निर्धारित नियमों के आधार पर होता है।

## Setting Up Enumeration

अपने Intlayer प्रोजेक्ट में enumeration सेट करने के लिए, आपको एक सामग्री मॉड्यूल बनाने की आवश्यकता है जिसमें enumeration परिभाषाएँ शामिल हों। यहाँ कारों की संख्या के लिए एक सरल enumeration का उदाहरण दिया गया है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "एक से कम माइनस एक कार",
      "-1": "एक माइनस कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "एक से कम माइनस एक कार",
      "-1": "एक माइनस कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "एक से कम माइनस एक कार",
      "-1": "एक माइनस कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "<-1": "एक से कम माइनस एक कार",
      "-1": "एक माइनस कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें"
    }
  }
}
```

इस उदाहरण में, `enu` विभिन्न परिस्थितियों को विशिष्ट सामग्री से जोड़ता है। जब इसे React घटक में उपयोग किया जाता है, तो Intlayer स्वचालित रूप से दिए गए चर के आधार पर उपयुक्त सामग्री का चयन कर सकता है।

## Using Enumeration with React Intlayer

React घटक में enumeration का उपयोग करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक का लाभ उठा सकते हैं। यह हुक निर्दिष्ट ID के आधार पर सही सामग्री को पुनर्प्राप्त करता है। इसे उपयोग करने का एक उदाहरण यहां दिया गया है:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* आउटपुट: कोई कार नहीं */}
      <p>{content.numberOfCar(6)}</p> {/* आउटपुट: कुछ कारें */}
      <p>{content.numberOfCar(20)}</p> {/* आउटपुट: कुछ कारें */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* आउटपुट: कोई कार नहीं */}
      <p>{content.numberOfCar(6)}</p> {/* आउटपुट: कुछ कारें */}
      <p>{content.numberOfCar(20)}</p> {/* आउटपुट: कुछ कारें */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* आउटपुट: कोई कार नहीं */}
      <p>{content.numberOfCar(6)}</p> {/* आउटपुट: कुछ कारें */}
      <p>{content.numberOfCar(20)}</p> {/* आउटपुट: कुछ कारें */}
    </div>
  );
};

module.exports = CarComponent;
```

इस उदाहरण में, घटक गतिशील रूप से कारों की संख्या के आधार पर अपने आउटपुट को समायोजित करता है। निर्दिष्ट रेंज के आधार पर सही सामग्री स्वचालित रूप से चुनी जाती है।

## Important Notes

- Intlayer enumerations में घोषणा का क्रम महत्वपूर्ण है। पहली मान्य घोषणा वही होगी जो उठाई जाएगी।
- यदि एकाधिक शर्तें लागू होती हैं, तो अप्रत्याशित व्यवहार से बचने के लिए सुनिश्चित करें कि उन्हें सही क्रम में रखा गया है।

## Best Practices for Enumeration

यह सुनिश्चित करने के लिए कि आपकी enumerations अपेक्षित रूप से काम करे, इन सर्वोत्तम प्रथाओं का पालन करें:

- **सुसंगत नामकरण**: भ्रम से बचने के लिए enumeration मॉड्यूल के लिए स्पष्ट और सुसंगत IDs का उपयोग करें।
- **दस्तावेज़ीकरण**: अपने enumeration कुंजी और उनके अपेक्षित आउटपुट का दस्तावेज़ीकरण करें ताकि भविष्य की रखरखाव सुनिश्चित हो सके।
- **त्रुटि हैंडलिंग**: ऐसे मामलों को प्रबंधित करने के लिए त्रुटि हैंडलिंग लागू करें जहां कोई मान्य enumeration नहीं मिले।
- **प्रदर्शन अनुकूलित करें**: बड़े अनुप्रयोगों के लिए, प्रदर्शन सुधारने के लिए देखे जाने वाले फ़ाइल एक्सटेंशनों की संख्या को कम करें।

## Additional Resources

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न ढाँचों के साथ Intlayer की सेटअप और उपयोग में आगे की जानकारी प्रदान करते हैं।
