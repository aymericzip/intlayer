---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: توثيق خطاف useIntlayer | remix-intlayer
description: تعرّف على كيفية استخدام خطاف useIntlayer في تطبيقات Remix 3 للوصول إلى المحتوى المترجم حسب المفتاح.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي لخطاف useIntlayer"
author: aymericzip
---

# توثيق خطاف useIntlayer

يتيح لك خطاف `useIntlayer` استرداد المحتوى المترجم من قاموس Intlayer حسب المفتاح في تطبيقات Remix 3.

يقوم تلقائيًا بقراءة اللغة النشطة من سياق الطلب الحالي (عبر `AsyncLocalStorage`)، لذلك لا تحتاج إلى تمرير اللغة يدويًا عبر معالجات المسارات أو قوالب العرض أو المكونات.

## الاستخدام

### في معالجات المسارات

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### في قوالب العرض والمكونات

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## المعاملات

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: المفتاح الفريد للقاموس (كما هو محدد في ملفات تعريف `.content.ts`).
2. **`localeOrSelector`** (اختياري): لغة محددة أو كائن محدد (`{ item }`، `{ variant }`، مع `locale` اختياريًا). عند تمريره، فإنه يتجاوز اللغة المكتشفة من سياق الطلب.

## الوصف

يقوم الخطاف بتنفيذ المهام التالية:

1. **اكتشاف لغة السياق**: يكتشف اللغة الحالية من نطاق `AsyncLocalStorage` المرتبط بالطلب والذي أنشأته البرمجية الوسيطة `intlayer()`.
2. **جلب القاموس**: يسترد القاموس المترجم مسبقًا المطابق للمفتاح المقدم.
3. **معالجة الترجمات**: يحل الترجمات والتعدادات وعناصر markdown والمحتوى المشروط للغة المحددة.
4. **معالجة الاحتياط (Fallback)**: إذا تم استدعاؤه خارج سياق طلب HTTP نشط (مثل المهام الخلفية أو اختبارات الوحدة بدون برمجية وسيطة)، فإنه يرجع تلقائيًا وبأمان إلى `defaultLocale` المكون.

## المستندات ذات الصلة

- [البرمجية الوسيطة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md)
- [خطاف `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useDictionary.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)
