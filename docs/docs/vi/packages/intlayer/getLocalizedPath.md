---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Tài liệu hàm getLocalizedPath | intlayer
description: Xem cách sử dụng hàm getLocalizedPath cho gói intlayer
keywords:
  - getLocalizedPath
  - dịch
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Tài liệu: hàm `getLocalizedPath` trong `intlayer`

## Mô tả

Hàm `getLocalizedPath` chuyển đổi một canonical path (đường dẫn nội bộ của ứng dụng) thành phiên bản đã được địa phương hóa dựa trên locale và các quy tắc rewrite được cung cấp. Hàm này đặc biệt hữu ích để tạo các URL thân thiện với SEO thay đổi theo ngôn ngữ.

**Tính năng chính:**

- Hỗ trợ tham số route động bằng cú pháp `[param]`.
- Phân giải đường dẫn theo các quy tắc rewrite tùy chỉnh được định nghĩa trong cấu hình của bạn.
- Tự động dự phòng về đường dẫn canonical nếu không tìm thấy quy tắc rewrite cho locale được chỉ định.

---

## Chữ ký hàm

```typescript
getLocalizedPath(
  canonicalPath: string,         // Bắt buộc
  locale: Locales,               // Bắt buộc
  rewriteRules?: RoutingConfig['rewrite'] // Tùy chọn
): string
```

---

## Tham số

### Tham số bắt buộc

- `canonicalPath: string`
  - **Mô tả**: Đường dẫn nội bộ của ứng dụng (ví dụ: `/about`, `/product/[id]`).
  - **Kiểu**: `string`
  - **Bắt buộc**: Có

- `locale: Locales`
  - **Mô tả**: Locale đích mà đường dẫn sẽ được nội địa hóa.
  - **Kiểu**: `Locales`
  - **Bắt buộc**: Có

### Tham số tùy chọn

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Mô tả**: Một đối tượng định nghĩa các quy tắc rewrite tùy chỉnh. Nếu không được cung cấp, nó mặc định là thuộc tính `routing.rewrite` từ cấu hình dự án của bạn.
  - **Kiểu**: `RoutingConfig['rewrite']`
  - **Mặc định**: `configuration.routing.rewrite`

---

## Trả về

- **Kiểu**: `string`
- **Mô tả**: Đường dẫn đã được nội địa hóa cho locale được chỉ định.

---

## Ví dụ sử dụng

### Sử dụng cơ bản (Có cấu hình)

Nếu bạn đã cấu hình các rewrite tùy chỉnh trong `intlayer.config.ts` của mình:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Cấu hình: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Kết quả: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Kết quả: "/about"
```

### Sử dụng với đường dẫn động

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Cấu hình: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Kết quả: "/produit/123"
```

### Quy tắc rewrite thủ công

Bạn cũng có thể truyền các quy tắc rewrite thủ công vào hàm:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Kết quả: "/contactez-nous"
```

---

## Các hàm liên quan

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getCanonicalPath.md): Giải quyết một đường dẫn được bản địa hóa trở về đường dẫn chuẩn nội bộ (canonical) của nó.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md): Tạo một URL được bản địa hóa đầy đủ (bao gồm protocol, host và tiền tố locale).
