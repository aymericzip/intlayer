---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: هل يمكنني ترجمة مسار عنوان URL؟
description: تعلّم كيفية ترجمة مسار عنوان URL.
keywords:
  - مصفوفة
  - محتوى
  - إعلان
  - intlayer
  - وسيط
  - وكيل
  - إعادة كتابة
  - بادئة
  - لغة
  - عنوان URL
slugs:
  - frequent-questions
  - translated-path-url
---

# هل من الممكن ترجمة عنوان URL كما يلي:

```bash
en -> /product (بدون بادئة) أو /en/product (مع بادئة)
fr -> /fr/produit
es -> /es/producto
```

لسوء الحظ، لا يسمح Intlayer بترجمة عناوين URL كما هو محدد. لتحقيق ذلك، يجب عليك استخدام وسيط خاص بك أو وكيل لإعادة كتابة عناوين URL.

ولكن يمكنك استخدام دالة `getMultilingualUrl` لإدخال البادئة في عنوان URL للغة معينة.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (بدون بادئة) أو /en/product (مع بادئة)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

أو `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
