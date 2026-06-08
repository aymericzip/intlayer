---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "توثيق مكوّن intlayerPrune لـ Vite | vite-intlayer"
description: "اطّلع على كيفية استخدام المكوّن الإضافي intlayerPrune لحزمة vite-intlayer"
keywords:
  - intlayerPrune
  - vite
  - مكوّن إضافي
  - tree-shaking
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "إنشاء التوثيق"
---

# توثيق مكوّن intlayerPrune لـ Vite

يُستخدم المكوّن الإضافي `intlayerPrune` الخاص بـ Vite لإجراء tree-shaking وإزالة (prune) القواميس غير المستخدمة من حزمة التطبيق الخاصة بك. يساعد ذلك في تقليل حجم الحزمة النهائي باشتراط تضمين المحتوى متعدد اللغات الضروري فقط.

## الاستخدام

```ts
// ملف vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## الوصف

يقوم المكوّن الإضافي بتحليل شفرة المصدر الخاصة بك لتحديد مفاتيح القواميس المستخدمة فعليًا. ثم يزيل أي محتوى غير مستخدم من ملفات القواميس المدرجة في الحزمة (bundle). يكون هذا مفيدًا بشكل خاص للمشاريع الكبيرة التي تحتوي على العديد من القواميس حيث يُستخدم جزء فقط منها في صفحات أو مكونات محددة.
