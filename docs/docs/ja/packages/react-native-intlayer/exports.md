---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer パッケージのドキュメント
description: Intlayer のための React Native サポート。プロバイダーとポリフィルを提供します。
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
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに関するドキュメントを統一
---

# react-native-intlayer パッケージ

`react-native-intlayer` パッケージは、Intlayer を React Native アプリケーションに統合するために必要なツールを提供します。プロバイダーとロケールサポートのためのポリフィルが含まれています。

## インストール

```bash
npm install react-native-intlayer
```

## エクスポート

### プロバイダー

| コンポーネント     | 説明                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| `IntlayerProvider` | アプリケーションをラップし、Intlayer コンテキストを提供するプロバイダーコンポーネント。 |

インポート:

```tsx
import "react-native-intlayer";
```

### ポリフィル

| 関数               | 説明                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| `intlayerPolyfill` | React Native が Intlayer をサポートするために必要なポリフィルを適用する関数。 |

インポート:

```tsx
import "react-native-intlayer";
```

### Metro の設定

`react-native-intlayer` パッケージは、Intlayer が React Native 上で正しく動作するようにするための Metro 設定ユーティリティを提供します。

| 関数                      | 説明                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer を準備し、Metro 設定をマージする非同期関数。                                                 |
| `configMetroIntlayerSync` | Intlayer のリソースを準備せずに Metro 設定をマージする同期関数。                                      |
| `exclusionList`           | バンドルからコンテンツファイルを除外するために、Metro の blockList 用の RegExp パターンを作成します。 |

インポート:

```tsx
import "react-native-intlayer/metro";
import "react-native-intlayer/metro";
```
