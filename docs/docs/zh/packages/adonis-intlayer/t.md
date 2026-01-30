---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t 函数文档 | adonis-intlayer
description: 了解如何为 adonis-intlayer 包使用 t 函数
keywords:
  - t
  - 翻译
  - Intlayer
  - 国际化
  - 文档
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 初始文档
---

# 文档：`adonis-intlayer` 中的 `t` 函数

`adonis-intlayer` 包中的 `t` 函数是在 AdonisJS 应用程序中提供本地化响应的核心工具。它通过根据用户的首选语言动态选择内容，简化了国际化 (i18n) 过程。

---

## 概述

`t` 函数用于定义和检索一组给定语言的翻译。它根据客户端的请求设置（如 `Accept-Language` 标头）自动确定要返回的相应语言。如果首选语言不可用，它会优雅地回退到配置中指定的默认语言区域。

---

## 关键特性

- **动态本地化**：自动为客户端选择最合适的翻译。
- **回退到默认语言区域**：如果客户端的首选语言不可用，则回退到默认语言区域，确保用户体验的连续性。
- **异步上下文**：使用 Async Local Storage 在 AdonisJS 请求生命周期内无缝工作。
- **TypeScript 支持**：为您的翻译强制执行类型安全。

---

## 函数签名

```typescript
t(translations: Record<string, any>): any;
```

### 参数

- `translations`：一个对象，其键为语言区域代码（例如 `en`、`fr`、`es`），值为相应的翻译内容。

### 返回值

- 代表客户端首选语言的内容。

---

## 加载中间件

为了确保 `t` 函数正常工作，您**必须**在 AdonisJS 应用程序中注册 `intlayer` 中间件。

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## 使用示例

### 基础示例

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue !",
    es: "¡Bienvenido!",
  });
});
```

### 在控制器中使用

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour 來自控制器",
      })
    );
  }
}
```

---

## 高级主题

### 回退机制

如果首选语言区域不可用，`t` 函数将回退到 `intlayer.config.ts` 中定义的默认语言区域。

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### TypeScript 集成

当与定义的字典一起使用时，`t` 函数是类型安全的。有关更多详细信息，请参阅 [TypeScript 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。
