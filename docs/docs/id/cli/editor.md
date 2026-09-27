---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: perintah editor visual"
description: "Jalankan dan konfigurasikan editor visual Intlayer dari CLI untuk mengedit konten langsung di aplikasi yang sedang berjalan."
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

# Perintah editor

Perintah `editor` membungkus ulang perintah `intlayer-editor`.

> Untuk dapat menggunakan perintah `editor`, paket `intlayer-editor` harus diinstal. (Lihat [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
