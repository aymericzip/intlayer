---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: وثائق هوك useRewriteURL
description: هوك مخصّص لـ Next.js لإدارة إعادة كتابة عناوين URL الموحَّدة محليًا في Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# هوك useRewriteURL

الهوك `useRewriteURL` الخاص بـ Next.js هو هوك من جانب العميل يقوم بإدارة إعادة كتابة عناوين URL المحلية تلقائيًا. يضمن أن عنوان المتصفح يعكس دائمًا المسار المحلي "الجميل" المعرفة في ملف `intlayer.config.ts`، حتى لو كتب المستخدم يدويًا مسارًا قياسيًا مع بادئة اللغة.

يعمل هذا الهوك بهدوء عن طريق استخدام `window.history.replaceState`، متجنبًا عمليات التنقل غير الضرورية عبر راوتر Next.js أو إعادة تحميل الصفحة.

## الاستخدام

ببساطة استدعِ الـ hook داخل Client Component يكون جزءًا من الـ layout الخاص بك.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // يصحّح تلقائيًا المسار /fr/privacy-notice إلى /fr/politique-de-confidentialite في شريط العنوان
  useRewriteURL();

  return null;
};
```

## كيف يعمل

1. **مراقبة المسار**: يستمع الـ hook لتغيّرات `locale` الخاصة بالمستخدم.
2. **كشف عمليات إعادة الكتابة**: يتحقق من `window.location.pathname` الحالي مقابل قواعد إعادة الكتابة في تكوينك.
3. **تصحيح عنوان URL**: إذا وُجدت تسمية محلية أجمل للمسار الحالي، يقوم الـ hook بتشغيل `window.history.replaceState` لتحديث شريط العنوان مع إبقاء المستخدم على نفس الصفحة داخليًا.

## لماذا تستخدمه في Next.js؟

بينما يتولى `intlayerMiddleware` التعامل مع إعادة الكتابة على مستوى الـserver-side وإعادة التوجيهات الأولية، يضمن الـhook `useRewriteURL` بقاء عنوان المتصفح متسقًا مع بنية الـSEO المفضلة لديك حتى بعد الانتقالات على الـclient-side.

- **عناوين URL نظيفة**: يفرض استخدام مقاطع مترجمة محليًا مثل `/fr/essais` بدلاً من `/fr/tests`.
- **الأداء**: يحدث شريط العنوان دون تحفيز دورة كاملة للـrouter أو إعادة جلب البيانات.
- **مواءمة SEO**: يمنع مشاكل المحتوى المكرر من خلال ضمان ظهور نسخة واحدة فقط من عنوان URL للمستخدم وروبوتات محركات البحث.
