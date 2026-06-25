---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ Svelte I18n Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Svelte của bạn từ svelte-i18n sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ Svelte I18n Sang Intlayer

Việc di chuyển ứng dụng Svelte của bạn từ `svelte-i18n` sang Intlayer chỉ mất một khoảnh khắc bằng cách sử dụng bộ điều hợp tương thích.

## Phải làm gì

Chỉ cần chạy lệnh khởi tạo trong dự án của bạn:

```bash
npx intlayer init
```

Lệnh này tạo `intlayer.config.ts`. Đảm bảo các plugin SvelteKit / Vite của bạn được bao bọc với plugin bí danh của Intlayer để liền mạch ánh xạ `svelte-i18n` sang `@intlayer/svelte-i18n`.

## Những gì diễn ra bên dưới

Svelte-i18n phụ thuộc vào các store được sử dụng nhiều (`$_`, `$t`, `$format`, v.v.) và ICU MessageFormat.

Bên dưới:

- **Store:** Intlayer proxy các store của `svelte-i18n`. `$_` trở thành một derived store của locale hiện tại trả về một resolver Intlayer.
- **Key:** Các key phẳng của bạn (ví dụ: `$_('home.title')`) được đánh giá sao cho đoạn đường dẫn đầu tiên đại diện cho từ điển Intlayer.
- **Cú pháp ICU:** Được xử lý đầy đủ bởi resolver ICU được chia sẻ (phân tích tương đương `intl-messageformat`).
- **Formatter:** Các lời gọi `$date`, `$time`, `$number` chuyển hướng an toàn đến các formatter gốc core của Intlayer.
- **Phân tích Babel/SWC:** Bộ phân tích Intlayer đọc các người gọi store Svelte (`$_`) bên trong các file `.svelte` nguồn của bạn trước khi biên dịch để tự động xây dựng các chunk từ điển liên quan.
