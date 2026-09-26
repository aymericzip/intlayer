---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: astro-intlayer パッケージのドキュメント
description: ロケールベースのルーティング、ミドルウェア、フック、クライアントストア、辞書管理の設定を提供する Intlayer の Astro 統合。
keywords:
  - astro-intlayer
  - astro
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer、useDictionary、useLocale フック、ミドルウェア、フォーマッターのドキュメントを追加"
  - version: 8.0.0
    date: 2026-01-21
    changes: "すべてのエクスポートのドキュメントを統一"
author: aymericzip
---

# astro-intlayer パッケージ

`astro-intlayer` パッケージは、Intlayer を Astro アプリケーションに統合するために必要なツールを提供します。ロケールベースのルーティング、辞書管理、ビルド時のページ書き換え、リクエストミドルウェア、およびサーバーレンダリングされた `.astro` コンポーネントとクライアント側スクリプトの両方で多言語コンテンツにアクセスするためのフックを設定します。

## インストール

```bash
npm install astro-intlayer
```

## エクスポート

### 統合

`astro-intlayer` パッケージは、プロジェクトに Intlayer を設定する Astro 統合を提供します。

インポート:

```tsx
import { intlayer } from "astro-intlayer";
```

または `astro.config.mjs` でのデフォルトインポート:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| 関数       | 説明                                                                                                                                                                                                | 関連ドキュメント                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 辞書を準備し、Vite プラグイン（エイリアス、ルーティングプロキシ、プルーニング）を設定し、リクエストミドルウェアを自動登録し、ローカライズされた URL でプリレンダリングページを出力する Astro 統合。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/intlayer.md) |

### フック（サーバーおよびクライアント）

インポート:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| フック          | 説明                                                                                                                                                                                                        | 関連ドキュメント                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | キーによって辞書を1つ選択し、そのローカライズされたコンテンツを返します。`.astro` のフロントマターでは `Astro.locals` からリクエストロケールを読み取り、`<script>` ではクライアントストアから読み取ります。 | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | 辞書オブジェクトを変換し、解決されたロケールのコンテンツを返します。フロントマターおよびクライアントスクリプトで動作します。                                                                                | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | 現在のロケール、デフォルトロケール、利用可能なロケール一覧、およびロケール更新関数を返します。                                                                                                              | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/useLocale.md)         |

### ミドルウェア (astro-intlayer/middleware)

インポート:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| エクスポート | タイプ              | 説明                                                                                                                                                                | 関連ドキュメント                                                                                                |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest`  | `MiddlewareHandler` | リクエストロケールを検出し `Astro.locals.intlayer` をアタッチする Astro ミドルウェア。`intlayer()` によって自動登録されるか、手動で合成するためにインポートします。 | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/astro-intlayer/onRequest.md) |

### ユーティリティ

インポート:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| 関数                | 説明                                                                                                                | 関連ドキュメント |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `getIntlayerLocals` | `Astro.locals` の外部でリクエストストレージスコープから現在の `IntlayerLocals` オブジェクトを取得するヘルパー関数。 | -                |

### クライアントユーティリティ (astro-intlayer/client)

インポート:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

ブラウザまたはクライアントの `<script>` タグ内でインポートされると、`astro-intlayer` は自動的に `astro-intlayer/client`（`vanilla-intlayer` 提供）にマップされ、クライアント側の辞書ゲッター、ストア購読、およびロケール永続化ツールを提供します。

### フォーマッター (astro-intlayer/format)

インポート:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| フック            | 説明                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | キャッシュおよび購読機能を備えた、リクエストまたはクライアントロケールにバインドされた Intl インスタンスを返します。 |
| `useDate`         | 現在のロケールにバインドされた日付フォーマット関数を返します (`Intl.DateTimeFormat`)。                               |
| `useNumber`       | 現在のロケールにバインドされた数値フォーマット関数を返します (`Intl.NumberFormat`)。                                 |
| `useCurrency`     | 現在のロケールにバインドされた通貨フォーマット関数を返します。                                                       |
| `usePercentage`   | 現在のロケールにバインドされたパーセンテージフォーマット関数を返します。                                             |
| `useRelativeTime` | 現在のロケールにバインドされた相対時間フォーマット関数を返します (`Intl.RelativeTimeFormat`)。                       |
| `useList`         | 現在のロケールにバインドされたリストフォーマット関数を返します (`Intl.ListFormat`)。                                 |
| `useUnit`         | 現在のロケールにバインドされた単位フォーマット関数を返します。                                                       |
| `useCompact`      | 現在のロケールにバインドされたコンパクト数値フォーマット関数を返します（例: `1.5K`）。                               |

### HTML ユーティリティ (astro-intlayer/html)

インポート:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| エクスポート      | タイプ     | 説明                                                            |
| ----------------- | ---------- | --------------------------------------------------------------- |
| `renderHTML`      | `Function` | HTML ノードをレンダリングするスタンドアロンユーティリティ関数。 |
| `useHTML`         | `Hook`     | HTML プロバイダーコンテキストと設定を取得するフック。           |
| `useHTMLRenderer` | `Hook`     | 事前設定された HTML レンダラー関数を取得するフック。            |

### Markdown ユーティリティ (astro-intlayer/markdown)

インポート:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| エクスポート          | タイプ     | 説明                                                     |
| --------------------- | ---------- | -------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Markdown 文字列を構造化表現にコンパイルします。          |
| `renderMarkdown`      | `Function` | Markdown コンテンツを出力ノードにレンダリングします。    |
| `parseMarkdown`       | `Function` | 生の Markdown コンテンツを AST に解析します。            |
| `useMarkdown`         | `Hook`     | Markdown プロバイダーコンテキストを取得するフック。      |
| `useMarkdownRenderer` | `Hook`     | 事前設定された Markdown レンダラー関数を取得するフック。 |

### タイプ

インポート:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| タイプ            | 説明                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `IntlayerLocals`  | `locale`、`defaultLocale`、および `availableLocales` を含む `Astro.locals.intlayer` にアタッチされたオブジェクト。 |
| `UseLocaleProps`  | `useLocale()` が受け入れるオプションの設定プロパティ。                                                             |
| `UseLocaleResult` | ロケールプロパティと更新メソッドを提供する `useLocale()` の戻り値の型。                                            |
