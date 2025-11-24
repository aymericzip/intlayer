---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 转换组件
description: 学习如何转换现有组件以使用 Intlayer。
keywords:
  - 转换
  - 组件
  - 迁移
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# 转换组件

```bash
npx intlayer transform
```

此命令分析您的代码文件，帮助迁移现有组件以使用 Intlayer。它支持交互式文件选择或特定文件定位。

## 别名：

- `npx intlayer trans`

## 参数：

**文件选择选项：**

- **`-f, --file [files...]`**：要转换的特定文件列表。如果未提供，CLI 将扫描匹配的文件（`**/*.{tsx,jsx,vue,svelte,ts,js}`）并提示您选择要转换的文件。

  > 示例：`npx intlayer transform -f src/components/MyComponent.tsx`

**输出选项：**

- **`-o, --output-content-declarations [outputContentDeclarations]`**：保存生成的内容声明文件的目录。

  > 示例：`npx intlayer transform -o src/content`

- **`--code-only`**：仅转换组件代码（不写入内容声明）。

  > 示例：`npx intlayer transform --code-only`

- **`--declaration-only`**：仅生成内容声明（不重写组件）。

  > 示例：`npx intlayer transform --declaration-only`

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。
- **`--env`**：指定环境。
- **`--env-file`**：提供自定义环境文件。
- **`--verbose`**：启用详细日志记录。

**必需的插件：**

transform 命令在 TypeScript / JSX 文件上无需额外插件即可工作。但对于 Vue 和 Svelte 项目，需要安装以下插件：

- **`@intlayer/vue-transformer`**：用于 Vue 文件。
- **`@intlayer/svelte-transformer`**：用于 Svelte 文件。
