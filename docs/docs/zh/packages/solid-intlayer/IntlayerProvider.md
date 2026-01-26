---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider 组件文档 | solid-intlayer
description: 查看如何使用 solid-intlayer 包的 IntlayerProvider 组件
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# IntlayerProvider 组件文档

The `IntlayerProvider` is the root component that provides the internationalization context to your Solid application. It manages the current locale state and ensures that all child components can access translations.

## 用法

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## 描述

`IntlayerProvider` 扮演以下角色：

1. **状态管理**: 它使用 signals 初始化并存储当前的 locale，以实现响应性。
2. **Locale 解析**: 它根据 cookies、浏览器偏好或默认配置确定初始的 locale。
3. **上下文注入**: 它通过像 `useIntlayer` 或 `useLocale` 这样的 hooks 将 locale 和 `setLocale` 函数提供给任何组件。
4. **持久化**: 它会自动将 locale 更改与 cookies 或 localStorage 同步，以在会话间保持用户偏好。

## 属性

- **locale** (可选): 手动设置当前的 locale。
- **defaultLocale** (可选): 覆盖配置中的默认语言。
- **setLocale** (可选): 提供自定义的语言设置函数。
- **disableEditor** (可选): 禁用可视化编辑器集成。
- **isCookieEnabled** (可选): 启用或禁用 cookie 持久化。
