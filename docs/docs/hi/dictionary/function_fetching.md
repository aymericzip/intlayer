---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: फ़ंक्शन फ़ेचिंग
description: जानें कि अपनी बहुभाषी वेबसाइट में फ़ंक्शन फ़ेचिंग को कैसे घोषित और उपयोग करें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपना प्रोजेक्ट सेटअप करें।
keywords:
  - फ़ंक्शन फ़ेचिंग
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
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# फ़ंक्शन फ़ेचिंग

Intlayer आपको अपनी सामग्री मॉड्यूल में सामग्री फ़ंक्शन घोषित करने की अनुमति देता है, जो या तो सिंक्रोनस या असिंक्रोनस हो सकते हैं। जब एप्लिकेशन बनता है, तो Intlayer इन फ़ंक्शनों को निष्पादित करता है ताकि फ़ंक्शन का परिणाम प्राप्त किया जा सके। रिटर्न मान एक JSON ऑब्जेक्ट या एक सरल मान होना चाहिए जैसे स्ट्रिंग या नंबर।

> चेतावनी: फ़ंक्शन फ़ेचिंग वर्तमान में JSON सामग्री घोषणा और दूरस्थ सामग्री घोषणा फ़ाइलों में उपलब्ध नहीं है।

## फ़ंक्शन घोषणाएँ

यहाँ एक सरल सिंक्रोनस फ़ंक्शन फ़ेचिंग सामग्री का उदाहरण है:

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

इस उदाहरण में, `text` कुंजी में एक फ़ंक्शन होता है जो एक स्ट्रिंग लौटाता है। इस सामग्री को आप Intlayer के इंटरप्रेटर पैकेज जैसे `react-intlayer` का उपयोग करके अपने React कॉम्पोनेंट्स में प्रस्तुत कर सकते हैं।

## असिंक्रोनस फ़ंक्शन फ़ेचिंग

सिंक्रोनस फ़ंक्शंस के अलावा, Intlayer असिंक्रोनस फ़ंक्शंस का भी समर्थन करता है, जिससे आप बाहरी स्रोतों से डेटा प्राप्त कर सकते हैं या मॉक डेटा के साथ डेटा पुनःप्राप्ति का अनुकरण कर सकते हैं।

नीचे एक असिंक्रोनस फ़ंक्शन का उदाहरण दिया गया है जो सर्वर से डेटा प्राप्त करने का अनुकरण करता है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // सर्वर से डेटा प्राप्त करने का अनुकरण करने के लिए 200ms प्रतीक्षा करें
  return await setTimeout(200).then(
    () => "यह सामग्री सर्वर से प्राप्त की गई है"
  );
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
  // सर्वर से डेटा प्राप्त करने का अनुकरण करने के लिए 200ms प्रतीक्षा करें
  await setTimeout(200);
  return "यह सामग्री सर्वर से प्राप्त की गई है";
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
  // सर्वर से डेटा प्राप्त करने का अनुकरण करने के लिए 200ms प्रतीक्षा करें
  await setTimeout(200);
  return "यह सामग्री सर्वर से प्राप्त की गई है";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSON फ़ाइल से सामग्री प्राप्त करने का कोई तरीका नहीं है, इसके बजाय .ts या .js फ़ाइल का उपयोग करें
```

इस मामले में, `fakeFetch` फ़ंक्शन सर्वर प्रतिक्रिया समय का अनुकरण करने के लिए एक विलंब का अनुकरण करता है। Intlayer असिंक्रोनस फ़ंक्शन को निष्पादित करता है और परिणाम को `text` कुंजी के लिए सामग्री के रूप में उपयोग करता है।

## React घटकों में फ़ंक्शन-आधारित सामग्री का उपयोग करना

React घटक में फ़ंक्शन-आधारित सामग्री का उपयोग करने के लिए, आपको `react-intlayer` से `useIntlayer` आयात करना होगा और सामग्री प्राप्त करने के लिए इसे सामग्री आईडी के साथ कॉल करना होगा। यहाँ एक उदाहरण है:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* आउटपुट: यह एक फ़ंक्शन द्वारा प्रस्तुत सामग्री है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सर्वर से प्राप्त सामग्री है */}
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
      {/* आउटपुट: यह एक फ़ंक्शन द्वारा प्रस्तुत सामग्री है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सर्वर से प्राप्त सामग्री है */}
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
      {/* आउटपुट: यह एक फ़ंक्शन द्वारा प्रस्तुत सामग्री है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सर्वर से प्राप्त सामग्री है */}
    </div>
  );
};

module.exports = MyComponent;
```
