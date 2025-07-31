---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: ファイル
description: `file` 関数を使用して外部ファイルをコンテンツ辞書に埋め込む方法を学びます。このドキュメントでは、Intlayerがファイルコンテンツを動的にリンクおよび管理する方法を説明します。
keywords:
  - ファイル
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
---

# ファイルコンテンツ / Intlayerでのファイル埋め込み

## ファイル埋め込みの仕組み

Intlayerでは、`file` 関数を使用して外部ファイルの内容を辞書に埋め込むことができます。この方法により、Intlayerはソースファイルを認識し、IntlayerビジュアルエディターやCMSとのシームレスな統合を可能にします。直接的な `import`、`require`、または `fs` によるファイル読み込み方法とは異なり、`file` を使用するとファイルが辞書に関連付けられ、ファイルが編集されるとIntlayerがコンテンツを動的に追跡および更新できるようになります。

## ファイルコンテンツの設定

Intlayerプロジェクトにファイルコンテンツを埋め込むには、コンテンツモジュール内で `file` 関数を使用します。以下に異なる実装例を示します。

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

## React Intlayerでのファイルコンテンツの使用

Reactコンポーネント内で埋め込まれたファイルコンテンツを使用するには、`react-intlayer`パッケージから`useIntlayer`フックをインポートして使用します。これにより、指定されたキーからコンテンツを取得し、動的に表示することができます。

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

## 多言語対応Markdownの例

多言語対応の編集可能なMarkdownファイルをサポートするために、`file`を`t()`および`md()`と組み合わせて使用し、Markdownコンテンツファイルの異なる言語バージョンを定義できます。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
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
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

この設定により、ユーザーの言語設定に基づいてコンテンツを動的に取得することが可能になります。IntlayerのビジュアルエディターやCMSで使用される場合、システムはコンテンツが指定されたMarkdownファイルから来ていることを認識し、それらが編集可能なままであることを保証します。

## Intlayerがファイルコンテンツを処理する方法

`file`関数はNode.jsの`fs`モジュールに基づいており、指定されたファイルの内容を読み取り、辞書に挿入します。IntlayerのビジュアルエディターやCMSと組み合わせて使用される場合、Intlayerは辞書とファイルの関係を追跡できます。これによりIntlayerは以下を可能にします：

- コンテンツが特定のファイルから来ていることを認識する。
- リンクされたファイルが編集されたときに辞書のコンテンツを自動的に更新する。
- ファイルと辞書の同期を確保し、コンテンツの整合性を維持します。

## 追加リソース

Intlayerでのファイル埋め込みの設定および使用方法の詳細については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)
- [Markdown コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)
- ファイルと辞書の同期を確保し、コンテンツの整合性を保持します。

## 追加リソース

Intlayerでのファイル埋め込みの設定および使用方法の詳細については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)
- [Markdown コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)
- [翻訳コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)

これらのリソースは、ファイル埋め込み、コンテンツ管理、およびIntlayerのさまざまなフレームワークとの統合に関するさらなる洞察を提供します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
