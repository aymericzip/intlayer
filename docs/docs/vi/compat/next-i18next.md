---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: bộ chuyển đổi tương thích cho next-i18next"
description: "Giữ nguyên mã next-i18next và phục vụ bằng Intlayer: cài @intlayer/next-i18next, đặt alias cho các import và xem bộ chuyển đổi thay đổi gì bên dưới."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# @intlayer/next-i18next: bộ chuyển đổi tương thích cho next-i18next

Để có hướng dẫn từng bước đầy đủ và chi tiết, vui lòng xem [Hướng Dẫn Di Chuyển next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-i18next_to_intlayer.md) đầy đủ của chúng tôi.

Intlayer xử lý tất cả các triển khai Next.js Pages Router và App Router một cách minh bạch. Sử dụng bộ điều hợp cho phép bạn di chuyển triển khai `next-i18next` mà không cần viết lại bất kỳ code nào.

## Phải làm gì

Để bắt đầu, hãy chạy:

```bash
npx intlayer init --interactive
```

Lệnh này tạo file thiết lập Intlayer cần thiết. Để chuyển sang Intlayer ở hậu trường, hãy cập nhật `next.config.ts` của bạn:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Những gì diễn ra bên dưới

`createNextI18nPlugin` kết hợp hành vi gốc của Next.js cùng với plugin `next-intlayer` cốt lõi, chèn tất cả các bí danh Webpack/Turbopack cần thiết cho `next-i18next`, `react-i18next` và `i18next`.

Bên dưới:

- **`serverSideTranslations` & `appWithTranslation`:** Chúng hiện hoạt động như các wrapper cho các bộ tải nội bộ của Intlayer, bỏ qua việc chèn JSON tĩnh lớn.
- **Hook phía client:** Ủy thác ngay lập tức cho `@intlayer/react-i18next`, giữ lại tất cả các tính năng định dạng, số nhiều và namespace lồng nhau.

> Để hiểu các thư viện này đến từ đâu, hãy đọc lịch sử i18n trong JavaScript.

- [Lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)
