---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: 构建字典
description: 了解如何从内容声明文件构建您的 Intlayer 字典。
keywords:
  - 构建
  - 字典
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "添加 `--ci` 标志"
  - version: 8.1.5
    date: 2026-02-23
    changes: "添加 checkTypes 选项"
author: aymericzip
---

# 构建字典

要构建您的字典，您可以运行以下命令：

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

或者使用监听模式

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

该命令默认会查找您的声明内容文件，路径为 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`。并在 `.intlayer` 目录中构建字典。

## 别名：

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## 参数：

- **`--base-dir`**：指定项目的基础目录。为了获取 intlayer 配置，命令会在基础目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件。

  > 示例：`npx intlayer build --base-dir ./src`

- **`--env`**：指定环境（例如，`development`、`production`）。当您在 intlayer 配置文件中使用环境变量时非常有用。

  > 示例：`npx intlayer build --env production`

- **`--env-file`**：提供自定义环境文件以加载变量。当您在 intlayer 配置文件中使用环境变量时非常有用。

  > 示例：`npx intlayer build --env-file .env.production.local`

- **`--with`**：与构建命令并行启动其他命令。

  > 示例：`npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**：跳过准备步骤。

  > 示例：`npx intlayer build --skip-prepare`

- **`--no-cache`**：禁用缓存。

  > 示例：`npx intlayer build --no-cache`

- **`--ci`**：在 monorepo 的每个 Intlayer 项目中执行该命令（在项目目录内运行时仅处理当前项目）。可通过 `INTLAYER_PROJECT_CREDENTIALS`（将项目路径映射到 `{ "clientId", "clientSecret" }` 的 JSON 对象）为每个项目注入凭据。

  > 示例：`npx intlayer build --ci`

- **`--check-types`**: 检查内容声明文件的类型。

  > 示例： `npx intlayer build --check-types`
