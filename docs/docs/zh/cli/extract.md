---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: 提取字符串
description: 了解如何将组件中的字符串提取到靠近组件的 .content 文件中。
keywords:
  - 提取
  - 组件
  - 迁移
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
author: aymericzip
---

# 提取字符串

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

此命令会分析你的代码文件，将组件中的字符串提取到靠近组件的 .content 文件中。它支持交互式文件选择或指定文件目标。

## 别名：

- `npx intlayer ext`

## 参数：

**文件选择选项：**

- **`-f, --file [files...]`**：要提取的特定文件列表。如果未提供，CLI 将扫描匹配的文件（`**/*.{tsx,jsx,vue,svelte,ts,js}`）并提示您选择要提取的文件。

  > 示例：`npx intlayer extract -f src/components/MyComponent.tsx`

**输出选项：**

- **`-o, --output-content-declarations [outputContentDeclarations]`**：保存生成的内容声明文件的目录。

  > 示例：`npx intlayer extract -o src/content`

- **`--code-only`**：仅提取组件代码（不写入内容声明）。

  > 示例：`npx intlayer extract --code-only`

- **`--declaration-only`**：仅生成内容声明（不重写组件）。

  > 示例：`npx intlayer extract --declaration-only`

**配置选项：**

- **`--base-dir`**：指定项目的基目录。
- **`--env`**：指定环境。
- **`--env-file`**：提供自定义的环境文件。
- **`--verbose`**：启用详细日志。
- **`--ci`**：在 monorepo 的每个 Intlayer 项目中执行该命令（在项目目录内运行时仅处理当前项目）。可通过 `INTLAYER_PROJECT_CREDENTIALS`（将项目路径映射到 `{ "clientId", "clientSecret" }` 的 JSON 对象）为每个项目注入凭据。

**必需的插件：**

extract 命令在 TypeScript / JSX 文件上无需额外插件即可运行。但是，对于 Vue 和 Svelte 项目，需要安装以下插件：

- **`@intlayer/vue-compiler`**：用于 Vue 文件。
- **`@intlayer/svelte-compiler`**：用于 Svelte 文件。
