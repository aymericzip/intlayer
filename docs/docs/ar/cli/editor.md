---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: أوامر المحرر
description: تعلّم كيفية استخدام أوامر محرر Intlayer.
keywords:
  - محرر
  - محرر بصري
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
---

# أوامر المحرر

أمر `editor` يعيد تغليف أوامر `intlayer-editor`.

> لكي تتمكن من استخدام أمر `editor`، يجب تثبيت حزمة `intlayer-editor`. (انظر [محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
