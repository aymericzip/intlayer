---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 文档 | preact-intlayer
description: 了解如何使用 preact-intlayer 包中的 usePathname 钩子
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国际化
  - 文档
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
    changes: "添加 usePathname 实用工具"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史"
author: aymericzip
---

# Preact 集成: `usePathname` Hook 文档

`usePathname` 钩子返回移除了 locale（语言环境）片段的当前浏览器路径名 (pathname)。这在构建多语言感知的导航时非常有用（例如，确定哪个导航项处于活动状态），而无需手动去除 locale 前缀。

## 在 Preact 中引入 `usePathname`

```typescript
import { usePathname } from "preact-intlayer";
```

## 概览

`usePathname` 会读取 `window.location.pathname`，通过 `getPathWithoutLocale` 移除 locale 前缀，并在浏览器触发 `popstate` 事件（后退/前进导航）时重新渲染组件。在服务器端渲染（SSR）期间，它将返回一个空字符串。

## 用法

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

## 返回值

| 类型     | 描述                                                                  |
| -------- | --------------------------------------------------------------------- |
| `string` | 不包含 locale 前缀的当前路径名。在服务器端渲染（SSR）期间为空字符串。 |

## 行为表现

- **去除 Locale (Locale stripping)**: 移除 URL 开头的 locale 片段（例如 `/zh/dashboard` → `/dashboard`）。
- **响应式更新**: 在 `popstate` 事件（浏览器的后退/前进导航）发生时自动更新。
- **SSR 安全**: 当 `window` 不可用时返回 `""`。
- **清理 (Cleanup)**: 组件卸载时会自动移除 `popstate` 监听器。

## 示例

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/settings", label: "设置" },
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

## 相关信息

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/preact-intlayer/exports.md) — 当前的 locale + 切换器
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) — 该钩子使用的底层实用工具
