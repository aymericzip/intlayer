---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: سحب القواميس
description: تعلّم كيفية سحب القواميس من محرر Intlayer ونظام إدارة المحتوى.
keywords:
  - سحب
  - قواميس
  - CLI
  - Intlayer
  - محرر
  - نظام إدارة المحتوى
slugs:
  - doc
  - concept
  - cli
  - pull
---

# سحب القواميس البعيدة

```bash
npx intlayer pull
```

إذا كان [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) مثبتًا، يمكنك أيضًا سحب القواميس من المحرر. بهذه الطريقة، يمكنك استبدال محتوى قواميسك حسب حاجة تطبيقك.

## الأسماء المستعارة:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## الوسائط:

**خيارات القاموس:**

- **`-d, --dictionaries`**: معرفات القواميس التي سيتم سحبها. إذا لم يتم تحديدها، سيتم سحب جميع القواميس.

  > مثال: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: معرفات القواميس التي سيتم سحبها (اسم مستعار لـ --dictionaries).

  > مثال: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer build --no-cache`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

  > مثال: `npx intlayer dictionary push --env production`

**خيارات الإخراج:**

- **`--new-dictionaries-path`** : مسار الدليل الذي سيتم حفظ القواميس الجديدة فيه. إذا لم يتم تحديده، فسيتم حفظ القواميس الجديدة في دليل `./intlayer-dictionaries` الخاص بالمشروع. إذا تم تحديد حقل `filePath` في محتوى القاموس الخاص بك، فلن تأخذ القواميس هذا الوسيط في الاعتبار وسيتم حفظها في الدليل المحدد في `filePath`.

**خيارات السجل:**

- **`--verbose`**: تمكين تسجيل مفصل لأغراض التصحيح. (القيمة الافتراضية هي true عند استخدام CLI)

## مثال:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
