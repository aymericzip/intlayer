---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: intlayer Elysia 插件文档 | elysia-intlayer
description: 了解如何使用 elysia-intlayer 包中的 intlayer 插件
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "初始化文档"
author: aymericzip
---

# intlayer Elysia 插件文档

Elysia 的 `intlayer` 插件会检测用户的 locale，并向路由上下文注入一个 `intlayer` 对象。它同时支持在请求上下文中使用全局翻译函数。

## 用法

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    zh: "你好",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> 该插件通过 **全局** `derive` 注册其上下文，Elysia 会将其类型标注为 `Partial<{ intlayer: IntlayerContext }>`。对于在 `.use(intlayer())` 之后注册的路由，该值在运行时始终存在，因此请使用非空断言（`intlayer!.t`）或可选链，以满足 `strict` 模式下的 TypeScript。

同样的 helper 也以独立导出的形式提供，因此你可以在不解构路由上下文的情况下调用它们：

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    zh: "你好",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## 描述

该插件执行以下任务：

1. **Locale 检测**：它先从 storage（cookie、header）读取客户端显式设置的 locale，然后回退到从 `Accept-Language` 请求头协商得到的 locale。
2. **上下文注入**：它向 Elysia 路由上下文添加一个 `intlayer` 属性（参见下方的“路由上下文”表格）。
3. **上下文管理**：它使用 `AsyncLocalStorage` 管理异步上下文，使全局 Intlayer 函数（`t`、`getIntlayer`、`getDictionary`）无需传递上下文对象即可访问该请求特定的 locale。
4. **字典准备**：它在创建插件时调用 `prepareIntlayer`，因此字典会在应用启动时构建。

### 路由上下文

| 属性              | 类型                   | 描述                                                                 |
| ----------------- | ---------------------- | -------------------------------------------------------------------- |
| `locale`          | `Locale`               | 本次请求要使用的 locale，`locale_storage` 优先于 `locale_detected`。 |
| `locale_storage`  | `Locale` (可选)        | 客户端通过 cookie 或 header 显式请求的 locale。                      |
| `locale_detected` | `Locale`               | 从请求头协商得到的 locale。                                          |
| `defaultLocale`   | `Locale`               | 在 `intlayer.config.ts` 中配置为 fallback 的 locale。                |
| `t`               | `TranslateFunction`    | 翻译函数。                                                           |
| `getIntlayer`     | `typeof getIntlayer`   | 按 key 获取字典的函数。                                              |
| `getDictionary`   | `typeof getDictionary` | 处理字典对象的函数。                                                 |

> 与基于 Node 的 Intlayer 插件不同，`elysia-intlayer` 依赖 `AsyncLocalStorage` 而非 `cls-hooked`，因为 `cls-hooked` 依赖于 Bun 未实现的 `async_hooks.createHook`。

请求上下文会在响应被映射后释放，因此独立的 helper 永远不会针对已经结束的请求进行解析。当在插件处理的请求之外调用时，它们会回退到配置的默认 locale。

## 语言环境解析顺序

默认情况下，插件按以下顺序解析语言环境：

1. `INTLAYER_LOCALE` cookie。
2. `x-intlayer-locale` 请求头。
3. `Accept-Language` 请求头协商。
4. 配置的 `defaultLocale`。

```bash
# 从 `Accept-Language` 协商得出
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# cookie 优先于 `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# 请求头优先于 `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## 配置

该插件会读取你的 `intlayer.config.ts` 文件。你可以自定义用于 locale 检测的 cookie 和 header：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> 有关配置的更多信息，请访问[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 相关文档

- [elysia-intlayer 包文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/elysia-intlayer/exports.md)
- [Elysia i18n - 完整指南翻译你的应用](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_elysia.md)
