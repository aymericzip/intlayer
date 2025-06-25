---
docName: dictionary__function_fetching
url: /doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: फंक्शन फेचिंग
description: अपने बहुभाषी वेबसाइट में फ़ंक्शन फ़ेचिंग को घोषित करने और उपयोग करने का तरीका जानें। अपने प्रोजेक्ट को कुछ ही मिनटों में सेट अप करने के लिए इस ऑनलाइन डोक्यूमेंटेशन में चरणों का पालन करें।
keywords:
  - फंक्शन फेचिंग
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# फ़ंक्शन फ़ेचिंग

Intlayer आपको अपने सामग्री मॉड्यूल्स में सामग्री फ़ंक्शन्स घोषित करने की अनुमति देता है, जो या तो सिंक्रोनस या असिंक्रोनस हो सकते हैं। जब एप्लिकेशन बनता है, Intlayer इन फ़ंक्शन्स को निष्पादित करता है ताकि फ़ंक्शन का परिणाम प्राप्त किया जा सके। रिटर्न वैल्यू JSON ऑब्जेक्ट या एक साधारण मान जैसे स्ट्रिंग या नंबर होना चाहिए।

> चेतावनी: फ़ंक्शन फ़ेचिंग वर्तमान में JSON सामग्री घोषणा और दूरस्थ सामग्री घोषणा फ़ाइलों में उपलब्ध नहीं है।

## फ़ंक्शन घोषणाएँ

यहाँ एक साधारण सिंक्रोनस फ़ंक्शन फ़ेचिंग सामग्री का उदाहरण दिया गया है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है"
  }
}
```

इस उदाहरण में, `text` कुंजी में एक फ़ंक्शन है जो एक स्ट्रिंग लौटाता है। इस सामग्री को आपके React घटकों में Intlayer के इंटरप्रेटर पैकेज जैसे `react-intlayer` का उपयोग करके प्रस्तुत किया जा सकता है।

## असिंक्रोनस फ़ंक्शन फ़ेचिंग

सिंक्रोनस फ़ंक्शन्स के अलावा, Intlayer असिंक्रोनस फ़ंक्शन्स का समर्थन करता है, जिससे आप बाहरी स्रोतों से डेटा फ़ेच कर सकते हैं या मॉक डेटा के साथ डेटा पुनर्प्राप्ति का अनुकरण कर सकते हैं।

नीचे एक असिंक्रोनस फ़ंक्शन का उदाहरण दिया गया है जो सर्वर फ़ेच का अनुकरण करता है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // सर्वर से फ़ेच का अनुकरण करने के लिए 200ms प्रतीक्षा करें
  return await setTimeout(200).then(() => "यह सामग्री सर्वर से फ़ेच की गई है");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // सर्वर से फ़ेच का अनुकरण करने के लिए 200ms प्रतीक्षा करें
  await setTimeout(200);
  return "यह सामग्री सर्वर से फ़ेच की गई है";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // सर्वर से फ़ेच का अनुकरण करने के लिए 200ms प्रतीक्षा करें
  await setTimeout(200);
  return "यह सामग्री सर्वर से फ़ेच की गई है";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSON फ़ाइल से सामग्री फ़ेच करने का कोई तरीका नहीं है, इसके बजाय .ts या .js फ़ाइल का उपयोग करें
```

इस मामले में, `fakeFetch` फ़ंक्शन एक विलंब का अनुकरण करता है ताकि सर्वर प्रतिक्रिया समय का अनुकरण किया जा सके। Intlayer असिंक्रोनस फ़ंक्शन को निष्पादित करता है और `text` कुंजी के लिए सामग्री के रूप में परिणाम का उपयोग करता है।

## React घटकों में फ़ंक्शन-आधारित सामग्री का उपयोग करना

React घटक में फ़ंक्शन-आधारित सामग्री का उपयोग करने के लिए, आपको `react-intlayer` से `useIntlayer` आयात करने और सामग्री आईडी के साथ इसे कॉल करने की आवश्यकता है ताकि सामग्री पुनर्प्राप्त की जा सके। यहाँ एक उदाहरण है:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* आउटपुट: यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सामग्री सर्वर से फ़ेच की गई है */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* आउटपुट: यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सामग्री सर्वर से फ़ेच की गई है */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* आउटपुट: यह सामग्री एक फ़ंक्शन द्वारा प्रस्तुत की गई है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सामग्री सर्वर से फ़ेच की गई है */}
    </div>
  );
};

module.exports = MyComponent;
```
