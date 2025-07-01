---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: सम्मिलन
description: अपने कंटेंट में सम्मिलन प्लेसहोल्डर को घोषित करने और उपयोग करने का तरीका सीखें। यह दस्तावेज़ आपको पूर्वनिर्धारित कंटेंट संरचनाओं के भीतर गतिशील रूप से मान सम्मिलित करने के चरणों के माध्यम से मार्गदर्शन करता है।
keywords:
  - सम्मिलन
  - गतिशील कंटेंट
  - प्लेसहोल्डर
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
---

# सम्मिलन कंटेंट / Intlayer में सम्मिलन

## सम्मिलन कैसे काम करता है

Intlayer में, सम्मिलन कंटेंट `insertion` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो एक स्ट्रिंग में प्लेसहोल्डर फ़ील्ड्स (जैसे `{{name}}` या `{{age}}`) की पहचान करता है जिन्हें रनटाइम पर गतिशील रूप से बदला जा सकता है। यह तरीका आपको लचीले, टेम्पलेट-जैसे स्ट्रिंग्स बनाने की अनुमति देता है जहाँ कंटेंट के विशिष्ट भाग आपके एप्लिकेशन से पास किए गए डेटा द्वारा निर्धारित होते हैं।

जब इसे React Intlayer या Next Intlayer के साथ एकीकृत किया जाता है, तो आप बस प्रत्येक प्लेसहोल्डर के लिए मानों वाला डेटा ऑब्जेक्ट प्रदान कर सकते हैं, और Intlayer स्वचालित रूप से प्लेसहोल्डर को बदले हुए कंटेंट को रेंडर करेगा।

## सम्मिलन कंटेंट सेटअप करना

अपने Intlayer प्रोजेक्ट में सम्मिलन कंटेंट सेटअप करने के लिए, एक कंटेंट मॉड्यूल बनाएं जिसमें आपके सम्मिलन परिभाषाएँ शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "नमस्ते, मेरा नाम {{name}} है और मेरी उम्र {{age}} वर्ष है!"
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "नमस्ते, मेरा नाम {{name}} है और मेरी उम्र {{age}} वर्ष है!"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "नमस्ते, मेरा नाम {{name}} है और मेरी उम्र {{age}} वर्ष है!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "नमस्ते, मेरा नाम {{name}} है और मेरी उम्र {{age}} वर्ष है!",
    },
  },
}
```

## React Intlayer के साथ Insertion Content का उपयोग करना

React कंपोनेंट के भीतर insertion content का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक को इम्पोर्ट करें और उपयोग करें। यह हुक निर्दिष्ट key के लिए content प्राप्त करता है और आपको एक ऑब्जेक्ट पास करने की अनुमति देता है जो आपके content में प्रत्येक placeholder को उस मान से मैप करता है जिसे आप प्रदर्शित करना चाहते हैं।

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: "नमस्ते, मेरा नाम John है और मेरी उम्र 30 वर्ष है!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* आप विभिन्न मानों के साथ एक ही insertion को पुनः उपयोग कर सकते हैं */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: "नमस्ते, मेरा नाम जॉन है और मेरी उम्र 30 साल है!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* आप विभिन्न मानों के साथ एक ही insertion को पुनः उपयोग कर सकते हैं */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: "नमस्ते, मेरा नाम जॉन है और मेरी उम्र 30 साल है!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* आप विभिन्न मानों के साथ एक ही insertion को पुनः उपयोग कर सकते हैं */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और फ्रेमवर्क में Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
