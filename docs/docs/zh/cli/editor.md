---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor：可视化编辑器命令"
description: "通过 CLI 启动和配置 Intlayer 可视化编辑器，直接在运行中的应用上就地编辑内容。"
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
author: aymericzip
---

# 编辑器命令

`editor` 命令是对 `intlayer-editor` 命令的封装。

> 要能够使用 `editor` 命令，必须安装 `intlayer-editor` 包。（参见 [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)）

- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
