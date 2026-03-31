---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: 初始化 Intlayer
description: 了解如何在您的项目中初始化 Intlayer。
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "添加 --no-gitignore 选项"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令内容"
---

# 初始化 Intlayer

```bash
npx intlayer init
```

`init` 命令通过创建必要的文件和设置，在您的项目中自动配置 Intlayer。这是开始使用 Intlayer 的推荐方式。

## 别名：

- `npx intlayer init`

## 参数：

- `--project-root [projectRoot]` - 可选。指定项目的根目录。如果未提供，命令将从当前工作目录开始搜索项目根目录。
- `--no-gitignore` - 可选。跳过自动更新 `.gitignore` 文件。如果设置了此标志，`.intlayer` 将不会添加到 `.gitignore` 中。

## 工作原理：

`init` 命令执行以下设置任务：

1. **验证项目结构** - 确保您位于包含 `package.json` 文件的有效项目目录中。
2. **更新 `.gitignore`** - 将 `.intlayer` 添加到您的 `.gitignore` 文件中，以将生成的文件排除在版本控制之外（可以使用 `--no-gitignore` 跳过）。
3. **配置 TypeScript** - 更新任何 `tsconfig.json` 文件以包含 Intlayer 类型定义 (`.intlayer/**/*.ts`)。
4. **创建配置文件** - 使用默认设置生成 `intlayer.config.ts`（对于 TypeScript 项目）或 `intlayer.config.mjs`（对于 JavaScript 项目）。
5. **更新 Vite 配置** - 如果检测到 Vite 配置文件，将添加 `vite-intlayer` 插件的导入。
6. **更新 Next.js 配置** - 如果检测到 Next.js 配置文件，将添加 `next-intlayer` 插件的导入。

## 示例：

### 基础初始化：

```bash
npx intlayer init
```

这将在当前目录中初始化 Intlayer，并自动检测项目根目录。

### 使用自定义项目根目录初始化：

```bash
npx intlayer init --project-root ./my-project
```

这将在指定的目录中初始化 Intlayer。

### 初始化而不更新 .gitignore：

```bash
npx intlayer init --no-gitignore
```

这将设置所有配置文件，但不会修改您的 `.gitignore`。

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

- 该命令是幂等的——您可以安全地多次运行它。已配置的步骤将被跳过。
- 如果配置文件已存在，则不会被覆盖。
- 不包含 `include` 数组的 TypeScript 配置（例如带有引用的 solution-style 配置）将被跳过。
- 如果在项目根目录中未找到 `package.json`，该命令将报错退出。
