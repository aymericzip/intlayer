---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 测试缺失的翻译
description: 学习如何测试并识别字典中缺失的翻译。
keywords:
  - 测试
  - 缺失的翻译
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# 测试缺失的翻译

```bash
npx intlayer content test
```

## 别名：

- `npx intlayer test`

此命令分析您的内容声明文件，以识别所有配置的语言环境中缺失的翻译。它提供一份全面的报告，显示哪些翻译键在哪些语言环境中缺失，帮助您维护多语言内容的一致性。

## 示例输出：

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## 参数：

**配置选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。

  > 示例：`npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**：禁用缓存。

  > 示例：`npx intlayer build --no-cache`

**准备选项：**

- **`--build`**：在推送之前构建字典以确保内容是最新的。设置为 true 将强制构建，false 将跳过构建，undefined 将允许使用构建缓存。

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）

  > 示例：`npx intlayer content test --verbose`

## 示例：

```bash
npx intlayer content test --verbose
```

输出帮助您快速识别需要完成的翻译，以确保您的应用程序在所有配置的语言环境中正常运行。
