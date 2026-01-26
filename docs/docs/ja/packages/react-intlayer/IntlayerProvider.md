---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider コンポーネントのドキュメント | react-intlayer
description: react-intlayer パッケージの IntlayerProvider コンポーネントの使用方法を見る
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: ドキュメント初期化
---

# IntlayerProvider コンポーネントのドキュメント

`IntlayerProvider` コンポーネントは、React アプリケーションにおける Intlayer の主要なプロバイダーです。すべての子要素に Intlayer コンテキストを提供します。

## 使用例

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## プロパティ

| Prop              | Type                              | 説明                                                   |
| ----------------- | --------------------------------- | ------------------------------------------------------ |
| `locale`          | `LocalesValues`                   | 初期的に使用するロケール。                             |
| `defaultLocale`   | `LocalesValues`                   | フォールバックとして使用するデフォルトのロケール。     |
| `setLocale`       | `(locale: LocalesValues) => void` | ロケールを設定するカスタム関数。                       |
| `disableEditor`   | `boolean`                         | エディタを無効化するかどうか。                         |
| `isCookieEnabled` | `boolean`                         | ロケールを保存するためにクッキーを有効にするかどうか。 |
