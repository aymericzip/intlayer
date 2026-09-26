---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: توثيق حزمة vite-intlayer
description: ملحق Vite لـ Intlayer، يوفر aliases للقواميس وwatchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "تحديث فهرس الصادرات - تم دمج proxy و compiler داخل ()intlayer؛ إضافة توثيق intlayerProxy و intlayerCompiler و intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "توحيد التوثيق لجميع exports"
author: aymericzip
---

# حزمة vite-intlayer

توفّر حزمة `vite-intlayer` ملحق Vite لدمج Intlayer في تطبيقك المبني على Vite. تتعامل مع تجميع القواميس، ومراقبة خادم التطوير، والأسماء المستعارة للوحدات، وبرمجية توجيه اللغة، وتحسينات وقت البناء (tree-shaking والتصغير).

## التثبيت

```bash
npm install vite-intlayer
```

## الصادرات

### الإضافات (Plugins)

استيراد:

```ts
import { ... } from "vite-intlayer";
```

| التصدير                    | الوصف                                                                                                                                                | المستند المرتبط                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | إضافة Vite الرئيسية. تجهّز القواميس، وتضبط الأسماء المستعارة، وتبدأ مراقبي خادم التطوير، وتدمج (منذ v9) كلاً من proxy و compiler.                    | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**مهمل**) اسم بديل لـ `intlayer`.                                                                                                                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**مهمل**) اسم بديل لـ `intlayer`.                                                                                                                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | إضافة برمجية وسيطة لتوجيه اللغة (اكتشاف، إعادة توجيه، إعادة كتابة). منذ الإصدار v9 تم دمجها داخل `intlayer()` – سجّلها بشكل منفصل فقط إذا لزم الأمر. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**مهمل**) اسم بديل لـ `intlayerProxy`.                                                                                                              | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**مهمل**) اسم بديل لـ `intlayerProxy`.                                                                                                              | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | تستخرج إعلانات المحتوى المضمنة من المكونات وتكتبها في القواميس. منذ الإصدار v9 تم دمجها داخل `intlayer()`.                                           | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | يُجري tree-shaking لحقول القاموس غير المستخدمة من حزمة الإنتاج.                                                                                      | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | يُصغّر ملفات JSON للقواميس المُجمّعة مع إمكانية تحوير أسماء الحقول اختياريًا.                                                                        | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerMinify.md)     |

### الأدوات

| التصدير                      | الوصف                                                                                        | المستند ذو الصلة                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | إرجاع middleware لـ Node.js `(req, res, next)` غير متعلق بأي framework مع منطق توجيه locale. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerProxy.md) |

### الأنواع

| التصدير                      | الوصف                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | الخيارات المقبولة بواسطة `intlayer()`. تمتد `GetConfigurationOptions` مع `compatCallers` و `proxy`.            |
| `IntlayerProxyPluginOptions` | الخيارات المقبولة بواسطة `intlayerProxy()` و `createIntlayerProxyHandler()`. تتضمن `ignore` و `configOptions`. |
| `IntlayerCompilerOptions`    | الخيارات المقبولة بواسطة `intlayerCompiler()`. تتضمن `configOptions` و `compilerConfig`.                       |
| `CompatCallerConfig`         | إعادة تصدير من `@intlayer/babel`. يصف نمط compat-adapter caller لتحليل استخدام الحقول.                         |
