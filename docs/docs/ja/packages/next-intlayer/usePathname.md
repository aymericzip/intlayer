---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname フック ドキュメント | next-intlayer
description: next-intlayer パッケージの usePathname フックの使用方法を学びます
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname ユーティリティを追加"
  - version: 8.2.0
    date: 2026-06-22
    changes: "履歴の初期化"
author: aymericzip
---

# Next.js 統合: `usePathname` フック ドキュメント

`usePathname` フックは、ロケールセグメントが取り除かれた現在の Next.js のパス名（pathname）を返します。これは、ロケールプレフィックスを手動で削除することなく、ロケールを考慮したナビゲーション（たとえば、どのナビゲーション項目がアクティブかを判断するなど）を構築するのに役立ちます。

## Next.js で `usePathname` をインポートする

```typescript
import { usePathname } from "next-intlayer";
```

## 概要

`usePathname` は、`next/navigation` からの Next.js 組み込みの `usePathname()` をラップし、検索パラメータ (search params) を追加し、`getPathWithoutLocale` を介してロケールプレフィックスを削除します。クライアント側のナビゲーションごとに再レンダリングをトリガーします。このフックはクライアントコンポーネント内でのみ使用できます（`"use client"` が必要です）。

## 使用法

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## 戻り値

| 型       | 説明                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------- |
| `string` | ロケールプレフィックスとロケールパラメータを取り除いたクエリパラメータを含まない現在のパス名。 |

## 動作

- **ロケールの削除**: 先頭のロケールセグメントを取り除きます（例: `/ja/dashboard` → `/dashboard`）。
- **検索パラメータの削除**: 検索パラメータベースのルーティングモードを使用している場合、`?locale=...` のクエリパラメータも削除します。
- **リアクティブ**: Next.js App Router 経由でのクライアント側のナビゲーションが行われるたびに更新されます。
- **SSR セーフ**: 初回レンダリング時にはサーバー側のパス名を返し、その後クライアント側で検索パラメータを同期します。

## `useLocale` との比較

`next-intlayer` の `useLocale` は、すでに戻り値の一部として `pathWithoutLocale` を公開しています。パス名のみが必要で、ロケール切り替え機能が不要な場合は、`usePathname` を使用してください。

```tsx codeFormat={["typescript", "esm"]}
// ロケール状態とパスの両方が必要な場合:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// パスのみが必要な場合:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## 例

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "ダッシュボード" },
  { href: "/settings", label: "設定" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## 関連

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md) — 現在のロケール + ロケールスイッチャー（`pathWithoutLocale` も公開）
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) — このフックで使用される基礎的なユーティリティ
