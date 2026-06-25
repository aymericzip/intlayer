---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ Next Translate Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Next.js của bạn từ next-translate sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ Next Translate Sang Intlayer

Việc di chuyển từ `next-translate` sang Intlayer gần như là một sự thay thế hoàn toàn, giữ lại cú pháp và các thẻ hiện có của bạn.

## Phải làm gì

Khởi tạo Intlayer trong dự án của bạn:

```bash
npx intlayer init
```

CLI sẽ tạo cấu hình của bạn. Sau đó bạn có thể áp dụng plugin Intlayer trong `next.config.ts` của mình, plugin này chèn các bí danh subpath tại thời điểm build ánh xạ `next-translate/useTranslation` sang `@intlayer/next-translate`.

## Những gì diễn ra bên dưới

`next-translate` cung cấp các hook như `useTranslation('ns')`, `t('ns:key.path')` và component `<Trans>`.

Bên dưới:

- **Nội suy & Số nhiều:** Nó phụ thuộc chặt chẽ vào hành vi của bộ điều hợp `react-i18next`. Các placeholder `{{var}}` và số nhiều được ánh xạ từ các hậu tố như `key_0`, `key_one` và `key_other` được xử lý động.
- **Component `<Trans>`:** Được hỗ trợ trực tiếp cho việc phân tích thẻ dạng HTML cùng với prop `components` dựa trên mảng.
- **Namespace:** Việc đặt bí danh subpath đảm bảo rằng `useTranslation` của bạn tham chiếu đúng namespace từ điển nội bộ mà không cần sửa đổi thủ công.
