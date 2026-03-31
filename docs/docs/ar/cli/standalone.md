---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: الحزمة المستقلة (Standalone Bundle)
description: تعرف على كيفية إنشاء حزمة JavaScript مستقلة لمحتوى التطبيق.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "تهيئة وثائق الأمر المستقل (standalone)"
---

# الحزمة المستقلة (Standalone Bundle)

يتيح لك الأمر `standalone` إنشاء حزمة JavaScript مستقلة تحتوي على Intlayer وأي حزم محددة أخرى. هذا مفيد بشكل خاص لاستخدام Intlayer في البيئات التي لا تحتوي على مدير حزم أو مجمع، مثل تطبيق HTML/JS بسيط.

تستخدم الحزمة [esbuild](https://esbuild.github.io/) لدمج الحزم المطلوبة وتبعياتها في ملف واحد يمكن استيراده بسهولة في أي مشروع ويب.

## الاستخدام

```bash
npx intlayer standalone --packages [الحزم...] [الخيارات]
```

## الخيارات

- `-o, --outfile [outfile]` - اختياري. اسم ملف الإخراج. الافتراضي: `intlayer-bundle.js`.
- `--packages [الحزم...]` - مطلوب. قائمة بالحزم المطلوب تضمينها في الحزمة (مثل `intlayer`, `vanilla-intlayer`).
- `--version [version]` - اختياري. إصدار الحزم المراد حزمها. إذا لم يتم تحديده، فسيتم استخدام إصدار Intlayer CLI افتراضيًا.
- `--minify` - اختياري. ما إذا كان سيتم تصغير المخرجات. الافتراضي: `true`.
- `--platform [platform]` - اختياري. النظام الأساسي المستهدف للحزمة (مثل `browser`, `node`). الافتراضي: `browser`.
- `--format [format]` - اختياري. تنسيق الإخراج للحزمة (مثل `esm`, `cjs`, `iife`). الافتراضي: `esm`.

## خيارات عامة

- `--env-file [envFile]` - ملف البيئة.
- `-e, --env [env]` - البيئة.
- `--base-dir [baseDir]` - الدليل الأساسي.
- `--no-cache` - تعطيل ذاكرة التخزين المؤقت.
- `--verbose` - مخرجات مفصلة.

## أمثلة:

### إنشاء حزمة لـ Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

سيؤدي هذا إلى إنشاء ملف `intlayer.js` يحتوي على كل من حزم `intlayer` و `vanilla-intlayer` ، مصغرًا وبتنسيق ESM ، وجاهزًا للاستخدام في المتصفح عبر علامة `<script>`.

### حزم إصدار معين:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### الحزم بتنسيق مختلف:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## ماذا يفعل:

1. **إنشاء بيئة مؤقتة** - إعداد دليل مؤقت لإدارة التبعيات.
2. **تثبيت الحزم** - استخدام `npm` أو `bun` (إذا كان متاحًا) لتثبيت الحزم المطلوبة وتبعياتها.
3. **إنشاء نقطة دخول** - إنشاء ملف نقطة دخول مؤقت يصدر جميع الحزم المطلوبة ويعرضها كمتغيرات عالمية عند تشغيلها في متصفح.
4. **الحزم باستخدام esbuild** - استخدام esbuild لدمج كل شيء في ملف واحد ، وتطبيق التصغير والتنسيق حسب الطلب.
5. **إنشاء الملف** - كتابة الحزمة الناتجة إلى مسار الإخراج المحدد.

## المتغيرات العالمية

عند تحميل الحزمة في متصفح ، فإنها تعرض الحزم المطلوبة كمتغيرات عالمية على كائن `window`. يتم اشتقاق أسماء المتغيرات من أسماء الحزم (على سبيل المثال ، يصبح `intlayer` هو `Intlayer` ، ويصبح `vanilla-intlayer` هو `VanillaIntlayer`).

```javascript
// الوصول إلى Intlayer من الحزمة
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
