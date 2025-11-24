---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: توثيق دالة getPrefix | intlayer
description: تعرف على كيفية استخدام دالة getPrefix لحزمة intlayer
keywords:
  - getPrefix
  - prefix
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: التوثيق الأولي
---

# التوثيق: دالة `getPrefix` في `intlayer`

## الوصف

تقوم دالة `getPrefix` بتحديد بادئة URL للغة معينة بناءً على إعدادات وضع التوجيه. تقارن اللغة مع اللغة الافتراضية وتعيد كائن يحتوي على ثلاثة تنسيقات مختلفة للبادئة لتوفير مرونة في بناء عناوين URL.

**الميزات الرئيسية:**

- تأخذ اللغة كمعامل أول (مطلوب)
- كائن `options` اختياري يحتوي على `defaultLocale` و `mode`
- تعيد كائن يحتوي على خصائص `prefix` و `localePrefix`
- تدعم جميع أوضاع التوجيه: `prefix-no-default`، `prefix-all`، `no-prefix`، و `search-params`
- أداة خفيفة لتحديد متى يجب إضافة بادئات اللغة

---

## توقيع الدالة

```typescript
getPrefix(
  locale: Locales,               // مطلوب
  options?: {                    // اختياري
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // مثال: 'fr/' أو ''
  localePrefix?: Locale; // مثال: 'fr' أو undefined
}
```

---

## المعاملات

- `locale: Locales`
  - **الوصف**: اللغة التي سيتم توليد البادئة لها. إذا كانت القيمة خاطئة (undefined، null، سلسلة فارغة)، تُرجع الدالة سلسلة فارغة.
  - **النوع**: `Locales`
  - **مطلوب**: نعم

- `options?: object`
  - **الوصف**: كائن التهيئة لتحديد البادئة.
  - **النوع**: `object`
  - **مطلوب**: لا (اختياري)

  - `options.defaultLocale?: Locales`
    - **الوصف**: اللغة الافتراضية للتطبيق. إذا لم يتم توفيرها، يتم استخدام اللغة الافتراضية المهيأة في تكوين المشروع الخاص بك.
    - **النوع**: `Locales`
    - **الافتراضي**: [`تكوين المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **الوصف**: وضع توجيه URL لمعالجة اللغة. إذا لم يتم توفيره، يستخدم الوضع المهيأ في تكوين المشروع الخاص بك.
    - **النوع**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **الافتراضي**: [`تكوين المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)
    - **الأوضاع**:
      - `prefix-no-default`: يعيد سلاسل فارغة عندما تتطابق اللغة مع اللغة الافتراضية
      - `prefix-all`: يعيد بادئة لجميع اللغات بما في ذلك الافتراضية
      - `no-prefix`: يعيد سلاسل فارغة (لا توجد بادئة في عناوين URL)
      - `search-params`: يعيد سلاسل فارغة (اللغة في معلمات الاستعلام)

### Returns

- **النوع**: `GetPrefixResult`
- **الوصف**: كائن يحتوي على ثلاثة تنسيقات مختلفة للبادئة:
  - `prefix`: بادئة المسار مع شرطة مائلة في النهاية (مثال: `'fr/'`، `''`)
  - `localePrefix`: معرف اللغة بدون شرطات مائلة (مثال: `'fr'`، `undefined`)

---

## مثال على الاستخدام

### الاستخدام الأساسي

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// تحقق من البادئة للغة الإنجليزية
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// يعيد: { prefix: 'en/', localePrefix: 'en' }

// تحقق من البادئة للغة الفرنسية
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// يعيد: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// يعيد: { prefix: '', localePrefix: undefined }
```

### أوضاع التوجيه المختلفة

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: يعيد البادئة دائمًا
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// يعيد: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: لا يعيد بادئة عندما تتطابق اللغة مع الافتراضية
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// يعيد: { prefix: '', localePrefix: undefined }

// prefix-no-default: يعيد البادئة عندما تختلف اللغة عن اللغة الافتراضية
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// يعيد: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: لا يعيد البادئة أبدًا
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// يعيد: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// يعيد: { prefix: '', localePrefix: undefined }
```

### مثال عملي

```typescript
import { getPrefix, Locales } from "intlayer";

// بناء عناوين URL مع البادئة المناسبة للغة معينة
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// استخدام البادئة لبناء المسار
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// النتيجة: "/fr/about"

// استخدام localePrefix لتحديد اللغة
console.log(`Current locale: ${localePrefix}`);
// المخرجات: "Current locale: fr"
```

---

## الدوال المرتبطة

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md): ينشئ عنوان URL محلي للغة معينة
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getMultilingualUrls.md): ينشئ عناوين URL لجميع اللغات المكونة

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // بادئة المسار مع الشرطة المائلة النهائية (مثلاً 'fr/' أو '')
  localePrefix?: Locale; // معرف اللغة بدون شرطات مائلة (مثلاً 'fr' أو غير معرف)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
