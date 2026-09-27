---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/vue-i18n: محوّل توافق لـ vue-i18n"
description: "احتفظ بشيفرة vue-i18n وقدّمها عبر Intlayer: ثبّت @intlayer/vue-i18n، واضبط أسماء بديلة للاستيرادات، واكتشف ما يغيّره المحوّل داخليًا."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# @intlayer/vue-i18n: محوّل توافق لـ vue-i18n

إذا كان تطبيق Vue الخاص بك يستخدم حالياً `vue-i18n`، فيمكنك الترحيل إلى Intlayer دون إعادة كتابة المكونات أو خطافات الترجمة. توفر Intlayer محول توافق يعكس بشكل مثالي واجهة برمجية `vue-i18n` بينما يستفيد من الميزات القوية في Intlayer تحت الغطاء.

## ما يجب فعله

للبدء، ما عليك سوى تشغيل أمر التهيئة في مشروعك:

```bash
npx intlayer init --interactive
```

أثناء التهيئة، سيقوم Intlayer بإعداد ملف التكوين الخاص بك (`intlayer.config.ts`) وتحضير مشروعك للترحيل. ستحتاج فقط إلى إضافة مكوّن Intlayer إلى تكوين Vite لإنشاء اسم مستعار تلقائياً لواردات `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## كيف يعمل تحت الغطاء

يحقن `vueI18nVitePlugin` اسم مستعار module في bundler الخاص بك. أي استيراد لـ `vue-i18n` في codebase الخاص بك سيتم إعادة توجيهه بشكل شفاف إلى `@intlayer/vue-i18n`.

**تحت الغطاء، يتعامل المحول مع صيغة `vue-i18n` المعقدة بشكل أصلي:**

- **الاستيفاء والجمع:** يحل استيفاءات `{name}` و list `{0}`. يتم تحويل جمع pipe (`"car | cars"`) إلى عقد enumeration/plural في Intlayer بناءً على semantics موضعي.
- **الصيغ:** تقوم وظائف مثل `d()` و `n()` بتغليف `Intl` تحت الغطاء، احترام `datetimeFormats` و `numberFormats` المحددة في خياراتك.
- **الحالة العامة والمحلية:** `global.locale` معيّن إلى `WritableComputedRef` مدعوم بـ client Intlayer، لذا تتصرف reactivity بالضبط كما هو متوقع (مثل `locale.value = 'fr'`).
- **التوجيهات:** يتم تسجيل directive `v-t` وتعمل بشكل طبيعي.

يستمر تطبيقك في الإخراج بالضبط كما هو سابقاً، لكن المحتوى مدعوم من قواامس Intlayer الخاصة بك، مما يمنحك سلامة الكود والتحسين الأفضل للـ bundle والتكامل السلس مع CMS.

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
