---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Plugin intlayer cho Vite | vite-intlayer
description: Xem cách sử dụng plugin intlayer cho package vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Tài liệu
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu plugin intlayer cho Vite

Plugin Vite `intlayer` tích hợp cấu hình Intlayer vào quy trình build. Nó xử lý alias cho các từ điển, khởi động trình theo dõi từ điển ở chế độ phát triển và chuẩn bị các từ điển cho quá trình build.

## Sử dụng

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Mô tả

Plugin thực hiện các nhiệm vụ sau:

1. **Chuẩn bị Từ điển**: Nó biên dịch các từ điển thành các tệp tối ưu hóa khi bắt đầu quá trình build hoặc dev.
2. **Chế độ theo dõi**: Ở chế độ phát triển, plugin theo dõi các thay đổi trong tệp từ điển và tự động biên dịch lại chúng.
3. **Bí danh**: Nó cung cấp các bí danh để truy cập các từ điển trong ứng dụng của bạn.
4. **Tree-shaking**: Nó hỗ trợ tree-shaking các bản dịch không được sử dụng thông qua plugin `intlayerPrune`.
