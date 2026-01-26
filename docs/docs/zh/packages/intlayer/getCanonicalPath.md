---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath 函数文档 | intlayer
description: 了解如何在 intlayer 包中使用 getCanonicalPath 函数
keywords:
  - getCanonicalPath
  - 翻译
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: 实现自定义 URL 重写
---

# 文档：`intlayer` 中的 `getCanonicalPath` 函数

## 描述

`getCanonicalPath` 函数将本地化的 URL 路径（例如 `/a-propos`）解析回其内部 canonical 应用路径（例如 `/about`）。这对于 router 来说至关重要，可确保路由能够匹配正确的内部路由，而不受 URL 语言的影响。

**主要特性：**

- 支持使用 `[param]` 语法的动态路由参数。
- 将本地化路径与配置中定义的自定义重写规则进行匹配。
- 如果未找到匹配的重写规则，则返回原始路径。

---

## 函数签名

```typescript
getCanonicalPath(
  localizedPath: string,         // 必需
  locale: Locales,               // 必需
  rewriteRules?: RoutingConfig['rewrite'] // 可选
): string
```

---

## 参数

### 必需参数

- `localizedPath: string`
  - **描述**：浏览器中看到的本地化路径（例如，`/a-propos`）。
  - **类型**：`string`
  - **必需**：是

- `locale: Locales`
  - **描述**：用于解析路径的区域设置。
  - **类型**：`Locales`
  - **必需**：是

### 可选参数

- `rewriteRules?: RoutingConfig['rewrite']`
  - **描述**：一个定义自定义重写规则的对象。如果未提供，默认为你项目配置中的 `routing.rewrite` 属性。
  - **类型**：`RoutingConfig['rewrite']`
  - **默认值**：`configuration.routing.rewrite`

---

## 返回值

- **类型**：`string`
- **描述**：内部规范路径。

---

## 示例用法

### 基本用法（使用配置）

如果你在 `intlayer.config.ts` 中配置了自定义重写规则：

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// 配置: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// 输出: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// 输出: "/about"
```

### 动态路由的用法

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// 配置: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// 输出: "/product/123"
```

### 手动重写规则

您也可以将手动重写规则传递给该函数：

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// 输出: "/contact"
```

---

## 相关函数

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedPath.md): 将 canonical 路径解析为其本地化的等价路径。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md): 生成完整本地化的 URL（包括协议、主机和语言前缀）。
