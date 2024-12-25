# Documentation: `getConfiguration` Function in `intlayer`

## الوصف:

تسترجع دالة `getConfiguration` التكوين الكامل لتطبيق `intlayer` من خلال استخراج متغيرات البيئة. توفر هذه الدالة المرونة لاستخدام نفس التكوين على كلا الجانبين، العميل والخادم، مما يضمن التناسق عبر التطبيق.

---

## المعلمات:

لا تأخذ الدالة أي معلمات. بدلاً من ذلك، تستخدم متغيرات البيئة للتكوين.

### العائدات:

- **النوع**: `IntlayerConfig`
- **الوصف**: كائن يحتوي على التكوين الكامل لـ `intlayer`. يتضمن التكوين الأقسام التالية:

  - `internationalization`: إعدادات متعلقة باللغات ووضع الصرامة.
  - `middleware`: إعدادات متعلقة بإدارة URL وملفات الكوكيز.
  - `content`: إعدادات متعلقة بملفات المحتوى، الأدلة، والأنماط.
  - `editor`: تكوينات محددة للمحرر.

راجع [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من التفاصيل.

---

## مثال على الاستخدام:

### استرجاع التكوين الكامل:

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

### استخراج `availableLocales` و `defaultLocale`:

يوفر قسم `internationalization` من التكوين إعدادات متعلقة باللغات مثل `locales` (اللغات المتاحة) و `defaultLocale` (اللغة الافتراضية).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

// استرجاع الإعدادات المعنية
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الإخراج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الإخراج: "en"
console.log(cookieName); // الإخراج: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

// استرجاع الإعدادات المعنية
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الإخراج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الإخراج: "en"
console.log(cookieName); // الإخراج: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

// استرجاع الإعدادات المعنية
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الإخراج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الإخراج: "en"
console.log(cookieName); // الإخراج: "INTLAYER_LOCALE"
```

## ملاحظات:

- تأكد من إعداد جميع متغيرات البيئة المطلوبة بشكل صحيح قبل استدعاء هذه الدالة. ستؤدي المتغيرات المفقودة إلى أخطاء أثناء التهيئة.
- يمكن استخدام هذه الدالة على كلا الجانبين، العميل والخادم، مما يجعلها أداة متعددة الاستخدامات لإدارة التكوينات بطريقة موحدة.

## الاستخدام في التطبيقات:

تعتبر دالة `getConfiguration` أداة أساسية لت初始化 وإدارة تكوين تطبيق `intlayer`. من خلال تقديم الوصول إلى إعدادات مثل اللغات، والوسائط، وأدلة المحتوى، تضمن التناسق وقابلية التوسع عبر التطبيقات المتعددة اللغات والمحتوى.
