---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: وثائق حزمة elysia-intlayer
description: مُكون إضافي لـ Elysia لـ Intlayer يوفر دوال ترجمة واكتشاف اللغة.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "توثيق موحّد لجميع الصادرات"
author: aymericzip
---

# حزمة elysia-intlayer

توفر حزمة `elysia-intlayer` ملحقًا لتطبيقات Elysia للتعامل مع التدويل (internationalization). تقوم باكتشاف الـ locale الخاص بالمستخدم وتحقن كائن `intlayer` في سياق المسار.

## التثبيت

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` هي peer dependency (`>=1.0.0`). ويستهدف Elysia بيئة تشغيل **Bun**.

## الصادرات

### الملحق

استيراد:

```ts
import { intlayer } from "elysia-intlayer";
```

| الدالة     | الوصف                                                                                                                                                                                                                                                                 | الوثيقة ذات الصلة                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | ملحق Elysia يدمج Intlayer في تطبيق Elysia الخاص بك. يتولى اكتشاف الـ locale من التخزين (الكوكيز، الرؤوس) ثم من `Accept-Language`، ويحقن كائن `intlayer` يعرض `locale` و`t` و`getIntlayer` و`getDictionary` في سياق المسار، ويهيّئ سياق الطلب عبر `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/elysia-intlayer/intlayer.md) |

### الوظائف

استيراد:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| الدالة          | الوصف                                                                                                                                                                                                                    | الوثيقة ذات الصلة                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | دالة ترجمة عامة تسترجع المحتوى للـ locale الحالي في Elysia. تستخدم `AsyncLocalStorage` للوصول إلى سياق الطلب الذي يهيّئه المكوّن `intlayer`، وتعود إلى اللغة الافتراضية خارجه. يمكن الوصول إليها أيضًا عبر `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md) |
| `getIntlayer`   | يسترجع قاموسًا عبر مفتاحه من التصريح المُولَّد ويعيد محتواه للـ locale الحالي. نسخة محسّنة من `getDictionary`. يستخدم `AsyncLocalStorage` للوصول إلى سياق الطلب. يمكن الوصول إليه أيضًا عبر `intlayer.getIntlayer`.      | -                                                                                                      |
| `getDictionary` | يعالج كائنات القواميس ويعيد المحتوى للـ locale الحالي. يعالج ترجمات `t()` والتعدادات وmarkdown وHTML وغيرها. يستخدم `AsyncLocalStorage` للوصول إلى سياق الطلب. يمكن الوصول إليه أيضًا عبر `intlayer.getDictionary`.      | -                                                                                                      |

### الأنواع

استيراد:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| النوع               | الوصف                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | شكل كائن `intlayer` المحقون في كل سياق مسار: `locale`، `locale_storage`، `locale_detected`، `defaultLocale`، `t`، `getIntlayer`، `getDictionary`. |
| `TranslateFunction` | توقيع دالة الترجمة التي تحوّل locale map إلى المحتوى المطابق للـ locale الخاص بالطلب الحالي.                                                      |

## الاستخدام

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // تحميل إضافة التدويل
  .use(intlayer())
  // قراءة اللغة والدوال المساعدة من سياق المسار
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      ar: "مرحبًا",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // أو استخدام الدوال المساعدة المستقلة، المرتبطة بالطلب الحالي
  .get("/t_example", () =>
    t({
      ar: "مثال على المحتوى المرجع باللغة العربية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> تسجّل الإضافة سياقها عبر `derive` **عام**، والذي يعطيه Elysia النوع `Partial<{ intlayer: IntlayerContext }>`. تكون القيمة موجودة دائماً وقت التشغيل للمسارات المسجَّلة بعد `.use(intlayer())`، لذا استخدم تأكيد عدم الفراغ (`intlayer!.locale`) — أو التسلسل الاختياري — لإرضاء TypeScript في الوضع `strict`.

## وثائق ذات صلة

- [Elysia i18n - دليل شامل لترجمة تطبيقك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_elysia.md)
- [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
