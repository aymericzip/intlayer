# 列挙 / 複数形化

## 列挙の仕組み

Intlayerでは、列挙は`enu`関数を通じて実現され、特定のキーが対応するコンテンツにマッピングされます。これらのキーは数値、範囲、またはカスタム識別子を表すことができます。React IntlayerやNext Intlayerで使用する際には、アプリケーションのロケールと定義されたルールに基づいて、適切なコンテンツが自動的に選択されます。

## 列挙の設定

Intlayerプロジェクトで列挙を設定するには、列挙定義を含むコンテンツモジュールを作成する必要があります。以下は、車の数に関するシンプルな列挙の例です：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス一台未満",
      "-1": "マイナス一台",
      "0": "車はありません",
      "1": "一台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス一台未満",
      "-1": "マイナス一台",
      "0": "車はありません",
      "1": "一台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス一台未満",
      "-1": "マイナス一台",
      "0": "車はありません",
      "1": "一台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
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
      "<-1": "マイナス一台未満",
      "-1": "マイナス一台",
      "0": "車はありません",
      "1": "一台の車",
      ">5": "いくつかの車",
      ">19": "多くの車"
    }
  }
}
```

この例では、`enu`がさまざまな条件を特定のコンテンツにマッピングしています。Reactコンポーネント内で使用されると、Intlayerは指定された変数に基づいて適切なコンテンツを自動的に選択できます。

## React Intlayerでの列挙の使用

Reactコンポーネントで列挙を使用するには、`react-intlayer`パッケージから`useIntlayer`フックを活用できます。このフックは、指定されたIDに基づいて正しいコンテンツを取得します。以下はその使用例です：

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 出力: 車はありません */}
      <p>{content.numberOfCar(6)}</p> {/* 出力: いくつかの車 */}
      <p>{content.numberOfCar(20)}</p> {/* 出力: いくつかの車 */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 出力: 車はありません */}
      <p>{content.numberOfCar(6)}</p> {/* 出力: いくつかの車 */}
      <p>{content.numberOfCar(20)}</p> {/* 出力: いくつかの車 */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 出力: 車はありません */}
      <p>{content.numberOfCar(6)}</p> {/* 出力: いくつかの車 */}
      <p>{content.numberOfCar(20)}</p> {/* 出力: いくつかの車 */}
    </div>
  );
};

module.exports = CarComponent;
```

この例では、コンポーネントは車の数に応じて出力を動的に調整します。指定された範囲に応じて適切なコンテンツが自動的に選択されます。

## 重要な注意事項

- Intlayerの列挙において、宣言の順序は重要です。最初の有効な宣言が選ばれます。
- 複数の条件が適用される場合は、予期しない動作を避けるために順序が正しくなるようにしてください。

## 列挙のベストプラクティス

列挙が期待通りに機能するようにするために、以下のベストプラクティスに従ってください：

- **一貫した命名**: 列挙モジュールのIDは明確で一貫性のあるものを使用して、混乱を避けてください。
- **ドキュメント**: 今後のメンテナンスを考慮して、列挙キーとその期待される出力を文書化してください。
- **エラーハンドリング**: 有効な列挙が見つからなかった場合に対処するためのエラーハンドリングを実装してください。
- **パフォーマンスの最適化**: 大規模アプリケーションでは、パフォーマンスを向上させるために監視対象のファイル拡張子の数を減らしてください。

## 追加リソース

構成および使用に関するより詳細な情報については、以下のリソースを参照してください：

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerのセットアップと使用についてのさらなる洞察を提供します。
