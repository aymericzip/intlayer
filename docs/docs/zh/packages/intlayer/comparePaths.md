---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths 函数文档 | intlayer
description: 了解如何使用 intlayer 包中的 comparePaths 函数
keywords:
  - comparePaths
  - normalizePath
  - 活跃链接
  - 导航
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "初始文档"
author: aymericzip
---

# 文档: `intlayer` 中的 `comparePaths` 函数

## 描述

`comparePaths` 函数在忽略区域设置（locale）段、协议/主机名、查询字符串、哈希值和尾部斜杠的情况下，比较两个 URL 或路径是否相等。这是确定导航链接是否指向当前页面的推荐方法（例如，用于高亮显示活动链接），而无需编写自己（容易出错）的规范化逻辑。

它在内部重用了 [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) 来去除区域设置段，因此它会遵循您配置的路由模式和区域设置。

该包还导出了底层的 [`normalizePath`](#normalizepath) 辅助函数，它返回用于比较的、与区域设置无关的规范路径名。

**主要特性：**

- 与区域设置无关的比较（`/zh/about` 与 `/about` 匹配）
- 适用于绝对 URL 和相对路径
- 忽略查询字符串、哈希值和尾随斜杠
- 容忍缺少前导斜杠和空值（规范化为 `/`）
- 轻量级 — 构建在 `getPathWithoutLocale` 之上

---

## 函数签名

```typescript
comparePaths(
  pathname: string,  // 必填
  href: string,      // 必填
  locales?: Locales[] // 可选
): boolean

normalizePath(
  inputUrl: string,   // 必填
  locales?: Locales[] // 可选
): string
```

---

## 参数

- `pathname: string`
  - **描述**: 要比较的第一个 URL 字符串或路径名（通常是当前路径）。
  - **类型**: `string`
  - **必填**: 是

- `href: string`
  - **描述**: 要比较的第二个 URL 字符串或路径名（通常是导航链接的 `href`）。
  - **类型**: `string`
  - **必填**: 是

- `locales: Locales[]`
  - **描述**: 支持的区域设置的可选数组。默认为项目中配置的区域设置。
  - **类型**: `Locales[]`
  - **必填**: 否 (可选)

### 返回值

- **类型**: `boolean`
- **描述**: 当两个输入都解析为相同的与区域设置无关的路径时返回 `true`，否则返回 `false`。

---

## 示例用法

### 基本用法

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### 绝对和相对 URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### 高亮活动导航链接

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` 返回由 `comparePaths` 使用的、与区域设置无关的规范路径名。它去除了区域设置段、协议/主机、查询字符串和哈希，确保单个前导斜杠，删除任何尾随斜杠（根目录除外），对于空值则回退为 `/`。

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## 相关函数

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md): 从 URL 或路径中删除区域设置段。
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPrefix.md): 获取给定区域设置的 URL 前缀。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md): 为特定区域设置生成本地化 URL。

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
