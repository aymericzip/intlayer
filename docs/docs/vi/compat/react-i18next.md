---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ react-i18next Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng React của bạn từ react-i18next sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ react-i18next Sang Intlayer

Để có hướng dẫn từng bước đầy đủ và chi tiết, vui lòng xem [Hướng Dẫn Di Chuyển react-i18next](../migration_from_react-i18next_to_intlayer.md) đầy đủ của chúng tôi.

Việc sử dụng bộ điều hợp tương thích của Intlayer cho phép bạn di chuyển từ `react-i18next` mà không cần bất kỳ thay đổi nào đối với các import trong source code của bạn.

## Phải làm gì

Để khởi tạo dự án, hãy chạy:

```bash
npx intlayer init
```

Trong quá trình khởi tạo, Intlayer sẽ cài đặt `@intlayer/react-i18next` và tạo `intlayer.config.ts`. Trong bundler của bạn (như Vite), hãy áp dụng plugin Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Những gì diễn ra bên dưới

`reactI18nextVitePlugin` bao bọc plugin `vite-intlayer` cốt lõi và chèn các bí danh resolve cho `react-i18next` và `i18next`, chuyển hướng chúng sang `@intlayer/react-i18next` và `@intlayer/i18next`.

Bên dưới:

- **`useTranslation` & `withTranslation`:** Được viết lại để sử dụng các hook gốc của Intlayer, cung cấp cho bạn tính năng tự động hoàn thành TypeScript cho các key từ điển. Nó hỗ trợ liền mạch các namespace (ví dụ: `t('namespace:key')`).
- **Số nhiều & Ngữ cảnh:** Xử lý số nhiều dựa trên hậu tố của i18next (`key_one`, `key_other`) bằng cách sử dụng `Intl.PluralRules` gốc và các hậu tố ngữ cảnh (`key_male`).
- **Component `<Trans>`:** Được triển khai lại để hỗ trợ prop `components`, dạng đối tượng và mảng, và các thẻ được đánh số `<1>...</1>` ánh xạ trực tiếp đến các React node của bạn.
- **Instance `i18n`:** Giải quyết các key trực tiếp từ Intlayer mà không cần tải các file JSON lớn, dẫn đến kích thước bundle nhỏ hơn đáng kể.
