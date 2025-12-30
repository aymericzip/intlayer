---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: تهيئة Intlayer
description: تعرّف على كيفية تهيئة Intlayer في مشروعك.
keywords:
  - تهيئة
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: إضافة أمر init
---

# تهيئة Intlayer

```bash
npx intlayer init
```

يقوم الأمر `init` تلقائيًا بإعداد Intlayer في مشروعك عن طريق تكوين الملفات والإعدادات اللازمة. إنها الطريقة الموصى بها للبدء مع Intlayer.

## الاختصارات:

- `npx intlayer init`

## المعاملات:

- `--project-root [projectRoot]` - اختياري. تحديد دليل جذر المشروع. إذا لم يُقدّم، سيبحث الأمر عن جذر المشروع بدءًا من دليل العمل الحالي.

## ما الذي يفعله:

يؤدي الأمر `init` مهام الإعداد التالية:

1. **التحقق من بنية المشروع** - يتأكد من أنك في دليل مشروع صالح يحتوي على ملف `package.json`
2. **تحديث `.gitignore`** - يضيف `.intlayer` إلى ملف `.gitignore` الخاص بك لاستبعاد الملفات المُولّدة من نظام التحكم بالإصدار
3. **تكوين TypeScript** - يقوم بتحديث جميع ملفات `tsconfig.json` لتضمين تعريفات نوع Intlayer (`.intlayer/**/*.ts`)
4. **إنشاء ملف التكوين** - ينشئ `intlayer.config.ts` (لمشاريع TypeScript) أو `intlayer.config.mjs` (لمشاريع JavaScript) بالإعدادات الافتراضية
5. **تحديث تكوين Vite** - إذا تم اكتشاف ملف تكوين Vite، يضيف استيراد البلجن `vite-intlayer`
6. **تحديث تكوين Next.js** - إذا تم اكتشاف ملف تكوين Next.js، يضيف استيراد البلجن `next-intlayer`

## أمثلة:

### التهيئة الأساسية:

```bash
npx intlayer init
```

سيقوم هذا بتهيئة Intlayer في الدليل الحالي، مع اكتشاف جذر المشروع تلقائيًا.

### التهيئة مع جذر مشروع مخصص:

```bash
npx intlayer init --project-root ./my-project
```

سيقوم هذا بتهيئة Intlayer في الدليل المحدد.

## مخرجات المثال:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## ملاحظات:

- الأمر idempotent - يمكنك تشغيله عدة مرات بأمان. سيتخطى الخطوات التي تم تكوينها بالفعل.
- إذا كان ملف تكوين موجودًا بالفعل، فلن يتم الكتابة فوقه.
- يتم تخطي ملفات تكوين TypeScript التي لا تحتوي على مصفوفة `include` (مثل ملفات التكوين بنمط solution التي تحتوي على مراجع).
- سينهي الأمر التنفيذ مع خطأ إذا لم يتم العثور على `package.json` في جذر المشروع.
