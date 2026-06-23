---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu hàm comparePaths | intlayer
description: Xem cách sử dụng hàm comparePaths cho gói intlayer
keywords:
  - comparePaths
  - normalizePath
  - liên kết đang hoạt động (active link)
  - điều hướng (navigation)
  - Intlayer
  - intlayer
  - Quốc tế hóa (Internationalization)
  - Tài liệu (Documentation)
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Tài liệu ban đầu"
author: aymericzip
---

# Tài liệu: Hàm `comparePaths` trong `intlayer`

## Mô tả

Hàm `comparePaths` so sánh hai URL hoặc đường dẫn để kiểm tra sự trùng khớp trong khi bỏ qua phần locale, giao thức/host, chuỗi truy vấn (query string), hash và các dấu gạch chéo ở cuối (trailing slashes). Đây là cách được khuyến nghị để xác định xem một liên kết điều hướng có trỏ đến trang hiện tại hay không — ví dụ: để làm nổi bật liên kết đang hoạt động — mà không cần phải tự viết logic chuẩn hóa riêng (dễ bị lỗi).

Về mặt nội bộ, nó sử dụng lại [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) để loại bỏ phần locale, do đó nó tôn trọng chế độ định tuyến và các locales đã được định cấu hình của bạn.

Gói cũng xuất ra một hàm hỗ trợ cơ bản là [`normalizePath`](#normalizepath), nó trả về đường dẫn chuẩn, không phụ thuộc vào locale được sử dụng cho mục đích so sánh.

**Các tính năng chính:**

- So sánh không phụ thuộc locale (`/vi/about` khớp với `/about`)
- Hoạt động với cả URL tuyệt đối và đường dẫn tương đối
- Bỏ qua chuỗi truy vấn, hash và các dấu gạch chéo ở cuối
- Cho phép bỏ qua dấu gạch chéo ở đầu và giá trị rỗng (được chuẩn hóa thành `/`)
- Nhẹ nhàng — được xây dựng trên `getPathWithoutLocale`

---

## Chữ ký hàm (Function Signature)

```typescript
comparePaths(
  pathname: string,  // Bắt buộc
  href: string,      // Bắt buộc
  locales?: Locales[] // Không bắt buộc
): boolean

normalizePath(
  inputUrl: string,   // Bắt buộc
  locales?: Locales[] // Không bắt buộc
): string
```

---

## Tham số

- `pathname: string`
  - **Mô tả**: Chuỗi URL hoặc đường dẫn đầu tiên để so sánh (thường là đường dẫn hiện tại).
  - **Loại**: `string`
  - **Bắt buộc**: Có

- `href: string`
  - **Mô tả**: Chuỗi URL hoặc đường dẫn thứ hai để so sánh (thường là `href` của một liên kết điều hướng).
  - **Loại**: `string`
  - **Bắt buộc**: Có

- `locales: Locales[]`
  - **Mô tả**: Mảng tùy chọn chứa các locales được hỗ trợ. Mặc định là các locales đã được định cấu hình trong dự án.
  - **Loại**: `Locales[]`
  - **Bắt buộc**: Không (Tùy chọn)

### Kết quả trả về

- **Loại**: `boolean`
- **Mô tả**: `true` khi cả hai đầu vào đều phân giải về cùng một đường dẫn không phụ thuộc locale, ngược lại trả về `false`.

---

## Ví dụ sử dụng

### Sử dụng cơ bản

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### URL tuyệt đối và tương đối

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Làm nổi bật liên kết điều hướng đang hoạt động

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` trả về đường dẫn chuẩn, không phụ thuộc locale được sử dụng bởi `comparePaths`. Nó loại bỏ phần locale, giao thức/host, chuỗi truy vấn và hash, đảm bảo chỉ có một dấu gạch chéo ở đầu, loại bỏ bất kỳ dấu gạch chéo ở cuối (ngoại trừ root) và dùng `/` thay thế cho các giá trị rỗng.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Các hàm liên quan

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md): Loại bỏ phần locale khỏi một URL hoặc đường dẫn.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPrefix.md): Xác định tiền tố URL cho một locale cụ thể.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md): Tạo ra một URL đã được bản địa hóa cho một locale cụ thể.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
