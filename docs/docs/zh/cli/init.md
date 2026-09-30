---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init：在项目中配置 Intlayer"
description: "运行 intlayer init 为现有项目添加 Intlayer：自动检测框架、安装依赖并写入配置文件。"
keywords:
  - 初始化
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init 仅安装依赖包并配置框架；为每个步骤新增专用子命令；没有终端时 --interactive 会失败"
  - version: 9.5.6
    date: 2026-09-21
    changes: "添加 init infra 子命令"
  - version: 8.6.4
    date: 2026-03-31
    changes: "添加 --no-gitignore 选项"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令内容"
author: aymericzip
---

# 初始化 Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

`init` 命令会安装 Intlayer 依赖包并配置你的框架（配置文件、TypeScript、打包工具插件、中间件/代理、Provider）。这是开始使用 Intlayer 的推荐方式。

其他内容（CI 工作流、AI 技能、MCP 服务器、编辑器工具、lint 规则、CMS、基础设施）均为可选：在 `--interactive` 清单中勾选，或运行对应的专用子命令（见下文）。

## 别名：

- `npx intlayer init`

## 参数：

- `--project-root [projectRoot]` - 可选。指定项目的根目录。如果未提供，命令将从当前工作目录开始搜索项目根目录。
- `--no-gitignore` - 可选。跳过自动更新 `.gitignore` 文件。如果设置了此标志，`.intlayer` 将不会添加到 `.gitignore` 中。
- `--no-framework-setup` - 可选。只安装依赖包，不修改项目文件。
- `--routing <routing>` - 可选。语言路由：`prefix-no-default`（默认）、`prefix-all`、`no-prefix`、`search-params` 或 `none`。
- `-i, --interactive` - 可选。从清单（依赖包、CI、技能、MCP、VS Code、LSP、lint、CMS、基础设施等）中选择配置步骤，而不是运行默认集合。需要终端：没有终端时（AI 代理、CI），命令会失败并列出应改为运行的子命令。
- `--no-github-actions` - 可选。与 `--interactive` 一起使用时，即使已勾选也不会生成 GitHub Actions 工作流。

## 工作原理：

`init` 命令执行以下设置任务：

1. **验证项目结构** - 确保您位于包含 `package.json` 文件的有效项目目录中。
2. **安装依赖包** - 为你的技术栈安装缺失的 Intlayer 依赖包（如 `react-intlayer`、`vite-intlayer`），并升级过时的依赖包。
3. **更新 `.gitignore`** - 将 `.intlayer` 添加到您的 `.gitignore` 文件中，以将生成的文件排除在版本控制之外（可以使用 `--no-gitignore` 跳过）。
4. **配置 TypeScript** - 更新任何 `tsconfig.json` 文件以包含 Intlayer 类型定义 (`.intlayer/**/*.ts`)。
5. **创建配置文件** - 使用默认设置生成 `intlayer.config.ts`（对于 TypeScript 项目）或 `intlayer.config.mjs`（对于 JavaScript 项目）。
6. **更新打包工具 / 框架配置** - 将 Intlayer 插件添加到 Vite、Next.js、Nuxt、Astro 等配置中，并在框架支持时生成中间件/代理和 Provider。

## 逐步配置

`--interactive` 清单中的每个步骤都有自己的子命令。以参数形式传入取值时，它们不会提出任何问题，因此可以放心地在 AI 代理或 CI 任务中运行。

| 命令                                                                  | 配置内容                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `intlayer init packages`                                              | 安装缺失的 Intlayer 依赖包并升级过时的依赖包                              |
| `intlayer init project [--routing <routing>]`                         | 配置文件、TypeScript、打包工具插件、中间件/代理、Provider 和 `.gitignore` |
| `intlayer init github-actions`                                        | `fill` 和 `test` 两个 GitHub Actions 工作流                               |
| `intlayer init vscode-extension`                                      | 在 `.vscode/extensions.json` 中推荐 Intlayer 扩展                         |
| `intlayer init lsp`                                                   | `.vscode/settings.json` 中的 Intlayer 语言服务器                          |
| `intlayer init eslint`                                                | 项目已使用 lint 时的 Intlayer lint 规则（ESLint / oxlint）                |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | 作为 AI 代理技能的 Intlayer 文档                                          |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP 服务器                                                       |
| `intlayer init extension [--browser <chrome/firefox>]`                | 打开 Intlayer 浏览器扩展的商店页面                                        |
| `intlayer init cms`                                                   | 通过浏览器登录 Intlayer CMS，并将凭据保存到 `.env`                        |
| `intlayer init infra --mode <desktop/docker/compose>`                 | 桌面应用或自托管技术栈                                                    |

### 在 AI 代理或 CI 任务中使用

AI 代理的 shell 没有终端，因此无法回答问题。请先运行默认命令，再运行你需要的子命令：

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

没有终端时：

- 除非设置了 `--skills`，否则 `init skills` 会安装与你的技术栈匹配的技能（例如 `--skills Usage Content React`）。
- 除非设置了 `--platform`，否则 `init skills` 和 `init mcp` 会使用检测到的 AI 平台（Claude Code、Cursor、VS Code、Windsurf 等）；如果未检测到任何平台，则会失败并列出可用平台。
- 除非设置了 `--transport`，否则 `init mcp` 使用 `stdio` 传输方式。
- `init infra` 必须指定 `--mode`；除非设置了 `--browser`，否则 `init extension` 只会输出商店链接。

MCP 服务器始终配置在项目内部（Claude Code 使用 `.mcp.json`）。

## 示例：

### 基础初始化：

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

这将在当前目录中初始化 Intlayer，并自动检测项目根目录。

### 使用自定义项目根目录初始化：

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

这将在指定的目录中初始化 Intlayer。

### 初始化而不更新 .gitignore：

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

这将设置所有配置文件，但不会修改您的 `.gitignore`。

### 设置基础设施（桌面应用或自行托管）：

```bash
npx intlayer init infra
```

下载并运行在线安装程序（macOS / Linux 上为 `https://intlayer.org/install.sh`，Windows 上为 `install.ps1`），它会询问您希望如何运行 Intlayer：

- **桌面应用** - 在您的机器上安装原生控制面板，连接到 Intlayer Cloud。
- **多合一 Docker** - 在单个容器中包含控制面板 + API + MongoDB + Redis + MinIO。
- **Docker Compose** - 每个服务一个容器，用于可扩展的自行托管。

使用 `--mode` 跳过菜单：

```bash
npx intlayer init infra --mode compose
```

`npx intlayer init --interactive` 也提供了相同的步骤。有关安装程序设置，请参阅 [`init infra` 参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/infra.md)，有关各模式设置的内容，请参阅[自行托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

- [`init infra` 参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/infra.md)
- [自行托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)

## 输出示例：

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## 注意事项：

- 该命令是幂等的--您可以安全地多次运行它。已配置的步骤将被跳过。
- 如果配置文件已存在，则不会被覆盖。
- 不包含 `include` 数组的 TypeScript 配置（例如带有引用的 solution-style 配置）将被跳过。
- 如果在项目根目录中未找到 `package.json`，该命令将报错退出。
