---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Di Chuyển Từ React Intl Sang Intlayer"
description: "Tìm hiểu cách di chuyển ứng dụng React của bạn từ react-intl sang Intlayer bằng bộ điều hợp tương thích."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Di Chuyển Từ React Intl Sang Intlayer

Nếu ứng dụng React của bạn sử dụng `react-intl` (FormatJS), việc chuyển đổi sang Intlayer rất dễ dàng. Lớp tương thích của chúng tôi xử lý liền mạch ICU MessageFormat và tất cả các component `Formatted*` hiện có.

## Phải làm gì

Bắt đầu bằng cách chạy lệnh khởi tạo trong dự án của bạn:

```bash
npx intlayer init
```

Sau đó, thiết lập plugin Vite hoặc Next.js của Intlayer trong cấu hình của bạn. Plugin này chèn các bí danh tại thời điểm build để chuyển hướng các import `react-intl` sang `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Những gì diễn ra bên dưới

Plugin bundler tạo bí danh `react-intl` thành `@intlayer/react-intl`. Thay vì phân tích thủ công các file JSON lớn và bao bọc ứng dụng của bạn trong một `IntlProvider`, plugin Intlayer trích xuất tĩnh các key và sử dụng các từ điển Intlayer tại thời điểm chạy.

Bên dưới:

- **ICU MessageFormat:** Intlayer sử dụng resolver `resolveMessage(..., 'icu')` hỗ trợ đầy đủ số nhiều ICU, lựa chọn, định dạng ngày/số và các thẻ rich text một cách gốc.
- **Người gọi Method & JSX:** `intl.formatMessage({ id: 'a.b' })` và `<FormattedMessage id="a.b">` được xác định bởi các plugin biên dịch Intlayer (`@intlayer/babel` / `@intlayer/swc`), chuyển đổi các key dấu chấm phẳng để đoạn đầu tiên giải quyết chính xác đến key từ điển Intlayer.
- **Formatter:** `<FormattedNumber>`, `<FormattedDate>`, v.v., kết nối với các `core/formatters` gốc bằng cách sử dụng `Intl`.
