---
createdAt: 2024-08-11
updatedAt: 2026-01-06
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
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: 为 list 命令添加绝对路径输出选项
  - version: 7.5.11
    date: 2026-01-06
    changes: 为 list 命令添加 JSON 输出选项
---

# 列出内容声明文件

```bash
npx intlayer content list
```

## 别名：

- `npx intlayer list`

此命令显示项目中所有内容声明文件，展示它们的字典键和文件路径。它有助于概览所有内容文件，并验证它们是否被 Intlayer 正确发现。

## 参数：

- **`--json`**: 以 JSON 格式输出结果，而不是格式化文本。对脚本编写和程序化访问很有用。

  > 示例: `npx intlayer content list --json`

## 示例：

### 列出内容声明文件：

```bash
npx intlayer content list
```

### 以 JSON 格式输出：

```bash
npx intlayer content list --json
```

### 以绝对路径输出：

```bash
npx intlayer content list --absolute
```

## 示例输出：

### 格式化输出：

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

内容声明文件总数：3
```

### JSON 输出：

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

此命令将输出：

- 所有内容声明文件的格式化列表，包含它们的键和相对文件路径
- 发现的内容声明文件总数

该输出帮助您验证所有内容文件是否已正确配置并能被 Intlayer 系统发现。
