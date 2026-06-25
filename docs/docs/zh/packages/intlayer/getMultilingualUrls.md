---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getMultilingualUrls 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getMultilingualUrls 函数
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# 文档：`intlayer` 中的 `getMultilingualUrls` 函数

## 描述

`getMultilingualUrls` 函数通过在给定的 URL 前添加每个支持的语言环境前缀来生成多语言 URL 的映射。它可以处理绝对和相对 URL，根据提供的配置或默认值应用适当的语言环境前缀。

---

## 函数签名

```typescript
getMultilingualUrls(
  url: string,                   // 必需
  options?: {                    // 可选
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## 参数

## 参数

- `url: string`
  - **描述**：需要添加语言环境前缀的原始 URL 字符串。
  - **类型**：`string`

- `locales: Locales[]`
  - **描述**：可选的支持语言环境数组。默认为项目中配置的语言环境。
  - **类型**：`Locales[]`
  - **默认值**：`localesDefault`

- `defaultLocale: Locales`
  - **描述**：应用的默认语言环境。默认为项目中配置的默认语言环境。
  - **类型**：`Locales`
  - **默认值**：`defaultLocaleDefault`

- `prefixDefault: boolean`
  - **描述**：是否为默认语言环境添加前缀。默认为项目中配置的值。
  - **类型**：`boolean`
  - **默认值**：`prefixDefaultDefault`

### 可选参数

- `options?: object`
  - **Description**: URL 本地化行为的配置对象。
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: 支持的 locales 数组。如果未提供，将使用项目配置中的已配置 locales。
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: 应用程序的默认 locale。如果未提供，将使用项目配置中的已配置默认 locale。
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: 用于 locale 处理的 URL 路由模式。如果未提供，将使用项目配置中的已配置模式。
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: 默认 locale 无前缀，其他 locale 有前缀
      - `prefix-all`: 所有 locale（包括默认 locale）都有前缀
      - `no-prefix`: URL 中无 locale 前缀
      - `search-params`: 使用查询参数表示 locale（例如，`?locale=fr`）

### 返回值

- **类型**：`IConfigLocales<string>`
- **描述**：一个对象，将每个语言环境映射到其对应的多语言 URL。

---

## 示例用法

### 基本用法（使用项目配置）

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// 使用项目的配置来设置 locales、defaultLocale 和 mode
getMultilingualUrls("/dashboard");
// 输出（假设项目配置有 en、fr，mode 为 'prefix-no-default'）：
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### 相对 URL

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// 输出: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### 绝对 URL

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// 输出: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### 不同的路由模式

```typescript
// prefix-no-default: 默认语言环境无前缀
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: 所有语言环境都有前缀
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: URL 中无语言环境前缀
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: 语言环境作为查询参数
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## 边界情况

- **无语言段：**
  - 该函数在生成多语言映射之前，会移除 URL 中任何已存在的语言段。

- **默认语言：**
  - 当 `prefixDefault` 为 `false` 时，函数不会为默认语言的 URL 添加前缀。

- **不支持的语言：**
  - 仅考虑 `locales` 数组中提供的语言来生成 URL。

---

## 在应用中的使用

在多语言应用中，配置国际化设置（包括 `locales` 和 `defaultLocale`）对于确保显示正确的语言至关重要。下面是一个如何在应用设置中使用 `getMultilingualUrls` 的示例：

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// 支持的语言和默认语言的配置
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

上述配置确保应用程序识别 `ENGLISH`、`FRENCH` 和 `SPANISH` 作为支持的语言，并使用 `ENGLISH` 作为回退语言。

使用此配置，`getMultilingualUrls` 函数可以根据应用程序支持的语言动态生成多语言 URL 映射：

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 输出：
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// 输出：
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

通过集成 `getMultilingualUrls`，开发者可以在多语言环境中保持一致的 URL 结构，从而提升用户体验和搜索引擎优化（SEO）。
