---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer live: مزامنة محتوى CMS أثناء التشغيل"
description: "استخدم Live Sync في Intlayer لتطبيق تغييرات CMS على تطبيقك أثناء تشغيله دون إعادة البناء أو النشر."
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
author: aymericzip
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

- **`--ci`**: ينفّذ الأمر في كل مشروع Intlayer في الـ monorepo (أو في المشروع الحالي فقط عند التشغيل من مجلد مشروع). يمكن حقن بيانات اعتماد لكل مشروع عبر `INTLAYER_PROJECT_CREDENTIALS`، وهو كائن JSON يربط مسار كل مشروع بـ `{ "clientId", "clientSecret" }`.

  > مثال: `npx intlayer live --ci`

**خيارات السجل:**

- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح. (الإعداد الافتراضي هو true عند استخدام CLI)
