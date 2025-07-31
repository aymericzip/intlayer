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
---

# 文档：`intlayer` 中的 `getMultilingualUrls` 函数

## 描述

`getMultilingualUrls` 函数通过在给定的 URL 前添加每个支持的语言环境前缀来生成多语言 URL 的映射。它可以处理绝对和相对 URL，根据提供的配置或默认值应用适当的语言环境前缀。

---

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

### 返回值

- **类型**：`IConfigLocales<string>`
- **描述**：一个对象，将每个语言环境映射到其对应的多语言 URL。

---

## 示例用法

### 相对 URL

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// 配置支持的语言环境和默认语言环境
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
// 配置支持的语言环境和默认语言环境
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;

module.exports = config;
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

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
