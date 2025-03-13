# محتوى Markdown / النصوص الغنية

## كيفية عمل Markdown

يدعم Intlayer محتوى النصوص الغنية الذي يتم تعريفه باستخدام صيغة Markdown. يتم تحقيق ذلك من خلال وظيفة `md`، التي تحول سلسلة Markdown إلى صيغة يمكن إدارتها بواسطة Intlayer. باستخدام Markdown، يمكنك بسهولة كتابة وصيانة المحتوى بتنسيق غني، مثل المدونات، المقالات، والمزيد.

[محرر Intlayer المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) و [نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md) يدعمان إدارة محتوى Markdown.

عند التكامل مع تطبيق React، يمكنك استخدام مزود عرض Markdown (مثل [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) لعرض محتوى Markdown كـ HTML. يتيح لك ذلك كتابة المحتوى بصيغة Markdown مع ضمان عرضه بشكل صحيح في تطبيقك.

## إعداد محتوى Markdown

لإعداد محتوى Markdown في مشروع Intlayer الخاص بك، قم بتعريف قاموس محتوى يستخدم وظيفة `md`.

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

## استيراد ملف `.md` (متعدد اللغات)

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// هذا التصريح يسمح لـ TypeScript بالتعرف على ملفات Markdown (.md) واستيرادها كـ وحدات.
// بدون هذا، سيقوم TypeScript بإظهار خطأ عند محاولة استيراد ملفات Markdown،
// حيث أنه لا يدعم استيراد الملفات غير البرمجية بشكل افتراضي.

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
      ar: md(markdown_ar),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      md(import("./myMarkdown.md").then((module) => module.default))
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
      ar: md(markdown_ar),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      md(import("./myMarkdown.md").then((module) => module.default))
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
      ar: md(markdown_ar),
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
// - استيراد ملفات Markdown الخارجية (.md) ممكن فقط باستخدام ملفات JS أو TS.
// - جلب محتوى Markdown الخارجي ممكن فقط باستخدام ملفات JS أو TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "ar": {
          "nodeType": "markdown",
          "markdown": "# Markdown الخاص بي\n\nهذا هو محتوى Markdown.",
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
```

module.exports = {
AppProvider,
};

````

في هذا التنفيذ:

- يقوم `MarkdownProvider` بتغليف التطبيق (أو الجزء ذي الصلة منه) ويقبل دالة `renderMarkdown`. تُستخدم هذه الدالة لتحويل النصوص المكتوبة بـ Markdown إلى JSX باستخدام حزمة `markdown-to-jsx`.
- يتم استخدام الخطاف `useIntlayer` لاسترداد محتوى Markdown (`myMarkdownContent`) من القاموس باستخدام المفتاح `"app"`.
- يتم عرض محتوى Markdown مباشرة في المكون، ويتم التعامل مع عرض Markdown بواسطة المزود.

### استخدام Markdown مع Next Intlayer

يشبه التنفيذ باستخدام حزمة `next-intlayer` التنفيذ أعلاه. الاختلاف الوحيد هو أن دالة `renderMarkdown` يجب أن تُمرر إلى مكون `MarkdownProvider` في مكون العميل.

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

## موارد إضافية

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)
- [markdown-to-jsx على npm](https://www.npmjs.com/package/markdown-to-jsx)

توفر هذه الموارد مزيدًا من المعلومات حول إعداد واستخدام Intlayer مع أنواع المحتوى المختلفة والأطر.
