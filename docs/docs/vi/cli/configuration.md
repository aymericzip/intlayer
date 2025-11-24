---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Quản lý Cấu hình
description: Tìm hiểu cách lấy và đẩy cấu hình Intlayer của bạn lên CMS.
keywords:
  - Cấu hình
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Quản lý Cấu hình

## Lấy Cấu hình

Lệnh `configuration get` lấy cấu hình hiện tại cho Intlayer, đặc biệt là các thiết lập locale. Điều này hữu ích để kiểm tra cấu hình của bạn.

```bash
npx intlayer configuration get
```

## Bí danh:

- `npx intlayer config get`
- `npx intlayer conf get`

## Tham số:

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file`**: Cung cấp file môi trường tùy chỉnh để tải biến từ đó.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

## Đẩy Cấu hình

Lệnh `configuration push` tải cấu hình của bạn lên Intlayer CMS và trình chỉnh sửa. Bước này cần thiết để cho phép sử dụng từ điển từ xa trong Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

## Bí danh:

- `npx intlayer config push`
- `npx intlayer conf push`

## Tham số:

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file`**: Cung cấp file môi trường tùy chỉnh để tải biến từ đó.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

Bằng cách đẩy cấu hình, dự án của bạn được tích hợp hoàn toàn với Intlayer CMS, cho phép quản lý từ điển liền mạch giữa các nhóm.
