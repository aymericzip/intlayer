---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: توثيق حزمة @intlayer/babel
description: إضافات Babel لـ Intlayer تُعالج استخراج المحتوى، وتحسين الاستيراد، وتنقية الحقول غير المستخدمة، وتصغير أسماء الحقول أثناء البناء.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internationalization
  - i18n
  - compiler
  - optimize
  - purge
  - minify
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "توحيد توثيق جميع الصادرات"
author: aymericzip
---

# حزمة @intlayer/babel

توفر حزمة `@intlayer/babel` مجموعة من إضافات Babel المتخصصة لـ Intlayer. تُغطي دورة البناء الكاملة: استخراج تصريحات المحتوى، وإعادة كتابة استدعاءات `useIntlayer` / `getIntlayer` إلى استيرادات قواميس مُحسَّنة، وتنقية الحقول غير المستخدمة، وتصغير أسماء الحقول.

## التثبيت

```bash
npm install @intlayer/babel
```

## التصديرات

استيراد:

```ts
import { ... } from "@intlayer/babel";
```

---

### الإضافات (Plugins)

| الدالة / الفئة                 | الوصف                                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | إضافة Babel تستخرج المحتوى القابل للترجمة من ملفات المصدر وتُدرج hooks `useIntlayer` / `getIntlayer` تلقائيًا. مُصمَّمة للاستخدام مع Next.js وأدوات البناء المعتمدة على Babel.  |
| `intlayerOptimizeBabelPlugin`  | إضافة Babel تُحوِّل استدعاءات `useIntlayer` و`getIntlayer` وتُعيد كتابة استيراداتها إلى استيرادات قواميس JSON مُحسَّنة (ثابتة أو ديناميكية أو عبر fetch).                       |
| `intlayerPurgeBabelPlugin`     | إضافة Babel تُحلِّل ملفات المصدر وتُعيد كتابة ملفات JSON للقواميس المُجمَّعة لحذف الحقول غير المستخدمة (`build.purge`) أو إعادة تسميتها بأسماء مختصرة (`build.minify`).         |
| `intlayerMinifyBabelPlugin`    | إضافة Babel تُعيد كتابة ملفات المصدر لاستخدام أسماء الحقول المختصرة المُعيَّنة أثناء مرحلة التصغير (مثلاً `content.title` ← `content.a`). تعتمد على `intlayerPurgeBabelPlugin`. |
| `makeFieldRenameBabelPlugin`   | دالة مُنشِئة (factory) تُنتج إضافة Babel تُعيد تسمية وصولات حقول محتوى القاموس في ملفات المصدر وفق خريطة `dictionaryKeyToFieldRenameMap` الموجودة في `PruneContext`.            |
| `makeUsageAnalyzerBabelPlugin` | دالة مُنشِئة تُنتج إضافة Babel تُحلِّل استخدام `useIntlayer` / `getIntlayer` في الكود المصدري وتُجمِّع بيانات استخدام الحقول في `PruneContext` المُشترك.                        |
| `getSharedPruneContext`        | دالة مساعدة تُعيد كائن `PruneContext` المُشترك للمجلد الأساسي المُحدَّد، أو `null` إن لم يُهيَّأ بعد.                                                                           |

---

### دوال إعداد الإضافات

| الدالة                     | الوصف                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | تُحمِّل إعداد Intlayer وتُعيد خيارات `ExtractPluginOptions` جاهزة للاستخدام مع `intlayerExtractBabelPlugin`.                        |
| `getOptimizePluginOptions` | تُحمِّل إعداد Intlayer والقواميس المُجمَّعة وتُعيد خيارات `OptimizePluginOptions` جاهزة للاستخدام مع `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | تُحمِّل إعداد Intlayer وتُعيد خيارات `PurgePluginOptions` جاهزة للاستخدام مع `intlayerPurgeBabelPlugin`.                            |
| `getMinifyPluginOptions`   | تُحمِّل إعداد Intlayer وتُعيد خيارات `MinifyPluginOptions` جاهزة للاستخدام مع `intlayerMinifyBabelPlugin`.                          |

---

### الأنواع

| النوع                   | الوصف                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | وضع المُجمِّع: `'dev'` للتطوير مع دعم HMR أو `'build'` لبناء الإنتاج.                                   |
| `ExtractPluginOptions`  | خيارات `intlayerExtractBabelPlugin`: قائمة الملفات، الإعداد، callback `onExtract`، وغيرها.              |
| `ExtractResult`         | نتيجة الاستخراج: مفتاح القاموس، مسار الملف، المحتوى، واللغة.                                            |
| `OptimizePluginOptions` | خيارات `intlayerOptimizeBabelPlugin`: مسارات القواميس، وضع الاستيراد، خريطة الأوضاع لكل قاموس، إلخ.     |
| `PurgePluginOptions`    | خيارات `intlayerPurgeBabelPlugin`: المجلد الأساسي، علامات purge/minify/optimize، قائمة ملفات المكوّنات. |
| `MinifyPluginOptions`   | خيارات `intlayerMinifyBabelPlugin`: المجلد الأساسي، علامات minify/optimize/editorEnabled.               |
| `PruneContext`          | الحالة المُشتركة بين إضافات التحليل والتنقية: خرائط استخدام الحقول، خرائط إعادة التسمية، إلخ.           |
| `DictionaryFieldUsage`  | نتيجة استخدام الحقول لقاموس واحد: `Set<string>` أو `'all'` عند تعذُّر التحديد الساكن.                   |
| `NestedRenameEntry`     | عقدة في شجرة إعادة التسمية: الاسم المختصر `shortName` وخريطة الأبناء `children`.                        |
| `NestedRenameMap`       | مستوى واحد في شجرة إعادة التسمية: `Map<string, NestedRenameEntry>`.                                     |
| `CompatCallerConfig`    | إعداد مُحلِّل استخدام مُتوافق لحزم الـ compat-adapter (اسم المُستدعي وخيارات المعالجة).                 |
| `ScriptBlock`           | كتلة script مستخرجة من ملف SFC (Vue أو Svelte): المحتوى وإزاحتا البداية والنهاية.                       |

---

### الأدوات المساعدة

| الدالة                            | الوصف                                                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | تُحوِّل رقمًا صحيحًا (ابتداءً من الصفر) إلى معرِّف أبجدي مختصر: `0 → 'a'`, `25 → 'z'`, `26 → 'aa'`, إلخ.                         |
| `buildNestedRenameMapFromContent` | تبني `NestedRenameMap` بصورة مُتكرِّرة من قيمة محتوى قاموس مُجمَّع، مع احترام بنية عقد Intlayer (translation، enumeration، إلخ). |
| `createPruneContext`              | تُنشئ كائن `PruneContext` فارغًا جديدًا مُهيَّأً بالقيم الافتراضية.                                                              |
| `extractScriptBlocks`             | تستخرج كتل `<script>` من ملفات SFC (Vue / Svelte) للتحليل اللاحق بـ Babel.                                                       |
| `BABEL_PARSER_OPTIONS`            | ثابت يُمثِّل خيارات مُحلِّل Babel تُغطي مجموعة الأُطر المدعومة (React/Vue/Svelte/Angular/…).                                     |
| `INTLAYER_CALLER_NAMES`           | قائمة ثابتة بأسماء المُستدعِيين الأصلية لـ Intlayer: `['useIntlayer', 'getIntlayer']`.                                           |

---

## مثال على الاستخدام

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **ملاحظة:** يجب أن تُدرَج `intlayerPurgeBabelPlugin` **قبل** `intlayerMinifyBabelPlugin`، لأن الأخيرة تقرأ خريطة إعادة التسمية التي تبنيها الأولى. كما يجب أن تسبقهما معًا `intlayerOptimizeBabelPlugin` حتى تتمكّن من رؤية مفاتيح القاموس قبل إعادة كتابة استدعاءات `useIntlayer`.
