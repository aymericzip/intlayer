# React Integration: `useDictionary` フックのドキュメンテーション

このセクションでは、React アプリケーション内で `useDictionary` フックを使用するための詳細なガイダンスを提供し、視覚エディタなしでローカライズされたコンテンツの効率的な処理を可能にします。

## React での `useDictionary` のインポート

`useDictionary` フックは、コンテキストに基づいて React アプリケーションに統合できます:

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // クライアントサイドの React コンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // サーバーサイドの React コンポーネントで使用
  ```

## パラメータ

このフックは2つのパラメータを受け取ります：

1. **`dictionary`**: 特定のキーに対するローカライズされたコンテンツを含む宣言された辞書オブジェクト。
2. **`locale`**（オプション）: 希望するロケール。指定されていない場合は、現在のコンテキストのロケールがデフォルトとして使用されます。

## コンテンツ宣言

すべての辞書オブジェクトは、型安全性を確保し、ランタイムエラーを防ぐために構造化されたコンテンツファイルに宣言する必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)で確認できます。以下はコンテンツ宣言の例です：

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## React クライアントコンポーネントでの使用例

以下は、React コンポーネント内で `useDictionary` フックを使用する方法の例です：

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## React サーバーコンポーネントでの使用例

`useDictionary` フックを `IntlayerServerProvider` の外で使用する場合、コンポーネントのレンダリング時にロケールを明示的にパラメータとして提供する必要があります：

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## 属性に関する注意事項

視覚エディタを使用した統合とは異なり、`buttonTitle.value` のような属性はここでは適用されません。代わりに、コンテンツに宣言されたローカライズされた文字列に直接アクセスしてください。

```jsx
<button title={content.title}>{content.content}</button>
```

## 追加のヒント

- **型安全性**: 辞書を定義する際には、常に `Dictionary` を使用して型安全性を確保してください。
- **ローカライズの更新**: コンテンツを更新する際には、すべてのロケールが一貫していることを確認し、翻訳の欠落を避けてください。

このドキュメントは、視覚エディタの機能に依存することなく、ローカライズされたコンテンツを管理するための合理化されたアプローチを提供する、`useDictionary` フックの統合に焦点を当てています。
