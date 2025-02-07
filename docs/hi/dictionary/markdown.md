# मार्कडाउन / रिच टेक्स्ट सामग्री

## मार्कडाउन कैसे काम करता है

Intlayer मार्कडाउन सिंटैक्स के साथ परिभाषित रिच टेक्स्ट सामग्री का समर्थन करता है। यह `md` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो एक मार्कडाउन स्ट्रिंग को Intlayer द्वारा प्रबंधित किए जा सकने वाले प्रारूप में परिवर्तित करता है। मार्कडाउन का उपयोग करके, आप ब्लॉग, लेख और अधिक जैसी रिच फॉर्मेटिंग वाली सामग्री आसानी से लिख और बनाए रख सकते हैं।

[Intlayer विज़ुअल संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) और [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) दोनों मार्कडाउन सामग्री प्रबंधन का समर्थन करते हैं।

React एप्लिकेशन के साथ एकीकृत होने पर, आप Markdown सामग्री को HTML में रेंडर करने के लिए एक मार्कडाउन रेंडरिंग प्रदाता (जैसे [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) का उपयोग कर सकते हैं। यह आपको मार्कडाउन में सामग्री लिखने की अनुमति देता है जबकि यह सुनिश्चित करता है कि आपका ऐप इसे ठीक से प्रदर्शित करता है।

## मार्कडाउन सामग्री सेट अप करना

अपने Intlayer प्रोजेक्ट में मार्कडाउन सामग्री सेट अप करने के लिए, `md` फ़ंक्शन का उपयोग करने वाला एक सामग्री शब्दकोश परिभाषित करें।

### TypeScript उदाहरण

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// निम्नलिखित शब्दकोश ऐप के लिए मार्कडाउन सामग्री परिभाषित करता है
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### JavaScript (ESM) उदाहरण

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

// यह शब्दकोश ऐप की सामग्री को परिभाषित करता है
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### CommonJS उदाहरण

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

// ऐप सामग्री का कॉमन्सजेएस स्वरूप
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### JSON उदाहरण

JSON का उपयोग करते समय, मार्कडाउन सामग्री को `nodeType` (उदा., `"markdown"`) सेट करके और मार्कडाउन स्ट्रिंग प्रदान करके परिभाषित किया जाता है। उदाहरण के लिए:

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## My title \n\nLorem Ipsum"
    }
  }
}
```

## React Intlayer के साथ मार्कडाउन का उपयोग करना

React एप्लिकेशन में मार्कडाउन सामग्री रेंडर करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक और एक मार्कडाउन रेंडरिंग प्रदाता का उपयोग कर सकते हैं। इस उदाहरण में, हम [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) पैकेज का उपयोग करते हैं जो मार्कडाउन को HTML में परिवर्तित करता है।

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

// एप्लिकेशन की सामग्री को परिभाषित करने वाला घटक
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      // मार्कडाउन को JSX में परिवर्तित करने के लिए उपयोग किया जाने वाला रेंडरिंग फ़ंक्शन
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
```

इस कार्यान्वयन में:

- `MarkdownProvider` एप्लिकेशन (या इसके प्रासंगिक हिस्से) को रैप करता है और एक `renderMarkdown` फ़ंक्शन स्वीकार करता है। इस फ़ंक्शन का उपयोग `markdown-to-jsx` पैकेज का उपयोग करके मार्कडाउन स्ट्रिंग्स को JSX में परिवर्तित करने के लिए किया जाता है।
- `useIntlayer` हुक का उपयोग शब्दकोश से मार्कडाउन सामग्री (`myMarkdownContent`) को प्राप्त करने के लिए किया जाता है, जिसकी कुंजी `"app"` है।
- घटक में सीधे मार्कडाउन सामग्री रेंडर की जाती है, और मार्कडाउन रेंडरिंग प्रदाता द्वारा संभाली जाती है।

## अतिरिक्त स्रोत

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)
- [npm पर markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)

ये संसाधन विभिन्न सामग्री प्रकारों और फ्रेमवर्क्स के साथ Intlayer सेट अप और उपयोग करने की अधिक जानकारी प्रदान करते हैं।
