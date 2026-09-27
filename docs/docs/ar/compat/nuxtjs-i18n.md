---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: محوّل توافق لـ @nuxtjs/i18n"
description: "احتفظ بشيفرة @nuxtjs/i18n وقدّمها عبر Intlayer: ثبّت @intlayer/nuxt-i18n، واضبط أسماء بديلة للاستيرادات، واكتشف ما يغيّره المحوّل داخليًا."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# @intlayer/nuxt-i18n: محوّل توافق لـ @nuxtjs/i18n

ترحيل تطبيق Nuxt الخاص بك من `@nuxtjs/i18n` إلى Intlayer هو عملية سلسة باستخدام وحدة محول Nuxt.

## ما يجب فعله

لتهيئة المشروع، قم بتشغيل:

```bash
npx intlayer init --interactive
```

سيؤدي هذا إلى إعداد `intlayer.config.ts`. بعد ذلك، أضف وحدة Intlayer Nuxt (مثل `@intlayer/nuxt-i18n`) في مصفوفة modules في `nuxt.config.ts`. هذا يطبق تلقائياً تكوين التوافق لتطبيقك.

## كيف يعمل تحت الغطاء

يغلّف `@nuxtjs/i18n` `vue-i18n` مع توفير composables محددة لـ Nuxt (`useLocalePath` و `useSwitchLocalePath` و `<NuxtLinkLocale>`).

تحت الغطاء:

- **الترجمات:** تعتمد بشكل أصلي على طبقة التوافق `@intlayer/vue-i18n` لجميع مهام ترجمة السلسلة (دعم كامل لصيغ `vue-i18n` و pipe جمع و reactivity).
- **التوجيه:** يعكس composables التوجيه باستخدام مساعدات URL المحلاة في Intlayer.
- **التكوين:** يقرأ `availableLocales` والإعدادات الافتراضية مباشرة من `intlayer.config.ts` الخاص بك لتنسيق صفحات Nuxt تلقائياً.

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
