---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getConfiguration 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getConfiguration 函数
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 文档：`intlayer` 中的 `getConfiguration` 函数

## 描述

`getConfiguration` 函数通过提取环境变量来获取 `intlayer` 应用程序的完整配置。该函数提供了在客户端和服务器端使用相同配置的灵活性，确保整个应用程序的一致性。

---

## 参数

该函数不接受任何参数。相反，它使用环境变量进行配置。

### 返回值

- **类型**：`IntlayerConfig`
- **描述**：一个包含 `intlayer` 完整配置的对象。配置包括以下部分：

  - `internationalization`：与语言环境和严格模式相关的设置。
  - `middleware`：与 URL 和 Cookie 管理相关的设置。
  - `content`：与内容文件、目录和模式相关的设置。
  - `editor`：编辑器特定的配置。

详情请参见 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

---

## 示例用法

### 获取完整配置

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 输出：
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 输出：
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// 输出：
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### 提取 `availableLocales` 和 `defaultLocale`

配置中的 `internationalization` 部分提供了与语言环境相关的设置，例如 `locales`（可用语言环境）和 `defaultLocale`（默认语言）。

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 输出示例: ["en", "fr", "es"]
console.log(defaultLocale); // 输出示例: "en"
console.log(cookieName); // 输出: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 输出示例: ["en", "fr", "es"]
console.log(defaultLocale); // 输出示例: "en"
console.log(cookieName); // 输出: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 输出示例: ["en", "fr", "es"]
console.log(defaultLocale); // 输出示例: "en"
console.log(cookieName); // 输出: "INTLAYER_LOCALE"
```

## 备注

- 确保在调用此函数之前，所有必需的环境变量都已正确设置。缺少变量将导致初始化时出错。
- 此函数可在客户端和服务器端使用，是统一管理配置的多功能工具。

## 应用中的使用

`getConfiguration` 函数是初始化和管理 `intlayer` 应用配置的核心工具。通过提供对本地化设置、中间件和内容目录等配置的访问，它确保了多语言和内容驱动应用的一致性和可扩展性。
