---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: MCP服务器文档
description: 探索MCP服务器的功能和设置，以优化您的服务器管理和操作。
keywords:
  - MCP服务器
  - 服务器管理
  - 优化
  - Intlayer
  - 文档
  - 设置
  - 功能
---

# Intlayer MCP 服务器文档

**Intlayer MCP (Model Context Protocol) 服务器** 提供基于 AI 的 IDE 辅助功能，专为 Intlayer 生态系统设计。适用于现代开发者环境，如 **Cursor**、**GitHub Copilot 工作区**，以及任何支持 MCP 协议的 IDE，此服务器根据您的项目设置提供上下文相关的实时支持。

## 为什么使用 Intlayer MCP 服务器？

在您的 IDE 中启用 Intlayer MCP 服务器后，您将获得以下功能：

- **智能 CLI 集成**
  直接从 IDE 界面访问并运行 Intlayer CLI 命令。查看完整的命令和选项列表，请参阅 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

- **上下文感知文档**
  MCP 服务器加载并显示与您项目中使用的 Intlayer 版本对应的文档。这确保了代码建议、命令选项和解释始终是最新且相关的。

- **AI 辅助开发**
  提供项目感知的建议和自动完成功能，AI 助手可以解释您的代码、推荐 CLI 用法，或根据当前文件建议如何使用 Intlayer 的特定功能。

- **轻量级 & 即时设置**
  无需服务器维护或繁重安装。只需配置您的 `.cursor/mcp.json` 或等效的 MCP 配置，即可开始使用。

---

## 设置 Cursor

在您的项目根目录中，添加以下 `.cursor/mcp.json` 配置文件：

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

这将告诉您的 IDE 使用 `npx` 启动 Intlayer MCP 服务器，确保始终使用最新可用版本，除非您固定了版本。

---

## 设置 VS Code

要在 VS Code 中使用 Intlayer MCP 服务器，您需要在工作区或用户设置中进行配置。

### 工作区配置

在您的项目根目录中创建 `.vscode/mcp.json` 文件：

```json
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

### 在 VS Code 中使用 MCP 服务器

1. **启用代理模式**：打开聊天视图（Mac 上为 ⌃⌘I，Windows/Linux 上为 Ctrl+Alt+I），并从下拉菜单中选择 **Agent** 模式。

2. **访问工具**：点击 **Tools** 按钮查看可用的 Intlayer 工具。您可以根据需要选择/取消选择特定工具。

3. **直接引用工具**：在提示中通过输入 `#` 后跟工具名称直接引用工具。

4. **工具确认**：默认情况下，VS Code 在运行工具前会请求确认。使用 **Continue** 按钮选项可自动确认当前会话、工作区或所有未来调用的工具。

### 管理服务器

- 从命令面板运行 **MCP: List Servers** 查看已配置的服务器
- 根据需要启动、停止或重启 Intlayer MCP 服务器
- 选择服务器并选择 **Show Output** 查看服务器日志以进行故障排除

有关 VS Code MCP 集成的更多详细信息，请参阅 [官方 VS Code MCP 文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)。

---

## 通过 CLI 使用 MCP 服务器

您还可以直接从命令行运行 Intlayer MCP 服务器，用于测试、调试或与其他工具集成。

### 安装 MCP 服务器

首先，全局安装 MCP 服务器包或通过 npx 使用它：

```bash
# 全局安装
npm install -g @intlayer/mcp

# 或直接使用 npx（推荐）
npx @intlayer/mcp
```

### 启动服务器

使用调试和测试的检查器启动 MCP 服务器：

```bash
# 使用内置启动命令
npm run start

# 或直接使用 npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

这将启动带有检查器界面的 MCP 服务器，允许您：

- 测试 MCP 协议通信
- 调试服务器响应
- 验证工具和资源实现
- 监控服务器性能

### 开发用途

为了开发和测试目的，您可以以多种模式运行服务器：

```bash
# 构建并以开发模式启动
npm run dev

# 使用自定义配置运行
node dist/cjs/index.cjs

# 测试服务器功能
npm test
```

服务器将暴露 Intlayer 特定的工具和资源，这些工具和资源可以被任何兼容 MCP 的客户端使用，而不仅限于 Cursor 或其他 IDE。

---

## 功能概览

| 功能       | 描述                                             |
| ---------- | ------------------------------------------------ |
| CLI 支持   | 运行 `intlayer` 命令，获取使用提示和参数内联     |
| 版本化文档 | 自动检测并加载与您当前版本的 Intlayer 匹配的文档 |
| 自动完成   | 智能命令和配置建议                               |
| 插件支持   | 与支持 MCP 标准的 IDE 和工具兼容                 |

---

## 有用链接

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
- [Intlayer GitHub 仓库](https://github.com/aymericzip/intlayer)

---
