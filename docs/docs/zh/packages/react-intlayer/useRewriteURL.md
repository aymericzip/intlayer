---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 钩子 文档
description: 用于在 Intlayer 中管理本地化 URL 重写的 React 专用钩子。
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL 钩子

`useRewriteURL` 钩子用于在客户端管理本地化的 URL 重写。它会根据用户的 locale 以及在 `intlayer.config.ts` 中定义的重写规则，自动检测当前 URL 是否应被纠正为更“美观”的本地化版本。

不同于标准的导航，这个钩子使用 `window.history.replaceState` 来更新地址栏中的 URL，而不会触发完整页面重载或路由器的导航周期。

## 用法

只需在客户端组件中调用此 Hook。

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // 如果存在重写规则，自动将地址栏中的 /fr/tests 更正为 /fr/essais
  useRewriteURL();

  return <div>My Component</div>;
};
```

## 工作原理

1. **检测**：该 Hook 监视当前的 `window.location.pathname` 以及用户的 `locale`。
2. **匹配**：它使用内部的 Intlayer 引擎来检查当前的 pathname 是否匹配一个规范路由，该路由在当前语言环境下有一个更好看的本地化别名。
3. **URL 校正**：如果找到更好的别名（且它与当前路径不同），该 Hook 会调用 `window.history.replaceState` 来更新浏览器的 URL，同时保留相同的规范内容和状态。

## 为什么使用它？

- **SEO**：确保用户始终访问到特定语言的唯一、权威的漂亮 URL。
- **一致性**：防止出现不一致的情况，例如用户可能手动输入规范路径（如 `/fr/privacy-notice`）而不是本地化版本（`/fr/politique-de-confidentialite`）。
- **性能**：在不触发不必要的路由副作用或组件重新挂载的情况下更新地址栏。
