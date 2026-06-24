---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من i18n-js إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيقك من مكتبة i18n-js إلى Intlayer باستخدام محول التوافق.
keywords:
  - i18n-js
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من i18n-js إلى Intlayer

الانتقال من مكتبة `i18n-js` إلى Intlayer هو ترحيل محسّن للغاية مصمّم لنقل تكوينات الترجمات الكبيرة إلى نظام حل الملفات المنظم في Intlayer.

## ما يجب فعله

قم بتنفيذ أمر الإعداد التالي في المستودع الخاص بك:

```bash
npx intlayer init
```

بعد تحضير `intlayer.config.ts`، يمكنك إضافة اسم مستعار لـ Intlayer إلى تكوين bundler الخاص بك بحيث يستهدف أي استيراد لـ `i18n-js` حزمة التوافق `@intlayer/i18n-js`.

## كيف يعمل تحت الغطاء

يصل `i18n-js` إلى Namespaces من خلال تعبيرات مثل `i18n.t('scope.key', {name})` جنباً إلى جنب مع fallback للغات و mappings جمع محددة.

تحت الغطاء:

- **الاستيفاء:** يقوم محول التوافق بتحليل `%{name}` mappings بسهولة إلى قيمة قاموس runtime المستهدفة.
- **الجمع:** يستبدل مفاتيح `one/other` الفرعية ويعيّنها مقابل آليات الجمع القوية الأساسية في Intlayer (`Intl.PluralRules`)، مما يجرّد mappings يدوية.
- **الإصدارات المحلية:** بدلاً من تحميل حمولات اللغات أحادية البلوك عند البدء، يتم تقديم القواميس بشكل أمثل بناءً على إعداد السياق الحالي عبر تكوين Intlayer الأصلي.
