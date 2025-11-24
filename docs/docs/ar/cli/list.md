---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: قائمة ملفات إعلان المحتوى
description: تعلّم كيفية سرد جميع ملفات إعلان المحتوى في مشروعك.
keywords:
  - قائمة
  - إعلان المحتوى
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# قائمة ملفات إعلان المحتوى

```bash
npx intlayer content list
```

## الأسماء المستعارة:

- `npx intlayer list`

يعرض هذا الأمر جميع ملفات إعلان المحتوى في مشروعك، مع عرض مفاتيح القاموس الخاصة بها ومسارات الملفات. وهو مفيد للحصول على نظرة عامة على جميع ملفات المحتوى الخاصة بك والتحقق من اكتشافها بشكل صحيح بواسطة Intlayer.

## مثال:

```bash
npx intlayer content list
```

## مثال على الإخراج:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

إجمالي ملفات إعلان المحتوى: 3
```

سيقوم هذا الأمر بإخراج:

- قائمة منسقة بجميع ملفات إعلان المحتوى مع مفاتيحها ومسارات الملفات النسبية
- العدد الإجمالي لملفات إعلان المحتوى التي تم العثور عليها

يساعدك الإخراج على التحقق من أن جميع ملفات المحتوى الخاصة بك مُعدة بشكل صحيح وقابلة للاكتشاف بواسطة نظام Intlayer.
