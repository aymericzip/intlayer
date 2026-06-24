---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من Transloco إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق Angular الخاص بك من Transloco إلى Intlayer باستخدام محول التوافق.
keywords:
  - transloco
  - angular
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من Transloco إلى Intlayer

إذا كان تطبيق Angular الخاص بك يستخدم حالياً `@jsverse/transloco`، فيمكنك الترحيل إلى Intlayer باستخدام محول التوافق الخاص بنا. يسمح هذا الانتقال بالحفاظ على صيغة القالب الموجودة الخاصة بك أثناء استخدام بنية القاموس القوية في Intlayer.

## ما يجب فعله

ما عليك سوى تشغيل أمر التهيئة في مشروعك:

```bash
npx intlayer init
```

سيؤدي هذا إلى إنشاء التكوين الضروري `intlayer.config.ts`. ستحتاج بعد ذلك إلى استبدال واردات Transloco الخاصة بك بوحدات `@intlayer/transloco` أو الاعتماد على أسماء المستعار للبناء.

## كيف يعمل تحت الغطاء

يستخدم Transloco scopes و `TranslocoService` (`translate` و `selectTranslate`)، جنباً إلى جنب مع التوجيهات الهيكلية (`*transloco="let t"`) و pipes (`| transloco`).

تحت الغطاء:

- **الـ Scopes:** تعيين طبيعي إلى مفاتيح قاموس Intlayer، مما يوفر قصة قص رائعة لتحسين bundle.
- **الخدمة والتوجيهات:** يستبدل محول Intlayer الزاوي موفري الخدمات بسلاسة، مما يسمح لأنابيب التوجيهات والقوالب الموجودة الخاصة بك بحل السلاسل مقابل قواامس Intlayer.
- **التحليل في وقت البناء:** يعترف محلل TypeScript باستدعاءات `instant/get`، وتقليم fallback يضمن الصحة حتى عندما لا يكون استخدام القالب قابلاً للتتبع ثابتاً.
