---
createdAt: 2025-06-07
updatedAt: 2025-07-10
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
---

# Intlayer MCP 服务器

**Intlayer MCP（模型上下文协议）服务器** 提供针对 Intlayer 生态系统定制的 AI 驱动 IDE 辅助。

## 可以在哪里使用？

- 在现代开发环境中，如 **Cursor**、**VS Code** 以及任何支持 MCP 协议的 IDE。
- 在您喜欢的 AI 助手中，如 **Claude Desktop**、**Gemini**、**ChatGPT** 等。

## 为什么使用 Intlayer MCP 服务器？

通过在您的 IDE 中启用 Intlayer MCP 服务器，您将获得：

- **上下文感知文档**
  MCP 服务器加载并公开 Intlayer 的文档，以加快您的设置、迁移等过程。
  这确保代码建议、命令选项和说明始终是最新且相关的。

- **智能 CLI 集成**
  直接从您的 IDE 界面访问并运行 Intlayer CLI 命令。使用 MCP 服务器，您可以让 AI 助手运行诸如 `intlayer dictionaries build` 来更新词典，或 `intlayer dictionaries fill` 来填充缺失的翻译。

  > 在[Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)中查看完整的命令和选项列表。

---

## 在 Cursor 中的设置

请按照[官方文档](https://docs.cursor.com/context/mcp)配置 Cursor 中的 MCP 服务器。

在你的项目根目录下，添加以下 `.cursor/mcp.json` 配置文件：

### 本地服务器（stdio）（推荐）

```json filename=".cursor/mcp.json"
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

要连接到使用服务器发送事件（SSE）的远程 Intlayer MCP 服务器，可以配置你的 MCP 客户端连接到托管服务。

> **注意：** 远程服务器不集成 CLI 工具。远程服务器仅用于文档和上下文。

> **注意：** 由于服务器托管成本，远程服务器的可用性无法保证。我们建议使用本地服务器（stdio）传输方式，以获得最可靠的体验。

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

这告诉您的 IDE 使用 `npx` 启动 Intlayer MCP 服务器，确保它始终使用最新可用版本，除非您进行了版本固定。

---

## 在 VS Code 中的设置

请参阅[官方文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)以配置 VS Code 中的 MCP 服务器。

要在 VS Code 中使用 Intlayer MCP 服务器，您需要在工作区或用户设置中进行配置。

### 本地服务器（stdio）（推荐）

在项目根目录下创建一个 `.vscode/mcp.json` 文件：

```json filename=".vscode/mcp.json"
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

要连接到使用服务器发送事件（SSE）的远程 Intlayer MCP 服务器，您可以配置您的 MCP 客户端以连接到托管服务。

> **注意：** 远程服务器不集成 CLI 工具。远程服务器仅用于文档和上下文。

> **注意：** 由于服务器托管成本，远程服务器的可用性无法保证。我们建议使用本地服务器（stdio）传输方式以获得最可靠的体验。

```json filename=".vscode/mcp.json"
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

按照[官方文档](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server)配置 ChatGPT 中的 MCP 服务器。

1 - 访问 [promt 仪表板](https://platform.openai.com/prompts)  
2 - 点击“+ 创建”  
3 - 点击“工具（创建或 +）”  
4 - 选择“MCP 服务器”  
5 - 点击“添加新服务器”  
6 - 填写以下字段：

- URL: https://mcp.intlayer.org
- 标签: Intlayer MCP 服务器
- 名称: intlayer-mcp-server
- 认证: 无

7 - 点击“保存”

> **注意：** 远程服务器不集成 CLI 工具。远程服务器仅用于文档和上下文。

> **注意：** 由于服务器托管成本，远程服务器的可用性无法保证。我们建议使用本地服务器（stdio）传输方式以获得最可靠的体验。

---

## 在 Claude Desktop 中设置

请按照[官方文档](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server)配置 Claude Desktop 中的 MCP 服务器。

配置文件路径：

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### 本地服务器（stdio）（推荐）

```json filename="claude_desktop_config.json"
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

## 通过 CLI 使用 MCP 服务器

您也可以直接从命令行运行 Intlayer MCP 服务器，用于测试、调试或与其他工具集成。

```bash
# 全局安装
npm install -g @intlayer/mcp

# 或直接使用 npx（推荐）
npx @intlayer/mcp
```

---

## 文档历史

| 版本   | 日期       | 变更内容                      |
| ------ | ---------- | ----------------------------- |
| 5.5.12 | 2025-07-11 | 添加 ChatGPT 的设置           |
| 5.5.12 | 2025-07-10 | 添加 Claude Desktop 的设置    |
| 5.5.12 | 2025-07-10 | 添加 SSE 传输和远程服务器支持 |
| 5.5.10 | 2025-06-29 | 初始化历史记录                |
