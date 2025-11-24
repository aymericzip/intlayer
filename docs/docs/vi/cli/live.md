---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Lệnh Live Sync
description: Tìm hiểu cách sử dụng Live Sync để phản ánh các thay đổi nội dung CMS trong thời gian chạy.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Lệnh Live Sync

Live Sync cho phép ứng dụng của bạn phản ánh các thay đổi nội dung CMS trong thời gian chạy. Không cần xây dựng lại hoặc triển khai lại. Khi được bật, các cập nhật sẽ được truyền đến một máy chủ Live Sync để làm mới các từ điển mà ứng dụng của bạn đọc. Xem thêm [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để biết chi tiết.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Tham số:

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)
