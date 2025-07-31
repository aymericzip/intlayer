---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: كيفية بناء القواميس؟
description: تعلم كيفية بناء القواميس.
keywords:
  - بناء
  - قواميس
  - intlayer
  - أمر
  - مراقبة
  - vscode
  - إضافة
  - إطار عمل
  - next.js
  - vite
slugs:
  - doc
  - faq
  - build-dictionaries
---

# بناء القواميس

## كيفية بناء القواميس

يوفر Intlayer أداة سطر أوامر لبناء القواميس.

```bash
npx intlayer dictionaries build
```

يقوم هذا الأمر بـ:

- مسح جميع ملفات إعلان المحتوى (`.content.{ts,tsx,js,mjs,cjs,json,...}`) في مشروعك.
- إنشاء القواميس وتخزينها في مجلد `.intlayer/dictionary`.

### وضع المراقبة

إذا كنت ترغب في تحديث القواميس تلقائيًا عند إجراء تغييرات على ملفات إعلان المحتوى، فقم بتشغيل الأمر التالي:

```bash
npx intlayer dictionaries build --watch
```

في هذا الوضع، سيقوم Intlayer بمسح وبناء القواميس كلما تم إجراء تغييرات على ملفات إعلان المحتوى وتحديث مجلد `.intlayer/dictionary` تلقائيًا.

### استخدام إضافة VSCode

يمكنك أيضًا استخدام [إضافة Intlayer لـ VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/ar/vs_code_extension.md) لتعزيز تجربتك مع Intlayer في VSCode.

### استخدام الإضافة لإطار عمل التطبيق المفضل لديك

إذا كنت تستخدم إطار عمل مثل Next.js (Webpack / Turbopack)، Vite، أو React Native، Lynx، إلخ، فإن Intlayer يوفر إضافة يمكنك استخدامها لدمج Intlayer في تطبيقك.

سيقوم Intlayer ببناء القواميس قبل بناء تطبيقك.
وبنفس الطريقة، في وضع التطوير، سيراقب Intlayer التغييرات في ملفات إعلان المحتوى ويعيد بناء القواميس تلقائيًا.

لذا، ارجع إلى الوثائق الخاصة بإطار عملك لتتعلم كيفية دمج الإضافة.
