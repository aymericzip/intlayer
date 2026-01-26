---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu intlayerMiddleware | next-intlayer
description: Xem cách sử dụng hàm intlayerMiddleware cho gói next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu intlayerMiddleware

Hàm `intlayerMiddleware` là một middleware của Next.js xử lý định tuyến dựa trên locale và các chuyển hướng. Nó tự động phát hiện locale ưa thích của người dùng và chuyển hướng họ đến đường dẫn đã được địa phương hóa tương ứng nếu cần.

## Cách sử dụng

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Mô tả

Middleware thực hiện các tác vụ sau:

1. **Phát hiện locale**: Nó kiểm tra đường dẫn URL, cookie và header `Accept-Language` để xác định locale của người dùng.
2. **Chuyển hướng**: Nếu URL không chứa tiền tố locale và cấu hình yêu cầu một tiền tố (hoặc dựa trên sở thích của người dùng), nó sẽ chuyển hướng tới URL đã được địa phương hóa.
3. **Quản lý cookie**: Có thể lưu locale đã phát hiện vào cookie để sử dụng cho các yêu cầu sau này.

## Tham số

Hàm nhận đối tượng chuẩn Next.js `NextRequest` làm tham số khi được sử dụng trực tiếp, hoặc có thể được export như ví dụ ở trên.
