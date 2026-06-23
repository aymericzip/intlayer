---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 函数文档 | svelte-intlayer
description: 了解如何使用 svelte-intlayer 包中的 usePathname 函数
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国际化
  - 文档
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
    changes: "添加 usePathname 实用程序"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史记录"
author: aymericzip
---

# Svelte 集成：`usePathname` 文档

`usePathname` 函数以 Svelte 的 `Readable<string>` store 形式返回去除了 locale 段的当前浏览器路径名（pathname）。这对于构建支持 locale 的导航非常有用——例如，判断哪个导航项是激活状态的——而无需手动去除 locale 前缀。

## 在 Svelte 中导入 `usePathname`

```typescript
import { usePathname } from "svelte-intlayer";
```

## 概述

`usePathname` 创建一个 Svelte readable store，它读取 `window.location.pathname`，通过 `getPathWithoutLocale` 去除 locale 前缀，并在浏览器触发 `popstate` 事件（后退/前进导航）时发出新值。在组件中使用 `$` 语法来订阅。

## 用法

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

## 返回值

| 类型               | 描述                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| `Readable<string>` | 包含不带 locale 前缀的当前路径名（pathname）的 Svelte readable store。 |

## 行为

- **去除 Locale**：移除开头的 locale 段（例如 `/zh/dashboard` → `/dashboard`）。
- **响应式**：在每次 `popstate` 事件（浏览器的后退 / 前进导航）触发时发出新值。
- **SSR 安全**：在 `window` 不可用时返回 `""`。
- **清理（Cleanup）**：当最后一个订阅者取消订阅时，会自动移除 `popstate` 监听器。

## 示例

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "仪表盘" },
    { href: "/settings", label: "设置" },
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

## 相关阅读

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/svelte-intlayer/useLocale.md) — 当前 locale + locale 切换器
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) — 该 hook 所使用的底层实用程序
