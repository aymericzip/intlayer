---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: محوّل توافق لـ next-intl"
description: "احتفظ بشيفرة next-intl وقدّمها عبر Intlayer: ثبّت @intlayer/next-intl، واضبط أسماء بديلة للاستيرادات، واكتشف ما يغيّره المحوّل داخليًا."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# @intlayer/next-intl: محوّل توافق لـ next-intl

للحصول على برنامج تعليمي مفصل وكامل خطوة بخطوة، يرجى مراجعة [دليل الترحيل الكامل من next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md).

- [دليل الترحيل الكامل من next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md)

يسمح الترحيل من `next-intl` إلى Intlayer بالحفاظ على التوجيه والصيغة الخاصة بتطبيقك دون تضرر.

## ما يجب فعله

قم بتنفيذ الأمر التالي في المستودع الخاص بك:

```bash
npx intlayer init --interactive
```

سيؤدي هذا إلى إنشاء ملف `intlayer.config.ts`. في `next.config.ts`، استخدم wrapper المكوّن للحقن السلس لأسماء مستعارة `next-intl` نحو `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## كيف يعمل تحت الغطاء

يستبدل wrapper bundler الترجمات، لكن **يترك ميزات `next-intl/navigation` سليمة** (مثل `Link` و `redirect` و `usePathname`).

تحت الغطاء:

- **ICU runtime:** تعمل علامات الجمع (`=0` و `one` و `other`) و select/selectordinal و `#` والوسائط المنسقة (`{ts, date, long}`) بشكل صحيح باستخدام محلل `resolveMessage(..., 'icu')` المشترك.
- **`useTranslations()` و `getTranslations()`:** تستخرج استدعاءات النطاق الحافي أول جزء من المفتاح كمعرّف قاموس صحيح. يتم تقسيم الـ namespaces المتداخلة برشاقة إلى مسارات ومحدثات قاموس.
- **Rich formatting:** يتم تنفيذ `t.rich()` و `t.markup()` بالكامل بشكل أصلي، مما يحول الكود الشبيه بـ HTML إلى أجزاء React المعروضة.
- **`useFormatter`:** `relativeTime` و `list` و `dateTimeRange` والصيغ المسماة من إعدادات التكوين تنتقل إلى محولات `Intl` الأصلية الأساسية.

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
