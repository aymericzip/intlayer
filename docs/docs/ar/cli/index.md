---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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

## تنفيذ أوامر Intlayer

### المصادقة

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/login" />
</TechGrid>

> أمر `intlayer login` يصدر **مفتاح وصول** (`clientId` / `clientSecret`) يستخدمه كل أمر معتمد. السر هو بيانات اعتماد من جانب الخادم ولا يصل أبداً إلى حزمة العميل الخاصة بك — انظر [الحفاظ على مفتاح الوصول آمناً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/login.md#keeping-the-access-key-safe).

### الأوامر الأساسية

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list_projects" />
</TechGrid>

### إدارة القواميس

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/list" />
</TechGrid>

### إدارة المكونات

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract" />
</TechGrid>

### التكوين

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/configuration" />
</TechGrid>

### إدارة الوثائق

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-review" />
</TechGrid>

### المحرر والمزامنة المباشرة (Live Sync)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/live" />
</TechGrid>

### التدقيق والتشخيص

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/scan" />
</TechGrid>

### أدوات التطوير

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/debug" />
</TechGrid>

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
