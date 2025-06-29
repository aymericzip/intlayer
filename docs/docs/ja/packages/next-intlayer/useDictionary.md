---
docName: package__next-intlayer__useDictionary
url: https://intlayer.org/doc/packages/next-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useDictionary.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useDictionaryフックのドキュメント | next-intlayer
description: next-intlayerパッケージのuseDictionaryフックの使用方法をご覧ください
keywords:
  - useDictionary
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - Next.js
  - JavaScript
  - React
---

# React統合: `useDictionary`フックドキュメント

このセクションでは、Reactアプリケーション内で`useDictionary`フックを使用するための詳細なガイダンスを提供します。これにより、ビジュアルエディタを使用せずに効率的にローカライズされたコンテンツを処理できます。

## Reactでの`useDictionary`のインポート

`useDictionary`フックは、コンテキストに基づいてインポートすることでReactアプリケーションに統合できます。

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // クライアントサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // クライアントサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // クライアントサイドのReactコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // サーバーサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // サーバーサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // サーバーサイドのReactコンポーネントで使用
  ```

## パラメータ

このフックは2つのパラメータを受け取ります:

1. **`dictionary`**: 特定のキーに対するローカライズされたコンテンツを含む宣言された辞書オブジェクト。
2. **`locale`** (オプション): 希望するロケール。指定されていない場合は現在のコンテキストのロケールがデフォルトになります。

## 辞書

すべての辞書オブジェクトは、型安全性を確保し、実行時エラーを防ぐために構造化されたコンテンツファイルで宣言する必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)をご覧ください。以下はコンテンツ宣言の例です:

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

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
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

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
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

## Reactクライアントコンポーネントでの使用例

以下は、Reactコンポーネントで`useDictionary`フックを使用する例です:

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

## Reactサーバーコンポーネントでの使用例

`IntlayerServerProvider`の外部で`useDictionary`フックを使用する場合、コンポーネントをレンダリングする際にロケールを明示的に指定する必要があります:

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

## 属性に関する注意点

ビジュアルエディタを使用する統合とは異なり、`buttonTitle.value`のような属性はここでは適用されません。代わりに、コンテンツで宣言されたローカライズされた文字列に直接アクセスします。

```jsx
<button title={content.title}>{content.content}</button>
```

## 追加のヒント

- **型安全性**: 辞書を定義する際は常に`Dictionary`を使用して型安全性を確保してください。
- **ローカライズの更新**: コンテンツを更新する際は、すべてのロケールが一貫していることを確認し、翻訳漏れを防いでください。

このドキュメントは、`useDictionary`フックの統合に焦点を当てており、ビジュアルエディタ機能に依存せずにローカライズされたコンテンツを管理するための効率的なアプローチを提供します。
