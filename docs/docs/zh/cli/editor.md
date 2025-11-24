---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 编辑器命令
description: 了解如何使用 Intlayer 编辑器命令。
keywords:
  - 编辑器
  - 可视化编辑器
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
---

# 编辑器命令

`editor` 命令是对 `intlayer-editor` 命令的封装。

> 要能够使用 `editor` 命令，必须安装 `intlayer-editor` 包。（参见 [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)）

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
