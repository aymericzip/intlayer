---
createdAt: 2026-09-19
updatedAt: 2026-10-08
priority: 5
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

当 `intlayer()` 中间件运行时，它会将一个 `IntlayerState` 对象以 `Intlayer` 为键存储在请求上下文中。您可以在任何路由处理程序中获取它：

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // 通过 context.get(Intlayer) 访问
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

您也可以使用直接属性简写 `context.intlayer` 来访问它：

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## `IntlayerState` 结构

`IntlayerState` 对象包含：

| 属性               | 类型                | 描述                                           |
| ------------------ | ------------------- | ---------------------------------------------- |
| `locale`           | `DeclaredLocales`   | 为当前请求解析出的语言环境。                   |
| `defaultLocale`    | `DeclaredLocales`   | 在 `intlayer.config.ts` 中定义的回退语言环境。 |
| `availableLocales` | `DeclaredLocales[]` | 项目中配置的所有受支持语言环境列表。           |

## 相关文档

- [`intlayer` 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)
