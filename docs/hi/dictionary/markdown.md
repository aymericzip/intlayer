# Markdown / रिच टेक्स्ट सामग्री

## Markdown कैसे काम करता है

Intlayer Markdown सिंटैक्स का उपयोग करके परिभाषित रिच टेक्स्ट सामग्री का समर्थन करता है। यह `md` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो एक Markdown स्ट्रिंग को एक प्रारूप में परिवर्तित करता है जिसे Intlayer द्वारा प्रबंधित किया जा सकता है। Markdown का उपयोग करके, आप आसानी से रिच फॉर्मेटिंग के साथ सामग्री लिख और बनाए रख सकते हैं, जैसे ब्लॉग, लेख, और अधिक।

[Intlayer विज़ुअल संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) और [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) दोनों Markdown सामग्री प्रबंधन का समर्थन करते हैं।

React एप्लिकेशन के साथ एकीकृत होने पर, आप Markdown सामग्री को HTML में रेंडर करने के लिए एक Markdown रेंडरिंग प्रोवाइडर (जैसे [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) का उपयोग कर सकते हैं। यह आपको Markdown में सामग्री लिखने की अनुमति देता है जबकि यह सुनिश्चित करता है कि यह आपके ऐप में सही ढंग से प्रदर्शित हो।

## Markdown सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में Markdown सामग्री सेट करने के लिए, `md` फ़ंक्शन का उपयोग करने वाला एक सामग्री शब्दकोश परिभाषित करें।

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// हिन्दी में टिप्पणी: Markdown सामग्री को परिभाषित करता है
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

// हिन्दी में टिप्पणी: Markdown सामग्री को परिभाषित करता है
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

// हिन्दी में टिप्पणी: Markdown सामग्री को परिभाषित करता है
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

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

## React Intlayer के साथ Markdown का उपयोग करना

React एप्लिकेशन में Markdown सामग्री को रेंडर करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक और एक Markdown रेंडरिंग प्रोवाइडर का उपयोग कर सकते हैं। इस उदाहरण में, हम Markdown को HTML में परिवर्तित करने के लिए [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) पैकेज का उपयोग करते हैं।

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// हिन्दी में टिप्पणी: एप्लिकेशन सामग्री को परिभाषित करता है
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// हिन्दी में टिप्पणी: MarkdownProvider का उपयोग करता है
export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// हिन्दी में टिप्पणी: एप्लिकेशन सामग्री को परिभाषित करता है
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// हिन्दी में टिप्पणी: MarkdownProvider का उपयोग करता है
export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

// हिन्दी में टिप्पणी: एप्लिकेशन सामग्री को परिभाषित करता है
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// हिन्दी में टिप्पणी: MarkdownProvider का उपयोग करता है
AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

इस कार्यान्वयन में:

- `MarkdownProvider` एप्लिकेशन (या इसके प्रासंगिक हिस्से) को लपेटता है और एक `renderMarkdown` फ़ंक्शन स्वीकार करता है। यह फ़ंक्शन Markdown स्ट्रिंग्स को JSX में परिवर्तित करने के लिए `markdown-to-jsx` पैकेज का उपयोग करता है।
- `useIntlayer` हुक का उपयोग शब्दकोश से Markdown सामग्री (`myMarkdownContent`) को पुनः प्राप्त करने के लिए किया जाता है, जिसकी कुंजी `"app"` है।
- Markdown सामग्री को सीधे घटक में रेंडर किया जाता है, और Markdown रेंडरिंग प्रोवाइडर द्वारा संभाली जाती है।

## अतिरिक्त संसाधन

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)
- [npm पर markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)

ये संसाधन विभिन्न सामग्री प्रकारों और फ्रेमवर्क्स के साथ Intlayer को सेटअप और उपयोग करने में और अधिक जानकारी प्रदान करते हैं।
