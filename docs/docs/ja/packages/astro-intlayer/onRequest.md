---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: onRequest ミドルウェアドキュメント | astro-intlayer
description: Astro アプリケーションで onRequest ミドルウェアを使用してリクエストロケールを解決し、Astro.locals.intlayer を設定する方法を説明します。
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初期ドキュメント"
author: aymericzip
---

# onRequest Astro ミドルウェアドキュメント

`astro-intlayer/middleware` の `onRequest` ミドルウェアは、各受信 HTTP リクエストのロケールを解決し、`Astro.locals.intlayer` を設定します。

`astro.config.mjs` に `intlayer()` 統合を登録すると、このミドルウェアは自動的に注入されます。`sequence(...)` を使用して Astro ミドルウェアを手動で合成する場合にのみ、直接インポートする必要があります。

## 使用方法

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // カスタムミドルウェアで解決されたロケールにアクセス
  const { locale } = context.locals.intlayer;
  console.log(`ロケール ${locale} のリクエストを処理中`);

  return next();
});
```

## 説明

ミドルウェアは以下の処理を実行します。

1. **ロケール検出**:
   - **URL**: URL パスプレフィックスまたは `?locale=` 検索パラメーターを分析します（`routing.mode` が `no-prefix` に設定されていない限り）。
   - **クッキー / ヘッダー**: 永続化されたロケールクッキーまたはカスタムヘッダー値をチェックします。
   - **Accept-Language**: ブラウザの優先言語ネゴシエーションにフォールバックします。
   - プリレンダリングページ（`context.isPrerendered`）の場合、Astro のビルド警告を防ぐためにロケールは厳密に URL から抽出されます。
2. **コンテキストの設定**: `Astro.locals.intlayer` に以下を設定します。
   - `locale`: 解決されたロケール。
   - `defaultLocale`: デフォルトのフォールバックロケール。
   - `availableLocales`: 設定されたロケールの配列。
3. **AsyncLocalStorage スコープ**: 後続のリクエスト処理を `AsyncLocalStorage` スコープ内にラップし、`useIntlayer()`、`useDictionary()`、および `useLocale()` が引数を渡さずにリクエスト状態にアクセスできるようにします。

## `IntlayerLocals` 型

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## 関連ドキュメント

- [`intlayer` 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useLocale.md)
