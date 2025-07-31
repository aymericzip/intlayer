---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: 性別に基づくコンテンツ
description: Intlayerで性別に基づくコンテンツを使用して、性別に応じて動的にコンテンツを表示する方法を学びます。このドキュメントに従って、プロジェクトで性別特有のコンテンツを効率的に実装してください。
keywords:
  - 性別に基づくコンテンツ
  - 動的レンダリング
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
---

# 性別に基づくコンテンツ / Intlayerにおける性別

## 性別の仕組み

Intlayerでは、性別に基づくコンテンツは`gender`関数を通じて実現されます。この関数は特定の性別の値（'male'、'female'）を対応するコンテンツにマッピングします。この方法により、指定された性別に基づいて動的にコンテンツを選択することが可能です。React IntlayerやNext Intlayerと統合すると、実行時に提供された性別に応じて適切なコンテンツが自動的に選択されます。

## 性別に基づくコンテンツの設定

Intlayerプロジェクトで性別に基づくコンテンツを設定するには、性別特有の定義を含むコンテンツモジュールを作成します。以下に様々な形式の例を示します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "男性ユーザー向けのコンテンツ",
      female: "女性ユーザー向けのコンテンツ",
      fallback: "性別が指定されていない場合のコンテンツ", // オプション
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "男性ユーザー向けのコンテンツ",
      female: "女性ユーザー向けのコンテンツ",
      fallback: "性別が指定されていない場合のコンテンツ", // オプション
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "男性ユーザー向けのコンテンツ",
      female: "女性ユーザー向けのコンテンツ",
      fallback: "性別が指定されていない場合のコンテンツ", // オプション
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "男性ユーザー向けのコンテンツ",
        "female": "女性ユーザー向けのコンテンツ",
        "fallback": "性別が指定されていない場合のコンテンツ", // オプション
      },
    },
  },
}
```

> フォールバックが宣言されていない場合、性別が指定されていないか、定義された性別に一致しない場合は、最後に宣言されたキーがフォールバックとして使用されます。

## React Intlayerでの性別ベースのコンテンツの使用

Reactコンポーネント内で性別ベースのコンテンツを利用するには、`react-intlayer`パッケージから`useIntlayer`フックをインポートして使用します。このフックは指定されたキーのコンテンツを取得し、適切な出力を選択するために性別を渡すことができます。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 男性ユーザー向けのコンテンツ */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 出力: 女性ユーザー向けのコンテンツ */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 出力: 男性ユーザー向けのコンテンツ */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 出力: 女性ユーザー向けのコンテンツ */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 出力: 性別が指定されていない場合のコンテンツ */
          myGender("")
        }
      </p>
      <p>
        {
          /* 出力: 性別が指定されていない場合のコンテンツ */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 男性ユーザー向けのコンテンツ */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 出力: 女性ユーザー向けのコンテンツ */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 出力: 男性ユーザー向けのコンテンツ */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 出力: 女性ユーザー向けのコンテンツ */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 出力: 性別が指定されていない場合のコンテンツ */
          myGender("")
        }
      </p>
      <p>
        {
          /* 出力: 性別が指定されていない場合のコンテンツ */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 男性ユーザー向けのコンテンツ */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 出力: 女性ユーザー向けのコンテンツ */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 出力: 男性ユーザー向けのコンテンツ */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 出力: 女性ユーザー向けのコンテンツ */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 出力: 性別が指定されていない場合のコンテンツ */
          myGender("")
        }
      </p>
      <p>
        {
          /* 出力: 性別が指定されていない場合のコンテンツ */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## 追加リソース

設定や使用方法の詳細については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークにおけるIntlayerのセットアップと使用方法について、さらに詳しい情報を提供します。

## ドキュメント履歴

| バージョン | 日付       | 変更内容                     |
| ---------- | ---------- | ---------------------------- |
| 5.7.2      | 2025-07-27 | 性別に基づくコンテンツの導入 |
