---
createdAt: 2026-09-23
updatedAt: 2026-09-23
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

`upgrade` 命令会列出项目中每个 `package.json`（包括 monorepo 工作区）中声明的 Intlayer 软件包，并将它们升级到已发布的最新版本。它独立运行与 `intlayer init` 相同的软件包升级步骤。

## 参数:

- `--project-root [projectRoot]` - 可选。项目根目录。默认情况下，命令从当前工作目录上方最近的 `package.json` 开始。
- `--dry-run` - 可选。列出软件包及其目标版本，而不修改任何文件。
- `--tag <tag>` - 可选。要升级到的 npm dist-tag（例如 `canary`）。默认为 `latest`。

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
