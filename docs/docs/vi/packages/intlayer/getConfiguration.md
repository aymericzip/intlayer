---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getConfiguration | intlayer
description: Xem cách sử dụng hàm getConfiguration cho gói intlayer
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getConfiguration` trong `intlayer`

## Mô tả

Hàm `getConfiguration` lấy toàn bộ cấu hình cho ứng dụng `intlayer` bằng cách trích xuất các biến môi trường. Hàm này cung cấp sự linh hoạt để sử dụng cùng một cấu hình trên cả phía client và server, đảm bảo tính nhất quán trên toàn bộ ứng dụng.

---

## Tham số

Hàm không nhận tham số nào. Thay vào đó, nó sử dụng các biến môi trường để cấu hình.

### Giá trị trả về

- **Kiểu**: `IntlayerConfig`
- **Mô tả**: Một đối tượng chứa cấu hình đầy đủ cho `intlayer`. Cấu hình bao gồm các phần sau:
  - `internationalization`: Các thiết lập liên quan đến locale và chế độ strict.
  - `middleware`: Các thiết lập liên quan đến quản lý URL và cookie.
  - `content`: Các thiết lập liên quan đến các tệp nội dung, thư mục và mẫu.
  - `editor`: Các cấu hình riêng biệt cho trình soạn thảo.

Xem thêm [Tài liệu cấu hình Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết chi tiết.

---

## Ví dụ sử dụng

### Lấy toàn bộ cấu hình

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Kết quả:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Kết quả:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Kết quả:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Trích xuất `availableLocales` và `defaultLocale`

Phần `internationalization` trong cấu hình cung cấp các thiết lập liên quan đến locale như `locales` (các locale có sẵn) và `defaultLocale` (ngôn ngữ dự phòng).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ví dụ kết quả: ["en", "fr", "es"]
console.log(defaultLocale); // Ví dụ kết quả: "en"
console.log(cookieName); // Kết quả: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ví dụ kết quả: ["en", "fr", "es"]
console.log(defaultLocale); // Ví dụ kết quả: "en"
console.log(cookieName); // Kết quả: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ví dụ kết quả: ["en", "fr", "es"]
console.log(defaultLocale); // Ví dụ kết quả: "en"
console.log(cookieName); // Kết quả: "INTLAYER_LOCALE"
```

## Ghi chú

- Đảm bảo rằng tất cả các biến môi trường cần thiết đã được thiết lập chính xác trước khi gọi hàm này. Thiếu biến sẽ gây lỗi trong quá trình khởi tạo.
- Hàm này có thể được sử dụng cả ở phía client và server, làm cho nó trở thành công cụ linh hoạt để quản lý cấu hình một cách thống nhất.

## Sử dụng trong Ứng dụng

Hàm `getConfiguration` là một tiện ích then chốt để khởi tạo và quản lý cấu hình của một ứng dụng `intlayer`. Bằng cách cung cấp quyền truy cập vào các thiết lập như locales, middleware và thư mục nội dung, nó đảm bảo tính nhất quán và khả năng mở rộng trên các ứng dụng đa ngôn ngữ và dựa trên nội dung.
