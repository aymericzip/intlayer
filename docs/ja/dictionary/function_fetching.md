# 関数のフェッチ

Intlayerでは、コンテンツモジュール内でコンテンツ関数を宣言することができ、これらは同期的または非同期的である可能性があります。アプリケーションがビルドされると、Intlayerはこれらの関数を実行してその結果を取得します。返される値はJSONオブジェクトまたは文字列や数値のような単純な値でなければなりません。

> 警告: 現在、JSONコンテンツ宣言および遠隔コンテンツ宣言ファイルでは関数のフェッチが利用できません。

## 関数の宣言

以下は、コンテンツをフェッチするためのシンプルな同期的関数の例です：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "このコンテンツは関数によってレンダリングされます",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "このコンテンツは関数によってレンダリングされます",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "このコンテンツは関数によってレンダリングされます",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "このコンテンツは関数によってレンダリングされます"
  }
}
```

この例では、`text`キーには文字列を返す関数が含まれています。このコンテンツは、`react-intlayer`のようなIntlayerのインタープリターパッケージを使用してReactコンポーネント内でレンダリングできます。

## 非同期関数のフェッチ

同期関数に加えて、Intlayerは非同期関数もサポートしており、外部ソースからデータを取得したり、モックデータを使用してデータ取得をシミュレートすることができます。

以下は、サーバーからのフェッチをシミュレートする非同期関数の例です：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // サーバーからのフェッチをシミュレートするために200ms待つ
  return await setTimeout(200).then(() => "サーバーから取得したコンテンツです");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // サーバーからのフェッチをシミュレートするために200ms待つ
  await setTimeout(200);
  return "サーバーから取得したコンテンツです";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // サーバーからのフェッチをシミュレートするために200ms待つ
  await setTimeout(200);
  return "サーバーから取得したコンテンツです";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSONファイルからコンテンツを取得する方法はありません。代わりに.tsまたは.jsファイルを使用してください。
```

この場合、`fakeFetch`関数はサーバーの応答時間をシミュレートするために遅延を模倣します。Intlayerは非同期関数を実行し、その結果を`text`キーのコンテンツとして使用します。

## Reactコンポーネント内での関数ベースのコンテンツの使用

Reactコンポーネント内で関数ベースのコンテンツを使用するには、`react-intlayer`から`useIntlayer`をインポートし、コンテンツIDを指定して呼び出してコンテンツを取得する必要があります。以下はその例です：

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
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

```javascript fileName="**/*.mjx" codeFormat="esm"
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

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

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

module.exports = MyComponent;
```
