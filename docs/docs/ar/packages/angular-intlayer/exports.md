---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة angular-intlayer
description: تكامل مخصص لـ Angular مع Intlayer، يوفر providers و services لتطبيقات Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# حزمة angular-intlayer

توفر حزمة `angular-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Angular. تتضمن providers و services للتعامل مع المحتوى متعدد اللغات.

## التثبيت

```bash
npm install angular-intlayer
```

## التصديرات

استيراد:

```tsx
import "angular-intlayer";
```

### الإعداد

| الدالة            | الوصف                                           |
| ----------------- | ----------------------------------------------- |
| `provideIntlayer` | دالة لتوفير Intlayer في تطبيق Angular الخاص بك. |

### الـ Hooks

| الـ Hook               | الوصف                                                                                                 | المستند ذو الصلة |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ---------------- |
| `useIntlayer`          | مبنية على `useDictionary`، لكنها تحقن نسخة مُحسّنة من القاموس مأخوذة من التصريح المُولد.              | -                |
| `useDictionary`        | يعالج الكائنات التي تشبه القواميس (مفتاح، محتوى). يعالج ترجمات `t()`، والتعدادات (enumerations)، إلخ. | -                |
| `useDictionaryAsync`   | نفس عمل `useDictionary`، لكنه يتعامل مع القواميس غير المتزامنة (asynchronous).                        | -                |
| `useDictionaryDynamic` | نفس عمل `useDictionary`، لكنه يتعامل مع القواميس الديناميكية (dynamic).                               | -                |
| `useLocale`            | يعيد الـ locale الحالي ودالة لتعيينه.                                                                 | -                |
| `useIntl`              | يعيد كائن Intl للـ locale الحالي.                                                                     | -                |
| `useLoadDynamic`       | Hook لتحميل القواميس الديناميكية.                                                                     | -                |

### المكوّنات

| المكوّن                     | الوصف                                   |
| --------------------------- | --------------------------------------- |
| `IntlayerMarkdownComponent` | مكوّن Angular يقوم بعرض محتوى Markdown. |
