---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getPathWithoutLocale | intlayer
description: تعرف على كيفية استخدام دالة getPathWithoutLocale لحزمة intlayer
keywords:
  - getPathWithoutLocale
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
---

# التوثيق: دالة `getPathWithoutLocale` في `intlayer`

## الوصف

تقوم بإزالة جزء اللغة من عنوان URL أو مسار الصفحة إذا كان موجودًا. تعمل مع كل من عناوين URL المطلقة والمسارات النسبية.

## المعاملات

- `inputUrl: string`

  - **الوصف**: سلسلة عنوان URL كاملة أو مسار الصفحة لمعالجتها.
  - **النوع**: `string`

- `locales: Locales[]`
  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. القيمة الافتراضية هي اللغات المكونة في المشروع.
  - **النوع**: `Locales[]`

## القيم المرجعة

- **النوع**: `string`
- **الوصف**: سلسلة عنوان URL أو مسار الصفحة بدون جزء اللغة.

## مثال على الاستخدام

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // الناتج: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // الناتج: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // الناتج: "https://example.com/dashboard"
```

## تاريخ التوثيق

- 5.5.10 - 2025-06-29: بداية السجل
