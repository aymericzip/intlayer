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

# Tài liệu Middleware intlayer cho Remix 3

Middleware `intlayer` cho Remix 3 quản lý lớp quốc tế hóa trên toàn bộ ứng dụng của bạn. Được xây dựng trên các tiêu chuẩn web (`Request` và `Response`), nó xử lý định tuyến locale (chuyển hướng và viết lại nội bộ), phát hiện locale của yêu cầu, lưu locale vào cookie và tiêu đề, đồng thời thiết lập một phạm vi `AsyncLocalStorage` để các handler và component phía sau có thể truy cập bản dịch mà không cần truyền props qua nhiều cấp.

## Cách sử dụng

Đăng ký middleware `intlayer` khi khởi tạo router Remix 3 của bạn:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Phục vụ `/`, `/fr`, `/es`, locale được phân giải từ yêu cầu
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Mô tả

Middleware `intlayer` thực hiện các tác vụ sau:

1. **Chuẩn bị từ điển**: Chạy `prepareIntlayer` khi khởi động để đảm bảo tất cả từ điển được tạo ra đã được build và sẵn sàng.
2. **Định tuyến Locale**: Đánh giá yêu cầu theo chiến lược định tuyến đã cấu hình (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Chuyển hướng**: Nếu người dùng truy cập `/about` và cần được định tuyến đến tiền tố locale (ví dụ `/fr/about`), middleware sẽ trả về phản hồi chuyển hướng với các tiêu đề `location` và `Set-Cookie` phù hợp.
   - **Viết lại nội bộ**: Khi người dùng truy cập `/fr/about`, URL được viết lại nội bộ để route handler của bạn khớp với `/about`, trong khi locale đã phân giải được ghi nhận là `fr`.
   - **Bí danh URL bản địa hóa**: Tuân theo các quy tắc viết lại URL được định nghĩa trong `intlayer.config.ts` (ví dụ viết lại `/fr/about` thành `/fr/a-propos`).
3. **Phân giải Locale**: Phát hiện locale đang hoạt động dựa trên tiền tố URL, cookie đã lưu, tiêu đề tùy chỉnh hoặc tùy chọn trình duyệt `Accept-Language`.
4. **Chèn Context**:
   - Gắn `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) vào `RequestContext` của Remix dưới khóa `Intlayer` và `context.intlayer`.
   - Chạy phần còn lại của yêu cầu bên trong phạm vi `AsyncLocalStorage` (`requestStorage`), cho phép gọi `useIntlayer`, `useDictionary` và `useLocale` một cách gọn gàng trong handler, view và component.
5. **Lưu trữ**: Gắn các tiêu đề và cookie locale gửi đi vào phản hồi HTTP cuối cùng để lưu lại lựa chọn của người dùng.

## Tham số

Hàm `intlayer` chấp nhận tùy chọn `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Ghi đè cấu hình định tuyến tùy chỉnh
};

const middleware = intlayer(options);
```

## Truy cập Context trực tiếp

Ngoài việc sử dụng các hook, bạn có thể truy cập `IntlayerState` đã được phân giải trực tiếp từ context yêu cầu của Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Qua context.get()
  const state = context.get(Intlayer);

  // Hoặc qua thuộc tính trực tiếp context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Tài liệu liên quan

- [Context yêu cầu `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)
