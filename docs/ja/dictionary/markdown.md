# マークダウン / リッチ テキスト コンテンツ

## マークダウンの仕組み

Intlayer は、マークダウン構文を使用して定義されたリッチ テキスト コンテンツをサポートしています。これは、マークダウン文字列を Intlayer によって管理可能な形式に変換する `md` 関数を通じて実現されます。マークダウンを使用することで、ブログ、記事などのリッチな書式設定を持つコンテンツを簡単に作成および管理できます。

[Intlayer ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md) および [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md) の両方がマークダウン コンテンツ管理をサポートしています。

React アプリケーションと統合する際には、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) のようなマークダウン レンダリングプロバイダを使用して、マークダウン コンテンツを HTML にレンダリングできます。これにより、マークダウンでコンテンツを書きながら、アプリで適切に表示されることが保証されます。

## マークダウン コンテンツの設定

Intlayer プロジェクトでマークダウン コンテンツを設定するには、`md` 関数を使用するコンテンツ辞書を定義します。

### TypeScript の例

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// マークダウン コンテンツ辞書の定義
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### JavaScript (ESM) の例

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// マークダウン コンテンツ辞書の定義
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### CommonJS の例

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// マークダウン コンテンツ辞書の定義
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### JSON の例

JSON を使用する場合、マークダウン コンテンツは `nodeType`（例: `"markdown"`）を設定し、マークダウン文字列を提供することで定義されます。以下は例です:

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

## React Intlayer でのマークダウン使用

React アプリケーションでマークダウン コンテンツをレンダリングするには、`react-intlayer` パッケージの `useIntlayer` フックを、マークダウン レンダリングプロバイダと組み合わせて使用します。この例では、[`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) パッケージを使用してマークダウンを HTML に変換します。

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

const AppContent: FC = () => {
  // Intlayer からマークダウン コンテンツを取得
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
```

この実装では:

- `MarkdownProvider` はアプリケーション（またはその関連部分）をラップし、`renderMarkdown` 関数を受け入れます。この関数は、`markdown-to-jsx` パッケージを使用してマークダウン文字列を JSX に変換するために使用されます。
- `useIntlayer` フックを使用して、辞書内の `"app"` キーに対応するマークダウン コンテンツ（`myMarkdownContent`）を取得します。
- マークダウン コンテンツはコンポーネント内で直接レンダリングされ、マークダウンのレンダリングはプロバイダによって処理されます。

## 追加リソース

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

これらのリソースを参照すると、さまざまなコンテンツ タイプやフレームワークと Intlayer を設定して使用する方法について、さらに詳しい情報が得られます。
