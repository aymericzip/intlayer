---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من Next Translate إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق Next.js الخاص بك من next-translate إلى Intlayer باستخدام محول التوافق.
keywords:
  - next-translate
  - nextjs
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من Next Translate إلى Intlayer

الترحيل من `next-translate` إلى Intlayer هو بديل قريب جداً يحتفظ بالصيغة والعلامات الحالية.

## ما يجب فعله

قم بتهيئة Intlayer في مشروعك:

```bash
npx intlayer init
```

سيقوم CLI بتنسيق التكوين الخاص بك. يمكنك بعد ذلك تطبيق مكوّن Intlayer في `next.config.ts`، الذي يحقن أسماء مستعارة subpath في وقت البناء يعيّن `next-translate/useTranslation` إلى `@intlayer/next-translate`.

## كيف يعمل تحت الغطاء

يوفر `next-translate` خطافات مثل `useTranslation('ns')` و `t('ns:key.path')` و مكوّن `<Trans>`.

تحت الغطاء:

- **الاستيفاء والجمع:** يعتمد بشكل وثيق على سلوك محول `react-i18next`. يتم التعامل ديناميكياً مع عناصنات `{{var}}` والجمع المعيّن من اللواحق مثل `key_0` و `key_one` و `key_other`.
- **مكوّن `<Trans>`:** مدعوم مباشرة لتحليل العلامات الشبيهة بـ HTML جنباً إلى جنب مع prop `components` المبني على array.
- **Namespaces:** يضمن aliasing subpath أن مراجع `useTranslation` تستهدف namespaces القاموس الداخلية الصحيحة دون تعديل يدوي.
