---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói angular-intlayer
description: Tích hợp dành cho Angular của Intlayer, cung cấp providers và services cho các ứng dụng Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Gói angular-intlayer

Gói `angular-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Angular. Nó bao gồm các providers và services để xử lý nội dung đa ngôn ngữ.

## Cài đặt

```bash
npm install angular-intlayer
```

## Các export

Nhập:

```tsx
import "angular-intlayer";
```

### Thiết lập

| Chức năng         | Mô tả                                                    |
| ----------------- | -------------------------------------------------------- |
| `provideIntlayer` | Hàm để cung cấp Intlayer trong ứng dụng Angular của bạn. |

### Các Hook

| Hook                   | Mô tả                                                                                                         | Tài liệu liên quan |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------ |
| `useIntlayer`          | Dựa trên `useDictionary`, nhưng inject một phiên bản được tối ưu hóa của dictionary từ khai báo được sinh ra. | -                  |
| `useDictionary`        | Xử lý các đối tượng trông giống như từ điển (key, content). Nó xử lý các bản dịch `t()`, các enum, v.v.       | -                  |
| `useDictionaryAsync`   | Giống `useDictionary`, nhưng xử lý các từ điển bất đồng bộ.                                                   | -                  |
| `useDictionaryDynamic` | Giống `useDictionary`, nhưng xử lý các từ điển động.                                                          | -                  |
| `useLocale`            | Trả về locale hiện tại và một hàm để đặt (set) nó.                                                            | -                  |
| `useIntl`              | Trả về đối tượng Intl cho locale hiện tại.                                                                    | -                  |
| `useLoadDynamic`       | Hook để tải các từ điển động.                                                                                 | -                  |

### Thành phần

| Thành phần                  | Mô tả                                               |
| --------------------------- | --------------------------------------------------- |
| `IntlayerMarkdownComponent` | Angular component dùng để render nội dung Markdown. |
