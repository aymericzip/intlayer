---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu hàm getLocale | intlayer
description: Xem cách sử dụng hàm getLocale cho package intlayer
keywords:
  - getLocale
  - dịch
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu hàm getLocale

Hàm `getLocale` cho phép bạn phát hiện locale từ một chuỗi được cung cấp, chẳng hạn như một URL hoặc một đường dẫn.

## Cách sử dụng

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Tham số

| Tham số | Kiểu     | Mô tả                                      |
| ------- | -------- | ------------------------------------------ |
| `path`  | `string` | Đường dẫn hoặc chuỗi để trích xuất locale. |

## Trả về

Locale được phát hiện, hoặc locale mặc định nếu không phát hiện được locale.
