---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Vite 插件文档 | vite-intlayer
description: 适用于 Vite 开发/预览服务器和生产环境 SSR 的语言路由中间件。处理语言检测、URL 重定向和内部重写。
keywords:
  - intlayerProxy
  - vite
  - 插件
  - 中间件
  - 语言
  - 路由
  - 国际化
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "将 configOptions 合并到单个 options 对象中；proxy 已包含 in intlayer() 中"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` 是一个 Vite 插件，它为**所有环境**注册语言路由中间件：开发服务器（dev server）、预览服务器（preview server）和生产环境 SSR（Nitro / TanStack Start）。

> **自 Intlayer v9 起**，`intlayerProxy` 会自动包含在主 [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md) 插件中，并通过 `routing.enableProxy: true` 默认启用。仅当您需要更底层的控制或在标准 `intlayer()` 设置之外使用它时，才需要单独注册它。

## 用法

### 作为 `intlayer()` 的一部分（推荐，v9+）

将 `proxy` 选项传递给主插件，而不是单独注册 `intlayerProxy`：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### 独立使用（需要时）

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## 选项

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

所有选项都是可选的，并作为单个对象传递：

| 选项            | 类型                                | 描述                                                                                               |
| --------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | 排除语言路由请求的断言函数。返回 `true` 以跳过请求（例如 API 路由、健康检查）。                    |
| `configOptions` | `GetConfigurationOptions`           | 转发给 `getConfiguration()` 的 Intlayer 配置覆盖项。当您需要代理读取特定的配置文件或覆盖值时使用。 |

### 示例

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` 创建一个独立于框架的 Node.js `(req, res, next)` 中间件，其中包含所有语言路由逻辑。它适用于 Vite 插件 API 不可用的环境（例如普通的 Node.js 服务器或自定义 Nitro 模块）。

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### 生产环境 SSR（通过 h3 的 TanStack Start / Nitro）

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## 路由行为

该中间件映射了 `next-intlayer` 中间件的路由逻辑，并支持所有 Intlayer 路由模式。

### 路由模式

| 模式            | URL 在浏览器中可见       | 行为                                                                            |
| --------------- | ------------------------ | ------------------------------------------------------------------------------- |
| `prefix`        | `/zh/about`              | 默认。URL 中的语言前缀。默认语言会重定向到无前缀 URL，除非启用了 `prefix-all`。 |
| `prefix-all`    | `/en/about`, `/zh/about` | 所有语言 — 包括默认语言 — 始终带有前缀。                                        |
| `no-prefix`     | `/about`                 | URL 中没有语言。语言仅存储在 cookie 中；URL 重写发生在内部。                    |
| `search-params` | `/about?locale=zh`       | 语言作为查询参数传递。在缺失或过期时重定向以添加/更新 `locale` 参数。           |

### 检测优先级

1. URL 路径前缀（例如 `/zh/about` → `zh`）。
2. Cookie / localStorage 值（`intlayer-locale`）。
3. `Accept-Language` 请求头。
4. 配置中的 `defaultLocale`。

### 自动绕过

中间件始终直接传递这些请求，而不进行语言处理：

- 匹配 `ignore` 断言的请求。
- `/node_modules/**`
- `/@**` – Vite 内部（`@vite/`, `@fs/`, `@id/` 等）。
- `/_**` – 服务器内部（`__vite_ping`, `__manifest` 等）。
- 路径以文件扩展名结尾的请求（静态资源）。如果静态资源路径上存在语言前缀（例如 `/zh/logo.png`），则会将其剥离，以便可以正确提供文件。

### 域名路由

当在您的 Intlayer 配置中配置了 `routing.domains` 时，中间件处理跨域语言路由：

- 当 `domains.zh = "intlayer.zh"` 时，在 `intlayer.org` 上对 `/zh/about` 的请求被重定向到 `https://intlayer.zh/about`。
- 对 `intlayer.zh/about` 的请求在内部重写为 `/zh/about`，以便填充 `[locale]` 路由参数。

### 重定向死循环保护

中间件在 2 秒滑动窗口内跟踪每个 `originalUrl → newUrl` 对的重定向计数。该窗口内超过 10 次重定向将返回具有描述性错误的 `500` 响应，而不是无限循环。

## Nitro / 生产环境 SSR（自动注入，v9+）

当 `intlayerProxy` 用作 Vite 插件时，它携带一个 `.nitro` 属性。`nitro/vite` 构建插件读取此属性并将其推入 `nitroConfig.modules` 中，因此 `intlayerNitroHandler` 会自动注册为 Nitro 服务器中间件 — 生产环境 SSR 不需要手动配置。

Nitro 处理器使用 h3 v2 的 Web Fetch API 事件模型（而不是 `fromNodeMiddleware`），因此它与所有 Nitro 预设兼容：Node, Bun, Deno, edge 运行时。

## 弃用的别名

| 弃用的导出                 | 替代品          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
