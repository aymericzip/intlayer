---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Tài liệu gói react-native-intlayer
description: Hỗ trợ React Native cho Intlayer, cung cấp provider, hook, polyfill và cấu hình Metro.
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Tái xuất toàn bộ API react-intlayer (hook, tiện ích, các subpath format/html/markdown) để ứng dụng React Native chỉ cần phụ thuộc vào react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Hợp nhất tài liệu cho tất cả các exports"
author: aymericzip
---

# Gói react-native-intlayer

Gói `react-native-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng React Native. Nó tái xuất toàn bộ API `react-intlayer` (hook và tiện ích) với `IntlayerProvider` sẵn sàng cho React Native, cùng các polyfill và cấu hình Metro mà React Native yêu cầu.

> Trong một ứng dụng React Native, hãy nhập **tất cả mọi thứ** từ `react-native-intlayer`. Bạn không cần cài đặt hoặc nhập `react-intlayer` trực tiếp.

## Cài đặt

```bash
npm install react-native-intlayer
```

## Các exports

### Provider

| Thành phần         | Mô tả                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Component Provider bọc ứng dụng của bạn và cung cấp context của Intlayer. Tự động áp dụng các polyfill cần thiết. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hook và tiện ích

Các mục này được tái xuất từ `react-intlayer`, vì vậy bạn có thể nhập chúng trực tiếp từ `react-native-intlayer`:

| Export                                                                                                            | Mô tả                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `useIntlayer`                                                                                                     | Truy cập nội dung đã bản địa hóa cho một khóa từ điển. |
| `useLocale`                                                                                                       | Đọc và thay đổi locale hiện tại.                       |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Tải nội dung từ điển theo nhiều cách khác nhau.        |
| `useI18n`                                                                                                         | Hook tương thích với i18next.                          |
| `t`                                                                                                               | Trợ lý dịch inline.                                    |
| `getIntlayer`, `getDictionary`                                                                                    | Các hàm lấy nội dung theo kiểu mệnh lệnh.              |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Các trợ lý lưu trữ locale.                             |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Hàm                | Mô tả                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| `intlayerPolyfill` | Hàm áp dụng các polyfill cần thiết cho React Native để hỗ trợ Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Polyfill được áp dụng tự động khi bạn nhập `IntlayerProvider`. Chỉ gọi `intlayerPolyfill` thủ công nếu bạn cần các polyfill trước khi provider được mount.

### Bộ định dạng (Formatters)

Các hook định dạng số, ngày tháng và các hook dựa trên Intl khác có sẵn từ subpath `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown và HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Cấu hình Metro

Gói `react-native-intlayer` cung cấp các tiện ích cấu hình Metro để đảm bảo Intlayer hoạt động đúng với React Native.

| Hàm                       | Mô tả                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Hàm bất đồng bộ chuẩn bị Intlayer và hợp nhất cấu hình Metro.                              |
| `configMetroIntlayerSync` | Hàm đồng bộ hợp nhất cấu hình Metro mà không chuẩn bị tài nguyên của Intlayer.             |
| `exclusionList`           | Tạo một biểu thức RegExp cho blockList của Metro để loại trừ các tệp nội dung khỏi bundle. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
