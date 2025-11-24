---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 拉取词典
description: 了解如何从 Intlayer 编辑器和 CMS 拉取词典。
keywords:
  - 拉取
  - 词典
  - CLI
  - Intlayer
  - 编辑器
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# 拉取远程词典

```bash
npx intlayer pull
```

如果已安装 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，你也可以从编辑器拉取词典。通过这种方式，你可以根据应用需求覆盖词典内容。

## 别名：

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## 参数：

**词典选项：**

- **`-d, --dictionaries`**：要拉取的词典 ID。如果未指定，则会拉取所有词典。

  > 示例：`npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**：要拉取的词典 ID（--dictionaries 的别名）。

  > 示例：`npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。命令会在该目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件以获取 intlayer 配置。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**：禁用缓存。

  > 示例：`npx intlayer build --no-cache`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。命令会在该目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件以获取 intlayer 配置。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

  > 示例：`npx intlayer dictionary push --env production`

**输出选项：**

- **`--new-dictionaries-path`** ：新词典将被保存的目录路径。如果未指定，新词典将保存在项目的 `./intlayer-dictionaries` 目录中。如果在词典内容中指定了 `filePath` 字段，词典将忽略此参数，并保存在指定的 `filePath` 目录中。

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）

## 示例：

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
