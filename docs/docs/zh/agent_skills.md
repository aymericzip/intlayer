---
createdAt: 2026-02-09
updatedAt: 2026-02-12
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
    changes: 初始化历史
---

# 代理技能

## `intlayer init skills` 命令

`intlayer init skills` 命令是在项目中设置代理技能的最简单方法。它会检测您的环境并为您喜欢的平台安装必要的配置文件。

```bash
npx intlayer init skills
```

或使用 Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

运行此命令时，它将：

1.  检测您正在使用的框架（例如 Next.js、React、Vite）。
2.  询问您要为哪些平台安装技能（Cursor、Windsurf、VS Code、OpenCode、Claude Code、GitHub Copilot Workspace 等）。
3.  生成所需的配置文件（例如 `.cursor/skills/intlayer-next-js/SKILL.md`、`.windsurf/skills/intlayer-next-js/SKILL.md`、`.opencode/skills/intlayer-next-js/SKILL.md`、`.vscode/mcp.json` 等）。

## 支持的平台

Intlayer 提供特定于框架的文档（设置、用法、元数据、站点地图、服务器操作等），以帮助 AI 代理了解如何在您的特定项目中与 Intlayer 配合使用。这些技能旨在引导代理完成国际化的复杂过程，确保其遵循正确的模式和最佳实践。
