---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook 文档
description: 针对 Next.js 的 Hook，用于在 Intlayer 中管理本地化 URL 重写。
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

针对 Next.js 的 `useRewriteURL` Hook 是一个客户端 Hook，可自动管理本地化的 URL 重写。它可确保浏览器地址栏始终反映在你的 `intlayer.config.ts` 中定义的“pretty”本地化路径，即使用户手动输入带有 locale 前缀的规范路径。

该 Hook 通过使用 `window.history.replaceState` 静默工作，避免了重复的 Next.js 路由导航或页面刷新。

## 使用

只需在属于布局的客户端组件中调用该 hook。

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // 自动将 /fr/privacy-notice 更正为地址栏中的 /fr/politique-de-confidentialite
  useRewriteURL();

  return null;
};
```

## 工作原理

1. **路径监控**：该 hook 监听用户的 `locale` 变更。
2. **重写检测**：它会将当前的 `window.location.pathname` 与配置中的重写规则进行比对。
3. **URL 校正**：如果为当前路径找到更“漂亮”的本地化别名，hook 会调用 `window.history.replaceState` 更新地址栏，同时保持用户停留在相同的内部页面。

## 为什么在 Next.js 中使用它？

当 `intlayerMiddleware` 处理服务器端重写和初始重定向时，`useRewriteURL` 钩子确保在客户端跳转之后浏览器地址栏仍与您偏好的 SEO 结构保持一致。

- **简洁的 URL**：强制使用本地化段，例如 `/fr/essais` 而不是 `/fr/tests`。
- **性能**：在不触发完整路由周期或重新获取数据的情况下更新地址栏。
- **SEO 对齐**：通过确保用户和搜索引擎机器人只看到一个 URL 版本，防止重复内容问题。
