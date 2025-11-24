---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 列出内容声明文件
description: 了解如何列出项目中的所有内容声明文件。
keywords:
  - 列表
  - 内容声明
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# 列出内容声明文件

```bash
npx intlayer content list
```

## 别名：

- `npx intlayer list`

此命令显示项目中所有内容声明文件，展示它们的字典键和文件路径。它有助于概览所有内容文件，并验证它们是否被 Intlayer 正确发现。

## 示例：

```bash
npx intlayer content list
```

## 示例输出：

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

内容声明文件总数：3
```

此命令将输出：

- 所有内容声明文件的格式化列表，包含它们的键和相对文件路径
- 发现的内容声明文件总数

该输出帮助您验证所有内容文件是否已正确配置并能被 Intlayer 系统发现。
