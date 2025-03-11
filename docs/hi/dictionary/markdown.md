## मार्कडाउन कैसे काम करता है

Intlayer मार्कडाउन सिंटैक्स का उपयोग करके परिभाषित रिच टेक्स्ट सामग्री का समर्थन करता है। यह `md` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो एक मार्कडाउन स्ट्रिंग को Intlayer द्वारा प्रबंधित किए जा सकने वाले प्रारूप में परिवर्तित करता है। मार्कडाउन का उपयोग करके, आप आसानी से ब्लॉग, लेख और अन्य सामग्री को रिच फॉर्मेटिंग के साथ लिख और प्रबंधित कर सकते हैं।

[Intlayer विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) और [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) दोनों मार्कडाउन सामग्री प्रबंधन का समर्थन करते हैं।

React एप्लिकेशन के साथ एकीकृत होने पर, आप एक मार्कडाउन रेंडरिंग प्रोवाइडर (जैसे [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) का उपयोग करके मार्कडाउन सामग्री को HTML में रेंडर कर सकते हैं। यह आपको मार्कडाउन में सामग्री लिखने की अनुमति देता है, जबकि यह सुनिश्चित करता है कि यह आपके ऐप में सही ढंग से प्रदर्शित हो।

## मार्कडाउन सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में मार्कडाउन सामग्री सेट करने के लिए, `md` फ़ंक्शन का उपयोग करके एक सामग्री शब्दकोश परिभाषित करें।

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// सामग्री शब्दकोश परिभाषा
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

## बहुभाषी `.md` फ़ाइल आयात करना

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// यह घोषणा TypeScript को Markdown (.md) फ़ाइलों को मॉड्यूल के रूप में पहचानने और आयात करने की अनुमति देती है।
// इसके बिना, TypeScript Markdown फ़ाइलों को आयात करने का प्रयास करते समय त्रुटि देगा,
// क्योंकि यह गैर-कोड फ़ाइल आयातों का मूल रूप से समर्थन नहीं करता है।

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_hi from "./myMarkdown.hi.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      hi: md(markdown_hi),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import markdown_hi from "./myMarkdown.hi.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      hi: md(markdown_hi),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");
const markdown_hi = require("./myMarkdown.hi.md");
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      hi: md(markdown_hi),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// बाहरी Markdown फ़ाइलों (.md) को केवल JS या TS घोषणा फ़ाइलों का उपयोग करके आयात करना संभव है।

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "hi": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "en": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": "# Mon Markdown\n\nC'est un contenu Markdown.",
        },
        "es": {
          "nodeType": "markdown",
          "markdown": "# Mi Markdown\n\nEsto es un contenido Markdown.",
        },
      },
    },
  },
}
```

## React Intlayer के साथ मार्कडाउन का उपयोग करना

React एप्लिकेशन में मार्कडाउन सामग्री को रेंडर करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक और एक मार्कडाउन रेंडरिंग प्रोवाइडर का उपयोग कर सकते हैं। इस उदाहरण में, हम [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) पैकेज का उपयोग करके मार्कडाउन को HTML में परिवर्तित करते हैं।

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

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

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

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

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

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

- `MarkdownProvider` एप्लिकेशन (या इसके प्रासंगिक भाग) को रैप करता है और एक `renderMarkdown` फ़ंक्शन स्वीकार करता है। यह फ़ंक्शन `markdown-to-jsx` पैकेज का उपयोग करके मार्कडाउन स्ट्रिंग्स को JSX में परिवर्तित करता है।
- `useIntlayer` हुक का उपयोग सामग्री शब्दकोश से मार्कडाउन सामग्री (`myMarkdownContent`) को पुनः प्राप्त करने के लिए किया जाता है, जिसकी कुंजी `"app"` है।
- मार्कडाउन सामग्री को सीधे घटक में रेंडर किया जाता है, और मार्कडाउन रेंडरिंग प्रोवाइडर द्वारा प्रबंधित की जाती है।

## अतिरिक्त संसाधन

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)
- [npm पर markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)

ये संसाधन विभिन्न सामग्री प्रकारों और फ्रेमवर्क्स के साथ Intlayer को सेटअप और उपयोग करने में और अधिक जानकारी प्रदान करते हैं।
