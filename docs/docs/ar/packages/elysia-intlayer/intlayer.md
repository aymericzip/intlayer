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

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    ar: "مرحبًا",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

نفس الدوال المساعدة متاحة كصادرات مستقلة، بحيث يمكنك استدعاؤها دون تفكيك سياق المسار:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ar: "مرحبًا",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## الوصف

يقوم المكوّن الإضافي بالمهام التالية:

1. **كشف الـ locale**: يقرأ الـ locale الذي حدده العميل صراحةً من التخزين (كوكي، هيدر)، ثم يعود إلى الـ locale المتفاوض عليه من هيدر `Accept-Language`.
2. **الحقن في السياق**: يضيف خاصية `intlayer` إلى سياق المسار في Elysia، تحتوي على:
   - `locale`: الـ locale المستخدم لهذا الطلب، مع أولوية `locale_storage` على `locale_detected`.
   - `locale_storage`: الـ locale الذي طلبه العميل صراحةً عبر كوكي أو هيدر.
   - `locale_detected`: الـ locale المتفاوض عليه من رؤوس الطلب.
   - `defaultLocale`: الـ locale المُعد كخيار احتياطي في `intlayer.config.ts`.
   - `t`: دالة ترجمة.
   - `getIntlayer`: دالة لاسترجاع القواميس عبر المفتاح.
   - `getDictionary`: دالة لمعالجة كائنات القواميس.
3. **إدارة السياق**: يستخدم `AsyncLocalStorage` لإدارة سياق غير متزامن، مما يسمح لدوال Intlayer العامة (`t`، `getIntlayer`، `getDictionary`) بالوصول إلى الـ locale الخاص بكل طلب دون تمرير كائن السياق.

> على عكس مكوّنات Intlayer المبنية على Node، يعتمد `elysia-intlayer` على `AsyncLocalStorage` بدلًا من `cls-hooked`، لأن `cls-hooked` يعتمد على `async_hooks.createHook` الذي لا يطبّقه Bun.

يتم تحرير سياق الطلب بمجرد تعيين الاستجابة، بحيث لا تُحلّ الدوال المساعدة المستقلة أبدًا مقابل طلب انتهى بالفعل. وعند استدعائها خارج طلب يعالجه المكوّن، تعود إلى الـ locale الافتراضي المُعد.

## الإعداد

يقرأ المكوّن ملف `intlayer.config.ts` الخاص بك. يمكنك تخصيص الكوكي والهيدر المستخدمين لكشف الـ locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> لمزيد من المعلومات حول الإعداد، تفضّل بزيارة [توثيق الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).
