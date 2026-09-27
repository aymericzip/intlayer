---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer ミドルウェアのドキュメント | remix-intlayer
description: Remix 3 で intlayer ミドルウェアを使用してロケールを検出し、リダイレクトを処理し、リクエストコンテキストに Intlayer 状態を注入する方法を学びます。
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "intlayer ミドルウェアの初期ドキュメント"
author: aymericzip
---

# intlayer ミドルウェア

`intlayer` ミドルウェア関数は、Remix 3 アプリケーションでリクエスト単位の国際化を設定します。受信したリクエストごとにロケールを検出し、URL リダイレクトルールを適用し、リクエストコンテキストにロケール状態を永続化します。

## 使用方法

Remix ルーターにミドルウェアを登録します。

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## 動作の仕組み

ミドルウェアは各受信リクエストに対して以下のタスクを実行します。

1. **ロケール検出**: Intlayer の設定に従い、URL パスプレフィックス（例: `/ja/about`）、クッキー、または `Accept-Language` ヘッダーからロケールを抽出します。
2. **URL リダイレクト**: 要求されたパスにロケールプレフィックスがなく、設定でプレフィックス付きルーティングが必要な場合、プレフィックス付き URL へのリダイレクトレスポンス（302/307/308）を返します。
3. **リクエストコンテキストの登録**: `Intlayer` キーを使用して解決された現在のロケールを Remix リクエストコンテキストに保存し、フック（`useLocale`、`useIntlayer`、`useDictionary`）が透過的に利用できるようにします。
4. **クッキー管理**: ユーザーの優先ロケールを永続化する必要がある場合、`Set-Cookie` ヘッダーを設定します。

## パラメーター

`intlayer` 関数は、オプションの `IntlayerMiddlewareOptions` を受け取ります:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // カスタムルーティング設定の上書き
};

const middleware = intlayer(options);
```

## コンテキストへの直接アクセス

フックを使用するほかに、解決された `IntlayerState` を Remix のリクエストコンテキストから直接取得することもできます:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // context.get() 経由
  const state = context.get(Intlayer);

  // または context.intlayer プロパティから直接
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## 関連ドキュメント

- [`Intlayer` リクエストコンテキスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/Intlayer.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)
