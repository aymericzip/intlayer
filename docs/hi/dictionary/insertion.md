---
docName: dictionary__insertion
url: https://intlayer.org/doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: प्रविष्टि
description: अपने सामग्री में प्रविष्टि प्लेसहोल्डर को कैसे घोषित और उपयोग करें, यह जानें। यह दस्तावेज़ आपको पहले से परिभाषित सामग्री संरचनाओं में मानों को गतिशील रूप से सम्मिलित करने के चरणों के माध्यम से मार्गदर्शन करता है।
keywords:
  - प्रविष्टि
  - गतिशील सामग्री
  - प्लेसहोल्डर
  - Intlayer
  - Next.js
  - जावास्क्रिप्ट
  - React
---

# सामग्री सम्मिलन / Insertion in Intlayer

## सम्मिलन कैसे कार्य करता है

Intlayer में, सामग्री सम्मिलन `insertion` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो स्ट्रिंग में प्लेसहोल्डर फ़ील्ड्स (जैसे `{{name}}` या `{{age}}`) की पहचान करता है जिन्हें रनटाइम पर डायनामिक रूप से बदला जा सकता है। यह दृष्टिकोण आपको लचीले, टेम्पलेट-जैसे स्ट्रिंग्स बनाने की अनुमति देता है, जहां सामग्री के विशिष्ट भाग आपके एप्लिकेशन से पास किए गए डेटा द्वारा निर्धारित होते हैं।

React Intlayer या Next Intlayer के साथ एकीकृत होने पर, आप प्रत्येक प्लेसहोल्डर के लिए मानों को शामिल करने वाला डेटा ऑब्जेक्ट प्रदान कर सकते हैं, और Intlayer स्वचालित रूप से प्लेसहोल्डर को बदले हुए सामग्री को रेंडर करेगा।

## सामग्री सम्मिलन सेट करना

अपने Intlayer प्रोजेक्ट में सामग्री सम्मिलन सेट करने के लिए, एक सामग्री मॉड्यूल बनाएं जिसमें आपके सम्मिलन परिभाषाएँ शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "नमस्ते, मेरा नाम {{name}} है और मैं {{age}} साल का हूँ!"
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
      "नमस्ते, मेरा नाम {{name}} है और मैं {{age}} साल का हूँ!"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "नमस्ते, मेरा नाम {{name}} है और मैं {{age}} साल का हूँ!"
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
      "insertion": "नमस्ते, मेरा नाम {{name}} है और मैं {{age}} साल का हूँ!",
    },
  },
}
```

## React Intlayer के साथ सामग्री सम्मिलन का उपयोग करना

React कंपोनेंट के भीतर सामग्री सम्मिलन का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक को आयात और उपयोग करें। यह हुक निर्दिष्ट कुंजी के लिए सामग्री प्राप्त करता है और आपको एक ऑब्जेक्ट पास करने की अनुमति देता है जो आपकी सामग्री में प्रत्येक प्लेसहोल्डर को उस मान से मैप करता है जिसे आप प्रदर्शित करना चाहते हैं।

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: "नमस्ते, मेरा नाम John है और मैं 30 साल का हूँ!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* आप विभिन्न मानों के साथ एक ही सम्मिलन का पुन: उपयोग कर सकते हैं */
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
          /* आउटपुट: "नमस्ते, मेरा नाम John है और मैं 30 साल का हूँ!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* आप विभिन्न मानों के साथ एक ही सम्मिलन का पुन: उपयोग कर सकते हैं */
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
          /* आउटपुट: "नमस्ते, मेरा नाम John है और मैं 30 साल का हूँ!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* आप विभिन्न मानों के साथ एक ही सम्मिलन का पुन: उपयोग कर सकते हैं */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और फ्रेमवर्क्स में Intlayer की सेटअप और उपयोग पर और अधिक जानकारी प्रदान करते हैं।
