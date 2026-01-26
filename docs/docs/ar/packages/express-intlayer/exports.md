---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer Package Documentation
description: Express middleware for Intlayer, providing translation functions and locale detection.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# حزمة express-intlayer

توفّر حزمة `express-intlayer` وسيطًا (middleware) لتطبيقات Express للتعامل مع التدويل (internationalization). تقوم باكتشاف لغة المستخدم وتوفر دوال للترجمة.

## التثبيت

```bash
npm install express-intlayer
```

## التصديرات

### الوسيط

استيراد:

```tsx
import "express-intlayer";
```

| الدالة     | الوصف                                                                                                                                                                                                                      | الوثيقة ذات الصلة                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | وسيط Express يكتشف لغة المستخدم ويملأ `res.locals` ببيانات Intlayer. يقوم باكتشاف اللغة من الكوكيز/الهيدرز، ويحقن `t` و `getIntlayer` و `getDictionary` في `res.locals`، ويعد مساحة أسماء CLS للوصول خلال دورة حياة الطلب. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/express-intlayer/intlayer.md) |

### الدوال

استيراد:

```tsx
import "express-intlayer";
```

| الدالة          | الوصف                                                                                                                                                                         | الوثيقة ذات الصلة                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | دالة ترجمة تسترجع المحتوى للـ locale الحالي. تعمل ضمن دورة حياة الطلب التي يديرها الـ middleware الخاص بـ `intlayer`. تستخدم CLS (Async Local Storage) للوصول إلى سياق الطلب. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md) |
| `getIntlayer`   | يسترجع قاموسًا بواسطة مفتاحه من التصريح المُولد ويُعيد محتواه للـ locale المحدد. نسخة محسّنة من `getDictionary`. يستخدم CLS للوصول إلى سياق الطلب.                            | -                                                                                                      |
| `getDictionary` | يعالج كائنات القاموس ويُعيد المحتوى للـ locale المحدد. يعالج ترجمات `t()`، والـ enumerations، وMarkdown، وHTML، وما إلى ذلك. يستخدم CLS للوصول إلى سياق الطلب.                | -                                                                                                      |
