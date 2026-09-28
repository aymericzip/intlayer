---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

# توثيق البرمجية الوسيطة intlayer لـ Remix 3

تدير البرمجية الوسيطة `intlayer` لـ Remix 3 طبقة التدويل في جميع أنحاء تطبيقك. وهي مبنية على معايير الويب (`Request` و `Response`)، وتتولى توجيه اللغات (عمليات إعادة التوجيه وإعادة الكتابة الداخلية)، وتكتشف لغة الطلب، وتحفظها في ملفات تعريف الارتباط والترويسات، وتنشئ نطاق `AsyncLocalStorage` بحيث تتمكن المعالجات والمكونات اللاحقة من الوصول إلى الترجمات دون تمرير الخصائص (props) عبر المستويات.

## الاستخدام

سجّل البرمجية الوسيطة `intlayer` عند تهيئة موجه Remix 3 الخاص بك:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// يخدم `/` و `/fr` و `/es`، ويتم تحديد اللغة من الطلب
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## الوصف

تؤدي البرمجية الوسيطة `intlayer` المهام التالية:

1. **تحضير القواميس**: تُشغّل `prepareIntlayer` عند بدء التشغيل لضمان بناء جميع القواميس المُولَّدة وتوفرها.
2. **توجيه اللغات**: تقيّم الطلب وفقًا لاستراتيجية التوجيه المكوّنة (`prefix_always` و `prefix_as_needed` و `no_prefix`):
   - **عمليات إعادة التوجيه**: إذا زار المستخدم `/about` وكان يجب توجيهه إلى بادئة لغة (مثل `/fr/about`)، فإن البرمجية الوسيطة تُصدر استجابة إعادة توجيه مع ترويسات `location` و `Set-Cookie` المناسبة.
   - **إعادة الكتابة الداخلية**: عندما يصل المستخدم إلى `/fr/about`، تتم إعادة كتابة عنوان URL داخليًا بحيث يطابق معالج المسار الخاص بك `/about`، بينما يتم التقاط اللغة المحددة على أنها `fr`.
   - **أسماء URL المستعارة المترجمة**: تحترم قواعد إعادة كتابة URL المحددة في `intlayer.config.ts` (مثل إعادة كتابة `/fr/about` إلى `/fr/a-propos`).
3. **تحديد اللغة**: تكتشف اللغة النشطة بناءً على بادئة URL أو ملفات تعريف الارتباط المحفوظة أو الترويسات المخصصة أو تفضيلات المتصفح عبر `Accept-Language`.
4. **حقن السياق**:
   - ترفق `IntlayerState` (`locale` و `defaultLocale` و `availableLocales`) بـ `RequestContext` الخاص بـ Remix تحت المفتاح `Intlayer` وفي `context.intlayer`.
   - تُشغّل بقية الطلب داخل نطاق `AsyncLocalStorage` (`requestStorage`)، مما يتيح استدعاء `useIntlayer` و `useDictionary` و `useLocale` بسلاسة في المعالجات والعروض والمكونات.
5. **الحفظ**: ترفق ترويسات وملفات تعريف ارتباط اللغة الصادرة بالاستجابة النهائية لـ HTTP للاحتفاظ بتفضيل المستخدم.

## المعاملات

تقبل الدالة `intlayer` خيارات `IntlayerMiddlewareOptions` اختيارية:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // تجاوزات مخصصة لإعدادات التوجيه
};

const middleware = intlayer(options);
```

## الوصول إلى السياق مباشرةً

بالإضافة إلى استخدام الخطافات، يمكنك الوصول إلى `IntlayerState` المحددة مباشرةً من سياق طلب Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // عبر context.get()
  const state = context.get(Intlayer);

  // أو عبر الخاصية المباشرة context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## المستندات ذات الصلة

- [سياق الطلب `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/Intlayer.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)
