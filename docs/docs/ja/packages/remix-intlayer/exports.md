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

| エクスポート                | タイプ                           | 説明                                                                                                                                             | 関連ドキュメント                                                                                                           |
| --------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | RequestContext キー / ストレージ | Remix 3 のリクエストコンテキスト（`context.get(Intlayer)`）から Intlayer の状態を取得するために使用するリクエストコンテキストキー。              | [Intlayer コンテキスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                         | リクエストコンテキストに直接設定されるプロパティ名（`'intlayer'`）。`context.intlayer` および `context.get(Intlayer)` を介してアクセス可能です。 | -                                                                                                                          |

### フック

| エクスポート    | タイプ | 説明                                                                                                 | 関連ドキュメント                                                                                                               |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | フック | 現在のリクエストロケールに基づいて、キーで指定された辞書コンテンツを取得・解決します。               | [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | フック | インポート済みの辞書オブジェクトから、現在のロケールに対応するコンテンツを返します。                 | [useDictionary フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | フック | 現在のリクエストロケール、デフォルトロケール、および利用可能なロケール一覧へのアクセスを提供します。 | [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/remix-intlayer/useLocale.md)         |

### ユーティリティ

インポート:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| 関数                  | 説明                                                                                                                                                         | 関連ドキュメント |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `createLocaleRouting` | リクエスト、設定、およびオプションに基づいてロケールルーティングの決定（`redirect`、`rewrite`、または `pass`）を計算する純粋関数。                           | -                |
| `getIntlayerState`    | React コンポーネントの外部で `AsyncLocalStorage` リクエストスコープから現在の `IntlayerState`（`locale`、`defaultLocale`、`availableLocales`）を取得します。 | -                |

### フォーマッター (remix-intlayer/format)

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
} from "remix-intlayer/format";
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

### HTML ユーティリティ (remix-intlayer/html)

インポート:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| エクスポート      | タイプ     | 説明                                                            |
| ----------------- | ---------- | --------------------------------------------------------------- |
| `renderHTML`      | `Function` | HTML ノードをレンダリングするスタンドアロンユーティリティ関数。 |
| `useHTML`         | `Hook`     | HTML プロバイダーコンテキストと設定を取得するフック。           |
| `useHTMLRenderer` | `Hook`     | 事前設定された HTML レンダラー関数を取得するフック。            |

### Markdown ユーティリティ (remix-intlayer/markdown)

インポート:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| タイプ                      | 説明                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Remix リクエストコンテキストに保存される、`locale`、`defaultLocale`、および `availableLocales` を保持する状態オブジェクト。 |
| `IntlayerMiddlewareOptions` | `intlayer()` ミドルウェアに渡される設定オプション。                                                                         |
| `LocaleRoutingOptions`      | ロケールプレフィックス、検出、およびリダイレクトをカスタマイズするオプション。                                              |
| `LocaleRoutingAction`       | ルーティングの決定を表す判別共用体：`redirect`、`rewrite`、または `pass`。                                                  |
| `LocaleRoutingRequest`      | `createLocaleRouting` に必要な最小限のリクエスト表現。                                                                      |
| `UseLocaleResult`           | `locale`、`defaultLocale`、および `availableLocales` を含む `useLocale()` の戻り値の型。                                    |
