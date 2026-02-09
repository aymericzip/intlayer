---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: 代理技能
description: 了解如何使用 Intlayer 代理技能来提高 AI 代理对项目的理解。
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
2.  询问您要为哪些平台安装技能（Cursor、VS Code、OpenCode、Claude Code 等）。
3.  生成所需的配置文件（例如 `.cursor/mcp.json`、`.vscode/mcp.json` 或 `.intlayer/skills/*.md`）。

## 支持的平台

Intlayer 支持与以下平台集成：

### 1. Cursor

Cursor 支持 MCP (Model Context Protocol) 服务器。运行 `intlayer init skills` 将创建一个 `.cursor/mcp.json` 文件，允许 Cursor 与 Intlayer MCP 服务器通信。

### 2. VS Code

对于 VS Code 用户，尤其是那些使用 GitHub Copilot 或其他兼容 MCP 的扩展的用户，该命令会创建一个 `.vscode/mcp.json` 配置。

### 3. OpenCode

OpenCode 是一个专为软件工程任务设计的交互式 CLI 代理。Intlayer 提供特定的技能来帮助 OpenCode 协助您完成国际化任务。

### 4. Claude Code

可以通过将生成的配置添加到其桌面或 CLI 设置中，将 Claude Code 配置为使用 Intlayer 技能。
