---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ Transloco Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Angular của bạn từ Transloco sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ Transloco Sang Intlayer

Nếu ứng dụng Angular của bạn hiện đang sử dụng `@jsverse/transloco`, bạn có thể di chuyển sang Intlayer bằng cách sử dụng bộ điều hợp tương thích của chúng tôi. Quá trình chuyển đổi này cho phép bạn duy trì cú pháp template hiện có trong khi tận dụng cấu trúc từ điển mạnh mẽ của Intlayer.

## Phải làm gì

Chỉ cần chạy lệnh khởi tạo trong dự án của bạn:

```bash
npx intlayer init
```

Lệnh này sẽ tạo cấu hình `intlayer.config.ts` cần thiết. Sau đó bạn sẽ thay thế các import Transloco của mình bằng các module `@intlayer/transloco` hoặc dựa vào các bí danh build.

## Những gì diễn ra bên dưới

Transloco sử dụng các phạm vi và `TranslocoService` (`translate`, `selectTranslate`), cùng với các directive cấu trúc (`*transloco="let t"`) và pipe (`| transloco`).

Bên dưới:

- **Phạm vi:** Ánh xạ tự nhiên đến các key từ điển Intlayer, cung cấp một cách loại bỏ tuyệt vời cho tối ưu hóa bundle.
- **Service & Directive:** Bộ điều hợp Angular của Intlayer thay thế liền mạch các provider, cho phép các pipe và directive template hiện có của bạn giải quyết các chuỗi dựa trên các từ điển Intlayer.
- **Phân tích tại thời điểm build:** Bộ phân tích TypeScript nhận ra các lời gọi `instant/get`, và việc loại bỏ fallback đảm bảo tính chính xác ngay cả khi việc sử dụng template không thể theo dõi tĩnh được.
