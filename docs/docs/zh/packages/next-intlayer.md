---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer 包文档
description: 用于 Intlayer 的 Next.js 专用集成，提供适用于 App Router 和 Page Router 的中间件和提供器。
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
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# next-intlayer 包

`next-intlayer` 包提供将 Intlayer 集成到 Next.js 应用所需的工具。它同时支持 App Router 和 Page Router，并包含用于基于 locale 的路由的中间件。

## 安装

```bash
npm install next-intlayer
```

## 导出

### 中间件

| 函数                 | 描述                                             |
| -------------------- | ------------------------------------------------ |
| `intlayerMiddleware` | Next.js 中间件，用于处理基于语言的路由和重定向。 |

### 提供者

| 组件                     | 描述                                                 |
| ------------------------ | ---------------------------------------------------- |
| `IntlayerClientProvider` | 用于 Next.js 客户端组件的 Provider。                 |
| `IntlayerServerProvider` | 用于 Next.js 服务器端组件（App Router）的 Provider。 |

### Hooks（客户端）

从 `react-intlayer` 重新导出大多数 hooks。

| Hook            | 描述                                     |
| --------------- | ---------------------------------------- |
| `useIntlayer`   | 通过键选择一个词典并返回其内容。         |
| `useDictionary` | 通过键选择一个词典并返回其内容。         |
| `useLocale`     | 返回当前的 locale 以及用于设置它的函数。 |
| `useI18n`       | 返回当前 Intlayer 上下文的值。           |

### 函数（服务器端）

| Function               | 描述                                           |
| ---------------------- | ---------------------------------------------- |
| `t`                    | 用于 Next.js App Router 的服务端翻译函数版本。 |
| `generateStaticParams` | 为 Next.js 的动态路由生成静态参数。            |

### 类型

| Type                 | Description                         |
| -------------------- | ----------------------------------- |
| `NextPageIntlayer`   | 支持 Intlayer 的 Next.js 页面类型。 |
| `NextLayoutIntlayer` | 支持 Intlayer 的 Next.js 布局类型。 |
