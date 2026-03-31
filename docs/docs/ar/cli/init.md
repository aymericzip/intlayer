---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: تهيئة Intlayer
description: تعرف على كيفية تهيئة Intlayer في مشروعك.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "إضافة خيار --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
---

# تهيئة Intlayer

```bash
npx intlayer init
```

يقوم الأمر `init` بتكوين Intlayer تلقائيًا في مشروعك عن طريق إنشاء الملفات والإعدادات اللازمة. هذه هي الطريقة الموصى بها للبدء مع Intlayer.

## الأسماء المستعارة:

- `npx intlayer init`

## الوسائط:

- `--project-root [projectRoot]` - اختياري. حدد الدليل الجذر للمشروع. إذا لم يتم توفيره ، فسيقوم الأمر بالبحث عن جذر المشروع بدءًا من دليل العمل الحالي.
- `--no-gitignore` - اختياري. يتخطى التحديث التلقائي لملف `.gitignore`. إذا تم تعيين هذا العلم ، فلن يتم إضافة `.intlayer` إلى `.gitignore`.

## ماذا يفعل:

يقوم أمر `init` بمهام الإعداد التالية:

1. **التحقق من صحة هيكل المشروع** - يضمن أنك في دليل مشروع صالح مع ملف `package.json`.
2. **تحديث `.gitignore`** - يضيف `.intlayer` إلى ملف `.gitignore` الخاص بك لاستبعاد الملفات التي تم إنشاؤها من التحكم في الإصدار (يمكن تخطيه باستخدام `--no-gitignore`).
3. **تكوين TypeScript** - يقوم بتحديث أي ملفات `tsconfig.json` لتشمل تعريفات أنواع Intlayer (`.intlayer/**/*.ts`).
4. **إنشاء ملف التكوين** - ينشئ `intlayer.config.ts` (لمشاريع TypeScript) أو `intlayer.config.mjs` (لمشاريع JavaScript) مع الإعدادات الافتراضية.
5. **تحديث تكوين Vite** - إذا تم اكتشاف ملف تكوين Vite ، فسيضيف استيراد لبرنامج المساعدة `vite-intlayer`.
6. **تحديث تكوين Next.js** - إذا تم اكتشاف ملف تكوين Next.js ، فسيضيف استيراد لبرنامج المساعدة `next-intlayer`.

## أمثلة:

### التهيئة الأساسية:

```bash
npx intlayer init
```

يؤدي هذا إلى تهيئة Intlayer في الدليل الحالي ، مع اكتشاف جذر المشروع تلقائيًا.

### التهيئة مع جذر مشروع مخصص:

```bash
npx intlayer init --project-root ./my-project
```

يؤدي هذا إلى تهيئة Intlayer في الدليل المحدد.

### التهيئة دون تحديث .gitignore:

```bash
npx intlayer init --no-gitignore
```

سيؤدي هذا إلى إعداد جميع ملفات التكوين ولكنه لن يعدل ملف `.gitignore` الخاص بك.

## مثال على المخرجات:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## ملاحظات:

- الأمر متكرر (idempotent) - يمكنك تشغيله بأمان عدة مرات. سيتم تخطي الخطوات المكونة بالفعل.
- إذا كان ملف التكوين موجودًا بالفعل ، فلن يتم استبداله.
- يتم تخطي تكوينات TypeScript بدون مصفوفة `include` (على سبيل المثال ، تكوينات نمط الحل مع المراجع).
- سيتوقف الأمر مع خطأ إذا لم يتم العثور على `package.json` في جذر المشروع.
