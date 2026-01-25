---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: هل يمكنني ترجمة مسار الرابط؟
description: تعرف على كيفية ترجمة مسار الرابط.
keywords:
  - array
  - content
  - declaration
  - intlayer
  - middleware
  - proxy
  - rewrite
  - prefix
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# هل من الممكن ترجمة الروابط؟

نعم! يدعم Intlayer عمليات إعادة توجيه الروابط المخصصة، والتي تسمح لك بتحديد مسارات خاصة باللغة. على سبيل المثال:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

لتنفيذ ذلك، يمكنك تكوين قسم `routing` في ملف `intlayer.config.ts` الخاص بك.

لمزيد من المعلومات حول كيفية تنفيذ هذه الميزة، راجع [وثائق إعادة توجيه الروابط المخصصة](/docs/concept/custom_url_rewrites).

يمكنك أيضًا استخدام وظائف `getMultilingualUrl` و `getLocalizedUrl` لإنشاء هذه الروابط برمجياً، وستحترم قواعد إعادة التوجيه الخاصة بك.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (إذا تم تكوينه)
```
