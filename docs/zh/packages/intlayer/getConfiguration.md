# Documentation: `getConfiguration` 函数在 `intlayer`

## 描述:

`getConfiguration` 函数通过提取环境变量来检索 `intlayer` 应用程序的整个配置。此函数提供了在客户端和服务器端使用相同配置的灵活性，从而确保应用程序的一致性。

---

## 参数:

该函数不接受任何参数。相反，它使用环境变量进行配置。

### 返回:

- **类型**: `IntlayerConfig`
- **描述**: 一个包含 `intlayer` 完整配置的对象。该配置包括以下部分:

  - `internationalization`: 与区域和严格模式相关的设置。
  - `middleware`: 与 URL 和 cookie 管理相关的设置。
  - `content`: 与内容文件、目录和模式相关的设置。
  - `editor`: 编辑器特定的配置。

有关详细信息，请参见 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

---

## 示例用法:

### 检索完整配置:

```typescript
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

### 提取 `availableLocales` 和 `defaultLocale`:

配置的 `internationalization` 部分提供了与区域设置相关的配置，例如 `locales`（可用区域）和 `defaultLocale`（后备语言）。

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 输出示例: ["en", "fr", "es"]
console.log(defaultLocale); // 输出示例: "en"
console.log(cookieName); // 输出: "INTLAYER_LOCALE"
```

## 注意事项:

- 确保在调用此函数之前正确设置所有必需的环境变量。缺少变量将导致初始化期间出现错误。
- 此函数可以在客户端和服务器端使用，使其成为以统一方式管理配置的多功能工具。

## 应用中的用法:

`getConfiguration` 函数是初始化和管理 `intlayer` 应用程序配置的基石工具。通过提供对区域、middleware 和内容目录等设置的访问，它确保在多语言和内容驱动的应用程序中保持一致性和可扩展性。
