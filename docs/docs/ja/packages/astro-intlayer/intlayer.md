---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: intlayer 統合ドキュメント | astro-intlayer
description: astro.config.mjs で intlayer Astro 統合を設定および使用する方法を説明します。
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - 統合
  - i18n
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "ミドルウェアとフックの詳細を含む統合ドキュメントを更新"
  - version: 8.0.0
    date: 2026-01-21
    changes: "初期ドキュメント"
author: aymericzip
---

# intlayer Astro 統合ドキュメント

Astro 向けの `intlayer` 統合は、多言語国際化（i18n）のためにプロジェクトを設定します。ビルド時の辞書準備、Vite プラグインの注入、リクエストミドルウェアの自動登録、およびローカライズされたプリレンダリングページの出力を処理します。

## 使用方法

`astro.config.mjs` に `intlayer()` を追加します。

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Astro CLI のコードモッド（`astro add astro-intlayer`）でもサポートされているデフォルトインポートが生成されます。

```ts
import intlayer from "astro-intlayer";
```

## 説明

この統合は Astro のビルドおよびランタイムライフサイクルにフックします。

1. **設定セットアップ (`astro:config:setup`)**:
   - **辞書の準備**: ビルド実行前に Intlayer 辞書と生成された型を準備します。
   - **Vite プラグイン**: Vite エイリアス（シームレスな辞書インポートを可能にする）、ロケールルーティングプロキシ、およびビルドプルーニング用のプラグインを注入します。
   - **ミドルウェアの登録**: 受信リクエストごとに `Astro.locals.intlayer` を設定する `astro-intlayer/middleware` をプロジェクトのミドルウェアチェーンに自動的に注入します。
2. **ビルド完了 (`astro:build:done`)**:
   - **ページの書き換え**: ローカライズされた URL 書き換えルールを検査し、対応するローカライズされたパスにプリレンダリングされた HTML ページを出力します。

## すぐに利用できる機能

設定が完了すると、Astro アプリケーションはすぐに以下を利用できます。

- `.astro` コンポーネントのフロントマター内の `useIntlayer`、`useDictionary`、および `useLocale` フック。
- Astro エンドポイントおよびページ内の `Astro.locals.intlayer` オブジェクト。
- リアクティブな更新を備えた同じ API を反映する `<script>` ブロック内のクライアント側インポート。
- `astro-intlayer/format` の組み込みフォーマッター（`useDate`、`useNumber`、`useCurrency` など）。

## 関連ドキュメント

- [`useIntlayer` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useLocale.md)
- [`onRequest` ミドルウェア](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/onRequest.md)
