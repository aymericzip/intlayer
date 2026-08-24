---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getLocalizedUrl 函数
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# 文档：`intlayer` 中的 `getLocalizedUrl` 函数

## 描述

`getLocalizedUrl` 函数通过在给定的 URL 前添加指定的语言环境前缀来生成本地化的 URL。它可以处理绝对 URL 和相对 URL，确保根据配置应用正确的语言环境前缀。

**主要特性:**

- 只需要 2 个参数：`url` 和 `currentLocale`
- 可选的 `options` 对象，包含 `locales`、`defaultLocale` 和 `mode`
- 使用您项目的国际化配置作为默认值
- 可以用最少的参数用于简单情况，或完全自定义用于复杂场景
- 支持多种路由模式：`prefix-no-default`、`prefix-all`、`no-prefix` 和 `search-params`

---

## 函数签名

```typescript
getLocalizedUrl(
  url: string,                   // 必需
  currentLocale: Locales,        // 必需
  options?: {                    // 可选
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## 参数

### 必需参数

- `url: string`
  - **Description**: 要用 locale 前缀的原始 URL 字符串。
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: 正在本地化 URL 的当前 locale。
  - **Type**: `Locales`
  - **Required**: Yes

### 可选参数

- `options?: object`
  - **Description**: URL 本地化行为的配置对象。
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: 支持的 locale 数组。如果未提供，将使用项目配置中配置的 locale。
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: 应用程序的默认 locale。如果未提供，将使用项目配置中配置的默认 locale。
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: 用于 locale 处理的 URL 路由模式。如果未提供，将使用项目配置中配置的模式。
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: 默认 locale 无前缀，其他 locale 有前缀
      - `prefix-all`: 所有 locale（包括默认 locale）都有前缀
      - `no-prefix`: URL 中无 locale 前缀
      - `search-params`: 使用查询参数表示 locale（例如 `?locale=fr`）

### 返回值

- **类型**: `string`
- **描述**: 指定语言环境的本地化 URL。

---

## 示例用法

### 基本用法（仅需必需参数）

当你使用国际化设置配置项目后，可以仅使用必需参数来调用该函数：

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// 使用你的项目配置中的 locales、defaultLocale 和 mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (假设支持法语且 mode 设置为 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" 或 "/en/about" (取决于你的 mode 设置)
```

### 高级用法（带可选参数）

您可以通过提供可选的 `options` 参数来覆盖默认配置：

### 相对 URL

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出: 对于法语环境为 "/fr/about"
// 输出: 对于默认（英语）环境为 "/about"
```

### 部分配置覆盖

您也可以仅提供部分可选参数。该函数将对您未指定的任何参数使用您的项目配置：

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// 仅覆盖 locales，使用项目配置中的 defaultLocale 和 mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// 仅覆盖 mode，使用项目配置中的 locales 和 defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // 对所有语言（包括默认语言）强制添加前缀
});

// 覆盖多个选项
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // 使用查询参数：/about?locale=fr
});
```

### 绝对 URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 当前区域
  [Locales.ENGLISH, Locales.FRENCH], // 支持的区域
  Locales.ENGLISH, // 默认区域
  false // 是否为默认语言添加前缀
); // 输出: "https://example.com/fr/about" （法语）

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言
  Locales.ENGLISH, // 默认语言
  false // 是否为默认语言添加前缀
); // 输出: "https://example.com/about" （英语）

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言
  Locales.ENGLISH, // 默认语言
  true // 是否为默认语言添加前缀
); // 输出: "https://example.com/en/about" （英语）
```

### 不支持的语言

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言环境
  Locales.ENGLISH // 默认语言环境
); // 输出: "/about"（对于不支持的语言环境不添加前缀）
```

---

## 边缘情况

- **无语言环境段：**
  - 如果 URL 中不包含任何语言环境段，函数会安全地添加适当的语言环境前缀。

- **默认语言环境：**
  - 当 `prefixDefault` 为 `false` 时，函数不会为默认语言环境添加前缀。

- **不支持的语言环境：**
  - 对于未列在 `locales` 中的语言环境，函数不会添加任何前缀。

- **路由模式:**
  - `'prefix-no-default'`: 默认语言没有前缀，其他语言有前缀 (例如, `/about`, `/fr/about`)
  - `'prefix-all'`: 所有语言都有前缀 (例如, `/en/about`, `/fr/about`)
  - `'no-prefix'`: URL 中没有语言前缀（语言在其他地方处理）
  - `'search-params'`: 通过查询参数指定语言 (例如, `/about?locale=fr`)

---

## 在应用中的使用

在多语言应用程序中，使用 `locales` 和 `defaultLocale` 配置国际化设置对于确保显示正确的语言至关重要。以下是如何在应用程序设置中使用 `getLocalizedUrl` 的示例：

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// 支持的语言和默认语言配置
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

上述配置确保应用程序识别 `ENGLISH`、`FRENCH` 和 `SPANISH` 作为支持的语言，并使用 `ENGLISH` 作为回退语言。

使用此配置，`getLocalizedUrl` 函数可以根据用户的语言偏好动态生成本地化 URL：

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 输出: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 输出: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 输出: "/about"
```

通过集成 `getLocalizedUrl`，开发者可以在多语言环境中保持一致的 URL 结构，提升用户体验和 SEO 效果。
