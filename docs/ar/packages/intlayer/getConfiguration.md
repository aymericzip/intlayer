---
docName: package__intlayer__getConfiguration
url: https://intlayer.org/doc/packages/intlayer/getConfiguration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getConfiguration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getConfiguration | intlayer
description: انظر كيف تستخدم دالة getConfiguration لحزمة intlayer
keywords:
  - getConfiguration
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# التوثيق: وظيفة `getConfiguration` في `intlayer`

## الوصف

وظيفة `getConfiguration` تسترجع التكوين الكامل لتطبيق `intlayer` عن طريق استخراج متغيرات البيئة. توفر هذه الوظيفة المرونة لاستخدام نفس التكوين على جانبي العميل والخادم، مما يضمن التناسق عبر التطبيق.

---

## المعلمات

لا تأخذ الوظيفة أي معلمات. بدلاً من ذلك، تستخدم متغيرات البيئة للتكوين.

### الإرجاع

- **النوع**: `IntlayerConfig`
- **الوصف**: كائن يحتوي على التكوين الكامل لـ `intlayer`. يشمل التكوين الأقسام التالية:

  - `internationalization`: الإعدادات المتعلقة باللغات ووضع الصرامة.
  - `middleware`: الإعدادات المتعلقة بإدارة الروابط وملفات تعريف الارتباط.
  - `content`: الإعدادات المتعلقة بملفات المحتوى، الأدلة، والأنماط.
  - `editor`: التكوينات الخاصة بالمحرر.

راجع [توثيق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من التفاصيل.

---

## مثال على الاستخدام

### استرجاع التكوين الكامل

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// الإخراج:
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
// الإخراج:
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
// الإخراج:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### استخراج `availableLocales` و `defaultLocale`

يوفر قسم `internationalization` من التكوين إعدادات متعلقة باللغات مثل `locales` (اللغات المتاحة) و `defaultLocale` (اللغة الافتراضية).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الإخراج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الإخراج: "en"
console.log(cookieName); // الإخراج: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الإخراج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الإخراج: "en"
console.log(cookieName); // الإخراج: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الإخراج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الإخراج: "en"
console.log(cookieName); // الإخراج: "INTLAYER_LOCALE"
```

## ملاحظات

- تأكد من تعيين جميع متغيرات البيئة المطلوبة بشكل صحيح قبل استدعاء هذه الوظيفة. ستتسبب المتغيرات المفقودة في حدوث أخطاء أثناء التهيئة.
- يمكن استخدام هذه الوظيفة على جانبي العميل والخادم، مما يجعلها أداة متعددة الاستخدامات لإدارة التكوينات بطريقة موحدة.

## الاستخدام في التطبيقات

وظيفة `getConfiguration` هي أداة أساسية لتهيئة وإدارة تكوين تطبيق `intlayer`. من خلال توفير الوصول إلى إعدادات مثل اللغات، الوسيط، وأدلة المحتوى، تضمن التناسق والقابلية للتوسع عبر التطبيقات متعددة اللغات والمحتوى.
