---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق مكوّن Vite الخاص بـ intlayer | vite-intlayer
description: اطلع على كيفية استخدام مكوّن intlayer لحزمة vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "تهيئة المستند"
author: aymericzip
---

# توثيق مكوّن Vite الخاص بـ intlayer

يقوم مكوّن Vite `intlayer` بدمج إعدادات Intlayer في عملية البناء. يتعامل مع اختصارات القواميس (dictionary aliases)، ويشغّل مراقب القواميس في وضع التطوير، ويجهّز القواميس للبناء.

## الاستخدام

```ts
// ملف vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## الخيارات

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` يوسع `GetConfigurationOptions` (انظر `@intlayer/config`) مع الحقول الإضافية التالية:

| الخيار          | النوع                           | القيمة الافتراضية | الوصف                                                                                                                           |
| --------------- | ------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`              | أنماط استدعاء إضافية لحزم compat-adapter (مثل `@intlayer/react-i18next`). يتم تمريرها إلى محلل استخدام الحقول في وقت البناء.    |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined`       | خيارات يتم تمريرها إلى وكيل توجيه المنطقة المرفقة. استخدم `ignore` لاستبعاد المسارات المحددة (مثل مسارات API) من توجيه المنطقة. |

يتم تمرير جميع الخيارات الأخرى (`override`, `configFile`, …) مباشرة إلى `getConfiguration()`.

### أمثلة

#### تجاهل مسارات API من توجيه اللغة

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### مع مسار ملف config مخصص

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### مع استدعاءات compat-adapter

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## ما يفعله البرنامج الإضافي

### 1. تحضير القاموس

قبل بدء البناء (وكل ساعة واحدة في بيئة التطوير)، يستدعي `intlayer` الدالة `prepareIntlayer` لترجمة جميع ملفات `.content.ts` إلى قواميس JSON محسنة مخزنة في `.intlayer/`.

### 2. أسماء مستعارة للوحدات

يضيف البرنامج الإضافي أسماء مستعارة لحل Vite بحيث يتم حل `import { myDict } from 'intlayer/dictionaries/my-dict'` إلى ملف JSON مترجم على القرص. تستخدم عمليات بناء SSR `ssr.noExternal` للتأكد من أن جميع حزم `@intlayer/*` موجودة مع تطبيق الأسماء المستعارة.

### 3. مراقب خادم التطوير

في وضع التطوير، يتم بدء مراقب `chokidar`. عند تغيير ملف `.content.ts`، يتم إعادة تجميع القواميس وينتشر تحديث Vite's HMR إلى المتصفح.

### 4. وسيط توجيه المنطقة المدمج (v9+)

منذ إصدار Intlayer v9، يتم تسجيل middleware `intlayerProxy` تلقائياً داخل `intlayer()`. يتعامل مع:

- كشف المنطقة من بادئة URL والكوكيز ورأس `Accept-Language`.
- إعادة توجيه 301 عندما لا تتطابق المنطقة المكتشفة مع عنوان URL الحالي.
- إعادة كتابة URL داخلية بحيث يرى الإطار معامل المسار `[locale]` الصحيح.

يتم التحكم في الوسيط بواسطة `routing.enableProxy` (الافتراضي `true`) في إعدادات Intlayer الخاصة بك. لتعطيله بالكامل:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

لتخصيص سلوك الوسيط دون استدعاء `intlayerProxy()` منفصل، مرر خيارات `proxy` إلى المكون الإضافي الرئيسي:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

راجع [وثائق intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerProxy.md) للحصول على مرجع سلوك التوجيه الكامل.

### 5. مجمِّع مرفق (v9+)

عندما يكون `compiler.enabled` هو `true` **و** يتم تعيين `compiler.output` في إعدادات Intlayer الخاصة بك، يسجل `intlayer()` `intlayerCompiler` تلقائياً. يستخرج المجمِّع إعلانات المحتوى المضمنة المكتوبة مباشرة داخل ملفات المكونات ويكتبها إلى القواميس في وقت التحويل. انظر [وثائق intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerCompiler.md).

### 6. تحسينات البناء

أثناء بناء الإنتاج، تضيف الإضافة:

- **intlayerOptimize** – تحويل Babel الذي يعيد كتابة `useIntlayer('key')` → `useDictionary(hash)` وحقن واردات JSON المباشرة.
- **intlayerPrune** – يزيل حقول المحتوى غير المستخدمة من قاموس JSON.
- **intlayerMinify** – يضغط قاموس JSON ويمكن أن يعيد تسمية أسماء الحقول اختياريًا.

هذه غير نشطة في وضع التطوير.

## الأسماء المستعارة المهجورة

| الصادرات المهجورة | البديل     |
| ----------------- | ---------- |
| `intlayerPlugin`  | `intlayer` |
| `intLayerPlugin`  | `intlayer` |
