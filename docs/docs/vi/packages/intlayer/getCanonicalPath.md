---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Hàm getCanonicalPath — Tài liệu | intlayer
description: Xem cách sử dụng hàm getCanonicalPath cho package intlayer
keywords:
  - getCanonicalPath
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Triển khai các rewrite URL tùy chỉnh
---

# Tài liệu: Hàm `getCanonicalPath` trong `intlayer`

## Mô tả

Hàm `getCanonicalPath` giải quyết một đường dẫn URL đã bản địa hóa (ví dụ: `/a-propos`) trở lại đường dẫn ứng dụng chuẩn nội bộ của nó (ví dụ: `/about`). Điều này rất quan trọng để router có thể khớp đúng route nội bộ bất kể ngôn ngữ trong URL.

**Tính năng chính:**

- Hỗ trợ các tham số route động bằng cách sử dụng cú pháp `[param]`.
- Khớp các đường dẫn đã bản địa hóa với các quy tắc rewrite tùy chỉnh được định nghĩa trong cấu hình của bạn.
- Trả về đường dẫn gốc nếu không tìm thấy quy tắc rewrite phù hợp.

---

## Chữ ký hàm

```typescript
getCanonicalPath(
  localizedPath: string,         // Bắt buộc
  locale: Locales,               // Bắt buộc
  rewriteRules?: RoutingConfig['rewrite'] // Tùy chọn
): string
```

---

## Tham số

### Tham số bắt buộc

- `localizedPath: string`
  - **Mô tả**: Đường dẫn đã được bản địa hóa như hiển thị trong trình duyệt (ví dụ: `/a-propos`).
  - **Kiểu**: `string`
  - **Bắt buộc**: Có

- `locale: Locales`
  - **Mô tả**: Ngôn ngữ (locale) được sử dụng cho đường dẫn đang được giải quyết.
  - **Kiểu**: `Locales`
  - **Bắt buộc**: Có

### Tham số Tuỳ chọn

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Mô tả**: Một đối tượng định nghĩa các quy tắc rewrite tùy chỉnh. Nếu không được cung cấp, nó mặc định về thuộc tính `routing.rewrite` từ cấu hình dự án của bạn.
  - **Kiểu**: `RoutingConfig['rewrite']`
  - **Mặc định**: `configuration.routing.rewrite`

---

## Trả về

- **Kiểu**: `string`
- **Mô tả**: Đường dẫn canonical nội bộ.

---

## Ví dụ Sử dụng

### Sử dụng cơ bản (Với cấu hình)

Nếu bạn đã cấu hình các rewrite tùy chỉnh trong `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Cấu hình: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Kết quả: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Kết quả: "/about"
```

### Sử dụng với các route động

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Cấu hình: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Kết quả: "/product/123"
```

### Quy tắc rewrite thủ công

Bạn cũng có thể truyền các quy tắc rewrite thủ công vào hàm:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## Hàm liên quan

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedPath.md): Chuyển một canonical path thành đường dẫn đã được bản địa hóa tương ứng.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md): Tạo một URL hoàn toàn bản địa hóa (bao gồm protocol, host, và tiền tố locale).
