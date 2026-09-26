---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Middleware onRequest | astro-intlayer
description: Xem cách sử dụng middleware onRequest trong các ứng dụng Astro để giải quyết ngôn ngữ yêu cầu và điền vào Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu Middleware Astro onRequest

Middleware `onRequest` từ `astro-intlayer/middleware` giải quyết ngôn ngữ của mỗi yêu cầu HTTP đến và điền vào `Astro.locals.intlayer`.

Khi bạn đăng ký tích hợp `intlayer()` trong `astro.config.mjs`, middleware này sẽ được tự động đưa vào. Bạn chỉ cần nhập trực tiếp nếu bạn đang kết hợp thủ công middleware của Astro bằng `sequence(...)`.

## Cách sử dụng

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Truy cập ngôn ngữ đã được giải quyết trong middleware tùy chỉnh của bạn
  const { locale } = context.locals.intlayer;
  console.log(`Xử lý yêu cầu cho ngôn ngữ: ${locale}`);

  return next();
});
```

## Mô tả chi tiết

Middleware thực hiện các tác vụ sau:

1. **Phát hiện ngôn ngữ**:
   - **URL**: Phân tích tiền tố đường dẫn URL hoặc tham số truy vấn `?locale=` (trừ khi `routing.mode` được đặt thành `no-prefix`).
   - **Cookies / Headers**: Kiểm tra cookie ngôn ngữ đã lưu hoặc giá trị header tùy chỉnh.
   - **Accept-Language**: Sử dụng tùy chọn ngôn ngữ của trình duyệt nếu không tìm thấy cài đặt trước đó.
   - Đối với các trang được prerender (`context.isPrerendered`), ngôn ngữ được trích xuất nghiêm ngặt từ URL để tránh cảnh báo khi build trong Astro.
2. **Điền Context**: Điền vào `Astro.locals.intlayer` với:
   - `locale`: Ngôn ngữ đã được giải quyết.
   - `defaultLocale`: Ngôn ngữ dự phòng mặc định.
   - `availableLocales`: Mảng các ngôn ngữ đã được cấu hình.
3. **Phạm vi AsyncLocalStorage**: Bao bọc quá trình xử lý yêu cầu tiếp theo trong phạm vi `AsyncLocalStorage`, cho phép `useIntlayer()`, `useDictionary()` và `useLocale()` truy cập trạng thái yêu cầu mà không cần truyền tham số.

## Kiểu `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Tài liệu liên quan

- [Tích hợp `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useLocale.md)
