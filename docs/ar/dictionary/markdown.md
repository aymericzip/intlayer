# المحتوى النصي الغني باستخدام Markdown

## كيفية عمل Markdown

يدعم Intlayer المحتوى النصي الغني المُعرف باستخدام ترميز Markdown. يتم تحقيق ذلك من خلال وظيفة `md`، التي تحوّل نص Markdown إلى تنسيق يمكن إدارته بواسطة Intlayer. باستخدام Markdown، يمكنك كتابة محتوى ذو تنسيق غني بسهولة وصيانته، مثل المدونات، والمقالات، والمزيد.

[المحرر البصري لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) و [نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md) يدعمان إدارة محتوى Markdown.

عند دمجه مع تطبيق React، يمكنك استخدام مزود عرض لـ Markdown (مثل [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) لتحويل محتوى Markdown إلى HTML. يتيح لك ذلك كتابة محتوى بـ Markdown مع ضمان عرضه بشكل صحيح في تطبيقك.

## إعداد محتوى Markdown

لإعداد محتوى Markdown في مشروع Intlayer الخاص بك، قم بتعريف قاموس المحتوى الذي يستخدم وظيفة `md`.

### مثال TypeScript

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### مثال JavaScript (ESM)

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

### مثال CommonJS

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

### مثال JSON

عند استخدام JSON، يتم تعريف محتوى Markdown من خلال تعيين `nodeType` (على سبيل المثال، `"markdown"`) وتوفير نص Markdown. على سبيل المثال:

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

لإظهار محتوى Markdown في تطبيق React، يمكنك استخدام الخطاف `useIntlayer` من حزمة `react-intlayer` مع مزود عرض Markdown. في هذا المثال، نستخدم حزمة [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) لتحويل Markdown إلى HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

export default App;
```

في هذا التطبيق:

- يقوم `MarkdownProvider` بتغليف التطبيق (أو الجزء الاصطلاحي منه) ويأخذ دالة `renderMarkdown`. تُستخدم هذه الدالة لتحويل نصوص Markdown إلى JSX باستخدام حزمة `markdown-to-jsx`.
- يتم استخدام خطاف `useIntlayer` لاسترجاع محتوى Markdown (`myMarkdownContent`) من القاموس مع المفتاح `"app"`.
- يتم عرض محتوى Markdown مباشرة في المكون، ويتم التعامل مع عرض Markdown بواسطة المزود.

## موارد إضافية

- [وثائق CLI لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)
- [markdown-to-jsx على npm](https://www.npmjs.com/package/markdown-to-jsx)

تقدم هذه الموارد المزيد من الأفكار حول إعداد واستخدام Intlayer مع أنواع مختلفة من المحتوى والإطارات.
