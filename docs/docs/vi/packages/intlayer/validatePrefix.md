---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu hàm validatePrefix | intlayer
description: Xem cách sử dụng hàm validatePrefix cho gói intlayer
keywords:
  - validatePrefix
  - dịch
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu hàm validatePrefix

Hàm `validatePrefix` kiểm tra xem một tiền tố được cung cấp có phải là tiền tố locale hợp lệ theo cấu hình hay không.

## Cách sử dụng

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Tham số

| Tham số  | Kiểu     | Mô tả                 |
| -------- | -------- | --------------------- |
| `prefix` | `string` | Tiền tố cần xác thực. |

## Trả về

`true` nếu tiền tố hợp lệ, `false` nếu không.
