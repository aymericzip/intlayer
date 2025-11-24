---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 推送词典
description: 了解如何将您的词典推送到 Intlayer 编辑器和 CMS。
keywords:
  - 推送
  - 词典
  - CLI
  - Intlayer
  - 编辑器
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# 推送词典

```bash
npx intlayer dictionary push
```

如果已安装 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，您也可以将词典推送到编辑器。此命令将使词典可用于[编辑器](https://intlayer.org/dashboard)。通过这种方式，您可以与团队共享词典，并在不修改应用代码的情况下编辑内容。

## 别名：

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## 参数：

**词典选项：**

- **`-d`，`--dictionaries`**：要推送的词典 ID。如果未指定，则会推送所有词典。

  > 示例：`npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**：要推送的词典 ID（`--dictionaries` 的别名）。

  > 示例：`npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。命令会在该目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件以获取 intlayer 配置。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**：禁用缓存。

  > 示例：`npx intlayer build --no-cache`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。当你在 intlayer 配置文件中使用环境变量时非常有用。
- **`--env-file`**：提供自定义环境文件以加载变量。当你在 intlayer 配置文件中使用环境变量时非常有用。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

  > 示例：`npx intlayer dictionary push --env production`

**输出选项：**

- **`-r`，`--delete-locale-dictionary`**：跳过推送字典后询问是否删除本地化目录的问题，并删除这些目录。默认情况下，如果字典在本地定义，它将覆盖远程字典内容。

  > 示例：`npx intlayer dictionary push -r`

  > 示例：`npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`，`--keep-locale-dictionary`**：跳过推送字典后询问是否删除本地化目录的问题，并保留这些目录。默认情况下，如果字典在本地定义，它将覆盖远程字典内容。

  > 示例：`npx intlayer dictionary push -k`

  > 示例：`npx intlayer dictionary push --keep-locale-dictionary`

**准备选项：**

- **`--build`**：在推送之前构建字典以确保内容是最新的。true 将强制构建，false 将跳过构建，undefined 将允许使用构建缓存。

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）

**Git 选项：**

- **`--git-diff`**：仅针对包含从基准（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典运行。
- **`--git-diff-base`**：指定 git diff 的基准引用（默认 `origin/main`）。
- **`--git-diff-current`**：指定 git diff 的当前引用（默认 `HEAD`）。
- **`--uncommitted`**：包含未提交的更改。
- **`--unpushed`**：包含未推送的更改。
- **`--untracked`**：包含未跟踪的文件。

- **`--build`**：在推送之前构建字典以确保内容是最新的。设置为 true 将强制构建，false 将跳过构建，undefined 将允许使用构建缓存。

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）

**Git 选项：**

- **`--git-diff`**：仅对包含从基准分支（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典运行。
- **`--git-diff-base`**：指定 git diff 的基准引用（默认 `origin/main`）。
- **`--git-diff-current`**：指定 git diff 的当前引用（默认 `HEAD`）。
- **`--uncommitted`**：包含未提交的更改。
- **`--unpushed`**：包含未推送的更改。
- **`--untracked`**：包含未跟踪的文件。

  > 示例：`npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 示例：`npx intlayer dictionary push --uncommitted --unpushed --untracked`
