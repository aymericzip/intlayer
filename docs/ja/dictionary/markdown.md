# Markdown / リッチテキストコンテンツ

## Markdownの仕組み

IntlayerはMarkdown構文を使用して定義されたリッチテキストコンテンツをサポートしています。これは、Markdown文字列をIntlayerで管理可能な形式に変換する`md`関数を通じて実現されます。Markdownを使用することで、ブログや記事などのリッチなフォーマットのコンテンツを簡単に作成および管理できます。

[Intlayerビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)および[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)は、どちらもMarkdownコンテンツ管理をサポートしています。

Reactアプリケーションと統合する際には、Markdownレンダリングプロバイダー（例: [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)）を使用してMarkdownコンテンツをHTMLにレンダリングできます。これにより、Markdownでコンテンツを記述しつつ、アプリ内で適切に表示されるようにできます。

## Markdownコンテンツの設定

IntlayerプロジェクトでMarkdownコンテンツを設定するには、`md`関数を利用したコンテンツ辞書を定義します。

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Markdownコンテンツを含む辞書を定義
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

// Markdownコンテンツを含む辞書を定義
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

// Markdownコンテンツを含む辞書を定義
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

## React IntlayerでのMarkdownの使用

ReactアプリケーションでMarkdownコンテンツをレンダリングするには、`react-intlayer`パッケージの`useIntlayer`フックとMarkdownレンダリングプロバイダーを活用します。この例では、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)パッケージを使用してMarkdownをHTMLに変換します。

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// アプリケーションコンテンツを定義
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// プロバイダーでアプリケーションをラップ
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

// アプリケーションコンテンツを定義
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// プロバイダーでアプリケーションをラップ
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

// アプリケーションコンテンツを定義
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// プロバイダーでアプリケーションをラップ
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

この実装では:

- `MarkdownProvider`はアプリケーション（またはその関連部分）をラップし、`renderMarkdown`関数を受け取ります。この関数は、`markdown-to-jsx`パッケージを使用してMarkdown文字列をJSXに変換します。
- `useIntlayer`フックを使用して、キー`"app"`を持つ辞書からMarkdownコンテンツ（`myMarkdownContent`）を取得します。
- Markdownコンテンツはコンポーネント内で直接レンダリングされ、レンダリングはプロバイダーによって処理されます。

## 追加リソース

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

これらのリソースは、さまざまなコンテンツタイプやフレームワークでIntlayerを設定および使用する方法についてのさらなる洞察を提供します。
