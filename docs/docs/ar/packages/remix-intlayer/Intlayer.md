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

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## الوصف

يتم استخدام `Intlayer` بواسطة البرمجية الوسيطة `intlayer()` لربط حالة الجلسة الحالية بسياق طلب Remix (`RequestContext`). من المفضل عادةً استخدام خطافات مثل `useLocale()` أو `useIntlayer()`. يُعد الوصول المباشر عبر `context.get(Intlayer)` مفيدًا في معالجات البرمجيات الوسيطة منخفضة المستوى أو مسارات API حيث يتم تمرير مثيل السياق بشكل صريح.

## المستندات ذات الصلة

- [البرمجية الوسيطة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)
