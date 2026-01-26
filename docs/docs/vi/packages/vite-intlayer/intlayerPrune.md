---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Plugin intlayerPrune cho Vite | vite-intlayer
description: Xem cách sử dụng plugin intlayerPrune cho gói vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalization
  - Tài liệu
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Tài liệu Plugin intlayerPrune cho Vite

Plugin Vite `intlayerPrune` được sử dụng để thực hiện tree-shaking và loại bỏ các từ điển không được sử dụng khỏi bundle ứng dụng của bạn. Điều này giúp giảm kích thước bundle cuối cùng bằng cách chỉ bao gồm nội dung đa ngôn ngữ cần thiết.

## Cách sử dụng

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Mô tả

Plugin phân tích mã nguồn của bạn để xác định những khóa dictionary thực sự được sử dụng. Sau đó nó loại bỏ bất kỳ nội dung không được sử dụng khỏi các tệp dictionary đã được bundle. Điều này đặc biệt hữu ích cho các dự án lớn có nhiều dictionary mà chỉ một tập con được sử dụng trong các trang hoặc component cụ thể.
