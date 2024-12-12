# Next.js Integration: `useIntlayer` フック ドキュメント

`useIntlayer` フックは、Next.js アプリケーション向けにローカライズされたコンテンツを効率的に取得・管理するために特化されています。このドキュメントでは、Next.js プロジェクト内でフックをどのように利用するかに焦点を当て、適切なローカリゼーションの実践を確保します。

## Next.js での `useIntlayer` のインポート

Next.js アプリケーションのクライアントサイドまたはサーバーサイドコンポーネントで作業しているかに応じて、以下のように `useIntlayer` フックをインポートすることができます。

- **クライアントコンポーネント:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // クライアントサイドコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // サーバーサイドコンポーネントで使用
  ```

## パラメータ

1. **`key`**: コンテンツを取得したい辞書キーの文字列識別子。
2. **`locale`** (任意): 使用する特定のロケール。省略した場合、フックはクライアントまたはサーバーのコンテキストに設定されたロケールをデフォルトとして使用します。

## コンテンツ宣言ファイル

すべてのコンテンツキーがコンテンツ宣言ファイル内で定義されていることが重要です。これにより、ランタイムエラーを防ぎ、タイプセーフティを確保します。このアプローチは、コンパイル時のバリデーションのための TypeScript 統合も促進します。

コンテンツ宣言ファイルのセットアップに関する指示は、[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)で確認できます。

## Next.js での使用例

Next.js ページ内で `useIntlayer` フックを実装して、アプリケーションの現在のロケールに基づいてダイナミックにローカライズされたコンテンツを読み込む方法は以下の通りです：

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params; // localeを取得
  const content = useIntlayer("homepage", locale); // コンテンツを取得

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

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component"); // コンテンツを取得

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component"); // コンテンツを取得

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 属性のローカライズの処理

`alt`、`title`、`href`、`aria-label` などの属性をローカライズするには、次のようにコンテンツを正しく参照してください：

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} /> // 画像のaltを設定
```

## さらなる情報

- **Intlayer ビジュアルエディタ**: コンテンツ管理を容易にするためのビジュアルエディタの使用方法については、[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)で学べます。

このドキュメントでは、特に Next.js 環境下での `useIntlayer` フックの使用について概説し、Next.js アプリケーション全体でのローカリゼーション管理のための堅牢なソリューションを提供します。
