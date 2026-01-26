---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói lynx-intlayer
description: Hỗ trợ Intlayer cho Lynx, cung cấp các polyfill để hỗ trợ locale.
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
    changes: Hợp nhất tài liệu cho tất cả các exports
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
