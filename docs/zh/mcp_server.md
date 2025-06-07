# Intlayer MCP 服务器文档

**Intlayer MCP (模型上下文协议) 服务器** 提供针对 [Intlayer](https://github.com/aymericzip/intlayer) 生态系统的 AI 驱动 IDE 辅助功能。专为现代开发者环境设计，如 **Cursor**、**GitHub Copilot 工作区**以及任何支持 MCP 协议的 IDE，此服务器根据您的项目设置提供上下文相关的实时支持。

## 为什么使用 Intlayer MCP 服务器？

通过在您的 IDE 中启用 Intlayer MCP 服务器，您可以解锁以下功能：

- **智能 CLI 集成**  
  直接从 IDE 界面访问并运行 Intlayer CLI 命令。在 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 中查看完整的命令和选项列表。

- **上下文相关的文档**  
  MCP 服务器加载并公开与您项目中使用的 Intlayer 版本相对应的文档。这确保了代码建议、命令选项和解释始终是最新且相关的。

- **AI 辅助开发**  
  通过项目感知的建议和自动补全，AI 助手可以解释您的代码，推荐 CLI 用法，或根据您当前的文件建议如何使用 Intlayer 的特定功能。

- **轻量级 & 即时设置**  
  无需服务器维护或繁重的安装。只需配置您的 `.cursor/mcp.json` 或等效的 MCP 配置，即可开始使用。

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

这会告诉您的 IDE 使用 `npx` 启动 Intlayer MCP 服务器，确保它始终使用最新的可用版本，除非您固定了版本。

---

## 🛠 功能概览

| 功能          | 描述                                           |
| ------------- | ---------------------------------------------- |
| 🧠 CLI 支持   | 运行 `intlayer` 命令，获取使用提示和参数内联   |
| 📘 版本化文档 | 自动检测并加载与您当前 Intlayer 版本匹配的文档 |
| 🛎 自动补全   | 智能命令和配置建议，实时输入时提供             |
| 🧩 插件支持   | 兼容支持 MCP 标准的 IDE 和工具                 |

---

## 📎 有用链接

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)
- [Intlayer GitHub 仓库](https://github.com/aymericzip/intlayer)

---
