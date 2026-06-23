---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 文档 | solid-intlayer
description: 了解如何使用 solid-intlayer 包中的 usePathname hook
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国际化
  - 文档
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
    changes: "添加 usePathname 实用程序"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史记录"
author: aymericzip
---

# Solid 集成: `usePathname` Hook 文档

`usePathname` Hook 返回当前浏览器路径 (pathname)，并去除了语言区域 (locale) 片段，类型为 Solid 的 `Accessor<string>`。它在构建包含本地化的导航栏时非常有用（例如，确定哪个导航项处于活动状态），无需手动删除 locale 前缀。

## 在 Solid 中导入 `usePathname`

```typescript
import { usePathname } from "solid-intlayer";
```

## 概览

`usePathname` 创建一个从 `window.location.pathname` 初始化的响应式信号 (reactive signal)，通过 `getPathWithoutLocale` 剥离 locale 前缀，并在浏览器触发 `popstate` 事件（后退/前进导航）时更新信号。事件监听器通过 `onCleanup` 自动清理。

## 用法

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

## 返回值

| 类型               | 描述                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| `Accessor<string>` | Solid Accessor（响应式 getter），返回不包含 locale 前缀的当前路径 (pathname)。 |

## 行为

- **剥离 Locale**: 移除路径首部的 locale 片段（例如：`/zh/dashboard` → `/dashboard`）。
- **响应式**: 在触发 `popstate` 事件（浏览器后退 / 前进导航）时自动更新。
- **SSR 安全**: 当 `window` 不可用时返回 `""`。
- **清理**: `popstate` 监听器会通过 Solid 的 `onCleanup` 自动移除。

## 示例

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/settings", label: "设置" },
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

## 相关文档

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useLocale.md) — 当前语言区域 + 切换语言区域
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) — 此 Hook 底层使用的工具函数
