---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: शब्दकोश नेस्टिंग
description: Intlayer में सामग्री नेस्टिंग का उपयोग करके अपने बहुभाषी सामग्री को कुशलतापूर्वक पुनः उपयोग और संरचित करने का तरीका जानें। इस दस्तावेज़ का पालन करें और नेस्टिंग को अपने प्रोजेक्ट में सहजता से लागू करें।
keywords:
  - Nesting
  - सामग्री पुन: उपयोग
  - प्रलेखन
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
---

# नेस्टिंग / उप सामग्री संदर्भ

## नेस्टिंग कैसे काम करता है

Intlayer में, नेस्टिंग `nest` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो आपको किसी अन्य शब्दकोश से सामग्री को संदर्भित करने और पुन: उपयोग करने की अनुमति देता है। सामग्री को डुप्लिकेट करने के बजाय, आप मौजूदा सामग्री मॉड्यूल को उसकी कुंजी द्वारा इंगित कर सकते हैं।

## नेस्टिंग सेट करना

अपने Intlayer प्रोजेक्ट में नेस्टिंग सेट करने के लिए, पहले आप उस मूल सामग्री को परिभाषित करते हैं जिसे आप पुन: उपयोग करना चाहते हैं। फिर, एक अलग सामग्री मॉड्यूल में, आप उस सामग्री को आयात करने के लिए `nest` फ़ंक्शन का उपयोग करते हैं।

### मूल शब्दकोश

नीचे एक मूल शब्दकोश का उदाहरण दिया गया है जिसे दूसरे शब्दकोश में नेस्ट किया जा सकता है:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### नेस्ट के साथ संदर्भित करना

अब, एक और सामग्री मॉड्यूल बनाएं जो उपरोक्त सामग्री को संदर्भित करने के लिए `nest` फ़ंक्शन का उपयोग करता है। आप पूरी सामग्री या किसी विशिष्ट नेस्टेड मान को संदर्भित कर सकते हैं:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // पूरे शब्दकोश को संदर्भित करता है:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // एक विशिष्ट नेस्टेड मान को संदर्भित करता है:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

दूसरे पैरामीटर के रूप में, आप उस सामग्री के भीतर एक नेस्टेड मान के लिए एक पथ निर्दिष्ट कर सकते हैं। जब कोई पथ प्रदान नहीं किया जाता है, तो संदर्भित शब्दकोश की पूरी सामग्री लौटाई जाती है।

## React Intlayer के साथ नेस्टिंग का उपयोग करना

React कंपोनेंट में नेस्टेड सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक का उपयोग करें। यह हुक निर्दिष्ट कुंजी के आधार पर सही सामग्री प्राप्त करता है। इसका उपयोग करने का एक उदाहरण यहां दिया गया है:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* आउटपुट: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* आउटपुट: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* आउटपुट: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* आउटपुट: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* आउटपुट: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* आउटपुट: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न फ्रेमवर्क्स के साथ Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।
