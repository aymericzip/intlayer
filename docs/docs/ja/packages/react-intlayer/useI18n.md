---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useI18n フック ドキュメント | react-intlayer
description: react-intlayer パッケージで useI18n フックを使用する方法を学ぶ
keywords:
  - useI18n
  - i18n
  - 翻訳
  - 辞書
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
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: `useI18n` フックのドキュメント初版作成
---

# React 統合: `useI18n` フック ドキュメント

このセクションでは、React アプリケーション内で `useI18n` フックを使用して効率的なコンテンツのローカライズを実現する方法について詳細に説明します。

## React での `useI18n` のインポート

`useI18n` フックは、以下のようにコンテキストに応じて React アプリケーションにインポートおよび統合できます。

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // クライアントサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // クライアントサイドの React コンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // サーバーサイドの React コンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // サーバーサイドの React コンポーネントで使用
  ```

## パラメータ

このフックは2つのパラメータを受け取ります：

1. **`namespace`**：翻訳キーのスコープを指定する辞書の名前空間。
2. **`locale`**（オプション）：希望するロケール。指定しない場合は、コンテキストのロケールがデフォルトで使用されます。

## 辞書

すべての辞書キーは、型安全性を高めエラーを防ぐためにコンテンツ宣言ファイル内で宣言する必要があります。[設定手順はこちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)で確認できます。

## Reactでの使用例

Reactコンポーネント内で`useI18n`フックを使用する例：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* タイトルを表示 */}
      <p>{t("description")}</p> {/* 説明を表示 */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* タイトルを表示 */}
      <p>{t("description")}</p> {/* 説明を表示 */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* タイトルを表示 */}
      <p>{t("description")}</p> {/* 説明を表示 */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* タイトルを表示 */}
      <p>{t("description")}</p> {/* 説明を表示 */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* タイトルを表示 */}
      <p>{t("description")}</p> {/* 説明を表示 */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## 属性の取り扱い

属性をローカライズする際は、翻訳値に適切にアクセスしてください：

```jsx
<!-- アクセシビリティ属性（例：aria-label）には、純粋な文字列が必要なため .value を使用します -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## 追加リソース

- **Intlayer ビジュアルエディター**: より直感的なコンテンツ管理体験のために、ビジュアルエディターのドキュメントは[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご参照ください。

このセクションでは、Reactアプリケーションにおける `useI18n` フックの統合について具体的に説明しており、ローカライズプロセスを簡素化し、異なるロケール間でのコンテンツの一貫性を確保します。
