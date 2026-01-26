---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer パッケージのドキュメント
description: Vue アプリケーション向けに Intlayer を統合するためのプラグインとコンポーザブルを提供します。
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統一
---

# vue-intlayer パッケージ

`vue-intlayer` パッケージは、Intlayer を Vue アプリケーションに統合するために必要なツールを提供します。Vue プラグインと多言語コンテンツを扱うための composables（コンポーザブル）を含みます。

## インストール

```bash
npm install vue-intlayer
```

## エクスポート

### プラグイン

インポート:

```tsx
import "vue-intlayer";
```

| Function          | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `installIntlayer` | アプリケーションにIntlayerをインストールするためのVueプラグイン。 |

### コンポーザブル

インポート:

```tsx
import "vue-intlayer";
```

| コンポーザブル         | 説明                                                                                                                                    | 関連ドキュメント                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary` をベースにしていますが、生成された宣言から最適化された辞書を注入します。                                                | -                                                                                                                     |
| `useDictionary`        | 辞書のように見えるオブジェクト（key, content）を処理します。`t()` の翻訳、列挙 (enumerations) などを処理します。                        | -                                                                                                                     |
| `useDictionaryAsync`   | `useDictionary` と同様ですが、非同期の辞書を処理します。                                                                                | -                                                                                                                     |
| `useDictionaryDynamic` | `useDictionary` と同様ですが、動的な辞書を処理します。                                                                                  | -                                                                                                                     |
| `useLocale`            | 現在のロケールと、それを設定する関数を返します。                                                                                        | -                                                                                                                     |
| `useRewriteURL`        | URL の書き換えを管理するクライアントサイドのコンポーザブル。ローカライズされた書き換えルールが存在する場合は自動的に URL を更新します。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | 現在のロケールの Intl オブジェクトを返します。                                                                                          | -                                                                                                                     |
| `useLoadDynamic`       | 動的辞書を読み込むためのコンポーザブル。                                                                                                | -                                                                                                                     |

### 関数

インポート:

```tsx
import "vue-intlayer";
```

| 関数            | 説明                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `getDictionary` | 辞書（key, content）の形式に見えるオブジェクトを処理します。`t()` 翻訳、列挙などを処理します。       |
| `getIntlayer`   | `getDictionary` をベースにしていますが、生成された宣言から辞書の最適化されたバージョンを注入します。 |

### Markdown（マークダウン）

インポート:

```tsx
import "vue-intlayer/markdown";
```

| 関数                      | 説明                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `installIntlayerMarkdown` | アプリケーションにIntlayer MarkdownをインストールするためのVueプラグイン。 |
