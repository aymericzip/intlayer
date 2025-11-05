---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getPathWithoutLocale | intlayer
description: Xem cách sử dụng hàm getPathWithoutLocale cho gói intlayer
keywords:
  - getPathWithoutLocale
  - dịch thuật
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getPathWithoutLocale` trong `intlayer`

## Mô tả

Loại bỏ đoạn locale khỏi URL hoặc pathname được cung cấp nếu có. Hàm hoạt động với cả URL tuyệt đối và pathname tương đối.

## Tham số

- `inputUrl: string`
  - **Mô tả**: Chuỗi URL đầy đủ hoặc pathname cần xử lý.
  - **Kiểu**: `string`

- `locales: Locales[]`
  - **Mô tả**: Mảng tùy chọn các locale được hỗ trợ. Mặc định là các locale đã được cấu hình trong dự án.
  - **Kiểu**: `Locales[]`

## Trả về

- **Kiểu**: `string`
- **Mô tả**: Chuỗi URL hoặc pathname đã loại bỏ đoạn locale.

## Ví dụ sử dụng

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Kết quả: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Kết quả: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Kết quả: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Kết quả: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Kết quả: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Kết quả: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Kết quả: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Kết quả: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Kết quả: "https://example.com/dashboard"
```
