# الوثائق: `getPathWithoutLocale` الدوال في `intlayer`

## الوصف:

يتم إزالة جزء اللغة من عنوان URL أو المسار المقدم إذا كان موجودًا. يعمل مع كل من عناوين URL المطلقة والمسارات النسبية.

## المعلمات:

- `inputUrl: string`

  - **الوصف**: سلسلة عنوان URL الكاملة أو المسار المراد معالجته.
  - **النوع**: `string`

- `locales: Locales[]`
  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. الافتراضي هو اللغات المكونة في المشروع.
  - **النوع**: `Locales[]`

## الإرجاع:

- **النوع**: `string`
- **الوصف**: سلسلة عنوان URL أو المسار بدون جزء اللغة.

## مثال على الاستخدام:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // الناتج: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // الناتج: "https://example.com/dashboard"
```
