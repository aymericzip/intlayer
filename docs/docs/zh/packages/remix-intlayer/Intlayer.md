---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Intlayer 上下文文档 | remix-intlayer
description: Remix 3 应用程序中 Intlayer 请求上下文存储键的文档。
keywords:
  - Intlayer
  - remix
  - remix-3
  - 请求上下文
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Intlayer 上下文键初始文档"
author: aymericzip
---

# Intlayer 请求上下文键

`Intlayer` 导出项用作 Remix 3 中的请求上下文存储标识符。它允许在路由处理程序或自定义中间件内直接从 Remix 上下文对象中检索 Intlayer 状态。

## 使用方法

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## 说明

`Intlayer` 由 `intlayer()` 中间件用于将当前会话状态绑定到 Remix 的请求上下文 (`RequestContext`)。通常推荐使用 `useLocale()` 或 `useIntlayer()` 等钩子。通过 `context.get(Intlayer)` 进行直接访问在底层中间件处理程序或显式传递上下文实例的 API 路由中非常有用。

## 相关文档

- [`intlayer` 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)
