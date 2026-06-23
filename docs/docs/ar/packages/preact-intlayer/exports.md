---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة preact-intlayer
description: تكامل خاص بـ Preact لـ Intlayer، يوفر providers و hooks لتطبيقات Preact.
keywords:
  - preact-intlayer
  - preact
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "إضافة أداة usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "توحيد الوثائق لجميع الصادرات"
author: aymericzip
---

# حزمة preact-intlayer

توفّر حزمة `preact-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Preact. تضمّ providers و hooks لمعالجة المحتوى متعدد اللغات.

## التثبيت

```bash
npm install preact-intlayer
```

## الصادرات

### المزود

| المكون             | الوصف                                                  |
| ------------------ | ------------------------------------------------------ |
| `IntlayerProvider` | المزوّد الرئيسي الذي يحيط بتطبيقك ويوفر سياق Intlayer. |

### الهوكس (Hooks)

| الـ Hook        | الوصف                                                                                                   | الوثيقة ذات الصلة                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | مبني على `useDictionary`، لكنه يحقن نسخة مُحسّنة من القاموس المأخوذة من التصريح المُولَّد.              | -                                                                                                                    |
| `useDictionary` | يعالج الكائنات التي تشبه القواميس (key, content). يعالج ترجمات `t()`، وenumerations، إلخ.               | -                                                                                                                    |
| `useLocale`     | يعيد اللغة الحالية ودالة لتعيينها.                                                                      | -                                                                                                                    |
| `usePathname`   | هوك (Hook) يعيد المسار الحالي (pathname) بعد إزالة مقطع اللغة منه. يستجيب لتنقل المتصفح عبر `popstate`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/preact-intlayer/usePathname.md) |
| `t`             | يختار المحتوى بناءً على اللغة الحالية.                                                                  | [الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)                   |

### المكونات

| المكوّن            | الوصف                              |
| ------------------ | ---------------------------------- |
| `MarkdownProvider` | مزود لسياق عرض Markdown.           |
| `MarkdownRenderer` | يعرض محتوى Markdown بمكونات مخصصة. |
