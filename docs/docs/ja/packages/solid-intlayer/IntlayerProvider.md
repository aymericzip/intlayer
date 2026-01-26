---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider コンポーネントのドキュメント | solid-intlayer
description: solid-intlayer パッケージの IntlayerProvider コンポーネントの使い方を見る
keywords:
  - IntlayerProvider
  - プロバイダー
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに対するドキュメントを統一
---

# IntlayerProvider コンポーネントのドキュメント

`IntlayerProvider` は、あなたの Solid アプリケーションに国際化コンテキストを提供するルートコンポーネントです。現在のロケール状態を管理し、すべての子コンポーネントが翻訳にアクセスできることを保証します。

## 使用方法

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## 説明

`IntlayerProvider` は次の役割を果たします:

1. **ステート管理（State Management）**: リアクティビティのために signals を使用して、現在のロケールを初期化および保持します。
2. **ロケール解決（Locale Resolution）**: クッキー、ブラウザの設定、またはデフォルトの設定に基づいて初期ロケールを決定します。
3. **コンテキスト注入（Context Injection）**: `useIntlayer` や `useLocale` のようなフックを通じて、ロケールと `setLocale` 関数を任意のコンポーネントで利用できるようにします。
4. **永続化（Persistence）**: ロケールの変更を自動的にクッキーやローカルストレージと同期し、セッションをまたいだユーザー設定を維持します。

## Props（プロパティ）

- **locale**（任意）: 現在のロケールを手動で設定します。
- **defaultLocale** (オプション): 設定のデフォルトロケールを上書きします。
- **setLocale** (オプション): カスタムのロケール設定関数を提供します。
- **disableEditor** (オプション): ビジュアルエディタの統合を無効化します。
- **isCookieEnabled** (オプション): Cookieによる永続化を有効または無効にします。
