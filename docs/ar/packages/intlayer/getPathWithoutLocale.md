# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description:

يستخدم لإزالة الجزء الخاص بالموضع من عنوان URL أو مسار معين إذا كان موجودًا. يعمل مع كل من URLs المطلقة والمسارات النسبية.

## Parameters:

- `inputUrl: string`

  - **Description**: سلسلة URL الكاملة أو مسار معين لمعالجته.
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: مصفوفة اختيارية من المواقع المدعومة. بشكل افتراضي، يتم استخدام المواقع المكونة في المشروع.
  - **Type**: `Locales[]`

## Returns:

- **Type**: `string`
- **Description**: سلسلة URL أو مسار معين بدون الجزء الخاص بالموضع.

## Example Usage:

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```
