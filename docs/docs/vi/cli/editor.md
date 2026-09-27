---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: lệnh của trình chỉnh sửa trực quan"
description: "Khởi động và cấu hình trình chỉnh sửa trực quan Intlayer từ CLI để sửa nội dung ngay trong ứng dụng đang chạy."
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
author: aymericzip
---

# Lệnh Editor

Lệnh `editor` bao bọc lại các lệnh `intlayer-editor`.

> Để có thể sử dụng lệnh `editor`, gói `intlayer-editor` phải được cài đặt. (Xem [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md))

- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
