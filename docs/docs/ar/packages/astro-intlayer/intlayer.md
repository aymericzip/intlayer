---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: توثيق تكامل intlayer | astro-intlayer
description: تعرّف على كيفية تهيئة واستخدام تكامل Astro intlayer في ملف astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - تكامل
  - i18n
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "تحديث توثيق التكامل بتفاصيل البرمجية الوسيطة والخطافات"
  - version: 8.0.0
    date: 2026-01-21
    changes: "توثيق أولي"
author: aymericzip
---

# توثيق تكامل Astro intlayer

يقوم تكامل `intlayer` لـ Astro بتهيئة مشروعك للتدويل متعدد اللغات (i18n). حيث يتولى إعداد القواميس أثناء البناء، وحقن إضافات Vite، والتسجيل التلقائي لبرمجية الطلب الوسيطة، وإخراج الصفحات المعروضة مسبقًا والمترجمة.

## الاستخدام

أضف `intlayer()` إلى ملف `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

ينشئ أمر Astro CLI codemod (`astro add astro-intlayer`) أيضًا استيرادًا افتراضيًا مدعومًا:

```ts
import intlayer from "astro-intlayer";
```

## الوصف

يرتبط التكامل بدورة حياة البناء والتشغيل في Astro:

1. **إعداد التهيئة (`astro:config:setup`)**:
   - **إعداد القواميس**: يجهز قواميس Intlayer والأنواع المنشأة قبل بدء عملية البناء.
   - **إضافات Vite**: يحقن إضافات لأسماء Vite المستعارة (مما يتيح استيراد القواميس بسلاسة)، ووكلاء توجيه اللغة، وتقليم البناء.
   - **تسجيل البرمجية الوسيطة**: يحقن تلقائيًا `astro-intlayer/middleware` في سلسلة برمجيات مشروعك الوسيطة، ويملأ `Astro.locals.intlayer` مع كل طلب وارد.
2. **اكتمال البناء (`astro:build:done`)**:
   - **إعادة كتابة الصفحات**: يفحص قواعد إعادة كتابة عناوين URL المترجمة ويُخرج صفحات HTML المعروضة مسبقًا في مساراتها المترجمة المناسبة.

## ما يتم توفيره افتراضيًا

بمجرد التهيئة، يمكن لتطبيق Astro الخاص بك استخدام ما يلي مباشرة:

- خطافات `useIntlayer` و `useDictionary` و `useLocale` داخل واجهة مكونات `.astro`.
- كائن `Astro.locals.intlayer` في نقاط النهاية وصفحات Astro.
- استيرادات جانب العميل في كتل `<script>` التي تعكس نفس واجهة برمجة التطبيقات مع تحديثات تفاعلية.
- أدوات التنسيق المضمنة ضمن `astro-intlayer/format` (`useDate` و `useNumber` و `useCurrency` إلخ).

## المستندات ذات الصلة

- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useIntlayer.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useLocale.md)
- [البرمجية الوسيطة `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/onRequest.md)
