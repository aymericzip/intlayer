---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/condition.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: 条件内容
description: Intlayerで条件付きコンテンツを使用し、特定の条件に基づいて動的にコンテンツを表示する方法を学びます。このドキュメントに従って、効率的に条件を実装しましょう。
keywords:
  - 条件内容
  - 動的レンダリング
  - 文書
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 条件付きコンテンツ / Intlayerの条件

## 条件の仕組み

Intlayerでは、条件付きコンテンツは`cond`関数を使用して実現されます。この関数は特定の条件（通常はブール値）を対応するコンテンツにマッピングします。このアプローチにより、指定された条件に基づいて動的にコンテンツを選択することが可能になります。React IntlayerやNext Intlayerと統合することで、実行時に提供された条件に応じて適切なコンテンツが自動的に選択されます。

## 条件付きコンテンツの設定

Intlayerプロジェクトで条件付きコンテンツを設定するには、条件定義を含むコンテンツモジュールを作成します。以下に、さまざまな形式での例を示します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "条件がtrueの場合のコンテンツ",
      false: "条件がfalseの場合のコンテンツ",
      fallback: "条件が失敗した場合のコンテンツ", // オプション
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "条件がtrueの場合のコンテンツ",
      false: "条件がfalseの場合のコンテンツ",
      fallback: "条件が失敗した場合のコンテンツ", // オプション
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "条件がtrueの場合のコンテンツ",
      false: "条件がfalseの場合のコンテンツ",
      fallback: "条件が失敗した場合のコンテンツ", // オプション
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "条件がtrueの場合のコンテンツ",
        "false": "条件がfalseの場合のコンテンツ",
        "fallback": "条件が失敗した場合のコンテンツ", // オプション
      },
    },
  },
}
```

> フォールバックが宣言されていない場合、条件が検証されない場合は最後に宣言されたキーがフォールバックとして使用されます。

## React Intlayerでの条件付きコンテンツの使用

Reactコンポーネント内で条件付きコンテンツを利用するには、`react-intlayer`パッケージから`useIntlayer`フックをインポートして使用します。このフックは指定されたキーのコンテンツを取得し、条件を渡して適切な出力を選択できるようにします。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 条件がtrueの場合のコンテンツ */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 出力: 条件がfalseの場合のコンテンツ */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 出力: 条件が失敗した場合のコンテンツ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 出力: 条件が失敗した場合のコンテンツ */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 条件がtrueの場合のコンテンツ */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 出力: 条件がfalseの場合のコンテンツ */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 出力: 条件が失敗した場合のコンテンツ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 出力: 条件が失敗した場合のコンテンツ */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 条件がtrueの場合のコンテンツ */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 出力: 条件がfalseの場合のコンテンツ */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 出力: 条件が失敗した場合のコンテンツ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 出力: 条件が失敗した場合のコンテンツ */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## 追加リソース

設定と使用に関する詳細情報については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerの設定と使用に関するさらなる洞察を提供します。
