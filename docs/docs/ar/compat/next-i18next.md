---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من next-i18next إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق Next.js الخاص بك من next-i18next إلى Intlayer باستخدام محول التوافق.
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من next-i18next إلى Intlayer

للحصول على برنامج تعليمي مفصل وكامل خطوة بخطوة، يرجى مراجعة [دليل الترحيل الكامل من next-i18next](../migration_from_next-i18next_to_intlayer.md).

يتعامل Intlayer مع جميع تنفيذات Next.js Pages Router و App Router بشكل شفاف. يسمح استخدام المحول بترحيل تنفيذ `next-i18next` الخاص بك دون إعادة كتابة رمز.

## ما يجب فعله

للبدء، قم بتشغيل:

```bash
npx intlayer init
```

هذا ينشئ ملف الإعداد المطلوب في Intlayer. لللتبديل إلى Intlayer خلف الكواليس، قم بتحديث `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## كيف يعمل تحت الغطاء

يقوم `createNextI18nPlugin` بتكوين السلوك الأصلي لـ Next.js جنباً إلى جنب مع مكوّن `next-intlayer` الأساسي، بحقن جميع أسماء مستعارة Webpack/Turbopack المطلوبة لـ `next-i18next` و `react-i18next` و `i18next`.

تحت الغطاء:

- **`serverSideTranslations` و `appWithTranslation`:** يعملان الآن كـ wrappers لمحملات Intlayer الداخلية، متجاوزين حقن JSON الثابتة الكبيرة.
- **خطافات العميل:** تفوّض فوراً إلى `@intlayer/react-i18next` مع الحفاظ على جميع ميزات التنسيق والجمع والـ namespace المتداخلة.
