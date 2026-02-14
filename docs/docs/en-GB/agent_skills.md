---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Agent Skills
description: Learn how to use Intlayer Agent Skills to improve your AI agent's understanding of your project, including comprehensive setup guides for Metadata, Sitemaps, and Server Actions.
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

The `intlayer init skills` command is the simplest way to set up agent skills in your project. It detects your environment and installs the necessary configuration files for your preferred platforms.

```bash
npx intlayer init skills
```

When you run this command, it will:

1.  Detect the framework you are using (e.g., Next.js, React, Vite).
2.  Ask which platforms you want to install skills for (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, etc.).
3.  Generate the required configuration files (e.g., `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/intlayer_next_js/SKILL.md`, `.opencode/skills/next_js/SKILL.md`, `.vscode/mcp.json`, etc.).

## Supported Platforms

Intlayer provides framework-specific documentation (Setup, Usage, Metadata, Sitemap, Server Actions, etc.) to help the AI agent understand how to work with Intlayer in your specific project. These skills are designed to guide the agent through the complexities of internationalisation, ensuring it follows the correct patterns and best practices.

Intlayer supports integration with the following platforms:

### 1. Cursor

Cursor supports MCP (Model Context Protocol) servers and custom skills. Running `intlayer init skills` will:

- Create a `.cursor/mcp.json` file to communicate with the Intlayer MCP server.
- Install framework-specific skills in the `.cursor/skills` directory.

### 2. Windsurf

Windsurf is an AI-powered IDE. Running `intlayer init skills` will install framework-specific skills in the `.windsurf/skills` directory.

### 3. VS Code

For VS Code users, especially those using GitHub Copilot or other MCP-compatible extensions, the command:

- Creates a `.vscode/mcp.json` configuration.
- Installs framework-specific skills in the `skills/` directory at the root of your project.

### 4. OpenCode

OpenCode is an interactive CLI agent designed for software engineering tasks. Intlayer provides specific skills to help OpenCode assist you with internationalisation tasks. These are installed in the `.opencode/skills` directory.

### 5. Claude Code

Claude Code can be configured to use Intlayer skills. The command installs framework-specific skills in the `.claude/skills` directory.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace allows you to define custom skills. The command installs framework-specific skills in the `.github/skills` directory.
