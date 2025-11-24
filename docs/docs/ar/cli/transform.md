---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: تحويل المكونات
description: تعلّم كيفية تحويل المكونات الحالية لاستخدام Intlayer.
keywords:
  - تحويل
  - مكونات
  - ترحيل
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# تحويل المكونات

```bash
npx intlayer transform
```

يقوم هذا الأمر بتحليل ملفات الكود الخاصة بك لمساعدتك في ترحيل المكونات الحالية لاستخدام Intlayer. يدعم اختيار الملفات بشكل تفاعلي أو استهداف ملفات محددة.

## الأسماء المستعارة:

- `npx intlayer trans`

## الوسائط:

**خيارات اختيار الملفات:**

- **`-f, --file [files...]`**: قائمة بالملفات المحددة التي تريد تحويلها. إذا لم يتم توفيرها، سيقوم CLI بفحص الملفات المطابقة (`**/*.{tsx,jsx,vue,svelte,ts,js}`) ويطلب منك اختيار الملفات التي تريد تحويلها.

  > مثال: `npx intlayer transform -f src/components/MyComponent.tsx`

**خيارات الإخراج:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: الدليل لحفظ ملفات إعلان المحتوى المُولدة.

  > مثال: `npx intlayer transform -o src/content`

- **`--code-only`**: تحويل كود المكون فقط (دون كتابة إعلان المحتوى).

  > مثال: `npx intlayer transform --code-only`

- **`--declaration-only`**: توليد إعلان المحتوى فقط (دون إعادة كتابة المكون).

  > مثال: `npx intlayer transform --declaration-only`

**خيارات التهيئة:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--env`**: تحديد البيئة.
- **`--env-file`**: توفير ملف بيئة مخصص.
- **`--verbose`**: تمكين تسجيل الدخول التفصيلي.

**الإضافات المطلوبة:**

يعمل أمر التحويل بدون إضافات إضافية على ملفات TypeScript / JSX. ومع ذلك، يتطلب تثبيت الإضافات التالية لمشاريع Vue و Svelte:

- **`@intlayer/vue-transformer`**: لملفات Vue.
- **`@intlayer/svelte-transformer`**: لملفات Svelte.
