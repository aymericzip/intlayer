---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
---

# مراقبة القواميس

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
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

- **`--ci`**: ينفّذ الأمر في كل مشروع Intlayer في الـ monorepo (أو في المشروع الحالي فقط عند التشغيل من مجلد مشروع). يمكن حقن بيانات اعتماد لكل مشروع عبر `INTLAYER_PROJECT_CREDENTIALS`، وهو كائن JSON يربط مسار كل مشروع بـ `{ "clientId", "clientSecret" }`.

> مثال: `npx intlayer watch --ci`
