---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Tôi có thể dịch đường dẫn url không?
description: Tìm hiểu cách dịch đường dẫn url.
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

# Có thể dịch url như sau không:

```bash
en -> /product (không có tiền tố) hoặc /en/product (có tiền tố)
fr -> /fr/produit
es -> /es/producto
```

Rất tiếc, Intlayer không cho phép dịch các URL như đã chỉ định. Để thực hiện điều này, bạn nên sử dụng middleware hoặc proxy riêng của mình để viết lại các URL.

Nhưng bạn có thể sử dụng hàm `getMultilingualUrl` để chèn tiền tố vào url cho một locale nhất định.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (không có tiền tố) hoặc /en/product (có tiền tố)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Hoặc `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
