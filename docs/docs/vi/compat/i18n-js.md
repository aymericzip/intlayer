---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ i18n-js Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng của bạn từ i18n-js sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ i18n-js Sang Intlayer

Việc chuyển đổi từ thư viện `i18n-js` sang Intlayer là một quá trình di chuyển được tối ưu hóa cao, được thiết kế để chuyển các cấu hình dịch thuật lớn sang hệ thống phân giải file có cấu trúc của Intlayer.

## Phải làm gì

Thực thi lệnh thiết lập sau trong repository của bạn:

```bash
npx intlayer init
```

Sau khi `intlayer.config.ts` được chuẩn bị, bạn có thể thêm bí danh của Intlayer vào cấu hình bundler của mình để bất kỳ import nào của `i18n-js` đều trỏ đến gói tương thích `@intlayer/i18n-js`.

## Những gì diễn ra bên dưới

`i18n-js` truy cập các namespace thông qua các biểu thức như `i18n.t('scope.key', {name})` cùng với các cơ chế dự phòng theo ngôn ngữ và ánh xạ số nhiều cụ thể.

Bên dưới:

- **Nội suy:** Bộ điều hợp tương thích dễ dàng phân tích các ánh xạ `%{name}` thành giá trị từ điển đích tại thời điểm chạy.
- **Số nhiều:** Thay thế các subkey `one/other` và ánh xạ chúng sang các cơ chế số nhiều mạnh mẽ của Intlayer (`Intl.PluralRules`), loại bỏ các ánh xạ thủ công.
- **Ngôn ngữ:** Thay vì tải toàn bộ payload ngôn ngữ khi khởi động, các từ điển được phục vụ tối ưu dựa trên thiết lập ngữ cảnh hiện tại thông qua cấu hình Intlayer gốc.
