---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 関数ドキュメント | svelte-intlayer
description: svelte-intlayer パッケージの usePathname 関数の使用方法
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# Svelte 統合: `usePathname` ドキュメント

`usePathname` 関数は、ロケールセグメントが削除された現在のブラウザのパス名を Svelte の `Readable<string>` ストアとして返します。これは、ロケールプレフィックスを手動で削除することなく、ロケールを考慮したナビゲーション（例えば、どのナビゲーション項目がアクティブかを判断するなど）を構築するのに役立ちます。

## Svelte で `usePathname` をインポートする

```typescript
import { usePathname } from "svelte-intlayer";
```

## 概要

`usePathname` は `window.location.pathname` から初期化される Svelte の読み取り可能なストア（readable store）を作成し、`getPathWithoutLocale` を介してロケールプレフィックスを削除し、ブラウザが `popstate` イベント（戻る/進むナビゲーション）を発生させるたびに新しい値を発行します。コンポーネント内では `$` ストア構文を使用してサブスクライブします。

## 使用法

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## 戻り値

| タイプ             | 説明                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `Readable<string>` | ロケールプレフィックスを含まない現在のパス名を含む Svelte の読み取り可能なストア（Readable store）。 |

## 動作

- **ロケールの削除**: 先頭のロケールセグメントを削除します（例: `/ja/dashboard` → `/dashboard`）。
- **リアクティブ**: `popstate` イベント（ブラウザの戻る/進むナビゲーション）のたびに新しい値を発行します。
- **SSR セーフ**: `window` が利用できない場合は `""` を返します。
- **クリーンアップ**: 最後のサブスクライバーがサブスクライブを解除すると、`popstate` リスナーは自動的に削除されます。

## 例

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "ダッシュボード" },
    { href: "/settings", label: "設定" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## 関連

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/svelte-intlayer/useLocale.md) — 現在のロケール + ロケールスイッチャー
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) — このフックで使用される基礎的なユーティリティ
