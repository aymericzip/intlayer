---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getPrefix 函数
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: 初始文档
---

# 文档：`intlayer` 中的 `getPrefix` 函数

## 描述

`getPrefix` 函数根据路由模式配置确定给定 locale 的 URL 前缀。它将 locale 与默认 locale 进行比较，并返回一个包含三种不同前缀格式的对象，以实现灵活的 URL 构建。

**主要特性：**

- 接受一个 locale 作为第一个参数（必需）
- 可选的 `options` 对象，包含 `defaultLocale` 和 `mode`
- 返回一个包含 `prefix` 和 `localePrefix` 属性的对象
- 支持所有路由模式：`prefix-no-default`、`prefix-all`、`no-prefix` 和 `search-params`
- 轻量级工具，用于确定何时添加 locale 前缀

---

## 函数签名

```typescript
getPrefix(
  locale: Locales,               // 必需
  options?: {                    // 可选
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // 例如 'fr/' 或 ''
  localePrefix?: Locale; // 例如 'fr' 或 undefined
}
```

---

## 参数

- `locale: Locales`
  - **描述**：用于生成前缀的语言环境。如果该值为假值（undefined、null、空字符串），函数将返回空字符串。
  - **类型**：`Locales`
  - **必需**：是

- `options?: object`
  - **描述**：用于确定前缀的配置对象。
  - **类型**：`object`
  - **必需**：否（可选）

  - `options.defaultLocale?: Locales`
    - **描述**：应用程序的默认语言环境。如果未提供，则使用项目配置中设置的默认语言环境。
    - **类型**：`Locales`
    - **默认值**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`

- **描述**：用于处理本地化的 URL 路由模式。如果未提供，则使用项目配置中设置的模式。
- **类型**：`'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
- **默认值**：[项目配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#middleware)
- **模式**：
  - `prefix-no-default`：当 locale 与默认 locale 匹配时返回空字符串
  - `prefix-all`：为所有 locale（包括默认）返回前缀
  - `no-prefix`：返回空字符串（URL 中无前缀）
  - `search-params`：返回空字符串（locale 作为查询参数）

### 返回值

- **类型**：`GetPrefixResult`
- **描述**：包含三种不同前缀格式的对象：
  - `prefix`：带有尾部斜杠的路径前缀（例如，`'fr/'`，`''`）
  - `localePrefix`：不带斜杠的语言标识符（例如，`'fr'`，`undefined`）

---

## 示例用法

### 基本用法

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// 检查英语语言的前缀
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// 返回: { prefix: 'en/', localePrefix: 'en' }

// 检查法语语言的前缀
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// 返回: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// 返回: { prefix: '', localePrefix: undefined }
```

### 不同的路由模式

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: 总是返回前缀
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// 返回: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: 当语言环境与默认相同时不返回前缀
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// 返回: { prefix: '', localePrefix: undefined }

javascript;
// prefix-no-default: 当语言环境与默认语言不同，返回前缀
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// 返回: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix 和 search-params: 从不返回前缀
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// 返回: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// 返回: { prefix: '', localePrefix: undefined }
```

### 实际示例

```typescript
import { getPrefix, Locales } from "intlayer";

// 为特定语言环境构建带有适当前缀的 URL
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

typescript;
// 使用 prefix 构建路径
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// 结果: "/fr/about"

// 使用 localePrefix 进行语言标识
console.log(`当前语言环境: ${localePrefix}`);
// 输出: "当前语言环境: fr"
```

---

## 相关函数

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md): 为特定语言环境生成本地化 URL
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getMultilingualUrls.md): 为所有配置的语言环境生成 URL

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // 带有尾部斜杠的路径前缀（例如 'fr/' 或 ''）
  localePrefix?: Locale; // 不带斜杠的语言标识符（例如 'fr' 或 undefined）
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
