---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 文档 | react-intlayer
description: 了解如何使用 react-intlayer 包中的 usePathname hook 获取当前 URL 的 pathname（移除了区域设置段）。
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - 路由
  - 国际化
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "添加 usePathname 实用工具"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史记录"
author: aymericzip
---

# React 集成: `usePathname` Hook 文档

`react-intlayer` 中的 `usePathname` hook 返回当前浏览器的路径名（pathname），并已移除区域设置（locale）段。它依赖于原生的 `window.location.pathname`，并通过 `popstate` 对浏览器导航事件做出响应。

## 导入 `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## 概览

与特定于框架的路由 hooks（例如 `next-intlayer` 或 `react-router` 中的那些）不同，此 hook 是一种轻量级的、与框架无关的解决方案，适用于纯 React 应用程序。它会提取当前的 URL，并去掉任何匹配的区域设置前缀（例如，`/zh/about` 会变成 `/about`）。

## 使用

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
        首页
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        关于
      </a>
    </nav>
  );
};

export default Navigation;
```

## 返回值

| 类型     | 描述                                                                                         |
| -------- | -------------------------------------------------------------------------------------------- |
| `string` | 当前浏览器的路径名（pathname），已移除区域设置前缀（例如：`/zh/dashboard` → `/dashboard`）。 |

## 行为

- **区域设置剥离**：在底层使用 `getPathWithoutLocale` 实用程序，根据应用程序的 Intlayer 配置自动检测并从路径名中移除区域设置。
- **响应性**：监听 `popstate` 事件。当用户使用浏览器的前进/后退按钮导航时，或调用 `pushState`/`replaceState` 时，hook 会更新返回的路径名。
- **SSR 回退**：在服务器端（`window` 未定义），它默认返回 `/`，因为在纯 React 上下文中，默认情况下它无法访问请求 URL。

## 相关文档

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md)
