---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Tài liệu Plugin Vite intlayerProxy | vite-intlayer
description: Middleware định tuyến ngôn ngữ cho các máy chủ dev/preview của Vite và SSR production. Xử lý phát hiện locale, chuyển hướng URL và viết lại (rewrite) nội bộ.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - locale
  - định tuyến
  - đa ngôn ngữ
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Gộp configOptions thành một đối tượng tùy chọn duy nhất; proxy được tích hợp trong intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` là một plugin Vite đăng ký middleware định tuyến locale cho **mọi môi trường**: máy chủ phát triển (dev), máy chủ xem trước (preview) và SSR sản xuất (Nitro / TanStack Start).

> **Từ phiên bản Intlayer v9**, `intlayerProxy` được tự động bao gồm bên trong plugin chính [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md) và được bật mặc định thông qua cấu hình `routing.enableProxy: true`. Bạn chỉ cần đăng ký riêng nếu cần kiểm soát ở mức thấp hơn hoặc đang sử dụng bên ngoài thiết lập `intlayer()` tiêu chuẩn.

## Cách sử dụng

### Như một phần của `intlayer()` (khuyên dùng, v9+)

Truyền các tùy chọn `proxy` cho plugin chính thay vì đăng ký `intlayerProxy` riêng biệt:

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

### Độc lập (khi cần thiết)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Các tùy chọn

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Tất cả các tùy chọn đều không bắt buộc và được truyền dưới dạng một đối tượng duy nhất:

| Tùy chọn        | Kiểu dữ liệu                        | Mô tả                                                                                                                                                  |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ignore`        | `(req: IncomingMessage) => boolean` | Hàm điều kiện giúp loại trừ các yêu cầu khỏi định tuyến ngôn ngữ. Trả về `true` để bỏ qua một yêu cầu (ví dụ: các đường dẫn API, kiểm tra sức khỏe).   |
| `configOptions` | `GetConfigurationOptions`           | Các ghi đè cấu hình Intlayer được chuyển tiếp đến `getConfiguration()`. Sử dụng khi bạn cần proxy đọc một tệp cấu hình cụ thể hoặc ghi đè các giá trị. |

### Ví dụ

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` tạo một middleware độc lập, không phụ thuộc vào framework dành cho Node.js dạng `(req, res, next)` chứa toàn bộ logic định tuyến ngôn ngữ. Nó hữu ích trong các môi trường không có sẵn API của plugin Vite (ví dụ: một máy chủ Node.js đơn giản hoặc một mô-đun Nitro tùy chỉnh).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR Sản xuất (TanStack Start / Nitro thông qua h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Hành vi định tuyến

Middleware phản chiếu logic định tuyến từ middleware `next-intlayer` và hỗ trợ tất cả các chế độ định tuyến của Intlayer.

### Các chế độ định tuyến

| Chế độ          | URL hiển thị trên trình duyệt | Hành vi                                                                                                               |
| --------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/vi/about`                   | Mặc định. Tiền tố locale trong URL. Ngôn ngữ mặc định chuyển hướng đến URL không có tiền tố trừ khi bật `prefix-all`. |
| `prefix-all`    | `/en/about`, `/vi/about`      | Tất cả các ngôn ngữ — bao gồm cả mặc định — đều luôn có tiền tố.                                                      |
| `no-prefix`     | `/about`                      | Không có ngôn ngữ trong URL. Ngôn ngữ chỉ được lưu trữ trong cookie; việc viết lại URL diễn ra nội bộ.                |
| `search-params` | `/about?locale=vi`            | Ngôn ngữ được truyền dưới dạng tham số truy vấn. Chuyển hướng để thêm/cập nhật tham số `locale` khi thiếu hoặc cũ.    |

### Mức độ ưu tiên phát hiện

1. Tiền tố đường dẫn URL (ví dụ: `/vi/about` → `vi`).
2. Giá trị cookie / localStorage (`intlayer-locale`).
3. Tiêu đề `Accept-Language`.
4. `defaultLocale` từ cấu hình.

### Bỏ qua tự động

Middleware luôn cho phép các yêu cầu sau đi thẳng mà không cần xử lý locale:

- Các yêu cầu khớp với hàm điều kiện `ignore`.
- `/node_modules/**`
- `/@**` – các thành phần nội bộ của Vite (`@vite/`, `@fs/`, `@id/`, v.v.).
- `/_**` – các thành phần nội bộ của máy chủ (`__vite_ping`, `__manifest`, v.v.).
- Các yêu cầu có đường dẫn kết thúc bằng phần mở rộng tệp (tài nguyên tĩnh). Nếu tiền tố locale xuất hiện trên đường dẫn tài nguyên tĩnh (ví dụ: `/vi/logo.png`), nó sẽ bị loại bỏ để tệp có thể được phân phát chính xác.

### Định tuyến tên miền

Khi `routing.domains` được định cấu hình trong cấu hình Intlayer của bạn, middleware sẽ xử lý định tuyến locale chéo miền:

- Một yêu cầu cho `/zh/about` trên `intlayer.org` sẽ được chuyển hướng đến `https://intlayer.zh/about` khi `domains.zh = "intlayer.zh"`.
- Một yêu cầu đến `intlayer.zh/about` được viết lại nội bộ thành `/zh/about` để tham số tuyến đường `[locale]` được cập nhật dữ liệu.

### Bảo vệ vòng lặp chuyển hướng

Middleware theo dõi số lần chuyển hướng cho mỗi cặp `originalUrl → newUrl` trong một khoảng thời gian trượt (sliding window) dài 2 giây. Hơn 10 lần chuyển hướng trong khoảng thời gian đó sẽ trả về phản hồi `500` kèm theo mô tả lỗi chi tiết thay vì lặp lại mãi mãi.

## Nitro / SSR sản xuất (tự động đưa vào, v9+)

Khi `intlayerProxy` được sử dụng dưới dạng plugin Vite, nó mang thuộc tính `.nitro`. Plugin xây dựng `nitro/vite` đọc thuộc tính này và đẩy nó vào `nitroConfig.modules`, do đó `intlayerNitroHandler` được đăng ký làm middleware máy chủ Nitro tự động — không cần cấu hình thủ công cho SSR sản xuất.

Trình xử lý Nitro sử dụng mô hình sự kiện Web Fetch API của h3 v2 (không phải `fromNodeMiddleware`) nên nó tương thích với tất cả các cấu hình Nitro: Node, Bun, Deno, edge runtimes.

## Các bí danh lỗi thời

| Xuất khẩu lỗi thời         | Thay thế        |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
