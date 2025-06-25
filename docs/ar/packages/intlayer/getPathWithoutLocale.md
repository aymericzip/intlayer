---
docName: package__intlayer__getPathWithoutLocale
url: /doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getPathWithoutLocale | intlayer
description: انظر كيف تستخدم دالة getPathWithoutLocale لحزمة intlayer
keywords:
  - getPathWithoutLocale
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getPathWithoutLocale` وظائف في `intlayer`

## الوصف

يزيل الجزء الخاص باللغة من عنوان URL أو المسار المحدد إذا كان موجودًا. يعمل مع عناوين URL المطلقة والمسارات النسبية.

## المعلمات

- `inputUrl: string`

  - **الوصف**: سلسلة عنوان URL الكاملة أو المسار لمعالجتها.
  - **النوع**: `string`

- `locales: Locales[]`
  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. الافتراضي هو اللغات المكونة في المشروع.
  - **النوع**: `Locales[]`

## الإرجاع

- **النوع**: `string`
- **الوصف**: سلسلة عنوان URL أو المسار بدون الجزء الخاص باللغة.

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
