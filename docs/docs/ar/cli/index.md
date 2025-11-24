---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: اكتشف كيفية استخدام واجهة الأوامر Intlayer CLI لإدارة موقعك متعدد اللغات. اتبع الخطوات في هذه الوثائق الإلكترونية لإعداد مشروعك في دقائق قليلة.
keywords:
  - CLI
  - واجهة سطر الأوامر
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: إضافة أمر transform
  - version: 7.1.0
    date: 2025-11-05
    changes: إضافة خيار skipIfExists لأمر translate
  - version: 6.1.4
    date: 2025-01-27
    changes: إضافة أسماء مستعارة لوسائط وأوامر CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: إضافة خيار build للأوامر
  - version: 6.1.2
    date: 2025-09-26
    changes: إضافة أمر version
  - version: 6.1.0
    date: 2025-09-26
    changes: تعيين خيار verbose ليكون true بشكل افتراضي باستخدام CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: إضافة أمر watch وخيار with
  - version: 6.0.1
    date: 2025-09-23
    changes: إضافة أمر editor
  - version: 6.0.0
    date: 2025-09-17
    changes: إضافة أمر content test و list
  - version: 5.5.11
    date: 2025-07-11
    changes: تحديث توثيق معلمات أوامر CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# Intlayer CLI

---

## جدول المحتويات

<TOC/>

---

## تثبيت الحزمة

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> إذا كانت حزمة `intlayer` مثبتة بالفعل، يتم تثبيت CLI تلقائيًا. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تهدف حزمة `intlayer-cli` إلى تحويل [تصريحات intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) الخاصة بك إلى قواميس.

ستقوم هذه الحزمة بتحويل جميع ملفات intlayer، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [انظر كيفية إعلان ملفات تصريح Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

لتفسير قواميس intlayer يمكنك استخدام المفسرات، مثل [react-intlayer](https://www.npmjs.com/package/react-intlayer)، أو [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## دعم ملفات التكوين

يقبل Intlayer عدة صيغ لملفات التكوين:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لمعرفة كيفية تكوين اللغات المتاحة، أو معلمات أخرى، راجع [توثيق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## تشغيل أوامر intlayer

### الأوامر الأساسية

- **[بناء القواميس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/build.md)** - بناء قواميسك من ملفات إعلان المحتوى
- **[مراقبة القواميس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/watch.md)** - مراقبة التغييرات وبناء القواميس تلقائيًا
- **[التحقق من إصدار CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/version.md)** - التحقق من إصدار Intlayer CLI المثبت

### إدارة القواميس

- **[دفع القواميس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/push.md)** - دفع القواميس إلى محرر Intlayer ونظام إدارة المحتوى
- **[سحب القواميس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/pull.md)** - سحب القواميس من محرر Intlayer ونظام إدارة المحتوى
- **[ملء القواميس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)** - ملء، تدقيق، وترجمة القواميس باستخدام الذكاء الاصطناعي
- **[اختبار الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/test.md)** - اختبار وتحديد الترجمات المفقودة
- **[قائمة ملفات إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list.md)** - سرد جميع ملفات إعلان المحتوى في مشروعك

### إدارة المكونات

- **[تحويل المكونات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/transform.md)** - تحويل المكونات الحالية لاستخدام Intlayer

### التهيئة

- **[إدارة التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/configuration.md)** - الحصول على تهيئة Intlayer الخاصة بك ودفعها إلى نظام إدارة المحتوى (CMS)

### إدارة الوثائق

- **[ترجمة الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-translate.md)** - ترجمة ملفات الوثائق تلقائيًا باستخدام الذكاء الاصطناعي
- **[مراجعة الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-review.md)** - مراجعة ملفات الوثائق من حيث الجودة والاتساق

### المحرر والمزامنة الحية

- **[أوامر المحرر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/editor.md)** - استخدم أوامر محرر Intlayer
- **[أوامر المزامنة الحية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/live.md)** - استخدم المزامنة الحية لعكس تغييرات محتوى نظام إدارة المحتوى (CMS) أثناء وقت التشغيل

### أدوات التطوير

- **[SDK سطر الأوامر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/sdk.md)** - استخدم SDK الخاص بـ Intlayer CLI في كودك الخاص
- **[أمر تصحيح Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/debug.md)** - تصحيح واستكشاف مشكلات Intlayer CLI

## استخدم أوامر intlayer في ملف `package.json` الخاص بك

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **ملاحظة**: يمكنك أيضًا استخدام الأسماء المختصرة:
>
> - `npx intlayer list` بدلاً من `npx intlayer content list`
> - `npx intlayer test` بدلاً من `npx intlayer content test`
