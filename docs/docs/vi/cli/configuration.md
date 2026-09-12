---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
---

# Quản lý Cấu hình

## Lấy Cấu hình

Lệnh `configuration get` lấy cấu hình hiện tại cho Intlayer, đặc biệt là các thiết lập locale. Điều này hữu ích để kiểm tra cấu hình của bạn.

```bash packageManager="npm"
npx intlayer configuration get
```

```bash packageManager="yarn"
yarn intlayer configuration get
```

```bash packageManager="pnpm"
pnpm intlayer configuration get
```

```bash packageManager="bun"
bun x intlayer configuration get
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
- **`--ci`**: Chạy lệnh trong mọi dự án Intlayer của monorepo (hoặc chỉ dự án hiện tại khi chạy từ thư mục dự án). Thông tin xác thực theo từng dự án có thể được đưa vào qua `INTLAYER_PROJECT_CREDENTIALS`, một đối tượng JSON ánh xạ đường dẫn dự án tới `{ "clientId", "clientSecret" }`.

## Đẩy Cấu hình

Lệnh `configuration push` tải cấu hình của bạn lên Intlayer CMS và trình chỉnh sửa. Bước này cần thiết để cho phép sử dụng từ điển từ xa trong Intlayer Visual Editor.

```bash packageManager="npm"
npx intlayer configuration push
```

```bash packageManager="yarn"
yarn intlayer configuration push
```

```bash packageManager="pnpm"
pnpm intlayer configuration push
```

```bash packageManager="bun"
bun x intlayer configuration push
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
- **`--ci`**: Chạy lệnh trong mọi dự án Intlayer của monorepo (hoặc chỉ dự án hiện tại khi chạy từ thư mục dự án). Thông tin xác thực theo từng dự án có thể được đưa vào qua `INTLAYER_PROJECT_CREDENTIALS`, một đối tượng JSON ánh xạ đường dẫn dự án tới `{ "clientId", "clientSecret" }`.

Bằng cách đẩy cấu hình, dự án của bạn được tích hợp hoàn toàn với Intlayer CMS, cho phép quản lý từ điển liền mạch giữa các nhóm.
