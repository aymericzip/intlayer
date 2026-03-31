---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - جميع أوامر Intlayer CLI لموقعك متعدد اللغات
description: اكتشف كيفية استخدام Intlayer CLI لإدارة موقعك متعدد اللغات. اتبع الخطوات الواردة في هذه الوثائق عبر الإنترنت لإعداد مشروعك في دقائق معدودة.
keywords:
  - CLI
  - واجهة سطر الأوامر
  - تدويل
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "إضافة أمر standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "إضافة أمر CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "إضافة أمر list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "إضافة أمر extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "إضافة خيار skipIfExists إلى أمر translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "إضافة أسماء مستعارة لوسائط وأوامر CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "إضافة خيار البناء إلى الأوامر"
  - version: 6.1.2
    date: 2025-09-26
    changes: "إضافة أمر version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "تعيين خيار verbose إلى true افتراضيًا عبر CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "إضافة أمر watch وخيار with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "إضافة أمر editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "إضافة أوامر content test و list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "تحديث وثائق معلمات أوامر CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء السجل"
---

# Intlayer CLI - جميع أوامر Intlayer CLI لموقعك متعدد اللغات

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

```bash packageManager="bun"
bun add intlayer-cli -g
```

> إذا تم تثبيت حزمة `intlayer` بالفعل ، فسيتم تثبيت CLI تلقائيًا. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تم تصميم حزمة `intlayer-cli` لنقل [تصريحات intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) إلى قواميس.

تقوم هذه الحزمة بتحويل جميع ملفات intlayer ، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [انظر كيف تصرح عن ملفات تصريح Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

لتفسير قواميس intlayer يمكنك استخدام المترجمين الفوريين ، مثل [react-intlayer](https://www.npmjs.com/package/react-intlayer) أو [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## دعم ملفات التكوين

يقبل Intlayer تنسيقات متعددة لملفات التكوين:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لمعرفة كيفية تكوين اللغات المتاحة أو المعلمات الأخرى ، راجع [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## تنفيذ أوامر Intlayer

### المصادقة

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/login.md)** - المصادقة مع Intlayer CMS والحصول على أوراق اعتماد الوصول

### الأوامر الأساسية

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/build.md)** - بناء القواميس الخاصة بك من ملفات تصريح المحتوى
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/watch.md)** - مراقبة التغييرات وإعادة بناء القواميس تلقائيًا
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/standalone.md)** - إنشاء حزمة JavaScript مستقلة تحتوي على Intlayer والحزم المحددة
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/version.md)** - التحقق من إصدار Intlayer CLI المثبت
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list_projects.md)** - سرد جميع مشاريع Intlayer في دليل أو مستودع git

### إدارة القواميس

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/push.md)** - إرسال القواميس إلى محرر Intlayer و CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/pull.md)** - جلب القواميس من محرر Intlayer و CMS
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)** - ملء القواميس ومراجعتها وترجمتها باستخدام الذكاء الاصطناعي
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/test.md)** - اختبار وتحديد الترجمات المفقودة
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list.md)** - سرد جميع ملفات تصريح المحتوى في مشروعك

### إدارة المكونات

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)** - استخراج السلاسل من المكونات إلى ملف .content بالقرب من المكون

### التكوين

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/init.md)** - إعداد Intlayer في مشروعك بتكوين تلقائي
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/configuration.md)** - الحصول على تكوين Intlayer الخاص بك وإرساله إلى CMS

### إدارة الوثائق

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-translate.md)** - ترجمة ملفات الوثائق تلقائيًا باستخدام الذكاء الاصطناعي
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-review.md)** - مراجعة ملفات الوثائق للجودة والاتساق

### المحرر والمزامنة المباشرة (Live Sync)

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/editor.md)** - استخدام أوامر محرر Intlayer
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/live.md)** - استخدام المزامنة المباشرة لتطبيق تغييرات المحتوى من CMS في وقت التشغيل

### CI/CD والأتمتة

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/ci.md)** - تنفيذ أوامر Intlayer ببيانات اعتماد محقونة تلقائيًا لخطوط أنابيب CI/CD

### أدوات التطوير

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/sdk.md)** - استخدام Intlayer CLI SDK في الكود الخاص بك
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/debug.md)** - تصحيح أخطاء وحل مشكلات Intlayer CLI

## استخدم أوامر intlayer في ملف `package.json` الخاص بك

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **ملاحظة**: يمكنك أيضًا استخدام أسماء مستعارة أقصر:
>
> - `npx intlayer list` بدلاً من `npx intlayer content list`
> - `npx intlayer test` بدلاً من `npx intlayer content test`
> - `npx intlayer projects-list` أو `npx intlayer pl` بدلاً من `npx intlayer projects list`
