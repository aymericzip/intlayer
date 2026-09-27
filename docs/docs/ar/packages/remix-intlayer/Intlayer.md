---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: توثيق سياق Intlayer | remix-intlayer
description: توثيق مفتاح تخزين سياق طلب Intlayer في تطبيقات Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - سياق الطلب
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي لمفتاح سياق Intlayer"
author: aymericzip
---

# مفتاح سياق طلب Intlayer

يُستخدم التصدير `Intlayer` كمعرّف لتخزين سياق الطلب في Remix 3. وهو يتيح استرداد حالة Intlayer مباشرة من كائن سياق Remix داخل معالجات المسارات أو البرمجيات الوسيطة المخصصة.

## الاستخدام

عند تشغيل البرمجية الوسيطة `intlayer()`، فإنها تخزن كائن `IntlayerState` في سياق الطلب تحت المفتاح `Intlayer`. يمكنك استرداده داخل أي معالج مسار:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // الوصول عبر context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

يمكنك أيضًا الوصول إليه باستخدام الاختصار المباشر للخاصية `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## بنية `IntlayerState`

يحتوي كائن `IntlayerState` على:

| الخاصية            | النوع               | الوصف                                              |
| ------------------ | ------------------- | -------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | اللغة المحددة للطلب الحالي.                        |
| `defaultLocale`    | `DeclaredLocales`   | اللغة الاحتياطية المعرّفة في `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | قائمة بجميع اللغات المدعومة المهيأة للمشروع.       |

## المستندات ذات الصلة

- [البرمجية الوسيطة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)
