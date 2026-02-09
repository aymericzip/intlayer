---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Agent Skills
description: Learn how to use Intlayer Agent Skills to improve your AI agent's understanding of your project.
keywords:
  - Intlayer
  - Agent Skills
  - AI Agent
  - Internationalization
  - Documentation
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: Init history
---

## The `intlayer init skills` Command

The `intlayer init skills` command is the easiest way to set up agent skills in your project. It detects your environment and installs the necessary configuration files for your preferred platforms.

```bash
npx intlayer init skills
```

When you run this command, it will:

1.  Detect the framework you are using (e.g., Next.js, React, Vite).
2.  Ask you which platforms you want to install skills for (Cursor, VS Code, OpenCode, Claude Code, etc.).
3.  Generate the required configuration files (such as `.cursor/mcp.json`, `.vscode/mcp.json`, or `.intlayer/skills/*.md`).

## Supported Platforms

Intlayer supports integration with the following platforms:

### 1. Cursor

Cursor supports MCP (Model Context Protocol) servers. Running `intlayer init skills` will create a `.cursor/mcp.json` file that allows Cursor to communicate with the Intlayer MCP server.

### 2. VS Code

For VS Code users, especially those using GitHub Copilot or other MCP-compatible extensions, the command creates a `.vscode/mcp.json` configuration.

### 3. OpenCode

OpenCode is an interactive CLI agent designed for software engineering tasks. Intlayer provides specific skills to help OpenCode assist you with internationalization tasks.

### 4. Claude Code

Claude Code can be configured to use Intlayer skills by adding the generated configurations to its desktop or CLI settings.
