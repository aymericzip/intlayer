# 文档: `getConfiguration` 函数在 `intlayer` 中

## 描述

`getConfiguration` 函数通过提取环境变量来检索 `intlayer` 应用程序的完整配置。此函数提供了在客户端和服务器端使用相同配置的灵活性，从而确保整个应用程序的一致性。

---

## 参数

该函数不接受任何参数。相反，它使用环境变量进行配置。

### 返回值

- **类型**: `IntlayerConfig`
- **描述**: 包含 `intlayer` 完整配置的对象。配置包括以下部分：

  - `internationalization`: 与语言环境和严格模式相关的设置。
  - `middleware`: 与 URL 和 Cookie 管理相关的设置。
  - `content`: 与内容文件、目录和模式相关的设置。
  - `editor`: 编辑器特定的配置。

详见 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 获取更多详情。

---

## 示例用法

### 检索完整配置

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 输出:
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
// 输出:
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
// 输出:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### 提取 `availableLocales` 和 `defaultLocale`

配置的 `internationalization` 部分提供了与语言环境相关的设置，例如 `locales`（可用语言环境）和 `defaultLocale`（回退语言）。

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

## 注意事项

- 在调用此函数之前，请确保所有必需的环境变量已正确设置。缺少变量将在初始化期间导致错误。
- 此函数可用于客户端和服务器端，使其成为统一管理配置的多功能工具。

## 应用中的使用

`getConfiguration` 函数是初始化和管理 `intlayer` 应用程序配置的核心工具。通过提供对语言环境、中间件和内容目录等设置的访问，它确保了多语言和内容驱动应用程序的一致性和可扩展性。
