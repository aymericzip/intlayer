# 条件付きコンテンツ / Intlayerの条件

## 条件の仕組み

Intlayerでは、`cond`関数を使用して条件付きコンテンツを実現します。この関数は特定の条件（通常はブール値）を対応するコンテンツにマッピングします。このアプローチにより、与えられた条件に基づいて動的にコンテンツを選択できます。React IntlayerやNext Intlayerと統合すると、実行時に提供される条件に応じて適切なコンテンツが自動的に選択されます。

## 条件付きコンテンツの設定

Intlayerプロジェクトで条件付きコンテンツを設定するには、条件定義を含むコンテンツモジュールを作成します。以下に、さまざまな形式での例を示します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "条件が真の場合のコンテンツ",
      false: "条件が偽の場合のコンテンツ",
      fallback: "条件が成立しない場合のコンテンツ", // オプション
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
      true: "条件が真の場合のコンテンツ",
      false: "条件が偽の場合のコンテンツ",
      fallback: "条件が成立しない場合のコンテンツ", // オプション
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
      true: "条件が真の場合のコンテンツ",
      false: "条件が偽の場合のコンテンツ",
      fallback: "条件が成立しない場合のコンテンツ", // オプション
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
        "true": "条件が真の場合のコンテンツ",
        "false": "条件が偽の場合のコンテンツ",
        "fallback": "条件が成立しない場合のコンテンツ", // オプション
      },
    },
  },
}
```

> フォールバックが定義されていない場合、条件が満たされないと最後に定義されたキーがフォールバックとして使用されます。

## React Intlayerでの条件付きコンテンツの使用

Reactコンポーネント内で条件付きコンテンツを使用するには、`react-intlayer`パッケージから`useIntlayer`フックをインポートして使用します。このフックは指定したキーのコンテンツを取得し、適切な出力を選択するために条件を渡すことができます。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: 条件が真の場合のコンテンツ */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 出力: 条件が偽の場合のコンテンツ */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 出力: 条件が成立しない場合のコンテンツ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 出力: 条件が成立しない場合のコンテンツ */
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
          /* 出力: 条件が真の場合のコンテンツ */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 出力: 条件が偽の場合のコンテンツ */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 出力: 条件が成立しない場合のコンテンツ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 出力: 条件が成立しない場合のコンテンツ */
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
          /* 出力: 条件が真の場合のコンテンツ */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 出力: 条件が偽の場合のコンテンツ */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 出力: 条件が成立しない場合のコンテンツ */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 出力: 条件が成立しない場合のコンテンツ */
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

- [Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayerドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayerドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerのセットアップと使用法に関するさらなる洞察を提供します。
