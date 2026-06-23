---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathnameフックドキュメント | react-intlayer
description: react-intlayerパッケージからusePathnameフックを使用して、ロケールセグメントを含まない現在のURLパス名を取得する方法を学びます。
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internationalization
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathnameユーティリティを追加"
  - version: 8.2.0
    date: 2026-06-22
    changes: "履歴を初期化"
author: aymericzip
---

# React統合: `usePathname` フックドキュメント

`react-intlayer`の`usePathname`フックは、ロケールセグメントが削除された現在のブラウザパス名を返します。ネイティブの`window.location.pathname`に依存し、`popstate`を介してブラウザのナビゲーションイベントに反応します。

## `usePathname`のインポート

```typescript
import { usePathname } from "react-intlayer";
```

## 概要

フレームワーク固有のルーティングフック（`next-intlayer`や`react-router`など）とは異なり、このフックはプレーンなReactアプリケーション向けの軽量でフレームワークに依存しないソリューションです。現在のURLを抽出し、一致するロケールプレフィックスを削除します（例：`/ja/about`は`/about`になります）。

## 使用方法

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        ホーム
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        概要
      </a>
    </nav>
  );
};

export default Navigation;
```

## 戻り値

| 型       | 説明                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------ |
| `string` | ロケールプレフィックスが削除された現在のブラウザのパス名（例：`/ja/dashboard` → `/dashboard`）。 |

## 動作

- **ロケールの削除**: 内部的に`getPathWithoutLocale`ユーティリティを使用して、アプリケーションのIntlayer設定に基づいてパス名から自動的にロケールを検出および削除します。
- **反応性**: `popstate`イベントをリッスンします。ユーザーがブラウザの戻る/進むボタンを使用してナビゲートするか、`pushState`/`replaceState`が呼び出されると、フックは返されるパス名を更新します。
- **SSRのフォールバック**: サーバー上（`window`が未定義の場合）、純粋なReactコンテキストではデフォルトでリクエストURLにアクセスできないため、デフォルトで`/`を返します。

## 関連ドキュメント

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md)
