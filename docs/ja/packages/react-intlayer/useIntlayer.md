# React Integration: `useIntlayer` フック ドキュメント

このセクションでは、React アプリケーション内で `useIntlayer` フックを使用するための詳細なガイダンスを提供し、効率的なコンテンツローカリゼーションを可能にします。

## React での `useIntlayer` のインポート

`useIntlayer` フックは、コンテキストに基づいて React アプリケーションに統合できます。

- **クライアントコンポーネント:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

## パラメーター

フックは2つのパラメーターを受け取ります：

1. **`key`**: ローカライズされたコンテンツを取得するための辞書キー。
2. **`locale`** (オプション): 希望するロケール。指定されない場合はコンテキストのロケールがデフォルトとなります。

## コンテンツ宣言

すべての辞書キーは、型安全性を高め、エラーを回避するためにコンテンツ宣言ファイル内で宣言する必要があります。設定手順については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)を参照してください。

## React での使用例

React コンポーネント内の `useIntlayer` フックのデモ：

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

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

import { useIntlayer } from "react-intlayer/server";

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

## 属性の処理

属性をローカライズする際は、コンテンツ値に適切にアクセスします：

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 追加リソース

- **Intlayer ビジュアルエディタ**: より直感的なコンテンツ管理体験のために、ビジュアルエディタドキュメントを[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)で参照してください。

このセクションは、React アプリケーションにおける `useIntlayer` フックの統合を特に対象としており、ローカリゼーションプロセスを簡素化し、異なるロケール間でのコンテンツの一貫性を確保します。
