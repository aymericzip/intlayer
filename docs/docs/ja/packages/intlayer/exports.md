---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Package Documentation
description: The core package of Intlayer, providing the base functions and types for internationalization.
keywords:
  - intlayer
  - core
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# intlayer パッケージ

`intlayer` パッケージは Intlayer エコシステムのコアライブラリです。JavaScript および TypeScript アプリケーションで多言語コンテンツを管理するための基本的な関数、型、ユーティリティを提供します。

## インストール

```bash
npm install intlayer
```

## エクスポート

### 設定

インポート:

```tsx
import "intlayer";
```

| 変数               | 型                     | 説明                                                                                             | 関連ドキュメント                                                                                                        |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Intlayer の設定オブジェクト。                                                                    | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Intlayer の設定オブジェクトを返します。(**非推奨**: 代わりに `configuration` を使用してください) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | サポートされているすべてのロケールの一覧。                                                       | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | 必須のすべてのロケールの一覧。                                                                   | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | デフォルトのロケール。                                                                           | -                                                                                                                       |

### 型

インポート:

```tsx
import "intlayer";
```

| 型                    | 説明                                                       |
| --------------------- | ---------------------------------------------------------- |
| `Dictionary`          | 辞書の構造を定義するために使用される `Dictionary` 型。     |
| `DeclarationContent`  | (**非推奨**) 代わりに `Dictionary<T>` を使用してください。 |
| `IntlayerConfig`      | Intlayer の設定を定義する型。                              |
| `ContentNode`         | 辞書コンテンツのノード。                                   |
| `Locale`              | ロケールを表す型。                                         |
| `LocalesValues`       | ロケールの取り得る値。                                     |
| `StrictModeLocaleMap` | 厳密な型チェックを行うロケールのマップ。                   |

### コンテンツ関数

インポート:

```tsx
import "intlayer";
```

| 関数                     | 型         | 説明                                                                                             | 関連ドキュメント                                                                                       |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | 現在のロケールに基づいてコンテンツを選択します。                                                 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | 数量に基づいてコンテンツを選択します。                                                           | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | ブール条件に基づいてコンテンツを選択します。                                                     | [条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/condition.md)          |
| `gender`                 | `Function` | 性別に基づいてコンテンツを選択します。                                                           | [性別](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)             |
| `insert`                 | `Function` | コンテンツ文字列内に値を挿入します。                                                             | [挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)          |
| `nest` / `getNesting`    | `Function` | 別の辞書をネストします。                                                                         | [ネスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nesting.md)          |
| `md`                     | `Function` | Markdown コンテンツを処理します。                                                                | [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)       |
| `html`                   | `Function` | HTML コンテンツを処理します。                                                                    | [HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/html.md)               |
| `file`                   | `Function` | ファイルの内容を処理します。                                                                     | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file.md)               |
| `getDictionary`          | `Function` | キーと内容を持つ辞書のようなオブジェクトを処理します。`t()` 翻訳や列挙などを処理します。         | -                                                                                                      |
| `getIntlayer`            | `Function` | `getDictionary` に基づいていますが、生成された宣言から辞書の最適化されたバージョンを注入します。 | -                                                                                                      |

### ローカリゼーションユーティリティ

インポート:

```tsx
import "intlayer";
```

| 関数                   | 型         | 説明                                                         | 関連ドキュメント                                                                                                                |
| ---------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | 文字列またはパスからロケールを検出します。                   | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | ロケールの言語部分を取得します。                             | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | ロケールの表示名を取得します。                               | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | カノニカルなパスをローカライズされたパスに解決します。       | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | ローカライズされたパスをカノニカル（正規）パスに解決します。 | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | ローカライズされたURLを生成します。                          | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | サポートされているすべてのロケールのURLを生成します。        | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | パスからロケールプレフィックスを削除します。                 | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | パスからロケールプレフィックスを取得します。                 | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | テキストの方向（LTR/RTL）を取得します。                      | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | ロケールプレフィックスを検証します。                         | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/validatePrefix.md)             |

### ブラウザユーティリティ

Import:

```tsx
import "intlayer";
```

| 関数                   | 型         | 説明                                 |
| ---------------------- | ---------- | ------------------------------------ |
| `getBrowserLocale`     | `Function` | ブラウザの優先ロケールを検出します。 |
| `getCookie`            | `Function` | クッキーの値を取得します。           |
| `getLocaleFromStorage` | `Function` | ストレージからロケールを取得します。 |
| `setLocaleInStorage`   | `Function` | ストレージにロケールを保存します。   |

### フォーマッター

Import:

```tsx
import "intlayer";
```

| 関数           | 説明                                 |
| -------------- | ------------------------------------ |
| `number`       | 数値をフォーマットします。           |
| `currency`     | 通貨の値をフォーマットします。       |
| `percentage`   | パーセンテージをフォーマットします。 |
| `compact`      | 数値を短縮表記でフォーマットします。 |
| `date`         | 日付をフォーマットします。           |
| `relativeTime` | 相対時間をフォーマットします。       |
| `units`        | 単位付きの値をフォーマットします。   |
| `Intl`         | 標準の Intl オブジェクト。           |
