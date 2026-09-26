---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: Tài liệu gói vite-intlayer
description: Plugin Vite cho Intlayer, cung cấp bí danh từ điển và watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Cập nhật chỉ mục xuất – proxy và compiler hiện được đóng gói trong intlayer(); thêm tài liệu intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Hợp nhất tài liệu cho tất cả các exports"
author: aymericzip
---

# Gói vite-intlayer

Gói `vite-intlayer` cung cấp một plugin Vite để tích hợp Intlayer vào ứng dụng của bạn dựa trên Vite.

## Cài đặt

```bash
npm install vite-intlayer
```

## Các export

### Plugin

Nhập:

```tsx
import "vite-intlayer";
```

| Chức năng                  | Mô tả                                                                                                                                                 | Tài liệu liên quan                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Plugin Vite chính. Chuẩn bị từ điển, định cấu hình bí danh, khởi động trình theo dõi máy chủ phát triển và (từ v9) đóng gói proxy và trình biên dịch. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Không còn được sử dụng**) Bí danh cho `intlayer`.                                                                                                  | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Không còn được sử dụng**) Bí danh cho `intlayer`.                                                                                                  | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Plugin trung gian định tuyến ngôn ngữ (phát hiện, chuyển hướng, viết lại). Từ v9 được đóng gói trong `intlayer()` – chỉ đăng ký riêng nếu cần.        | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Không còn được sử dụng**) Bí danh cho `intlayerProxy`.                                                                                             | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Không còn được sử dụng**) Bí danh cho `intlayerProxy`.                                                                                             | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Trích xuất các khai báo nội dung nội dòng từ các thành phần và ghi chúng vào từ điển. Từ v9 được đóng gói trong `intlayer()`.                         | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Loại bỏ các trường từ điển không sử dụng khỏi gói sản xuất thông qua tree-shaking.                                                                    | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Thu nhỏ các tệp JSON từ điển đã biên dịch và tùy chọn cắt ngắn tên trường.                                                                            | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerMinify.md)     |

### Tiện ích

| Export                       | Mô tả                                                                                                | Tài liệu liên quan                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Trả về middleware Node.js `(req, res, next)` độc lập với framework với logic định tuyến theo locale. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Các tùy chọn được chấp nhận bởi `intlayer()`. Extends `GetConfigurationOptions` với `compatCallers` và `proxy`.           |
| `IntlayerProxyPluginOptions` | Các tùy chọn được chấp nhận bởi `intlayerProxy()` và `createIntlayerProxyHandler()`. Bao gồm `ignore` và `configOptions`. |
| `IntlayerCompilerOptions`    | Các tùy chọn được chấp nhận bởi `intlayerCompiler()`. Bao gồm `configOptions` và `compilerConfig`.                        |
| `CompatCallerConfig`         | Re-export từ `@intlayer/babel`. Mô tả một compat-adapter caller pattern cho field-usage analysis.                         |
