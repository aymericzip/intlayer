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
  - version: 8.0.4
    date: 2026-02-09
    changes: 初始化历史
---

## `intlayer init skills` 命令

`intlayer init skills` 命令是在项目中设置代理技能的最简单方法。它会检测您的环境并为您喜欢的平台安装必要的配置文件。

```bash
npx intlayer init skills
```

运行此命令时，它将：

1.  检测您正在使用的框架（例如 Next.js、React、Vite）。
2.  询问您要为哪些平台安装技能（Cursor、Windsurf、VS Code、OpenCode、Claude Code、GitHub Copilot Workspace 等）。
3.  生成所需的配置文件（例如 `.cursor/skills/intlayer_next_js/SKILL.md`、`.windsurf/skills/intlayer_next_js/SKILL.md`、`.opencode/skills/next_js/SKILL.md`、`.vscode/mcp.json` 等）。

## 支持的平台

Intlayer 提供特定于框架的文档（设置、用法、元数据、站点地图、服务器操作等），以帮助 AI 代理了解如何在您的特定项目中与 Intlayer 配合使用。这些技能旨在引导代理完成国际化的复杂过程，确保其遵循正确的模式和最佳实践。

Intlayer 支持与以下平台集成：

### 1. Cursor

Cursor 支持 MCP (Model Context Protocol) 服务器和自定义技能。运行 `intlayer init skills` 将：

- 创建一个 `.cursor/mcp.json` 文件以与 Intlayer MCP 服务器通信。
- 在 `.cursor/skills` 目录中安装特定于框架的技能。

### 2. Windsurf

Windsurf 是一款 AI 驱动的 IDE。运行 `intlayer init skills` 将在 `.windsurf/skills` 目录中安装特定于框架的技能。

### 3. VS Code

对于 VS Code 用户，尤其是那些使用 GitHub Copilot 或其他兼容 MCP 的扩展的用户，该命令：

- 创建 `.vscode/mcp.json` 配置。
- 在项目根目录的 `skills/` 目录中安装特定于框架的技能。

### 4. OpenCode

OpenCode 是一个专为软件工程任务设计的交互式 CLI 代理。Intlayer 提供特定技能来帮助 OpenCode 协助您完成国际化任务。这些技能安装在 `.opencode/skills` 目录中。

### 5. Claude Code

Claude Code 可以配置为使用 Intlayer 技能。该命令在 `.claude/skills` 目录中安装特定于框架的技能。

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace 允许您定义自定义技能。该命令在 `.github/skills` 目录中安装特定于框架的技能。
