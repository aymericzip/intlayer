---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider 组件文档 | react-intlayer
description: 查看如何在 react-intlayer 包中使用 IntlayerProvider 组件
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: 初始化文档
---

# IntlayerProvider 组件文档

`IntlayerProvider` 组件是 React 应用中 Intlayer 的主要 provider。它为其所有子组件提供 Intlayer 上下文。

## 用法

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## 属性

| 属性              | 类型                              | 说明                            |
| ----------------- | --------------------------------- | ------------------------------- |
| `locale`          | `LocalesValues`                   | 要使用的初始 locale。           |
| `defaultLocale`   | `LocalesValues`                   | 作为回退使用的默认 locale。     |
| `setLocale`       | `(locale: LocalesValues) => void` | 用于设置 locale 的自定义函数。  |
| `disableEditor`   | `boolean`                         | 是否禁用编辑器。                |
| `isCookieEnabled` | `boolean`                         | 是否启用 cookie 来存储 locale。 |
