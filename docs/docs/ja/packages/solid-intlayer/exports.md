---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer パッケージのドキュメント
description: Intlayer の Solid 向け統合。Solid アプリケーション向けの providers と hooks を提供します。
keywords:
  - solid-intlayer
  - solidjs
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 全エクスポートのドキュメントを統一
---

# solid-intlayer パッケージ

`solid-intlayer` パッケージは、Intlayer を Solid アプリケーションに統合するために必要なツールを提供します。多言語コンテンツを扱うための providers と hooks を含みます。

## インストール

```bash
npm install solid-intlayer
```

## エクスポート

### プロバイダー

インポート:

```tsx
import "solid-intlayer";
```

| コンポーネント     | 説明                                                                              | 関連ドキュメント                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | アプリケーションをラップし、Intlayer コンテキストを提供するメインのプロバイダー。 | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/IntlayerProvider.md) |

### フック

インポート:

```tsx
import "solid-intlayer";
```

| フック                 | 説明                                                                                                                           | 関連ドキュメント                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary` に基づくが、生成された宣言から辞書の最適化されたバージョンを注入します。                                       | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | 辞書のようなオブジェクト（key、content）を処理します。`t()` の翻訳や列挙などを処理します。                                     | -                                                                                                                       |
| `useDictionaryAsync`   | `useDictionary` と同じですが、非同期の辞書を扱います。                                                                         | -                                                                                                                       |
| `useDictionaryDynamic` | `useDictionary` と同じですが、動的な辞書を扱います。                                                                           | -                                                                                                                       |
| `useLocale`            | 現在のロケールと、それを設定する関数を返します。                                                                               | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | クライアント側のフックで、URLの書き換えを管理します。ローカライズされた書き換えルールが存在する場合、自動的にURLを更新します。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | 現在のロケールのIntlオブジェクトを返します。                                                                                   | -                                                                                                                       |
| `useLoadDynamic`       | 動的辞書を読み込むフック。                                                                                                     | -                                                                                                                       |
| `t`                    | 現在のロケールに基づいてコンテンツを選択します。                                                                               | [翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)                         |

### コンポーネント

インポート:

```tsx
import "solid-intlayer";
```

| コンポーネント     | 説明                                               |
| ------------------ | -------------------------------------------------- |
| `MarkdownProvider` | Markdownレンダリングのコンテキスト用プロバイダー。 |
