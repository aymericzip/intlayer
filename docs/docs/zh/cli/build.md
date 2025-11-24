---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# 构建字典

要构建您的字典，您可以运行以下命令：

```bash
npx intlayer build
```

或者使用监听模式

```bash
npx intlayer build --watch
```

该命令默认会查找您的声明内容文件，路径为 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`。并在 `.intlayer` 目录中构建字典。

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
