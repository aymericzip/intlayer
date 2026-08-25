---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: توثيق مكوّن intlayer لـ Elysia | elysia-intlayer
description: تعرّف على كيفية استخدام المكوّن intlayer من حزمة elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - التدويل
  - التوثيق
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "تهيئة التوثيق"
author: aymericzip
---

# توثيق مكوّن intlayer لـ Elysia

يقوم المكوّن `intlayer` لـ Elysia باكتشاف الـ locale الخاص بالمستخدم ويحقن كائن `intlayer` في سياق المسار (route context). كما يتيح استخدام دوال الترجمة العامة ضمن سياق الطلب.

## الاستخدام

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    ar: "مرحبًا",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> تسجّل الإضافة سياقها عبر `derive` **عام**، والذي يعطيه Elysia النوع `Partial<{ intlayer: IntlayerContext }>`. تكون القيمة موجودة دائماً وقت التشغيل للمسارات المسجَّلة بعد `.use(intlayer())`، لذا استخدم تأكيد عدم الفراغ (`intlayer!.t`) — أو التسلسل الاختياري — لإرضاء TypeScript في الوضع `strict`.

نفس الدوال المساعدة متاحة كصادرات مستقلة، بحيث يمكنك استدعاؤها دون تفكيك سياق المسار:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ar: "مرحبًا",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## الوصف

يقوم المكوّن الإضافي بالمهام التالية:

1. **كشف الـ locale**: يقرأ الـ locale الذي حدده العميل صراحةً من التخزين (كوكي، هيدر)، ثم يعود إلى الـ locale المتفاوض عليه من هيدر `Accept-Language`.
2. **الحقن في السياق**: تضيف خاصية `intlayer` إلى سياق المسار في Elysia (انظر جدول سياق المسار أدناه).
3. **إدارة السياق**: يستخدم `AsyncLocalStorage` لإدارة سياق غير متزامن، مما يسمح لدوال Intlayer العامة (`t`، `getIntlayer`، `getDictionary`) بالوصول إلى الـ locale الخاص بكل طلب دون تمرير كائن السياق.
4. **تجهيز القواميس**: تستدعي `prepareIntlayer` عند إنشاء الإضافة، بحيث تُبنى القواميس عند إقلاع التطبيق.

### سياق المسار

| الخاصية           | النوع                  | الوصف                                                                             |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | الـ locale المستخدم لهذا الطلب، مع أولوية `locale_storage` على `locale_detected`. |
| `locale_storage`  | `Locale` (اختياري)     | الـ locale الذي طلبه العميل صراحةً عبر كوكي أو هيدر.                              |
| `locale_detected` | `Locale`               | الـ locale المتفاوض عليه من رؤوس الطلب.                                           |
| `defaultLocale`   | `Locale`               | الـ locale المُعد كخيار احتياطي في `intlayer.config.ts`.                          |
| `t`               | `TranslateFunction`    | دالة ترجمة.                                                                       |
| `getIntlayer`     | `typeof getIntlayer`   | دالة لاسترجاع القواميس عبر المفتاح.                                               |
| `getDictionary`   | `typeof getDictionary` | دالة لمعالجة كائنات القواميس.                                                     |

> على عكس مكوّنات Intlayer المبنية على Node، يعتمد `elysia-intlayer` على `AsyncLocalStorage` بدلًا من `cls-hooked`، لأن `cls-hooked` يعتمد على `async_hooks.createHook` الذي لا يطبّقه Bun.

يتم تحرير سياق الطلب بمجرد تعيين الاستجابة، بحيث لا تُحلّ الدوال المساعدة المستقلة أبدًا مقابل طلب انتهى بالفعل. وعند استدعائها خارج طلب يعالجه المكوّن، تعود إلى الـ locale الافتراضي المُعد.

## ترتيب تحديد اللغة

بشكل افتراضي، تحلّ الإضافة اللغة بالترتيب التالي:

1. كوكي `INTLAYER_LOCALE`.
2. ترويسة `x-intlayer-locale`.
3. التفاوض عبر ترويسة `Accept-Language`.
4. قيمة `defaultLocale` المُعدّة.

```bash
# تم التفاوض عليها من `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# للكوكي أولوية على `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# للترويسة أولوية على `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## الإعداد

يقرأ المكوّن ملف `intlayer.config.ts` الخاص بك. يمكنك تخصيص الكوكي والهيدر المستخدمين لكشف الـ locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> لمزيد من المعلومات حول الإعداد، تفضّل بزيارة [توثيق الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## وثائق ذات صلة

- [وثائق حزمة elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/elysia-intlayer/exports.md)
- [Elysia i18n - دليل شامل لترجمة تطبيقك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_elysia.md)
