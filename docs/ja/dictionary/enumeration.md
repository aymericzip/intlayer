---
docName: dictionary__enumeration
url: /doc/concept/content/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 列挙
description: 多言語ウェブサイトで列挙を宣言し使用する方法を発見してください。このオンライン文書の手順に従って、数分でプロジェクトをセットアップします。
keywords:
  - 列挙
  - 国際化
  - 文書
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 列挙 / 複数形化

## 列挙の仕組み

Intlayerでは、`enu`関数を使用して特定のキーを対応するコンテンツにマッピングすることで列挙を実現します。これらのキーは数値、範囲、またはカスタム識別子を表すことができます。React IntlayerまたはNext Intlayerと組み合わせて使用する場合、アプリケーションのロケールと定義されたルールに基づいて適切なコンテンツが自動的に選択されます。

## 列挙の設定

Intlayerプロジェクトで列挙を設定するには、列挙定義を含むコンテンツモジュールを作成する必要があります。以下は車の数に関する簡単な列挙の例です：

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
      ">5": "いくつかの車",
      ">19": "たくさんの車",
      "fallback": "フォールバック値", // 任意
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
      ">5": "いくつかの車",
      ">19": "たくさんの車",
      "fallback": "フォールバック値", // 任意
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
      ">5": "いくつかの車",
      ">19": "たくさんの車",
      "fallback": "フォールバック値", // 任意
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
        "0": "車なし",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "たくさんの車",
        "fallback": "フォールバック値" // 任意
      }
    }
  }
}
```

この例では、`enu`がさまざまな条件を特定のコンテンツにマッピングします。Reactコンポーネントで使用する場合、Intlayerは指定された変数に基づいて適切なコンテンツを自動的に選択します。

> Intlayerの列挙では、宣言の順序が重要です。最初に有効な宣言が選択されます。複数の条件が適用される場合、予期しない動作を避けるために正しい順序で配置してください。

> フォールバックが宣言されていない場合、キーが一致しない場合は関数が`undefined`を返します。

## React Intlayerでの列挙の使用

Reactコンポーネントで列挙を使用するには、`react-intlayer`パッケージの`useIntlayer`フックを活用できます。このフックは、指定されたIDに基づいて正しいコンテンツを取得します。以下はその使用例です：

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 出力: 車なし
        }
      </p>
      <p>
        {
          numberOfCar(6) // 出力: いくつかの車
        }
      </p>
      <p>
        {
          numberOfCar(20) // 出力: たくさんの車
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
          numberOfCar(0) // 出力: 車なし
        }
      </p>
      <p>
        {
          numberOfCar(6) // 出力: いくつかの車
        }
      </p>
      <p>
        {
          numberOfCar(20) // 出力: たくさんの車
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
          numberOfCar(0) // 出力: 車なし
        }
      </p>
      <p>
        {
          numberOfCar(6) // 出力: いくつかの車
        }
      </p>
      <p>
        {
          numberOfCar(20) // 出力: たくさんの車
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

この例では、コンポーネントが車の数に基づいて出力を動的に調整します。指定された範囲に応じて正しいコンテンツが自動的に選択されます。

## 追加リソース

設定や使用方法に関する詳細情報は、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerのセットアップと使用に関するさらなる洞察を提供します。
