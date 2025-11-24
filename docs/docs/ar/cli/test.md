---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: اختبار الترجمات المفقودة
description: تعلّم كيفية اختبار وتحديد الترجمات المفقودة في قواميسك.
keywords:
  - اختبار
  - الترجمات المفقودة
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# اختبار الترجمات المفقودة

```bash
npx intlayer content test
```

## الأسماء المستعارة:

- `npx intlayer test`

يقوم هذا الأمر بتحليل ملفات إعلان المحتوى الخاصة بك لتحديد الترجمات المفقودة عبر جميع اللغات المُعدة. ويوفر تقريرًا شاملاً يوضح مفاتيح الترجمة المفقودة لكل لغة، مما يساعدك في الحفاظ على التناسق عبر محتواك متعدد اللغات.

## مثال على المخرجات:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## الوسائط:

**خيارات التكوين:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.

  > مثال: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer build --no-cache`

**خيارات التحضير:**

- **`--build`**: بناء القواميس قبل الدفع لضمان تحديث المحتوى. true ستجبر البناء، false ستتخطى البناء، undefined ستسمح باستخدام التخزين المؤقت للبناء.

**خيارات السجل:**

- **`--verbose`**: تمكين التسجيل التفصيلي لأغراض التصحيح. (افتراضيًا true عند استخدام CLI)

  > مثال: `npx intlayer content test --verbose`

## مثال:

```bash
npx intlayer content test --verbose
```

تساعدك النتيجة على تحديد الترجمات التي تحتاج إلى إكمال بسرعة لضمان عمل تطبيقك بشكل صحيح عبر جميع اللغات المكونة.
