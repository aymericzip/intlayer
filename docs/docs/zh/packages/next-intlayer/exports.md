---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer 包文档
description: Next.js 专用的 Intlayer 集成，提供用于 App Router 和 Page Router 的中间件与提供者。
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# next-intlayer 包

`next-intlayer` 包提供将 Intlayer 集成到 Next.js 应用所需的工具。它同时支持 App Router 和 Page Router，包括用于基于语言环境的路由的中间件。

## 安装

```bash
npm install next-intlayer
```

## 导出

### 中间件

导入：

```tsx
import "next-intlayer/middleware";
```

| 功能                 | 描述                                                                                                                   | 相关文档                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js 中间件，用于处理基于 locale 的路由和重定向。它会从 headers/cookies 检测 locale，并重定向到相应的 locale 路径。 | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/intlayerMiddleware.md) |

### 配置助手

导入：

```tsx
import "next-intlayer/server";
```

| 函数               | 描述                                                                                                           | 相关文档 |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | -------- |
| `withIntlayer`     | 异步辅助函数，用于包装 Next.js 配置，确保在构建之前准备好 Intlayer 字典。准备内容文件并设置 webpack/SWC 插件。 | -        |
| `withIntlayerSync` | 同步辅助函数，用于包装 Next.js 配置，适用于无法或不希望使用异步的配置场景。不会在服务器启动时准备字典。        | -        |

### 提供者

导入：

```tsx
import "next-intlayer";
```

或

```tsx
import "next-intlayer/server";
```

| 组件                     | 描述                                                                                                | 相关文档 |
| ------------------------ | --------------------------------------------------------------------------------------------------- | -------- |
| `IntlayerClientProvider` | Next.js App Router 中用于客户端组件的 Provider。封装了来自 `react-intlayer` 的 `IntlayerProvider`。 | -        |
| `IntlayerServerProvider` | Next.js（App Router）中用于服务端组件的 Provider。在服务器上提供 locale 上下文。                    | -        |
| `IntlayerServer`         | App Router 中 Intlayer 内容的服务端包装器。确保 Server Components 中正确的 locale 处理。            | -        |
| `HTMLProvider`           | 用于 HTML 相关国际化设置的 Provider。允许为 HTML 标签覆盖组件。                                     | -        |
| `HTMLRenderer`           | 使用自定义组件渲染 HTML 内容。                                                                      | -        |
| `MarkdownProvider`       | 用于 Markdown 渲染上下文的 Provider。允许为 Markdown 元素覆盖自定义组件。                           | -        |
| `MarkdownRenderer`       | 使用自定义组件渲染 Markdown 内容。                                                                  | -        |

### 钩子（客户端）

导入：

```tsx
import "next-intlayer";
```

重新导出大多数来自 `react-intlayer` 的钩子。

| 钩子                   | 描述                                                                                                         | 相关文档                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | 在客户端使用的 Hook，通过其 key 选择一个 dictionary 并返回其内容。若未提供 locale，则使用上下文中的 locale。 | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | 将字典对象转换并返回当前 locale 的内容的 Hook。处理 `t()` 翻译、枚举等。                                     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | 处理异步字典的 Hook。接受一个以 Promise 为值的字典映射，并为当前 locale 解析它。                             | -                                                                                                                       |
| `useDictionaryDynamic` | 处理按键加载的动态字典的 Hook。内部使用 React Suspense 来处理加载状态。                                      | -                                                                                                                       |
| `useLocale`            | 客户端 hook，用于获取当前 locale 并提供设置它的函数。为 Next.js App Router 增强，支持导航。                  | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | 客户端 hook，用于管理 URL 重写。如果存在更优雅的本地化重写规则，会自动更新 URL。                             | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | 用于 Next.js Page Router 的特定 locale 管理 hook。处理在 locale 更改时的重定向和页面重载。                   | -                                                                                                                       |
| `useI18n`              | 提供翻译函数 `t()` 的 hook，用于通过键访问嵌套内容。模仿 i18next/next-intl 的模式。                          | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | 提供与 locale 绑定的 `Intl` 对象的 Hook。自动注入当前的 locale 并使用优化的缓存机制。                        | -                                                                                                                       |
| `useLoadDynamic`       | 使用 React Suspense 加载动态字典的 Hook。接受一个 key 和 promise，并缓存结果。                               | -                                                                                                                       |
| `useHTMLRenderer`      | 用于获取预配置的 HTML 渲染器函数的 Hook。                                                                    | -                                                                                                                       |
| `useMarkdownRenderer`  | 用于获取预配置的 Markdown 渲染器函数的 Hook。                                                                | -                                                                                                                       |

### 函数（服务端）

导入：

```tsx
import "next-intlayer/server";
```

| 函数                   | 描述                                                                                                                           | 相关文档                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `t`                    | Next.js App Router 的服务端版本翻译函数。为服务器端 locale 返回多语言内容的翻译。                                              | [翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getLocale`            | 用于从 Next.js 的 headers 和 cookies 提取当前 locale 的辅助函数。为 Server Components、Server Actions 或 Route Handlers 设计。 | -                                                                                               |
| `generateStaticParams` | 根据已配置的 locales 为 Next.js 的动态路由生成静态参数。返回用于预渲染的 locale 对象数组。                                     | -                                                                                               |
| `locale`               | 用于在服务端上下文（App Router）中获取或设置 locale 的函数。在 Server Components 中提供 locale 管理。                          | -                                                                                               |

### 类型

导入：

```tsx
import "next-intlayer";
```

| 类型                   | 描述                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | 适用于带有 Intlayer 支持的 Next.js 页面 的类型。泛型类型（Generic），包含 `locale` 参数。             |
| `Next14PageIntlayer`   | 适用于带有 Intlayer 支持的 Next.js 14 页面 的类型。                                                   |
| `Next15PageIntlayer`   | 适用于带有 Intlayer 支持的 Next.js 15 页面 的类型。                                                   |
| `NextLayoutIntlayer`   | 适用于带有 Intlayer 支持的 Next.js 布局 的类型。泛型类型（Generic），包含 `locale` 参数。             |
| `Next14LayoutIntlayer` | 用于带有 Intlayer 支持的 Next.js 14 布局的类型。                                                      |
| `Next15LayoutIntlayer` | 用于带有 Intlayer 支持的 Next.js 15 布局的类型。                                                      |
| `LocalParams`          | 用于带有 `locale` 的 Next.js 路由参数的类型。一个带有 `locale` 属性的对象。                           |
| `LocalPromiseParams`   | 用于带有 `locale` 的 Next.js 路由参数的类型（异步版本）。返回解析为带有 `locale` 属性对象的 Promise。 |
