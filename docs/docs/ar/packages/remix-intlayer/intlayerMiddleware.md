---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: توثيق البرمجية الوسيطة intlayer | remix-intlayer
description: تعرّف على كيفية استخدام البرمجية الوسيطة intlayer في Remix 3 لاكتشاف اللغة والتعامل مع عمليات إعادة التوجيه وحقن حالة Intlayer في سياق الطلب.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي للبرمجية الوسيطة intlayer"
author: aymericzip
---

# البرمجية الوسيطة intlayer

تُعد دالة البرمجية الوسيطة `intlayer` مسؤولة عن إعداد التدويل لكل طلب في تطبيقات Remix 3. حيث تكتشف لغة كل طلب وارد، وتطبق قواعد إعادة توجيه URL، وتحفظ حالة اللغة في سياق الطلب.

## الاستخدام

سجّل البرمجية الوسيطة في موجه Remix الخاص بك:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## كيف تعمل

تؤدي البرمجية الوسيطة المهام التالية لكل طلب وارد:

1. **اكتشاف اللغة**: تستخرج اللغة من بادئة مسار URL (مثل `/ar/about`) أو ملفات تعريف الارتباط أو ترويسة `Accept-Language` وفقًا لتكوين Intlayer الخاص بك.
2. **إعادة توجيه URL**: إذا كان المسار المطلوب يفتقر إلى بادئة اللغة وكان التكوين يتطلب توجيهًا بالبادئة، فإن البرمجية الوسيطة تُرجع استجابة إعادة توجيه (302/307/308) إلى عنوان URL المناسب المسبوق بالبادئة.
3. **ملء سياق الطلب**: تحفظ اللغة المحددة الحالية في سياق طلب Remix باستخدام المفتاح `Intlayer`، مما يتيح للخطافات (`useLocale` و `useIntlayer` و `useDictionary`) استهلاكها مباشرة.
4. **إدارة ملفات تعريف الارتباط**: تُعيّن ترويسة `Set-Cookie` عند الحاجة إلى الاحتفاظ باللغة المفضلة للمستخدم.

## المستندات ذات الصلة

- [سياق الطلب `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/Intlayer.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)
