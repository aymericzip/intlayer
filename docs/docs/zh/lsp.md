---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP 服务器
description: 了解 Intlayer 语言服务器如何为你的 IDE 和 AI 智能体带来转到定义、查找引用、悬停预览、键名自动补全与诊断能力。
keywords:
  - LSP
  - 语言服务器
  - Go to Definition
  - 自动补全
  - 诊断
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "新增查找引用、悬停、自动补全与诊断"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP 服务器

**Intlayer 语言服务器**是 [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) 的一个实现，它让你的 IDE —— 以及你的 AI 智能体 —— 理解 Intlayer。它把 `useIntlayer("home")` 这样的调用与声明它的 `.content.ts` 文件双向关联起来。

---

## 功能

| 功能             | 快捷键              | 说明                                                              |
| ---------------- | ------------------- | ----------------------------------------------------------------- |
| **转到定义**     | `F12` / `Cmd+点击`  | 从字典键或字段使用处跳转到内容文件中的声明                        |
| **查找所有引用** | `Shift+F12`         | 从内容文件出发，列出使用该键或字段的所有调用点                    |
| **悬停**         | 将光标悬停其上      | 无需离开当前文件即可预览字典的字段，或某个字段的翻译值            |
| **自动补全**     | `"` `'` `` ` `` `.` | 在 getter 内提示已声明的字典键，并在 `.` 之后或解构时提示内容字段 |
| **诊断**         | 自动                | 当某个键未在任何内容文件中声明时发出警告                          |

还有两个行为值得了解：

- **合并字典** —— 分散在多个内容文件中的键会按文件各返回一个结果，因此你可以跳转到每一处声明。
- **支持 monorepo** —— 服务器会解析距离每个文件_最近的_ `intlayer.config.*`，因此同一工作区中的多个项目各自拥有独立的字典。

### 支持的调用

键既可以从位置字符串参数读取，也可以从选项对象（`{ namespace }`、`{ id }`）读取。

| 库                          | 调用                                                     |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

它适用于所有 `*-intlayer` 包（`next-intlayer`、`react-intlayer`、`vue-intlayer`、`svelte-intlayer`、`solid-intlayer`、`preact-intlayer`、`angular-intlayer`、`lit-intlayer`、`express-intlayer`、`hono-intlayer`、`fastify-intlayer`、`intlayer`），也适用于让你保留现有 i18n 语法的 compat 适配包。

> 字典读取自构建产物，因此请运行 `npx intlayer build`，或保持开发服务器运行，好让服务器有内容可解析。

---

## 安装

服务器以 `@intlayer/lsp` 中的 `intlayer-lsp` 可执行文件形式发布：

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

如果你的编辑器需要在 `PATH` 中找到 `intlayer-lsp`，请改为全局安装（`npm install -g @intlayer/lsp`）—— Claude Code 插件以及下文中直接调用该可执行文件的配置都属于这种情况。

---

## 配置

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

安装 [Intlayer VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)。语言服务器自 v8.12.0 起已内置并会自动启动 —— **无需任何配置**。

其他功能请参阅 [VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) 和 [Windsurf](https://windsurf.com/) 是 VS Code 的分支，使用相同的扩展生态。安装一次 [Intlayer VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)，服务器便会自动启用 —— **无需任何配置**。

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer 提供了一个托管在 Intlayer 仓库中的 **Claude Code 插件**。它让 Claude Code 能真正解析字典键的符号，而不必退回到 `grep`。

先把可执行文件放入 `PATH`，然后注册 marketplace 并安装插件：

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` 同时会启用该插件。**请重启 Claude Code** —— 语言服务器在启动时加载，因此在重启前插件不会生效。

之后 Claude Code 会在 `.ts`、`.tsx`、`.js`、`.jsx`、`.vue`、`.astro` 和 `.svelte` 文件上启动该服务器，并在浏览代码时使用 `goToDefinition`、`findReferences` 和 `hover`。

如果转到定义仍然没有反应，你使用的 Claude Code 版本可能通过一个开关来控制 LSP 工具：

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed 原生支持 LSP。请将该服务器添加到用户设置中：

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

`"..."` 占位符可让 Zed 的默认语言服务器与 Intlayer 的服务器共存。

  </Tab>
  <Tab label="Neovim" value="neovim">

使用 [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) 注册一个自定义服务器配置：

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- 用 npx 启动服务器，这样就不需要全局安装
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

重启 Neovim 后，在字典键上按 `gd` 会执行转到定义，按 `gr` 会执行查找引用。

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="其他编辑器" value="other">

任何支持 LSP 的编辑器都可以运行 `@intlayer/lsp`。请将其指向：

- **可执行文件** —— `npx @intlayer/lsp`，或 `intlayer-lsp` 可执行文件
- **传输方式** —— stdio（标准）
- **能力** —— `definitionProvider`、`referencesProvider`、`hoverProvider`、`completionProvider`（触发字符 `"` `'` `` ` `` `.`）、推送式诊断、`textDocumentSync: Incremental`
- **根目录匹配模式** —— `intlayer.config.ts`、`intlayer.config.js`、`package.json`

确切的配置格式请查阅你所用编辑器的 LSP 文档。

  </Tab>
</Tabs>

---

## 关于终端 AI 智能体的说明

**Claude Code** 是一个真正的 LSP 客户端 —— 参见上面的标签页。

**OpenAI Codex** 及大多数其他终端工具并不是 LSP 客户端：它们直接读写文件。单独运行服务器对它们没有帮助；真正的价值在于服务器在一个配套编辑器中处于活跃状态，而智能体可以查询该编辑器的索引（Cursor Composer、Windsurf Cascade、Copilot Chat）。

---

## 工作原理

对每个文件，服务器会定位最近的 `intlayer.config.*`，加载该项目的配置以找到已编译的字典。配置、字典和源文件列表会以较短的 TTL 缓存，并在被监听的内容文件发生变化时失效。

收到请求时，服务器会（通过 [oxc](https://oxc.rs/)）解析文档并检查光标位置：

1. **位于键字符串上**（`useIntlayer("home")`）→ 返回声明该键的每个内容文件，并定位到其 `key:` 所在行。
2. **位于字段使用处**（`content.title`、解构出的属性、`t('path.to.field')`、`<Trans>` 等）→ 将变量回溯到其字典，并返回内容文件中对应的字段。
3. **从内容文件出发** → 执行反向查找，扫描项目源码以寻找该键或字段的调用点。

---

## 故障排查

| 现象                                    | 可能原因           | 解决办法                                               |
| --------------------------------------- | ------------------ | ------------------------------------------------------ |
| 完全没有反应                            | 服务器未运行       | 检查是否已安装 `@intlayer/lsp`，以及编辑器是否会启动它 |
| 在编辑器中可用，在 Claude Code 中不可用 | 会话中途安装了插件 | 重启 Claude Code —— 语言服务器在启动时加载             |
| 找不到某个键的定义                      | 字典尚未构建       | 运行 `npx intlayer build`，或启动开发服务器            |
| 所有键都被报告为未声明                  | 配置未解析         | 确认项目根目录存在 `intlayer.config.ts`（或 `.js`）    |
| 在 monorepo 中使用了错误的项目          | 缺少各自的包级配置 | 为每个声明自有内容的包添加 `intlayer.config.*`         |
| 服务器启动时崩溃                        | Node.js 版本过低   | 需要 Node.js ≥ 14.18                                   |

在 VS Code 中，服务器会将日志输出到 **查看 → 输出 → “Intlayer LSP”** —— 便于确认解析到的是哪份配置以及找到了多少字典。
