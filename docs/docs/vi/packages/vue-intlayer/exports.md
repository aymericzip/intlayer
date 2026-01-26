---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói vue-intlayer
description: Tích hợp dành riêng cho Vue cho Intlayer, cung cấp plugin và composable cho các ứng dụng Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói vue-intlayer

Gói `vue-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Vue. Nó bao gồm một plugin Vue và các composable để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install vue-intlayer
```

## Các export

### Plugin

Nhập:

```tsx
import "vue-intlayer";
```

| Function          | Mô tả                                                  |
| ----------------- | ------------------------------------------------------ |
| `installIntlayer` | Plugin Vue để cài đặt Intlayer trong ứng dụng của bạn. |

### Các Composables

Import:

```tsx
import "vue-intlayer";
```

| Composable             | Mô tả                                                                                                                | Tài liệu liên quan                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Dựa trên `useDictionary`, nhưng chèn một phiên bản tối ưu hóa của dictionary từ khai báo được sinh ra.               | -                                                                                                                     |
| `useDictionary`        | Xử lý các object trông giống dictionary (key, content). Nó xử lý các bản dịch `t()`, enumerations, v.v.              | -                                                                                                                     |
| `useDictionaryAsync`   | Tương tự `useDictionary`, nhưng xử lý các từ điển bất đồng bộ.                                                       | -                                                                                                                     |
| `useDictionaryDynamic` | Tương tự `useDictionary`, nhưng xử lý các từ điển động.                                                              | -                                                                                                                     |
| `useLocale`            | Trả về locale hiện tại và một hàm để thiết lập nó.                                                                   | -                                                                                                                     |
| `useRewriteURL`        | Composable phía client để quản lý rewrite URL. Tự động cập nhật URL nếu tồn tại quy tắc rewrite đã được bản địa hóa. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Trả về đối tượng Intl cho locale hiện tại.                                                                           | -                                                                                                                     |
| `useLoadDynamic`       | Composable để tải các từ điển động.                                                                                  | -                                                                                                                     |

### Hàm

Nhập:

```tsx
import "vue-intlayer";
```

| Hàm             | Mô tả                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `getDictionary` | Xử lý các đối tượng trông giống dictionary (key, content). Nó xử lý các bản dịch `t()`, enumerations, v.v.   |
| `getIntlayer`   | Dựa trên `getDictionary`, nhưng chèn một phiên bản tối ưu của từ điển (dictionary) từ khai báo được sinh ra. |

### Markdown

Nhập:

```tsx
import "vue-intlayer/markdown";
```

| Hàm                       | Mô tả                                                           |
| ------------------------- | --------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue để cài đặt Intlayer Markdown trong ứng dụng của bạn. |
