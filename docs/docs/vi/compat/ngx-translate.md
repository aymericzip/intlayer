---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ NGX-Translate Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Angular của bạn từ ngx-translate sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ NGX-Translate Sang Intlayer

Việc di chuyển ứng dụng Angular của bạn từ `ngx-translate` sang Intlayer rất dễ dàng với bộ điều hợp tương thích, cho phép bạn bỏ qua việc phải viết lại tất cả các template.

## Phải làm gì

Bắt đầu bằng cách chạy:

```bash
npx intlayer init
```

Lệnh này thiết lập `intlayer.config.ts`. Thay thế các thiết lập `TranslateModule.forRoot()` và bí danh import một cách phù hợp để trỏ đến `@intlayer/ngx-translate`.

## Những gì diễn ra bên dưới

`ngx-translate` sử dụng `TranslateService` (`instant`, `get`, `stream`) cùng với pipe `{{ 'KEY' | translate:params }}` và directive `[translate]`.

Bên dưới:

- **Service:** `TranslateService` bao bọc `getIntlayer` và một observable locale, cung cấp chính xác các phương thức giống nhau.
- **Pipe & Directive:** Được triển khai lại để giải quyết trực tiếp dựa trên các từ điển Intlayer.
- **Loader:** Các thiết lập `TranslateHttpLoader` được chuyển đổi thành các stub cảnh báo vì Intlayer vốn đã giải quyết và đóng gói các từ điển của bạn tại thời điểm build (hoặc thông qua các dynamic import tiêu chuẩn), hoàn toàn loại bỏ nhu cầu về HTTP loader.
