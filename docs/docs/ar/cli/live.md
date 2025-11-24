---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: أوامر المزامنة الحية
description: تعلّم كيفية استخدام المزامنة الحية لعكس تغييرات محتوى CMS أثناء وقت التشغيل.
keywords:
  - المزامنة الحية
  - CMS
  - وقت التشغيل
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# أوامر المزامنة الحية

تتيح لك المزامنة الحية أن يعكس تطبيقك تغييرات محتوى CMS أثناء وقت التشغيل. لا حاجة لإعادة البناء أو إعادة النشر. عند التفعيل، يتم بث التحديثات إلى خادم المزامنة الحية الذي يقوم بتحديث القواميس التي يقرأها تطبيقك. راجع [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) لمزيد من التفاصيل.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## الوسائط:

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

**خيارات السجل:**

- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح. (الإعداد الافتراضي هو true عند استخدام CLI)
