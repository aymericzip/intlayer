---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Middleware intlayer | remix-intlayer
description: Tìm hiểu cách sử dụng middleware intlayer trong Remix 3 để phát hiện locale, xử lý chuyển hướng và đưa trạng thái Intlayer vào context yêu cầu.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu middleware intlayer"
author: aymericzip
---

# Middleware intlayer

Hàm middleware `intlayer` cấu hình quốc tế hóa trên từng yêu cầu trong các ứng dụng Remix 3. Nó phát hiện locale của từng yêu cầu đến, áp dụng quy tắc chuyển hướng URL và lưu trữ trạng thái locale trong context yêu cầu.

## Cách sử dụng

Đăng ký middleware trong router Remix của bạn:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## Cách thức hoạt động

Middleware thực hiện các tác vụ sau cho mỗi yêu cầu đến:

1. **Phát hiện Locale**: Trích xuất locale từ tiền tố đường dẫn URL (ví dụ `/vi/about`), cookie hoặc tiêu đề `Accept-Language` theo cấu hình Intlayer của bạn.
2. **Chuyển hướng URL**: Nếu đường dẫn được yêu cầu thiếu tiền tố locale và cấu hình yêu cầu định tuyến có tiền tố, middleware sẽ trả về phản hồi chuyển hướng (302/307/308) đến URL có tiền tố thích hợp.
3. **Điền vào Context yêu cầu**: Lưu locale đã được phân giải hiện tại vào context yêu cầu Remix bằng khóa `Intlayer`, cho phép các hook (`useLocale`, `useIntlayer`, `useDictionary`) sử dụng một cách minh bạch.
4. **Quản lý Cookie**: Thiết lập tiêu đề `Set-Cookie` khi cần lưu lại locale ưu tiên của người dùng.

## Tài liệu liên quan

- [Context yêu cầu `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/Intlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)
