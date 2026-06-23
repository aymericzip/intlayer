---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 関数のドキュメント | vue-intlayer
description: vue-intlayer パッケージの usePathname 関数の使用方法について
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国際化 (Internationalization)
  - ドキュメント
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Vue インテグレーション: `usePathname` ドキュメント

`usePathname` 関数は、ロケールセグメントが削除された現在のブラウザのパス名 (pathname) を Vue の `ComputedRef<string>` として返します。これは、ロケールプレフィックスを手動で削除することなく、ロケールを認識するナビゲーションを構築する（たとえば、どのナビゲーションアイテムがアクティブであるかを決定する）ために便利です。

## Vue での `usePathname` のインポート

```typescript
import { usePathname } from "vue-intlayer";
```

## 概要

`usePathname` は、`window.location.pathname` を読み取り、`getPathWithoutLocale` を介してロケールプレフィックスを削除し、ブラウザが `popstate` イベント（戻る/進むナビゲーション）を発生させるたびにその値を更新する Vue の算出参照 (computed ref) を作成します。取得した値は、Vue テンプレートやセットアップ関数で直接使用できます。

## 使用方法

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## 戻り値

| タイプ                | 説明                                                                             |
| --------------------- | -------------------------------------------------------------------------------- |
| `ComputedRef<string>` | ロケールプレフィックスのない現在のパス名 (pathname) を含む Vue の Computed Ref。 |

## 動作

- **ロケールの削除 (Locale stripping)**: 先頭のロケールセグメントを削除します（例: `/ja/dashboard` → `/dashboard`）。
- **リアクティブ**: `popstate` イベント（ブラウザの戻る / 進む操作）が発生するたびに値を更新します。
- **SSR セーフ**: `window` が利用できない場合は `""` を返します。
- **クリーンアップ (Cleanup)**: `popstate` リスナーは初期化時にグローバルに追加され、Vue のライフサイクル管理のおかげで、通常はコンポーネントごとに手動でクリーンアップする必要はありません。

## 例

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "ダッシュボード" },
  { href: "/settings", label: "設定" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## 関連事項

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vue-intlayer/useLocale.md) — 現在のロケール + ロケールスイッチャー
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) — このフックで使用される基盤となるユーティリティ
