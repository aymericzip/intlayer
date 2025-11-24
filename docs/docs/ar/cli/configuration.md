---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# إدارة التكوين

## الحصول على التكوين

يقوم الأمر `configuration get` باسترجاع التكوين الحالي لـ Intlayer، وخاصة إعدادات اللغة (locale). هذا مفيد للتحقق من إعداداتك.

```bash
npx intlayer configuration get
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

## دفع التكوين

يقوم الأمر `configuration push` بتحميل تكوينك إلى نظام إدارة المحتوى (CMS) ومحرر Intlayer. هذه الخطوة ضرورية لتمكين استخدام القواميس البعيدة في محرر Intlayer المرئي.

```bash
npx intlayer configuration push
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

من خلال دفع التكوين، يتم دمج مشروعك بالكامل مع نظام إدارة المحتوى Intlayer، مما يتيح إدارة القواميس بسلاسة عبر الفرق.
