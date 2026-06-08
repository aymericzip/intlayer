---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Tài liệu Hook useRewriteURL
description: Hook dành cho Next.js để quản lý việc viết lại URL đã được bản địa hóa trong Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` dành cho Next.js là một hook phía client tự động quản lý việc viết lại URL đã bản địa hóa. Nó đảm bảo rằng URL trên trình duyệt luôn phản ánh đường dẫn đã bản địa hóa "pretty" được định nghĩa trong `intlayer.config.ts` của bạn, ngay cả khi người dùng tự nhập một đường dẫn canonical có tiền tố locale.

Hook này hoạt động âm thầm bằng cách sử dụng `window.history.replaceState`, tránh các điều hướng router Next.js không cần thiết hoặc việc làm mới trang.

## Cách sử dụng

Chỉ cần gọi hook trong một Client Component nằm trong layout của bạn.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Tự động chỉnh /fr/privacy-notice thành /fr/politique-de-confidentialite trên thanh địa chỉ
  useRewriteURL();

  return null;
};
```

## Cách hoạt động

1. **Giám sát đường dẫn**: Hook lắng nghe thay đổi của `locale` của người dùng.
2. **Phát hiện rewrite**: Hook so sánh `window.location.pathname` hiện tại với các quy tắc rewrite trong cấu hình của bạn.
3. **Sửa URL**: Nếu tìm thấy một alias đã được bản địa hóa "đẹp hơn" cho đường dẫn hiện tại, hook sẽ gọi `window.history.replaceState` để cập nhật thanh địa chỉ trong khi vẫn giữ người dùng trên cùng trang nội bộ.

## Tại sao nên dùng nó trong Next.js?

Trong khi `intlayerMiddleware` xử lý các rewrite phía server và các redirect ban đầu, hook `useRewriteURL` đảm bảo rằng URL trên trình duyệt vẫn nhất quán với cấu trúc SEO ưu tiên của bạn ngay cả sau các chuyển đổi phía client.

- **URL rõ ràng**: Buộc sử dụng các phân đoạn đã được địa phương hóa như `/fr/essais` thay vì `/fr/tests`.
- **Hiệu suất**: Cập nhật thanh địa chỉ mà không kích hoạt một chu trình router đầy đủ hoặc tái lấy dữ liệu.
- **Phù hợp với SEO**: Ngăn chặn các vấn đề trùng lặp nội dung bằng cách đảm bảo chỉ có một phiên bản URL hiển thị với người dùng và các bot công cụ tìm kiếm.
