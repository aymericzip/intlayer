---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 関数フェッチング
description: 多言語ウェブサイトで関数フェッチングを宣言し使用する方法を紹介します。このオンラインドキュメントの手順に従って、数分でプロジェクトをセットアップしましょう。
keywords:
  - 関数フェッチング
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
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
---

# 関数フェッチング

Intlayerでは、コンテンツモジュール内で同期または非同期の関数を宣言できます。アプリケーションのビルド時に、Intlayerはこれらの関数を実行して関数の結果を取得します。返り値はJSONオブジェクトか、文字列や数値のような単純な値でなければなりません。

> 警告: 関数フェッチングは現在、JSONコンテンツ宣言およびリモートコンテンツ宣言ファイルでは利用できません。

## 関数の宣言

以下は、単純な同期関数でコンテンツをフェッチする例です。

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

この例では、`text`キーに文字列を返す関数が含まれています。このコンテンツは、`react-intlayer`のようなIntlayerのインタープリターパッケージを使用して、Reactコンポーネント内でレンダリングできます。

## 非同期関数のフェッチ

同期関数に加えて、Intlayerは非同期関数もサポートしており、外部ソースからデータを取得したり、モックデータでデータ取得をシミュレートしたりすることが可能です。

以下は、サーバーフェッチをシミュレートする非同期関数の例です：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // サーバーからのフェッチをシミュレートするために200ms待機
  return await setTimeout(200).then(
    () => "これはサーバーから取得したコンテンツです"
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
  return "これはサーバーから取得したコンテンツです";
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
  return "これはサーバーから取得したコンテンツです";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSONファイルからコンテンツを取得する方法はありません。代わりに.tsまたは.jsファイルを使用してください
```

この場合、`fakeFetch` 関数はサーバーの応答時間をシミュレートするために遅延を模倣しています。Intlayer は非同期関数を実行し、その結果を `text` キーのコンテンツとして使用します。

## React コンポーネントで関数ベースのコンテンツを使用する

React コンポーネントで関数ベースのコンテンツを使用するには、`react-intlayer` から `useIntlayer` をインポートし、コンテンツ ID を指定して呼び出す必要があります。以下はその例です。

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
      {/* 出力: これはサーバーから取得されたコンテンツです */}
    </div>
  );
};

export default MyComponent;
```

この場合、`fakeFetch`関数はサーバーの応答時間をシミュレートするために遅延を模倣しています。Intlayerは非同期関数を実行し、その結果を`text`キーのコンテンツとして使用します。

## Reactコンポーネントで関数ベースのコンテンツを使用する

Reactコンポーネントで関数ベースのコンテンツを使用するには、`react-intlayer`から`useIntlayer`をインポートし、コンテンツIDを渡してコンテンツを取得します。以下は例です：

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
      {/* 出力: これはサーバーから取得されたコンテンツです */}
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
      {/* 出力: これはサーバーから取得されたコンテンツです */}
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
      {/* 出力: これはサーバーから取得されたコンテンツです */}
    </div>
  );
};

module.exports = MyComponent;
```
