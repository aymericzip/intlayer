---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerフックのドキュメント | react-intlayer
description: react-intlayerパッケージのuseIntlayerフックの使用方法を確認してください
keywords:
  - useIntlayer
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - Next.js
  - JavaScript
  - React
---

# React統合: `useIntlayer`フックドキュメント

このセクションでは、Reactアプリケーション内で`useIntlayer`フックを使用するための詳細なガイダンスを提供し、効率的なコンテンツのローカライズを可能にします。

## Reactでの`useIntlayer`のインポート

`useIntlayer`フックは、コンテキストに基づいてインポートすることでReactアプリケーションに統合できます。

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // クライアントサイドのReactコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // サーバーサイドのReactコンポーネントで使用
  ```

## パラメータ

このフックは2つのパラメータを受け取ります:

1. **`key`**: ローカライズされたコンテンツを取得するための辞書キー。
2. **`locale`** (オプション): 希望するロケール。指定されていない場合はコンテキストのロケールがデフォルトになります。

## 辞書

すべての辞書キーは、型の安全性を高め、エラーを防ぐためにコンテンツ宣言ファイル内で宣言する必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)をご覧ください。

## Reactでの使用例

Reactコンポーネント内での`useIntlayer`フックの使用例を示します:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale); // ホームページのコンテンツを取得

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
  const content = useIntlayer("homepage", locale); // ホームページのコンテンツを取得

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
  const content = useIntlayer("homepage", locale); // ホームページのコンテンツを取得

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
  const content = useIntlayer("component-example"); // コンポーネント例のコンテンツを取得

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
  const content = useIntlayer("component-example"); // コンポーネント例のコンテンツを取得

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
  const content = useIntlayer("component-example"); // コンポーネント例のコンテンツを取得

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

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // サーバーコンポーネントのコンテンツを取得

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // サーバーコンポーネントのコンテンツを取得

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // サーバーコンポーネントのコンテンツを取得

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 属性の処理

属性をローカライズする際には、適切にコンテンツ値にアクセスします:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 追加リソース

- **Intlayerビジュアルエディター**: より直感的なコンテンツ管理体験のために、ビジュアルエディターのドキュメントは[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

このセクションは、Reactアプリケーションでの`useIntlayer`フックの統合に特化しており、ローカライズプロセスを簡素化し、異なるロケール間でのコンテンツの一貫性を確保します。
