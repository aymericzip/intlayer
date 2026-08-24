---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: وثائق حزمة elysia-intlayer
description: مُكون إضافي لـ Elysia لـ Intlayer يوفر دوال ترجمة واكتشاف اللغة.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "توثيق موحّد لجميع الصادرات"
author: aymericzip
---

# حزمة elysia-intlayer

توفر حزمة `elysia-intlayer` ملحقًا لتطبيقات Elysia للتعامل مع التدويل (internationalization). تقوم باكتشاف الـ locale الخاص بالمستخدم وتحقن كائن `intlayer` في سياق المسار.

## التثبيت

```bash
npm install elysia-intlayer
```

## الصادرات

### الملحق

استيراد:

```tsx
import { intlayer } from "elysia-intlayer";
```

| الدالة     | الوصف                                                                                                                                                                                                                                                                 | الوثيقة ذات الصلة                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | ملحق Elysia يدمج Intlayer في تطبيق Elysia الخاص بك. يتولى اكتشاف الـ locale من التخزين (الكوكيز، الرؤوس) ثم من `Accept-Language`، ويحقن كائن `intlayer` يعرض `locale` و`t` و`getIntlayer` و`getDictionary` في سياق المسار، ويهيّئ سياق الطلب عبر `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/elysia-intlayer/intlayer.md) |

### الوظائف

استيراد:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| الدالة          | الوصف                                                                                                                                                                                                                    | الوثيقة ذات الصلة                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | دالة ترجمة عامة تسترجع المحتوى للـ locale الحالي في Elysia. تستخدم `AsyncLocalStorage` للوصول إلى سياق الطلب الذي يهيّئه المكوّن `intlayer`، وتعود إلى اللغة الافتراضية خارجه. يمكن الوصول إليها أيضًا عبر `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md) |
| `getIntlayer`   | يسترجع قاموسًا عبر مفتاحه من التصريح المُولَّد ويعيد محتواه للـ locale الحالي. نسخة محسّنة من `getDictionary`. يستخدم `AsyncLocalStorage` للوصول إلى سياق الطلب. يمكن الوصول إليه أيضًا عبر `intlayer.getIntlayer`.      | -                                                                                                      |
| `getDictionary` | يعالج كائنات القواميس ويعيد المحتوى للـ locale الحالي. يعالج ترجمات `t()` والتعدادات وmarkdown وHTML وغيرها. يستخدم `AsyncLocalStorage` للوصول إلى سياق الطلب. يمكن الوصول إليه أيضًا عبر `intlayer.getDictionary`.      | -                                                                                                      |

### الأنواع

استيراد:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| النوع               | الوصف                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | شكل كائن `intlayer` المحقون في كل سياق مسار: `locale`، `locale_storage`، `locale_detected`، `defaultLocale`، `t`، `getIntlayer`، `getDictionary`. |
| `TranslateFunction` | توقيع دالة الترجمة التي تحوّل locale map إلى المحتوى المطابق للـ locale الخاص بالطلب الحالي.                                                      |
