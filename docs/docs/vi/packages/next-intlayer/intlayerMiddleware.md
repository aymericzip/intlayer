---
createdAt: 2026-01-21
updatedAt: 2026-02-25
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
  - version: 8.1.7
    date: 2026-02-25
    changes: Đổi tên intlayerMiddleware thành intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu intlayerProxy (intlayerMiddleware)

Hàm `intlayerProxy` ( `intlayerMiddleware` cho nextjs < 16) là một middleware của Next.js xử lý định tuyến dựa trên locale và các chuyển hướng. Nó tự động phát hiện locale ưa thích của người dùng và chuyển hướng họ đến đường dẫn đã được địa phương hóa tương ứng nếu cần.

## Cách sử dụng

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Mô tả

Middleware thực hiện các tác vụ sau:

1. **Phát hiện locale**: Nó kiểm tra đường dẫn URL, cookie và header `Accept-Language` để xác định locale của người dùng.
2. **Chuyển hướng**: Nếu URL không chứa tiền tố locale và cấu hình yêu cầu một tiền tố (hoặc dựa trên sở thích của người dùng), nó sẽ chuyển hướng tới URL đã được địa phương hóa.
3. **Quản lý cookie**: Có thể lưu locale đã phát hiện vào cookie để sử dụng cho các yêu cầu sau này.

## Tham số

Hàm nhận đối tượng chuẩn Next.js `NextRequest` làm tham số khi được sử dụng trực tiếp, hoặc có thể được export như ví dụ ở trên.

## Cấu hình

Để cấu hình middleware, bạn có thể thiết lập tùy chọn `routing` trong tệp `intlayer.config.ts`. Xem [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết thêm chi tiết.
