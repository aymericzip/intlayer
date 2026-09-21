---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: توثيق البرمجية الوسيطة onRequest | astro-intlayer
description: تعرّف على كيفية استخدام البرمجية الوسيطة onRequest في تطبيقات Astro لتحديد لغة الطلب وملء Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي"
author: aymericzip
---

# توثيق برمجية Astro الوسيطة onRequest

تقوم البرمجية الوسيطة `onRequest` من `astro-intlayer/middleware` بتحديد لغة كل طلب HTTP وارد وملء `Astro.locals.intlayer`.

عند تسجيل تكامل `intlayer()` في `astro.config.mjs`، يتم حقن هذه البرمجية الوسيطة تلقائيًا. تحتاج فقط إلى استيرادها مباشرة إذا كنت تقوم بتركيب برمجيات Astro الوسيطة يدويًا باستخدام `sequence(...)`.

## الاستخدام

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // الوصول إلى اللغة المحددة في برمجيتك الوسيطة المخصصة
  const { locale } = context.locals.intlayer;
  console.log(`معالجة الطلب للغة: ${locale}`);

  return next();
});
```

## الوصف

تقوم البرمجية الوسيطة بالإجراءات التالية:

1. **اكتشاف اللغة**:
   - **URL**: يحلل بادئة مسار URL أو معلمة البحث `?locale=` (ما لم يتم تعيين `routing.mode` على `no-prefix`).
   - **ملفات تعريف الارتباط / الترويسات**: يتحقق من ملفات تعريف الارتباط المحفوظة للغة أو قيم الترويسات المخصصة.
   - **Accept-Language**: يعتمد على تفاوض اللغة المفضلة للمتصفح كحل احتياطي.
   - بالنسبة للصفحات المعروضة مسبقًا (`context.isPrerendered`)، يتم استخراج اللغة بدقة من عنوان URL لمنع تحذيرات بناء Astro.
2. **ملء السياق**: يملأ `Astro.locals.intlayer` بما يلي:
   - `locale`: اللغة المحددة.
   - `defaultLocale`: اللغة الاحتياطية الافتراضية.
   - `availableLocales`: مصفوفة اللغات المكونة.
3. **نطاق AsyncLocalStorage**: يغلف معالجة الطلب اللاحقة داخل نطاق `AsyncLocalStorage`، مما يسمح لـ `useIntlayer()` و `useDictionary()` و `useLocale()` بالوصول إلى حالة الطلب دون تمرير معاملات.

## نوع `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## المستندات ذات الصلة

- [تكامل `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/intlayer.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useIntlayer.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useLocale.md)
