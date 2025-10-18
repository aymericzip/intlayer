---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: MCP 服务器文档
description: 探索 MCP 服务器的功能和设置，以优化您的服务器管理和操作。
keywords:
  - MCP 服务器
  - 服务器管理
  - 优化
  - Intlayer
  - 文档
  - 设置
  - 功能
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: 添加 ChatGPT 的设置
  - version: 5.5.12
    date: 2025-07-10
    changes: 添加 Claude Desktop 的设置
  - version: 5.5.12
    date: 2025-07-10
    changes: 添加 SSE 传输和远程服务器支持
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# Intlayer MCP 服务器

**Intlayer MCP（模型上下文协议）服务器** 提供针对 Intlayer 生态系统量身定制的 AI 驱动的 IDE 辅助。

## 我可以在哪里使用它？

- 在现代开发环境中，如 **Cursor**、**VS Code**，以及任何支持 MCP 协议的 IDE。
- 在您喜欢的 AI 助手上，如 **Claude Desktop**、**Gemini**、**ChatGPT** 等。

## 为什么使用 Intlayer MCP 服务器？

通过在您的 IDE 中启用 Intlayer MCP 服务器，您将解锁以下功能：

- **上下文感知文档**
  MCP 服务器加载并展示 Intlayer 的文档，以加快您的设置、迁移等过程。
  这确保代码建议、命令选项和说明始终是最新且相关的。

- **智能 CLI 集成**
  直接从您的 IDE 界面访问并运行 Intlayer CLI 命令。使用 MCP 服务器，您可以让您的 AI 助手运行诸如 `intlayer dictionaries build` 来更新词典，或 `intlayer dictionaries fill` 来填充缺失的翻译。

  > 查看完整的命令和选项列表，请参阅 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

## 本地服务器（stdio）与远程服务器（SSE）

MCP 服务器可以通过两种方式使用：

- 本地服务器（stdio）
- 远程服务器（SSE）

### 本地服务器（stdio）（推荐）

Intlayer 提供了一个可以在您的机器上本地安装的 NPM 包。它可以安装在您喜欢的 IDE 中，如 VS Code、Cursor，以及您的本地助手应用程序，如 ChatGPT、Claude Desktop 等。

这是使用 MCP 服务器的推荐方式，因为它集成了 MCP 服务器的所有功能，包括 CLI 工具。

### 远程服务器（SSE）

MCP 服务器也可以通过 SSE 传输方式远程使用。该服务器由 Intlayer 托管，地址为 https://mcp.intlayer.org。该服务器可公开访问，无需任何身份验证，且免费使用。

请注意，远程服务器不集成 CLI 工具、AI 自动补全等功能。远程服务器仅用于与文档交互，以帮助您的 AI 助手使用 Intlayer 生态系统。

> 由于服务器托管成本，远程服务器的可用性无法保证。我们限制同时连接的数量。我们建议使用本地服务器（stdio）传输方式，以获得最可靠的体验。

---

## 在 Cursor 中的设置

请按照[官方文档](https://docs.cursor.com/context/mcp)配置 Cursor 中的 MCP 服务器。

在您的项目根目录下，添加以下 `.cursor/mcp.json` 配置文件：

### 本地服务器（stdio）（推荐）

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### 远程服务器（SSE）

要通过服务器发送事件（SSE）连接到远程 Intlayer MCP 服务器，您可以配置 MCP 客户端以连接到托管服务。

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

这会告诉您的 IDE 使用 `npx` 启动 Intlayer MCP 服务器，确保它始终使用最新可用版本，除非您进行了版本固定。

---

## 在 VS Code 中设置

请参阅[官方文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)以配置 VS Code 中的 MCP 服务器。

要在 VS Code 中使用 Intlayer MCP 服务器，您需要在工作区或用户设置中进行配置。

### 本地服务器（stdio）（推荐）

在你的项目根目录下创建一个 `.vscode/mcp.json` 文件：

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### 远程服务器（SSE）

要连接到使用服务器发送事件（SSE）的远程 Intlayer MCP 服务器，你可以配置你的 MCP 客户端以连接到托管服务。

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## 在 ChatGPT 中设置

### 远程服务器（SSE）

请按照[官方文档](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server)配置 ChatGPT 中的 MCP 服务器。

1. 访问 [promt dashboard](https://platform.openai.com/prompts)
2. 点击 “+ Create”
3. 点击 “Tools (Create or +)”
4. 选择 “MCP Server”
5. 点击 “Add new”
6. 填写以下字段：

   - URL: https://mcp.intlayer.org
   - Label: Intlayer MCP 服务器
   - Name: intlayer-mcp-server
   - Authentication: 无

7. 点击 “Save”

---

## 在 Claude Desktop 中设置

按照[官方文档](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server)配置 Claude Desktop 中的 MCP 服务器。

配置文件路径：

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### 本地服务器（stdio）（推荐）

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## 通过命令行界面使用 MCP 服务器

您也可以直接从命令行运行 Intlayer MCP 服务器，用于测试、调试或与其他工具集成。

```bash
# 全局安装
npm install -g @intlayer/mcp

# 或直接使用 npx（推荐）
npx @intlayer/mcp
```

---
