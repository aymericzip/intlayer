---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Gỡ lỗi lệnh Intlayer
description: Tìm hiểu cách gỡ lỗi và khắc phục sự cố CLI của Intlayer.
keywords:
  - Gỡ lỗi
  - Khắc phục sự cố
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Gỡ lỗi lệnh intlayer

## 1. **Đảm bảo bạn đang sử dụng phiên bản mới nhất**

Chạy:

```bash
npx intlayer --version                  # phiên bản intlayer hiện tại theo locale
npx intlayer@latest --version           # phiên bản intlayer mới nhất hiện tại
```

## 2. **Kiểm tra xem lệnh đã được đăng ký chưa**

Bạn có thể kiểm tra bằng:

```bash
npx intlayer --help                     # Hiển thị danh sách các lệnh có sẵn và thông tin sử dụng
npx intlayer dictionary build --help    # Hiển thị danh sách các tùy chọn có sẵn cho một lệnh
```

## 3. **Khởi động lại terminal của bạn**

Đôi khi cần khởi động lại terminal để nhận diện các lệnh mới.

## 4. **Xóa cache npx (nếu bạn bị kẹt với phiên bản cũ hơn)**

```bash
npx clear-npx-cache
```
