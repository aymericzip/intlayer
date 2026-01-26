---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق دالة getLocale | intlayer
description: اطلع على كيفية استخدام دالة getLocale لحزمة intlayer
keywords:
  - getLocale
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: تهيئة المستند
---

# توثيق دالة getLocale

تسمح لك الدالة `getLocale` باكتشاف الـ locale من سلسلة نصية معينة، مثل عنوان URL أو مسار (path).

## الاستخدام

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## المعلمات

| المعامل | النوع    | الوصف                                       |
| ------- | -------- | ------------------------------------------- |
| `path`  | `string` | المسار أو النص الذي يُستخرج منه الـ locale. |

## القيمة المرجعة

الـ locale المُكتَشَف، أو الـ locale الافتراضي إذا لم يتم اكتشاف أي locale.
