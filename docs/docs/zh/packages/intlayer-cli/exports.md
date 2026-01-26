---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli 包文档
description: Intlayer 的 CLI 工具，提供用于构建和审计字典的命令。
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出项的文档
---

# intlayer-cli 包

`intlayer-cli` 包提供了一组命令，用于管理 Intlayer 字典和配置。

## 安装

```bash
npm install intlayer-cli
```

## 导出

### CLI 命令（函数）

该包导出驱动 CLI 命令的函数，允许你以编程方式触发 Intlayer 操作。

导入：

```tsx
import "intlayer-cli";
```

| 函数           | 描述                         |
| -------------- | ---------------------------- |
| `build`        | 构建 Intlayer 字典。         |
| `audit`        | 审计字典以查找缺失的翻译。   |
| `liveSync`     | 实时同步字典。               |
| `pull`         | 从远程源拉取字典。           |
| `push`         | 将字典推送到远程源。         |
| `test`         | 对字典运行测试。             |
| `transform`    | 在格式之间转换字典。         |
| `fill`         | 使用 AI 为缺失翻译填充字典。 |
| `reviewDoc`    | 审查国际化文档。             |
| `translateDoc` | 使用 AI 翻译文档。           |
