# الوثائق: دالة `getConfiguration` في `intlayer`

## الوصف:

تسترجع دالة `getConfiguration` الإعدادات الكاملة لتطبيق `intlayer` من خلال استخراج متغيرات البيئة. توفر هذه الدالة المرونة لاستخدام نفس الإعدادات على كلا الجانبين، العميل والخادم، مما يضمن التناسق عبر التطبيق.

---

## المعلمات:

لا تأخذ الدالة أي معلمات. بدلاً من ذلك، تستخدم متغيرات البيئة للإعدادات.

### الإرجاع:

- **النوع**: `IntlayerConfig`
- **الوصف**: كائن يحتوي على الإعدادات الكاملة لـ `intlayer`. تتضمن الإعدادات الأقسام التالية:

  - `internationalization`: الإعدادات المتعلقة باللغات ووضع التشغيل الصارم.
  - `middleware`: الإعدادات المتعلقة بإدارة عناوين URL وملفات تعريف الارتباط.
  - `content`: الإعدادات المتعلقة بملفات المحتوى، الدلائل، والأنماط.
  - `editor`: إعدادات محددة للمحرر.

انظر [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من التفاصيل.

---

## مثال على الاستخدام:

### استرجاع الإعدادات الكاملة:

```typescript
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// الناتج:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### استخراج `availableLocales` و `defaultLocale`:

يوفر القسم `internationalization` من الإعدادات إعدادات متعلقة باللغات مثل `locales` (اللغات المتاحة) و `defaultLocale` (اللغة الافتراضية).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // مثال على الناتج: ["en", "fr", "es"]
console.log(defaultLocale); // مثال على الناتج: "en"
console.log(cookieName); // الناتج: "INTLAYER_LOCALE"
```

## ملاحظات:

- تأكد من تعيين جميع متغيرات البيئة المطلوبة بشكل صحيح قبل استدعاء هذه الدالة. سيتسبب نقص المتغيرات في حدوث أخطاء أثناء التهيئة.
- يمكن استخدام هذه الدالة على كلا الجانبين، العميل والخادم، مما يجعلها أداة متعددة الاستخدامات لإدارة الإعدادات بطريقة موحدة.

## الاستخدام في التطبيقات:

تعتبر دالة `getConfiguration` أداة أساسية لتهيئة وإدارة إعدادات تطبيق `intlayer`. من خلال توفير الوصول إلى إعدادات مثل اللغات، وواجهة البرمجة، ومجلدات المحتوى، تضمن التناسق والقابلية للتوسع عبر التطبيقات متعددة اللغات والمحتوى.
