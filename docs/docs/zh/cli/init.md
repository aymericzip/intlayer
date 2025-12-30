---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: 初始化 Intlayer
description: 了解如何在项目中初始化 Intlayer。
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
  - version: 7.5.9
    date: 2025-12-30
    changes: 添加 init 命令
---

# 初始化 Intlayer

```bash
npx intlayer init
```

`init` 命令会自动在你的项目中设置 Intlayer，配置必要的文件和设置。这是开始使用 Intlayer 的推荐方式。

## 别名：

- `npx intlayer init`

## 参数：

- `--project-root [projectRoot]` - 可选。指定项目根目录。如果未提供，命令将从当前工作目录开始向上搜索项目根目录。

## 它会执行以下操作：

`init` 命令执行以下设置任务：

1. **验证项目结构** - 确保你位于包含 `package.json` 文件的有效项目目录中
2. **更新 `.gitignore`** - 将 `.intlayer` 添加到你的 `.gitignore` 文件中，以将生成的文件排除在版本控制之外
3. **配置 TypeScript** - 更新所有 `tsconfig.json` 文件以包含 Intlayer 类型定义（`.intlayer/**/*.ts`）
4. **创建配置文件** - 生成带有默认设置的 `intlayer.config.ts`（用于 TypeScript 项目）或 `intlayer.config.mjs`（用于 JavaScript 项目）
5. **更新 Vite 配置** - 如果检测到 Vite 配置文件，则添加 `vite-intlayer` 插件的导入
6. **更新 Next.js 配置** - 如果检测到 Next.js 配置文件，则添加 `next-intlayer` 插件的导入

## 示例：

### 基本初始化：

```bash
npx intlayer init
```

这将在当前目录初始化 Intlayer，自动检测项目根目录。

### 使用自定义项目根目录初始化：

```bash
npx intlayer init --project-root ./my-project
```

这将在指定目录初始化 Intlayer。

## 示例输出：

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## 注意事项：

- 该命令是幂等的 - 可以安全地多次运行。它会跳过已配置的步骤。
- 如果配置文件已存在，则不会被覆盖。
- 如果 TypeScript 配置文件没有 `include` 数组（例如带 references 的 solution 样式配置），则会被跳过。
- 如果在项目根目录未找到 `package.json`，命令将以错误退出。
