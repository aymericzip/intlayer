---
docName: package__next-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerフックのドキュメント | next-intlayer
description: next-intlayerパッケージのuseIntlayerフックの使い方を見てください
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
---

# Next.js統合: `useIntlayer`フックのドキュメント

`useIntlayer`フックは、Next.jsアプリケーション向けに設計されており、ローカライズされたコンテンツを効率的に取得および管理するためのものです。このドキュメントでは、Next.jsプロジェクト内でフックを利用する方法に焦点を当て、適切なローカライゼーションの実践を確保します。

## Next.jsでの`useIntlayer`のインポート

Next.jsアプリケーションでクライアントサイドまたはサーバーサイドのコンポーネントを操作するかに応じて、以下のように`useIntlayer`フックをインポートできます。

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

## パラメータ

1. **`key`**: 取得したいコンテンツの辞書キーを示す文字列識別子。
2. **`locale`** (オプション): 使用する特定のロケール。省略された場合、フックはクライアントまたはサーバーコンテキストで設定されたロケールをデフォルトとして使用します。

## 辞書ファイル

すべてのコンテンツキーがコンテンツ宣言ファイル内で定義されていることが重要です。これにより、ランタイムエラーを防ぎ、型安全性を確保できます。このアプローチは、TypeScript統合を容易にし、コンパイル時の検証を可能にします。

コンテンツ宣言ファイルの設定手順については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)をご覧ください。

## Next.jsでの使用例

以下は、`useIntlayer`フックをNext.jsページ内で実装し、アプリケーションの現在のロケールに基づいてローカライズされたコンテンツを動的にロードする方法です。

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

## 属性ローカライゼーションの処理

`alt`、`title`、`href`、`aria-label`などの属性をローカライズするには、コンテンツを正しく参照してください。

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## 詳細情報

- **Intlayerビジュアルエディタ**: コンテンツ管理を容易にするビジュアルエディタの使用方法については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

このドキュメントは、Next.js環境内での`useIntlayer`フックの使用に特化しており、Next.jsアプリケーション全体でローカライゼーションを管理するための堅牢なソリューションを提供します。
