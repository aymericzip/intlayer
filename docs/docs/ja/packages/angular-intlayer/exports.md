---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer パッケージのドキュメント
description: Angular アプリケーション向けに Intlayer を統合するための、プロバイダーとサービスを提供する Angular 専用の統合パッケージ。
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに対するドキュメントを統一
---

# angular-intlayer パッケージ

`angular-intlayer` パッケージは、Intlayer を Angular アプリケーションに統合するために必要なツールを提供します。多言語コンテンツを扱うためのプロバイダーとサービスが含まれます。

## インストール

```bash
npm install angular-intlayer
```

## エクスポート

Import:

```tsx
import "angular-intlayer";
```

### セットアップ

| 関数              | 説明                                                   |
| ----------------- | ------------------------------------------------------ |
| `provideIntlayer` | Angular アプリケーション内で Intlayer を提供する関数。 |

### フック

| フック                 | 説明                                                                                             | 関連ドキュメント |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ---------------- |
| `useIntlayer`          | `useDictionary` に基づいていますが、生成された宣言から辞書の最適化されたバージョンを注入します。 | -                |
| `useDictionary`        | 辞書（key、content）のようなオブジェクトを処理します。`t()` の翻訳や列挙、その他を処理します。   | -                |
| `useDictionaryAsync`   | `useDictionary` と同様ですが、非同期の辞書を扱います。                                           | -                |
| `useDictionaryDynamic` | `useDictionary` と同様ですが、動的な辞書を扱います。                                             | -                |
| `useLocale`            | 現在のロケールとそれを設定する関数を返します。                                                   | -                |
| `useIntl`              | 現在のロケールに対応する Intl オブジェクトを返します。                                           | -                |
| `useLoadDynamic`       | 動的辞書を読み込むためのフック。                                                                 | -                |

### コンポーネント

| コンポーネント              | 説明                                                           |
| --------------------------- | -------------------------------------------------------------- |
| `IntlayerMarkdownComponent` | Markdown コンテンツをレンダリングする Angular コンポーネント。 |
