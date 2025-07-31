---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getConfiguration | intlayer
description: تعرف على كيفية استخدام دالة getConfiguration لحزمة intlayer
keywords:
  - getConfiguration
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getConfiguration
---

# التوثيق: دالة `getConfiguration` في `intlayer`

## الوصف

تقوم دالة `getConfiguration` باسترجاع التكوين الكامل لتطبيق `intlayer` عن طريق استخراج متغيرات البيئة. توفر هذه الدالة المرونة لاستخدام نفس التكوين على كل من جانب العميل والخادم، مما يضمن الاتساق عبر التطبيق.

---

## المعاملات

لا تأخذ الدالة أي معاملات. بدلاً من ذلك، تستخدم متغيرات البيئة للتكوين.

### القيم المرجعة

- **النوع**: `IntlayerConfig`
- **الوصف**: كائن يحتوي على التكوين الكامل لـ `intlayer`. يشمل التكوين الأقسام التالية:

  - `internationalization`: الإعدادات المتعلقة باللغات والوضع الصارم.
  - `middleware`: الإعدادات المتعلقة بإدارة عناوين URL وملفات تعريف الارتباط.
  - `content`: الإعدادات المتعلقة بملفات المحتوى، الأدلة، والأنماط.
  - `editor`: التكوينات الخاصة بالمحرر.

راجع [توثيق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من التفاصيل.

---

## مثال على الاستخدام

### استرجاع التكوين الكامل

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// المخرجات:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// المخرجات:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// المخرجات:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### استخراج `availableLocales` و `defaultLocale`

يوفر قسم `internationalization` في التكوين إعدادات متعلقة باللغات مثل `locales` (اللغات المتاحة) و `defaultLocale` (اللغة الافتراضية).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على المخرجات: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على المخرجات: "en"
console.log(cookieName); // المخرجات: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على المخرجات: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على المخرجات: "en"
console.log(cookieName); // المخرجات: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على المخرجات: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على المخرجات: "en"
console.log(cookieName); // المخرجات: "INTLAYER_LOCALE"
```

## ملاحظات

- تأكد من تعيين جميع متغيرات البيئة المطلوبة بشكل صحيح قبل استدعاء هذه الدالة. المتغيرات المفقودة ستؤدي إلى حدوث أخطاء أثناء التهيئة.
- يمكن استخدام هذه الدالة على جانب العميل والخادم على حد سواء، مما يجعلها أداة متعددة الاستخدامات لإدارة التكوينات بطريقة موحدة.

## الاستخدام في التطبيقات

تُعد دالة `getConfiguration` أداة أساسية لتهيئة وإدارة تكوين تطبيق `intlayer`. من خلال توفير الوصول إلى إعدادات مثل اللغات، والوسائط الوسيطة، ودلائل المحتوى، تضمن هذه الدالة الاتساق وقابلية التوسع عبر التطبيقات متعددة اللغات والمعتمدة على المحتوى.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
