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

# intlayer Remix 3 ミドルウェアドキュメント

Remix 3 向けの `intlayer` ミドルウェアは、アプリケーション全体の国際化レイヤーを管理します。Web 標準（`Request` と `Response`）に基づいて構築されており、ロケールルーティング（リダイレクトと内部リライト）を処理し、リクエストのロケールを検出して、クッキーとヘッダーに永続化します。さらに `AsyncLocalStorage` スコープを確立することで、下流のハンドラーやコンポーネントが props のバケツリレーなしに翻訳へアクセスできるようにします。

## 使用方法

Remix 3 ルーターの初期化時に `intlayer` ミドルウェアを登録します。

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// `/`、`/fr`、`/es` を処理し、ロケールはリクエストから解決されます
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## 説明

`intlayer` ミドルウェアは以下のタスクを実行します。

1. **辞書の準備**: 起動時に `prepareIntlayer` を実行し、生成されたすべての辞書がビルドされ利用可能であることを保証します。
2. **ロケールルーティング**: 設定されたルーティング戦略（`prefix_always`、`prefix_as_needed`、`no_prefix`）に基づいてリクエストを評価します。
   - **リダイレクト**: ユーザーが `/about` にアクセスし、ロケールプレフィックス（例: `/fr/about`）へルーティングされるべき場合、ミドルウェアは適切な `location` および `Set-Cookie` ヘッダーを含むリダイレクトレスポンスを返します。
   - **内部リライト**: ユーザーが `/fr/about` にアクセスすると、URL は内部的にリライトされ、ルートハンドラーは `/about` にマッチします。一方、解決されたロケールは `fr` として取得されます。
   - **ローカライズされた URL エイリアス**: `intlayer.config.ts` で定義された URL リライトルールを尊重します（例: `/fr/about` を `/fr/a-propos` にリライト）。
3. **ロケールの解決**: URL プレフィックス、永続化されたクッキー、カスタムヘッダー、または `Accept-Language` によるブラウザの設定に基づいてアクティブなロケールを検出します。
4. **コンテキストの注入**:
   - `IntlayerState`（`locale`、`defaultLocale`、`availableLocales`）を、`Intlayer` キーおよび `context.intlayer` の下で Remix の `RequestContext` にアタッチします。
   - リクエストの残りの処理を `AsyncLocalStorage` スコープ（`requestStorage`）内で実行し、ハンドラー、ビュー、コンポーネント内で `useIntlayer`、`useDictionary`、`useLocale` をすっきりと呼び出せるようにします。
5. **永続化**: 送信するロケールヘッダーとクッキーを最終的な HTTP レスポンスに付与し、ユーザーの設定を保持します。

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
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)
