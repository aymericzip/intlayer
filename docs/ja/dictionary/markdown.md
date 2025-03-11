## マークダウンの仕組み

Intlayerは、マークダウン構文を使用して定義されたリッチテキストコンテンツをサポートします。これは、`md`関数を通じて実現され、マークダウン文字列をIntlayerで管理可能な形式に変換します。マークダウンを使用することで、ブログ、記事などのリッチなフォーマットのコンテンツを簡単に作成および管理できます。

[Intlayerビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)および[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)は、どちらもマークダウンコンテンツ管理をサポートしています。

Reactアプリケーションと統合する際には、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)のようなマークダウンレンダリングプロバイダーを使用して、マークダウンコンテンツをHTMLにレンダリングできます。これにより、マークダウンでコンテンツを記述しながら、アプリ内で適切に表示されることを保証します。

## マークダウンコンテンツの設定

Intlayerプロジェクトでマークダウンコンテンツを設定するには、`md`関数を利用したコンテンツ辞書を定義します。

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

## 多言語 `.md` ファイルのインポート

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// この宣言により、TypeScriptがMarkdown (.md) ファイルをモジュールとして認識してインポートできるようになります。
// これがないと、TypeScriptはMarkdownファイルのインポート時にエラーをスローします。
// TypeScriptは非コードファイルのインポートをネイティブにサポートしていないためです。

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_ja from "./myMarkdown.ja.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ja: md(markdown_ja),
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
import markdown_ja from "./myMarkdown.ja.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ja: md(markdown_ja),
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
const markdown_ja = require("./myMarkdown.ja.md");
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ja: md(markdown_ja),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// 外部のMarkdownファイル (.md) のインポートは、JSまたはTS宣言ファイルを使用する場合にのみ可能です。

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "ja": {
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

## React Intlayerでのマークダウンの使用

Reactアプリケーションでマークダウンコンテンツをレンダリングするには、`react-intlayer`パッケージの`useIntlayer`フックとマークダウンレンダリングプロバイダーを活用します。この例では、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)パッケージを使用してマークダウンをHTMLに変換します。

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

この実装では：

- `MarkdownProvider`はアプリケーション（またはその関連部分）をラップし、`renderMarkdown`関数を受け取ります。この関数は、`markdown-to-jsx`パッケージを使用してマークダウン文字列をJSXに変換します。
- `useIntlayer`フックは、辞書からキー`"app"`を使用してマークダウンコンテンツ（`myMarkdownContent`）を取得します。
- マークダウンコンテンツはコンポーネント内で直接レンダリングされ、マークダウンレンダリングはプロバイダーによって処理されます。

## 追加リソース

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

これらのリソースは、さまざまなコンテンツタイプやフレームワークでIntlayerを設定および使用する方法についてのさらなる洞察を提供します。
