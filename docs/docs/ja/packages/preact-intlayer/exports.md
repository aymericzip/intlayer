---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: preact-intlayer パッケージドキュメント
description: Intlayer の Preact 向け統合。Preact アプリケーション向けにプロバイダーとフックを提供します。
keywords:
  - preact-intlayer
  - preact
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに関するドキュメントを統合
---

# preact-intlayer パッケージ

`preact-intlayer` パッケージは、Intlayer を Preact アプリケーションに統合するために必要なツールを提供します。多言語コンテンツを処理するためのプロバイダーとフックを含みます。

## インストール

```bash
npm install preact-intlayer
```

## エクスポート

### プロバイダー

| コンポーネント     | 説明                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| `IntlayerProvider` | アプリケーションをラップし、Intlayerコンテキストを提供する主要なプロバイダー。 |

### フック

| フック          | 説明                                                                                                                           | 関連ドキュメント                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `useIntlayer`   | `useDictionary` をベースにしていますが、生成された宣言から最適化された辞書のバージョンを注入します。                           | -                                                                                               |
| `useDictionary` | キーとコンテンツ（key, content）のような辞書的なオブジェクトを処理します。`t()` の翻訳、enumerations（列挙）などを処理します。 | -                                                                                               |
| `useLocale`     | 現在のロケールとそれを設定する関数を返します。                                                                                 | -                                                                                               |
| `t`             | 現在のロケールに基づいてコンテンツを選択します。                                                                               | [翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |

### コンポーネント

| コンポーネント     | 説明                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| `MarkdownProvider` | Markdownレンダリングコンテキストのプロバイダ。                         |
| `MarkdownRenderer` | カスタムコンポーネントを用いてMarkdownコンテンツをレンダリングします。 |
