---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: onRequest 中间件文档 | astro-intlayer
description: 了解如何在 Astro 应用程序中使用 onRequest 中间件解析请求语言环境并填充 Astro.locals.intlayer。
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初始文档"
author: aymericzip
---

# onRequest Astro 中间件文档

`astro-intlayer/middleware` 中的 `onRequest` 中间件解析每个传入 HTTP 请求的语言环境，并填充 `Astro.locals.intlayer`。

当你在 `astro.config.mjs` 中注册 `intlayer()` 集成时，会自动注入此中间件。只有在使用 `sequence(...)` 手动组合 Astro 中间件时，才需要直接导入它。

## 使用方法

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // 在自定义中间件中访问解析出的语言环境
  const { locale } = context.locals.intlayer;
  console.log(`处理语言环境请求: ${locale}`);

  return next();
});
```

## 说明

该中间件执行以下任务：

1. **语言环境检测**：
   - **URL**：分析 URL 路径前缀或 `?locale=` 查询参数（除非 `routing.mode` 设置为 `no-prefix`）。
   - **Cookie / 请求头**：检查持久化的语言环境 Cookie 或自定义标头值。
   - **Accept-Language**：回退到浏览器的首选语言协商。
   - 对于预渲染页面（`context.isPrerendered`），严格从 URL 中提取语言环境，以防止 Astro 构建警告。
2. **上下文填充**：使用以下内容填充 `Astro.locals.intlayer`：
   - `locale`：解析出的语言环境。
   - `defaultLocale`：默认回退语言环境。
   - `availableLocales`：配置的语言环境数组。
3. **AsyncLocalStorage 作用域**：将下游请求处理包装在 `AsyncLocalStorage` 作用域内，允许 `useIntlayer()`、`useDictionary()` 和 `useLocale()` 无需显式传递参数即可访问请求状态。

## `IntlayerLocals` 类型

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## 相关文档

- [`intlayer` 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useLocale.md)
