# ファイル内容 / Intlayerでのファイル埋め込み

## ファイル埋め込みの仕組み

Intlayerでは、`file` 関数を使用して外部ファイルの内容を辞書に埋め込むことができます。このアプローチにより、Intlayerがソースファイルを認識し、Intlayer Visual EditorやCMSとのシームレスな統合を可能にします。直接的な `import`、`require`、または `fs` ファイル読み込み方法とは異なり、`file` を使用することで、ファイルが辞書に関連付けられ、ファイルが編集されるときにIntlayerが動的に内容を追跡し更新することができます。

## ファイル内容の設定

Intlayerプロジェクトでファイル内容を埋め込むには、コンテンツモジュール内で `file` 関数を使用します。以下は、さまざまな実装例を示しています。

### TypeScript実装

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### ECMAScriptモジュール（ESM）実装

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### CommonJS実装

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### JSON設定

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## React Intlayerでのファイル内容の使用

埋め込まれたファイル内容をReactコンポーネントで使用するには、`react-intlayer` パッケージから `useIntlayer` フックをインポートして使用します。これにより、指定されたキーから内容を取得し、動的に表示することができます。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## 多言語Markdownの例

多言語対応の編集可能なMarkdownファイルをサポートするには、`file` を `t()` および `md()` と組み合わせて使用し、Markdownコンテンツファイルの異なる言語バージョンを定義します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ja: file("src/components/test.ja.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ja: file("src/components/test.ja.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ja: file("src/components/test.ja.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

この設定により、ユーザーの言語設定に基づいてコンテンツを動的に取得できます。Intlayer Visual EditorやCMSで使用する場合、システムはコンテンツが指定されたMarkdownファイルから来ていることを認識し、それらが編集可能であることを保証します。

## Intlayerがファイル内容を処理する方法

`file` 関数はNode.jsの `fs` モジュールに基づいており、指定されたファイルの内容を読み取り、辞書に挿入します。Intlayer Visual EditorやCMSと組み合わせて使用する場合、Intlayerは辞書とファイルの関係を追跡できます。これにより、以下が可能になります：

- コンテンツが特定のファイルから来ていることを認識。
- リンクされたファイルが編集されたときに辞書の内容を自動的に更新。
- ファイルと辞書の同期を確保し、コンテンツの整合性を維持。

## 追加リソース

ファイル埋め込みの設定と使用に関する詳細は、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)
- [Markdown コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/markdown.md)
- [翻訳コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/translation.md)

これらのリソースは、ファイル埋め込み、コンテンツ管理、およびさまざまなフレームワークとのIntlayerの統合に関するさらなる洞察を提供します。
