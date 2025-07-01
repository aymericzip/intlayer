---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Next.js 中带有 i18n 的静态渲染与动态渲染
description: 学习如何在 Next.js 中使用带有 i18n 的静态渲染与动态渲染。
keywords:
  - 静态
  - 动态
  - 渲染
  - i18n
  - next.js
  - next-intl
  - intlayer
  - 框架
  - 中间件
  - 配置
slugs:
  - doc
  - faq
  - static-rendering
---

# Next.js 中带有 i18n 的静态渲染与动态渲染

## **next-intl** 的问题

- **发生了什么？**
  当你在一个带有 i18n 路由的应用（如 `/en/…`、`/fr/…`）的 _服务器组件_ 内使用 `useTranslations`、`getTranslations` 或任何 next-intl 辅助函数时，Next.js 会将整个路由标记为 **动态**。([Next Intl][1])

- **为什么？**
  next-intl 通过 `headers()` 从仅限请求的头部 (`x-next-intl-locale`) 查找当前语言环境。由于 `headers()` 是一个 **动态 API**，任何使用它的组件都会失去静态优化。([Next Intl][1], [Next.js][2])

- **官方解决方案（模板）**

  1. 导出包含所有支持语言环境的 `generateStaticParams`。
  2. 在调用 `useTranslations` 之前，在 **每个** 布局/页面中调用 `setRequestLocale(locale)`。([Next Intl][1])
     这样可以去除对头部的依赖，但你需要维护额外的代码，并且在生产环境中使用不稳定的 API。

## **intlayer** 如何规避该问题

**设计选择**

1. **仅使用路由参数** – 语言环境来自 Next.js 已经传递给每个页面的 `[locale]` URL 段。
2. **编译时打包** – 翻译作为常规 ES 模块导入，因此它们会被摇树优化并在构建时嵌入。
3. **无动态 API** – `useT()` 从 React 上下文中读取，而不是从 `headers()` 或 `cookies()` 中读取。
4. **零额外配置** – 一旦你的页面位于 `app/[locale]/` 目录下，Next.js 会自动为每个语言环境预渲染一个 HTML 文件。
