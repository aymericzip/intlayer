# Function Fetching

Intlayer आपको आपके सामग्री मॉड्यूल में सामग्री फ़ंक्शन घोषित करने की अनुमति देता है, जो या तो समकालिक या असमकालिक हो सकते हैं। जब एप्लिकेशन निर्माण होता है, Intlayer इन फ़ंक्शनों को फ़ंक्शन के परिणाम प्राप्त करने के लिए निष्पादित करता है। रिटर्न मान एक JSON ऑब्जेक्ट या एक सरल मान होना चाहिए जैसे स्ट्रिंग या नंबर।

> चेतावनी: फंक्शन फ़ेचिंग वर्तमान में JSON सामग्री घोषणा और दूरस्थ सामग्री घोषणाएँ फ़ाइलों में उपलब्ध नहीं है।

## Function Declarations

यहाँ एक सरल समकालिक फ़ंक्शन सामग्री फ़ेचिंग का उदाहरण है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है"
  }
}
```

इस उदाहरण में, `text` कुंजी एक फ़ंक्शन को समाहित करती है जो एक स्ट्रिंग लौटाती है। इस सामग्री को आपके React घटकों में Intlayer के इंटरप्रेटर पैकेजों का उपयोग करके प्रस्तुत किया जा सकता है जैसे `react-intlayer`।

## Asynchronous Function Fetching

समकालिक फ़ंक्शनों के अतिरिक्त, Intlayer असमकालिक फ़ंक्शनों का समर्थन करता है, जिससे आप बाहरी स्रोतों से डेटा प्राप्त कर सकते हैं या मॉक डेटा के साथ डेटा पुनः प्राप्ति का अनुकरण कर सकते हैं।

नीचे एक असमकालिक फ़ंक्शन का उदाहरण है जो एक सर्वर फ़ेच को अनुकरण करता है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // सर्वर से फ़ेच को अनुकरण करने के लिए 200 मिलीसेकंड तक रुकें
  return await setTimeout(200).then(() => "यह सर्वर से प्राप्त सामग्री है");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // सर्वर से फ़ेच को अनुकरण करने के लिए 200 मिलीसेकंड तक रुकें
  await setTimeout(200);
  return "यह सर्वर से प्राप्त सामग्री है";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // सर्वर से फ़ेच को अनुकरण करने के लिए 200 मिलीसेकंड तक रुकें
  await setTimeout(200);
  return "यह सर्वर से प्राप्त सामग्री है";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSON फ़ाइल से सामग्री को फ़ेच करने का कोई तरीका नहीं है, इसके बजाय .ts या .js फ़ाइल का उपयोग करें
```

इस मामले में, `fakeFetch` फ़ंक्शन सर्वर प्रतिक्रिया समय को अनुकरण करने के लिए देरी का अनुकरण करता है। Intlayer असमकालिक फ़ंक्शन को निष्पादित करता है और परिणाम का उपयोग `text` कुंजी के लिए सामग्री के रूप में करता है।

## Using Function-Based Content in React Components

एक React घटक में फ़ंक्शन-आधारित सामग्री का उपयोग करने के लिए, आपको `react-intlayer` से `useIntlayer` आयात करना होगा और इसे सामग्री ID के साथ कॉल करना होगा ताकि सामग्री पुनः प्राप्त की जा सके। यहाँ एक उदाहरण है:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* आउटपुट: यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है */}
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
      {/* आउटपुट: यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है */}
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
      {/* आउटपुट: यह फ़ंक्शन द्वारा प्रस्तुत सामग्री है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सर्वर से प्राप्त सामग्री है */}
    </div>
  );
};

module.exports = MyComponent;
```
