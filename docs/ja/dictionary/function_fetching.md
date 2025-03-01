# 関数フェッチング

Intlayerを使用すると、コンテンツモジュール内で同期または非同期のコンテンツ関数を宣言できます。アプリケーションがビルドされると、Intlayerはこれらの関数を実行して関数の結果を取得します。戻り値はJSONオブジェクト、または文字列や数値のような単純な値である必要があります。

> 警告: 関数フェッチングは現在、JSONコンテンツ宣言およびリモートコンテンツ宣言ファイルでは利用できません。

## 関数宣言

以下は、シンプルな同期関数でコンテンツをフェッチする例です:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "これは関数によってレンダリングされたコンテンツです",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "これは関数によってレンダリングされたコンテンツです",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "これは関数によってレンダリングされたコンテンツです",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "これは関数によってレンダリングされたコンテンツです"
  }
}
```

この例では、`text`キーに文字列を返す関数が含まれています。このコンテンツは、Intlayerの`react-intlayer`のようなインタープリターパッケージを使用してReactコンポーネント内でレンダリングできます。

## 非同期関数フェッチング

同期関数に加えて、Intlayerは非同期関数もサポートしており、外部ソースからデータをフェッチしたり、モックデータでデータ取得をシミュレートしたりすることができます。

以下は、サーバーフェッチをシミュレートする非同期関数の例です:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // サーバーからのフェッチをシミュレートするために200ms待機
  return await setTimeout(200).then(
    () => "これはサーバーからフェッチされたコンテンツです"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // サーバーからのフェッチをシミュレートするために200ms待機
  await setTimeout(200);
  return "これはサーバーからフェッチされたコンテンツです";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // サーバーからのフェッチをシミュレートするために200ms待機
  await setTimeout(200);
  return "これはサーバーからフェッチされたコンテンツです";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSONファイルからコンテンツをフェッチする方法はありません。.tsまたは.jsファイルを使用してください
```

この場合、`fakeFetch`関数はサーバー応答時間をシミュレートするための遅延を模倣します。Intlayerは非同期関数を実行し、その結果を`text`キーのコンテンツとして使用します。

## Reactコンポーネントで関数ベースのコンテンツを使用する

Reactコンポーネントで関数ベースのコンテンツを使用するには、`react-intlayer`から`useIntlayer`をインポートし、コンテンツIDを使用してコンテンツを取得します。以下はその例です:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 出力: これは関数によってレンダリングされたコンテンツです */}
      <p>{asyncFunctionContent.text}</p>
      {/* 出力: これはサーバーからフェッチされたコンテンツです */}
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
      {/* 出力: これは関数によってレンダリングされたコンテンツです */}
      <p>{asyncFunctionContent.text}</p>
      {/* 出力: これはサーバーからフェッチされたコンテンツです */}
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
      {/* 出力: これは関数によってレンダリングされたコンテンツです */}
      <p>{asyncFunctionContent.text}</p>
      {/* 出力: これはサーバーからフェッチされたコンテンツです */}
    </div>
  );
};

module.exports = MyComponent;
```
