---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: أوامر المحرّر المرئي"
description: "شغّل المحرّر المرئي لـ Intlayer واضبطه من سطر الأوامر لتعديل المحتوى في سياقه مباشرة داخل تطبيقك."
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
author: aymericzip
---

# أوامر المحرر

أمر `editor` يعيد تغليف أوامر `intlayer-editor`.

> لكي تتمكن من استخدام أمر `editor`، يجب تثبيت حزمة `intlayer-editor`. (انظر [محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
