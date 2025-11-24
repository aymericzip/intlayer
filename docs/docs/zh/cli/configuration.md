---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 管理配置
description: 了解如何获取并推送您的 Intlayer 配置到 CMS。
keywords:
  - 配置
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# 管理配置

## 获取配置

`configuration get` 命令用于检索当前 Intlayer 的配置，特别是语言环境设置。这对于验证您的设置非常有用。

```bash
npx intlayer configuration get
```

## 别名：

- `npx intlayer config get`
- `npx intlayer conf get`

## 参数：

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--verbose`**：启用详细日志以进行调试。（默认通过 CLI 设置为 true）
- **`--no-cache`**：禁用缓存。

## 推送配置

`configuration push` 命令将您的配置上传到 Intlayer CMS 和编辑器。此步骤对于启用 Intlayer 可视化编辑器中远程词典的使用是必要的。

```bash
npx intlayer configuration push
```

## 别名：

- `npx intlayer config push`
- `npx intlayer conf push`

## 参数：

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）
- **`--no-cache`**：禁用缓存。

通过推送配置，您的项目将完全集成到 Intlayer CMS 中，实现团队间无缝的词典管理。
