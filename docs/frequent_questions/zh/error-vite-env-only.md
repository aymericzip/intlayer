---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: "`vite-env-only` 与 Intlayer — 错误的 `node:fs` 导入被拒绝"
description: 为什么在 Intlayer + React-Router + Vite 的组合中，vite-env-only 报告 `node:fs` 导入被拒绝，以及应如何处理。
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - 导入被拒绝
  - alias
  - 客户端 bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only 在 Intlayer 中拒绝 `node:fs` 导入

如果你使用了 **vite-env-only** 插件（如旧版 React-Router v7 建议中所述），并且看到：

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…尽管**您的客户端包中没有 `node:fs`**，这仍然是一个**误报**。

## 根本原因

`vite-env-only` 在 Vite 的依赖图解析过程中**较早运行一个基于 Babel 的检查**，_在以下步骤之前_：

- 别名重定向（包括 Intlayer 的 browser 与 node 映射），
- 死代码消除，
- SSR 与客户端解析，
- 像 React-Router 的虚拟模块。

Intlayer 的包包含可以在 Node 与浏览器上运行的代码。在一个 _中间_ 阶段，像 `node:fs` 这样的 Node 内置模块可能会在依赖图中出现，**在** Vite 将其从客户端构建中移除之前。`vite-env-only` 会看到该情况并立即报错，即使最终的 bundle 并不包含它。

## React-Router 与服务端模块

在 React-Router 关于 **服务端模块约定** 的文档中
(https://reactrouter.com/api/framework-conventions/server-modules)，团队**明确建议使用 `vite-env-only`\*\*以防止仅用于服务器的导入泄漏到客户端包中。

然而，这些约定依赖于 Vite 的 aliasing、conditional exports 和 tree-shaking 来移除仅用于服务器的代码。尽管 aliasing 和 conditional exports 已经被应用，但在该阶段某些基于 Node 的实用工具仍然存在于像 `@intlayer/core` 这样的包中（即便它们从未在客户端被导入）。因为 tree-shaking 尚未运行，那些函数仍会被 Babel 解析，`vite-env-only` 检测到它们的 `node:` 导入并报出误报 —— 即便这些导入在最终的客户端包中已被正确清除。

## 如何修复 / 规避

### 建议：移除 `vite-env-only`

只需移除该插件。在许多情况下你不需要它 — Vite 已通过自身解析处理客户端与服务器导入的区分。

这能修复误报的 `node:fs` 错误，而无需对 Intlayer 进行任何修改。

### 改为验证最终构建

如果你仍想确保客户端中没有 Node 内置模块，可在**构建后**进行验证，例如：

```bash
pnpm build
grep -R "node:" dist/
```

如果没有结果，说明你的客户端打包产物是干净的。

## 总结

- `vite-env-only` 可能会在 `node:fs` 上报错，因为它检查得太早。
- Vite + Intlayer + React-Router 的 server modules 约定通常会正确移除仅用于服务器的引用。
- 移除该插件或验证 _最终输出_ 通常是最佳解决方案。
