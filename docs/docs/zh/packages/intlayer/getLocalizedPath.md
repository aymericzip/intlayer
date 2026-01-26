---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath 函数文档 | intlayer
description: 查看如何在 intlayer 包中使用 getLocalizedPath 函数
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: 实现自定义 URL 重写
---

# 文档：`intlayer` 的 `getLocalizedPath` 函数

## 描述

`getLocalizedPath` 函数根据提供的 locale 和重写规则，将 canonical path（应用内路径，例如 `/about`、`/product/[id]`）解析为其本地化等价路径。它对于生成按语言变化的对 SEO 友好的 URL 非常有用。

**关键特性：**

- 支持使用 `[param]` 语法的动态路由参数。
- 根据配置中定义的自定义重写规则解析路径。
- 如果未找到指定 locale 的重写规则，会自动回退到 canonical path。

---

## 函数签名

```typescript
getLocalizedPath(
  canonicalPath: string,         // 必需
  locale: Locales,               // 必需
  rewriteRules?: RoutingConfig['rewrite'] // 可选
): string
```

---

## 参数

### 必填参数

- `canonicalPath: string`
  - **描述**：内部应用路径（例如，`/about`、`/product/[id]`）。
  - **类型**：`string`
  - **必填**：是

- `locale: Locales`
  - **描述**：目标语言环境，用于本地化路径。
  - **类型**：`Locales`
  - **必填**：是

### 可选参数

- `rewriteRules?: RoutingConfig['rewrite']`
  - **描述**：定义自定义重写规则的对象。如果未提供，则默认为项目配置中的 `routing.rewrite` 属性。
  - **类型**：`RoutingConfig['rewrite']`
  - **默认值**：`configuration.routing.rewrite`

---

## 返回值

- **类型**：`string`
- **描述**：为指定语言环境生成的本地化路径。

---

## 使用示例

### 基本用法（使用配置）

如果你在 `intlayer.config.ts` 中配置了自定义重写规则：

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// 配置: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// 输出: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// 输出: "/about"
```

### 动态路由的用法

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// 配置: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// 输出: "/produit/123"
```

### 手动重写规则

你也可以将手动重写规则传递给该函数：

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

---

## 相关函数

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getCanonicalPath.md): 将本地化路径解析回其内部规范路径。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md): 生成一个完全本地化的 URL（包括协议、主机和语言前缀）。
