---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer パッケージのドキュメント
description: Intlayer のための React Native サポート。プロバイダー、フック、ポリフィル、Metro 設定を提供します。
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "react-intlayer の完全な API（フック、ユーティリティ、format/html/markdown サブパス）を再エクスポートし、React Native アプリが react-native-intlayer のみに依存できるようにした"
  - version: 8.0.0
    date: 2026-01-21
    changes: "すべてのエクスポートに関するドキュメントを統一"
author: aymericzip
---

# react-native-intlayer パッケージ

`react-native-intlayer` パッケージは、Intlayer を React Native アプリケーションに統合するために必要なツールを提供します。React Native 対応の `IntlayerProvider` を備えた `react-intlayer` の完全な API（フックとユーティリティ）を再エクスポートし、React Native に必要なポリフィルと Metro 設定も含みます。

> React Native アプリでは、`react-native-intlayer` から**すべて**をインポートしてください。`react-intlayer` を直接インストールまたはインポートする必要はありません。

## インストール

```bash
npm install react-native-intlayer
```

## エクスポート

### プロバイダー

| コンポーネント     | 説明                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | アプリケーションをラップし、Intlayer コンテキストを提供するプロバイダーコンポーネント。必要なポリフィルを自動的に適用します。 |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### フックとユーティリティ

これらは `react-intlayer` から再エクスポートされているため、`react-native-intlayer` から直接インポートできます：

| エクスポート                                                                                                      | 説明                                               |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `useIntlayer`                                                                                                     | 辞書キーのローカライズされたコンテンツにアクセス。 |
| `useLocale`                                                                                                       | 現在のロケールを読み取り、変更する。               |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | さまざまな方法で辞書コンテンツを読み込む。         |
| `useI18n`                                                                                                         | i18next 互換フック。                               |
| `t`                                                                                                               | インライン翻訳ヘルパー。                           |
| `getIntlayer`, `getDictionary`                                                                                    | 命令型コンテンツゲッター。                         |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | ロケール永続化ヘルパー。                           |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### ポリフィル

| 関数               | 説明                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| `intlayerPolyfill` | React Native が Intlayer をサポートするために必要なポリフィルを適用する関数。 |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> ポリフィルは `IntlayerProvider` をインポートすると自動的に適用されます。プロバイダーがマウントされる前にポリフィルが必要な場合のみ、`intlayerPolyfill` を手動で呼び出してください。

### フォーマッター

数値、日付、その他の Intl ベースのフォーマットフックは `/format` サブパスから利用できます：

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown と HTML のレンダリング

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro の設定

`react-native-intlayer` パッケージは、Intlayer が React Native 上で正しく動作するようにするための Metro 設定ユーティリティを提供します。

| 関数                      | 説明                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer を準備し、Metro 設定をマージする非同期関数。                                                 |
| `configMetroIntlayerSync` | Intlayer のリソースを準備せずに Metro 設定をマージする同期関数。                                      |
| `exclusionList`           | バンドルからコンテンツファイルを除外するために、Metro の blockList 用の RegExp パターンを作成します。 |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
