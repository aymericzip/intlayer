---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS 中间件文档 | adonis-intlayer
description: 了解如何为 adonis-intlayer 包使用 intlayer 中间件
keywords:
  - intlayer
  - adonisjs
  - 中间件
  - Intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 初始文档
---

# intlayer AdonisJS 中间件文档

用于 AdonisJS 的 `intlayer` 中间件检测用户的语言区域，并通过请求上下文提供翻译函数。它还允许在请求流中使用全局翻译函数。

## 用法

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## 描述

该中间件执行以下任务：

1. **语言区域检测**：它分析请求（标头、cookie 等）以确定用户的首选语言区域。
2. **上下文设置**：它使用语言区域信息填充请求上下文。
3. **Async Local Storage**：它使用 `cls-hooked` 管理异步上下文，允许全局 Intlayer 函数（如 `t`、`getIntlayer` 和 `getDictionary`）访问请求特定的语言区域，而无需手动传递。

> 注意：要使用 cookie 进行语言区域检测，请确保在您的应用程序中配置并使用了 `@adonisjs/cookie`。
