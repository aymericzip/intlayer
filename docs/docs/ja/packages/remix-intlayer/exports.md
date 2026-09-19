---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer パッケージのドキュメント
description: Remix 3 アプリケーションに国際化（i18n）を提供する remix-intlayer パッケージのエクスポートドキュメント。
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer エクスポートの初期ドキュメント"
author: aymericzip
---

# remix-intlayer パッケージ

`remix-intlayer` パッケージは、Intlayer を Remix 3 アプリケーションに統合するためのツールを提供します。リクエストのロケール検出用ミドルウェア、リクエストコンテキストへのアクセス、辞書の取得やロケール管理を行うフックが含まれています。

## インストール

```bash
npm install remix-intlayer
```

## パッケージのエクスポート

### ミドルウェア

| エクスポート | タイプ           | 説明                                                                                                          | 関連ドキュメント                                                                                                                     |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayer`   | ミドルウェア関数 | リクエストのロケールを検出し、リダイレクトを処理し、リクエストコンテキストを設定する Remix 3 用ミドルウェア。 | [intlayer ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/intlayerMiddleware.md) |

### コンテキストストレージ

| エクスポート | タイプ                           | 説明                                                                                                                                | 関連ドキュメント                                                                                                           |
| ------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`   | RequestContext キー / ストレージ | Remix 3 のリクエストコンテキスト（`context.get(Intlayer)`）から Intlayer の状態を取得するために使用するリクエストコンテキストキー。 | [Intlayer コンテキスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/Intlayer.md) |

### フック

| エクスポート    | タイプ | 説明                                                                                                 | 関連ドキュメント                                                                                                               |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | フック | 現在のリクエストロケールに基づいて、キーで指定された辞書コンテンツを取得・解決します。               | [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | フック | インポート済みの辞書オブジェクトから、現在のロケールに対応するコンテンツを返します。                 | [useDictionary フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | フック | 現在のリクエストロケール、デフォルトロケール、および利用可能なロケール一覧へのアクセスを提供します。 | [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)         |

## クイックスタート

### ルーターでのミドルウェア設定

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### コンポーネントおよびビューでのコンテンツ利用

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
