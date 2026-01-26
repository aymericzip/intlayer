---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Thành phần IntlayerProvider | solid-intlayer
description: Xem cách sử dụng thành phần IntlayerProvider cho package solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Tài liệu Thành phần IntlayerProvider

`IntlayerProvider` là component gốc cung cấp context quốc tế hóa cho ứng dụng Solid của bạn. Nó quản lý trạng thái locale hiện tại và đảm bảo rằng tất cả các component con có thể truy cập các bản dịch.

## Sử dụng

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Mô tả

`IntlayerProvider` thực hiện các vai trò sau:

1. **Quản lý trạng thái**: Khởi tạo và lưu trữ locale hiện tại, sử dụng signals để phản ứng với thay đổi.
2. **Phân giải locale**: Xác định locale ban đầu dựa trên cookie, tùy chọn trình duyệt hoặc cấu hình mặc định.
3. **Tiêm context**: Cung cấp locale và hàm `setLocale` cho bất kỳ component nào thông qua các hook như `useIntlayer` hoặc `useLocale`.
4. **Lưu trữ bền vững**: Tự động đồng bộ thay đổi locale với cookie hoặc localStorage để duy trì tùy chọn của người dùng giữa các phiên.

## Thuộc tính (Props)

- **locale** (tùy chọn): Thiết lập thủ công locale hiện tại.
  /// **defaultLocale** (tùy chọn): Ghi đè locale mặc định từ cấu hình.
  /// **setLocale** (tùy chọn): Cung cấp hàm setter locale tùy chỉnh.
  /// **disableEditor** (tùy chọn): Vô hiệu hóa tích hợp trình soạn thảo trực quan.
  /// **isCookieEnabled** (tùy chọn): Bật hoặc tắt việc lưu trữ bằng cookie.
