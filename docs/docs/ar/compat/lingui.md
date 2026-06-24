---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من Lingui إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيقك من Lingui إلى Intlayer باستخدام محول التوافق.
keywords:
  - lingui
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من Lingui إلى Intlayer

إذا كان مشروعك يعتمد حالياً على الترجمة المبنية على macros في Lingui، فإن الانتقال إلى Intlayer يسمح لك بالحفاظ على سير عمل macro الفعال الخاص بك بينما تدعمه بشكل أصلي بإستراتيجية الترجمة JSON في Intlayer.

## ما يجب فعله

للبدء، قم بتهيئة Intlayer في مشروعك:

```bash
npx intlayer init
```

يُنشئ هذا الملف `intlayer.config.ts`. تأكد من الاحتفاظ بـ `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` في خطوة البناء الخاصة بك للتشغيل _قبل_ مترجم Intlayer. بعد ذلك، استخدم اسم مستعار مكوّن bundler لتوجيه `@lingui/core` و `@lingui/react` إلى `@intlayer/lingui`.

## كيف يعمل تحت الغطاء

يستخدم Lingui macros (مثل `` t`Hello ${name}` `` و `<Trans>`) التي يتم ترجمتها إلى استدعاءات runtime مثل `i18n._(id, values)`.

تحت الغطاء:

- **Macros:** يتم ترجمتها بدقة كما حدث من قبل، مما يضمن عدم وجود انقطاع في صيغة المصدر الخاصة بك.
- **الترجمة في وقت التشغيل:** يستخدم `i18n._()` المُسمى بـ اسم مستعار قواميس Intlayer. يتم تعيين المعرّفات المسماة بشكل صريح والمعرّفات المُجزأة بالكامل باستخدام مكوّنات مزامنة `.po` في Intlayer لتجميع وحذف المفاتيح بشكل آمن.
- **قدرات ICU:** يبقى الدعم لـ pluralization والتحديد ومتغيرات ICU قوياً بفضل محلل ICU الموحد في Intlayer، مما يضمن نتائج الإخراج المطابقة.
