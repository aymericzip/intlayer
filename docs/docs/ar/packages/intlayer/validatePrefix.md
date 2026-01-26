---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: وثائق دالة validatePrefix | intlayer
description: اطلع على كيفية استخدام دالة validatePrefix لحزمة intlayer
keywords:
  - validatePrefix
  - ترجمة
  - Intlayer
  - intlayer
  - Internationalization
  - توثيق
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# وثائق دالة validatePrefix

تتحقق الدالة `validatePrefix` مما إذا كانت بادئة معينة تعتبر بادئة locale صالحة وفقًا للتكوين.

## الاستخدام

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## المعلمات

| المعلمة | النوع | الوصف |
| `prefix` | `string` | البادئة التي سيتم التحقق منها. |

## الإرجاع

`true` إذا كانت البادئة صالحة، و`false` خلاف ذلك.
