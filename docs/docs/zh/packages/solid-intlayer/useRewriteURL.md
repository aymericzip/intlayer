---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 钩子 文档
description: 用于 Intlayer 的 Solid 专用钩子，用于管理本地化 URL 重写。
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL 钩子

用于 SolidJS 的 `useRewriteURL` 钩子用于在客户端管理本地化的 URL 重写。它会根据当前的 locale 和 `intlayer.config.ts` 中的配置，自动将浏览器的 URL 修正为更“漂亮”的本地化版本。

通过使用 `window.history.replaceState`，它避免了不必要的 Solid Router 导航。

## 用法

在你的应用组件中调用此钩子。

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // 如果存在重写规则，自动将地址栏中的 /fr/tests 更正为 /fr/essais
  useRewriteURL();

  return <>{props.children}</>;
};
```

## 工作原理

1. **检测**: 该 hook 使用 `createEffect` 来监视响应式 `locale()` 的更改。
2. **匹配**: 它会判断当前的 `window.location.pathname` 是否对应一个规范路由，而该路由在当前语言下有更美观的本地化别名。
3. **URL 校正**: 如果找到更美观的别名，hook 会调用 `window.history.replaceState` 来更新地址栏，而不会影响内部导航状态或导致组件重新渲染。

## 为什么使用它？

- **权威 URL**：为每个本地化版本强制使用单一 URL，这对 SEO 至关重要。
- **开发者便利性**：允许你保持内部路由定义为规范形式，同时向外部展示对用户友好且本地化的路径。
- **一致性**：当用户手动输入不符合首选本地化规则的路径时，纠正 URL。

---
