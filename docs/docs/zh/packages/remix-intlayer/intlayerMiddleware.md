---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer 中间件文档 | remix-intlayer
description: 了解如何在 Remix 3 中使用 intlayer 中间件检测语言环境、处理重定向并将 Intlayer 状态注入到请求上下文中。
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "intlayer 中间件初始文档"
author: aymericzip
---

# intlayer Remix 3 中间件文档

Remix 3 的 `intlayer` 中间件负责管理整个应用程序的国际化层。它基于 Web 标准（`Request` 和 `Response`）构建，处理语言环境路由（重定向和内部重写），检测请求的语言环境，将其持久化到 Cookie 和请求头中，并建立一个 `AsyncLocalStorage` 作用域，使下游的处理程序和组件无需逐层传递 props 即可访问翻译内容。

## 使用方法

在初始化 Remix 3 路由器时注册 `intlayer` 中间件：

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// 服务于 `/`、`/fr`、`/es`，语言环境从请求中解析
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## 描述

`intlayer` 中间件执行以下任务：

1. **字典准备**: 在启动时运行 `prepareIntlayer`，确保所有生成的字典均已构建并可用。
2. **语言环境路由**: 根据配置的路由策略（`prefix_always`、`prefix_as_needed`、`no_prefix`）评估请求：
   - **重定向**: 如果用户访问 `/about` 且应被路由到带语言环境前缀的路径（例如 `/fr/about`），中间件将返回带有相应 `location` 和 `Set-Cookie` 标头的重定向响应。
   - **内部重写**: 当用户访问 `/fr/about` 时，URL 会在内部被重写，使您的路由处理程序匹配 `/about`，同时解析出的语言环境被记录为 `fr`。
   - **本地化 URL 别名**: 遵循 `intlayer.config.ts` 中定义的 URL 重写规则（例如将 `/fr/about` 重写为 `/fr/a-propos`）。
3. **语言环境解析**: 根据 URL 前缀、已持久化的 Cookie、自定义请求头或 `Accept-Language` 浏览器偏好检测当前语言环境。
4. **上下文注入**:
   - 将 `IntlayerState`（`locale`、`defaultLocale`、`availableLocales`）以 `Intlayer` 键以及 `context.intlayer` 的形式附加到 Remix 的 `RequestContext` 上。
   - 在 `AsyncLocalStorage` 作用域（`requestStorage`）内运行请求的剩余部分，使 `useIntlayer`、`useDictionary` 和 `useLocale` 能够在处理程序、视图和组件中简洁地调用。
5. **持久化**: 将传出的语言环境请求头和 Cookie 附加到最终的 HTTP 响应中，以保存用户的偏好。

## 参数

`intlayer` 函数接受可选的 `IntlayerMiddlewareOptions`：

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // 自定义路由配置覆盖
};

const middleware = intlayer(options);
```

## 直接访问上下文

除了使用钩子之外，您还可以直接从 Remix 请求上下文中访问解析后的 `IntlayerState`：

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // 通过 context.get()
  const state = context.get(Intlayer);

  // 或通过 context.intlayer 属性直接访问
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## 相关文档

- [`Intlayer` 请求上下文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/Intlayer.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)
