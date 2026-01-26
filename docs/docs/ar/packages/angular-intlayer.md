---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "توثيق حزمة angular-intlayer"
description: "تكامل مخصص لـ Intlayer في إطار Angular، يوفر مزودات وخدمات لتطبيقات Angular."
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "توحيد التوثيق لجميع الصادرات"
---

# حزمة angular-intlayer

توفر حزمة `angular-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Angular. تتضمن مزودات (providers) وخدمات (services) للتعامل مع المحتوى متعدد اللغات.

## التثبيت

```bash
npm install angular-intlayer
```

## الصادرات

### الإعداد

| دالة              | الوصف                                           |
| ----------------- | ----------------------------------------------- |
| `provideIntlayer` | دالة لتوفير Intlayer في تطبيق Angular الخاص بك. |

### الخدمات

| الخدمة            | الوصف                                                   |
| ----------------- | ------------------------------------------------------- |
| `IntlayerService` | خدمة تختار قاموسًا واحدًا بواسطة مفتاحه وتُعيد المحتوى. |
| `LocaleService`   | خدمة تُعيد الـ locale الحالي ودالة لتعيينه.             |

### المكونات

| المكون                      | الوصف                                         |
| --------------------------- | --------------------------------------------- |
| `IntlayerMarkdownComponent` | مكوّن Angular يقوم بعرض محتوى بصيغة Markdown. |
