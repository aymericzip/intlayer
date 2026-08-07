---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Plugin intlayer cho Vite | vite-intlayer
description: Xem cách sử dụng plugin intlayer cho package vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Tài liệu
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu plugin intlayer cho Vite

Plugin Vite `intlayer` tích hợp cấu hình Intlayer vào quy trình build. Nó xử lý alias cho các từ điển, khởi động trình theo dõi từ điển ở chế độ phát triển và chuẩn bị các từ điển cho quá trình build.

## Sử dụng

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Tùy chọn

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` extends `GetConfigurationOptions` (see `@intlayer/config`) với các trường bổ sung sau:

| Option          | Type                            | Default     | Description                                                                                                                                                                |
| --------------- | ------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Các mẫu caller bổ sung cho các gói compat-adapter (ví dụ: `@intlayer/react-i18next`). Được truyền tới bộ phân tích field-usage tại thời điểm xây dựng.                     |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Các tùy chọn được chuyển tiếp tới proxy định tuyến locale được đóng gói. Sử dụng `ignore` để loại trừ các đường dẫn cụ thể (ví dụ: các API routes) khỏi định tuyến locale. |

Tất cả các tùy chọn khác (`override`, `configFile`, …) được chuyển tiếp trực tiếp tới `getConfiguration()`.

### Ví dụ

#### Bỏ qua các tuyến đường API khỏi định tuyến locale

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Với đường dẫn tệp cấu hình tùy chỉnh

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Với compat-adapter callers

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Những gì plugin làm

### 1. Chuẩn bị từ điển

Trước khi build bắt đầu (và mỗi giờ một lần trong dev), `intlayer` gọi `prepareIntlayer` để biên dịch tất cả các tệp `.content.ts` thành các từ điển JSON được tối ưu hóa được lưu trữ trong `.intlayer/`.

### 2. Module aliases

Plugin thêm các Vite resolve aliases để `import { myDict } from 'intlayer/dictionaries/my-dict'` giải quyết thành file JSON được biên dịch trên đĩa. SSR builds sử dụng `ssr.noExternal` để đảm bảo tất cả các package `@intlayer/*` được bundle với aliases được áp dụng.

### 3. Dev-server watcher

Ở chế độ phát triển, một `chokidar` watcher được khởi động. Khi một file `.content.ts` thay đổi, các từ điển được biên dịch lại và HMR của Vite truyền bá cập nhật tới trình duyệt.

### 4. Proxy định tuyến locale được đóng gói (v9+)

Kể từ Intlayer v9, middleware `intlayerProxy` được đăng ký tự động bên trong `intlayer()`. Nó xử lý:

- Phát hiện locale từ tiền tố URL, cookies và header `Accept-Language`.
- Chuyển hướng 301 khi locale được phát hiện không khớp với URL hiện tại.
- Viết lại URL nội bộ để framework nhìn thấy tham số route `[locale]` chính xác.

Proxy được kiểm soát bởi `routing.enableProxy` (mặc định `true`) trong cấu hình Intlayer của bạn. Để tắt nó hoàn toàn:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Để tùy chỉnh hành vi proxy mà không cần gọi `intlayerProxy()` riêng biệt, hãy truyền các tùy chọn `proxy` cho plugin chính:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Xem [tài liệu intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerProxy.md) để tham khảo đầy đủ về hành vi định tuyến.

### 5. Trình biên dịch được đóng gói (v9+)

Khi `compiler.enabled` là `true` **và** `compiler.output` được đặt trong cấu hình Intlayer của bạn, `intlayer()` sẽ tự động đăng ký `intlayerCompiler`. Trình biên dịch trích xuất các khai báo nội dung nội tuyến được viết trực tiếp bên trong các tệp thành phần và ghi chúng vào các từ điển tại thời điểm chuyển đổi. Xem [tài liệu intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerCompiler.md).

### 6. Tối ưu hóa Build

Trong quá trình build production, plugin thêm:

- **intlayerOptimize** – Babel transform viết lại `useIntlayer('key')` → `useDictionary(hash)` và inject các JSON imports trực tiếp.
- **intlayerPrune** – loại bỏ các content fields không sử dụng từ dictionary JSON.
- **intlayerMinify** – nén dictionary JSON và tùy chọn mangle tên các field.

Những tính năng này không hoạt động trong chế độ development.

## Các alias không được dùng nữa

| Export không được dùng nữa | Thay thế   |
| -------------------------- | ---------- |
| `intlayerPlugin`           | `intlayer` |
| `intLayerPlugin`           | `intlayer` |
