---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: استخراج السلاسل
description: تعلم كيفية استخراج السلاسل من مكوناتك إلى ملف .content بجانب المكون.
keywords:
  - استخراج
  - مكونات
  - هجرة
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# استخراج السلاسل

```bash
npx intlayer extract
```

يقوم هذا الأمر بتحليل ملفات الشيفرة الخاصة بك لاستخراج السلاسل من المكونات إلى ملف .content بجانب المكون. يدعم اختيار الملفات بشكل تفاعلي أو استهداف ملفات محددة.

## الاختصارات:

- `npx intlayer ext`

## المعاملات:

**خيارات اختيار الملفات:**

- **`-f, --file [files...]`**: قائمة بالملفات المحددة لاستخراجها. إذا لم يتم تحديدها، سيقوم CLI بمسح للعثور على الملفات المطابقة (`**/*.{tsx,jsx,vue,svelte,ts,js}`) وسيطلب منك اختيار الملفات التي تريد استخراجها.

  > مثال: `npx intlayer extract -f src/components/MyComponent.tsx`

**خيارات الإخراج:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: الدليل لحفظ ملفات إعلانات المحتوى المولّدة.

  > مثال: `npx intlayer extract -o src/content`

- **`--code-only`**: استخراج كود المكون فقط (لا يكتب إعلان المحتوى).

  > مثال: `npx intlayer extract --code-only`

- **`--declaration-only`**: إنشاء إعلان المحتوى فقط (لا يعيد كتابة المكون).

  > مثال: `npx intlayer extract --declaration-only`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--env`**: تحديد البيئة.
- **`--env-file`**: تحديد ملف بيئة مخصّص.
- **`--verbose`**: تمكين التسجيل التفصيلي.

**الإضافات المطلوبة:**

يعمل أمر extract دون الحاجة إلى إضافات على ملفات TypeScript / JSX. ومع ذلك، يتطلب تثبيت الإضافات التالية لمشاريع Vue و Svelte:

- **`@intlayer/vue-transformer`**: لملفات Vue.
- **`@intlayer/svelte-transformer`**: لملفات Svelte.
