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
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Tài liệu: hàm `getLocalizedPath` trong `intlayer`

## Mô tả

Hàm `getLocalizedPath` chuyển đổi một canonical path (đường dẫn nội bộ của ứng dụng) thành phiên bản đã được địa phương hóa dựa trên locale và các quy tắc rewrite được cung cấp. Hàm này đặc biệt hữu ích để tạo các URL thân thiện với SEO thay đổi theo ngôn ngữ.

Đây là đối tác tương đối của [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md) — đối với input tương đối, cả hai đều trả về giá trị giống nhau. Không giống như `getLocalizedUrl`, nó không bao giờ trả về URL tuyệt đối: cấu hình `domains` bị bỏ qua, vì vậy một locale được phục vụ từ domain của nó vẫn tạo ra một đường dẫn. Input tuyệt đối được chấp nhận, nhưng nguồn gốc của nó bị loại bỏ — chỉ đường dẫn, chuỗi truy vấn và hash được giữ lại.

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

### Tham số tùy chọn

- `locale?: Locales`
  - **Description**: Ngôn ngữ đích mà đường dẫn sẽ được địa phương hóa.
  - **Type**: `Locales`
  - **Default**: Ngôn ngữ mặc định của cấu hình dự án của bạn.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Mô tả**: Một đối tượng định nghĩa các quy tắc rewrite tùy chỉnh. Nếu không được cung cấp, nó mặc định là thuộc tính `routing.rewrite` từ cấu hình dự án của bạn.
  - **Kiểu**: `RoutingConfig['rewrite']`
  - **Mặc định**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — các locale được hỗ trợ. **Default**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — locale mặc định. **Default**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — cách locale xuất hiện trong đường dẫn. **Default**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — các quy tắc rewrite tùy chỉnh. **Default**: `configuration.routing.rewrite`

---

## Trả về

- **Kiểu**: `string`
- **Mô tả**: Đường dẫn đã được nội địa hóa cho locale được chỉ định.

Kiểu được thu hẹp từ các quy tắc rewrite được khai báo trong cấu hình của bạn, vì vậy trình chỉnh sửa hiển thị đường dẫn đã được giải quyết thay vì một `string` đơn thuần:

```typescript codeFormat="typescript"
// Cấu hình: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (không có quy tắc rewrite nào khớp, chỉ áp dụng prefix)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Cùng một narrowing này chảy vào [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md), áp dụng các quy tắc rewrite trước khi thêm tiền tố locale.

Hai trường hợp vẫn được mở rộng thành `string`, vì chúng không thể được giải quyết tại thời điểm biên dịch:

- a path that is not a string literal (e.g. one built from a variable);
- a path matched by a rule using a multi-segment or optional parameter (`[...slug]`, `[[...slug]]`, `:param?`).

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

### Bỏ qua Locale

Khi không có locale nào được cung cấp, đường dẫn được bản địa hóa cho locale mặc định được cấu hình:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

---

## Các hàm liên quan

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getCanonicalPath.md): Giải quyết một đường dẫn được bản địa hóa trở về đường dẫn chuẩn nội bộ (canonical) của nó.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md): Tạo một URL được bản địa hóa đầy đủ (bao gồm protocol, host và tiền tố locale).
