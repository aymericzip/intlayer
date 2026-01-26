---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerMiddleware 文档 | next-intlayer
description: 查看如何在 next-intlayer 包中使用 intlayerMiddleware 函数
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 初始化文档
---

# intlayerMiddleware 文档

`intlayerMiddleware` 函数是一个 Next.js 中间件，负责基于 locale（语言环境）的路由和重定向。它会自动检测用户偏好的 locale，并在必要时将用户重定向到相应的本地化路径。

## 用法

```ts
// middleware.ts（中间件）
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## 描述

该中间件执行以下任务：

1. **Locale 检测**：它检查 URL 路径、cookie 和 `Accept-Language` 请求头以确定用户的 locale（语言/区域设置）。
2. **重定向**：如果 URL 不包含 locale 前缀且配置要求（或基于用户的偏好），则会重定向到本地化的 URL。
3. **Cookie 管理**：可以将检测到的 locale 存储在 cookie 中以用于后续请求。

## 参数

该函数在直接使用时接收标准的 Next.js `NextRequest` 作为参数，或者可以像上文所示那样导出。
