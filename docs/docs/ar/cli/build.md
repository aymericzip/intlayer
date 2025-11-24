---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: بناء القواميس
description: تعلّم كيفية بناء قواميس Intlayer الخاصة بك من ملفات إعلان المحتوى.
keywords:
  - بناء
  - قواميس
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# بناء القواميس

لبناء قواميسك، يمكنك تشغيل الأوامر التالية:

```bash
npx intlayer build
```

أو في وضع المراقبة

```bash
npx intlayer build --watch
```

سيقوم هذا الأمر بالعثور على ملفات إعلان المحتوى الخاصة بك بشكل افتراضي في المسار `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وسيبني القواميس في مجلد `.intlayer`.

## الأسماء المستعارة:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## الوسائط:

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer build --base-dir ./src`

- **`--env`**: تحديد البيئة (مثل `development`، `production`). مفيد في حالة استخدام متغيرات البيئة في ملف تكوين intlayer الخاص بك.

  > مثال: `npx intlayer build --env production`

- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه. مفيد في حالة استخدام متغيرات البيئة في ملف تكوين intlayer الخاص بك.

  > مثال: `npx intlayer build --env-file .env.production.local`

- **`--with`**: بدء الأمر بالتوازي مع عملية البناء.

  > مثال: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: تخطي خطوة التحضير.

  > مثال: `npx intlayer build --skip-prepare`

- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer build --no-cache`
