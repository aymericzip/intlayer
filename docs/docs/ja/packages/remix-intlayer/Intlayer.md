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

`intlayer()` ミドルウェアが実行されると、`IntlayerState` オブジェクトが `Intlayer` キーの下でリクエストコンテキストに保存されます。任意のルートハンドラー内で取得できます:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // context.get(Intlayer) 経由でアクセス
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

直接プロパティのショートハンド `context.intlayer` を使ってアクセスすることもできます:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## `IntlayerState` の構造

`IntlayerState` オブジェクトには以下が含まれます:

| プロパティ         | 型                  | 説明                                                         |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | 現在のリクエストに対して解決されたロケール。                 |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts` で定義されたフォールバックロケール。    |
| `availableLocales` | `DeclaredLocales[]` | プロジェクトで設定されたすべてのサポート対象ロケールの一覧。 |

## 関連ドキュメント

- [`intlayer` ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)
