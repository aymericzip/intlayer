# फ़ंक्शन फ़ेचिंग

## फ़ंक्शन घोषणाएँ

Intlayer आपको अपने सामग्री मॉड्यूल में सामग्री फ़ंक्शन निर्दिष्ट करने की अनुमति देता है, जो या तो समकालिक या असमकालिक हो सकते हैं। जब एप्लिकेशन बनता है, Intlayer इन फ़ंक्शनों को फ़ंक्शन के परिणाम प्राप्त करने के लिए निष्पादित करता है। लौटने वाली मान एक JSON वस्तु या एक साधारण मान जैसे कि एक स्ट्रिंग या संख्या होनी चाहिए।

यहां एक साधारण समकालिक फ़ंक्शन सामग्री फ़ेचिंग का उदाहरण है:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "यह एक फ़ंक्शन द्वारा प्रस्तुत की गई सामग्री है",
  },
} satisfies DeclarationContent;

export default functionContent;
```

इस उदाहरण में, `text` कुंजी में एक फ़ंक्शन है जो एक स्ट्रिंग लौटाता है। इस सामग्री को आप Intlayer के व्याख्याता पैकेज जैसे कि `react-intlayer` का उपयोग करके अपने React कंपोनेंट में प्रस्तुत कर सकते हैं।

## असमकालिक फ़ंक्शन फ़ेचिंग

समकालिक फ़ंक्शनों के अतिरिक्त, Intlayer असमकालिक फ़ंक्शनों का समर्थन करता है, जो आपको बाहरी स्रोतों से डेटा फ़ेच करने या मॉक डेटा के साथ डेटा पुनर्प्राप्ति का अनुकरण करने की अनुमति देता है।

नीचे एक असमकालिक फ़ंक्शन का उदाहरण है जो सर्वर फ़ेच का अनुकरण करता है:

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // सर्वर से फ़ेच का अनुकरण करने के लिए 200ms के लिए प्रतीक्षा करें
  return await setTimeout(200).then(() => "यह सर्वर से फ़ेच की गई सामग्री है");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

इस मामले में, `fakeFetch` फ़ंक्शन एक देरी का अनुकरण करता है ताकि सर्वर द्वारा प्रतिक्रिया समय का अनुकरण किया जा सके। Intlayer असमकालिक फ़ंक्शन को निष्पादित करता है और `text` कुंजी के लिए सामग्री के रूप में परिणाम का उपयोग करता है।

## React कंपोनेंट में फ़ंक्शन-आधारित सामग्री का उपयोग करना

एक React कंपोनेंट में फ़ंक्शन-आधारित सामग्री का उपयोग करने के लिए, आपको `react-intlayer` से `useIntlayer` को आयात करना होगा और इसे सामग्री ID के साथ कॉल करना होगा ताकि आप सामग्री को पुनर्प्राप्त कर सकें। यहां एक उदाहरण है:

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* आउटपुट: यह एक फ़ंक्शन द्वारा प्रस्तुत की गई सामग्री है */}
      <p>{asyncFunctionContent.text}</p>
      {/* आउटपुट: यह सर्वर से फ़ेच की गई सामग्री है */}
    </div>
  );
};

export default MyComponent;
```
