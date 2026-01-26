---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق مكوّن Vite الخاص بـ intlayer | vite-intlayer
description: اطلع على كيفية استخدام مكوّن intlayer لحزمة vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: تهيئة المستند
---

# توثيق مكوّن Vite الخاص بـ intlayer

يقوم مكوّن Vite `intlayer` بدمج إعدادات Intlayer في عملية البناء. يتعامل مع اختصارات القواميس (dictionary aliases)، ويشغّل مراقب القواميس في وضع التطوير، ويجهّز القواميس للبناء.

## الاستخدام

```ts
// ملف vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## الوصف

يقوم الملحق بالمهام التالية:

1. **تحضير القواميس**: يقوم بتجميع القواميس إلى ملفات مُحسّنة في بداية عملية البناء أو تشغيل وضع التطوير.
2. **وضع المراقبة**: في وضع التطوير، يراقب التغييرات في ملفات القواميس ويُعيد تجميعها تلقائيًا.
3. **الاختصارات (Aliases)**: يوفر اختصارات للوصول إلى القواميس في تطبيقك.
4. **Tree-shaking**: يدعم إزالة الترجمات غير المستخدمة عبر الإضافة `intlayerPrune`.
