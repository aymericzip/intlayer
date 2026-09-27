---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/react-i18next: محوّل توافق لـ react-i18next"
description: "احتفظ بشيفرة react-i18next وقدّمها عبر Intlayer: ثبّت @intlayer/react-i18next، واضبط أسماء بديلة للاستيرادات، واكتشف ما يغيّره المحوّل داخليًا."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# @intlayer/react-i18next: محوّل توافق لـ react-i18next

للحصول على برنامج تعليمي مفصل وكامل خطوة بخطوة، يرجى مراجعة [دليل الترحيل الكامل من react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md).

- [دليل الترحيل الكامل من react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md)

يسمح استخدام محول التوافق في Intlayer بترحيل من `react-i18next` دون أي تغييرات على واردات الكود المصدري الخاص بك.

## ما يجب فعله

لتهيئة المشروع، قم بتشغيل:

```bash
npx intlayer init --interactive
```

أثناء التهيئة، سيقوم Intlayer بتثبيت `@intlayer/react-i18next` وإنشاء `intlayer.config.ts`. في bundler الخاص بك (مثل Vite)، طبّق مكوّن Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## كيف يعمل تحت الغطاء

يغلّف `reactI18nextVitePlugin` مكوّن `vite-intlayer` الأساسي ويحقن اسم مستعار resolve لـ `react-i18next` و `i18next`، مما يعيد توجيهها إلى `@intlayer/react-i18next` و `@intlayer/i18next`.

تحت الغطاء:

- **`useTranslation` و `withTranslation`:** معاد كتابتها لاستخدام خطافات Intlayer الأصلية، مما يمنحك إكمال تلقائي لـ TypeScript لمفاتيح القاموس الخاصة بك. يدعم بسلاسة namespaces (مثل `t('namespace:key')`).
- **الجمع والسياق:** يتعامل مع جمع i18next المبني على اللاحقات (`key_one` و `key_other`) باستخدام `Intl.PluralRules` الأصلي ولواحق السياق (`key_male`).
- **مكوّن `<Trans>`:** معاد تنفيذه لدعم prop `components`، صيغ الكائن والمصفوفة، والعلامات المرقمة `<1>...</1>` المعيّنة مباشرة إلى عقد React الخاصة بك.
- **نموذج `i18n`:** يحل المفاتيح مباشرة من Intlayer دون جلب ملفات JSON كبيرة، مما يؤدي إلى أحجام bundle أصغر بشكل كبير.

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
