---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: 代理技能
description: 了解如何使用 Intlayer 代理技能来提高 AI 代理对项目的理解，包括元数据 (Metadata)、站点地图 (Sitemaps) 和服务器操作 (Server Actions) 的全面设置指南。
keywords:
  - Intlayer
  - 代理技能
  - AI 代理
  - 国际化
  - 文档
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "初始化历史"
---

# 代理技能

## 设置

### 使用 CLI

`intlayer init skills` 命令是在项目中设置代理技能的最简单方法。它会检测您的环境并为您喜欢的平台安装必要的配置文件。

```bash
npx intlayer init skills
```

### 使用 Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

### 使用 VS Code 扩展

1. 打开命令面板 (Ctrl+Shift+P 或 Cmd+Shift+P)。
2. 输入 `Intlayer: Setup AI Agent Skills`
3. 选择您使用的平台（例如 `VS Code`、`Cursor`、`Windsurf`、`OpenCode`、`Claude Code`、`GitHub Copilot Workspace` 等）。
4. 选择您要安装的技能（例如 `Next.js`、`React`、`Vite`、`Compiler`、`Configuration`）。
5. 按 Enter 键。

## 技能列表

**intlayer-config**

- 使代理能够理解您项目的特定 i18n 设置，从而能够准确配置语言环境、路由模式和备选策略。

**intlayer-cli**

- 使代理能够自主管理您的翻译生命周期，包括通过命令行审核缺失的翻译、构建字典和同步内容。

**intlayer-angular**

- 为代理提供特定于框架的专业知识，以便根据 Angular 最佳实践正确实施响应式 i18n 模式和信号。

**intlayer-astro**

- 为代理提供处理 Astro 生态系统特有的服务器端翻译和本地化路由模式的知识。

**intlayer-content**

- 教代理如何利用高级内容节点（例如复数、条件和 markdown）来构建丰富、动态和本地化的字典。

**intlayer-next-js**

- 使代理深入了解如何在 Next.js 服务器和客户端组件中实施 i18n，确保 SEO 优化和无缝的本地化路由。

**intlayer-react**

- 为代理提供专业知识，以便在任何基于 React 的环境中高效实施声明式 i18n 组件和 hook。

**intlayer-preact**

- 优化代理为 Preact 实施 i18n 的能力，使其能够使用信号和高效的响应式模式编写轻量级的本地化组件。

**intlayer-solid**

- 使代理能够利用 SolidJS 的细粒度响应能力进行高性能的本地化内容管理。

**intlayer-svelte**

- 教代理在 Svelte 和 SvelteKit 应用程序中使用 Svelte store 和惯用语法处理响应式且类型安全的本地化内容。

**intlayer-cms**

- 允许代理集成和管理远程内容，使其能够通过 Intlayer CMS 处理实时同步和远程翻译工作流程。

**intlayer-usage**

- 标准化代理对项目结构和内容声明的方法，确保其遵循 i18n 项目最有效的流程。

**intlayer-vue**

- 为代理提供特定的 Vue 模式（包括 Composable 和 Nuxt 支持），以构建现代的本地化 Web 应用程序。

**intlayer-compiler**

- 通过启用自动内容提取来简化代理的工作流程，使其能够直接在代码中编写可翻译字符串，而无需手动字典文件。
