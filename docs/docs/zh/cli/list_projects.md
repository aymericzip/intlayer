---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: 列出 Intlayer 项目
description: 了解如何在目录或 git 仓库中列出所有 Intlayer 项目。
keywords:
  - List
  - Projects
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# 列出 Intlayer 项目

```bash
npx intlayer projects list
```

此命令通过查找包含 Intlayer 配置文件的目录来搜索并列出所有 Intlayer 项目。对于在 monorepo、workspace 或 git 仓库中发现所有 Intlayer 项目非常有用。

## 别名：

- `npx intlayer projects-list`
- `npx intlayer pl`

## 参数：

- **`--base-dir [path]`**：指定要从其开始搜索的基目录。默认是当前工作目录。

  > 示例：`npx intlayer projects list --base-dir /path/to/workspace`

  > 示例：`npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**：从 git 根目录开始搜索，而不是基目录。这对于在 monorepo 或 git 仓库中查找所有 Intlayer 项目很有用。

  > 示例：`npx intlayer projects list --git-root`

- **`--json`**：以 JSON 格式输出结果，而不是格式化文本。对脚本编写和程序化访问很有用。

  > 示例：`npx intlayer projects list --json`

## 工作原理：

该命令将在指定目录（如果使用了 `--git-root` 则在 git 根目录）中搜索 Intlayer 配置文件。它会查找以下配置文件模式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

每个包含上述任一文件的目录都被视为一个 Intlayer 项目，并将在输出中列出。

## 示例：

### 列出当前目录中的项目：

```bash
npx intlayer projects list
```

### 在特定目录中列出项目：

```bash
npx intlayer projects list --base-dir ./packages
```

### 列出 git 仓库中的所有项目：

```bash
npx intlayer projects list --git-root
```

### 使用快捷别名：

```bash
npx intlayer pl --git-root
```

### 以 JSON 格式输出：

```bash
npx intlayer projects list --json
```

## 示例输出：

### 格式化输出：

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON 输出：

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## 使用场景：

- **Monorepo 管理**：在 monorepo 结构中发现所有 Intlayer 项目
- **项目发现**：在工作区中查找所有启用 Intlayer 的项目
- **CI/CD**：在自动化工作流中验证 Intlayer 项目
- **文档**：生成列出所有使用 Intlayer 的项目的文档

输出提供每个项目目录的绝对路径，便于导航或对多个 Intlayer 项目进行脚本化操作。
