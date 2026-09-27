---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Tài liệu gói lynx-intlayer
description: "Gói lynx-intlayer tích hợp Intlayer vào ứng dụng Lynx, cung cấp polyfill và helper cần thiết để hỗ trợ locale trên di động."
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Hợp nhất tài liệu cho tất cả các exports"
author: aymericzip
---

# Gói lynx-intlayer

Gói `lynx-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Lynx.

## Cài đặt

```bash
npm install lynx-intlayer
```

## Các export

### Polyfill

Nhập:

```tsx
import "lynx-intlayer";
```

| Hàm                | Mô tả                                                       |
| ------------------ | ----------------------------------------------------------- |
| `intlayerPolyfill` | Hàm áp dụng các polyfill cần thiết để Lynx hỗ trợ Intlayer. |

### Plugin Rsbuild

Gói `lynx-intlayer` cung cấp một plugin Rsbuild để tích hợp Intlayer vào quy trình build của Lynx.

Import:

```tsx
import "lynx-intlayer";
```

| Function             | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `pluginIntlayerLynx` | Plugin Rsbuild tích hợp Intlayer vào quá trình build của Lynx. |
