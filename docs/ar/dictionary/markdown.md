# Markdown / محتوى النصوص الغنية

## كيف يعمل Markdown

يدعم Intlayer محتوى النصوص الغنية الذي يتم تعريفه باستخدام صيغة Markdown. يتم تحقيق ذلك من خلال وظيفة `md`، التي تحول سلسلة Markdown إلى تنسيق يمكن إدارته بواسطة Intlayer. باستخدام Markdown، يمكنك بسهولة كتابة وصيانة محتوى بتنسيق غني، مثل المدونات، المقالات، والمزيد.

[محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) و [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md) يدعمان إدارة محتوى Markdown.

عند دمجه مع تطبيق React، يمكنك استخدام مزود عرض Markdown (مثل [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) لتحويل محتوى Markdown إلى HTML. يتيح لك ذلك كتابة المحتوى باستخدام Markdown مع ضمان عرضه بشكل صحيح في تطبيقك.

## إعداد محتوى Markdown

لإعداد محتوى Markdown في مشروع Intlayer الخاص بك، قم بتعريف قاموس محتوى يستخدم وظيفة `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// تعريف قاموس محتوى Markdown
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
// تعريف قاموس محتوى Markdown
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
// تعريف قاموس محتوى Markdown
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

## استخدام Markdown مع React Intlayer

لعرض محتوى Markdown في تطبيق React، يمكنك الاستفادة من الخطاف `useIntlayer` من حزمة `react-intlayer` مع مزود عرض Markdown. في هذا المثال، نستخدم حزمة [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) لتحويل Markdown إلى HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// تعريف محتوى التطبيق
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// مزود التطبيق
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

// تعريف محتوى التطبيق
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// مزود التطبيق
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

// تعريف محتوى التطبيق
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// مزود التطبيق
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

في هذا التنفيذ:

- يقوم `MarkdownProvider` بتغليف التطبيق (أو الجزء ذي الصلة منه) ويقبل وظيفة `renderMarkdown`. تُستخدم هذه الوظيفة لتحويل سلاسل Markdown إلى JSX باستخدام حزمة `markdown-to-jsx`.
- يتم استخدام الخطاف `useIntlayer` لاسترداد محتوى Markdown (`myMarkdownContent`) من القاموس باستخدام المفتاح `"app"`.
- يتم عرض محتوى Markdown مباشرة في المكون، ويتم التعامل مع عرض Markdown بواسطة المزود.

## موارد إضافية

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)
- [markdown-to-jsx على npm](https://www.npmjs.com/package/markdown-to-jsx)

توفر هذه الموارد مزيدًا من المعلومات حول إعداد واستخدام Intlayer مع أنواع المحتوى المختلفة والأطر.
