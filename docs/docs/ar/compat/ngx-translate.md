---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من NGX-Translate إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق Angular الخاص بك من ngx-translate إلى Intlayer باستخدام محول التوافق.
keywords:
  - ngx-translate
  - angular
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من NGX-Translate إلى Intlayer

ترحيل تطبيق Angular الخاص بك من `ngx-translate` إلى Intlayer سهل مع محول التوافق، مما يسمح لك بتجاوز الحاجة إلى إعادة كتابة جميع قوالبك.

## ما يجب فعله

ابدأ بتشغيل:

```bash
npx intlayer init
```

هذا ينشئ `intlayer.config.ts`. استبدل إعدادات `TranslateModule.forRoot()` وأسماء الاستيراد بشكل مناسب للإشارة إلى `@intlayer/ngx-translate`.

## كيف يعمل تحت الغطاء

يستخدم `ngx-translate` `TranslateService` (`instant` و `get` و `stream`) جنباً إلى جنب مع pipe `{{ 'KEY' | translate:params }}` و directive `[translate]`.

تحت الغطاء:

- **الخدمات:** `TranslateService` يغلّف `getIntlayer` و observable محلية، مما يوفر بالضبط نفس الأساليب.
- **Pipes والتوجيهات:** معاد تنفيذها لحل مقابل قواميس Intlayer مباشرة.
- **Loaders:** إعدادات `TranslateHttpLoader` يتم تحويلها إلى stubs تحذيرات لأن Intlayer بشكل متأصل يحل ويجمّع قواميسك في وقت البناء (أو من خلال الواردات الديناميكية القياسية)، مما يلغي تماماً الحاجة إلى محملات HTTP.
