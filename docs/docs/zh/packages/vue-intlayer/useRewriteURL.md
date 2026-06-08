---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Composable 文档
description: 适用于 Intlayer 的 Vue 专用 composable，用于管理本地化 URL 重写。
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL 可组合函数

`useRewriteURL` 这个用于 Vue 3 的 composable 旨在在客户端处理本地化 URL 重写。它会根据用户当前的 locale 和 `intlayer.config.ts` 中的配置，自动将浏览器的 URL 更正为更“漂亮”的本地化版本。

它通过使用 `window.history.replaceState` 来工作，从而避免触发不必要的 Vue Router 导航。

## 用法

在你的 `setup()` 函数或 `<script setup>` 中调用该 composable。

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// 自动在地址栏将 /fr/tests 更正为 /fr/essais（如果存在重写规则）
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## 工作原理

1. **响应式监控**：该 composable 在用户的 `locale` 上设置了一个 `watch`。
2. **重写匹配**：每当 locale 改变（或在挂载时），它会检查当前的 `window.location.pathname` 是否匹配某个具有更漂亮本地化别名的规范路由。
3. **URL 更正**：如果找到更漂亮的别名，该 composable 会调用 `window.history.replaceState` 来更新地址栏，而不会重新加载页面或丢失路由状态。

## 为什么使用它？

- **SEO 优化**：确保搜索引擎索引你 URL 的权威本地化版本。
- **改进的 UX**：修正手动输入的 URL 以反映您偏好的命名（例如，使用 `/fr/a-propos` 而不是 `/fr/about`）。
- **低开销**：静默更新 URL，不会重新触发组件生命周期或导航守卫。

---
