---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ NuxtJS I18n Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Nuxt.js của bạn từ @nuxtjs/i18n sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ NuxtJS I18n Sang Intlayer

Việc di chuyển ứng dụng Nuxt của bạn từ `@nuxtjs/i18n` sang Intlayer là một quá trình liền mạch bằng cách sử dụng module Nuxt adapter.

## Phải làm gì

Để khởi tạo dự án, hãy chạy:

```bash
npx intlayer init
```

Lệnh này sẽ thiết lập `intlayer.config.ts`. Sau đó, thêm module Nuxt của Intlayer (ví dụ: `@intlayer/nuxt-i18n`) vào mảng modules trong `nuxt.config.ts` của bạn. Điều này tự động áp dụng cấu hình tương thích cho ứng dụng của bạn.

## Những gì diễn ra bên dưới

`@nuxtjs/i18n` bao bọc `vue-i18n` trong khi cung cấp các composable routing dành riêng cho Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Bên dưới:

- **Bản dịch:** Phụ thuộc gốc vào lớp tương thích `@intlayer/vue-i18n` cho tất cả các tác vụ dịch thuật chuỗi (hỗ trợ đầy đủ các định dạng `vue-i18n`, số nhiều kiểu pipe và reactivity).
- **Routing:** Phản chiếu các composable routing bằng cách sử dụng các helper URL được bản địa hóa của Intlayer.
- **Cấu hình:** Đọc `availableLocales` và các cài đặt mặc định trực tiếp từ `intlayer.config.ts` của bạn để tự động phối hợp các trang Nuxt.
