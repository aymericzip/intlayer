---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Lệnh Editor
description: Tìm hiểu cách sử dụng các lệnh editor của Intlayer.
keywords:
  - Editor
  - Visual Editor
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
---

# Lệnh Editor

Lệnh `editor` bao bọc lại các lệnh `intlayer-editor`.

> Để có thể sử dụng lệnh `editor`, gói `intlayer-editor` phải được cài đặt. (Xem [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
