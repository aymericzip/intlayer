---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Intlayer コンテキストのドキュメント | remix-intlayer
description: Remix 3 アプリケーションにおける Intlayer リクエストコンテキストストレージキーのドキュメント。
keywords:
  - Intlayer
  - remix
  - remix-3
  - リクエストコンテキスト
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Intlayer コンテキストキーの初期ドキュメント"
author: aymericzip
---

# Intlayer リクエストコンテキストキー

`Intlayer` エクスポートは、Remix 3 におけるリクエストコンテキストストレージ識別子として機能します。ルートハンドラーやカスタムミドルウェア内で、Remix コンテキストオブジェクトから Intlayer の状態を直接取得できます。

## 使用方法

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## 説明

`Intlayer` は、`intlayer()` ミドルウェアが現在のセッション状態を Remix のリクエストコンテキスト（`RequestContext`）に関連付けるために使用されます。通常は `useLocale()` や `useIntlayer()` などのフックを使用することが推奨されます。`context.get(Intlayer)` による直接アクセスは、低レベルのミドルウェアハンドラーやコンテキストインスタンスが明示的に渡される API ルートで便利です。

## 関連ドキュメント

- [`intlayer` ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)
