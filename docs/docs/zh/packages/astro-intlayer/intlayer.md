---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: intlayer 集成文档 | astro-intlayer
description: 了解如何在 astro.config.mjs 中配置和使用 intlayer Astro 集成。
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - 集成
  - i18n
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "更新了包含中间件和钩子细节的集成文档"
  - version: 8.0.0
    date: 2026-01-21
    changes: "初始文档"
author: aymericzip
---

# intlayer Astro 集成文档

Astro 的 `intlayer` 集成为多语言国际化 (i18n) 配置您的项目。它处理构建时字典准备、Vite 插件注入、请求中间件自动注册以及在重写的本地化路径输出预渲染页面。

## 使用方法

将 `intlayer()` 添加到您的 `astro.config.mjs` 中：

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Astro CLI 的 codemod（`astro add astro-intlayer`）也会生成一个支持的默认导入：

```ts
import intlayer from "astro-intlayer";
```

## 说明

该集成接入 Astro 的构建和运行时生命周期：

1. **配置设置 (`astro:config:setup`)**：
   - **字典准备**：在构建运行之前准备 Intlayer 字典和生成的类型。
   - **Vite 插件**：注入 Vite 别名插件（实现无缝字典导入）、语言环境路由代理和构建剪裁。
   - **中间件注册**：自动将 `astro-intlayer/middleware` 注入到项目的中间件链中，在每个传入请求上填充 `Astro.locals.intlayer`。
2. **构建完成 (`astro:build:done`)**：
   - **页面重写**：检查本地化 URL 重写规则，并在其对应的本地化路径输出预渲染的 HTML 页面。

## 开箱即用功能

配置完成后，您的 Astro 应用程序可以立即使用：

- `.astro` 组件 frontmatter 中的 `useIntlayer`、`useDictionary` 和 `useLocale` 钩子。
- Astro 端点和页面中的 `Astro.locals.intlayer` 对象。
- `<script>` 块中的客户端导入，以响应式更新镜像相同的 API。
- `astro-intlayer/format` 下的内置格式化程序（`useDate`、`useNumber`、`useCurrency` 等）。

## 相关文档

- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useLocale.md)
- [`onRequest` 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/onRequest.md)
