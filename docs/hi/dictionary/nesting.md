# नेस्टिंग / उप सामग्री संदर्भ

## नेस्टिंग कैसे कार्य करता है

Intlayer में, नेस्टिंग `nest` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो आपको दूसरी डिक्शनरी की सामग्री को संदर्भित करने और पुन: उपयोग करने की अनुमति देता है। सामग्री को डुप्लिकेट करने के बजाय, आप उसकी कुंजी द्वारा मौजूदा सामग्री मॉड्यूल की ओर संकेत कर सकते हैं।

## नेस्टिंग सेट अप करना

अपने Intlayer प्रोजेक्ट में नेस्टिंग को सेट करने के लिए, पहले आप आधार सामग्री को परिभाषित करते हैं जिसे आप पुन: उपयोग करना चाहते हैं। फिर, एक अलग सामग्री मॉड्यूल में, आप उस सामग्री को आयात करने के लिए `nest` फ़ंक्शन का उपयोग करते हैं।

### बेस डिक्शनरी

नीचे नेस्टेड सामग्री के साथ एक आधार डिक्शनरी का उदाहरण दिया गया है:

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

### Nest के साथ संदर्भ

अब एक अन्य सामग्री मॉड्यूल बनाएँ जो उपरोक्त सामग्री को संदर्भित करने के लिए `nest` फ़ंक्शन का उपयोग करता है। आप पूरे सामग्री या एक विशिष्ट नेस्टेड मान का संदर्भ दे सकते हैं:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // पूरी डिक्शनरी का संदर्भ देता है:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // एक विशिष्ट नेस्टेड मान का संदर्भ देता है:
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

दूसरे पैरामीटर के रूप में, आप उस सामग्री के भीतर एक नेस्टेड मान के पथ को निर्दिष्ट कर सकते हैं। जब कोई पथ प्रदान नहीं किया जाता है, तो संदर्भित डिक्शनरी की पूरी सामग्री लौटा दी जाती है।

## React Intlayer के साथ नेस्टिंग का उपयोग करना

React कंपोनेंट में नेस्टेड सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक का उपयोग करें। यह हुक विशिष्ट कुंजी के आधार पर सही सामग्री पुनः प्राप्त करता है। इसका उपयोग करने का एक उदाहरण यहां दिया गया है:

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

संरचना और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI डाक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer डाक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer डाक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न एंवायरमेंट्स और कई फ्रेमवर्क्स में Intlayer की सेटअप और उपयोग के बारे में और भी जानकारी प्रदान करते हैं।
