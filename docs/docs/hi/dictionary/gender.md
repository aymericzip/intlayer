---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: लिंग-आधारित सामग्री
description: जानें कि Intlayer में लिंग-आधारित सामग्री का उपयोग कैसे करें ताकि लिंग के आधार पर सामग्री को गतिशील रूप से प्रदर्शित किया जा सके। इस दस्तावेज़ का पालन करें ताकि आप अपने प्रोजेक्ट में लिंग-विशिष्ट सामग्री को प्रभावी ढंग से लागू कर सकें।
keywords:
  - लिंग-आधारित सामग्री
  - गतिशील रेंडरिंग
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: लिंग आधारित सामग्री पेश की गई
---

# लिंग-आधारित सामग्री / Intlayer में लिंग

## लिंग कैसे काम करता है

Intlayer में, लिंग-आधारित सामग्री `gender` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो विशिष्ट लिंग मानों ('male', 'female') को उनके संबंधित सामग्री से मैप करता है। यह तरीका आपको दिए गए लिंग के आधार पर सामग्री को गतिशील रूप से चुनने में सक्षम बनाता है। जब इसे React Intlayer या Next Intlayer के साथ एकीकृत किया जाता है, तो रनटाइम पर प्रदान किए गए लिंग के अनुसार उपयुक्त सामग्री स्वचालित रूप से चुनी जाती है।

## लिंग-आधारित सामग्री सेटअप करना

अपने Intlayer प्रोजेक्ट में लिंग-आधारित सामग्री सेटअप करने के लिए, एक सामग्री मॉड्यूल बनाएं जिसमें आपके लिंग-विशिष्ट परिभाषाएँ शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री",
      female: "महिला उपयोगकर्ताओं के लिए मेरी सामग्री",
      fallback: "जब लिंग निर्दिष्ट नहीं होता है तो मेरी सामग्री", // वैकल्पिक
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री",
      female: "महिला उपयोगकर्ताओं के लिए मेरी सामग्री",
      fallback: "जब लिंग निर्दिष्ट नहीं होता है तो मेरी सामग्री", // वैकल्पिक
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री",
      female: "महिला उपयोगकर्ताओं के लिए मेरी सामग्री",
      fallback: "जब लिंग निर्दिष्ट नहीं होता है तो मेरी सामग्री", // वैकल्पिक
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री",
        "female": "महिला उपयोगकर्ताओं के लिए मेरी सामग्री",
        "fallback": "जब लिंग निर्दिष्ट नहीं होता है तो मेरी सामग्री", // वैकल्पिक
      },
    },
  },
}
```

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो अंतिम घोषित कुंजी को फॉलबैक के रूप में लिया जाएगा यदि लिंग निर्दिष्ट नहीं है या किसी परिभाषित लिंग से मेल नहीं खाता है।

## React Intlayer के साथ लिंग-आधारित सामग्री का उपयोग करना

React घटक के भीतर लिंग-आधारित सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक को आयात करें और उपयोग करें। यह हुक निर्दिष्ट कुंजी के लिए सामग्री प्राप्त करता है और आपको उपयुक्त आउटपुट चुनने के लिए लिंग पास करने की अनुमति देता है।

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री */
          myGender("male")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे महिला उपयोगकर्ताओं के लिए सामग्री */
          myGender("female")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे पुरुष उपयोगकर्ताओं के लिए सामग्री */
          myGender("m")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे महिला उपयोगकर्ताओं के लिए सामग्री */
          myGender("f")
        }
      </p>
      <p>
        {
          /* आउटपुट: जब लिंग निर्दिष्ट नहीं होता है तब मेरी सामग्री */
          myGender("")
        }
      </p>
      <p>
        {
          /* आउटपुट: जब लिंग निर्दिष्ट नहीं होता है तब मेरी सामग्री */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: मेरे पुरुष उपयोगकर्ताओं के लिए सामग्री */
          myGender("male")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे महिला उपयोगकर्ताओं के लिए सामग्री */
          myGender("female")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे पुरुष उपयोगकर्ताओं के लिए सामग्री */
          myGender("m")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे महिला उपयोगकर्ताओं के लिए सामग्री */
          myGender("f")
        }
      </p>
      <p>
        {
          /* आउटपुट: जब लिंग निर्दिष्ट नहीं होता है तब मेरी सामग्री */
          myGender("")
        }
      </p>
      <p>
        {
          /* आउटपुट: जब लिंग निर्दिष्ट नहीं होता है तब मेरी सामग्री */
          /* आउटपुट: मेरे पुरुष उपयोगकर्ताओं के लिए सामग्री */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: मेरे पुरुष उपयोगकर्ताओं के लिए सामग्री */
          myGender("male")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी महिला उपयोगकर्ताओं के लिए सामग्री */
          myGender("female")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरे पुरुष उपयोगकर्ताओं के लिए सामग्री */
          myGender("m")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी महिला उपयोगकर्ताओं के लिए सामग्री */
          myGender("f")
        }
      </p>
      <p>
        {
          /* आउटपुट: जब लिंग निर्दिष्ट नहीं किया गया हो तो मेरी सामग्री */
          myGender("")
        }
      </p>
      <p>
        {
          /* आउटपुट: जब लिंग निर्दिष्ट नहीं किया गया हो तो मेरी सामग्री */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और फ्रेमवर्क्स में Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।
