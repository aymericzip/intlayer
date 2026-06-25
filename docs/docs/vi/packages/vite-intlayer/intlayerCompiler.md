---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Tài liệu Plugin Vite intlayerCompiler | vite-intlayer
description: Plugin Vite giúp trích xuất các khai báo nội dung Intlayer trực tiếp (inline) từ các tệp component và ghi chúng vào các tệp JSON từ điển tại thời điểm build/transform.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - trình biên dịch
  - nội dung
  - từ điển
  - đa ngôn ngữ
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Đã tích hợp vào intlayer(); khởi tạo tài liệu"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` là một plugin Vite quét các tệp nguồn component để tìm **các khai báo nội dung Intlayer trực tiếp (inline)** — nội dung được định nghĩa trực tiếp bên trong một component thay vì trong một tệp `.content.ts` riêng biệt — và ghi chúng vào các tệp JSON từ điển trong giai đoạn transform (chuyển đổi).

> **Từ phiên bản Intlayer v9**, `intlayerCompiler` được tự động bao gồm bên trong plugin chính [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md) khi cả hai cấu hình `compiler.enabled` là `true` và `compiler.output` được thiết lập trong cấu hình Intlayer của bạn. Bạn chỉ cần đăng ký riêng khi muốn kiểm soát hoàn toàn cấu hình dành riêng cho trình biên dịch.

## Cách sử dụng

### Như một phần của `intlayer()` (khuyên dùng, v9+)

Bật trình biên dịch thông qua cấu hình Intlayer của bạn:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // nơi ghi các từ điển đã được trích xuất
  },
});
```

Sau đó sử dụng plugin tiêu chuẩn mà không cần đăng ký thêm:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Độc lập (khi cần thiết)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Các tùy chọn

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Tùy chọn         | Kiểu dữ liệu              | Mô tả                                                                                                  |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `configOptions`  | `GetConfigurationOptions` | Các giá trị ghi đè cấu hình Intlayer được chuyển tiếp đến `getConfiguration()`.                        |
| `compilerConfig` | `Partial<CompilerConfig>` | Các ghi đè cho phần cấu hình dành riêng cho trình biên dịch (ví dụ: `enabled`, `output`, `filesList`). |

### Ví dụ

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Cách thức hoạt động

### Giai đoạn Transform (Chuyển đổi)

Đối với mỗi tệp nguồn khớp với `compiler.filesList`, plugin trình biên dịch sẽ:

1. Chuyển nội dung tệp qua hàm `extractContent` từ thư viện `@intlayer/babel`.
2. Gọi hàm `onExtract` cho mỗi khai báo được tìm thấy, thao tác này sẽ ghi JSON từ điển kết quả vào đường dẫn `compiler.output`.
3. Trả về mã nguồn đã chuyển đổi với các khai báo inline được thay thế bằng các lệnh gọi tiêu chuẩn `useIntlayer('key')` / `getIntlayer('key')`.

Các loại tệp được hỗ trợ: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement - Thay thế mô-đun nóng)

Khi một tệp component được lưu ở chế độ phát triển (development mode), trình biên dịch sẽ:

1. Phát hiện tệp thay đổi thông qua hook `handleHotUpdate` của Vite.
2. Trích xuất lại nội dung từ tệp đã cập nhật.
3. Ghi tệp JSON từ điển đã cập nhật.
4. Kích hoạt tải lại toàn bộ trang (`server.ws.send({ type: 'full-reload' })`).

Một khoảng thời gian debounce (chống rung) 500 ms ngăn việc ghi từ điển (cũng kích hoạt sự kiện thay đổi tệp) tạo ra một vòng lặp trích xuất vô hạn.

### Khử trùng lặp (Deduplication)

`intlayerCompiler` sử dụng cùng một cơ chế khử trùng lặp `createPrimaryInstanceGuard` giống như các plugin đi kèm khác. Khi cả `intlayer()` (gộp cả trình biên dịch) và lệnh gọi `intlayerCompiler()` thủ công đều xuất hiện, chỉ có phiên bản đã đăng ký đầu tiên chạy — không có từ điển nào bị ghi đè hai lần.
