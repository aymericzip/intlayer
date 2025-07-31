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
---

# 文档：`intlayer` 中的 `getLocalizedUrl` 函数

## 描述

`getLocalizedUrl` 函数通过在给定的 URL 前添加指定的语言环境前缀来生成本地化的 URL。它可以处理绝对 URL 和相对 URL，确保根据配置应用正确的语言环境前缀。

---

## 参数

- `url: string`

  - **描述**：需要添加语言环境前缀的原始 URL 字符串。
  - **类型**：`string`

- `currentLocale: Locales`

  - **描述**：当前正在本地化的语言环境。
  - **类型**：`Locales`

- `locales: Locales[]`

  - **描述**：可选的支持语言环境数组。默认情况下，提供项目中配置的语言环境。
  - **类型**：`Locales[]`
  - **默认值**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

- `defaultLocale: Locales`

  - **描述**：应用程序的默认语言环境。默认情况下，提供项目中配置的默认语言环境。
  - **类型**：`Locales`
  - **默认值**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

- `prefixDefault: boolean`
  - **描述**：是否为默认语言环境的 URL 添加前缀。默认情况下，提供项目中配置的值。
  - **类型**：`boolean`
  - **默认值**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

### 返回值

- **类型**: `string`
- **描述**: 指定语言环境的本地化 URL。

---

## 示例用法

### 相对 URL

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出: 对于法语区域，结果为 "/fr/about"
// 输出: 对于默认（英语）区域，结果为 "/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出: 对于法语区域，结果为 "/fr/about"
// 输出: 对于默认（英语）区域，结果为 "/about"
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

---

## 在应用中的使用

在多语言应用程序中，使用 `locales` 和 `defaultLocale` 配置国际化设置对于确保显示正确的语言至关重要。以下是如何在应用程序设置中使用 `getLocalizedUrl` 的示例：

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

上述配置确保应用程序识别 `ENGLISH`、`FRENCH` 和 `SPANISH` 作为支持的语言，并使用 `ENGLISH` 作为回退语言。

使用此配置，`getLocalizedUrl` 函数可以根据用户的语言偏好动态生成本地化 URL：

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 输出: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 输出: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 输出: "/about"
```

通过集成 `getLocalizedUrl`，开发者可以在多语言环境中保持一致的 URL 结构，提升用户体验和 SEO 效果。

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
  getLocalizedUrl("/about", Locales.FRENCH); // 输出: "/fr/about"
  getLocalizedUrl("/about", Locales.SPANISH); // 输出: "/es/about"
  getLocalizedUrl("/about", Locales.ENGLISH); // 输出: "/about"

```

通过集成 `getLocalizedUrl`，开发者可以在多语言环境中保持一致的 URL 结构，从而提升用户体验和搜索引擎优化（SEO）。

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史记录
```
