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

# intlayer 中间件

`intlayer` 中间件函数在 Remix 3 应用程序中配置按请求进行的国际化处理。它检测每个传入请求的语言环境，应用 URL 重定向规则，并将语言环境状态保存在请求上下文中。

## 使用方法

在 Remix 路由器中注册中间件：

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## 工作原理

中间件对每个传入请求执行以下任务：

1. **语言环境检测**: 根据 Intlayer 配置，从 URL 路径前缀（例如 `/zh/about`）、Cookie 或 `Accept-Language` 请求头中提取语言环境。
2. **URL 重定向**: 如果请求的路径缺少语言环境前缀，并且配置要求前缀路由，中间件将返回重定向响应 (302/307/308) 到带前缀的相应 URL。
3. **填充请求上下文**: 使用 `Intlayer` 键将当前解析的语言环境保存到 Remix 请求上下文中，使钩子 (`useLocale`, `useIntlayer`, `useDictionary`) 能够透明使用。
4. **Cookie 管理**: 在需要持久保存用户首选语言环境时设置 `Set-Cookie` 标头。

## 相关文档

- [`Intlayer` 请求上下文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/Intlayer.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)
