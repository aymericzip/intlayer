---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من Polyglot.js إلى Intlayer
description: تعرّف على كيفية الترحيل من Polyglot.js إلى Intlayer باستخدام محول التوافق.
keywords:
  - polyglot
  - airbnb
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من Polyglot.js إلى Intlayer

إذا كنت تستخدم Polyglot.js من Airbnb، فإن الترحيل إلى Intlayer سهل جداً باستخدام طبقة التوافق.

## ما يجب فعله

ما عليك سوى تشغيل أمر التهيئة في مشروعك:

```bash
npx intlayer init
```

هذا ينشئ `intlayer.config.ts`. يمكنك بعد ذلك استخدام اسم مستعار مكوّن bundler لإعادة توجيه واردات Polyglot بشكل شفاف إلى `@intlayer/polyglot`.

## كيف يعمل تحت الغطاء

يعتمد syntax Polyglot.js عادة على `polyglot.t('key', {name})` مع استيفاءات `%{name}` و جمع `smart_count` مفصولة بـ `"singular |||| plural"`.

تحت الغطاء:

- **الاستيفاء:** تتعامل طبقة التوافق مع عناصن `%{var}` بشكل أصلي.
- **الجمع:** يتم تقسيم السلسلة عند `||||` وتقييمها مقابل `Intl.PluralRules` الأصلي وفقاً للمحلية النشطة، مما يعكس ترتيب الحزم الخاص بـ Polyglot لكل محلية.
- **القواميس:** تتجاوز الحاجة إلى توفير تكوينات JSON ضخمة لـ `new Polyglot()` – Intlayer يتعامل مع القواامس ديناميكياً ويزيل التكرار منها تلقائياً.
