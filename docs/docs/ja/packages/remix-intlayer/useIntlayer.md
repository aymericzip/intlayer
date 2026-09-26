---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer フックのドキュメント | remix-intlayer
description: Remix 3 アプリケーションで useIntlayer フックを使用して、キーによってローカライズされたコンテンツにアクセスする方法を説明します。
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer フックの初期ドキュメント"
author: aymericzip
---

# useIntlayer フックのドキュメント

`useIntlayer` フックを使用すると、Remix 3 アプリケーションでキーを指定して Intlayer 辞書からローカライズされたコンテンツを取得できます。

現在のリクエストコンテキスト（`AsyncLocalStorage` 経由）からアクティブなロケールを自動的に読み取るため、ルートハンドラー、ビューテンプレート、またはコンポーネント間でロケールを受け渡す必要はありません。

## 使用方法

### ルートハンドラー内での使用

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### ビューテンプレートおよびコンポーネント内での使用

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## パラメーター

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: 辞書の一意のキー（`.content.ts` 宣言ファイルで定義されたもの）。
2. **`localeOrSelector`**（オプション）: 特定のロケールまたはセレクターオブジェクト（`{ item }`、`{ variant }`、必要に応じて `locale`）。指定された場合、リクエストコンテキストから検出されたロケールを上書きします。

## 説明

このフックは以下の処理を実行します。

1. **コンテキストロケールの取得**: `intlayer()` ミドルウェアによって設定されたリクエストスコープの `AsyncLocalStorage` から現在のロケールを検出します。
2. **辞書の取得**: 指定されたキーに対応する事前コンパイル済み辞書を取得します。
3. **翻訳処理**: 解決されたロケールに基づいて、翻訳、列挙、マークダウン、および条件付きコンテンツを解決します。
4. **フォールバック処理**: アクティブな HTTP リクエストコンテキスト外（ミドルウェアのないバックグラウンドタスクや単体テストなど）で呼び出された場合、設定された `defaultLocale` に安全にフォールバックします。

## 関連ドキュメント

- [`intlayer` ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useDictionary.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)
