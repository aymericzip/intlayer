# Next.js Integration: `useIntlayer` Hook Documentation

`useIntlayer`フックは、Next.jsアプリケーション向けにローカライズされたコンテンツを効率的に取得し、管理するためにカスタマイズされています。このドキュメントでは、Next.jsプロジェクト内でフックを利用する方法に焦点を当て、適切なローカリゼーションプラクティスを確保します。

## Next.jsでの`useIntlayer`のインポート

Next.jsアプリケーションでクライアントサイドまたはサーバーサイドコンポーネントを作業しているかに応じて、次のように`useIntlayer`フックをインポートできます。

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

1. **`key`**: 取得したいコンテンツの辞書キーの識別子を示す文字列。
2. **`locale`**（オプション）: 使用する特定のロケール。省略された場合、フックはクライアントまたはサーバーのコンテキストで設定されたロケールをデフォルトとして使用します。

## コンテンツ宣言ファイル

すべてのコンテンツキーは、ランタイムエラーを防ぎ、型安全性を確保するためにコンテンツ宣言ファイル内で定義されていることが重要です。このアプローチは、コンパイル時のバリデーションのためにTypeScriptとの統合も容易にします。

コンテンツ宣言ファイルのセットアップに関する指示は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)で入手できます。

## Next.jsでの例

Next.jsページ内で`useIntlayer`フックを実装し、アプリケーションの現在のロケールに基づいてローカライズされたコンテンツを動的にロードする方法は次のとおりです。

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

## 属性ローカリゼーションの処理

`alt`、`title`、`href`、`aria-label`などの属性をローカライズするには、コンテンツを正しく参照することを確認してください。

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## さらなる情報

- **Intlayerビジュアルエディタ**: より簡単にコンテンツを管理するためのビジュアルエディタの使い方については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)をご覧ください。

このドキュメントでは、Next.js環境内で特に`useIntlayer`フックの使用を概説しており、Next.jsアプリケーション全体でのローカリゼーション管理の堅牢なソリューションを提供します。
