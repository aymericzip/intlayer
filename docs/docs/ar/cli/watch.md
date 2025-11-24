---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: مراقبة القواميس
description: تعلّم كيفية مراقبة التغييرات في ملفات إعلان المحتوى الخاصة بك وبناء القواميس تلقائيًا.
keywords:
  - مراقبة
  - قواميس
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# مراقبة القواميس

```bash
npx intlayer watch
```

هذا الأمر سيراقب التغييرات في ملفات إعلان المحتوى الخاصة بك ويبني القواميس في دليل `.intlayer`.
هذا الأمر يعادل `npx intlayer build --watch --skip-prepare`.

## الأسماء المستعارة:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## الوسائط:

- **`--with`**: بدء أمر بالتوازي مع المراقبة.

> مثال: `npx intlayer watch --with "next dev --turbopack"`
