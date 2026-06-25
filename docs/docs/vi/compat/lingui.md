---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ Lingui Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng của bạn từ Lingui sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ Lingui Sang Intlayer

Nếu dự án của bạn hiện đang sử dụng quá trình biên dịch dựa trên macro của Lingui, việc chuyển đổi sang Intlayer cho phép bạn duy trì các quy trình macro mạnh mẽ trong khi hỗ trợ chúng một cách gốc với chiến lược biên dịch JSON của Intlayer.

## Phải làm gì

Để bắt đầu, hãy khởi tạo Intlayer trong dự án của bạn:

```bash
npx intlayer init
```

Lệnh này tạo `intlayer.config.ts` của bạn. Đảm bảo giữ lại `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` trong bước build để chạy _trước_ trình biên dịch Intlayer. Sau đó, sử dụng bí danh plugin bundler để định tuyến `@lingui/core` và `@lingui/react` sang `@intlayer/lingui`.

## Những gì diễn ra bên dưới

Lingui sử dụng các macro (như `` t`Hello ${name}` `` và `<Trans>`) được biên dịch thành các lời gọi runtime như `i18n._(id, values)`.

Bên dưới:

- **Macro:** Chúng biên dịch chính xác như trước đây, đảm bảo không có sự gián đoạn trong cú pháp nguồn của bạn.
- **Dịch thuật tại runtime:** `i18n._()` được đặt bí danh sử dụng các từ điển Intlayer. Cả ID được đặt tên rõ ràng và ID được băm đều được ánh xạ đầy đủ bằng cách sử dụng các plugin đồng bộ `.po` của Intlayer để tổng hợp và loại bỏ các key một cách an toàn.
- **Khả năng ICU:** Hỗ trợ số nhiều, lựa chọn và các biến thể ICU vẫn mạnh mẽ nhờ trình phân tích ICU thống nhất của Intlayer, đảm bảo đầu ra hiển thị giống nhau.
