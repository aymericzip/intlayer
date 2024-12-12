# 関数の取得

## 関数の宣言

Intlayerを使用すると、コンテンツモジュール内でコンテンツ関数を宣言できます。これらの関数は同期または非同期である可能性があります。アプリケーションがビルドされると、Intlayerはこれらの関数を実行して関数の結果を取得します。戻り値はJSONオブジェクトまたは文字列や数値のような単純な値である必要があります。

以下は、コンテンツを取得するシンプルな同期関数の例です：

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "このコンテンツは関数によってレンダリングされます",
  },
} satisfies DeclarationContent;

export default functionContent;
```

この例では、`text`キーには文字列を返す関数が含まれています。このコンテンツは、Intlayerのインタープリタパッケージである`react-intlayer`を使用して、Reactコンポーネント内でレンダリングできます。

## 非同期関数の取得

同期関数に加えて、Intlayerは非同期関数をサポートしており、外部ソースからデータを取得したり、モックデータを使ってデータ取得をシミュレートしたりすることができます。

以下は、サーバー取得をシミュレートする非同期関数の例です：

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // サーバーからの取得をシミュレートするために200ms待つ
  return await setTimeout(200).then(() => "サーバーから取得したコンテンツです");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

この場合、`fakeFetch`関数はサーバーの応答時間をシミュレートするために遅延を模倣します。Intlayerは非同期関数を実行し、結果を`text`キーのコンテンツとして使用します。

## Reactコンポーネントでの関数ベースのコンテンツの使用

Reactコンポーネントで関数ベースのコンテンツを使用するには、`react-intlayer`から`useIntlayer`をインポートし、コンテンツIDを指定して呼び出す必要があります。以下はその例です：

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 出力: このコンテンツは関数によってレンダリングされます */}
      <p>{asyncFunctionContent.text}</p>
      {/* 出力: サーバーから取得したコンテンツです */}
    </div>
  );
};

export default MyComponent;
```
