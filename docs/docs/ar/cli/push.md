---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: دفع القواميس
description: تعلّم كيفية دفع القواميس الخاصة بك إلى محرر Intlayer ونظام إدارة المحتوى.
keywords:
  - دفع
  - قواميس
  - CLI
  - Intlayer
  - محرر
  - نظام إدارة المحتوى
slugs:
  - doc
  - concept
  - cli
  - push
---

# دفع القواميس

```bash
npx intlayer dictionary push
```

إذا تم تثبيت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، يمكنك أيضًا دفع القواميس إلى المحرر. سيسمح هذا الأمر بجعل القواميس متاحة لـ [المحرر](https://intlayer.org/dashboard). بهذه الطريقة، يمكنك مشاركة قواميسك مع فريقك وتحرير المحتوى الخاص بك دون الحاجة إلى تعديل كود التطبيق الخاص بك.

## الأسماء المستعارة:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## الوسائط:

**خيارات القاموس:**

- **`-d`, `--dictionaries`**: معرفات القواميس التي سيتم دفعها. إذا لم يتم تحديدها، سيتم دفع جميع القواميس.

  > مثال: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: معرفات القواميس التي سيتم دفعها (اسم مستعار لـ --dictionaries).

  > مثال: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer build --no-cache`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`). مفيد في حالة استخدام متغيرات البيئة في ملف تكوين intlayer الخاص بك.
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه. مفيد في حالة استخدام متغيرات البيئة في ملف تكوين intlayer الخاص بك.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

  > مثال: `npx intlayer dictionary push --env production`

**خيارات الإخراج:**

- **`-r`، `--delete-locale-dictionary`**: تخطي السؤال الذي يطلب حذف مجلدات اللغات بمجرد دفع القواميس، وحذفها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسيتم استبدال محتوى القواميس البعيدة.

  > مثال: `npx intlayer dictionary push -r`

  > مثال: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`، `--keep-locale-dictionary`**: تخطي السؤال الذي يطلب حذف مجلدات اللغات بمجرد دفع القواميس، والاحتفاظ بها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسيتم استبدال محتوى القواميس البعيدة.

  > مثال: `npx intlayer dictionary push -k`

  > مثال: `npx intlayer dictionary push --keep-locale-dictionary`

**خيارات التحضير:**

- **`--build`**: بناء القواميس قبل الدفع لضمان تحديث المحتوى. القيمة true ستجبر على البناء، false ستتخطى البناء، undefined ستسمح باستخدام ذاكرة التخزين المؤقت للبناء.

**خيارات السجل:**

- **`--verbose`**: تمكين تسجيل مفصل لأغراض التصحيح. (افتراضيًا true عند استخدام CLI)

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على القواميس التي تتضمن تغييرات من القاعدة (الافتراضية `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لمقارنة git diff (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لمقارنة git diff (الافتراضي: `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزم بها.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

  > مثال: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > مثال: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
