---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من Svelte I18n إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق Svelte الخاص بك من svelte-i18n إلى Intlayer باستخدام محول التوافق.
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من Svelte I18n إلى Intlayer

نقل تطبيق Svelte الخاص بك من `svelte-i18n` إلى Intlayer يستغرق لحظة فقط باستخدام محول التوافق.

## ما يجب فعله

ما عليك سوى تشغيل أمر التهيئة في مشروعك:

```bash
npx intlayer init
```

هذا ينشئ `intlayer.config.ts`. تأكد من أن مكوّنات SvelteKit / Vite الخاصة بك ملفوفة بمكوّن اسم Intlayer للعثور على الاسم المستعار لخريطة `svelte-i18n` إلى `@intlayer/svelte-i18n` بسلاسة.

## كيف يعمل تحت الغطاء

يعتمد Svelte-i18n على المتاجر المستخدمة بكثافة (`$_` و `$t` و `$format` وما إلى ذلك) و ICU MessageFormat.

تحت الغطاء:

- **المتاجر:** يقوم Intlayer بعمل وكيل المتاجر `svelte-i18n`. يصبح `$_` متجراً مشتقاً من محلية الحالية يعود حلاً من Intlayer.
- **المفاتيح:** يتم تقييم مفاتيحك المسطحة (مثل `$_('home.title')`) بحيث يمثل جزء المسار الأول قاموس Intlayer.
- **صيغة ICU:** يتم التعامل بالكامل من خلال محلل ICU المشترك (تحليل مكافئ `intl-messageformat`).
- **المحولات:** تنتقل استدعاءات `$date` و `$time` و `$number` بأمان إلى محولات Intlayer الأساسية الأصلية.
- **تحليل Babel/SWC:** يقرأ محلل Intlayer مستدعيات متجر Svelte (`$_`) داخل ملفات `.svelte` المصدرية قبل الترجمة لبناء أجزاء القاموس ذات الصلة تلقائياً.
