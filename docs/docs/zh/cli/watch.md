---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 监视字典
description: 学习如何监视内容声明文件的更改并自动构建字典。
keywords:
  - 监视
  - 字典
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# 监视字典

```bash
npx intlayer watch
```

此命令将监视内容声明文件的更改，并在 `.intlayer` 目录中构建字典。
此命令等同于 `npx intlayer build --watch --skip-prepare`。

## 别名：

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## 参数：

- **`--with`**：与监视命令并行启动其他命令。

> 示例：`npx intlayer watch --with "next dev --turbopack"`
