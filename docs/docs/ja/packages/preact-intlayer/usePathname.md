---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname フックのドキュメント | preact-intlayer
description: preact-intlayer パッケージの usePathname フックの使用方法について
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国際化
  - ドキュメント
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathnameユーティリティを追加"
  - version: 8.2.0
    date: 2026-06-22
    changes: "履歴の初期化"
author: aymericzip
---

# Preact 統合: `usePathname` フックのドキュメント

`usePathname` フックは、ロケールセグメントが削除された現在のブラウザパス名（pathname）を返します。これは、ロケールプレフィックスを手動で削除することなく、ロケールを考慮したナビゲーション（例：どのナビゲーションアイテムがアクティブかを判定する）を構築するのに役立ちます。

## Preact での `usePathname` のインポート

```typescript
import { usePathname } from "preact-intlayer";
```

## 概要

`usePathname` は `window.location.pathname` を読み取り、`getPathWithoutLocale` 経由でロケールプレフィックスを削除します。ブラウザが `popstate` イベント（戻る/進む ナビゲーション）を発生させるたびにコンポーネントを再レンダリングします。サーバーサイドレンダリング（SSR）中は空の文字列を返します。

## 使用方法

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

| 型       | 説明                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------- |
| `string` | ロケールプレフィックスを含まない現在のパス名。サーバーサイドレンダリング（SSR）中は空の文字列を返します。 |

## 動作

- **ロケールの削除 (Locale stripping)**: 先頭のロケールセグメントを削除します（例：`/ja/dashboard` → `/dashboard`）。
- **リアクティブ**: ブラウザの戻る / 進むナビゲーション（`popstate` イベント）時に自動的に更新されます。
- **SSR セーフ**: `window` が利用できない場合は `""` を返します。
- **クリーンアップ**: コンポーネントのアンマウント時に、`popstate` リスナーは自動的に削除されます。

## 例

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "ダッシュボード" },
  { href: "/settings", label: "設定" },
];

const Sidebar: FunctionComponent = () => {
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

## 関連ドキュメント

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/preact-intlayer/exports.md) — 現在のロケールとロケールスイッチャー
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) — このフックで使われているベースのユーティリティ
