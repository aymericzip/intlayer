---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP 服务器
description: 了解 Intlayer 语言服务器如何为所有支持的编辑器中的 useIntlayer、getIntlayer 和相关调用提供“转到定义”和其他 IDE 功能。
keywords:
  - LSP
  - 语言服务器
  - 转到定义
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Intlayer LSP 服务器

**Intlayer 语言服务器**是一个 [语言服务器协议 (LSP)](https://microsoft.github.io/language-server-protocol/) 实现，可通过感知 Intlayer 的智能来增强您的 IDE。它当前为字典键调用提供**转到定义**（Go to Definition），使您能够直接从组件中的 `useIntlayer("my-key")` 跳转到声明它的 `.content.ts` 文件。

---

## 为什么使用 LSP？

当您使用 Intlayer 时，像 `useIntlayer("homepage")` 这样的调用与其在 `src/homepage.content.ts` 中的声明之间的连接是隐式的。如果没有工具，您必须手动搜索文件。LSP 使该链接显式化：

**AI 智能助手感知**

AI 编码助手（Cursor、Windsurf、GitHub Copilot、Claude Code、Codex）依赖语言服务器来解析符号并理解跨文件关系。运行 Intlayer LSP 后，助手可以追溯 `useIntlayer("key")` 到其声明，从而获得有关可用内容键、每个字典的形状以及要读取或编辑哪些文件的准确上下文。

**转到定义**

将光标放在支持的 getter 调用中的任何字典键字符串上，然后按 `F12`（或 `Cmd/Ctrl+单击`）。编辑器将打开内容声明文件，并将光标定位在 `key:` 行上。

**合并字典支持**

一个键可以分割在多个内容文件中（Intlayer 会合并它们）。服务器为每个源文件返回一个 `Location`，以便您可以导航到每个声明。

**随处运行**

支持所有 `*-intlayer` 包 (`next-intlayer`、`react-intlayer`、`vue-intlayer`、`svelte-intlayer`、`solid-intlayer`、`preact-intlayer`、`angular-intlayer`、`lit-intlayer`、`express-intlayer`、`hono-intlayer`、`fastify-intlayer`、`adonis-intlayer`、`intlayer`)。

### 支持的 getter 调用

服务器检测以下函数调用，并提取第一个字符串字面量参数作为字典键：

| 函数          | 示例                          |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript 泛型和额外参数将被忽略 —— 只有键字符串重要。

> `useDictionary` 和 `getDictionary` 接受一个已导入的 `Dictionary` 对象作为其第一个参数，而不是字符串键，因此它们无法享受“转到定义”的好处，且不受服务器跟踪。

---

## 安装

LSP 服务器作为 `@intlayer/lsp` 的一部分进行分发：

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

该包公开了 `intlayer-lsp` 二进制文件，编辑器将其用作服务器可执行文件。

---

## 设置为 Claude Code 插件

Intlayer LSP 可以作为直接托管在 Intlayer GitHub 仓库中的 **Claude Code 插件**使用。安装它可以让 Claude Code 对您所有的 `useIntlayer` / `getIntlayer` 调用具有原生的“转到定义”感知。

### 1. 安装语言服务器二进制文件

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

这会将 `intlayer-lsp` 二进制文件放入您的 PATH 中，这是插件的 `lspServers` 条目所调用的。

### 2. 注册 Intlayer 市场并安装插件

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code 将把 `"intlayer-lsp@intlayer": true` 添加到您的 `enabledPlugins` 中，并在支持的文件类型（`.ts`、`.tsx`、`.js`、`.jsx`、`.vue`、`.svelte`）上自动启动语言服务器。

### 3. 启用 LSP 工具（如果尚未激活）

某些 Claude Code 版本需要设置 LSP 功能标志。如果在安装后“转到定义”不起作用，请将以下内容添加到 `~/.claude/settings.json` 中：

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

重启 Claude Code —— 在导航 Intlayer 代码库时，它现在将使用 `goToDefinition`、`findReferences` 和其他 LSP 操作，而不是回退到 `grep`。

---

## 在 VS Code 中设置（通过扩展程序 —— 推荐）

如果安装了 [Intlayer VS Code 扩展程序](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)，语言服务器将自动启动。无需其他配置。 自 v8.12.0 版本起，LSP 已直接集成到 VSCode 扩展中。

> 有关安装和其他功能，请参阅 [VS Code 扩展程序文档](https://intlayer.org/doc/vs-code-extension)。

---

## 在 VS Code 中手动设置

如果您没有使用 Intlayer 扩展程序，可以使用通用的 LSP 客户端扩展程序（例如 [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)）或通过编写您自己的小型扩展程序来手动连接语言服务器。推荐的方法是使用 Intlayer 扩展程序。

作为参考，服务器通过 stdio 上的 `intlayer-lsp` 二进制文件启动：

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Intlayer 扩展程序读取这些设置以启动服务器。如果您仅依赖该扩展程序，则不需要手动设置。

---

## 在 Cursor 中设置

[Cursor](https://www.cursor.com/) 是一个具有内置 AI 功能的 VS Code 分支。它使用相同的扩展生态系统，因此 **Intlayer VS Code 扩展程序**无需任何额外配置即可工作 —— 安装一次，Cursor 就会自动加载它。

如果您更喜欢手动配置，Cursor 也会从工作区根目录读取 `.vscode/settings.json`，因此上面的 VS Code 代码片段直接适用。

---

## 在 Windsurf 中设置

[Windsurf](https://windsurf.com/)（由 Codeium 提供）是另一个基于 VS Code 的编辑器。从 VS Code 市场安装 Intlayer 扩展程序，语言服务器将自动激活，就像在 VS Code 和 Cursor 中一样。

对于手动配置，在项目根目录下创建 `.vscode/settings.json`：

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## 在 Zed 中设置

[Zed](https://zed.dev/) 通过其语言设置具有原生的 LSP 支持。在您的 Zed 用户设置中添加一个条目（`~/.config/zed/settings.json`）：

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

`"..."` 占位符告诉 Zed 将其默认的语言服务器与 Intlayer 的语言服务器一起保留。

---

## 设置 AI 智能助手命令行界面（Claude Code、Codex 等）

**Claude Code** 具有一流的 LSP 插件支持 —— 遵循上面的 [Claude Code 插件设置](#设置为-claude-code-插件)以直接在您的终端会话中获得完整的“转到定义”体验。

**OpenAI Codex** 和其他基于终端的工具尚不能充当 LSP 客户端 —— 它们直接读取和写入文件，而不是维护持久的语言服务器会话。对于这些工具，运行 LSP 的价值是间接带来的：当服务器在伴侣编辑器（VS Code、Cursor、Windsurf……）中激活时，编辑器的实时索引可供任何能够通过编辑器提供的上下文（例如，Cursor Composer、Windsurf Cascade、GitHub Copilot Chat）查询它的 AI 助手使用。

如果您完全在终端中工作且没有打开编辑器，则可以在后台启动语言服务器，以便它为以后连接到同一工作区的任何编辑器做好准备：

```bash
# 在后台保持服务器运行
npx @intlayer/lsp &
```

---

## 在 Neovim 中手动设置

使用 [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)，注册自定义服务器配置：

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- 使用 npx 启动服务器，因此您不需要全局安装
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

重启 Neovim 后，在 Intlayer 键上按 `gd` 将调用“转到定义”。

---

## 在其他编辑器中手动设置

任何支持语言服务器协议的编辑器都可以使用 `@intlayer/lsp`。服务器：

- **传输** – Node.js IPC / stdio (标准)
- **可执行文件** – `npx @intlayer/lsp` (或本地安装的 `intlayer-lsp` 二进制文件)
- **能力** – `definitionProvider: true`, `textDocumentSync: Incremental`

请参阅您的编辑器 LSP 文档以获取确切的配置格式（例如，[coc.nvim](https://github.com/neoclide/coc.nvim) 的 `languageserver.json`，或 [Helix](https://helix-editor.com) 中的 LSP 客户端设置）。

### 示例：coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### 示例：Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## 工作原理

当服务器启动时，它会使用 `getConfiguration()` 从工作区根目录解析 Intlayer 配置。这为它提供了查找已编译字典所需的 `build` 和 `system` 路径。

在每个**转到定义**请求上：

1. 服务器读取打开文档的全文。
2. 它使用正则表达式扫描获取器调用（`useIntlayer`、`getIntlayer` 等）。
3. 它检查光标位置是否落在这些调用之一的内部。
4. 如果是，它将提取字典键（正则表达式的捕获组 3），并调用 `getUnmergedDictionaries()` 来定位声明该键的每个内容文件。
5. 它读取每个匹配的文件，并找到包含 `key: "<key>"` 的确切行，以精确地定位光标。
6. 它返回一个 `Location` 对象数组 —— 每个源文件一个。

配置会被懒惰地解析并在每个会话中缓存；它在每个 `initialize` 请求（例如，当您打开一个新的工作区文件夹时）重置。

---

## 故障排除

| 症状                     | 可能的原因       | 解决方法                                                    |
| ------------------------ | ---------------- | ----------------------------------------------------------- |
| 转到定义不起作用         | 服务器未运行     | 检查是否已安装 `@intlayer/lsp` 且编辑器正在启动它           |
| 检测到错误的工作区根目录 | 多个工作区文件夹 | 确保包含 `intlayer.config.ts` 的文件夹是第一个工作区文件夹  |
| 找不到键的定义           | 配置未解析       | 验证工作区根目录下是否存在 `intlayer.config.ts`（或 `.js`） |
| 服务器在启动时崩溃       | Node.js 版本太旧 | 需要 Node.js ≥ 14.18                                        |
