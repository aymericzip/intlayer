---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: توثيق إضافي لـ intlayerCompiler Vite | vite-intlayer
description: إضافة Vite التي تستخرج إعلانات محتوى Intlayer المضمنة من ملفات المكونات وتكتبها في ملفات JSON للقاموس في وقت البناء/التحويل.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compiler
  - content
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "مدمج في intlayer()؛ بدء التوثيق"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` هو عبارة عن إضافة لـ Vite يقوم بفحص ملفات المكونات البرمجية بحثًا عن **إعلانات محتوى Intlayer المضمنة** — وهو المحتوى المعرف مباشرة داخل المكون بدلاً من ملف منفصل `.content.ts` — ويكتبها في ملفات قاموس JSON خلال مرحلة التحويل (transform).

> **بدءاً من إطلاق Intlayer v9** يتم تضمين `intlayerCompiler` تلقائيًا داخل الإضافة الأساسية [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md) عندما يكون كل من `compiler.enabled` هو `true` وتحديد مسار المخرجات `compiler.output` في إعدادات Intlayer الخاصة بك. تحتاج فقط إلى تسجيلها بشكل منفصل إذا كنت تريد التحكم الكامل في إعدادات المترجم المحددة.

## الاستخدام

### كجزء من `intlayer()` (موصى به، الإصدار 9+)

قم بتمكين المترجم (compiler) من خلال إعدادات Intlayer الخاصة بك:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // أين يتم كتابة القواميس المستخرجة
  },
});
```

ثم استخدم الإضافة القياسية بدون تسجيل إضافي:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### منفصل (عند الحاجة)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## الخيارات

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| الخيار           | النوع                     | الوصف                                                                           |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | تجاوزات إعدادات Intlayer التي يتم تمريرها إلى `getConfiguration()`.             |
| `compilerConfig` | `Partial<CompilerConfig>` | تجاوزات لقسم الإعدادات الخاص بالمترجم (مثل `enabled` و `output` و `filesList`). |

### مثال

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## كيف يعمل

### مرحلة التحويل (Transform phase)

لكل ملف مصدر يطابق `compiler.filesList` ، تقوم إضافة المترجم بـ:

1. تمرير محتوى الملف عبر دالة `extractContent` من الحزمة `@intlayer/babel`.
2. استدعاء `onExtract` لكل إعلان يتم العثور عليه، والذي يقوم بكتابة قاموس JSON الناتج إلى `compiler.output`.
3. إرجاع الكود المصدري المحول مع استبدال الإعلانات المضمنة باستدعاءات قياسية مثل `useIntlayer('key')` / `getIntlayer('key')`.

أنواع الملفات المدعومة: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### تحديث الوحدات الساخن HMR (Hot Module Replacement)

عندما يتم حفظ ملف مكون في وضع التطوير، يقوم المترجم بـ:

1. الكشف عن تغيير الملف عبر خطاف `handleHotUpdate` الخاص بـ Vite.
2. إعادة استخراج المحتوى من الملف المحدث.
3. كتابة قاموس JSON المحدث.
4. تحفيز إعادة تحميل الصفحة بالكامل (`server.ws.send({ type: 'full-reload' })`).

يمنع مؤقت debounce بمقدار 500 مللي ثانية عملية كتابة القاموس نفسها (التي تؤدي أيضًا إلى حدث تغيير الملف) من التسبب في حلقة لا نهائية لإعادة الاستخراج.

### إزالة التكرار (Deduplication)

يستخدم `intlayerCompiler` نفس آلية إزالة التكرار `createPrimaryInstanceGuard` المستخدمة في الإضافات المدمجة الأخرى. عندما يتواجد كل من `intlayer()` (الذي يتضمن المترجم) واستدعاء يدوي لـ `intlayerCompiler()` ، يتم تشغيل المثيل الأول المسجل فقط — ولا يتم كتابة أي قواميس مرتين.
