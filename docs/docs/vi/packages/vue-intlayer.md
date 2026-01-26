---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói vue-intlayer
description: Tích hợp dành cho Vue của Intlayer, cung cấp plugin và composables cho các ứng dụng Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói vue-intlayer

Gói `vue-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Vue. Nó bao gồm một Vue plugin và các composable để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install vue-intlayer
```

## Các exports

### Plugin

| Function          | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `installIntlayer` | Plugin Vue để cài đặt Intlayer trong ứng dụng của bạn. |

### Hàm Composable

| Composable      | Mô tả                                              |
| --------------- | -------------------------------------------------- |
| `useIntlayer`   | Chọn một từ điển theo khóa và trả về nội dung.     |
| `useDictionary` | Chọn một từ điển theo khóa và trả về nội dung.     |
| `useLocale`     | Trả về locale hiện tại và một hàm để thiết lập nó. |
| `useIntl`       | Trả về đối tượng Intl cho locale hiện tại.         |

### Hàm

| Hàm             | Mô tả                           |
| --------------- | ------------------------------- |
| `getDictionary` | Truy xuất một dictionary.       |
| `getIntlayer`   | Lấy nội dung từ một dictionary. |

### Markdown

| Hàm                       | Mô tả                                                           |
| ------------------------- | --------------------------------------------------------------- |
| `installIntlayerMarkdown` | Vue plugin để cài đặt Intlayer Markdown trong ứng dụng của bạn. |
