---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói react-native-intlayer
description: Hỗ trợ React Native cho Intlayer, cung cấp provider và các polyfill.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói react-native-intlayer

Gói `react-native-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng React Native. Nó bao gồm một provider và các polyfill để hỗ trợ locale.

## Cài đặt

```bash
npm install react-native-intlayer
```

## Các exports

### Provider

| Thành phần         | Mô tả                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| `IntlayerProvider` | Component Provider bọc ứng dụng của bạn và cung cấp context của Intlayer. |

Nhập:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Hàm                | Mô tả                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| `intlayerPolyfill` | Hàm áp dụng các polyfill cần thiết cho React Native để hỗ trợ Intlayer. |

Nhập:

```tsx
import "react-native-intlayer";
```

### Cấu hình Metro

Gói `react-native-intlayer` cung cấp các tiện ích cấu hình Metro để đảm bảo Intlayer hoạt động đúng với React Native.

| Hàm                       | Mô tả                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Hàm bất đồng bộ chuẩn bị Intlayer và hợp nhất cấu hình Metro.                              |
| `configMetroIntlayerSync` | Hàm đồng bộ hợp nhất cấu hình Metro mà không chuẩn bị tài nguyên của Intlayer.             |
| `exclusionList`           | Tạo một biểu thức RegExp cho blockList của Metro để loại trừ các tệp nội dung khỏi bundle. |

Import:

```tsx
import "react-native-intlayer/metro";
```
