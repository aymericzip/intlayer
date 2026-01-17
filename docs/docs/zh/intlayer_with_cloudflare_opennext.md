---
createdAt: 2026-01-17
updatedAt: 2026-01-17
title: 在 Cloudflare (OpenNext) 上部署集成 Intlayer 的 Next.js 16
description: 本指南提供如何使用 OpenNext 适配器将集成 Intlayer 的 Next.js 16 应用程序部署到 Cloudflare Workers 的说明。
keywords:
  - intlayer
  - nextjs
  - cloudflare
  - opennext
  - 部署
slugs:
  - intlayer-with-cloudflare-opennext
---

# 在 Cloudflare (OpenNext) 上部署集成 Intlayer 的 Next.js 16

本指南提供如何使用 `https://open-next.js.org/cloudflare` 适配器将集成 Intlayer 的 Next.js 16 应用程序部署到 Cloudflare Workers 的说明。

## 先决条件

- Next.js 16.x
- Intlayer 7.x
- Cloudflare 账户
- 已安装 `wrangler` CLI
- `@opennextjs/cloudflare` 适配器

## 1. 项目配置

### Intlayer 配置

确保您的 `intlayer.config.ts` 已正确设置国际化：

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.CHINESE],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 中间件设置

Cloudflare Workers 对中间件有特定要求。在 Next.js 16 中，确保您的中间件匹配器排除所有静态资源以避免不必要的执行至关重要。

创建或更新您的 `middleware.ts`：

```typescript
import { intlayerMiddleware } from "next-intlayer/middleware";

export default intlayerMiddleware;

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

## 2. Cloudflare 特定配置

### Wrangler 配置 (`wrangler.jsonc`)

配置您的 `wrangler.jsonc` 以指向 OpenNext 输出：

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "your-app-name",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  }
}
```

## 3. 构建与部署脚本

更新您的 `package.json` 以包含 Cloudflare 的构建管道：

```json
{
  "scripts": {
    "build:cf": "intlayer build && opennextjs-cloudflare build",
    "deploy:cf": "npm run build:cf && wrangler deploy"
  }
}
```

> **注意**：我们使用 `wrangler deploy` 而不是 `opennextjs-cloudflare deploy`，以避免如果您的项目不严格需要增量缓存同步时对 ISR 的强制性 R2 存储桶要求。

## 4. 已知问题与技巧

### React 19 和 Next.js 16 兼容性
在使用 Intlayer 和 React 19 时，确保 `IntlayerClientProvider` 包裹了 `app/[locale]/layout.tsx` 中的 `ThemeProvider` 或其他布局级提供者，以防止水合不匹配（hydration mismatches）。

### Turbopack
如果您在开发中使用 Turbopack，请确保您拥有最新版本的 `next-intlayer`，以受益于针对词典文件优化的 HMR 支持。

---

## 结论
通过遵循此设置，Intlayer 将无缝处理 Cloudflare 边缘网络上的语言路由和内容交付，为您的全球用户提供快速且本地化的体验。
