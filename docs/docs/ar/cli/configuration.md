---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: إدارة التكوين
description: تعلّم كيفية الحصول على تكوين Intlayer الخاص بك ودفعه إلى نظام إدارة المحتوى (CMS).
keywords:
  - التكوين
  - الإعداد
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
author: aymericzip
---

# إدارة التكوين

## الحصول على التكوين

يقوم الأمر `configuration get` باسترجاع التكوين الحالي لـ Intlayer، وخاصة إعدادات اللغة (locale). هذا مفيد للتحقق من إعداداتك.

```bash packageManager="npm"
npx intlayer configuration get
```

```bash packageManager="yarn"
yarn intlayer configuration get
```

```bash packageManager="pnpm"
pnpm intlayer configuration get
```

```bash packageManager="bun"
bun x intlayer configuration get
```

## الأسماء المستعارة:

- `npx intlayer config get`
- `npx intlayer conf get`

## الوسائط:

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--verbose`**: تمكين التسجيل التفصيلي لأغراض التصحيح. (افتراضيًا true باستخدام CLI)
- **`--no-cache`**: تعطيل التخزين المؤقت.
- **`--ci`**: ينفّذ الأمر في كل مشروع Intlayer في الـ monorepo (أو في المشروع الحالي فقط عند التشغيل من مجلد مشروع). يمكن حقن بيانات اعتماد لكل مشروع عبر `INTLAYER_PROJECT_CREDENTIALS`، وهو كائن JSON يربط مسار كل مشروع بـ `{ "clientId", "clientSecret" }`.

## دفع التكوين

يقوم الأمر `configuration push` بتحميل تكوينك إلى نظام إدارة المحتوى (CMS) ومحرر Intlayer. هذه الخطوة ضرورية لتمكين استخدام القواميس البعيدة في محرر Intlayer المرئي.

```bash packageManager="npm"
npx intlayer configuration push
```

```bash packageManager="yarn"
yarn intlayer configuration push
```

```bash packageManager="pnpm"
pnpm intlayer configuration push
```

```bash packageManager="bun"
bun x intlayer configuration push
```

## الأسماء المستعارة:

- `npx intlayer config push`
- `npx intlayer conf push`

## الوسائط:

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--verbose`**: تمكين التسجيل التفصيلي لأغراض التصحيح. (افتراضيًا true باستخدام CLI)
- **`--no-cache`**: تعطيل التخزين المؤقت.
- **`--ci`**: ينفّذ الأمر في كل مشروع Intlayer في الـ monorepo (أو في المشروع الحالي فقط عند التشغيل من مجلد مشروع). يمكن حقن بيانات اعتماد لكل مشروع عبر `INTLAYER_PROJECT_CREDENTIALS`، وهو كائن JSON يربط مسار كل مشروع بـ `{ "clientId", "clientSecret" }`.

من خلال دفع التكوين، يتم دمج مشروعك بالكامل مع نظام إدارة المحتوى Intlayer، مما يتيح إدارة القواميس بسلاسة عبر الفرق.
