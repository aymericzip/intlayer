# मार्कडाउन / रिच टेक्स्ट सामग्री

## मार्कडाउन कैसे काम करता है

Intlayer मार्कडाउन सिंटैक्स का उपयोग करके परिभाषित रिच टेक्स्ट सामग्री का समर्थन करता है। यह `md` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो एक मार्कडाउन स्ट्रिंग को एक प्रारूप में परिवर्तित करता है जिसे Intlayer द्वारा प्रबंधित किया जा सकता है। मार्कडाउन का उपयोग करके, आप आसानी से ब्लॉग, लेख और अन्य सामग्री को रिच फॉर्मेटिंग के साथ लिख और प्रबंधित कर सकते हैं।

[Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) और [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) दोनों मार्कडाउन सामग्री प्रबंधन का समर्थन करते हैं।

React एप्लिकेशन के साथ एकीकृत होने पर, आप मार्कडाउन सामग्री को HTML में रेंडर करने के लिए एक मार्कडाउन रेंडरिंग प्रोवाइडर (जैसे [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) का उपयोग कर सकते हैं। यह आपको मार्कडाउन में सामग्री लिखने की अनुमति देता है जबकि यह सुनिश्चित करता है कि यह आपके ऐप में सही ढंग से प्रदर्शित हो।

## मार्कडाउन सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में मार्कडाउन सामग्री सेट करने के लिए, `md` फ़ंक्शन का उपयोग करने वाला एक सामग्री शब्दकोश परिभाषित करें।

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// मार्कडाउन सामग्री का उदाहरण
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

## (बहुभाषी) `.md` फ़ाइल आयात करना

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// यह घोषणा TypeScript को Markdown (.md) फ़ाइलों को मॉड्यूल के रूप में पहचानने और आयात करने की अनुमति देती है।
// इसके बिना, TypeScript Markdown फ़ाइलों को आयात करने का प्रयास करते समय त्रुटि देगा,
// क्योंकि यह गैर-कोड फ़ाइल आयातों का मूल रूप से समर्थन नहीं करता है।

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      hi: md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      hi: md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      hi: md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - बाहरी Markdown फ़ाइलों (.md) को केवल JS या TS घोषणा फ़ाइलों का उपयोग करके आयात करना संभव है।
// - बाहरी Markdown सामग्री को केवल JS या TS घोषणा फ़ाइलों का उपयोग करके प्राप्त करना संभव है।

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "hi": {
          "nodeType": "markdown",
          "markdown": "# मेरा Markdown\n\nयह एक Markdown सामग्री है।",
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

React एप्लिकेशन में मार्कडाउन सामग्री को रेंडर करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक और एक मार्कडाउन रेंडरिंग प्रोवाइडर का उपयोग कर सकते हैं। इस उदाहरण में, हम मार्कडाउन को HTML में परिवर्तित करने के लिए [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) पैकेज का उपयोग करते हैं।

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
```

module.exports = {
AppProvider,
};

````

इस कार्यान्वयन में:

- `MarkdownProvider` एप्लिकेशन (या इसके संबंधित भाग) को लपेटता है और एक `renderMarkdown` फ़ंक्शन स्वीकार करता है। इस फ़ंक्शन का उपयोग `markdown-to-jsx` पैकेज का उपयोग करके Markdown स्ट्रिंग्स को JSX में बदलने के लिए किया जाता है।
- `useIntlayer` हुक का उपयोग डिक्शनरी से कुंजी `"app"` के साथ Markdown सामग्री (`myMarkdownContent`) प्राप्त करने के लिए किया जाता है।
- Markdown सामग्री को सीधे घटक में प्रस्तुत किया जाता है, और Markdown रेंडरिंग को प्रोवाइडर द्वारा संभाला जाता है।

### Next Intlayer के साथ Markdown का उपयोग करना

`next-intlayer` पैकेज का उपयोग करते हुए कार्यान्वयन ऊपर दिए गए समान है। केवल अंतर यह है कि `renderMarkdown` फ़ंक्शन को एक क्लाइंट घटक में `MarkdownProvider` घटक को पास किया जाना चाहिए।

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
````

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## अतिरिक्त संसाधन

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)
- [markdown-to-jsx npm पर](https://www.npmjs.com/package/markdown-to-jsx)

ये संसाधन विभिन्न सामग्री प्रकारों और फ्रेमवर्क्स के साथ Intlayer को सेटअप और उपयोग करने में और अधिक जानकारी प्रदान करते हैं।
