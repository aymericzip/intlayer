---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Tôi có thể dịch đường dẫn URL không?
description: Tìm hiểu cách dịch đường dẫn URL.
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

# Có thể dịch URL không?

Có! Intlayer hỗ trợ viết lại URL tùy chỉnh, cho phép bạn xác định các đường dẫn theo từng ngôn ngữ. Ví dụ:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Để triển khai điều này, bạn có thể cấu hình phần `routing` trong tệp `intlayer.config.ts` của mình.

Để biết thêm thông tin về cách triển khai tính năng này, hãy xem [tài liệu Viết lại URL tùy chỉnh](/docs/concept/custom_url_rewrites).

Bạn cũng có thể sử dụng các hàm `getMultilingualUrl` và `getLocalizedUrl` để tạo các URL này theo lập trình, và chúng sẽ tuân thủ các quy tắc viết lại của bạn.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (nếu đã cấu hình)
```
