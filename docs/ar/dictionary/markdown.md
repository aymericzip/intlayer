## كيفية عمل Markdown

يدعم Intlayer محتوى النصوص الغنية باستخدام صيغة Markdown. يتم تحقيق ذلك من خلال وظيفة `md`، التي تحول سلسلة Markdown إلى صيغة يمكن إدارتها بواسطة Intlayer. باستخدام Markdown، يمكنك كتابة وصيانة المحتوى بسهولة مع تنسيقات غنية، مثل المدونات، المقالات، والمزيد.

[محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) و [نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md) يدعمان إدارة محتوى Markdown.

عند دمجه مع تطبيق React، يمكنك استخدام مزود عرض Markdown (مثل [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) لتحويل محتوى Markdown إلى HTML. يتيح لك ذلك كتابة المحتوى باستخدام Markdown مع ضمان عرضه بشكل صحيح في تطبيقك.

## إعداد محتوى Markdown

لإعداد محتوى Markdown في مشروع Intlayer الخاص بك، قم بتعريف قاموس محتوى يستخدم وظيفة `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// تعريف محتوى Markdown
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

## استيراد ملف `.md` متعدد اللغات

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// هذا التصريح يسمح لـ TypeScript بالتعرف على ملفات Markdown (.md) واستيرادها كـ modules.
// بدون هذا، سيقوم TypeScript بإظهار خطأ عند محاولة استيراد ملفات Markdown،
// لأنه لا يدعم استيراد الملفات غير البرمجية بشكل افتراضي.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

import markdown_ar from "./myMarkdown.ar.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ar: md(markdown_ar),
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
import markdown_ar from "./myMarkdown.ar.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ar: md(markdown_ar),
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
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ar: md(markdown_ar),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// استيراد ملفات Markdown الخارجية (.md) ممكن فقط باستخدام ملفات JS أو TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "ar": {
          "nodeType": "markdown",
          "markdown": "# Markdown الخاص بي\n\nهذا محتوى Markdown.",
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

## استخدام Markdown مع React Intlayer

لعرض محتوى Markdown في تطبيق React، يمكنك الاستفادة من الخطاف `useIntlayer` من حزمة `react-intlayer` مع مزود عرض Markdown. في هذا المثال، نستخدم حزمة [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) لتحويل Markdown إلى HTML.

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

في هذا التنفيذ:

- يقوم `MarkdownProvider` بتغليف التطبيق (أو الجزء ذي الصلة منه) ويقبل وظيفة `renderMarkdown`. تُستخدم هذه الوظيفة لتحويل سلاسل Markdown إلى JSX باستخدام حزمة `markdown-to-jsx`.
- يتم استخدام الخطاف `useIntlayer` لاسترداد محتوى Markdown (`myMarkdownContent`) من القاموس باستخدام المفتاح `"app"`.
- يتم عرض محتوى Markdown مباشرة في المكون، ويتم التعامل مع عرض Markdown بواسطة المزود.

## موارد إضافية

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)
- [markdown-to-jsx على npm](https://www.npmjs.com/package/markdown-to-jsx)

توفر هذه الموارد مزيدًا من الأفكار حول إعداد واستخدام Intlayer مع أنواع المحتوى المختلفة والأطر.
