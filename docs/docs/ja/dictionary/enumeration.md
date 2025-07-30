---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 列挙型
description: 多言語ウェブサイトで列挙型を宣言し使用する方法を紹介します。このオンラインドキュメントの手順に従って、数分でプロジェクトをセットアップしましょう。
keywords:
  - 列挙型
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
  - enumeration
---

# 列挙型 / 複数形処理

## 列挙型の仕組み

Intlayerでは、`enu`関数を使用して列挙型を実現します。この関数は特定のキーを対応するコンテンツにマッピングします。これらのキーは数値、範囲、またはカスタム識別子を表すことができます。React IntlayerやNext Intlayerと組み合わせて使用すると、アプリケーションのロケールと定義されたルールに基づいて適切なコンテンツが自動的に選択されます。

## 列挙型の設定

Intlayerプロジェクトで列挙型を設定するには、列挙型の定義を含むコンテンツモジュールを作成する必要があります。以下は、車の数に関する簡単な列挙型の例です。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "数台の車",
      ">19": "多くの車",
      "fallback": "フォールバック値", // オプション
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "数台の車",
      ">19": "多くの車",
      "fallback": "フォールバック値", // オプション
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "数台の車",
      ">19": "多くの車",
      "fallback": "フォールバック値", // オプション
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "マイナス1台未満の車",
        "-1": "マイナス1台の車",
        "0": "車はありません",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車",
        "fallback": "フォールバック値" // 任意
      }
    }
  }
}
```

この例では、`enu` はさまざまな条件を特定のコンテンツにマッピングしています。Reactコンポーネントで使用すると、Intlayerは与えられた変数に基づいて適切なコンテンツを自動的に選択できます。

> Intlayerの列挙型では宣言の順序が重要です。最初に有効な宣言が選択されます。複数の条件が該当する場合は、予期しない動作を避けるために正しい順序で並べてください。

> フォールバックが宣言されていない場合、キーが一致しなければ関数は`undefined`を返します。

## React Intlayerでの列挙型の使用

Reactコンポーネントで列挙型を使用するには、`react-intlayer`パッケージの`useIntlayer`フックを活用できます。このフックは指定されたIDに基づいて正しいコンテンツを取得します。以下はその使用例です：

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 出力: 車はありません
        }
      </p>
      <p>
        {
          numberOfCar(6) // 出力: いくつかの車
        }
      </p>
      <p>
        {
          numberOfCar(20) // 出力: 多くの車
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 出力: フォールバック値
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 出力: 車はありません
        }
      </p>
      <p>
        {
          numberOfCar(6) // 出力: いくつかの車
        }
      </p>
      <p>
        {
          numberOfCar(20) // 出力: 多くの車
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 出力: フォールバック値
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 出力: 車はありません
        }
      </p>
      <p>
        {
          numberOfCar(6) // 出力: いくつかの車
        }
      </p>
      <p>
        {
          numberOfCar(20) // 出力: 多くの車
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 出力: フォールバック値
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

この例では、コンポーネントが車の数に基づいて動的に出力を調整します。指定された範囲に応じて、正しい内容が自動的に選択されます。

## 追加リソース

設定および使用法の詳細については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでの Intlayer のセットアップおよび使用方法について、さらに詳しい情報を提供します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
