---
createdAt: 2026-01-21
updatedAt: 2026-01-21
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
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

| Chức năng            | Mô tả                                                                                | Tài liệu liên quan                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Plugin chính cho Vite tích hợp Intlayer vào quá trình build.                         | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Không còn được khuyến nghị**) Bí danh cho `intlayer`.                             | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Plugin middleware cho môi trường phát triển để xử lý phát hiện locale và định tuyến. | -                                                                                                                      |
| `intlayerMiddleware` | (**Không còn được khuyến nghị**) Bí danh cho `intlayerProxy`.                        | -                                                                                                                      |
| `intlayerPrune`      | Plugin để tree-shake và loại bỏ các từ điển không dùng trong quá trình build.        | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/intlayerPrune.md) |
