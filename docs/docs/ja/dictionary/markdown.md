---
docName: dictionary__markdown
url: https://intlayer.org/doc/concept/content/markdown
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Markdown
description: Intlayerを使用して多言語ウェブサイトにMarkdownコンテンツを宣言および使用する方法を学びます。このオンラインドキュメントの手順に従って、プロジェクトにMarkdownを簡単に統合しましょう。
keywords:
  - Markdown
  - 国際化
  - 文書
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# マークダウン / リッチテキストコンテンツ

## マークダウンの仕組み

Intlayerは、マークダウン構文を使用して定義されたリッチテキストコンテンツをサポートします。これは、`md`関数を通じて実現され、マークダウン文字列をIntlayerで管理可能な形式に変換します。マークダウンを使用することで、ブログや記事などのリッチなフォーマットを簡単に作成および管理できます。

[Intlayerビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)および[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)は、どちらもマークダウンコンテンツ管理をサポートしています。

Reactアプリケーションと統合する際には、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)のようなマークダウンレンダリングプロバイダーを使用して、マークダウンコンテンツをHTMLにレンダリングできます。これにより、マークダウンでコンテンツを記述しつつ、アプリ内で適切に表示されるようにできます。

## マークダウンコンテンツの設定

Intlayerプロジェクトでマークダウンコンテンツを設定するには、`md`関数を利用するコンテンツ辞書を定義します。

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

## (多言語対応) `.md` ファイルのインポート

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// この宣言により、TypeScriptはMarkdown (.md) ファイルをモジュールとして認識してインポートできるようになります。
// これがないと、TypeScriptはMarkdownファイルのインポート時にエラーをスローします。
// なぜなら、TypeScriptは非コードファイルのインポートをネイティブにはサポートしていないためです。

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
      ja: md(markdown_en),
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
      ja: md(markdown_en),
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
      ja: md(markdown_en),
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
// - 外部Markdownファイル (.md) のインポートは、JSまたはTS宣言ファイルを使用する場合のみ可能です。
// - 外部Markdownコンテンツのフェッチは、JSまたはTS宣言ファイルを使用する場合のみ可能です。

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "ja": {
          "nodeType": "markdown",
          "markdown": "# 私のMarkdown\n\nこれはMarkdownコンテンツです。",
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

## React Intlayerでのマークダウンの使用

Reactアプリケーションでマークダウンコンテンツをレンダリングするには、`react-intlayer`パッケージの`useIntlayer`フックとマークダウンレンダリングプロバイダーを活用できます。この例では、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)パッケージを使用してマークダウンをHTMLに変換します。

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

この実装では:

- `MarkdownProvider` はアプリケーション（またはその関連部分）をラップし、`renderMarkdown` 関数を受け取ります。この関数は、`markdown-to-jsx` パッケージを使用して Markdown 文字列を JSX に変換するために使用されます。
- `useIntlayer` フックは、辞書からキー `"app"` を使用して Markdown コンテンツ (`myMarkdownContent`) を取得するために使用されます。
- Markdown コンテンツはコンポーネント内で直接レンダリングされ、Markdown のレンダリングはプロバイダーによって処理されます。

### Next Intlayer で Markdown を使用する

`next-intlayer` パッケージを使用した実装は、上記のものと似ています。唯一の違いは、`renderMarkdown` 関数をクライアントコンポーネント内の `MarkdownProvider` コンポーネントに渡す必要がある点です。

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

## 追加リソース

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

これらのリソースは、さまざまなコンテンツタイプやフレームワークで Intlayer を設定および使用する方法についてのさらなる洞察を提供します。
