---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli 包文档
description: 提供用于构建和审计字典的 Intlayer CLI 工具。
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 为所有导出统一文档
---

# intlayer-cli 包

`intlayer-cli` 包提供一组命令，用于管理 Intlayer 字典和配置。

## 安装

```bash
npm install intlayer-cli
```

## 导出

### CLI 命令（函数）

该包导出用于驱动 CLI 命令的函数。

| Function   | 描述                       |
| ---------- | -------------------------- |
| `build`    | 构建 Intlayer 字典。       |
| `audit`    | 审计字典以查找缺失的翻译。 |
| `liveSync` | 实时同步字典。             |
| `pull`     | 从远程源拉取字典。         |
| `push`     | 将字典推送到远程源。       |
| `test`     | 对字典运行测试。           |
| `extract`  | 在不同格式之间转换字典。   |
