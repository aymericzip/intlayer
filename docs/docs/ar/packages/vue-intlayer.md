---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة vue-intlayer
description: تكامل مخصّص لـ Vue مع Intlayer، يوفر مكوّنات إضافية (plugins) وcomposables لتطبيقات Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# حزمة vue-intlayer

توفّر حزمة `vue-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Vue. تتضمن مكوّنًا إضافيًا لـ Vue وcomposables للتعامل مع المحتوى متعدد اللغات.

## التثبيت

```bash
npm install vue-intlayer
```

## الصادرات

### المكوّن الإضافي

| الدالة            | الوصف                                |
| ----------------- | ------------------------------------ |
| `installIntlayer` | مكوّن Vue لتثبيت Intlayer في تطبيقك. |

### القوالب القابلة لإعادة الاستخدام (Composables)

| قابل للتركيب    | الوصف                                             |
| --------------- | ------------------------------------------------- |
| `useIntlayer`   | يختار قاموسًا واحدًا بواسطة مفتاحه ويعيد المحتوى. |
| `useDictionary` | يختار قاموسًا واحدًا بواسطة مفتاحه ويعيد المحتوى. |
| `useLocale`     | يعيد الـ locale الحالي ودالة لتعيينه.             |
| `useIntl`       | يعيد كائن Intl للـ locale الحالي.                 |

### الدوال

| دالة            | الوصف                    |
| --------------- | ------------------------ |
| `getDictionary` | يسترجع قاموسًا.          |
| `getIntlayer`   | يسترجع المحتوى من قاموس. |

### ماركداون

| الدالة                    | الوصف                                         |
| ------------------------- | --------------------------------------------- |
| `installIntlayerMarkdown` | إضافة Vue لتثبيت Intlayer Markdown في تطبيقك. |
