---
docName: dictionary__insertion
url: /doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: 挿入
description: コンテンツに挿入プレースホルダーを宣言し、使用する方法を学びます。このドキュメントでは、あらかじめ定義されたコンテンツ構造内に値を動的に挿入する手順を説明します。
keywords:
  - 挿入
  - 動的コンテンツ
  - プレースホルダー
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 挿入コンテンツ / 挿入のIntlayer

## 挿入の仕組み

Intlayerでは、挿入コンテンツは`insertion`関数を使用して実現されます。この関数は、文字列内のプレースホルダー（例: `{{name}}`や`{{age}}`）を特定し、実行時に動的に置き換えることができます。このアプローチにより、アプリケーションから渡されるデータによって特定の部分が決定される柔軟なテンプレートのような文字列を作成できます。

React IntlayerやNext Intlayerと統合することで、各プレースホルダーの値を含むデータオブジェクトを提供するだけで、Intlayerがプレースホルダーを置き換えたコンテンツを自動的にレンダリングします。

## 挿入コンテンツの設定

Intlayerプロジェクトで挿入コンテンツを設定するには、挿入定義を含むコンテンツモジュールを作成します。以下に、さまざまな形式の例を示します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("こんにちは、私の名前は{{name}}で、{{age}}歳です！"),
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
    myInsertion: insert("こんにちは、私の名前は{{name}}で、{{age}}歳です！"),
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
    myInsertion: insert("こんにちは、私の名前は{{name}}で、{{age}}歳です！"),
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
      "insertion": "こんにちは、私の名前は{{name}}で、{{age}}歳です！",
    },
  },
}
```

## React Intlayerでの挿入コンテンツの使用

Reactコンポーネント内で挿入コンテンツを利用するには、`react-intlayer`パッケージから`useIntlayer`フックをインポートして使用します。このフックは指定されたキーのコンテンツを取得し、コンテンツ内の各プレースホルダーを表示したい値にマッピングするオブジェクトを渡すことができます。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: "こんにちは、私の名前はJohnで、30歳です！" */
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

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: "こんにちは、私の名前はJohnで、30歳です！" */
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
          /* 出力: "こんにちは、私の名前はJohnで、30歳です！" */
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

設定や使用に関する詳細情報は、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerのセットアップと使用に関するさらなる洞察を提供します。
