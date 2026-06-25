---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ Polyglot.js Sang Intlayer"
description: "Tìm hiểu cách di chuyển từ Polyglot.js sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ Polyglot.js Sang Intlayer

Nếu bạn đang sử dụng Polyglot.js của Airbnb, việc di chuyển sang Intlayer cực kỳ đơn giản bằng cách sử dụng lớp tương thích.

## Phải làm gì

Chỉ cần chạy lệnh khởi tạo trong dự án của bạn:

```bash
npx intlayer init
```

Lệnh này tạo `intlayer.config.ts`. Sau đó bạn có thể sử dụng bí danh plugin bundler để chuyển hướng trong suốt các import Polyglot sang `@intlayer/polyglot`.

## Những gì diễn ra bên dưới

Cú pháp Polyglot.js thường dựa vào `polyglot.t('key', {name})` với các nội suy `%{name}` và số nhiều `smart_count` được phân tách bằng `"singular |||| plural"`.

Bên dưới:

- **Nội suy:** Lớp tương thích xử lý các placeholder `%{var}` một cách gốc.
- **Số nhiều:** Chuỗi được tách tại `||||` và đánh giá dựa trên `Intl.PluralRules` gốc theo locale đang hoạt động, phản chiếu thứ tự bucket của chính Polyglot theo locale.
- **Từ điển:** Bạn bỏ qua việc cần cung cấp các cấu hình JSON khổng lồ cho `new Polyglot()` — Intlayer xử lý các từ điển một cách động và tự động loại bỏ chúng.
