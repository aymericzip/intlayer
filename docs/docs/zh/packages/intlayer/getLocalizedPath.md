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
    changes: "实现自定义 URL 重写"
author: aymericzip
---

# 文档：`intlayer` 的 `getLocalizedPath` 函数

## 描述

`getLocalizedPath` 函数根据提供的 locale 和重写规则，将 canonical path（应用内路径，例如 `/about`、`/product/[id]`）解析为其本地化等价路径。它对于生成按语言变化的对 SEO 友好的 URL 非常有用。

它是 [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md) 的相对路径对应版本 — 对于相对输入，两者都返回相同的值。与 `getLocalizedUrl` 不同的是，它永远不会返回绝对 URL：`domains` 配置被忽略，因此从其自己的域提供的区域设置仍然会产生一个路径。接受绝对输入，但其来源会被删除 — 仅保留其路径、查询字符串和哈希。

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

### 可选参数

- `rewriteRules?: RoutingConfig['rewrite']`
  - **描述**：定义自定义重写规则的对象。如果未提供，则默认为项目配置中的 `routing.rewrite` 属性。
  - **类型**：`RoutingConfig['rewrite']`
  - **默认值**：`configuration.routing.rewrite`

- `options?: object`
  - **Description**: 路由覆盖。每个条目都默认使用你项目的配置。
  - **Type**: `object`

  - `options.locales?: Locales[]` — 支持的语言环境。**默认值**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — 默认语言环境。**默认值**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — 语言环境在路径中的显示方式。**默认值**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — 自定义重写规则。**默认值**: `configuration.routing.rewrite`

---

## 返回值

- **类型**：`string`
- **描述**：为指定语言环境生成的本地化路径。

该类型是从您配置中声明的重写规则缩小的，因此编辑器显示的是解析后的路径而不是裸露的 `string`：

```typescript codeFormat="typescript"
// 配置: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (没有重写规则匹配，仅应用前缀)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

同样的收窄流入 [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)，它在添加区域设置前缀之前应用重写规则。

两种情况保持扩展为 `string`，因为它们在编译时无法解析：

- 不是字符串字面量的路径（例如从变量构建的路径）；
- 与使用多段或可选参数的规则匹配的路径（`[...slug]`、`[[...slug]]`、`:param?`）。

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

### 省略 Locale

当未提供 locale 时，路径将针对配置的默认 locale 进行本地化：

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// 配置：defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// 输出："/about"
```

---

## 相关函数

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getCanonicalPath.md): 将本地化路径解析回其内部规范路径。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md): 生成一个完全本地化的 URL（包括协议、主机和语言前缀）。
