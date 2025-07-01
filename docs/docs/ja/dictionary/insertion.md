---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 挿入
description: コンテンツ内で挿入プレースホルダーを宣言し使用する方法を学びます。このドキュメントは、事前定義されたコンテンツ構造内に動的に値を挿入する手順を案内します。
keywords:
  - 挿入
  - 動的コンテンツ
  - プレースホルダー
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
---

# 挿入コンテンツ / Intlayerにおける挿入

## 挿入の仕組み

Intlayerでは、挿入コンテンツは`insertion`関数を通じて実現されます。この関数は文字列内のプレースホルダー（例えば`{{name}}`や`{{age}}`）を識別し、実行時に動的に置き換えることができます。この方法により、アプリケーションから渡されたデータによって特定の部分が決定される、柔軟でテンプレートのような文字列を作成できます。

React IntlayerやNext Intlayerと統合すると、各プレースホルダーの値を含むデータオブジェクトを単に提供するだけで、Intlayerが自動的にプレースホルダーを置き換えたコンテンツをレンダリングします。

## 挿入コンテンツの設定

Intlayerプロジェクトで挿入コンテンツを設定するには、挿入定義を含むコンテンツモジュールを作成します。以下に様々な形式の例を示します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "こんにちは、私の名前は{{name}}で、年齢は{{age}}歳です！"
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "こんにちは、私の名前は{{name}}で、年齢は{{age}}歳です！"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "こんにちは、私の名前は{{name}}で、年齢は{{age}}歳です！"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "こんにちは、私の名前は{{name}}で、年齢は{{age}}歳です！",
    },
  },
}
```

## React Intlayerでの挿入コンテンツの使用

Reactコンポーネント内で挿入コンテンツを利用するには、`react-intlayer`パッケージから`useIntlayer`フックをインポートして使用します。このフックは指定したキーのコンテンツを取得し、コンテンツ内の各プレースホルダーに対応する値をマッピングしたオブジェクトを渡すことができます。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力例: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 同じ挿入を異なる値で再利用できます */
          `myInsertion({ name: "Alice", age: "25" })`
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: "こんにちは、私の名前はジョンで、30歳です！" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 同じ挿入を異なる値で再利用できます */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 同じ挿入を異なる値で再利用できます */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## 追加リソース

設定および使用方法の詳細については、以下のリソースを参照してください。

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークにおける Intlayer のセットアップと使用方法について、さらに詳しい情報を提供します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
