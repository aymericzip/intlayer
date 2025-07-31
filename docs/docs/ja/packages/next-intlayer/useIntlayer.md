---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer フック ドキュメント | next-intlayer
description: next-intlayer パッケージの useIntlayer フックの使い方を説明します
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
  - next-intlayer
  - useIntlayer
---

# Next.js 統合: `useIntlayer` フック ドキュメント

`useIntlayer` フックは、Next.js アプリケーション向けに設計されており、ローカライズされたコンテンツを効率的に取得および管理します。このドキュメントでは、Next.js プロジェクト内でのフックの利用方法に焦点を当て、適切なローカリゼーションの実践を保証します。

## Next.js での `useIntlayer` のインポート

Next.js アプリケーションでクライアントサイドコンポーネントまたはサーバーサイドコンポーネントのどちらを扱っているかに応じて、`useIntlayer` フックを以下のようにインポートできます。

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // クライアントサイドコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // クライアントサイドコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // クライアントサイドコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // サーバーサイドコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // サーバーサイドコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // サーバーサイドコンポーネントで使用
  ```

## パラメーター

1. **`key`**: 取得したいコンテンツの辞書キーを識別する文字列。
2. **`locale`**（省略可能）: 使用する特定のロケール。省略した場合、フックはクライアントまたはサーバーのコンテキストで設定されたロケールをデフォルトで使用します。

## 辞書ファイル

すべてのコンテンツキーがコンテンツ宣言ファイル内で定義されていることは、ランタイムエラーを防ぎ、型の安全性を確保するために非常に重要です。この方法は、コンパイル時の検証のためにTypeScriptとの統合も容易にします。

コンテンツ宣言ファイルの設定手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)で確認できます。

## Next.jsでの使用例

以下は、Next.jsのページ内で`useIntlayer`フックを実装し、アプリケーションの現在のロケールに基づいてローカライズされたコンテンツを動的に読み込む方法です。

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 属性のローカライズの取り扱い

`alt`、`title`、`href`、`aria-label`などの属性をローカライズするには、コンテンツを正しく参照していることを確認してください：

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## さらなる情報

- **Intlayerビジュアルエディター**: より簡単なコンテンツ管理のためのビジュアルエディターの使い方は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

このドキュメントは、Next.js環境内での`useIntlayer`フックの使用方法を説明しており、Next.jsアプリケーション全体でのローカリゼーション管理に強力なソリューションを提供します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
