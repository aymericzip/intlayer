---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook ドキュメント | solid-intlayer
description: solid-intlayer パッケージの usePathname フックの使い方
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国際化
  - i18n
  - ドキュメント
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathnameユーティリティを追加"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Solid 連携: `usePathname` フックドキュメント

`usePathname` フックは、現在のブラウザのパス名 (pathname) からロケールセグメントを削除したものを、Solid の `Accessor<string>` として返します。ロケールを意識したナビゲーション（例：どのナビゲーションアイテムがアクティブかを判断する）を、ロケールのプレフィックスを手動で削除することなく構築するのに役立ちます。

## `usePathname` のインポート（Solid）

```typescript
import { usePathname } from "solid-intlayer";
```

## 概要

`usePathname` は、`window.location.pathname` から初期化されたリアクティブなシグナルを作成し、`getPathWithoutLocale` を介してロケールプレフィックスを削除し、ブラウザが `popstate` イベント（戻る/進むのナビゲーション）を発生させるたびにシグナルを更新します。イベントリスナーは、`onCleanup` を介して自動的にクリーンアップされます。

## 使用方法

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## 戻り値

| 型                 | 説明                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| `Accessor<string>` | ロケールプレフィックスを取り除いた現在のパス名を返す、Solid のアクセサ（リアクティブなゲッター）。 |

## 動作

- **ロケールの削除**: 先頭のロケールセグメントを削除します（例: `/ja/dashboard` → `/dashboard`）。
- **リアクティビティ**: `popstate` イベント（ブラウザの戻る / 進む）で自動的に更新されます。
- **SSR セーフ**: `window` が利用できない場合は `""` を返します。
- **クリーンアップ**: `popstate` リスナーは Solid の `onCleanup` 経由で自動的に削除されます。

## 例

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "ダッシュボード" },
  { href: "/settings", label: "設定" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## 関連事項

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/solid-intlayer/useLocale.md) — 現在のロケール + ロケールスイッチャー
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) — このフックの内部で使用されるユーティリティ
