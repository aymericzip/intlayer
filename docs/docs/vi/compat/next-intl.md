---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: bộ chuyển đổi tương thích cho next-intl"
description: "Giữ nguyên mã next-intl và phục vụ bằng Intlayer: cài @intlayer/next-intl, đặt alias cho các import và xem bộ chuyển đổi thay đổi gì bên dưới."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# @intlayer/next-intl: bộ chuyển đổi tương thích cho next-intl

Để có hướng dẫn từng bước đầy đủ và chi tiết, vui lòng xem [Hướng Dẫn Di Chuyển next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md) đầy đủ của chúng tôi.

- [Hướng Dẫn Di Chuyển next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md)

Việc di chuyển từ `next-intl` sang Intlayer cho phép bạn duy trì routing và cú pháp của ứng dụng hoàn toàn không bị gián đoạn.

## Phải làm gì

Thực thi lệnh sau trong repository của bạn:

```bash
npx intlayer init --interactive
```

Lệnh này sẽ tạo một `intlayer.config.ts`. Trong `next.config.ts` của bạn, hãy sử dụng wrapper plugin để liền mạch chèn các bí danh `next-intl` hướng đến `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Những gì diễn ra bên dưới

Wrapper bundler thay thế các bản dịch, nhưng **giữ nguyên các tính năng `next-intl/navigation`** (ví dụ: `Link`, `redirect`, `usePathname`).

Bên dưới:

- **Runtime ICU:** Số nhiều (`=0`, `one`, `other`), select/selectordinal, đối số `#` và các đối số được định dạng (`{ts, date, long}`) chạy chính xác bằng cách sử dụng resolver `resolveMessage(..., 'icu')` được chia sẻ.
- **`useTranslations()` & `getTranslations()`:** Các lời gọi phạm vi đơn giản trích xuất đoạn key đầu tiên làm định danh từ điển chính xác. Các namespace lồng nhau được tách một cách uyển chuyển thành các đường dẫn từ điển và tiền tố.
- **Định dạng phong phú:** Cả `t.rich()` và `t.markup()` đều được triển khai gốc đầy đủ, chuyển đổi các nút dạng HTML thành các chunk React được hiển thị.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` và các định dạng được đặt tên từ cấu hình kết nối với các formatter `Intl` gốc của core.

> Để hiểu các thư viện này đến từ đâu, hãy đọc lịch sử i18n trong JavaScript.

- [Lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)
