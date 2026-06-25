---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ i18next Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng Vanilla JS/TS của bạn từ i18next sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ i18next Sang Intlayer

Để có hướng dẫn từng bước chi tiết, vui lòng xem [Hướng Dẫn Di Chuyển i18next](../migration_from_i18next_to_intlayer.md) đầy đủ của chúng tôi.

Intlayer tái tạo hoàn hảo các đặc tính runtime cốt lõi của `i18next`. Bằng cách sử dụng gói tương thích, các ứng dụng Vanilla hoặc các module nội bộ của bạn có thể tiếp tục tận dụng cú pháp quen thuộc.

## Phải làm gì

Để bắt đầu, hãy khởi tạo Intlayer trong dự án của bạn:

```bash
npx intlayer init
```

Nếu bạn đang sử dụng Vite, hãy bao gồm plugin Intlayer để định tuyến các import sang `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Những gì diễn ra bên dưới

`i18nextVitePlugin` tạo bí danh cho các import `i18next` sang `@intlayer/i18next`, tránh việc bundle bị phình to do bao gồm các file JSON.

Bên dưới:

- **Cấu hình instance:** `createInstance` phân tích chính xác và áp dụng các namespace fallback trong khi tận dụng pipeline biên dịch của Intlayer để truy xuất từ điển.
- **Nội suy:** Hỗ trợ gốc cho các thay thế `{{name}}` và lồng `$t(key)` theo đệ quy.
- **Ngữ cảnh & Số nhiều:** Xác định và giải quyết các định dạng hậu tố như `key_male` và `key_one`/`key_other` đánh giá dựa trên `Intl.PluralRules` tiêu chuẩn.
- **Trả về đối tượng:** Chế độ `returnObjects: true` an toàn trích xuất cây từ các từ điển Intlayer.
