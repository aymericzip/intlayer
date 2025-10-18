---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer フック ドキュメント | react-intlayer
description: react-intlayer パッケージの useIntlayer フックの使い方を見る
keywords:
  - useIntlayer
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
---

# React 統合: `useIntlayer` フック ドキュメント

このセクションでは、React アプリケーション内で `useIntlayer` フックを使用する方法について詳しく説明し、効率的なコンテンツのローカライズを可能にします。

## React での `useIntlayer` のインポート

`useIntlayer` フックは、コンテキストに応じてインポートすることで React アプリケーションに統合できます。

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // クライアントサイドの React コンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // サーバーサイドの React コンポーネントで使用
  ```

## パラメーター

このフックは2つのパラメーターを受け取ります：

1. **`key`**: ローカライズされたコンテンツを取得するための辞書キー。
2. **`locale`**（オプション）: 希望するロケール。指定しない場合はコンテキストのロケールがデフォルトで使用されます。

## 辞書

すべての辞書キーは型安全性を高め、エラーを防ぐためにコンテンツ宣言ファイル内で宣言されている必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)で確認できます。

## Reactでの使用例

Reactコンポーネント内での`useIntlayer`フックの使用例：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 属性の取り扱い

属性をローカライズする際は、コンテンツの値に適切にアクセスしてください：

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 追加リソース

- **Intlayer ビジュアルエディター**: より直感的なコンテンツ管理体験のために、ビジュアルエディターのドキュメントは[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を参照してください。

このセクションは、Reactアプリケーションにおける `useIntlayer` フックの統合に特化しており、ローカリゼーションプロセスを簡素化し、異なるロケール間でのコンテンツの一貫性を確保します。

## 属性の取り扱い

属性をローカライズする際は、コンテンツの値に適切にアクセスしてください：

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 追加リソース

- **Intlayer ビジュアルエディター**: より直感的なコンテンツ管理体験のために、ビジュアルエディターのドキュメントは[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご参照ください。

このセクションは特に、Reactアプリケーションにおける `useIntlayer` フックの統合に焦点を当てており、ローカライズプロセスを簡素化し、異なるロケール間でのコンテンツの一貫性を確保します。
