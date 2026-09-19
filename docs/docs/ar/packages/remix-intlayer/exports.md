---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: توثيق حزمة remix-intlayer
description: توثيق صادرات حزمة remix-intlayer التي توفر التدويل (i18n) لتطبيقات Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي لصادرات remix-intlayer"
author: aymericzip
---

# حزمة remix-intlayer

توفر حزمة `remix-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Remix 3. وتتضمن برمجية وسيطة (middleware) لاكتشاف لغة الطلب، والوصول إلى سياق الطلب، وخطافات (hooks) لجلب القواميس وإدارة اللغات.

## التثبيت

```bash
npm install remix-intlayer
```

## صادرات الحزمة

### البرمجيات الوسيطة (Middleware)

| التصدير    | النوع             | الوصف                                                                                | المستند المرتبط                                                                                                                          |
| ---------- | ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | دالة برمجية وسيطة | برمجية وسيطة لـ Remix 3 تكتشف لغة الطلب وتدير عمليات إعادة التوجيه وتملأ سياق الطلب. | [البرمجية الوسيطة intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md) |

### تخزين السياق

| التصدير    | النوع                        | الوصف                                                                                           | المستند المرتبط                                                                                                    |
| ---------- | ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Intlayer` | مفتاح RequestContext / تخزين | مفتاح سياق الطلب المستخدم لاسترداد حالة Intlayer من سياق طلب Remix 3 (`context.get(Intlayer)`). | [سياق Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/Intlayer.md) |

### الخطافات (Hooks)

| التصدير         | النوع | الوصف                                                                                   | المستند المرتبط                                                                                                              |
| --------------- | ----- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | خطاف  | يجلب محتوى القاموس ويعالجه للمفتاح المحدد وفقًا للغة الطلب الحالية.                     | [خطاف useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | خطاف  | يُرجع محتوى كائن قاموس تم استيراده مسبقًا والمطابق للغة الطلب الحالية.                  | [خطاف useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | خطاف  | يوفر الوصول إلى لغة الطلب الحالية، واللغة الافتراضية، وقائمة اللغات المتاحة في المشروع. | [خطاف useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)         |

## البدء السريع

### تكوين الموجه مع البرمجية الوسيطة

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### استخدام المحتوى في المكونات والقوالب

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
