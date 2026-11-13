---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI - 升级 Intlayer 软件包
description: 了解如何使用 Intlayer CLI upgrade 命令列出项目或 monorepo 中的每个 Intlayer 软件包，并将它们升级到最新版本。
keywords:
  - CLI
  - Upgrade
  - 升级
  - Packages
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "安装并注册 lint / Prettier 插件，更新 MCP 服务器条目"
  - version: 9.5.8
    date: 2026-09-23
    changes: "添加 upgrade 命令"
author: aymericzip
---

# 升级 Intlayer 软件包

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

`upgrade` 命令会列出项目中每个 `package.json`（包括 monorepo 工作区）声明的 Intlayer 包，并将其升级到最新发布的版本：框架集成、`eslint-plugin-intlayer`、`prettier-plugin-intlayer`、`intlayer-editor`、`@intlayer/mcp` 以及其他所有 `@intlayer/*` 包。随后会更新相关工具。

## 参数:

- `--project-root [projectRoot]` - 可选。项目根目录。默认情况下，命令从当前工作目录上方最近的 `package.json` 开始。
- `--dry-run` - 可选。列出软件包及其目标版本，而不修改任何文件。
- `--tag <tag>` - 可选。要升级到的 npm dist-tag（例如 `canary`）。默认为 `latest`。
- `--no-eslint` - 可选。不安装或注册 Intlayer lint 规则。
- `--no-prettier` - 可选。不安装或注册 Intlayer Prettier 插件。

## 它的工作原理:

1. **列出 Intlayer 软件包** - 扫描项目的每个 `package.json`（跳过 `node_modules` 和构建输出），查找 `intlayer`、`@intlayer/*`、`*-intlayer` 和 `intlayer-*` 依赖项及 devDependencies。
2. **获取目标版本** - 从 npm registry 读取每个软件包所选 dist-tag（默认为 `latest`）的版本。
3. **重写版本范围** - 就地更新每个过期的版本范围，保留其操作符（`^`、`~` 或无）和文件缩进。
4. **单次安装** - 使用拥有锁文件的包管理器，从工作区根目录（带有锁文件的最近目录）执行一次安装：

| 锁文件                         | 命令           |
| ------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`       | `bun install`  |
| `pnpm-lock.yaml`               | `pnpm install` |
| `yarn.lock`                    | `yarn install` |
| `package-lock.json` 或无锁文件 | `npm install`  |

如果不存在锁文件，则在回退到 npm 之前会先使用 `package.json` 中的 `packageManager` 字段（例如 `"bun@1.2.0"`）。

未指向 registry 的范围（例如 `workspace:*`、`file:`、`link:`、`catalog:` 或 git URL）绝不会被修改。

5. **lint 与 Prettier 插件** - 当项目使用 ESLint / oxlint 或 Prettier 时，安装缺失的 `eslint-plugin-intlayer` / `prettier-plugin-intlayer` 并进行注册：在 ESLint flat config 中添加 `...intlayer.configs.recommended`，在 `.oxlintrc.json` 中添加规则，在 Prettier 配置（JSON、YAML、JavaScript 或 TypeScript）中添加插件。无法安全编辑的配置会改为输出需要粘贴的代码片段。
6. **MCP 服务器** - 将项目中 stdio 方式的 Intlayer MCP 条目（`.mcp.json`、`.cursor/mcp.json`、`.vscode/mcp.json` 等）指向 `@intlayer/mcp@<tag>`，让 `npx` 启动升级后的服务器，而不是缓存的副本。

## 示例:

### 列出可用的升级而不应用它们:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### 升级到 canary 版本:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## 示例输出:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## 注意事项:

- 从代码仓库根目录运行该命令以升级所有工作区。从某个工作区运行它以仅升级该工作区。
- 无法获取版本的软件包（离线、私有或未发布的软件包）会被列出并保持不变。
- 如果安装失败，已升级的范围会保留在 `package.json` 中。请手动运行包管理器的安装命令。
