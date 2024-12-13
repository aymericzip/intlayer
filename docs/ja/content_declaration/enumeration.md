# 列挙 / 複数形化

## 列挙がどのように機能するか

Intlayerでは、列挙は`enu`関数を通じて実現されており、特定のキーを対応するコンテンツにマッピングします。これらのキーは数値、範囲、またはカスタム識別子を表すことができます。React IntlayerまたはNext Intlayerで使用されると、適切なコンテンツはアプリケーションのロケールと定義されたルールに基づいて自動的に選択されます。

## 列挙の設定

Intlayerプロジェクトに列挙を設定するには、列挙定義を含むコンテンツモジュールを作成する必要があります。以下は、自動車の台数に関するシンプルな列挙の例です：

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "マイナス1台未満",
      "-1": "マイナス1台",
      "0": "自動車なし",
      "1": "1台の自動車",
      ">5": "いくつかの自動車",
      ">19": "多くの自動車",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

この例では、`enu`はさまざまな条件を特定のコンテンツにマッピングします。Reactコンポーネントで使用されると、Intlayerは与えられた変数に基づいて自動的に適切なコンテンツを選択できます。

## React Intlayerとの列挙の使用

Reactコンポーネントで列挙を使用するには、`react-intlayer`パッケージから`useIntlayer`フックを利用できます。このフックは、指定されたIDに基づいて正しいコンテンツを取得します。以下は、その使用例です：

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 出力: 自動車なし */}
      <p>{content.numberOfCar(6)}</p> {/* 出力: いくつかの自動車 */}
      <p>{content.numberOfCar(20)}</p> {/* 出力: いくつかの自動車 */}
    </div>
  );
};

export default CarComponent;
```

この例では、コンポーネントは自動車の数に基づいて出力を動的に調整します。指定された範囲に応じて、正しいコンテンツが自動的に選択されます。

## 重要な注意事項

- 宣言の順序はIntlayerの列挙において重要です。最初の有効な宣言が選択されます。
- 複数の条件が当てはまる場合は、予期しない動作を避けるために正しく順序を整理してください。

## 列挙のベストプラクティス

列挙が期待通りに機能することを保証するために、以下のベストプラクティスに従ってください：

- **一貫した命名**: 混乱を避けるために列挙モジュールのために明確で一貫したIDを使用してください。
- **ドキュメント化**: 将来のメンテナンスを確保するために、列挙キーとその期待される出力を文書化してください。
- **エラーハンドリング**: 有効な列挙が見つからない場合を管理するために、エラーハンドリングを実装してください。
- **パフォーマンスの最適化**: 大規模なアプリケーションの場合、パフォーマンスを向上させるために監視するファイル拡張子の数を減らしてください。

## 追加のリソース

設定と使用に関する詳細な情報については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerの設定と使用に関するさらなる洞察を提供します。
