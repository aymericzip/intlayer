---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Lệnh không xác định
description: Tìm hiểu cách khắc phục lỗi lệnh không xác định.
keywords:
  - không xác định
  - lệnh
  - lỗi
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - khởi động lại
  - cục bộ
slugs:
  - frequent-questions
  - unknown-command
---

# lỗi: lệnh không xác định fill / build / v.v.

Nếu `npx intlayer fill --verbose` trả về:

```
error: unknown command 'fill'
```

nhưng bạn chắc chắn lệnh `fill` _nên_ tồn tại, dưới đây là các bước để giải quyết:

## 1. **Đảm bảo bạn đang sử dụng phiên bản mới nhất**

Chạy:

```bash
npx intlayer --version                  # phiên bản intlayer hiện tại trên máy
npx intlayer@latest --version           # phiên bản intlayer mới nhất hiện có
```

Điều này buộc `npx` kéo phiên bản mới nhất. Sau đó thử lại:

```bash
npx intlayer@latest build --verbose
```

## 2. **Kiểm tra xem lệnh đã được đăng ký chưa**

Bạn có thể kiểm tra bằng:

```bash
npx intlayer --help                     # cung cấp thông tin liên quan đến các lệnh
```

Xem liệu lệnh có xuất hiện trong danh sách lệnh không.

Truy cập vào repo, và xác nhận rằng lệnh của bạn đã được xuất khẩu và đăng ký trong điểm vào CLI. Intlayer sử dụng `commander` làm framework.

Code liên quan đến CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Khởi động lại terminal của bạn**

Đôi khi cần khởi động lại terminal để nhận diện các lệnh mới.

## 5. **Nếu bạn đang phát triển `intlayer`, hãy build lại và liên kết nó**

Nếu bạn đang phát triển `intlayer` cục bộ:

```bash
# Trong thư mục intlayer
npm install
npm run build
npm link
```

Sau đó trong một terminal khác:

```bash
intlayer fill --verbose
```

Điều này sử dụng phiên bản cục bộ mà bạn đang làm việc.

## 6. **Xóa cache npx (nếu bạn bị kẹt với phiên bản cũ hơn)**

```bash
npx clear-npx-cache
```

Hoặc xóa thủ công các gói intlayer đã được cache:

```bash
rm -rf ~/.npm/_npx
```

Kiểm tra tương đương nếu bạn sử dụng pnpm, yarn, bun hoặc trình quản lý gói khác
