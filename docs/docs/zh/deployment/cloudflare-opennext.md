---
title: 在 Cloudflare (OpenNext) 上部署集成了 Next.js 16 的 Intlayer
description: 了解如何使用 OpenNext 适配器将集成了 Intlayer 的 Next.js 16 应用程序部署到 Cloudflare Workers。
keywords:
  - Intlayer
  - Next.js 16
  - Cloudflare
  - OpenNext
  - 部署
  - i18n
---

# 在 Cloudflare (OpenNext) 上部署集成了 Next.js 16 的 Intlayer

本指南提供了如何使用 [OpenNext](https://open-next.js.org/cloudflare) 适配器将集成了 Intlayer 的 Next.js 16 应用程序部署到 Cloudflare Workers 的说明。

## 前提条件

- Next.js 16.x
- Intlayer 7.x
- Cloudflare 账户
- 已安装 `wrangler` CLI
- `@opennextjs/cloudflare` 适配器

## 1. 项目配置

### Intlayer 配置

确保您的 `intlayer.config.ts` 正确设置了国际化选项：

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

### 中间件设置 (Middleware)

Cloudflare Workers 对中间件有特定要求。在 Next.js 16 中，确保您的中间件匹配器 (matcher) 排除所有静态资源，以避免不必要的执行，这一点至关重要。

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

配置您的 `wrangler.jsonc` 以指向 OpenNext 的输出目录：

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

更新您的 `package.json`，包含针对 Cloudflare 的构建流水线：

```json
{
  "scripts": {
    "build:cf": "intlayer build && opennextjs-cloudflare build",
    "deploy:cf": "npm run build:cf && wrangler deploy"
  }
}
```

> **注意**：我们使用 `wrangler deploy` 而不是 `opennextjs-cloudflare deploy`，是为了在项目不需要严格的增量缓存同步时，避免 ISR 对 R2 存储桶的强制性要求。

## 4. 已知问题与技巧

### React 19 & Next.js 16 兼容性
在 React 19 中使用 Intlayer 时，请确保 `IntlayerClientProvider` 包裹了您的 `ThemeProvider` 或其他布局层级的 Provider（位于 `app/[locale]/layout.tsx` 中），以防止水合 (hydration) 不匹配。

### Turbopack

如果您在开发中使用 Turbopack，请确保使用最新版本的 `next-intlayer`，以享受针对字典文件优化的 HMR 支持。

## 参考实现

您可以在这里找到该设置的生产级参考实现：
- **代码库**: [loralg](https://github.com/loralg)
- **技术栈**: Next.js 16.1.1, React 19, Intlayer 7.x, Cloudflare Workers, OpenNext。

## 未来建议 (RFC)

1. **类型推导**: 增强 `useIntlayer` 的返回类型，以减少在嵌套字典中手动访问 `.value` 的需求。
2. **CLI 脚手架**: 一个 `npx intlayer scan` 命令，用于从现有的硬编码字符串自动生成 `.content.ts` 模板，这将极大地提升开发体验 (DX)。

---

## 结论
通过以上设置，Intlayer 将在 Cloudflare 的边缘网络上无缝处理语言路由和内容分发，为您的全球用户提供快速且本地化的体验。
