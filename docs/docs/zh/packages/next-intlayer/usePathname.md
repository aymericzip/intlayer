---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 文档 | next-intlayer
description: 了解如何使用 next-intlayer 包中的 usePathname 钩子
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
    changes: "添加 usePathname 实用程序"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史记录"
author: aymericzip
---

# Next.js 集成：`usePathname` 钩子（Hook）文档

`usePathname` 钩子返回去除区域设置（locale）片段后的当前 Next.js 路径名（pathname）。这对于构建感知语言环境的导航非常有用——例如，判断哪个导航项处于活动状态——而无需手动剥离语言环境前缀。

## 在 Next.js 中导入 `usePathname`

```typescript
import { usePathname } from "next-intlayer";
```

## 概述

`usePathname` 包装了来自 `next/navigation` 的 Next.js 内置 `usePathname()`，附加了任何搜索参数（search params），并通过 `getPathWithoutLocale` 去除语言环境前缀。在每次客户端导航时，它都会触发重新渲染。该钩子仅在客户端组件中可用（需要 `"use client"`）。

## 用法

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

## 返回值

| 类型     | 描述                                                             |
| -------- | ---------------------------------------------------------------- |
| `string` | 当前路径名，去除了区域设置前缀以及去除了区域设置参数的查询参数。 |

## 行为

- **区域设置剥离**：去除开头的语言环境片段（例如 `/zh/dashboard` → `/dashboard`）。
- **查询参数剥离**：当使用基于搜索参数的路由模式时，也会去除 `?locale=...` 查询参数。
- **响应式**：通过 Next.js App Router 的每次客户端导航都会自动更新。
- **SSR 安全**：在首次渲染时返回服务端路径名，然后在客户端同步搜索参数。

## 与 `useLocale` 的比较

`next-intlayer` 的 `useLocale` 已经在其返回值中暴露了 `pathWithoutLocale`。当您仅需要路径而不需要切换语言环境的功能时，可以使用 `usePathname`。

```tsx codeFormat={["typescript", "esm"]}
// 当你需要语言环境状态和路径时：
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// 当你只需要路径时：
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## 示例

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/设置", label: "设置" },
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

## 相关文档

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md) — 当前语言环境 + 语言环境切换器（也暴露了 `pathWithoutLocale`）
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) — 该钩子使用的底层实用程序
