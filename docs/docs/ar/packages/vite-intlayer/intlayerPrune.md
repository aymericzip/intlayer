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
author: aymericzip
---

# توثيق مكوّن intlayerPrune لـ Vite

يُستخدم المكوّن الإضافي `intlayerPrune` الخاص بـ Vite لإجراء tree-shaking وإزالة (prune) القواميس غير المستخدمة من حزمة التطبيق الخاصة بك. يساعد ذلك في تقليل حجم الحزمة النهائي باشتراط تضمين المحتوى متعدد اللغات الضروري فقط.

## الاستخدام

### كجزء من `intlayer()` (موصى به)

قم بتفعيل التنقية من خلال إعدادات Intlayer والمكون الرئيسي يتعامل مع كل شيء:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // تفعيل كل من التنقية والضغط
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### مستقل

إذا كنت تؤلف مكدس المكونات الإضافية يدويًا، فإن `intlayerPrune` و `intlayerMinify` يشتركان في كائن `PruneContext` يجب إنشاؤه مرة واحدة وتمريره إلى كليهما:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // اختياري، يقرأ من نفس السياق
  ],
});
```

## كيف يعمل

### 1. تحليل الاستخدام (buildStart)

أثناء `buildStart`، يقوم plugin `intlayerOptimize` (وهو أيضًا جزء من `intlayer()`) بفحص كل ملف مصدر مكون مدرج في `build.filesList`. لكل استدعاء `useIntlayer('key')` أو `getIntlayer('key')`، يسجل بالضبط الحقول التي تم الوصول إليها، على سبيل المثال:

```ts
const { title, description } = useIntlayer("myDict");
// السجل: myDict → { title, description }
```

وهذا يبني `pruneContext.fieldUsageMap` قبل تشغيل أي استدعاءات `transform`.

### 2. تقليص JSON (transform, enforce: 'pre')

عندما تعالج Vite ملف قاموس JSON مُترجَم، يعترض `intlayerPrune` عملية التحويل قبل تحويل JSON → ESM المدمج في Vite. يقرأ خريطة استخدام الحقول من `pruneContext` ويزيل أي حقل محتوى غير مسجل في مجموعة الاستخدام.

تُدعم شكلان من المحتوى:

- **القواميیس الثابتة** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. يتم تقليص الحقول لكل لغة داخل `translation`.
- **القواموس الديناميكية (لكل لغة)** — `{ fieldA: ..., fieldB: ... }` مسطحة. يتم تقليص الحقول على المستوى الأعلى.

### 3. حالات خاصة

إذا لم يتمكن النظام من التعرف على هيكل محتوى القاموس (على سبيل المثال، شكل متداخل غير عادي)، يتم إضافته إلى `pruneContext.dictionariesWithEdgeCases` و**تركه دون تعديل**. يتم تسجيل تحذير. يتخطى `intlayerMinify` أيضاً هذه القواميس.

### 4. خريطة إعادة تسمية الحقول

عند نجاح التقليص، يكتب `intlayerPrune` أيضًا `pruneContext.dictionaryKeyToFieldRenameMap` — وهي خريطة من أسماء الحقول الأصلية إلى اسم مستعار قصير. يقرأ `intlayerMinify` هذه الخريطة لإعادة تسمية الحقول في JSON الناتج، وتحديث Babel الخاص بـ `intlayerOptimize` يحدّث عمليات الوصول إلى الخصائص في ملفات المصدر وفقًا لذلك.

## الوصف

يقوم المكوّن الإضافي بتحليل شفرة المصدر الخاصة بك لتحديد مفاتيح القواميس المستخدمة فعليًا. ثم يزيل أي محتوى غير مستخدم من ملفات القواميس المدرجة في الحزمة (bundle). يكون هذا مفيدًا بشكل خاص للمشاريع الكبيرة التي تحتوي على العديد من القواميس حيث يُستخدم جزء فقط منها في صفحات أو مكونات محددة.
