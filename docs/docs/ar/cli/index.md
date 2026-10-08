---
createdAt: 2024-08-11
updatedAt: 2026-10-08
priority: 8
title: "واجهة سطر أوامر Intlayer: كل الأوامر للتطبيقات متعددة اللغات"
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "إضافة أمر upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "إضافة أمر init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "استبدال الأمر `ci` بالعلامة `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "إضافة أمر scan"
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
author: aymericzip
---

# Intlayer CLI - جميع أوامر Intlayer CLI لموقعك متعدد اللغات

## جدول المحتويات

<TOC/>

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

- [تصريحات intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)

تقوم هذه الحزمة بتحويل جميع ملفات intlayer ، مثل `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [انظر كيف تصرح عن ملفات تصريح Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

## تنفيذ أوامر Intlayer

### المصادقة

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/login.md)** - المصادقة مع Intlayer CMS والحصول على أوراق اعتماد الوصول

> أمر `intlayer login` يصدر **مفتاح وصول** (`clientId` / `clientSecret`) يستخدمه كل أمر معتمد. السر هو بيانات اعتماد من جانب الخادم ولا يصل أبداً إلى حزمة العميل الخاصة بك، انظر [الحفاظ على مفتاح الوصول آمناً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/login.md#keeping-the-access-key-safe).

- [الحفاظ على مفتاح الوصول آمناً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/login.md#keeping-the-access-key-safe)

### الأوامر الأساسية

- [Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/build.md)
- [Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/watch.md)
- [إنشاء حزمة مستقلة (Standalone Bundle)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/standalone.md)
- [التحقق من إصدار CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/version.md)
- [List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list_projects.md)

### إدارة القواميس

- [Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/push.md)
- [Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/pull.md)
- [Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)
- [اختبار الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/test.md)
- [سرد ملفات إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list.md)

### إدارة المكونات

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)** - استخراج السلاسل من المكونات إلى ملف .content بالقرب من المكون

### التكوين

- [Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/init.md)
- [إعداد البنية التحتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/infra.md)
- [ترقية حزم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/upgrade.md)
- [Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/configuration.md)

### إدارة الوثائق

- [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-translate.md)
- [Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-review.md)

### المحرر والمزامنة المباشرة (Live Sync)

- [Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/editor.md)
- [أوامر المزامنة المباشرة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/live.md)

### التدقيق والتشخيص

- **[مسح موقع الويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/scan.md)** - قياس حجم الصفحة وتدقيق صحة i18n/SEO لأي عنوان URL عام

### أدوات التطوير

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/sdk.md)
- [أمر تصحيح الأخطاء لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/debug.md)

## استخدم أوامر intlayer في ملف `package.json` الخاص بك

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **ملاحظة**: يمكنك أيضًا استخدام أسماء مستعارة أقصر:
>
> - `npx intlayer list` بدلاً من `npx intlayer content list`
> - `npx intlayer test` بدلاً من `npx intlayer content test`
> - `npx intlayer projects-list` أو `npx intlayer pl` بدلاً من `npx intlayer projects list`
