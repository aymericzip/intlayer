---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 钩子文档
description: Intlayer 中用于管理本地化 URL 重写的 Svelte 专用钩子。
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL 钩子

针对 Svelte 的 `useRewriteURL` 钩子用于在客户端管理本地化 URL 的重写。它会根据当前 locale 和 `intlayer.config.ts` 中的配置，自动将浏览器的 URL 校正为更“漂亮”的本地化别名。

它通过 `window.history.replaceState` 静默更新 URL，从而避免触发完整的 SvelteKit 导航。

## 用法

在 Svelte 组件中调用该钩子。

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // 自动在地址栏将 /fr/tests 更正为 /fr/essais（如果存在重写规则）
  useRewriteURL();
</script>

<slot />
```

## 工作原理

1. **Reactive Updates**: 该 hook 订阅 Intlayer 的 `locale` store。
2. **Detection**: 每当 locale 变化（或组件挂载时），它会计算当前的 `window.location.pathname` 是否在你的重写规则中定义了更漂亮的本地化别名。
3. **URL Correction**: 如果找到更漂亮的路径，hook 会调用 `window.history.replaceState` 来更新地址栏，而不会进行完整的页面重载或触发 SvelteKit 的导航逻辑。

## 为什么使用它？

- **SEO 最佳实践**：确保搜索引擎仅索引漂亮的、本地化的 URL 版本。
- **改进的 UX**：将手动输入的 URL 修正为你首选的命名结构。
- **静默更新**：在不影响组件树或导航历史的情况下修改地址栏。
