---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cách xây dựng từ điển?
description: Tìm hiểu cách xây dựng từ điển.
keywords:
  - xây dựng
  - từ điển
  - intlayer
  - lệnh
  - theo dõi
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Xây dựng từ điển

## Cách xây dựng từ điển

Intlayer cung cấp một công cụ dòng lệnh để xây dựng từ điển.

```bash
npx intlayer dictionaries build
```

Lệnh này:

- Quét tất cả các tệp khai báo nội dung (`.content.{ts,tsx,js,mjs,cjs,json,...}`) trong dự án của bạn.
- Tạo từ điển và lưu trữ chúng trong thư mục `.intlayer/dictionary`.

### Chế độ theo dõi

Nếu bạn muốn tự động cập nhật từ điển khi có thay đổi trong các tệp khai báo nội dung, hãy chạy lệnh sau:

```bash
npx intlayer dictionaries build --watch
```

Ở chế độ này, Intlayer sẽ quét và xây dựng lại từ điển mỗi khi có thay đổi trong các tệp khai báo nội dung và tự động cập nhật thư mục `.intlayer/dictionary`.

### Sử dụng tiện ích mở rộng VSCode

Bạn cũng có thể sử dụng [tiện ích mở rộng Intlayer cho VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/vi/vs_code_extension.md) để nâng cao trải nghiệm Intlayer trong VSCode.

### Sử dụng plugin cho framework ứng dụng yêu thích của bạn

Nếu bạn đang sử dụng một framework như Next.js (Webpack / Turbopack), Vite, hoặc React Native, Lynx, v.v., Intlayer cung cấp một plugin mà bạn có thể sử dụng để tích hợp Intlayer vào ứng dụng của mình.

Intlayer sẽ xây dựng từ điển trước khi tiến hành build ứng dụng của bạn.
Tương tự, ở chế độ phát triển, Intlayer sẽ theo dõi các thay đổi trong các tệp khai báo nội dung của bạn và tự động xây dựng lại từ điển.

Vì vậy, hãy tham khảo tài liệu cụ thể của framework bạn đang sử dụng để tìm hiểu cách tích hợp plugin.
