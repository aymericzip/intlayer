---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من i18next إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق Vanilla JS/TS الخاص بك من i18next إلى Intlayer باستخدام محول التوافق.
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من i18next إلى Intlayer

للحصول على برنامج تعليمي مفصل خطوة بخطوة، يرجى مراجعة [دليل الترحيل الكامل من i18next](../migration_from_i18next_to_intlayer.md).

يكرّر Intlayer بشكل مثالي خصائص runtime الأساسية لـ `i18next`. باستخدام حزمة التوافق، يمكن لتطبيقاتك Vanilla أو الوحدات الداخلية الاستمرار في الاستفادة من الصيغة المألوفة.

## ما يجب فعله

للبدء، قم بتهيئة Intlayer في مشروعك:

```bash
npx intlayer init
```

إذا كنت تستخدم Vite، فضمّن مكوّن Intlayer لتوجيه الواردات إلى `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## كيف يعمل تحت الغطاء

يقوم `i18nextVitePlugin` بإنشاء اسم مستعار لواردات `i18next` إلى `@intlayer/i18next`، مما يتجنب انتفاخ bundle من استيراد الملفات JSON.

تحت الغطاء:

- **تكوين النموذج:** `createInstance` يحلل بشكل صحيح ويطبق namespace fallbacks أثناء الاستفادة من pipeline الترجمة في Intlayer لاسترجاع القاموس.
- **الاستيفاء:** دعم أصلي لاستبدالات `{{name}}` و `$t(key)` متداخلة بشكل متكرر.
- **Context والجمع:** يحدد ويحل صيغ اللاحقة مثل `key_male` و `key_one`/`key_other` تقييمًا ضد `Intl.PluralRules` المعياري.
- **إرجاع الكائنات:** يستخرج وضع `returnObjects: true` الأشجار بأمان من قواميس Intlayer.
